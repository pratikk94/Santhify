import React from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import './UserCard.css';

interface UserCardProps {
  user: {
    id: number;
    name: string;
    roles: string[];
    initials: string;
    color: string;
  };
  onProfileClick?: () => void;
  onContactClick?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onProfileClick, onContactClick }) => {
  const menu = (
    <Menu>
      <Menu.Item key="1">View Details</Menu.Item>
      <Menu.Item key="2">Edit User</Menu.Item>
      <Menu.Item key="3">Delete User</Menu.Item>
    </Menu>
  );

  return (
    <div className="user-card">
      {/* Options Dropdown */}
      <Dropdown overlay={menu} trigger={['click']} placement="topRight">
        <EllipsisOutlined className="user-card-options" />
      </Dropdown>

      {/* Avatar */}
      <div className="user-card-avatar">
        <Avatar
          size={56}
          style={{
            backgroundColor: user.color,
            color: '#fff',
            fontSize: '20px',
          }}
        >
          {user.initials}
        </Avatar>
      </div>

      {/* User Info */}
      <div className="user-card-info">
        <p className="user-card-name">{user.name}</p>
        <div className="user-card-roles">
          {user.roles.slice(0, 2).map((role, index) => (
            <span key={index} className="user-role">
              {role}
            </span>
          ))}
          {user.roles.length > 2 && (
            <span className="user-role-more">See more...</span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="user-card-actions">
        <button className="user-action-button" onClick={onProfileClick}>
          Profile
        </button>
        <button className="user-action-button" onClick={onContactClick}>
          Contact
        </button>
      </div>
    </div>
  );
};

export default UserCard;