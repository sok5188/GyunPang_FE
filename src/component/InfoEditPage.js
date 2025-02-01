import React, { useState } from 'react';

function InfoEditPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // 비밀번호 확인 로직
    if (password === 'correct-password') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  if (!isAuthenticated) {
    return (
      <form onSubmit={handlePasswordSubmit}>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="비밀번호 입력"
        />
        <button type="submit">확인</button>
      </form>
    );
  }

  return (
    <div>
      <h3>정보 수정</h3>
      <form>
        <input type="text" placeholder="이름" />
        <input type="text" placeholder="닉네임" />
        <input type="email" placeholder="이메일" />
        <input type="text" placeholder="주소" />
        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
}

export default InfoEditPage;
