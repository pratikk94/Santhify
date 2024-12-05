import React from 'react';
import { Button, Avatar, Space, Tooltip } from 'antd';
import {
  MailOutlined,
  FileOutlined,
  TeamOutlined,
  SettingOutlined,
  UserAddOutlined,
  MoreOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import './TopNav.css';
import { useNavigate } from 'react-router-dom';

const TopNav: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="top-nav">
      {/* Top Row */}
      <div className="top-row">
        <div className="top-row-left">
          <Button
            shape="circle"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            className="back-button"
          />
          <h2 className="top-nav-title">Client Profile</h2>
        </div>
        <div className="top-row-right">
          <Space size="middle">
            <Tooltip title="Messages">
              <Button shape="circle" icon={<MailOutlined />} />
            </Tooltip>
            <Tooltip title="Files">
              <Button shape="circle" icon={<FileOutlined />} />
            </Tooltip>
            <Tooltip title="Groups">
              <Button shape="circle" icon={<TeamOutlined />} />
            </Tooltip>
            <Tooltip title="Settings">
              <Button shape="circle" icon={<SettingOutlined />} />
            </Tooltip>
            <Tooltip title="Add User">
              <Button shape="circle" icon={<UserAddOutlined />} />
            </Tooltip>
            <Tooltip title="More">
              <Button shape="circle" icon={<MoreOutlined />} />
            </Tooltip>
          </Space>
          <Button type="primary" className="add-button">
            Add <span className="plus-icon">+</span>
          </Button>
        </div>
      </div>

    </div>
  );
};

export default TopNav;