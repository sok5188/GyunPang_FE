// src/components/Header.js
import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/main.css"; // CSS 파일 임포트

const Header = ({ token, handleLogout }) => {
  useEffect(() => {
    console.log("effect call");
  }, [token]); // token이 바뀔 때마다 다시 호출
  const doLogout = async (e) => {
    try {
      const response = await axios.delete("gateway/signout");
      handleLogout();
    } catch (error) {
      console.error("fail to log out ", error);
    }
  }

  return (
    <header>
      <div className="logo">
        <Link to="/">Gyunpang</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/my-info">My Info</Link>
          </li>
          <li>
            <Link to="/custom-service">Custom Service</Link>
          </li>
          {token ? (
            <li>
              <button onClick={doLogout}>Logout</button>
            </li>
          ) : (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
