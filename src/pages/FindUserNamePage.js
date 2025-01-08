import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../common/axios.js";
import { Helmet } from "react-helmet";

function FindUsernamePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [emailError, setEmailError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState("");

  // 입력값 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // 아이디 찾기 요청
  const handleFindId = async (e) => {
    e.preventDefault();

    // 이메일 유효성 검사
    if (!validateEmail(formData.email)) {
      setEmailError("올바른 이메일 형식이 아닙니다");
      return;
    } else {
      setEmailError("");
    }

    try {
      // 서버 요청
      const response = await axios.post("/api/findUsername", {
        name: formData.name,
        email: formData.email,
      });

      // 서버 응답 처리
      if (response.status === 200) {
        setUserId(response.data.username); // 서버에서 받은 사용자 아이디
        setErrorMessage(""); // 기존 오류 메시지 초기화
      } else {
        setUserId("");
        setErrorMessage(
          response.data.message || "알 수 없는 오류가 발생했습니다"
        );
      }
    } catch (error) {
      console.error("아이디 찾기 오류", error);
      if (error.status === 400) {
        setErrorMessage("사용자 정보가 존재하지 않습니다");
      } else {
        setErrorMessage("서버 요청 중 오류가 발생했습니다");
      }
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>아이디 찾기</title> {/* 여기서 브라우저 탭의 제목을 수정 */}
      </Helmet>
      <div className="box">
        <div className="header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ←
          </button>
          <h2>아이디 찾기</h2>
        </div>
        <form onSubmit={handleFindId}>
          <div className="input-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="이름을 입력하세요"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="이메일을 입력하세요"
            />
            {emailError && <p className="error-text">{emailError}</p>}
          </div>

          {errorMessage && <p className="error-text">{errorMessage}</p>}

          {userId && (
            <p className="success-text">
              가입된 아이디는 <strong>{userId}</strong> 입니다
            </p>
          )}

          <button type="submit" disabled={!(formData.email && formData.name)}>
            아이디 찾기
          </button>
        </form>
      </div>
    </div>
  );
}

export default FindUsernamePage;
