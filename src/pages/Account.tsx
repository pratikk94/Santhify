import React, { useState } from 'react';
import '../styles/dashboard.css'; // Style for the dashboard layout
import Sidebar from '../components/Navigation/Sidebar/Sidebar';
import AccountComp from '../components/Account/Account';

const Account: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false); // State to track sidebar collapse

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onCollapse={(isCollapsed) => setCollapsed(isCollapsed)} // Handle collapse
      />

      {/* Main Content */}
      <div className={`dashboard-main ${collapsed ? 'collapsed-sidebar' : ''}`}>
        <AccountComp />
      </div>
    </div>
  );
};

export default Account;