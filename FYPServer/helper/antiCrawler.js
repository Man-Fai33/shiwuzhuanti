/**
 * antiCrawler.js
 * 台灣夜市數位導覽系統 - 智慧防爬蟲與機器人惡意採集防禦模組
 * 
 * 核心防禦能力：
 * 1. 惡意 User-Agent 智能特徵識別與黑名單庫
 * 2. 搜尋引擎官方爬蟲白名單 (Googlebot, Bingbot 等正常索引允許)
 * 3. 空白 / 異常 User-Agent 攔截
 * 4. 漏洞掃描器與路徑探測防禦 (Exploit & Scanner Probe Blocker)
 * 5. 蜜罐陷阱機制 (Honeypot Trap) - 誘導並永久封鎖爬蟲
 * 6. 智慧滑動視窗流量速率限制 (Sliding Window Rate Limiter)
 * 7. 動態 IP 黑白名單管理 (支援過期自動解除與後台手動增刪)
 * 8. 即時安全遙測日誌 (Telemetry & Audit Logs)
 */

// 惡意/自動化腳本 User-Agent 特徵庫
const MALICIOUS_UA_PATTERNS = [
    /scrapy/i,
    /python-requests/i,
    /aiohttp/i,
    /httpclient/i,
    /curl\//i,
    /wget\//i,
    /go-http-client/i,
    /java\//i,
    /apache-httpclient/i,
    /headlesschrome/i,
    /phantomjs/i,
    /selenium/i,
    /puppeteer/i,
    /playwright/i,
    /httpx/i,
    /mechanize/i,
    /beautifulsoup/i,
    /node-fetch/i,
    /libwww-perl/i,
    /sqlmap/i,
    /nikto/i,
    /masscan/i,
    /nmap/i,
    /zgrab/i,
    /censys/i,
    /shodan/i,
    /acunetix/i,
    /httrack/i,
    /teleport/i,
    /webcopier/i,
    /offline\s*explorer/i,
    /sitecheck/i,
    /postmanruntime/i
];

// 合法搜尋引擎官方白名單爬蟲 (友善允許 SEO 索引)
const ALLOWED_SEARCH_BOTS = [
    /googlebot/i,
    /bingbot/i,
    /slurp/i,          // Yahoo
    /duckduckbot/i,
    /baiduspider/i,
    /yandexbot/i,
    /facebookexternalhit/i,
    /twitterbot/i,
    /linkedinbot/i
];

// 常見惡意探針與漏洞掃描路徑
const SENSITIVE_PROBE_PATHS = [
    /\/\.env/i,
    /\/\.git/i,
    /\/wp-login\.php/i,
    /\/wp-admin/i,
    /\/phpmyadmin/i,
    /\/admin\.php/i,
    /\/actuator/i,
    /\/console/i,
    /\/shell/i,
    /\/eval-stdin\.php/i,
    /\/vendor\/phpunit/i
];

// 防護全域設定 (可由管理者在網頁後台動態修改)
const config = {
    enabled: true,                       // 智慧防爬蟲總開關
    strictMode: false,                   // 嚴格模式 (若為 true，凡命中自動化腳本 UA 一律攔截)
    rateLimitPerMin: 90,                 // 一般訪客每分鐘請求上限
    blockDurationMinutes: 30,            // 違規自動封鎖時長 (分鐘)
    honeypotEnabled: true,               // 蜜罐陷阱防禦開關
    honeypotBlockHours: 24,              // 踩入蜜罐自動封鎖時長 (小時)
    blockEmptyUserAgent: true            // 阻擋空白 User-Agent
};

// 內部狀態追蹤
const state = {
    totalRequestsAnalyzed: 0,
    legitimateRequests: 0,
    blockedRequests: 0,
    honeypotTriggersCount: 0,
    // IP 請求頻率追蹤: IP -> [timestamp, timestamp, ...]
    requestTimestamps: new Map(),
    // IP 黑名單: IP -> { reason, blockedAt, expiresAt, ua }
    blacklist: new Map(),
    // IP 白名單: Set of IP strings
    whitelist: new Set(['127.0.0.1', '::1', 'localhost']),
    // 最近攔截紀錄 (最多保留 100 筆)
    recentBlockedLogs: []
};

