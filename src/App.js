// App.js

import React, { useState, useEffect } from "react";
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
import "./css/myinfo.css";
import "./css/auth.css";
import Header from "./component/Header";
import SellerHeader from "./component/SellerHeader";
import FindPasswordPage from "./pages/FindPasswordPage";
import FindUsernamePage from "./pages/FindUserNamePage";
import CartPage from "./pages/CartPage";
import MyInfoPage from "./pages/MyInfoPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import OrderPage from "./pages/OrderPage";
import SearchResultPage from "./pages/SearchResultPage";
import SellerProductsPage from "./pages/SellerProductsPage";
import SellerCouponsPage from "./pages/SellerCouponsPage";
import SellerReviewsPage from "./pages/SellerReviewsPage";
import SellerInquiriesPage from "./pages/SellerInquiriesPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("AccessToken"));
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    // 판매자 여부를 확인하는 로직 추가
    if (token) {
      // 예시: 토큰을 통해 판매자 여부를 확인
      const userRole = localStorage.getItem("UserRole");
      setIsSeller(userRole === "seller");
      //setIsSeller(true);
    }
  }, [token]);

  const handleLogin = (newToken) => {
    setToken(newToken); // 로그인 후 토큰 상태 업데이트
    localStorage.setItem("AccessToken", newToken); // 로컬 스토리지에 저장
    // 예시: 로그인 후 판매자 여부를 확인
    const userRole = "seller"; // 실제 로직으로 대체
    localStorage.setItem("UserRole", userRole);
    setIsSeller(userRole === "seller");
  };

  const handleLogout = () => {
    setToken(null); // 로그아웃 후 토큰 상태 초기화
    localStorage.removeItem("AccessToken"); // 로컬 스토리지에서 삭제
    localStorage.removeItem("UserRole");
    setIsSeller(false);
  };

  return (
    <Router>
      {isSeller ? (
        <SellerHeader />
      ) : (
        <Header token={token} handleLogout={handleLogout} />
      )}
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
        <Route path="/seller/products" element={<SellerProductsPage />} />
        <Route path="/seller/coupons" element={<SellerCouponsPage />} />
        <Route path="/seller/reviews" element={<SellerReviewsPage />} />
        <Route path="/seller/inquiries" element={<SellerInquiriesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
