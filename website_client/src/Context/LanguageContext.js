import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
    zh: {
        brand_title: '夜市好好行',
        brand_sub: '尋味台灣夜市生活指南',
        brand_badge: '在地推薦',

        // Navigation
        nav_home: '首頁推薦',
        nav_markets: '探索夜市',
        nav_foods: '人氣美食',
        nav_guide: '旅人攻略 101',
        nav_bulletin: '即時公告',
        nav_feedback: '訪客回饋',
        nav_signin: '登入',
        nav_signup: '註冊',
        nav_profile: '個人中心',
        nav_account: '攤位申請',
        nav_admin: '資料後台',
        nav_signout: '登出',

        // Home Page
        hero_tag: '台灣夜市文化尋味指南',
        hero_title: '呷飽未？今晚逗陣來迺夜市',
        hero_desc: '走入滿溢香氣的街巷，尋訪傳承三代的炭火香與熱騰騰的銅板美味。全台指標夜市動線、捷運指引與老饕私房推薦，為您完整收錄。',
        search_placeholder: '搜尋夜市（例：士林、逢甲、花園）或在地小吃...',
        search_btn: '搜尋',
        quick_search: '熱門探索：',

        card_markets_title: '全台夜市導覽',
        card_markets_desc: '精選北中南各大夜市特色聚落、攤位分佈與捷運公車大眾交通指引。',
        card_markets_btn: '探索夜市',

        card_foods_title: '必吃排隊美食',
        card_foods_desc: '比臉大雞排、黑糖珍珠奶茶、炭烤大腸包小腸等經典銅板滋味。',
        card_foods_btn: '品嚐美食',

        card_bulletin_title: '即時營運動態',
        card_bulletin_desc: '掌握各大夜市營業異動、節慶限定活動、市集休市及防疫指引。',
        card_bulletin_btn: '查看公告',

        card_feedback_title: '訪客心聲交流',
        card_feedback_desc: '分享您的夜市探訪心得與美味評價，幫助更多旅人發現隱藏名攤。',
        card_feedback_btn: '填寫意見',

        featured_markets: '精選推薦夜市',
        view_all_markets: '查看全部夜市',
        view_market_detail: '查看詳細資訊 ➔',

        // Night Markets List Page
        markets_page_title: '探索全台夜市',
        markets_page_desc: '精選台灣各地指標性觀光夜市，尋訪老饕推薦的在地好滋味。',
        region_all: '全部夜市',
        region_tp: '北部 (台北/新北/基隆)',
        region_tz: '中部/東部 (台中/宜蘭)',
        region_tn: '南部 (台南/高雄)',
        market_search_placeholder: '輸入夜市名稱或小吃關鍵字搜尋...',
        enter_market: '進入夜市導覽 ➔',
        no_markets_found: '未找到符合條件的夜市',
        clear_filter: '查看全部夜市 ➔',

        // Food List Page
        foods_page_title: '夜市在地美食圖鑑',
        foods_page_desc: '匯聚台灣各大夜市招牌料理，銅板價格、澎湃美味！',
        food_type_all: '全部小吃',
        food_type_fried: '香酥炸物',
        food_type_snack: '道地小吃',
        food_type_pasta: '熱炒麵食',
        food_type_dessert: '冰品甜點',
        view_food_detail: '查看小吃推薦 ➔',

        // Feedback Page
        feedback_page_title: '訪客心聲與意見回饋',
        feedback_page_desc: '歡迎與我們分享您的夜市探訪心得、推薦私房攤位或平台改善建議！',
        feedback_name: '您的稱謂 / 暱稱',
        feedback_name_ph: '例如：陳先生、夜市美食客',
        feedback_phone: '聯絡電話 (選填)',
        feedback_email: '電子郵件信箱',
        feedback_opinion: '意見內容與心得回饋',
        feedback_opinion_ph: '請告訴我們您的想法、遇到的問題，或想推薦的美食私房店家...',
        feedback_submit: '送出回饋 ➔',
        feedback_success: '感謝您的寶貴回饋！意見已成功送出！',
        feedback_fail: '送出失敗，請稍候重試或檢查網路連線',

        // Bulletin Page
        bulletin_page_title: '夜市即時公告欄',
        bulletin_page_desc: '即時掌握各大夜市營業異動、節慶特展與防疫指引！',

        // General
        rating: '評分',
        price: '價格',
        footer_slogan: '夜市好好行 ‧ 台灣夜市美食與生活文化推廣指南',
        footer_copyright: '© 2026 夜市好好行 ‧ 全台在地夜市美食與生活文化推廣指南',
        lang_switch: 'English'
    },
    en: {
        brand_title: 'Taiwan Night Markets',
        brand_sub: 'Taiwan Street Food & Cultural Guide',
        brand_badge: 'Local Guide',

        // Navigation
        nav_home: 'Home',
        nav_markets: 'Night Markets',
        nav_foods: 'Popular Foods',
        nav_guide: 'Traveler 101',
        nav_bulletin: 'Notices',
        nav_feedback: 'Feedback',
        nav_signin: 'Sign In',
        nav_signup: 'Sign Up',
        nav_profile: 'Profile',
        nav_account: 'Stall Application',
        nav_admin: 'Admin Panel',
        nav_signout: 'Sign Out',

        // Home Page
        hero_tag: 'Taiwan Street Food & Culture Guide',
        hero_title: 'Have You Eaten? Explore Night Markets Tonight',
        hero_desc: 'Wander through vibrant alleyways to discover generational charcoal grills and steaming street delights. Comprehensive transit directions, signature eats, and local foodie tips across Taiwan.',
        search_placeholder: 'Search night markets (e.g. Shilin, Fengjia, Garden) or food...',
        search_btn: 'Search',
        quick_search: 'Popular:',

        card_markets_title: 'Night Market Tour',
        card_markets_desc: 'Iconic market clusters, popular stall maps, and MRT/bus transit directions across Taiwan.',
        card_markets_btn: 'Explore Markets',

        card_foods_title: 'Must-Eat Street Food',
        card_foods_desc: 'Crispy oversized chicken cutlets, brown sugar boba milk, charcoal sausages, and classic treats.',
        card_foods_btn: 'Taste Delicacies',

        card_bulletin_title: 'Live Notices',
        card_bulletin_desc: 'Stay informed with business hours, festive events, night market holidays, and tips.',
        card_bulletin_btn: 'View Notices',

        card_feedback_title: 'Visitor Voices',
        card_feedback_desc: 'Share your dining experiences and honest reviews to guide fellow food lovers!',
        card_feedback_btn: 'Leave Feedback',

        featured_markets: 'Featured Night Markets',
        view_all_markets: 'View All Markets',
        view_market_detail: 'View Details ➔',

        // Night Markets List Page
        markets_page_title: 'Explore Taiwan Night Markets',
        markets_page_desc: 'Selected landmark night markets across Taiwan with must-try local specialties.',
        region_all: 'All Markets',
        region_tp: 'Northern (Taipei/Keelung)',
        region_tz: 'Central/Eastern (Taichung/Yilan)',
        region_tn: 'Southern (Tainan/Kaohsiung)',
        market_search_placeholder: 'Search night market name or dish...',
        enter_market: 'Enter Market Guide ➔',
        no_markets_found: 'No night markets matched your search',
        clear_filter: 'View All Markets ➔',

        // Food List Page
        foods_page_title: 'Taiwan Street Food Gallery',
        foods_page_desc: 'Signature street dishes from Taiwan’s top night markets at friendly pocket prices!',
        food_type_all: 'All Delicacies',
        food_type_fried: 'Fried & Grilled',
        food_type_snack: 'Local Snacks',
        food_type_pasta: 'Noodles & Mains',
        food_type_dessert: 'Desserts & Ice',
        view_food_detail: 'View Specialty ➔',

        // Feedback Page
        feedback_page_title: 'Visitor Feedback & Suggestions',
        feedback_page_desc: 'Share your night market experience, recommend hidden gem stalls, or suggest improvements!',
        feedback_name: 'Your Name / Nickname',
        feedback_name_ph: 'e.g. Alex, Street Food Lover',
        feedback_phone: 'Contact Phone (Optional)',
        feedback_email: 'Email Address',
        feedback_opinion: 'Your Feedback & Thoughts',
        feedback_opinion_ph: 'Tell us your thoughts, questions, or secret stalls you recommend...',
        feedback_submit: 'Submit Feedback ➔',
        feedback_success: 'Thank you for your valuable feedback! Submitted successfully!',
        feedback_fail: 'Failed to submit. Please try again or check your network connection.',

        // Bulletin Page
        bulletin_page_title: 'Live Night Market Announcements',
        bulletin_page_desc: 'Real-time updates on market schedules, seasonal events, and health guidelines!',

        // General
        rating: 'Rating',
        price: 'Price',
        footer_slogan: 'Taiwan Night Markets ‧ Discovering Authentic Island Flavors',
        footer_copyright: '© 2026 Taiwan Night Markets ‧ Authentic Island Food & Cultural Guide',
        lang_switch: '繁體中文'
    }
};

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('site_lang') || 'zh';
    });

    useEffect(() => {
        localStorage.setItem('site_lang', lang);
    }, [lang]);

    const toggleLang = () => {
        setLang(prev => (prev === 'zh' ? 'en' : 'zh'));
    };

    const t = (key) => {
        const dict = translations[lang] || translations.zh;
        return dict[key] || translations.zh[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}

export default LanguageContext;