/**
 * 取得用戶端真實 IP
 */
function getClientIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    return req.socket.remoteAddress || req.connection.remoteAddress || '127.0.0.1';
}

/**
 * 記錄攔截日誌
 */
function logBlockedEvent(ip, path, reason, userAgent) {
    state.blockedRequests += 1;
    const entry = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
        ip,
        path,
        reason,
        userAgent: userAgent ? userAgent.substring(0, 150) : '(Empty)',
        timestamp: new Date().toISOString()
    };

    state.recentBlockedLogs.unshift(entry);
    if (state.recentBlockedLogs.length > 100) {
        state.recentBlockedLogs.pop();
    }

    console.warn(`[AntiCrawler:BLOCKED] 🚫 IP: ${ip} | 原因: ${reason} | 路徑: ${path}`);
    return entry;
}

/**
 * 將 IP 加入黑名單
 */
function blacklistIp(ip, reason, durationMinutes, userAgent = '') {
    if (state.whitelist.has(ip)) return false; // 白名單保護

    const blockedAt = new Date();
    const expiresAt = new Date(blockedAt.getTime() + durationMinutes * 60 * 1000);

    state.blacklist.set(ip, {
        ip,
        reason,
        blockedAt: blockedAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        durationMinutes,
        userAgent: userAgent.substring(0, 120)
    });

    return true;
}

/**
 * 檢查 IP 是否在黑名單中 (含自動過期清除)
 */
function isIpBlacklisted(ip) {
    if (state.whitelist.has(ip)) return false;

    const record = state.blacklist.get(ip);
    if (!record) return false;

    // 檢查是否已過期
    if (new Date() > new Date(record.expiresAt)) {
        state.blacklist.delete(ip);
        console.log(`[AntiCrawler] 🔓 IP: ${ip} 封鎖已屆滿，自動解除封鎖。`);
        return false;
    }

    return true;
}

/**
 * 清除過期的請求時間戳
 */
function cleanOldTimestamps(ip, windowMs) {
    const now = Date.now();
    const timestamps = state.requestTimestamps.get(ip) || [];
    const valid = timestamps.filter(t => now - t < windowMs);
    state.requestTimestamps.set(ip, valid);
    return valid;
}

/**
 * 核心 Express 中間件
 */
