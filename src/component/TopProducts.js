import React from "react";
import { useNavigate } from "react-router-dom";

const TopProducts = ({ products, title }) => {
  const navigate = useNavigate();
  const handleProductClick = (id) => {
    // 상품 상세 페이지로 이동
    console.log("클릭된 상품 ID:", id);
    navigate(`/product/${id}`); // 상품 상세 페이지로 이동
  };

  return (
    <div className="frequent-bought">
      <h2> {title}</h2>
      <div className="product-list">
        {products.map((product) => (
          <div
            className="product-card"
            key={product.id}
            onClick={() => handleProductClick(product.id)}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.price} 원</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
