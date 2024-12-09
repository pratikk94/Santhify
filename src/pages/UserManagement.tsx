import React, { useState } from 'react';
import '../styles/dashboard.css'; // Style for the dashboard layout
import Sidebar from '../components/Navigation/Sidebar/Sidebar';
import UserManagement from '../components/UserManagement/UserManagement';


const Account: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false); // State to track sidebar collapse

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar
        
        onCollapse={(isCollapsed) => setCollapsed(isCollapsed)} // Handle collapse
      />

      {/* Main Content */}
      <div className={`dashboard-main ${collapsed ? 'collapsed-sidebar' : ''}`}>
        <UserManagement />
      </div>
    </div>
  );
};

export default Account;