function antiCrawlerMiddleware(req, res, next) {
    if (!config.enabled) {
        return next();
    }

    state.totalRequestsAnalyzed += 1;
    const ip = getClientIp(req);
    const rawUa = req.headers['user-agent'] || '';
    const ua = rawUa.trim();
    const path = req.originalUrl || req.url;

    // 1. 白名單免檢
    if (state.whitelist.has(ip)) {
        state.legitimateRequests += 1;
        return next();
    }

    // 2. 蜜罐陷阱路由攔截 (Honeypot Trap)
    // 爬蟲遍歷網頁如果點擊了隱藏連結 /system/anticrawler/trap 或 /api/trap/nightmarket-data
    if (config.honeypotEnabled && (path.includes('/system/anticrawler/trap') || path.includes('/api/trap/'))) {
        state.honeypotTriggersCount += 1;
        logBlockedEvent(ip, path, 'HONEYPOT_TRAP_TRIGGERED', ua);
        blacklistIp(ip, '踩入蜜罐陷阱 (Honeypot Trap)', config.honeypotBlockHours * 60, ua);

        return res.status(403).json({
            status: 'blocked',
            code: 'HONEYPOT_TRIGGERED',
            message: '🛑 Security Warning: Automated scraping trap triggered. Your IP address has been blacklisted for 24 hours.'
        });
    }

    // 3. 檢查現有黑名單
    if (isIpBlacklisted(ip)) {
        const record = state.blacklist.get(ip);
        logBlockedEvent(ip, path, `BLACKLISTED_IP (${record?.reason || 'Violations'})`, ua);
        return res.status(403).json({
            status: 'blocked',
            code: 'IP_BLACKLISTED',
            message: `🛑 Access Denied: Your IP is temporarily banned due to automated crawler behavior (${record?.reason || 'Rate limit violation'}).`,
            expiresAt: record?.expiresAt
        });
    }

    // 4. 惡意敏感路徑探針攔截 (Exploit/Probe Scanner)
    for (const pattern of SENSITIVE_PROBE_PATHS) {
        if (pattern.test(path)) {
            logBlockedEvent(ip, path, 'EXPLOIT_SCANNER_PROBE', ua);
            blacklistIp(ip, '探測敏感系統路徑 (Vulnerability Scanner)', config.blockDurationMinutes * 2, ua);
            return res.status(403).json({
                status: 'blocked',
                code: 'MALICIOUS_PROBE',
                message: 'Access Forbidden: Malicious path probe detected.'
            });
        }
    }

    // 5. 空白 / 缺失 User-Agent 檢查 (正規瀏覽器必帶 UA)
    if (config.blockEmptyUserAgent && (!ua || ua.length < 5)) {
        logBlockedEvent(ip, path, 'EMPTY_USER_AGENT', '(None)');
        blacklistIp(ip, '無效或空白 User-Agent', 15, '(Empty)');
        return res.status(403).json({
            status: 'blocked',
            code: 'INVALID_USER_AGENT',
            message: 'Access Denied: Missing or invalid User-Agent header.'
        });
    }

    // 6. 合法搜尋引擎官方爬蟲放行 (Googlebot, Bingbot 等)
    for (const searchBot of ALLOWED_SEARCH_BOTS) {
        if (searchBot.test(ua)) {
            state.legitimateRequests += 1;
            res.setHeader('X-Bot-Verification', 'Allowed-Search-Engine');
            return next();
        }
    }

    // 7. 惡意或自動化爬蟲 User-Agent 識別
    let isMaliciousUa = false;
    for (const pattern of MALICIOUS_UA_PATTERNS) {
        if (pattern.test(ua)) {
            isMaliciousUa = true;
            break;
        }
    }

    if (isMaliciousUa) {
        if (config.strictMode) {
            // 嚴格模式：直接阻擋並封鎖
            logBlockedEvent(ip, path, 'MALICIOUS_CRAWLER_UA', ua);
            blacklistIp(ip, '識別為惡意爬蟲工具 (Automated Scraper UA)', config.blockDurationMinutes, ua);
            return res.status(403).json({
                status: 'blocked',
                code: 'BOT_UA_PROHIBITED',
                message: 'Access Denied: Automated crawler tools are prohibited from scraping.'
            });
        }
        // 非嚴格模式下，給予警告標籤並降低其限流閾值
        res.setHeader('X-Bot-Suspicious', 'true');
    }

    // 8. 智慧滑動視窗請求頻率速率限制 (Rate Limiting)
    const windowMs = 60 * 1000; // 1 分鐘視窗
    const validTimestamps = cleanOldTimestamps(ip, windowMs);
    validTimestamps.push(Date.now());
    state.requestTimestamps.set(ip, validTimestamps);

    // 若為可疑爬蟲，容許頻率砍半
    const currentLimit = isMaliciousUa ? Math.floor(config.rateLimitPerMin / 2) : config.rateLimitPerMin;

    if (validTimestamps.length > currentLimit) {
        logBlockedEvent(ip, path, `RATE_LIMIT_EXCEEDED (${validTimestamps.length}/${currentLimit} req/min)`, ua);
        blacklistIp(ip, `超過頻率上限 (${validTimestamps.length}次/分)`, config.blockDurationMinutes, ua);

        return res.status(429).json({
            status: 'blocked',
            code: 'RATE_LIMIT_EXCEEDED',
            message: `⚠️ Too Many Requests: Request rate limit exceeded (${currentLimit} req/min). Your IP has been banned for ${config.blockDurationMinutes} minutes.`
        });
    }

    state.legitimateRequests += 1;
    res.setHeader('X-AntiCrawler-Shield', 'Active');
    next();
}

