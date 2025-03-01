import React, { useState, useEffect } from "react";

const CartItem = ({
  item,
  onRemove,
  onQuantityChange,
  selectedItems,
  setSelectedItems,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isSelected, setIsSelected] = useState(selectedItems.includes(item.id));

  useEffect(() => {
    setIsSelected(selectedItems.includes(item.id));
  }, [selectedItems, item.id]);

  // 수량 변경 핸들러
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  // 체크박스 선택/해제 핸들러
  const handleSelectChange = () => {
    if (isSelected) {
      setSelectedItems((prev) => prev.filter((id) => id !== item.id));
    } else {
      setSelectedItems((prev) => [...prev, item.id]);
    }
    setIsSelected(!isSelected);
  };

  return (
    <div className="cart-item">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleSelectChange}
        className="cart-item-checkbox"
      />
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <div className="cart-item-header">
          <div className="cart-item-name">{item.name}</div>
          <button className="cart-item-remove" onClick={onRemove}>
            🗑️
          </button>
        </div>
        <div className="cart-item-price">{item.price} 원</div>
        <div className="cart-item-footer">
          <div className="cart-item-quantity">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
          <div className="cart-item-total-price">
            {item.price * quantity} 원
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
