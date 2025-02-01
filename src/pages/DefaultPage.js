import React, { useState, useEffect } from "react";
import SearchBar from "../component/SearchBar";
import BannerAd from "../component/BannerAd";
import TopProducts from "../component/TopProducts";
import axios from "axios";
const DefaultPage = ({ token }) => {
  /*
https://storage.googleapis.com/gyunpang_img/images/food_pic.jpg?GoogleAccessId=gyunpang-be@cedar-setup-420206.iam.gserviceaccount.com&Expires=3476843910&Signature=uSlgaf4jvP4mh%2BtH99aRSzrDJgSSkxVmFmJQmfVDXoxRqOzYyQ9Kl%2F3Fxf5QPHD4QIodJZwLqVaTAA0wu2p2Y1dltijLpr58sl3GhjIy%2FbQXBU4nGyhivleQb6UAm1YiXdpCRSlOpdyARAoUK7mH9ST3l%2Fr72DXL4hy%2B1PJuVD2U%2FgVY2fCYPoEN5DQgyRXBD%2FQRdSLWwpfHGHPF5oBqhjclACiJjJ9SZWRoZ27X3JSVaRC75CIKo%2BTWz8xaheb28KXJQYuZzHrUDV8IV52Dbwbzjyr9j4%2Bp988x1BQ10VQr3RMneCGnwOkYitDTwKWHuTLfQU2OXDUyoOMdByjTiw%3D%3D
https://storage.googleapis.com/gyunpang_img/images/mac_pic.jpg?GoogleAccessId=gyunpang-be@cedar-setup-420206.iam.gserviceaccount.com&Expires=3476843967&Signature=tmNr2qB2CkseQK1TdDKK8Tt3KMumJZDaUr1jeTKYWCotk2eSN66KEORKwVAFysWZIUPB5878V1BgjsysBu5lq6fAcWM9NB80WknesRvuql2zfPOehka5iU%2Fz4E8nBZLrR%2FEATmCD1D5L6cvLfFQI%2Fov4i8FXtdMW8f5JT7DouIBBu%2FN58SGVkpH6ETF0e3Pl%2BmZ9PeYefC6VhcBynfTuAKWlJf3xzSLj0nSlM4oDLqeMPxdqQXiiY9Thjoba2ersDLKwZpVFztFaOao5kQdRfJJxXTJ4da8VFrwMCYhn3kJP4pS9zJyWRtL%2BN4ao%2BU0kGFPLVWo5qZWQWQqb09ECpw%3D%3D
*/
  
  const food_pic = "https://storage.googleapis.com/gyunpang_img/images/food_pic.jpg?GoogleAccessId=gyunpang-be@cedar-setup-420206.iam.gserviceaccount.com&Expires=3476843910&Signature=uSlgaf4jvP4mh%2BtH99aRSzrDJgSSkxVmFmJQmfVDXoxRqOzYyQ9Kl%2F3Fxf5QPHD4QIodJZwLqVaTAA0wu2p2Y1dltijLpr58sl3GhjIy%2FbQXBU4nGyhivleQb6UAm1YiXdpCRSlOpdyARAoUK7mH9ST3l%2Fr72DXL4hy%2B1PJuVD2U%2FgVY2fCYPoEN5DQgyRXBD%2FQRdSLWwpfHGHPF5oBqhjclACiJjJ9SZWRoZ27X3JSVaRC75CIKo%2BTWz8xaheb28KXJQYuZzHrUDV8IV52Dbwbzjyr9j4%2Bp988x1BQ10VQr3RMneCGnwOkYitDTwKWHuTLfQU2OXDUyoOMdByjTiw%3D%3D"
  const mac_pic = "https://storage.googleapis.com/gyunpang_img/images/mac_pic.jpg?GoogleAccessId=gyunpang-be@cedar-setup-420206.iam.gserviceaccount.com&Expires=3476843967&Signature=tmNr2qB2CkseQK1TdDKK8Tt3KMumJZDaUr1jeTKYWCotk2eSN66KEORKwVAFysWZIUPB5878V1BgjsysBu5lq6fAcWM9NB80WknesRvuql2zfPOehka5iU%2Fz4E8nBZLrR%2FEATmCD1D5L6cvLfFQI%2Fov4i8FXtdMW8f5JT7DouIBBu%2FN58SGVkpH6ETF0e3Pl%2BmZ9PeYefC6VhcBynfTuAKWlJf3xzSLj0nSlM4oDLqeMPxdqQXiiY9Thjoba2ersDLKwZpVFztFaOao5kQdRfJJxXTJ4da8VFrwMCYhn3kJP4pS9zJyWRtL%2BN4ao%2BU0kGFPLVWo5qZWQWQqb09ECpw%3D%3D"
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [topPersonalBoughtProducts, setTopPersonalBoughtProducts] = useState(
    []
  );
  const [topDiscountProducts, setTopDiscountProducts] = useState([]);

  const getTopSellingProducts = async () => {
    try {
      const response = await axios.get("product/getTopSell");
      if (response.status === 200) {
        setTopSellingProducts(response.data.products);
      } else {
        console.error("Top selling fail code :", response.status);
      }
    } catch (error) {
      console.error("Top selling fail", error);
    }
  };

  const getTopPersonalBoughtProducts = async () => {
    try {
      const response = await axios.get("product/getTopPersonal");
      if (response.status === 200) {
        setTopPersonalBoughtProducts(response.data.products);
      } else {
        console.error("Top personal fail code :", response.status);
      }
    } catch (error) {
      console.error("Top personal fail", error);
    }
  };

  const getTopDiscountProducts = async () => {
    try {
      const response = await axios.get("product/getTopDiscount");
      if (response.status === 200) {
        setTopDiscountProducts(response.data.products);
      } else {
        console.error("Top discount fail code :", response.status);
      }
    } catch (error) {
      console.error("Top discount fail", error);
    }
  };

  useEffect(() => {
    console.log("effect call , token : ", token);
    // getTopSellingProducts();
    // getTopPersonalBoughtProducts();
    // getTopDiscountProducts();

    setTopSellingProducts([
      {
        id: 1,
        image: food_pic,
        title: "제품 1",
        price: "10000",
      },
      {
        id: 2,
        image: mac_pic,
        title: "제품 2",
        price: "20000",
      },
      // 실제 API 데이터를 사용하여 가져오기
    ]);

    setTopDiscountProducts([
      {
        id: 1,
        image: food_pic,
        title: "할인 제품 1",
        price: "15000",
        discount: 30,
      },
      {
        id: 2,
        image: mac_pic,
        title: "할인 제품 2",
        price: "25000",
        discount: 40,
      },
      // 실제 API 데이터를 사용하여 가져오기
    ]);
    setTopPersonalBoughtProducts([
      {
        id: 1,
        image: food_pic,
        title: "자주 구매한 제품 1",
        price: "30000",
      },
      {
        id: 2,
        image: mac_pic,
        title: "자주 구매한 제품 2",
        price: "25000",
      },
      // 실제 데이터로 교체
    ]);
  }, [token]); // token이 바뀔 때마다 다시 호출

  return (
    <div>
      <SearchBar />
      <BannerAd />
      <TopProducts products={topSellingProducts} title="오늘 최대 판매" />
      {token && (
        <TopProducts
          products={topPersonalBoughtProducts}
          title="자주 구매하신 상품"
        />
      )}
      <TopProducts products={topDiscountProducts} title="오늘의 최대 특가" />
    </div>
  );
};

export default DefaultPage;
