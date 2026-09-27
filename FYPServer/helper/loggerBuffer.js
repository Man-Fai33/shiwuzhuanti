/**
 * loggerBuffer.js
 * 提供後端在記憶體中的滾動日誌緩衝區 (預設保留最近 200 筆)
 * 讓管理者可直接在網頁端儀表板檢視 Docker 容器/伺服器的即時日誌
 */

const MAX_LOGS = 200;
const logBuffer = [];

function addLog(level, message, meta = null) {
    const entry = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        timestamp: new Date().toISOString(),
        level: level.toUpperCase(), // 'INFO', 'WARN', 'ERROR', 'CRON', 'SYNC'
        message: typeof message === 'string' ? message : JSON.stringify(message),
        meta: meta ? (typeof meta === 'string' ? meta : JSON.stringify(meta)) : null
    };

    logBuffer.push(entry);
    if (logBuffer.length > MAX_LOGS) {
        logBuffer.shift();
    }
    return entry;
}

// 攔截並覆寫 console.log 與 console.error，同時保留原始終端輸出
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.log = function (...args) {
    originalConsoleLog.apply(console, args);
    const msg = args.map(a => (typeof a === 'object' ? JSON.stringify(a) : a)).join(' ');
    
    // 依據前綴給予標籤
    let level = 'INFO';
    if (msg.includes('[Scheduler]') || msg.includes('[Cron]')) level = 'CRON';
    else if (msg.includes('[Sync]') || msg.includes('[GoogleMaps]')) level = 'SYNC';
    
    addLog(level, msg);
};

console.error = function (...args) {
    originalConsoleError.apply(console, args);
    const msg = args.map(a => (typeof a === 'object' ? (a.stack || JSON.stringify(a)) : a)).join(' ');
    addLog('ERROR', msg);
};

console.warn = function (...args) {
    originalConsoleWarn.apply(console, args);
    const msg = args.map(a => (typeof a === 'object' ? JSON.stringify(a) : a)).join(' ');
    addLog('WARN', msg);
};

function getLogs(limit = 100) {
    const n = Math.min(limit, logBuffer.length);
    return logBuffer.slice(-n);
}

function clearLogs() {
    logBuffer.length = 0;
    addLog('INFO', 'System log buffer cleared by administrator.');
    return true;
}

module.exports = {
    addLog,
    getLogs,
    clearLogs
};
