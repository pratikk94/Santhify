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
import classNames from 'classnames';
import './userCard.css';

interface User {
  id: number;
  name: string;
  icon?: string; // Optional in case there's no user icon
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

  const handleMenuClick = (action: string) => {
    switch (action) {
      case 'view':
        alert('View Details');
        break;
      case 'edit':
        alert('Edit User');
        break;
      case 'delete':
        alert('Delete User');
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => handleMenuClick('view')}>
        View Details
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleMenuClick('edit')}>
        Edit User
      </Menu.Item>
      <Menu.Item key="3" onClick={() => handleMenuClick('delete')}>
        Delete User
      </Menu.Item>
    </Menu>
  );

  const cardClasses = classNames('user-card', {
    'verified-user': user.is_verified,
    'payment-completed': user.is_payment_completed,
  });

  return (
    <Card bordered className={cardClasses}>
      {/* Dropdown Menu */}
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <Button type="text" icon={<MoreOutlined />} className="three-dots" />
      </Dropdown>

      {/* User Avatar */}
      <div className="user-avatar">
        <Avatar
          size={48}
          src={user.icon}
          style={{
            backgroundColor: user.is_verified ? '#E8F5E9' : '#FDEDEC',
            color: user.is_verified ? '#4CAF50' : '#F44336',
            fontSize: '16px',
          }}
        >
          {user.name[0].toUpperCase()}
        </Avatar>
      </div>

      {/* User Info */}
      <div className="user-info">
        <div className="user-name">{user.name}</div>
        <div className="user-date">Added: {user.date_added}</div>
      </div>

      {/* Status Icons */}
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
        <Button type="default" className="profile-button" onClick={handleProfileClick}>
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