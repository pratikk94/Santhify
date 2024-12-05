import React, { useState } from 'react';
import Sidebar from '../components/Navigation/Sidebar/Sidebar';
import '../styles/dashboard.css';
import TopNav from '../components/Navigation/TopNav/TopNav';
import OverviewHeader from '../components/Navigation/OverviewHeader/OverviewHeader';
import StatsCards from '../components/Dashboard/StatsCard/StatsCard';
import UserCardsGrid from '../components/Dashboard/UserCardGrid/UserCardGrid';
import FiltersBar from '../components/Dashboard/FiltersBar/FiltersBar';
import mockUsers from '../data/mockUsers';
import dayjs, { Dayjs } from 'dayjs';

interface FilterCriteria {
  countries: string[];
  ageRange: [number, number];
  dateRange: [Dayjs | null, Dayjs | null];
  date_added: Dayjs | null;
}

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true); // Track sidebar state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<FilterCriteria>({
    countries: [],
    ageRange: [14, 37],
    dateRange: [null, null],
    date_added: null,
  });

  const [users] = useState(mockUsers);

  const handleSearch = (value: string) => setSearchTerm(value);
  const handleSortBy = () => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  const handleFilterApply = (newFilters: FilterCriteria) => setFilters(newFilters);

  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) =>
      sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  return (
    <div className="dashboard-layout">
      <Sidebar onCollapse={(isCollapsed) => setCollapsed(isCollapsed)} />
      <div className={`dashboard-main ${collapsed ? 'collapsed-sidebar' : ''}`}>
        <TopNav />
        <OverviewHeader />
        <StatsCards />
        <FiltersBar
          onSearch={handleSearch}
          onSortBy={handleSortBy}
          onFilterApply={handleFilterApply}
          totalUsers={filteredUsers.length}
        />
        <UserCardsGrid searchTerm={searchTerm} filters={filters} sortOrder={sortOrder} />
      </div>
    </div>
  );
};

export default Dashboard;