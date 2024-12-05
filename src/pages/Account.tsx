import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import '../styles/Account.css';

import Sidebar from '../components/Navigation/Sidebar/Sidebar';
import Dashboard from './Dashboard';
import FileManager from '../components/Library/FileManager';

const Account: React.FC = () => {
  return (
    <div className="account-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="account-main">
        <nav className="account-nav">
          <ul>
            <li>
              <NavLink 
                to="/account/dashboard" 
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/account/filemanager" 
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                File Manager
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="filemanager" element={<FileManager />} />
        </Routes>
      </div>
    </div>
  );
};

export default Account;