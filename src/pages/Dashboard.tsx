import React, { useState } from 'react';
import '../styles/dashboard.css';
import StatsCards from '../components/Dashboard/StatsCard/StatsCard';
import UserCardsGrid from '../components/Dashboard/UserCardGrid/UserCardGrid';
import FiltersBar from '../components/Dashboard/FiltersBar/FiltersBar';
import mockUsers from '../data/mockUsers';
import { Dayjs } from 'dayjs';

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


  const handleSearch = (value: string) => setSearchTerm(value);
  const handleSortBy = () => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  const handleFilterApply = (newFilters: FilterCriteria) => setFilters(newFilters);
  const [users, setUsers] = useState(mockUsers);
  const handleAddUser = (newUser: any) => {
    setUsers((prevUsers) => [newUser, ...prevUsers]);
    console.log('New user added:', newUser);
  };
  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) =>
      sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  return (
    <>
      <StatsCards />
      <FiltersBar
        onSearch={handleSearch}
        onSortBy={handleSortBy}
        onFilterApply={handleFilterApply}
        onAddUser={handleAddUser} // Added this prop
        totalUsers={filteredUsers.length}
      />
      <UserCardsGrid searchTerm={searchTerm} filters={filters} sortOrder={sortOrder} />
    </>

  );
};

export default Dashboard;