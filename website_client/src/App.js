import './App.css';
import { BrowserRouter, Routes, Route, Outlet, } from 'react-router-dom';
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

// import Market from './Page/Market';

import { IntlProvider } from "react-intl";
import { useEffect, useState } from 'react'
import Account from './Page/Account';
import UserContext from './Context/context';
import ShopPage from './Page/Shop/shop';
function App() {
  const [lang, setLang] = useState('zh_TW')
  const [locale, setLocale] = useState(undefined)
  useEffect(async () => {
    const resp = await fetch(`./lang/${lang}.json`)
    const data = await resp.json()
    setLocale(data)
  }, [lang])

  return (

    <IntlProvider messages={lang}  >
      <div className="App" >

        <UserContext.Provider value={UserContext} >
          <BrowserRouter>
            <DrawerBar />
            {/* <NavBar> */}
            {/* <NavBar setLogin={setLogin}> */}
            {/* <NavBarItem to={"/upload"} text={"Upload PDF"} />
          <NavBarItem to={"/pdflist"} text={"PDF List"} /> */}
            {/* </NavBar> */}
            <Routes>
              <Route path="/" element={<AnimeIndex />} />
              <Route path="/Index" element={<Index />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/nightmarket" element={<NightMarket />} />
              {/* <Route path="/market" element={<Market />} /> */}
              <Route path="/nightmarketpage" element={<NightMarketPage />} />
              <Route path="/Food" element={<FoodList />} />
              <Route path='/FoodInfo' element={<FoodInfo />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/account" element={<Account />} />
              <Route path="/bulletinBoard" element={<BulletinBoard />} />
              <Route path="/feedback" element={<FeedBack />} />
              <Route path="/datamanagement" element={<DataManagement />} />
              <Route path="/shop" element={<ShopPage />} />
              {/* <Route path="upload" element={<UploadPage />} />
          <Route path="pdflist" element={<PDFListPage />} /> */}
            </Routes>
          </BrowserRouter>
          <Outlet />
        </UserContext.Provider>

      </div>
    </IntlProvider>
  );
}

export default App;
