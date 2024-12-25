import React, { useState } from 'react';
import Sidebar from '../components/Navigation/Sidebar/Sidebar';

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar onCollapse={(isCollapsed) => setCollapsed(isCollapsed)} />
      <div
        style={{
          flex: 1,
          marginLeft: collapsed ? '0' : '250px',
          transition: 'margin-left 0.2s',
          padding: '20px'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
