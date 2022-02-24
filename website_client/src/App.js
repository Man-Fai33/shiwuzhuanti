 import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Index from './Page/Index';
import SignUp from './Page/SignUp';
function App() {
  return (
    <div className="App">

      {/* <UserInfoContext.Provider  > */}
      <BrowserRouter>
        {/* <NavBar> */}
        {/* <NavBar setLogin={setLogin}> */}
        {/* <NavBarItem to={"/upload"} text={"Upload PDF"} />
          <NavBarItem to={"/pdflist"} text={"PDF List"} /> */}
        {/* </NavBar> */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/SignUp" element={<SignUp/>}/>
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