/**
 * 取得當前防爬蟲統計與設定
 */
function getAntiCrawlerStats() {
    // 整理黑名單清單 (去除過期項)
    const activeBlacklist = [];
    const now = new Date();
    for (const [ip, item] of state.blacklist.entries()) {
        if (now <= new Date(item.expiresAt)) {
            const remainingMins = Math.max(0, Math.ceil((new Date(item.expiresAt) - now) / 60000));
            activeBlacklist.push({ ...item, remainingMinutes: remainingMins });
        } else {
            state.blacklist.delete(ip);
        }
    }

    return {
        config: { ...config },
        metrics: {
            totalAnalyzed: state.totalRequestsAnalyzed,
            legitimate: state.legitimateRequests,
            blocked: state.blockedRequests,
            honeypotTriggers: state.honeypotTriggersCount,
            activeBlacklistCount: activeBlacklist.length,
            activeWhitelistCount: state.whitelist.size
        },
        blacklist: activeBlacklist,
        whitelist: Array.from(state.whitelist),
        recentLogs: state.recentBlockedLogs.slice(0, 50)
    };
}

/**
 * 更新防護設定
 */
function updateConfig(updates = {}) {
    if (typeof updates.enabled === 'boolean') config.enabled = updates.enabled;
    if (typeof updates.strictMode === 'boolean') config.strictMode = updates.strictMode;
    if (typeof updates.honeypotEnabled === 'boolean') config.honeypotEnabled = updates.honeypotEnabled;
    if (typeof updates.blockEmptyUserAgent === 'boolean') config.blockEmptyUserAgent = updates.blockEmptyUserAgent;
    if (Number(updates.rateLimitPerMin) > 0) config.rateLimitPerMin = Number(updates.rateLimitPerMin);
    if (Number(updates.blockDurationMinutes) > 0) config.blockDurationMinutes = Number(updates.blockDurationMinutes);
    if (Number(updates.honeypotBlockHours) > 0) config.honeypotBlockHours = Number(updates.honeypotBlockHours);

    console.log('[AntiCrawler] ⚙️ 防爬蟲防護設定已更新:', config);
    return config;
}

/**
 * 手動封鎖 IP
 */
function manualBlockIp(ip, reason = '管理者手動封鎖', durationMinutes = 60) {
    if (!ip) throw new Error('請提供 IP 位址');
    blacklistIp(ip.trim(), reason, durationMinutes, 'Manual-Admin-Ban');
    logBlockedEvent(ip, '/admin/manual-ban', 'MANUAL_ADMIN_BLOCK', 'Manual');
    return true;
}

/**
 * 手動解封 IP
 */
function manualUnblockIp(ip) {
    if (!ip) throw new Error('請提供 IP 位址');
    const trimmed = ip.trim();
    const existed = state.blacklist.delete(trimmed);
    state.requestTimestamps.delete(trimmed);
    console.log(`[AntiCrawler] 🔓 管理者手動解除封鎖 IP: ${trimmed}`);
    return existed;
}

/**
 * 加入白名單
 */
function addWhitelistIp(ip) {
    if (!ip) throw new Error('請提供 IP 位址');
    const trimmed = ip.trim();
    state.whitelist.add(trimmed);
    state.blacklist.delete(trimmed);
    return true;
}

/**
 * 移出白名單
 */
function removeWhitelistIp(ip) {
    if (!ip) throw new Error('請提供 IP 位址');
    return state.whitelist.delete(ip.trim());
}

module.exports = {
    antiCrawlerMiddleware,
    getAntiCrawlerStats,
    updateConfig,
    manualBlockIp,
    manualUnblockIp,
    addWhitelistIp,
    removeWhitelistIp
};
