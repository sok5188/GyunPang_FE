import React, { useState, useEffect } from "react";

const SellerReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    // 리뷰 목록을 불러오는 로직 추가
    const fetchReviews = async () => {
      // 예시: API 호출
      const response = await fetch("/api/seller/reviews");
      const data = await response.json();
      setReviews(data);
    };

    fetchReviews();
  }, []);

  const handleDeleteReview = (reviewId) => {
    // 리뷰 삭제 로직 추가
  };

  const sortedReviews = reviews.sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOrder === "oldest") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOrder === "highest") {
      return b.rating - a.rating;
    } else if (sortOrder === "lowest") {
      return a.rating - b.rating;
    }
    return 0;
  });

  return (
    <div className="seller-reviews-page">
      <div className="filters">
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된 순</option>
          <option value="highest">별점 높은순</option>
          <option value="lowest">별점 낮은순</option>
        </select>
        <select
          onChange={(e) => setItemsPerPage(e.target.value)}
          value={itemsPerPage}>
          <option value={10}>10개</option>
          <option value={20}>20개</option>
          <option value={50}>50개</option>
          <option value={100}>100개</option>
        </select>
      </div>
      <div className="reviews-list">
        {sortedReviews.slice(0, itemsPerPage).map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-details">
              <h3>{review.productName}</h3>
              <p>별점: {review.rating}</p>
              <p>코멘트: {review.comment}</p>
              <p>작성자: {review.author}</p>
            </div>
            <button onClick={() => handleDeleteReview(review.id)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerReviewsPage;
