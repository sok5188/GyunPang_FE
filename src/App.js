// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HealthPage from "./pages/HealthPage";
import DefaultPage from "./pages/DefaultPage";
import AuthPage from './pages/AuthPage';
import SignupPage from './pages/SignUpPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/health" element={<HealthPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/" element={<DefaultPage />} />
            </Routes>
        </Router>
    );
}

export default App;
