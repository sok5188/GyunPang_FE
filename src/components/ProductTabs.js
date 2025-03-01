import React, { useState } from 'react';

function ProductTabs() {
  const [selectedTab, setSelectedTab] = useState('description');

  return (
    <div className="tabs">
      <button
        className={selectedTab === 'description' ? 'active' : ''}
        onClick={() => setSelectedTab('description')}
      >
        상품 상세
      </button>
      <button
        className={selectedTab === 'reviews' ? 'active' : ''}
        onClick={() => setSelectedTab('reviews')}
      >
        리뷰
      </button>
      <button
        className={selectedTab === 'inquiries' ? 'active' : ''}
        onClick={() => setSelectedTab('inquiries')}
      >
        문의
      </button>

      <div className="tab-content">
        {selectedTab === 'description' && <div>상품 상세 내용</div>}
        {selectedTab === 'reviews' && <div>리뷰 내용</div>}
        {selectedTab === 'inquiries' && <div>문의 내용</div>}
      </div>
    </div>
  );
}

export default ProductTabs;
