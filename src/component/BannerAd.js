import React from 'react';
import { useNavigate } from 'react-router-dom';

const BannerAd = () => {
  const navigate = useNavigate();

  const handleBannerClick = () => {
    navigate('/ad-page'); // 광고 페이지로 리디렉션
  };

  return (
    <div className="banner-ad" onClick={handleBannerClick}>
      <img 
        src="https://via.placeholder.com/1200x300" 
        alt="Advertise" 
        style={{ width: '100%', height: 'auto' }} 
      />
    </div>
  );
};

export default BannerAd;
