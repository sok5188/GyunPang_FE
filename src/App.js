// App.js

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HealthPage from "./pages/HealthPage";
import DefaultPage from "./pages/DefaultPage";
import AuthPage from "./pages/AuthPage";
import SignupPage from "./pages/SignUpPage";
import "./css/main.css";
import "./css/header.css";
import "./css/order.css";
import "./css/backbutton.css";
import "./css/home.css";
import "./css/cart.css";
import Header from "./component/Header";
import FindPasswordPage from "./pages/FindPasswordPage";
import FindUsernamePage from "./pages/FindUserNamePage";
import CartPage from "./pages/CartPage";
import MyInfoPage from "./pages/MyInfoPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import OrderPage from "./pages/OrderPage";
import SearchResultPage from "./pages/SearchResultPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("AccessToken"));

  const handleLogin = (newToken) => {
    setToken(newToken); // 로그인 후 토큰 상태 업데이트
    localStorage.setItem("AccessToken", newToken); // 로컬 스토리지에 저장
  };

  const handleLogout = () => {
    setToken(null); // 로그아웃 후 토큰 상태 초기화
    localStorage.removeItem("AccessToken"); // 로컬 스토리지에서 삭제
  };

  return (
    <Router>
      <Header token={token} handleLogout={handleLogout} />
      <Routes>
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/order/:orderId" element={<OrderPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/my-info" element={<MyInfoPage />} />
        <Route path="/health" element={<HealthPage />} />
        <Route path="/auth" element={<AuthPage handleLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/find-username" element={<FindUsernamePage />} />
        <Route path="/find-password" element={<FindPasswordPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={<DefaultPage token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
