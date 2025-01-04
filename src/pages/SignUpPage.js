import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

function SignupPage() {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    email: '',
    role: 'buyer',
    verificationCode: '',
  });
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const checkUsernameAvailability = async () => {
    try {
      const response = await axios.get(`open/auth/checkUsername?username=${formData.username}`);
      setIsUsernameAvailable(response.data.isAvailable);
    } catch (error) {
      console.error("아이디 중복 확인 오류", error);
    }
  };

  const handleEmailVerification = async () => {
    try {
      const response = await axios.get(`open/auth/sendEmailCode?email=${formData.email}`);
      if (response.status === 200) {
        alert('인증 코드가 이메일로 전송되었습니다.');
        setTimer(300); // 타이머 시작 (5분 = 300초)
        setTimerRunning(true);
      } else {
        alert('인증 코드 전송에 실패했습니다.');
      }
    } catch (error) {
      console.error("인증 코드 전송 오류", error);
    }
  };

  const verifyEmailCode = async () => {
    try {
      const response = await axios.get(`open/auth/verifyEmailCode?email=${formData.email}&code=${formData.verificationCode}`);
      setIsEmailVerified(response.data.isVerified);
      if (!response.data.isVerified) {
        alert('인증 코드가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error("인증 코드 확인 오류", error);
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsPasswordValid(regex.test(password));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!isUsernameAvailable) {
      alert('아이디가 이미 존재합니다.');
      return;
    }

    if (!isEmailVerified) {
      alert('이메일 인증이 필요합니다.');
      return;
    }

    try {
      const response = await axios.post('open/auth/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('회원가입이 완료되었습니다.');
      } else {
        alert('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error("회원가입 오류", error);
      alert('회원가입에 실패했습니다.');
    }
  };

  useEffect(() => {
    let timerInterval;
    if (timerRunning && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(timerInterval);
  }, [timer, timerRunning]);

  return (
      <div className="container">
        <Helmet>
            <title>회원가입</title>  {/* 여기서 브라우저 탭의 제목을 수정 */}
        </Helmet>
      <div className="box">
        <div className="header">
          <button className="back-btn" onClick={() => navigate(-1)}>←</button>
          <h2>회원가입</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">아이디</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="아이디를 입력하세요"
              />
              <button
                type="button"
                onClick={checkUsernameAvailability}
                disabled={!formData.username}
              >
               중복 확인
              </button>
            </div>
            {!isUsernameAvailable && <p className="error-text">아이디가 중복됩니다.</p>}
          </div>

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
            <label htmlFor="nickname">별명</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleInputChange}
              placeholder="별명을 입력하세요"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="이메일을 입력하세요"
              />
              <button
                type="button"
                onClick={handleEmailVerification}
                disabled={!formData.email}
              >
                인증하기
              </button>
            </div>
          </div>

          {formData.email && !isEmailVerified && (
            <div className="input-group">
              <label htmlFor="verificationCode">인증 코드</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="verificationCode"
                  name="verificationCode"
                  value={formData.verificationCode}
                  onChange={handleInputChange}
                  placeholder="인증 코드를 입력하세요"
                />
                <button
                  type="button"
                  onClick={verifyEmailCode}
                >
                  인증 코드 확인
                </button>
              </div>
              <div className="timer">
                {timerRunning && timer > 0 ? (
                  <span>{Math.floor(timer / 60)}:{timer % 60}</span>
                ) : (
                  <span className="error-text">인증 시간이 초과되었습니다. 다시 시도해주세요.</span>
                )}
              </div>
            </div>
          )}

          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => {
                handleInputChange(e);
                validatePassword(e.target.value);
              }}
              placeholder="비밀번호를 입력하세요"
            />
            {!isPasswordValid && <p className="error-text">비밀번호는 8자리 이상이고 특수문자를 포함해야 합니다.</p>}
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="비밀번호를 다시 입력하세요"
            />
          </div>

          <div className="input-group">
            <label>가입 유형</label>
            <div className="role-select">
              <input
                type="radio"
                id="buyer"
                name="role"
                value="buyer"
                checked={formData.role === 'buyer'}
                onChange={handleInputChange}
              />
              <label htmlFor="buyer">구매자</label>
              <input
                type="radio"
                id="seller"
                name="role"
                value="seller"
                checked={formData.role === 'seller'}
                onChange={handleInputChange}
              />
              <label htmlFor="seller">판매자</label>
            </div>
          </div>

          <button type="submit" className="btn">회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
