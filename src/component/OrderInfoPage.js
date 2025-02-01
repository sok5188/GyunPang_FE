import React from 'react';
import ProductCard from './ProductCard';

function OrderInfoPage() {
  const orders = [
    { id: 1, date: '2023-01-01', status: '배송 중', deliveryDate: '2023-01-10', products: [], reviewStatus: false },
    { id: 2, date: '2023-02-01', status: '배송 완료', deliveryDate: '2023-02-10', products: [], reviewStatus: true }
  ];

  return (
    <div className="orders-page">
      {orders.map((order) => (
        <div key={order.id} className="order-item">
          <div className="order-header">
            <span>주문 날짜: {order.date}</span>
            <span>상태: {order.status}</span>
            <span>도착 날짜: {order.deliveryDate}</span>
          </div>

          <div className="order-products">
            {order.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="order-actions">
            {order.status === '배송 완료' && !order.reviewStatus && (
              <button>리뷰 남기기</button>
            )}
            <button>교환/반품 신청</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderInfoPage;
