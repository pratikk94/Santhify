
import React, { useState } from 'react';
import '../styles/dashboard.css';
import TopNav from '../components/Navigation/TopNav/TopNav';
import OverviewHeader from '../components/Navigation/OverviewHeader/OverviewHeader';
import StatsCards from '../components/Dashboard/StatsCard/StatsCard';

import UserCardsGrid from '../components/Dashboard/UserCardGrid/UserCardGrid';
import mockUsers from '../data/mockUsers'; // Importing mock users
import dayjs, { Dayjs } from 'dayjs';
import Sidebar from '../components/Navigation/Sidebar/Sidebar';
import FiltersBar from '../components/Dashboard/FiltersBar/FiltersBar';

interface FilterCriteria {
  countries: string[];
  ageRange: [number, number];
  dateRange: [Dayjs | null, Dayjs | null];
  date_added: Dayjs | null;
}

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<FilterCriteria>({
    countries: [],
    ageRange: [14, 37],
    dateRange: [null, null],
    date_added: null,
  });

  // Using mock data directly
  const [users] = useState(mockUsers);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleSortBy = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleFilterApply = (newFilters: FilterCriteria) => {
    setFilters(newFilters);
  };

  const handleAddUser = () => {
    alert('Add User functionality coming soon!');
  };

  // Apply search, filters, and sort order to users
  const filteredUsers = users
    // Search Filter
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    // Country Filter
    .filter((user) =>
      filters.countries.length ? filters.countries.includes(user.country) : true
    )
    // Age Range Filter
    .filter((user) => {
      if (!user.age) return true; // Skip if age is not available
      return user.age >= filters.ageRange[0] && user.age <= filters.ageRange[1];
    })
    // Date Range Filter
    .filter((user) => {
      if (filters.dateRange[0] && filters.dateRange[1]) {
        const userDate = dayjs(user.date_added, 'YYYY-MM-DD');
        return userDate.isBetween(filters.dateRange[0], filters.dateRange[1], 'day', '[]');
      }
      return true;
    })
    // Date Added Filter
    .filter((user) => {
      if (filters.date_added) {
        const userDate = dayjs(user.date_added, 'YYYY-MM-DD');
        return userDate.isSame(filters.date_added, 'day');
      }
      return true;
    })
    // Sort users by name
    .sort((a, b) =>
      sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  return (
    <div className="dashboard-layout">
      {/* Top Navigation */}
      <TopNav />
      <Sidebar />
      <div className="dashboard-main">
        {/* Overview Section */}
        <OverviewHeader />
        
        {/* Stats Section */}
        <StatsCards />
        
        {/* Filters Section */}
        <FiltersBar
          onSearch={handleSearch}
          onSortBy={handleSortBy}
          onFilterApply={handleFilterApply}
          onAddUser={handleAddUser}
          totalUsers={filteredUsers.length} // Pass filtered users count
        />
        
        {/* User Grid Section */}
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