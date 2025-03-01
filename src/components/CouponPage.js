import React, { useState } from "react";

function CouponPage() {
  const [coupon, setCoupon] = useState("");
  const coupons = [
    { name: "10% 할인", discount: "10%", validUntil: "2023-12-31" },
    { name: "5,000원 할인", discount: "5000원", validUntil: "2023-06-30" },
  ];

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    console.log(`쿠폰 코드 제출: ${coupon}`);
    // 쿠폰 적용 로직 추가
  };

  return (
    <div className="coupons-page">
      <form className="coupon-form" onSubmit={handleCouponSubmit}>
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="쿠폰 코드 입력"
        />
        <button type="submit">쿠폰 적용</button>
      </form>

      <table className="coupons-table">
        <thead>
          <tr>
            <th>쿠폰명</th>
            <th>할인액</th>
            <th>유효기간</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => (
            <tr key={index}>
              <td>{coupon.name}</td>
              <td>{coupon.discount}</td>
              <td>{coupon.validUntil}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CouponPage;
