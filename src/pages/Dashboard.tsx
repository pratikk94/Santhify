import React, { useState } from 'react';
import '../styles/Dashboard.css';
import TopNav from '../components/TopNav/TopNav';
import OverviewHeader from '../components/OverviewHeader/OverviewHeader';
import StatsCards from '../components/StatsCard/StatsCard';
import FiltersBar from '../components/FiltersBar/FiltersBar';
import UserCardsGrid from '../components/UserCardGrid/UserCardGrid';
import mockUsers from '../data/mockUsers'; // Importing mock users

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState({
    countries: [],
    ageRange: [14, 37],
    dateRange: [null, null],
    dateAdded: null,
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleSortBy = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterApply = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleAddUser = () => {
    alert('Add User functionality coming soon!');
  };

  // Apply search, filters, and sort order to mock users
  const filteredUsers = mockUsers
    // Filter by search term
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    // Sort users by name
    .sort((a, b) =>
      sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  return (
    <div className="dashboard-layout">
      <TopNav />
      <div className="dashboard-main">
        <OverviewHeader />
        <StatsCards />
        <FiltersBar
          onSearch={handleSearch}
          onSortBy={handleSortBy}
          onFilterApply={handleFilterApply}
          onAddUser={handleAddUser}
          totalUsers={filteredUsers.length} // Pass filtered users count
        />
        <UserCardsGrid
          searchTerm={searchTerm}
          filters={filters}
          sortOrder={sortOrder}
        />
      </div>
    </div>
  );
};

export default Dashboard;