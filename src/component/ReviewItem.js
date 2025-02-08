import React from "react";

function ReviewItem({ review }) {
  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={index < rating ? "star filled" : "star"}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="review-item">
      <img
        src={review.product.image}
        alt={review.product.title}
        className="review-item-image"
      />
      <div className="review-item-details">
        <div className="review-item-title">{review.product.title}</div>
        <div className="review-item-price">{review.product.price} 원</div>
        <div className="review-item-rating">{renderStars(review.rating)}</div>
        {review.reviewStatus ? (
          <div className="review-item-status">리뷰 완료</div>
        ) : (
          <button className="review-item-button">리뷰 남기기</button>
        )}
      </div>
    </div>
  );
}

export default ReviewItem;
