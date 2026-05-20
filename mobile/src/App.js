import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './screens/Login';
import Home from './screens/Home';
import Queue from './screens/Queue';
import Patients from './screens/Patients';
import Chart from './screens/Chart';
import Triage from './screens/Triage';
import Nursing from './screens/Nursing';
import Pharmacy from './screens/Pharmacy';
import Settings from './screens/Settings';
import Navigation from './components/Navigation';

function App() {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null,
    user: null
  });

  const handleLogin = (userData) => {
    setAuth({
      isAuthenticated: true,
      role: userData.perfil,
      user: userData.nome
    });
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 pb-20">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/*"
            element={
              auth.isAuthenticated ? (
                <>
                  <Routes>
                    <Route path="/" element={<Home userRole={auth.role} userName={auth.user} />} />
                    <Route path="/queue" element={<Queue />} />
                    <Route path="/patients" element={<Patients />} />
                    <Route path="/chart/:id" element={<Chart />} />
                    <Route path="/triage" element={<Triage />} />
                    <Route path="/nursing" element={<Nursing />} />
                    <Route path="/pharmacy" element={<Pharmacy />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                  <Navigation role={auth.role} />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
