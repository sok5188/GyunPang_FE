import React from 'react';
import ProductCard from './ProductCard';

function ReviewPage() {
  const reviews = [
    { id: 1, product: { id: 1, title: '상품 A', image: '...' }, reviewStatus: false, rating: 4 },
    { id: 2, product: { id: 2, title: '상품 B', image: '...' }, reviewStatus: true, rating: 5 }
  ];

  return (
    <div className="reviews-page">
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <ProductCard product={review.product} />
          <div className="review-info">
            {review.reviewStatus ? (
              <span>별점: {review.rating} / 5</span>
            ) : (
              <button>리뷰 남기기</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewPage;
