import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SellerHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // 로그아웃 로직 추가
    navigate("/login");
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <header>
      <nav>
        <ul>
          <li
            className={location.pathname === "/seller/products" ? "active" : ""}
            onClick={() => navigateTo("/seller/products")}>
            상품관리
          </li>
          <li
            className={location.pathname === "/seller/coupons" ? "active" : ""}
            onClick={() => navigateTo("/seller/coupons")}>
            쿠폰관리
          </li>
          <li
            className={location.pathname === "/seller/reviews" ? "active" : ""}
            onClick={() => navigateTo("/seller/reviews")}>
            리뷰관리
          </li>
          <li
            className={
              location.pathname === "/seller/inquiries" ? "active" : ""
            }
            onClick={() => navigateTo("/seller/inquiries")}>
            문의 관리
          </li>
        </ul>
      </nav>
      <button onClick={handleLogout}>로그아웃</button>
    </header>
  );
};

export default SellerHeader;
