import React, { useState, useEffect } from "react";

const SellerInquiriesPage = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    // 문의 목록을 불러오는 로직 추가
    const fetchInquiries = async () => {
      // 예시: API 호출
      const response = await fetch("/api/seller/inquiries");
      const data = await response.json();
      setInquiries(data);
    };

    fetchInquiries();
  }, []);

  const sortedInquiries = inquiries.sort(
    (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
  );

  return (
    <div className="seller-inquiries-page">
      <h2>문의 목록</h2>
      <div className="inquiries-list">
        {sortedInquiries.map((inquiry) => (
          <div key={inquiry.id} className="inquiry-item">
            <div className="inquiry-details">
              <h3>{inquiry.userName}</h3>
              <p>상품: {inquiry.productName}</p>
              <p>최근 메시지: {inquiry.lastMessage}</p>
              {inquiry.unreadCount > 0 && (
                <span className="unread-count">{inquiry.unreadCount}</span>
              )}
              <p>
                마지막 메시지 시간:{" "}
                {new Date(inquiry.lastMessageTime).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerInquiriesPage;
