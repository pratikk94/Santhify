import React from 'react';
import { Card, Button, Avatar } from 'antd';
import {
  DollarOutlined,
  MailOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import '../UserCard/userCard.css';

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
  return (
    <Card bordered className="user-card">
      {/* User Avatar */}
      <div className="user-avatar">
        <Avatar
          size={64}
          src={user.icon}
          style={{ backgroundColor: '#D8D5FE', color: '#635CF4' }}
        >
          {user.name[0]}
        </Avatar>
      </div>

      {/* User Information */}
      <div className="user-info">
        <div className="user-name">{user.name}</div>
        <div className="user-date">Date added: {user.date_added}</div>
      </div>

      {/* User Status Icons */}
      <div className="user-icons">
        {/* Payment Status */}
        <div className="icon-container">
          <DollarOutlined className="main-icon" />
          {user.is_payment_completed ? (
            <CheckCircleOutlined className="icon-status" style={{ color: 'green' }} />
          ) : (
            <CloseCircleOutlined className="icon-status" style={{ color: 'red' }} />
          )}
        </div>
        {/* Verification Status */}
        <div className="icon-container">
          <MailOutlined className="main-icon" />
          {user.is_verified ? (
            <CheckCircleOutlined className="icon-status" style={{ color: 'green' }} />
          ) : (
            <CloseCircleOutlined className="icon-status" style={{ color: 'red' }} />
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="user-actions">
        <Button type="default" className="profile-button">
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