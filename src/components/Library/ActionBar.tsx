import React from 'react';
import { Button, Dropdown, Menu } from 'antd';

const ActionBar: React.FC = () => {
  const filterMenu = (
    <Menu>
      <Menu.Item>Filter by Date</Menu.Item>
      <Menu.Item>Filter by Type</Menu.Item>
    </Menu>
  );

  const sortMenu = (
    <Menu>
      <Menu.Item>Sort by Name</Menu.Item>
      <Menu.Item>Sort by Date</Menu.Item>
    </Menu>
  );

  return (
    <div className="action-bar">
      <Dropdown overlay={filterMenu}>
        <Button>Filter by</Button>
      </Dropdown>
      <Dropdown overlay={sortMenu}>
        <Button>Sort by</Button>
      </Dropdown>
      <Button type="primary">Add +</Button>
    </div>
  );
};

export default ActionBar;