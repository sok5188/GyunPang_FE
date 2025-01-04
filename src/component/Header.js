// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/main.css';  // CSS 파일 임포트

const Header = () => {
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
