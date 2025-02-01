import React from 'react';
import ProductCard from './ProductCard';

function InquiryPage() {
  const inquiries = [
    { id: 1, product: { id: 1, title: '상품 A', image: '...' }, status: '답변 대기', lastReply: '2023-01-01' },
    { id: 2, product: { id: 2, title: '상품 B', image: '...' }, status: '답변 완료', lastReply: '2023-02-01' }
  ];

  return (
    <div className="inquiries-page">
      {inquiries.map((inquiry) => (
        <div key={inquiry.id} className="inquiry-item">
          <ProductCard product={inquiry.product} />
          <div className="inquiry-info">
            <span>상태: {inquiry.status}</span>
            <span>최근 답변 일시: {inquiry.lastReply}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InquiryPage;
