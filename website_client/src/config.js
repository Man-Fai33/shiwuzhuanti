// 自動辨別後端連線位址：
// 1. 若環境變數 REACT_APP_API_HOST 有指定，直接採用
// 2. 若為本地 React 開發模式 (port 3000)，預設連線至 http://localhost:7788
// 3. 若為 Docker 容器部署 / Nginx 生產環境，採用相對路徑 "" 由 Nginx 反向代理至後端容器
const isDevLocal = typeof window !== 'undefined' && 
                   process.env.NODE_ENV === 'development' && 
                   (window.location.port === '3000' || window.location.hostname === 'localhost');

export const EXPRESS_SERVER_URL = process.env.REACT_APP_API_HOST !== undefined
    ? process.env.REACT_APP_API_HOST
    : (isDevLocal ? "http://localhost:7788" : "");

export const COOKIES_EXPIRES_TIME = 1; // one day