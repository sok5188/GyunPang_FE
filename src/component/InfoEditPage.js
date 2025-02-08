import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/myinfo.css"; // 스타일 파일 추가

function InfoEditPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    name: "홍길동",
    nickname: "길동이",
    email: "gildong@example.com",
    address: "서울특별시 강남구",
    password: "password123",
  });
  const [editMode, setEditMode] = useState({
    name: false,
    nickname: false,
    email: false,
    address: false,
    password: false,
  });
  const [tempData, setTempData] = useState({ ...userData });
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // 비밀번호 확인 로직
    if (password === "correct-password") {
      setIsAuthenticated(true);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const handleEditClick = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: true }));
    setTempData((prev) => ({ ...prev, [field]: "" }));
    if (field === "password") {
      setConfirmPassword("");
    }
  };

  const handleCancelClick = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: false }));
    setTempData((prev) => ({ ...prev, [field]: userData[field] }));
    if (field === "password") {
      setConfirmPassword("");
    }
  };

  const handleChange = (e, field) => {
    setTempData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSaveClick = (field) => {
    if (field === "password" && tempData.password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    setUserData((prev) => ({ ...prev, [field]: tempData[field] }));
    setEditMode((prev) => ({ ...prev, [field]: false }));
  };

  const renderInfoItem = (label, field, type = "text") => (
    <div className="info-item">
      <label className="info-label">{label}</label>
      {editMode[field] ? (
        <>
          <input
            type={type}
            value={tempData[field]}
            onChange={(e) => handleChange(e, field)}
            className="info-input"
            placeholder={label}
          />
          {field === "password" && (
            <>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="새 비밀번호 확인"
                className="info-input"
              />
              <div className="password-check-message">
                {confirmPassword &&
                  (tempData.password === confirmPassword ? (
                    <span className="password-match">
                      비밀번호가 일치합니다
                    </span>
                  ) : (
                    <span className="password-mismatch">
                      비밀번호를 확인해주세요
                    </span>
                  ))}
              </div>
            </>
          )}
        </>
      ) : (
        <span className="info-value">
          {field === "password" ? "********" : userData[field]}
        </span>
      )}
      <div className="info-buttons">
        {editMode[field] ? (
          <>
            <button
              onClick={() => handleSaveClick(field)}
              className="info-button">
              저장
            </button>
            <button
              onClick={() => handleCancelClick(field)}
              className="info-button">
              취소
            </button>
          </>
        ) : (
          <button
            onClick={() => handleEditClick(field)}
            className="info-button">
            변경하기
          </button>
        )}
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="password-container">
        <form onSubmit={handlePasswordSubmit} className="password-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
            className="password-input"
          />
          <button type="submit" className="password-button">
            확인
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="info-edit-page">
      <h3>정보 수정</h3>
      {renderInfoItem("이름", "name")}
      {renderInfoItem("닉네임", "nickname")}
      {renderInfoItem("이메일", "email", "email")}
      {renderInfoItem("주소", "address")}
      {renderInfoItem("비밀번호", "password", "password")}
    </div>
  );
}

export default InfoEditPage;
