import React from 'react';
import { Button, Space } from 'antd';
import { UserOutlined, SettingOutlined, AppstoreOutlined, MoreOutlined } from '@ant-design/icons';
import '../TopNav/TopNav.css';

const TopNav: React.FC = () => {
  return (
    <div className="top-nav">
      <div className="top-nav-buttons">
        <Space>
          <Button icon={<UserOutlined />} />
          <Button icon={<SettingOutlined />} />
          <Button icon={<AppstoreOutlined />} />
          <Button icon={<MoreOutlined />} />
        </Space>
      </div>
    </div>
  );
};

export default TopNav;