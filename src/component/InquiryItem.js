import React from "react";

function InquiryItem({ inquiry }) {
  return (
    <div className="inquiry-item">
      <img
        src={inquiry.product.image}
        alt={inquiry.product.title}
        className="inquiry-item-image"
      />
      <div className="inquiry-item-details">
        <div className="inquiry-item-header">
          <div className="inquiry-item-title">{inquiry.product.title}</div>
        </div>
        <div className="inquiry-item-price">{inquiry.product.price} 원</div>
        <div className="inquiry-item-footer">
          <div className="inquiry-item-status">상태: {inquiry.status}</div>
          <div className="inquiry-item-last-reply">
            최근 답변 일시: {inquiry.lastReply}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InquiryItem;
