/**
 * ==============================================================
 * 台灣夜市好好行 - 全方位企業級資訊安全防護核心 (Security Shield)
 * Enterprise-Grade Cyber Security & Hardening Suite
 * ==============================================================
 */

const rateLimit = require('express-rate-limit');

/**
 * 1. NoSQL Injection (MongoDB Injection) 深度清理器
 * 遞迴過濾所有包含 '$' 開頭或包含 '.' 的屬性名稱，徹底阻絕 MongoDB 操作符注入
 */
function cleanNoSql(obj) {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
        return obj.map(item => cleanNoSql(item));
    }

    const cleanObj = {};
    for (const key of Object.keys(obj)) {
        // 禁止以 $ 開頭的操作符 (例如 $gt, $ne, $where, $regex) 與包含小數點的鍵名
        if (key.startsWith('$') || key.includes('.')) {
            console.warn(`[SecurityShield] Blocked NoSQL Injection attempt with key: "${key}"`);
            continue;
        }
        cleanObj[key] = cleanNoSql(obj[key]);
    }
    return cleanObj;
}

function noSqlSanitizerMiddleware(req, res, next) {
    if (req.body) req.body = cleanNoSql(req.body);
    if (req.query) req.query = cleanNoSql(req.query);
    if (req.params) req.params = cleanNoSql(req.params);
    next();
}

/**
 * 2. Cross-Site Scripting (XSS) 字符轉義與惡意腳本消除
 * 將 HTML 特殊符號轉義，並過濾 inline script 與 javascript: 偽協議
 */
function sanitizeXss(str) {
    if (typeof str !== 'string') return str;

    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .replace(/javascript:/gi, '')
        .replace(/vbscript:/gi, '')
        .replace(/on\w+\s*=/gi, ''); // 移除 onerror=, onclick=, onload= 等事件處理器
}

function recursiveXssClean(obj) {
    if (!obj || typeof obj !== 'object') {
        if (typeof obj === 'string') return sanitizeXss(obj);
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => recursiveXssClean(item));
    }

    const cleaned = {};
    for (const [k, v] of Object.entries(obj)) {
        // 密碼欄位與二進制資料不進行 HTML 轉義，避免更改原始密碼雜湊或驗證
        if (k.toLowerCase().includes('password') || k.toLowerCase().includes('token')) {
            cleaned[k] = typeof v === 'string' ? v.trim() : v;
        } else {
            cleaned[k] = recursiveXssClean(v);
        }
    }
    return cleaned;
}

function xssSanitizerMiddleware(req, res, next) {
    if (req.body) req.body = recursiveXssClean(req.body);
    if (req.query) req.query = recursiveXssClean(req.query);
    next();
}

/**
 * 3. 認證防暴力破解限制器 (Brute-Force & Credential Stuffing Shield)
 * 限制 15 分鐘內最多嘗試 15 次登入/註冊
 */
const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 15,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 'error',
        code: 'AUTH_RATE_LIMIT_EXCEEDED',
        message: '登入嘗試次數過多，為保障帳號安全，請於 15 分鐘後再試。'
    }
});

/**
 * 4. 檔案上傳頻率限制器 (Upload DoS Shield)
 * 限制 15 分鐘內最多上傳 30 個檔案，防止惡意磁碟耗盡攻擊
 */
const uploadRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 'error',
        code: 'UPLOAD_RATE_LIMIT_EXCEEDED',
        message: '上傳頻率過高，請稍候再進行圖片上傳。'
    }
});

/**
 * 5. 評論與留言防洗版限制器 (Spam Flood Shield)
 * 限制 10 分鐘內最多發表 20 則評論/反饋
 */
const commentRateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 'error',
        code: 'SPAM_RATE_LIMIT_EXCEEDED',
        message: '發言過於頻繁，請稍作休息後再發表心得。'
    }
});

/**
 * 6. 字串類型強校驗 helper (確保不是物件或陣列，杜絕 MongoDB 物件注入)
 */
function toSafeString(val, maxLength = 255) {
    if (typeof val !== 'string') return '';
    return val.trim().slice(0, maxLength);
}

module.exports = {
    cleanNoSql,
    noSqlSanitizerMiddleware,
    sanitizeXss,
    xssSanitizerMiddleware,
    authRateLimiter,
    uploadRateLimiter,
    commentRateLimiter,
    toSafeString
};
