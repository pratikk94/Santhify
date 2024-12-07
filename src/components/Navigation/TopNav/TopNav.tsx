import React from 'react';
import { Button, Space } from 'antd';
import { UserAddOutlined, BellOutlined} from '@ant-design/icons';
import '../TopNav/TopNav.css';

const TopNav: React.FC = () => {
  return (
    <div className="top-nav">
      <div className="top-nav-buttons">
        <Space>
          <Button icon={<UserAddOutlined />} />
          <Button icon={<BellOutlined />} />
        </Space>
      </div>
    </div>
  );
};



export default TopNav;

