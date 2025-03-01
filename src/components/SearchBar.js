import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ initCategory = "all", initSearchTerm = "" }) => {
  const [category, setCategory] = useState(initCategory);
  const [searchTerm, setSearchTerm] = useState(initSearchTerm);

  const navigate = useNavigate();
  const food_pic =
    "https://storage.googleapis.com/gyunpang_img/images/food_pic.jpg?GoogleAccessId=gyunpang-be@cedar-setup-420206.iam.gserviceaccount.com&Expires=3476843910&Signature=uSlgaf4jvP4mh%2BtH99aRSzrDJgSSkxVmFmJQmfVDXoxRqOzYyQ9Kl%2F3Fxf5QPHD4QIodJZwLqVaTAA0wu2p2Y1dltijLpr58sl3GhjIy%2FbQXBU4nGyhivleQb6UAm1YiXdpCRSlOpdyARAoUK7mH9ST3l%2Fr72DXL4hy%2B1PJuVD2U%2FgVY2fCYPoEN5DQgyRXBD%2FQRdSLWwpfHGHPF5oBqhjclACiJjJ9SZWRoZ27X3JSVaRC75CIKo%2BTWz8xaheb28KXJQYuZzHrUDV8IV52Dbwbzjyr9j4%2Bp988x1BQ10VQr3RMneCGnwOkYitDTwKWHuTLfQU2OXDUyoOMdByjTiw%3D%3D";
  const mac_pic =
    "https://storage.googleapis.com/gyunpang_img/images/mac_pic.jpg?GoogleAccessId=gyunpang-be@cedar-setup-420206.iam.gserviceaccount.com&Expires=3476843967&Signature=tmNr2qB2CkseQK1TdDKK8Tt3KMumJZDaUr1jeTKYWCotk2eSN66KEORKwVAFysWZIUPB5878V1BgjsysBu5lq6fAcWM9NB80WknesRvuql2zfPOehka5iU%2Fz4E8nBZLrR%2FEATmCD1D5L6cvLfFQI%2Fov4i8FXtdMW8f5JT7DouIBBu%2FN58SGVkpH6ETF0e3Pl%2BmZ9PeYefC6VhcBynfTuAKWlJf3xzSLj0nSlM4oDLqeMPxdqQXiiY9Thjoba2ersDLKwZpVFztFaOao5kQdRfJJxXTJ4da8VFrwMCYhn3kJP4pS9zJyWRtL%2BN4ao%2BU0kGFPLVWo5qZWQWQqb09ECpw%3D%3D";
  const handleSearch = () => {
    console.log("Searching for:", searchTerm, "in category:", category);
    // 실제 검색 로직 추가

    const searchedProducts = [];
    for (let i = 1; i <= 30; i++) {
      const product = {
        id: i,
        image: i % 2 == 1 ? food_pic : mac_pic,
        title: "제품쓰",
        price: (Math.floor(Math.random() * 100) + 1) * 1000,
      };

      searchedProducts.push(product);
      console.log("add product : " + product);
    }
    console.log("will send products : " + searchedProducts);
    navigate("/search", {
      state: {
        products: searchedProducts,
        searchTerm: searchTerm,
        category: category,
      },
    });
  };

  return (
    <div className="search-bar">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="search-category">
        <option value="all">전체</option>
        <option value="electronics">전자기기</option>
        <option value="clothing">의류</option>
        <option value="books">도서</option>
        <option value="home">홈 & 가전</option>
      </select>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색어를 입력하세요"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        검색
      </button>
    </div>
  );
};

export default SearchBar;
