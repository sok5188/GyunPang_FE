import React, { useState } from "react";
import CouponPage from "../components/CouponPage"; // 쿠폰 목록
import InquiryPage from "../components/InquiryPage"; // 문의 목록
import ReviewPage from "../components/ReviewPage"; // 리뷰 목록
import InfoEditPage from "../components/InfoEditPage"; // 정보 수정
import OrderInfoPage from "../components/OrderInfoPage";

function MyInfoPage() {
  const [selectedMenu, setSelectedMenu] = useState("orders"); // 기본적으로 주문 내역 선택

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu); // 클릭된 메뉴로 상태 업데이트
  };

  return (
    <div className="my-info-container">
      <div className="menu-bar">
        <ul>
          <li
            className={selectedMenu === "orders" ? "active" : ""}
            onClick={() => handleMenuClick("orders")}>
            주문 내역
          </li>
          <li
            className={selectedMenu === "coupons" ? "active" : ""}
            onClick={() => handleMenuClick("coupons")}>
            쿠폰 목록
          </li>
          <li
            className={selectedMenu === "inquiries" ? "active" : ""}
            onClick={() => handleMenuClick("inquiries")}>
            문의 목록
          </li>
          <li
            className={selectedMenu === "reviews" ? "active" : ""}
            onClick={() => handleMenuClick("reviews")}>
            리뷰 목록
          </li>
          <li
            className={selectedMenu === "info-edit" ? "active" : ""}
            onClick={() => handleMenuClick("info-edit")}>
            정보 수정
          </li>
        </ul>
      </div>

      <div className="content">
        {selectedMenu === "orders" && <OrderInfoPage />}
        {selectedMenu === "coupons" && <CouponPage />}
        {selectedMenu === "inquiries" && <InquiryPage />}
        {selectedMenu === "reviews" && <ReviewPage />}
        {selectedMenu === "info-edit" && <InfoEditPage />}
      </div>
    </div>
  );
}

export default MyInfoPage;
