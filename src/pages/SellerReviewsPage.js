import React, { useState, useEffect } from "react";
import upIcon from "../res/icon/up_icon.png"; // Up 아이콘 추가
import downIcon from "../res/icon/down_icon.png"; // Down 아이콘 추가

const SellerReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [expandedProduct, setExpandedProduct] = useState(null);

  useEffect(() => {
    // 더미 데이터 추가
    const dummyReviews = [
      {
        id: 1,
        productName: "상품 1",
        rating: 5,
        comment: "아주 좋아요!",
        author: "고객 1",
        date: "2023-10-01",
      },
      {
        id: 2,
        productName: "상품 2",
        rating: 4,
        comment: "좋아요!",
        author: "고객 2",
        date: "2023-10-02",
      },
      {
        id: 3,
        productName: "상품 3",
        rating: 3,
        comment: "보통이에요.",
        author: "고객 3",
        date: "2023-10-03",
      },
      {
        id: 4,
        productName: "상품 4",
        rating: 2,
        comment: "별로에요.",
        author: "고객 4",
        date: "2023-10-04",
      },
      {
        id: 5,
        productName: "상품 5",
        rating: 1,
        comment: "최악이에요.",
        author: "고객 5",
        date: "2023-10-05",
      },
      {
        id: 6,
        productName: "상품 1",
        rating: 4,
        comment: "좋아요!",
        author: "고객 6",
        date: "2023-10-06",
      },
      {
        id: 7,
        productName: "상품 2",
        rating: 3,
        comment: "보통이에요.",
        author: "고객 7",
        date: "2023-10-07",
      },
      {
        id: 8,
        productName: "상품 3",
        rating: 2,
        comment: "별로에요.",
        author: "고객 8",
        date: "2023-10-08",
      },
      {
        id: 9,
        productName: "상품 4",
        rating: 1,
        comment: "최악이에요.",
        author: "고객 9",
        date: "2023-10-09",
      },
    ];
    setReviews(dummyReviews);
  }, []);

  const handleDeleteReview = (reviewId) => {
    // 리뷰 삭제 로직 추가
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== reviewId)
    );
  };

  const groupedReviews = reviews.reduce((acc, review) => {
    if (!acc[review.productName]) {
      acc[review.productName] = [];
    }
    acc[review.productName].push(review);
    return acc;
  }, {});

  const sortedProducts = Object.keys(groupedReviews).sort((a, b) => {
    const averageRatingA =
      groupedReviews[a].reduce((acc, review) => acc + review.rating, 0) /
      groupedReviews[a].length;
    const averageRatingB =
      groupedReviews[b].reduce((acc, review) => acc + review.rating, 0) /
      groupedReviews[b].length;

    if (sortOrder === "latest") {
      return (
        new Date(groupedReviews[b][0].date) -
        new Date(groupedReviews[a][0].date)
      );
    } else if (sortOrder === "oldest") {
      return (
        new Date(groupedReviews[a][0].date) -
        new Date(groupedReviews[b][0].date)
      );
    } else if (sortOrder === "highest") {
      return averageRatingB - averageRatingA;
    } else if (sortOrder === "lowest") {
      return averageRatingA - averageRatingB;
    } else if (sortOrder === "mostReviews") {
      return groupedReviews[b].length - groupedReviews[a].length;
    } else if (sortOrder === "leastReviews") {
      return groupedReviews[a].length - groupedReviews[b].length;
    }
    return 0;
  });

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

  const renderProductReviews = (productName) => {
    const productReviews = groupedReviews[productName];
    const averageRating =
      productReviews.reduce((acc, review) => acc + review.rating, 0) /
      productReviews.length;

    return (
      <div key={productName} className="product-reviews">
        <div className="product-summary">
          <h3>{productName}</h3>
          <div className="average-rating">{renderStars(averageRating)}</div>
          <p>리뷰 갯수: {productReviews.length}</p>
          <button
            onClick={() =>
              setExpandedProduct(
                expandedProduct === productName ? null : productName
              )
            }>
            <img
              src={expandedProduct === productName ? upIcon : downIcon}
              alt="Toggle"
            />
          </button>
        </div>
        {expandedProduct === productName && (
          <div className="reviews-list">
            {productReviews.slice(0, itemsPerPage).map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-details">
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                  <p>코멘트: {review.comment}</p>
                  <p>작성자: {review.author}</p>
                  <p>작성일: {review.date}</p>
                </div>
                <button onClick={() => handleDeleteReview(review.id)}>
                  삭제
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

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
          <option value="mostReviews">리뷰 많은순</option>
          <option value="leastReviews">리뷰 적은순</option>
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
      <div className="product-reviews-list">
        {sortedProducts.map((productName) => renderProductReviews(productName))}
      </div>
    </div>
  );
};

export default SellerReviewsPage;
