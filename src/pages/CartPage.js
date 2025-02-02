import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CartItem from "../component/CartItem"; // 장바구니 상품 항목

const CartPage = () => {
  const food_pic =
    "https://storage.googleapis.com/gyunpang_img/images/food_pic.jpg?GoogleAccessId=gyunpang-be@cedar-setup-420206.iam.gserviceaccount.com&Expires=3476843910&Signature=uSlgaf4jvP4mh%2BtH99aRSzrDJgSSkxVmFmJQmfVDXoxRqOzYyQ9Kl%2F3Fxf5QPHD4QIodJZwLqVaTAA0wu2p2Y1dltijLpr58sl3GhjIy%2FbQXBU4nGyhivleQb6UAm1YiXdpCRSlOpdyARAoUK7mH9ST3l%2Fr72DXL4hy%2B1PJuVD2U%2FgVY2fCYPoEN5DQgyRXBD%2FQRdSLWwpfHGHPF5oBqhjclACiJjJ9SZWRoZ27X3JSVaRC75CIKo%2BTWz8xaheb28KXJQYuZzHrUDV8IV52Dbwbzjyr9j4%2Bp988x1BQ10VQr3RMneCGnwOkYitDTwKWHuTLfQU2OXDUyoOMdByjTiw%3D%3D";
  const dummyCartItems = [
    {
      id: 1,
      name: "스마트폰",
      price: 500000,
      quantity: 2,
      discount: 50000, // 예를 들어, 50,000원 할인
      image: food_pic,
    },
    {
      id: 2,
      name: "무선 이어폰",
      price: 80000,
      quantity: 1,
      discount: 10000, // 예를 들어, 10,000원 할인
      image: food_pic,
    },
    {
      id: 3,
      name: "게임용 헤드셋",
      price: 120000,
      quantity: 1,
      discount: 20000, // 예를 들어, 20,000원 할인
      image: food_pic,
    },
  ];

  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState();
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const navigate = useNavigate();

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
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    calculateTotal(updatedItems);
  };

  // 수량 변경
  const handleQuantityChange = (id, quantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  };

  // 전체 선택/해제
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedItems(cartItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
    setIsSelectAllChecked(isChecked);
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
    if (window.confirm("장바구니에 든 모든 상품을 삭제할까요?")) {
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
    setSelectedItems(dummyCartItems.map((item) => item.id));
    calculateTotal(dummyCartItems);
  }, []);

  useEffect(() => {
    setIsCartEmpty(cartItems.length === 0);
    setIsSelectAllChecked(
      selectedItems.length > 0 && selectedItems.length === cartItems.length
    );
  }, [selectedItems, cartItems]);

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
        <div className="cart-content">
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
            {/* 전체 선택/해제 및 전체 삭제 버튼 */}
            <div className="cart-actions">
              <input
                type="checkbox"
                checked={isSelectAllChecked}
                onChange={handleSelectAll}
              />
              <span>전체 선택</span>
              <button onClick={handleRemoveAll}>전체 삭제</button>
            </div>
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
        </div>
      )}
    </div>
  );
};

export default CartPage;
