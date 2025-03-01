import React, { useState } from 'react';

function Review() {
  const [sortOrder, setSortOrder] = useState('latest');

  const reviews = [
    { id: 1, nickname: '유저1', rating: 5, comment: '너무 좋아요!', date: '2023-01-01' },
    { id: 2, nickname: '유저2', rating: 4, comment: '괜찮아요', date: '2023-02-01' },
  ];

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOrder === 'highest') {
      return b.rating - a.rating;
    }
    if (sortOrder === 'lowest') {
      return a.rating - b.rating;
    }
    return new Date(b.date) - new Date(a.date); // 최신순
  });

  return (
    <div className="reviews-container">
      <div className="review-sort">
        <button onClick={() => setSortOrder('latest')}>최신순</button>
        <button onClick={() => setSortOrder('highest')}>평점 높은 순</button>
        <button onClick={() => setSortOrder('lowest')}>평점 낮은 순</button>
      </div>

      {sortedReviews.map((review) => (
        <div key={review.id} className="review-item">
          <div className="review-header">
            <span>{review.nickname}</span>
            <span>{review.rating} / 5</span>
            <span>{review.date}</span>
          </div>
          <div className="review-comment">{review.comment}</div>
        </div>
      ))}
    </div>
  );
}

export default Review;
