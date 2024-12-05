import React from 'react';
import './TopNav.css';
import { Input, Button, Dropdown, Menu } from 'antd';
import { SearchOutlined, PlusOutlined, DownOutlined, ArrowLeftOutlined } from '@ant-design/icons';

interface TopNavProps {
  path: string[];
  onGoBack: () => void; // Callback for navigating back
}

const TopNav: React.FC<TopNavProps> = ({ path, onGoBack }) => {
  const menu = (
    <Menu>
      <Menu.Item key="1">Option 1</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
      <Menu.Item key="3">Option 3</Menu.Item>
    </Menu>
  );

  return (
    <div className="top-nav">
      <div className="left-section">
        {path.length > 1 && (
          <Button
            className="back-button"
            shape="circle"
            icon={<ArrowLeftOutlined />}
            onClick={onGoBack}
          />
        )}
        <div className="path-container">
          {path.map((segment, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="path-divider"> &gt; </span>}
              <span className="path-segment">{segment}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="right-section">
        <Input
          className="search-input"
          placeholder="Search for Files"
          prefix={<SearchOutlined />}
        />
        <Dropdown overlay={menu} trigger={['click']}>
          <Button className="dropdown-button">
            Filter by <DownOutlined />
          </Button>
        </Dropdown>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button className="dropdown-button">
            Sort by <DownOutlined />
          </Button>
        </Dropdown>
        <Button className="add-button" icon={<PlusOutlined />}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default TopNav;