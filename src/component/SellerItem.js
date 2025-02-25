import React from "react";

function SellerItem({ product, onStockUpdate, onStatusToggle }) {
  return (
    <div className="seller-item-container">
      <img
        src={product.image}
        alt={product.title}
        className="seller-item-image"
      />
      <div className="seller-item-details">
        <h3 className="seller-item-title">{product.title}</h3>
        <p className="seller-item-price">
          등록 가격: {product.originalPrice}원
        </p>
        <p className="seller-item-price">현재 가격: {product.currentPrice}원</p>
        <p className="seller-item-stock">
          재고: {product.stock}개
          <button onClick={() => onStockUpdate(product.id)}>재고 수정</button>
        </p>
        <p className="seller-item-status">
          상태: {product.status}
          <button onClick={() => onStatusToggle(product.id)}>
            {product.status === "판매 중" ? "판매 중지" : "판매 개시"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default SellerItem;
