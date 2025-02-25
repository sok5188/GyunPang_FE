import React, { useState, useEffect } from "react";

const SellerCouponsPage = () => {
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [allowMultipleUse, setAllowMultipleUse] = useState(false);
  const [quantity, setQuantity] = useState(1);

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

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(products.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleProductSelect = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleAddCoupon = () => {
    // 쿠폰 추가 로직 추가
    setShowPopup(false);
  };

  const filteredProducts = showOnlyActive
    ? products.filter((product) => product.status === "판매 중")
    : products;

  return (
    <div className="seller-coupons-page">
      <button onClick={() => setShowPopup(true)}>쿠폰 등록하기</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>쿠폰 등록</h2>
            <div className="product-list">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-item">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />
                  <div className="product-details">
                    <h3>{product.title}</h3>
                    <p>{product.currentPrice}원</p>
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleProductSelect(product.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="filters">
              <label>
                <input
                  type="checkbox"
                  checked={selectedProducts.length === products.length}
                  onChange={handleSelectAll}
                />
                전체 선택
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={showOnlyActive}
                  onChange={() => setShowOnlyActive(!showOnlyActive)}
                />
                판매중인 상품만 보기
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={allowMultipleUse}
                  onChange={() => setAllowMultipleUse(!allowMultipleUse)}
                />
                중복 사용 가능
              </label>
            </div>
            <div className="quantity-input">
              <label>수량:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
              />
              <button onClick={handleAddCoupon}>추가하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerCouponsPage;
