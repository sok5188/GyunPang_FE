import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductImageGallery from '../component/ProductImageGallery';
import ProductInfo from '../component/ProductInfo';
import ProductTabs from '../component/ProductTabs'; 
import Reviews from '../component/Review';

function ProductDetailPage() {
    const { productId } = useParams();  // URL에서 productId를 추출
  const [product, setProduct] = useState(null);

  // 상품 데이터 로딩 (여기서는 예시로 mock 데이터 사용)
  useEffect(() => {
    // API 호출 또는 로컬 데이터 로딩
    const fetchedProduct = {
      id: productId,
      name: '상품명',
      images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
      price: 50000,
      originalPrice: 70000,
      rating: 4.5,
      reviewCount: 120,
      seller: '판매자명',
      description: '상품 상세 설명',
    };
    setProduct(fetchedProduct);
  }, [productId]);

  if (!product) return <div>로딩 중...</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-top">
        <ProductImageGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      <div className="tabs-container">
        <ProductTabs />
      </div>

      <div className="product-description">
        <h3>상품 상세</h3>
        <p>{product.description}</p>
      </div>

      <Reviews />
    </div>
  );
}

export default ProductDetailPage;
