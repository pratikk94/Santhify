import React from 'react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import './UserCard.css';

interface UserCardProps {
  user: {
    id: number;
    name: string;
    initials?: string;
    dateAdded: string;
    color?: string;
  };
  onProfileClick?: () => void;
  onContactClick?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onProfileClick,
  onContactClick,
}) => {
  const menu = (
    <Menu>
      <Menu.Item key="edit">Edit User</Menu.Item>
      <Menu.Item key="delete">Delete User</Menu.Item>
    </Menu>
  );

  return (
    <div className="user-card-container">
      {/* Dropdown Options */}
      <Dropdown overlay={menu} trigger={['click']} placement="topRight">
        <EllipsisOutlined className="user-card-options" />
      </Dropdown>

      {/* Avatar Section */}
      <div className="user-card-avatar">
        <Avatar
          size={56}
          style={{
            backgroundColor: user.color || '#635cf4',
            color: '#fff',
            fontSize: '20px',
          }}
        >
          {user.initials || user.name[0]}
        </Avatar>
      </div>

      {/* User Info Section */}
      <div className="user-card-info">
        <p className="user-card-name">{user.name}</p>
        <p className="user-card-date">Added: {user.dateAdded}</p>
      </div>

      {/* Action Buttons */}
      <div className="user-card-actions">
        <Button
          type="default"
          className="profile-button"
          onClick={(e) => {
            e.stopPropagation();
            onProfileClick && onProfileClick();
          }}
        >
          Profile
        </Button>
        <Button
          type="default"
          className="contact-button"
          onClick={(e) => {
            e.stopPropagation();
            onContactClick && onContactClick();
          }}
        >
          Contact
        </Button>
      </div>
    </div>
  );
};

export default UserCard;