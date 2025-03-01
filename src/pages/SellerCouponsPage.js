import React, { useState, useEffect } from "react";
import addIcon from "../res/icon/add_icon.png";
import filterIcon from "../res/icon/filter_icon.png"; // 필터 아이콘 추가
import closeIcon from "../res/icon/close_icon.png"; // 닫기 아이콘 추가
import deleteIcon from "../res/icon/delete_icon.png"; // 삭제 아이콘 추가
import "../css/seller.css"; // CSS 파일 추가

const food_pic =
  "https://storage.googleapis.com/gyunpang_img/images/food_pic.jpg?GoogleAccessId=gyunpang-be@cedar-setup-420206.iam.gserviceaccount.com&Expires=3476843910&Signature=uSlgaf4jvP4mh%2BtH99aRSzrDJgSSkxVmFmJQmfVDXoxRqOzYyQ9Kl%2F3Fxf5QPHD4QIodJZwLqVaTAA0wu2p2Y1dltijLpr58sl3GhjIy%2FbQXBU4nGyhivleQb6UAm1YiXdpCRSlOpdyARAoUK7mH9ST3l%2Fr72DXL4hy%2B1PJuVD2U%2FgVY2fCYPoEN5DQgyRXBD%2FQRdSLWwpfHGHPF5oBqhjclACiJjJ9SZWRoZ27X3JSVaRC75CIKo%2BTWz8xaheb28KXJQYuZzHrUDV8IV52Dbwbzjyr9j4%2Bp988x1BQ10VQr3RMneCGnwOkYitDTwKWHuTLfQU2OXDUyoOMdByjTiw%3D%3D";

const SellerCouponsPage = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showPopup, setShowPopup] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // 더미 데이터 추가
    const dummyProducts = [
      {
        id: 1,
        image: food_pic,
        title: "상품 1",
        productPrice: 10000,
        discountPrice: 9000,
        remainingQuantity: 50,
        status: "판매 중",
        allowMultipleUse: true,
      },
      {
        id: 2,
        image: food_pic,
        title: "상품 2",
        productPrice: 20000,
        discountPrice: 18000,
        remainingQuantity: 30,
        status: "판매 중",
        allowMultipleUse: false,
      },
      {
        id: 3,
        image: food_pic,
        title: "상품 3",
        productPrice: 15000,
        discountPrice: 14000,
        remainingQuantity: 20,
        status: "판매 중단",
        allowMultipleUse: true,
      },
    ];
    setProducts(dummyProducts);
  }, []);

  const handleAddCoupon = () => {
    // 쿠폰 추가 로직 추가
    setShowPopup(false);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    console.log(selectedProduct);
  };

  const handleDeleteCoupon = (productId) => {
    // 쿠폰 삭제 로직 추가
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const handleDeselectProduct = () => {
    setSelectedProduct(null);
    console.log(selectedProduct);
  };

  const filteredProducts = products.filter((product) => {
    if (filter === "all") return true;
    if (filter === "active") return product.status === "판매 중";
    if (filter === "inactive") return product.status === "판매 중단";
    return true;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (filter === "remainingHigh") {
      return b.remainingQuantity - a.remainingQuantity;
    } else if (filter === "remainingLow") {
      return a.remainingQuantity - b.remainingQuantity;
    } else if (filter === "discountHigh") {
      return (
        b.productPrice - b.discountPrice - (a.productPrice - a.discountPrice)
      );
    } else if (filter === "discountLow") {
      return (
        a.productPrice - a.discountPrice - (b.productPrice - b.discountPrice)
      );
    }
    return 0;
  });

  const searchedProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="seller-coupons-page">
      <div className="filters">
        <button
          className="add-product-button"
          onClick={() => setShowPopup(true)}>
          <img src={addIcon} alt="Add" className="add-icon" />
          쿠폰 등록하기
        </button>
        <div className="filter-controls">
          <img src={filterIcon} alt="Filter Icon" className="filter-icon" />
          <select
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            className="filter-dropdown">
            <option value="all">모두</option>
            <option value="active">판매 중</option>
            <option value="inactive">판매 정지</option>
            <option value="remainingHigh">잔여량 많은 순</option>
            <option value="remainingLow">잔여량 적은 순</option>
            <option value="discountHigh">할인액 높은 순</option>
            <option value="discountLow">할인액 낮은 순</option>
          </select>
        </div>
      </div>
      <div className="seller-items-list">
        {sortedProducts.map((product) => (
          <div key={product.id} className="seller-item-container">
            <img
              src={product.image}
              alt={product.title}
              className="seller-item-image"
            />
            <div className="seller-item-details">
              <h3 className="seller-item-title">{product.title}</h3>
              <p className="seller-item-price">
                상품 금액: {product.productPrice}원
              </p>
              <p className="seller-item-price">
                쿠폰 적용 가격: {product.discountPrice}원
              </p>
            </div>
            <div className="seller-item-stock">
              잔여 수량: {product.remainingQuantity}개
            </div>
            {product.allowMultipleUse && (
              <div className="seller-item-multiple-use">중복 가능</div>
            )}
          </div>
        ))}
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2>쿠폰 등록</h2>
              <img
                src={closeIcon}
                alt="Close"
                className="close-icon"
                onClick={() => setShowPopup(false)}
              />
            </div>
            <div className="input-group">
              <label>상품 검색:</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="search-results">
              {searchedProducts.map((product) => (
                <div
                  key={product.id}
                  className="search-result-item"
                  onClick={() => handleProductClick(product)}>
                  <p>{product.title}</p>
                  <p>{product.productPrice}원</p>
                </div>
              ))}
            </div>
            {selectedProduct && (
              <div className="selected-product">
                <h3>선택된 상품</h3>
                <p>상품 이름: {selectedProduct.title}</p>
                <p>상품 가격: {selectedProduct.productPrice}원</p>
                <img
                  src={deleteIcon}
                  alt="Deselect"
                  className="delete-icon"
                  onClick={handleDeselectProduct}
                />
              </div>
            )}
            <div className="quantity-input">
              <div>
                <label>수량 : </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                />
              </div>
              <div className="add-button-container">
                <button
                  onClick={handleAddCoupon}
                  disabled={!selectedProduct}
                  className={!selectedProduct ? "disabled" : ""}>
                  추가하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerCouponsPage;
