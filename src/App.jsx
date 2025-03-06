import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ListPage from "./pages/list/ListPage";
import MyPage from "./pages/mypage/MyPage";
import CreditContextProvider from "./contexts/CreditContext";

function App() {
  return (
    <CreditContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </CreditContextProvider>
  );
}

export default App;
