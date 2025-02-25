import React, { useState, useEffect } from "react";
import SellerItem from "../component/SellerItem";

const SellerProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("status");

  useEffect(() => {
    // 상품 목록을 불러오는 로직 추가
    const fetchProducts = async () => {
      // 예시: API 호출
      const response = await fetch("/api/seller/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleStockUpdate = (productId) => {
    // 재고 수정 로직 추가
  };

  const handleStatusToggle = (productId) => {
    // 판매 상태 변경 로직 추가
  };

  const sortedProducts = products.sort((a, b) => {
    if (filter === "status") {
      return a.status === "판매 중" ? -1 : 1;
    } else if (filter === "price") {
      return a.currentPrice - b.currentPrice;
    } else if (filter === "stock") {
      return a.stock - b.stock;
    }
    return 0;
  });

  return (
    <div className="seller-products-page">
      <div className="filters">
        <button onClick={() => setFilter("status")}>판매 상태</button>
        <button onClick={() => setFilter("price")}>현재 가격</button>
        <button onClick={() => setFilter("stock")}>재고 현황</button>
      </div>
      <div className="seller-items-list">
        {sortedProducts.map((product) => (
          <SellerItem
            key={product.id}
            product={product}
            onStockUpdate={handleStockUpdate}
            onStatusToggle={handleStatusToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default SellerProductsPage;
