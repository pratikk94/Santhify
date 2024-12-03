import React, { useState } from 'react';
import { Input, Button, Space, Typography } from 'antd';
import { SearchOutlined, SortAscendingOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import FilterModal from '../FiltersModal/FiltersModal';
import '../FiltersBar/FiltersBar.css';

const { Text } = Typography;

interface FiltersBarProps {
  onSearch: (value: string) => void;
  onSortBy: () => void;
  onFilterApply: (filters: any) => void;
  onAddUser: () => void;
  totalUsers: number; // Number of users to display
}

const FiltersBar: React.FC<FiltersBarProps> = ({
  onSearch,
  onSortBy,
  onFilterApply,
  onAddUser,
  totalUsers,
}) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterOpen = () => {
    setIsFilterModalOpen(true);
  };

  const handleFilterClose = () => {
    setIsFilterModalOpen(false);
  };

  const handleFilterApply = (filters: any) => {
    onFilterApply(filters);
    setIsFilterModalOpen(false);
  };

  return (
    <div className="filters-bar">
      <div className="filters-bar-left">
        {/* Number of Users Label */}
        <Text strong className="user-count-label">Showing {totalUsers} Users</Text>
      </div>
      <div className="filters-bar-right">
        <Space wrap>
          {/* Search Input */}
          <Input
            placeholder="Search for user"
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          {/* Sort By Button */}
          <Button icon={<SortAscendingOutlined />} onClick={onSortBy}>
            Sort By
          </Button>
          {/* Filters Button */}
          <Button icon={<FilterOutlined />} onClick={handleFilterOpen}>
            Filters
          </Button>
          {/* Add User Button */}
          <Button icon={<PlusOutlined />} onClick={onAddUser}>
            Add User
          </Button>
        </Space>
      </div>
      {/* Filter Modal */}
      <FilterModal
        visible={isFilterModalOpen}
        onClose={handleFilterClose}
        onApply={handleFilterApply}
      />
    </div>
  );
};

export default FiltersBar;