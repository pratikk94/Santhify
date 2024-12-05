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
import './sidebar.css';

const { Sider } = Layout;

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void; // Optional callback
}

const Sidebar: React.FC<SidebarProps> = ({ onCollapse }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (onCollapse) {
      onCollapse(collapsed); // Call onCollapse only if it exists
    }
  }, [collapsed, onCollapse]);

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  const menuItems = [
    { key: 'clients', icon: <UserOutlined />, label: 'Clients', path: '/clients' },
    { key: 'groups', icon: <TeamOutlined />, label: 'Groups', path: '/groups' },
    { key: 'library', icon: <BookOutlined />, label: 'Library', path: '/library' },
    { key: 'payments', icon: <DollarOutlined />, label: 'Payments', path: '/payments' },
    { key: 'account', icon: <SettingOutlined />, label: 'Account', path: '/account' },
  ];

  return (
    <>
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
        onCollapse={(isCollapsed) => setCollapsed(isCollapsed)}
        width={250}
        collapsedWidth={80}
        style={{
          height: '100vh',
          background: '#ffffff',
          position: 'fixed',
          zIndex: 999,
          borderRight: '1px solid #e0e0e0',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="logo">Logo</div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['clients']}
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