import React from "react";
import ProductCard from "./ProductCard";
import ReviewItem from "./ReviewItem";

function ReviewPage() {
  const food_pic =
    "https://storage.googleapis.com/gyunpang_img/images/food_pic.jpg?GoogleAccessId=gyunpang-be@cedar-setup-420206.iam.gserviceaccount.com&Expires=3476843910&Signature=uSlgaf4jvP4mh%2BtH99aRSzrDJgSSkxVmFmJQmfVDXoxRqOzYyQ9Kl%2F3Fxf5QPHD4QIodJZwLqVaTAA0wu2p2Y1dltijLpr58sl3GhjIy%2FbQXBU4nGyhivleQb6UAm1YiXdpCRSlOpdyARAoUK7mH9ST3l%2Fr72DXL4hy%2B1PJuVD2U%2FgVY2fCYPoEN5DQgyRXBD%2FQRdSLWwpfHGHPF5oBqhjclACiJjJ9SZWRoZ27X3JSVaRC75CIKo%2BTWz8xaheb28KXJQYuZzHrUDV8IV52Dbwbzjyr9j4%2Bp988x1BQ10VQr3RMneCGnwOkYitDTwKWHuTLfQU2OXDUyoOMdByjTiw%3D%3D";
  const mac_pic =
    "https://storage.googleapis.com/gyunpang_img/images/mac_pic.jpg?GoogleAccessId=gyunpang-be@cedar-setup-420206.iam.gserviceaccount.com&Expires=3476843967&Signature=tmNr2qB2CkseQK1TdDKK8Tt3KMumJZDaUr1jeTKYWCotk2eSN66KEORKwVAFysWZIUPB5878V1BgjsysBu5lq6fAcWM9NB80WknesRvuql2zfPOehka5iU%2Fz4E8nBZLrR%2FEATmCD1D5L6cvLfFQI%2Fov4i8FXtdMW8f5JT7DouIBBu%2FN58SGVkpH6ETF0e3Pl%2BmZ9PeYefC6VhcBynfTuAKWlJf3xzSLj0nSlM4oDLqeMPxdqQXiiY9Thjoba2ersDLKwZpVFztFaOao5kQdRfJJxXTJ4da8VFrwMCYhn3kJP4pS9zJyWRtL%2BN4ao%2BU0kGFPLVWo5qZWQWQqb09ECpw%3D%3D";
  const reviews = [
    {
      id: 1,
      product: {
        id: 1,
        image: food_pic,
        title: "할인 제품 1",
        price: "15000",
        discount: 30,
        reviewStatus: false,
      },
      reviewStatus: false,
      rating: 4,
    },
    {
      id: 2,
      product: {
        id: 2,
        image: mac_pic,
        title: "할인 제품 2",
        price: "25000",
        discount: 40,
        reviewStatus: true,
      },
      reviewStatus: true,
      rating: 5,
    },
  ];

  return (
    <div className="reviews-page">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
}

export default ReviewPage;
