import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/main.css"; // CSS 파일 임포트

const Header = ({ token, handleLogout }) => {
  const [categories, setCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [minorCategories, setMinorCategories] = useState([]);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null); // 현재 hover된 카테고리 ID
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // 드롭다운 보이기 여부
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data); // 예시로 받아온 카테고리 목록
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    console.log("Header component mounted");
    const mockCategories = [
      { id: 1, name: "Electronics", subIdList: [11, 12], level: 0 },
      { id: 2, name: "Home Appliances", subIdList: [21, 22], level: 0 },
      { id: 3, name: "Fashion", subIdList: [31, 32], level: 0 },
      { id: 11, name: "Mobile Phones", subIdList: [111, 112], level: 1 },
      { id: 12, name: "Laptops", subIdList: [121, 122], level: 1 },
      { id: 21, name: "Refrigerators", subIdList: [], level: 1 },
      { id: 22, name: "Washing Machines", subIdList: [], level: 1 },
      { id: 31, name: "Men", subIdList: [], level: 1 },
      { id: 32, name: "Women", subIdList: [], level: 1 },
      { id: 111, name: "Smartphones", subIdList: [], level: 2 },
      { id: 112, name: "Feature Phones", subIdList: [], level: 2 },
      { id: 121, name: "Gaming Laptops", subIdList: [], level: 2 },
      { id: 122, name: "Business Laptops", subIdList: [], level: 2 },
    ];
    setCategories(mockCategories);

    setMainCategories(mockCategories.filter((cat) => cat.level === 0));
    // setSubCategories(mockCategories.filter((cat) => cat.level === 1));
    // setMinorCategories(mockCategories.filter((cat) => cat.level === 2));

    // fetchCategories();
  }, []);

  const doLogout = async () => {
    try {
      await axios.delete("gateway/signout");
      handleLogout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/search/${categoryId}`); // 카테고리 클릭 시 검색 페이지로 이동
  };

  const handleCategoryHover = (categoryId) => {
    setHoveredCategoryId(categoryId); // hover된 카테고리 ID를 설정
    console.log("hoveredCategoryId", hoveredCategoryId);
    const hoveredCategory = categories.find((cat) => cat.id === categoryId);
    if (hoveredCategory) {
      if (hoveredCategory.level === 0) {
        setSubCategories(
          categories.filter((cat) => hoveredCategory.subIdList.includes(cat.id))
        );
        setMinorCategories([]);
      } else if (hoveredCategory.level === 1) {
        setMinorCategories(
          categories.filter((cat) => hoveredCategory.subIdList.includes(cat.id))
        );
      }
    }
  };

  const handleDropdownMouseLeave = () => {
    setIsDropdownVisible(false);
    setMinorCategories([]);
    setSubCategories([]);
  };

  return (
    <header className="header">
      <div className="header-left">
        {/* 카테고리 검색 버튼 */}
        <li
          className="category-dropdown"
          onMouseEnter={() => setIsDropdownVisible(true)} // 마우스를 올리면 드롭다운 열기
          onMouseLeave={() => handleDropdownMouseLeave()} // 마우스를 내리면 드롭다운 닫기
        >
          <button>
            <div className="hamburger-icon">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
            <span>카테고리</span>
          </button>

          {isDropdownVisible && (
            <div className="category-container">
              <div className="category-box">
                {mainCategories.map((category) => (
                  <div
                    key={category.id} // key 속성 추가
                    className="category-item"
                    onMouseEnter={() => handleCategoryHover(category.id)} // 마우스를 올리면 하위 카테고리 보이기
                    onClick={() => handleCategoryClick(category.id)} // 클릭 시 해당 카테고리 검색 페이지로 이동
                  >
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
              {subCategories.length > 0 && (
                <div className="category-box">
                  {subCategories.map((category) => (
                    <div
                      key={category.id} // key 속성 추가
                      className="category-item"
                      onMouseEnter={() => handleCategoryHover(category.id)} // 마우스를 올리면 하위 카테고리 보이기
                      onClick={() => handleCategoryClick(category.id)} // 클릭 시 해당 카테고리 검색 페이지로 이동
                    >
                      <span>{category.name}</span>
                    </div>
                  ))}
                </div>
              )}
              {minorCategories.length > 0 && (
                <div className="category-box">
                  {minorCategories.map((category) => (
                    <div
                      key={category.id} // key 속성 추가
                      className="category-item"
                      onMouseEnter={() => handleCategoryHover(category.id)} // 마우스를 올리면 하위 카테고리 보이기
                      onClick={() => handleCategoryClick(category.id)} // 클릭 시 해당 카테고리 검색 페이지로 이동
                    >
                      <span>{category.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </li>
      </div>

      <div className="logo">
        <Link to="/">Gyunpang</Link>
      </div>

      <nav>
        <ul>
          {token && (
            <>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/my-info">My Info</Link>
              </li>
              <li>
                <Link to="/custom-service">Custom Service</Link>
              </li>
            </>
          )}
          {token ? (
            <li>
              <button onClick={doLogout}>Logout</button>
            </li>
          ) : (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
