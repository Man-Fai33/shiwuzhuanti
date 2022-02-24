// import logo from './logo.svg';
import React, { useState } from 'react'

import './App.css';
import "tailwindcss/tailwind.css"
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Index from './page/Index';
import NavBar from './components/Navber';

function App() {
  const [userToken, setLogin] = useState(null)
  const [userInfo, setUserInfo] = useState(null)

  return (
    <div className="container">
      {/* <UserInfoContext.Provider  > */}
      <BrowserRouter>
        <NavBar>
          {/* <NavBar setLogin={setLogin}> */}
          {/* <NavBarItem to={"/upload"} text={"Upload PDF"} />
          <NavBarItem to={"/pdflist"} text={"PDF List"} /> */}
        </NavBar>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* <Route path="upload" element={<UploadPage />} />
          <Route path="pdflist" element={<PDFListPage />} /> */}
        </Routes>
      </BrowserRouter>
      <Outlet />
      {/* </UserInfoContext.Provider> */}
    </div>

  );
}

export default App;
