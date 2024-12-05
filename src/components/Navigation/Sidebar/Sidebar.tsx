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
import { useNavigate } from 'react-router-dom';
import '../Sidebar/sidebar.css';

const { Sider } = Layout;
interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void; // Optional callback
}

const Sidebar: React.FC<SidebarProps> = ({ onCollapse }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const navigate = useNavigate();

  // Adjust sidebar based on screen size
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleCollapsed = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    if (onCollapse) {
      onCollapse(newCollapsed); // Notify parent only if onCollapse is defined
    }
  };

  const menuItems = [
    { key: 'clients', icon: <UserOutlined />, label: 'Clients', path: '/client' },
    { key: 'groups', icon: <TeamOutlined />, label: 'Groups', path: '/groups' },
    { key: 'library', icon: <BookOutlined />, label: 'Library', path: '/library' },
    { key: 'payments', icon: <DollarOutlined />, label: 'Payments', path: '/payments' },
    { key: 'account', icon: <SettingOutlined />, label: 'Account', path: '/account' },
  ];

  return (
    <>
      {/* Hamburger Button for small screens */}
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
        }}
      />

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        width={250}
        collapsedWidth={0}
        style={{
          height: '100vh',
          background: '#ffffff',
          position: 'fixed',
          zIndex: 999,
          borderRight: '1px solid #e0e0e0',
        }}
      >
        <div className="logo">Logo</div>
        <Menu
          theme="light"
          defaultSelectedKeys={['clients']}
          mode="inline"
          onClick={({ key }) => {
            const path = menuItems.find((item) => item.key === key)?.path || '/';
            navigate(path);
          }}
          items={menuItems.map(({ key, icon, label }) => ({
            key,
            icon,
            label,
          }))}
        />
      </Sider>
    </>
  );
};

export default Sidebar;