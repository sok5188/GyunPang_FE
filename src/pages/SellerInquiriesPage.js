import React, { useState, useEffect } from "react";
import "../css/seller.css"; // CSS 파일 추가

const SellerInquiriesPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [reply, setReply] = useState({});

  useEffect(() => {
    // 더미 데이터 추가
    const dummyInquiries = [
      {
        id: 1,
        product: "상품 1",
        customer: "고객 1",
        inquiry: "이 상품의 배송은 얼마나 걸리나요?",
        date: "2023-10-01",
        status: "답변 대기",
      },
      {
        id: 2,
        product: "상품 2",
        customer: "고객 2",
        inquiry: "이 상품의 재고가 언제 다시 들어오나요?",
        date: "2023-10-02",
        status: "답변 완료",
      },
      {
        id: 3,
        product: "상품 3",
        customer: "고객 3",
        inquiry: "이 상품의 색상은 어떤가요?",
        date: "2023-10-03",
        status: "답변 대기",
      },
    ];
    setInquiries(dummyInquiries);
  }, []);

  const handleInputChange = (e, inquiryId) => {
    const { value } = e.target;
    setReply((prev) => ({
      ...prev,
      [inquiryId]: value,
    }));
  };

  const handleSubmitReply = (inquiryId) => {
    // 답변 제출 로직 추가
    alert(`문의 ${inquiryId}에 답변을 달았습니다: ${reply[inquiryId]}`);
  };

  return (
    <div className="seller-inquiries-page">
      <h2>상품 문의</h2>
      <div className="inquiries-list">
        {inquiries.map((inquiry) => (
          <div key={inquiry.id} className="inquiry-item">
            <div className="inquiry-left">
              <h3>{inquiry.product}</h3>
              <p className="customer-name">{inquiry.customer}</p>
            </div>
            <div className="inquiry-middle">
              <p className="inquiry-text">{inquiry.inquiry}</p>
              <textarea
                value={reply[inquiry.id] || ""}
                onChange={(e) => handleInputChange(e, inquiry.id)}
                placeholder="답변을 입력하세요"
                className="reply-textarea"
              />
            </div>
            <div className="inquiry-right">
              <p>상태: {inquiry.status}</p>
              <p>{inquiry.date}</p>
              <div className="inquiry-actions">
                <button onClick={() => handleSubmitReply(inquiry.id)}>
                  답변달기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerInquiriesPage;
