import React from 'react';
import { Card, Button, Avatar, Dropdown, Menu } from 'antd';
import {
  DollarOutlined,
  MailOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './userCard.css';

interface User {
  id: number;
  name: string;
  icon: string;
  date_added: string;
  is_verified: boolean;
  is_payment_completed: boolean;
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/profile/${user.id}`);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => alert('View Details')}>
        View Details
      </Menu.Item>
      <Menu.Item key="2" onClick={() => alert('Edit User')}>
        Edit User
      </Menu.Item>
      <Menu.Item key="3" onClick={() => alert('Delete User')}>
        Delete User
      </Menu.Item>
    </Menu>
  );

  return (
    <Card bordered className="user-card">
      {/* Three Dots Dropdown */}
      <Dropdown overlay={menu} trigger={['click']}>
        <Button
          type="text"
          icon={<MoreOutlined />}
          className="three-dots"
        />
      </Dropdown>

      {/* User Avatar */}
      <div className="user-avatar">
        <Avatar
          size={36}
          src={user.icon}
          style={{ backgroundColor: '#D8D5FE', color: '#635CF4', fontSize: '16px' }}
        >
          {user.name[0].toUpperCase()}
        </Avatar>
      </div>

      {/* User Information */}
      <div className="user-info">
        <div className="user-name">{user.name}</div>
        <div className="user-date">Added: {user.date_added}</div>
      </div>

      {/* User Status Icons */}
      <div className="user-icons">
        {/* Payment Status */}
        <div className="icon-container">
          <DollarOutlined className="default-icon" />
          {user.is_payment_completed ? (
            <CheckCircleOutlined className="overlay-icon success-icon" />
          ) : (
            <CloseCircleOutlined className="overlay-icon error-icon" />
          )}
        </div>

        {/* Verification Status */}
        <div className="icon-container">
          <MailOutlined className="default-icon" />
          {user.is_verified ? (
            <CheckCircleOutlined className="overlay-icon success-icon" />
          ) : (
            <CloseCircleOutlined className="overlay-icon error-icon" />
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="user-actions">
        <Button
          type="default"
          className="profile-button"
          onClick={handleProfileClick}
        >
          Profile
        </Button>
        <Button type="default" className="contact-button">
          Contact
        </Button>
      </div>
    </Card>
  );
};

export default UserCard;