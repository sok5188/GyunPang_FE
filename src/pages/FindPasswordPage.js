import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "../common/axios.js";

function FindPasswordPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
  });
  const [emailError, setEmailError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordResetRequest = async () => {
    // 이메일 형식 검사
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      return;
    }

    // 이메일 형식이 올바르면 에러 메시지 초기화
    setEmailError("");

    try {
      // 서버에 요청 보내기
      const response = await axios.post("open/auth/requestTempPassword", {
        email: formData.email,
      });
      if (response.status == 200) {
        alert("임시 비밀번호가 이메일로 발송되었습니다.");
        navigate("/auth");
      } else {
        alert("임시 비밀번호 발급에 실패했습니다.");
      }
    } catch (error) {
      console.error("임시 비밀번호 발급 오류", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>비밀번호 찾기</title> {/* 여기서 브라우저 탭의 제목을 수정 */}
      </Helmet>
      <div className="box">
        <div className="header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ←
          </button>
          <h2>비밀번호 찾기</h2>
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
          {emailError && <p className="error-text">{emailError}</p>}{" "}
          {/* 이메일 에러 메시지 표시 */}
        </div>

        <div className="input-group">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="아이디를 입력하세요"
          />
          {emailError && <p className="error-text">{emailError}</p>}{" "}
          {/* 이메일 에러 메시지 표시 */}
        </div>

        <button
          type="button"
          onClick={handlePasswordResetRequest}
          disabled={!(formData.email && formData.username)}>
          임시 비밀번호 발급하기
        </button>
      </div>
    </div>
  );
}

export default FindPasswordPage;
