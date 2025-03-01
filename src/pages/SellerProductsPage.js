import React, { useState, useEffect } from "react";
import SellerItem from "../components/SellerItem";
import filterIcon from "../res/icon/filter_icon.png"; // 필터 아이콘 추가
import closeIcon from "../res/icon/close_icon.png"; // 닫기 아이콘 추가
import addIcon from "../res/icon/add_icon.png"; // 추가 아이콘 추가

const food_pic =
  "https://storage.googleapis.com/gyunpang_img/images/food_pic.jpg?GoogleAccessId=gyunpang-be@cedar-setup-420206.iam.gserviceaccount.com&Expires=3476843910&Signature=uSlgaf4jvP4mh%2BtH99aRSzrDJgSSkxVmFmJQmfVDXoxRqOzYyQ9Kl%2F3Fxf5QPHD4QIodJZwLqVaTAA0wu2p2Y1dltijLpr58sl3GhjIy%2FbQXBU4nGyhivleQb6UAm1YiXdpCRSlOpdyARAoUK7mH9ST3l%2Fr72DXL4hy%2B1PJuVD2U%2FgVY2fCYPoEN5DQgyRXBD%2FQRdSLWwpfHGHPF5oBqhjclACiJjJ9SZWRoZ27X3JSVaRC75CIKo%2BTWz8xaheb28KXJQYuZzHrUDV8IV52Dbwbzjyr9j4%2Bp988x1BQ10VQr3RMneCGnwOkYitDTwKWHuTLfQU2OXDUyoOMdByjTiw%3D%3D";

const SellerProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showPopup, setShowPopup] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    mainImage: null,
    detailImage: null,
    price: "",
    stock: "",
    category: "",
  });

  useEffect(() => {
    // 더미 데이터 추가
    const dummyProducts = [
      {
        id: 1,
        image: food_pic,
        title: "상품 1",
        originalPrice: 10000,
        currentPrice: 9000,
        stock: 50,
        status: "판매 중",
      },
      {
        id: 2,
        image: food_pic,
        title: "상품 2",
        originalPrice: 20000,
        currentPrice: 18000,
        stock: 30,
        status: "판매 중",
      },
      {
        id: 3,
        image: food_pic,
        title: "상품 3",
        originalPrice: 15000,
        currentPrice: 14000,
        stock: 20,
        status: "판매 중단",
      },
    ];
    setProducts(dummyProducts);
  }, []);

  const filteredProducts = products.filter((product) => {
    if (filter === "all") return true;
    if (filter === "active") return product.status === "판매 중";
    if (filter === "inactive") return product.status === "판매 중단";
    return true;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (filter === "priceLow") {
      return a.currentPrice - b.currentPrice;
    } else if (filter === "priceHigh") {
      return b.currentPrice - a.currentPrice;
    } else if (filter === "stockLow") {
      return a.stock - b.stock;
    } else if (filter === "stockHigh") {
      return b.stock - a.stock;
    }
    return 0;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: files[0],
    }));
  };

  const handleAddProduct = (startSelling) => {
    // 상품 등록 로직 추가
    // startSelling이 true이면 판매 시작, false이면 등록만 하기
    setShowPopup(false);
  };

  return (
    <div className="seller-products-page">
      <div className="filters">
        <button
          className="add-product-button"
          onClick={() => setShowPopup(true)}>
          <img src={addIcon} alt="Add" className="add-icon" /> 새 상품 등록
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
            <option value="priceLow">가격 낮은 순</option>
            <option value="priceHigh">가격 높은 순</option>
            <option value="stockLow">재고 적은 순</option>
            <option value="stockHigh">재고 많은 순</option>
          </select>
        </div>
      </div>
      <div className="seller-items-list">
        {sortedProducts.map((product) => (
          <SellerItem key={product.id} product={product} />
        ))}
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2>새 상품 등록</h2>
              <img
                src={closeIcon}
                alt="Close"
                className="close-icon"
                onClick={() => setShowPopup(false)}
              />
            </div>
            <div className="input-group">
              <label>상품 이름:</label>
              <input
                type="text"
                name="title"
                value={newProduct.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>대표 이미지 등록:</label>
              <input
                type="file"
                name="mainImage"
                onChange={handleImageChange}
              />
            </div>
            <div className="input-group">
              <label>상세 이미지 등록:</label>
              <input
                type="file"
                name="detailImage"
                onChange={handleImageChange}
              />
            </div>
            <div className="input-group">
              <label>가격:</label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>재고 수량:</label>
              <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>카테고리:</label>
              <input
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="popup-actions">
              <button
                className="confirm-button"
                onClick={() => handleAddProduct(true)}>
                판매 시작
              </button>
              <button
                className="confirm-button"
                onClick={() => handleAddProduct(false)}>
                등록만 하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProductsPage;
