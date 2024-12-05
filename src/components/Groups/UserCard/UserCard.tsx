import React from 'react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import './UserCard.css';

interface UserCardProps {
  user: {
    id: number;
    name: string;
    initials: string;
    color: string;
  };
  onProfileClick: () => void;
  onContactClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onProfileClick, onContactClick }) => {
  const menu = (
    <Menu>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );

  return (
    <div className="user-card">
      <div className="user-card-avatar">
        <Avatar
          size={64}
          style={{ backgroundColor: user.color, color: '#fff', fontWeight: 'bold' }}
        >
          {user.initials}
        </Avatar>
      </div>
      <div className="user-card-info">
        <p className="user-card-name">{user.name}</p>
      </div>
      <div className="user-card-actions">
        <Button type="link" onClick={onProfileClick}>
          Profile
        </Button>
        <Button type="link" onClick={onContactClick}>
          Contact
        </Button>
      </div>
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <EllipsisOutlined className="user-card-options" />
      </Dropdown>
    </div>
  );
};

export default UserCard;