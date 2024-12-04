import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import ProtectedRoute from './authentication/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Client from './pages/Client';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client"
          element={
            <ProtectedRoute>
              <Client />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;