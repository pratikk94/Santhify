import React, { useState } from 'react';
import { Input, Button, Space, Typography } from 'antd';
import { SearchOutlined, SortAscendingOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import '../FiltersBar/FiltersBar.css';
import FilterModal from '../FiltersModal/FiltersModal';
import AddNewUserModal from '../AddNewUser/AddNewUserModal';

const { Text } = Typography;

interface FiltersBarProps {
  onSearch: (value: string) => void;
  onSortBy: () => void;
  onFilterApply: (filters: any) => void;
  onAddUser: (user: any) => void; // Callback for handling added user
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
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
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

  const handleAddUserOpen = () => {
    setIsAddUserModalOpen(true);
  };

  const handleAddUserClose = () => {
    setIsAddUserModalOpen(false);
  };

  const handleAddUserSubmit = (formData: any) => {
    onAddUser(formData); // Pass the form data back to the parent
    setIsAddUserModalOpen(false); // Close the modal
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
          <Button icon={<PlusOutlined />} onClick={handleAddUserOpen}>
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
      {/* Add User Modal */}
      <AddNewUserModal
        isVisible={isAddUserModalOpen}
        onClose={handleAddUserClose}
        onNext={handleAddUserSubmit}
      />
    </div>
  );
};

export default FiltersBar;