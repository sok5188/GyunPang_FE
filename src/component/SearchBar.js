import React, { useState } from 'react';

const SearchBar = () => {
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log("Searching for:", searchTerm, "in category:", category);
    // 실제 검색 로직 추가
  };

  return (
    <div className="search-bar">
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="category-dropdown">
        <option value="">전체</option>
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
      <button onClick={handleSearch} className="search-button">검색</button>
    </div>
  );
};

export default SearchBar;
