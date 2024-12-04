import React from 'react';
import { Button, Space } from 'antd';
import {
  FileOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import './TopNav.css';

const TopNav: React.FC = () => {
  return (
    <div className="top-nav">
      <div className="top-nav-buttons">
        <Space size="middle">
          <Button className="top-nav-btn" icon={<FileOutlined />} />
          <Button className="top-nav-btn" icon={<FileOutlined />} />
          <Button className="top-nav-btn" icon={<UsergroupAddOutlined />} />
          <Button className="top-nav-btn" icon={<SettingOutlined />} />
          <Button className="top-nav-btn" icon={<MoreOutlined />} />
        </Space>
      </div>
    </div>
  );
};

export default TopNav;