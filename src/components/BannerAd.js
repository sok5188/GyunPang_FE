import React from 'react';
import { useNavigate } from 'react-router-dom';

const BannerAd = () => {
  const navigate = useNavigate();
  const food_pic = "https://storage.googleapis.com/gyunpang_img/images/food_pic.jpg?GoogleAccessId=gyunpang-be@cedar-setup-420206.iam.gserviceaccount.com&Expires=3476843910&Signature=uSlgaf4jvP4mh%2BtH99aRSzrDJgSSkxVmFmJQmfVDXoxRqOzYyQ9Kl%2F3Fxf5QPHD4QIodJZwLqVaTAA0wu2p2Y1dltijLpr58sl3GhjIy%2FbQXBU4nGyhivleQb6UAm1YiXdpCRSlOpdyARAoUK7mH9ST3l%2Fr72DXL4hy%2B1PJuVD2U%2FgVY2fCYPoEN5DQgyRXBD%2FQRdSLWwpfHGHPF5oBqhjclACiJjJ9SZWRoZ27X3JSVaRC75CIKo%2BTWz8xaheb28KXJQYuZzHrUDV8IV52Dbwbzjyr9j4%2Bp988x1BQ10VQr3RMneCGnwOkYitDTwKWHuTLfQU2OXDUyoOMdByjTiw%3D%3D"
  const handleBannerClick = () => {
    navigate('/ad-page'); // 광고 페이지로 리디렉션
  };

  return (
    <div className="banner-ad" onClick={handleBannerClick}>
      <img 
        src = {food_pic}
        alt="Advertise" 
        style={{ width: '100%', height: '200px' }} 
      />
    </div>
  );
};

export default BannerAd;
