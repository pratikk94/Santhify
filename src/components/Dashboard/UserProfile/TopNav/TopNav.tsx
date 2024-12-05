import React, { useState } from 'react';
import { Button, Space, Tooltip } from 'antd';
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
import LibraryModal from '../Library/Library';

interface TopNavProps {
  onGroupsClick: () => void; // Handler for Groups button
  onAddUserClick: () => void; // Handler for Add User button
}

const TopNav: React.FC<TopNavProps> = ({ onGroupsClick, onAddUserClick }) => {
  const navigate = useNavigate();
  const [isLibraryModalVisible, setIsLibraryModalVisible] = useState(false);

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const openLibraryModal = () => {
    setIsLibraryModalVisible(true);
  };

  const closeLibraryModal = () => {
    setIsLibraryModalVisible(false);
  };

  return (
    <div className="top-nav">
      {/* Top Row */}
      <div className="top-row">
        {/* Left Section */}
        <div className="top-row-left">
          <Button
            shape="circle"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            className="back-button"
          />
          <h2 className="top-nav-title">Client Profile</h2>
        </div>

        {/* Right Section */}
        <div className="top-row-right">
          <Space size="middle">
            <Tooltip title="Messages">
              <Button shape="circle" icon={<MailOutlined />} />
            </Tooltip>
            <Tooltip title="Files">
              <Button shape="circle" icon={<FileOutlined />} onClick={openLibraryModal} />
            </Tooltip>
            <Tooltip title="Groups">
              <Button shape="circle" icon={<TeamOutlined />} onClick={onGroupsClick} />
            </Tooltip>
            <Tooltip title="Settings">
              <Button shape="circle" icon={<SettingOutlined />} />
            </Tooltip>
            <Tooltip title="Add User">
              <Button shape="circle" icon={<UserAddOutlined />} onClick={onAddUserClick} />
            </Tooltip>
            <Tooltip title="More">
              <Button shape="circle" icon={<MoreOutlined />} />
            </Tooltip>
          </Space>
        </div>
      </div>

      {/* Library Modal */}
      <LibraryModal
        isVisible={isLibraryModalVisible}
        onClose={closeLibraryModal}
      />
    </div>
  );
};

export default TopNav;