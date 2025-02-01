import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';



// 구매자 정보 컴포넌트
const BuyerInfo = ({ buyerInfo }) => {
  return (
    <div className="buyer-info">
      <h3>구매자 정보</h3>
      <div><strong>이름:</strong> {buyerInfo.name}</div>
      <div><strong>이메일:</strong> {buyerInfo.email}</div>
      <div><strong>주소:</strong> {buyerInfo.address}</div>
    </div>
  );
};

// 결제 정보 컴포넌트
const PaymentInfo = ({ payInfo }) => {
  return (
    <div className="payment-info">
      <h3>결제 정보</h3>
      <div><strong>상품 가격:</strong> {payInfo.productPrice} 원</div>
      <div><strong>할인 쿠폰:</strong> -{payInfo.discount} 원</div>
      <div><strong>배송비:</strong> {payInfo.shippingFee} 원</div>
      <div><strong>총 결제금액:</strong> {payInfo.finalPrice} 원</div>
    </div>
  );
};

// 주문 및 결제 페이지
const OrderPage = () => {
    const { orderId } = useParams();
  const [buyerInfo, setBuyerInfo] = useState({});

  // 결제 정보 상태
    const [payInfo, setPayInfo] = useState({});
    
    useEffect(() => {
    // API 호출 또는 로컬 데이터 로딩
    const fetchedOrderInfo = {
      id: orderId,
      name: '상품명',
        buyerInfo: {
          name: "홍길동",
    email: "hong@example.com",
    address: "서울시 강남구 테헤란로 123"
        },
        payInfo: {
            productPrice: "10000",
            discount: "3000",
            shippingFee: "1000",
            finalPrice:"7000"
        }
    };
        setBuyerInfo(fetchedOrderInfo.buyerInfo);
        setPayInfo(fetchedOrderInfo.payInfo);
        
  }, [orderId]);

  return (
    <div className="order-payment-page">
      <h2>주문 및 결제</h2>

      <BuyerInfo buyerInfo={buyerInfo} />

      <PaymentInfo 
        payInfo={payInfo}
      />

      <div className="order-summary">
        <button className="submit-order-button">주문 완료</button>
      </div>
    </div>
  );
};

export default OrderPage;
