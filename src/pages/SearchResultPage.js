import SearchBar from "../component/SearchBar";
import ProductCard from "../component/ProductCard";
import { useLocation } from "react-router-dom";

const SearchResultPage = () => {
  const location = useLocation();
  const { products = [], searchTerm, category } = location.state || {};

  if (products.length === 0) {
    return <h2>검색 결과가 없습니다.</h2>;
  }
  return (
    <div>
      <SearchBar initSearchTerm={searchTerm} initCategory={category} />

      <h2> {products.length} 개의 검색 결과</h2>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultPage;
