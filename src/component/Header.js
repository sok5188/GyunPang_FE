import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/main.css"; // CSS 파일 임포트

const Header = ({ token, handleLogout }) => {
  const [categories, setCategories] = useState([]);
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
    const mockCategories = [
      { id: 1, name: "Electronics", subIdList: [11, 12] },
      { id: 2, name: "Home Appliances", subIdList: [21, 22] },
      { id: 3, name: "Fashion", subIdList: [31, 32] },
      { id: 11, name: "Mobile Phones", subIdList: [111, 112] },
      { id: 12, name: "Laptops", subIdList: [121, 122] },
      { id: 21, name: "Refrigerators", subIdList: [] },
      { id: 22, name: "Washing Machines", subIdList: [] },
      { id: 31, name: "Men", subIdList: [] },
      { id: 32, name: "Women", subIdList: [] },
      { id: 111, name: "Smartphones", subIdList: [] },
      { id: 112, name: "Feature Phones", subIdList: [] },
      { id: 121, name: "Gaming Laptops", subIdList: [] },
      { id: 122, name: "Business Laptops", subIdList: [] },
    ];
    setCategories(mockCategories);

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
  };

  const getSubCategoriesByIds = (subIdList) => {
    return subIdList.map(id => categories.find(cat => cat.id === id));
  };

  return (
    <header className="header">
      <div className="header-left">
        {/* 카테고리 검색 버튼 */}
        <li
          className="category-dropdown"
          onMouseEnter={() => setIsDropdownVisible(true)} // 마우스를 올리면 드롭다운 열기
          onMouseLeave={() => setIsDropdownVisible(false)} // 마우스를 내리면 드롭다운 닫기
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
            <div className="category-list">
              {categories.map((category) => (
                <CategoryList
                  key={category.id}
                  category={category}
                  hoveredCategoryId={hoveredCategoryId}
                  onCategoryClick={handleCategoryClick}
                  onCategoryHover={handleCategoryHover}
                  getSubCategoriesByIds={getSubCategoriesByIds} // 하위 카테고리 가져오는 함수 전달
                />
              ))}
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

const CategoryList = ({
  category,
  hoveredCategoryId,
  onCategoryClick,
  onCategoryHover,
  getSubCategoriesByIds,
}) => {
  // 하위 카테고리 ID들을 가져와서 실제 객체로 변환
  const subCategories = getSubCategoriesByIds(category.subIdList);

  return (
    <div
      className="category-item"
      onMouseEnter={() => onCategoryHover(category.id)} // 마우스를 올리면 하위 카테고리 보이기
      onClick={() => onCategoryClick(category.id)} // 클릭 시 해당 카테고리 검색 페이지로 이동
    >
      <span>{category.name}</span>

      {/* 하위 카테고리들 표시 */}
      {subCategories.length > 0 && category.id === hoveredCategoryId && (
        <div className="subcategory-list">
          {subCategories.map((subCategory) => (
            <div
              key={subCategory.id}
              className="subcategory-item"
              onClick={() => onCategoryClick(subCategory.id)}
            >
              {subCategory.name}

              {/* 하위 카테고리가 더 있는 경우 재귀적으로 표시 */}
              {subCategory.subIdList && subCategory.subIdList.length > 0 && (
                <CategoryList
                  category={subCategory}
                  hoveredCategoryId={hoveredCategoryId}
                  onCategoryClick={onCategoryClick}
                  onCategoryHover={onCategoryHover}
                  getSubCategoriesByIds={getSubCategoriesByIds}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
