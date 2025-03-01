import React from "react";
import ProductCard from "./ProductCard";

const TopProducts = ({ products, title }) => {
  

  return (
    <div className="frequent-bought">
      <h2> {title}</h2>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard product={product}/>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
