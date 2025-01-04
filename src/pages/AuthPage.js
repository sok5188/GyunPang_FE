import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직 추가 (예: API 호출 등)
    console.log("로그인 시도:", { username, password });
  };

  return (
    <div className="container">
      <Helmet>
        <title>로그인</title> {/* 여기서 브라우저 탭의 제목을 수정 */}
      </Helmet>
      <div className="box">
        <h2>로그인</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력하세요"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button type="submit" className="btn">
            로그인
          </button>
        </form>

        <div className="links">
          <Link to="/find-username">
            <button className="link-btn">아이디 찾기</button>
          </Link>
          <Link to="/find-password">
            <button className="link-btn">비밀번호 찾기</button>
          </Link>
          <Link to="/signup">
            <button className="link-btn">회원가입</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
