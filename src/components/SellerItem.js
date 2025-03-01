import React, { useState } from "react";

function SellerItem({ product }) {
  const [isEditingStock, setIsEditingStock] = useState(false);
  const [newStock, setNewStock] = useState(product.stock);
  const [status, setStatus] = useState(product.status);

  const handleStockUpdate = () => {
    if (isEditingStock) {
      // API 요청을 보내고 결과에 따라 수량 업데이트
      fetch(`/api/products/${product.id}/update-stock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stock: newStock }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("재고가 업데이트되었습니다.");
          setIsEditingStock(false);
        })
        .catch((error) => {
          alert("재고 업데이트에 실패했습니다.");
        });
    } else {
      setIsEditingStock(true);
    }
  };

  const handleCancelStockUpdate = () => {
    setIsEditingStock(false);
    setNewStock(product.stock);
  };

  const handleStatusToggle = () => {
    // API 요청을 보내고 상태 업데이트
    const newStatus = status === "판매 중" ? "판매 중단" : "판매 중";
    fetch(`/api/products/${product.id}/update-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        setStatus(newStatus);
        alert(`상태가 ${newStatus}로 업데이트되었습니다.`);
      })
      .catch((error) => {
        alert("상태 업데이트에 실패했습니다.");
      });
  };

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
      </div>
      <div className="seller-item-actions">
        <p className="seller-item-stock">
          재고:{" "}
          {isEditingStock ? (
            <input
              type="number"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
            />
          ) : (
            `${product.stock}개`
          )}
          {isEditingStock ? (
            <>
              <button onClick={handleStockUpdate}>확인</button>
              <button onClick={handleCancelStockUpdate}>취소</button>
            </>
          ) : (
            <button onClick={handleStockUpdate}>재고 수정</button>
          )}
        </p>
        <p className="seller-item-status">
          상태: {status}
          <button onClick={handleStatusToggle}>
            {status === "판매 중" ? "판매 중지" : "판매 개시"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default SellerItem;
