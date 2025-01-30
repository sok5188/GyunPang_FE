import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CartItem from "../component/CartItem"; // 장바구니 상품 항목

const CartPage = () => {
  const dummyCartItems = [
    {
      id: 1,
      name: "스마트폰",
      price: 500000,
      quantity: 2,
      discount: 50000, // 예를 들어, 50,000원 할인
      image: "https://via.placeholder.com/150?text=Smartphone", // 이미지 URL (플레이스홀더 이미지)
    },
    {
      id: 2,
      name: "무선 이어폰",
      price: 80000,
      quantity: 1,
      discount: 10000, // 예를 들어, 10,000원 할인
      image: "https://via.placeholder.com/150?text=Earphone", // 이미지 URL (플레이스홀더 이미지)
    },
    {
      id: 3,
      name: "게임용 헤드셋",
      price: 120000,
      quantity: 1,
      discount: 20000, // 예를 들어, 20,000원 할인
      image: "https://via.placeholder.com/150?text=Headset", // 이미지 URL (플레이스홀더 이미지)
    },
  ];

  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const navigate = useNavigate();

  // 장바구니 목록 가져오기
  useEffect(() => {
    // axios
    //   .get("/order/cart")
    //   .then((response) => {
    //     setCartItems(response.data.items);
    //     calculateTotal(response.data.items);
    //   })
    //   .catch((error) => {
    //     console.error("장바구니 목록을 불러오는데 실패했습니다.", error);
    //   });

    // 더미 데이터 사용
    setCartItems(dummyCartItems);
    calculateTotal(dummyCartItems);
  }, []);

  // 총 금액 계산
  const calculateTotal = (items) => {
    let total = 0;
    let discount = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
      discount += item.discount * item.quantity;
    });
    setTotalPrice(total);
    setTotalDiscount(discount);
  };

  // 장바구니 삭제
  const handleRemoveItem = (id) => {
    axios
      .delete(`/order/cart/${id}`)
      .then(() => {
        setCartItems(cartItems.filter((item) => item.id !== id));
        calculateTotal(cartItems.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("장바구니 상품 삭제 실패", error);
      });
  };

  // 수량 변경
  const handleQuantityChange = (id, quantity) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
    calculateTotal(cartItems);
  };

  // 전체 선택/해제
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
    setIsAllSelected(!isAllSelected);
  };

  // 결제하기
  const handleCheckout = () => {
    axios
      .post("/order/checkout", { items: selectedItems })
      .then(() => {
        navigate("/order");
      })
      .catch((error) => {
        console.error("결제 실패", error);
      });
  };

  // 전체 삭제
  const handleRemoveAll = () => {
    if (window.confirm("정말 모든 장바구니 목록을 삭제하시겠습니까?")) {
      axios
        .delete("/order/cart/all")
        .then(() => {
          setCartItems([]);
          setSelectedItems([]);
        })
        .catch((error) => {
          console.error("장바구니 전체 삭제 실패", error);
        });
    }
  };

  // 장바구니가 비었는지 확인
  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="cart-page">
      {/* 장바구니가 비었을 때 표시할 메시지 */}
      {isCartEmpty ? (
        <div className="empty-cart-message">
          <p>장바구니가 비어있습니다</p>
          <button className="go-shopping-btn" onClick={() => navigate("/")}>
            상품 둘러보러 가기
          </button>
        </div>
      ) : (
        <>
          {/* 장바구니 항목 리스트 */}
          <div className="cart-list-header">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAll}
            />
            <span>전체 선택</span>
            <button onClick={handleRemoveAll}>전체 삭제</button>
          </div>

          <div className="cart-list">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={() => handleRemoveItem(item.id)}
                onQuantityChange={(quantity) =>
                  handleQuantityChange(item.id, quantity)
                }
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            ))}
          </div>

          {/* 장바구니 요약 박스 */}
          <div className="cart-summary">
            <div>
              <p>총 상품 금액: {totalPrice} 원</p>
              <p>할인 금액: {totalDiscount} 원</p>
              <p>최종 결제 금액: {totalPrice - totalDiscount} 원</p>
            </div>
            <button onClick={handleCheckout}>결제하기</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
