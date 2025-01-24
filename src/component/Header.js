// src/components/Header.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/main.css';  // CSS 파일 임포트

const Header = ({token, handleLogout}) => {
  
  useEffect(() => {
    console.log("effect call");
  }, [token]); // token이 바뀔 때마다 다시 호출

  return (
    <header>
      <div className="logo">
        <Link to="/">Gyunpang</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {token ? (
            <li><button onClick={handleLogout}>Logout</button></li>
          ) : (
            <li><Link to="/auth">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
