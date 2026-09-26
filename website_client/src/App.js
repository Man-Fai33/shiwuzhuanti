import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import AnimeIndex from './Page/AnimeIndex';
import Index from './Page/Index';
import SignUp from './Page/SignUp';
import SignIn from './Page/SignIn';
import NightMarket from './Page/NightMarket';
import NightMarketPage from './Page/NightMarketPage';
import BulletinBoard from './Page/BulletinBoard';
import FeedBack from './Page/FeedBack';
import DrawerBar from './Compnonet/DrawerBar';
import FoodList from './Page/FoodList';
import FoodInfo from './Page/FoodInfo';
import Profile from './Page/Profile';
import DataManagement from './Page/DataManagement';
import Account from './Page/Account';
import TravelGuide from './Page/TravelGuide';
import UserContext from './Context/context';
import { LanguageProvider } from './Context/LanguageContext';
import { WishlistProvider } from './Context/WishlistContext';
import ShopPage from './Page/Shop/shop';

function App() {
  return (
    <LanguageProvider>
      <WishlistProvider>
        <div className="App">
          <UserContext.Provider value={UserContext}>
          <BrowserRouter>
            <DrawerBar />
          <Routes>
            {/* 首頁預設直接進入精美主頁 */}
            <Route path="/" element={<Index />} />
            <Route path="/index" element={<Index />} />
            <Route path="/Index" element={<Index />} />
            <Route path="/intro" element={<AnimeIndex />} />

            {/* 會員認證 */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/SignUp" element={<SignUp />} />

            {/* 夜市模組 */}
            <Route path="/nightmarket" element={<NightMarket />} />
            <Route path="/nightMarket" element={<NightMarket />} />
            <Route path="/nightmarketpage" element={<NightMarketPage />} />
            <Route path="/nightMarketPage" element={<NightMarketPage />} />

            {/* 跨縣市與外國旅人攻略指南 */}
            <Route path="/guide" element={<TravelGuide />} />
            <Route path="/Guide" element={<TravelGuide />} />

            {/* 美食模組 */}
            <Route path="/food" element={<FoodList />} />
            <Route path="/Food" element={<FoodList />} />
            <Route path="/foodinfo" element={<FoodInfo />} />
            <Route path="/foodInfo" element={<FoodInfo />} />
            <Route path="/FoodInfo" element={<FoodInfo />} />

            {/* 店家攤位 */}
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/Shop" element={<ShopPage />} />

            {/* 會員中心 */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/account" element={<Account />} />
            <Route path="/Account" element={<Account />} />

            {/* 公告與回饋 */}
            <Route path="/bulletinboard" element={<BulletinBoard />} />
            <Route path="/bulletinBoard" element={<BulletinBoard />} />
            <Route path="/feedback" element={<FeedBack />} />
            <Route path="/FeedBack" element={<FeedBack />} />

            {/* 資料管理後台 */}
            <Route path="/datamanagement" element={<DataManagement />} />
            <Route path="/dataManagement" element={<DataManagement />} />
          </Routes>
        </BrowserRouter>
        <Outlet />
      </UserContext.Provider>
    </div>
    </WishlistProvider>
  </LanguageProvider>
  );
}

export default App;
