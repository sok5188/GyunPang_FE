import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function ProductInfo({ product }) {
    const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
    
    const handleBuy = async() => {
        try {
          //send api
            navigate(`/order/${product.id}`)
        } catch (error) {
            
      }
  }

  const discountedPrice = product.price * 0.8; // 예시로 20% 할인

  return (
    <div className="product-info">
      <h2>{product.name}</h2>
      <div className="product-rating">
        <span>평점: {product.rating} / 5</span> <span>{product.reviewCount}개 리뷰</span>
      </div>

      <div className="product-price">
        <span className="discounted-price">{discountedPrice.toLocaleString()} 원</span>
        <span className="original-price">{product.originalPrice.toLocaleString()} 원</span>
      </div>

      <div className="product-seller">
        <span>판매자: {product.seller}</span>
      </div>

      <div className="quantity-selector">
        <button onClick={handleDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={handleIncrease}>+</button>
      </div>

      <div className="buttons">
        <button className="add-to-cart">장바구니 담기</button>
        <button className="buy-now" onClick={handleBuy}>바로 구매</button>
      </div>
    </div>
  );
}

export default ProductInfo;
