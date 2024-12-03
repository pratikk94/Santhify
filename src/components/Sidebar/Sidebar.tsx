import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  DollarOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import '../Sidebar/sidebar.css';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  // Adjust sidebar based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true); // Collapse sidebar on small screens
      } else {
        setCollapsed(false); // Expand sidebar on larger screens
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <>
      {/* Hamburger Button */}
      <Button
        className="hamburger-button"
        type="primary"
        onClick={toggleCollapsed}
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1000,
          display: window.innerWidth < 768 ? 'block' : 'none',
        }}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={!collapsed}
      />

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        style={{
          height: '100vh',
          background: '#ffffff',
          position: 'fixed',
          zIndex: 999,
          borderRight: '1px solid #e0e0e0',
        }}
        width={250}
        collapsedWidth={0} // Fully collapse on smaller screens
      >
        <div
          className="logo"
          style={{
            height: 64,
            margin: 16,
            background: '#4b49ac',
            borderRadius: 8,
            color: '#fff',
            textAlign: 'center',
            lineHeight: '64px',
            fontWeight: 'bold',
          }}
        >
          Logo
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={[
            { key: '1', icon: <UserOutlined />, label: 'Clients' },
            { key: '2', icon: <TeamOutlined />, label: 'Groups' },
            { key: '3', icon: <BookOutlined />, label: 'Library' },
            { key: '4', icon: <DollarOutlined />, label: 'Payments' },
            { key: '5', icon: <SettingOutlined />, label: 'Account' },
          ]}
          style={{ borderRight: 'none' }}
        />
      </Sider>
    </>
  );
};

export default Sidebar;