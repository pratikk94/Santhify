import React from 'react';
import { Button, Space, Typography } from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  
} from '@ant-design/icons';
import './TopNav.css'

const { Title, Text } = Typography;

interface GroupHeaderProps {
  groupName: string;
  totalMembers: number;
  onSearchClick: () => void;
  onFilterClick: () => void;
  onSortClick: () => void;
  onAddClick: () => void;
}

const TopNav: React.FC<GroupHeaderProps> = ({
  groupName,
  totalMembers,
  onSearchClick,
  onFilterClick,
  onSortClick,
  
}) => {
  return (
    <div className="group-header">
      {/* Left Section */}
      <div className="group-header-left">
        <Title level={4} className="group-name">{groupName}</Title>
        <div className="group-tabs">
          <Text className="group-tab active-tab">Group Members</Text>
          <Text className="group-tab">Group Library</Text>
        </div>
        <Text className="member-count">All members <span>{totalMembers}</span></Text>
      </div>

      {/* Right Section */}
      <div className="group-header-right">
        <Space size="middle">
          <Button
            type="default"
            icon={<SearchOutlined />}
            onClick={onSearchClick}
            className="group-action-btn"
          >
            Search for user
          </Button>
          <Button
            type="default"
            icon={<FilterOutlined />}
            onClick={onFilterClick}
            className="group-action-btn"
          >
            Filters
          </Button>
          <Button
            type="default"
            icon={<SortAscendingOutlined />}
            onClick={onSortClick}
            className="group-action-btn"
          >
            Sort by
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default TopNav;