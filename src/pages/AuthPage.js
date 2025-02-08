import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "../common/axios.js";
import { useNavigate } from "react-router-dom";

function AuthPage({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("gateway/signin", {
        username: username,
        password: password,
      });

      console.log(response.headers);
      if (response.headers["authorization"]) {
        console.log("token is present");
        handleLogin(response.headers["authorization"]);
        navigate("/");
      } else {
        console.log("token is not present");
      }
    } catch (error) {
      console.error("로그인 실패", error);
      if (error.response.status === 400) {
        alert("아이디 혹은 패스워드를 다시 확인해주세요");
      }
    }
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
          <Link to="/find-username" className="link">
            아이디 찾기
          </Link>
          <Link to="/find-password" className="link">
            비밀번호 찾기
          </Link>
          <Link to="/signup" className="link">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
