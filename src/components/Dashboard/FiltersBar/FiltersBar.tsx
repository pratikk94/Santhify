import React, { useState } from 'react';
import { Input, Button, Space, Typography, Dropdown, Menu } from 'antd';
import {
  SearchOutlined,
  SortAscendingOutlined,
  FilterOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Dayjs } from 'dayjs'; // Import Dayjs type
import './FiltersBar.css';

const { Text } = Typography;

interface FilterCriteria {
  countries: string[];
  ageRange: [number, number];
  dateRange: [Dayjs, Dayjs]; // Updated to use Dayjs
  date_added: Dayjs; // Updated to use Dayjs
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface FiltersBarProps {
  onSearch: (value: string) => void;
  onSortBy: () => void;
  onFilterApply: (filters: FilterCriteria) => void; // Updated type
  onAddUser: (user: User) => void;
  totalUsers: number;
}

const FiltersBar: React.FC<FiltersBarProps> = ({
  onSearch,
  onSortBy,
  onFilterApply,
  totalUsers,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterOpen = () => {
    const filters: FilterCriteria = {
      countries: ['US', 'Canada'],
      ageRange: [18, 30],
      dateRange: [null as unknown as Dayjs, null as unknown as Dayjs], // Replace with Dayjs objects in real usage
      date_added: null as unknown as Dayjs, // Replace with a Dayjs object
    };
    onFilterApply(filters); // Apply filters with correct structure
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<SortAscendingOutlined />} onClick={onSortBy}>
        Sort By
      </Menu.Item>
      <Menu.Item key="2" icon={<FilterOutlined />} onClick={handleFilterOpen}>
        Filters
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="filters-bar">
      <div className="filters-bar-left">
        <Text strong className="user-count-label">
          Showing {totalUsers} Users
        </Text>
      </div>
      <div className="filters-bar-right">
        <Space wrap>
          <Input
            placeholder="Search for user"
            prefix={<SearchOutlined style={{ color: '#6c63ff' }} />}
            value={searchTerm}
            onChange={handleSearch}
            className="styled-search-input"
            aria-label="Search for user"
          />
          <div className="button-group">
            <Button
              className="styled-button"
              icon={<SortAscendingOutlined />}
              onClick={onSortBy}
              aria-label="Sort by"
            >
              Sort By
            </Button>
            <Button
              className="styled-button"
              icon={<FilterOutlined />}
              onClick={handleFilterOpen}
              aria-label="Open filters"
            >
              Filters
            </Button>
          </div>
          <Dropdown overlay={menu} trigger={['click']} className="dropdown-menu">
            <Button
              className="styled-button menu-button"
              icon={<MenuOutlined />}
              aria-label="More actions"
            />
          </Dropdown>
        </Space>
      </div>
    </div>
  );
};

export default FiltersBar;