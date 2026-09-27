// ==============================================================
// 台灣夜市好好行 - 全站動態 SEO 與搜尋引擎最佳化管理器 (SEO Helper)
// ==============================================================

const routeMeta = {
  '/': {
    title: '台灣夜市好好行 🏮 Taiwan Night Market Guide | 必吃小吃・即時人潮預報',
    description: '全台熱門夜市小吃名店推薦、即時人潮避峰指南與大眾運輸導航。中英雙語友善，逗陣來迺夜市！'
  },
  '/index': {
    title: '台灣夜市好好行 🏮 Taiwan Night Market Guide | 必吃小吃・即時人潮預報',
    description: '全台熱門夜市小吃名店推薦、即時人潮避峰指南與大眾運輸導航。中英雙語友善，逗陣來迺夜市！'
  },
  '/nightmarket': {
    title: '全台夜市名錄與地圖導航 🏮 台灣特色夜市全收錄 | 夜市好好行',
    description: '匯集士林、饒河、寧夏、逢甲、六合、羅東等全台知名夜市營業時間、交通路線與即時天氣舒適度指南。'
  },
  '/nightmarketpage': {
    title: '夜市即時情報、名攤推薦與人潮尖峰預測 🏮 | 夜市好好行',
    description: '探索在地夜市必吃老饕招牌、公廁停車場實用生活設施、即時天候預報與 Google Maps 路線導航。'
  },
  '/foodlist': {
    title: '夜市必吃美食小吃大全 🥢 珍珠奶茶・雞排・蚵仔煎・臭豆腐 | 夜市好好行',
    description: '精選全台夜市人氣料理小吃，提供飲食偏好標籤（蔬食友善/嚴選豬肉/海鮮）與評分推薦。'
  },
  '/travelguide': {
    title: '老饕夜市散策攻略 🗺️ 台北/台中/高雄排隊美食一日遊行程 | 夜市好好行',
    description: '跟著在地老饕走！精選夜市周邊捷運景點、黃金遊逛動線與不踩雷避坑錦囊。'
  },
  '/bulletin': {
    title: '夜市即時快訊與熱門活動公告 📢 營業異動與美食季活動 | 夜市好好行',
    description: '掌握全台各大夜市最新營業時間公告、快閃市集與促銷優惠活動資訊。'
  },
  '/account': {
    title: '夜市攤商極速進駐與管理中心 🏬 30 秒刊登專屬名店 | 夜市好好行',
    description: '歡迎全台夜市攤商進駐！支援 Google 地圖一鍵快速載入，建立專屬中英雙語菜單立牌。'
  },
  '/foodinfo': {
    title: '夜市招牌料理深度介紹與攤位推薦 🥢 | 夜市好好行',
    description: '查看這道經典夜市料理的歷史特色、食材偏好、價格區間與販售名攤地圖。'
  },
  '/shop': {
    title: '夜市排隊名攤菜單與食客評分 🏬 Google 導航直達 | 夜市好好行',
    description: '查詢攤位營業資訊、招牌菜單、支援支付方式（LINE Pay/街口）與真實食客評價。'
  }
};

/**
 * 自動依據路徑更新頁面 Title, Description 與 Open Graph 社群標籤
 * @param {string} pathname 
 * @param {string} [customTitle] 
 * @param {string} [customDesc] 
 */
export function updatePageSEO(pathname, customTitle, customDesc) {
  try {
    const rawPath = (pathname || (typeof window !== 'undefined' ? window.location.pathname : '/')).toLowerCase();
    const matchedKey = Object.keys(routeMeta).find(k => k.toLowerCase() === rawPath);
    const meta = matchedKey ? routeMeta[matchedKey] : {};

    const title = customTitle || meta.title || '台灣夜市好好行 🏮 Taiwan Night Market Food & Travel Guide';
    const desc = customDesc || meta.description || '全台夜市美食數位導覽指南！精選排隊美食、即時人潮避峰預測與 Google 地圖導航。';

    if (typeof document !== 'undefined') {
      document.title = title;

      // 更新 meta[name="description"]
      let descTag = document.querySelector('meta[name="description"]');
      if (descTag) {
        descTag.setAttribute('content', desc);
      }

      // 更新 og:title
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', title);
      }

      // 更新 og:description
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', desc);
      }
    }
  } catch (err) {
    console.error('SEO update failed:', err);
  }
}

const seoHelper = {
  updatePageSEO,
  routeMeta
};

export default seoHelper;
