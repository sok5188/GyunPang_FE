import React from 'react';
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
    const navigate = useNavigate();
    const handleProductClick = (id) => {
    // 상품 상세 페이지로 이동
    console.log("클릭된 상품 ID:", id);
    navigate(`/product/${id}`); // 상품 상세 페이지로 이동
    };
    
  return (
    <div className="product-card" onClick={() => handleProductClick(product.id)}>
      <img src={product.image} alt={product.title} style={{width: '194px', height: '194px', objectFit: 'cover'}}/>
      <h3>{product.title}</h3>
      <p>{product.price} 원</p>
    </div>
  );
}

export default ProductCard;
