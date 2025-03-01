import React from "react";

function OrderItem({ product, orderStatus }) {
  return (
    <div className="order-item-container">
      <img
        src={product.image}
        alt={product.title}
        className="order-item-image"
      />
      <div className="order-item-details">
        <h3 className="order-item-title">{product.title}</h3>
        <p className="order-item-price">
          {product.price}원
          {product.discount > 0 && (
            <span className="order-item-discount"> (-{product.discount}%)</span>
          )}
        </p>
      </div>
      <div className="order-item-actions">
        <button>교환/반품 신청</button>
        {orderStatus === "배송 완료" && (
          <button>
            {product.reviewStatus ? "리뷰 확인하기" : "리뷰 남기기"}
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderItem;
