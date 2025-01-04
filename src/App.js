// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HealthPage from "./pages/HealthPage";
import DefaultPage from "./pages/DefaultPage";
import AuthPage from "./pages/AuthPage";
import SignupPage from "./pages/SignUpPage";
import "./css/main.css";
import Header from "./component/Header";
import FindPasswordPage from "./pages/FindPasswordPage";
import FindUsernamePage from "./pages/FindUserNamePage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/health" element={<HealthPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/find-username" element={<FindUsernamePage />} />
        <Route path="/find-password" element={<FindPasswordPage />} />
        <Route path="/" element={<DefaultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
