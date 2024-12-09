import React from 'react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import './UserCard.css';

interface UserCardProps {
  user: {
    id: number;
    name: string;
    peopleCount: number;
    initials?: string;
    color?: string;
  };
  onProfileClick?: () => void;
  onContactClick?: () => void;
  onEnterGroup?: () => void; // Optional enter group handler
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onProfileClick,
  onContactClick,
  onEnterGroup,
}) => {
  const menu = (
    <Menu>
      <Menu.Item key="edit">Edit Group</Menu.Item>
      <Menu.Item key="delete">Delete Group</Menu.Item>
    </Menu>
  );

  return (
    <div className="g-user-card" onClick={onEnterGroup} style={{ cursor: 'pointer' }}>
      <Dropdown overlay={menu} trigger={['click']} placement="topRight">
        <EllipsisOutlined className="g-user-card-options" />
      </Dropdown>
      <div className="g-user-card-avatar">
        <Avatar
          size={48}
          style={{
            backgroundColor: user.color || '#635cf4',
            color: '#fff',
            fontSize: '24px',
          }}
        >
          {user.initials || user.name[0]}
        </Avatar>
      </div>
      <div className="g-user-card-info">
        <p className="g-user-card-name">{user.name}</p>
        <p className="g-user-card-people">{user.peopleCount} People</p>
      </div>
      <div>
        {onProfileClick && (
          <Button type="link" onClick={(e) => {
            e.stopPropagation();
            onProfileClick();
          }}>
            Profile
          </Button>
        )}
        {onContactClick && (
          <Button type="link" onClick={(e) => {
            e.stopPropagation();
            onContactClick();
          }}>
            Contact
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserCard;