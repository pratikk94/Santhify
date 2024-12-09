import React, { useState } from 'react';
import { Dayjs } from 'dayjs';
import Sidebar from '../../Navigation/Sidebar/Sidebar';
import TopNav from '../../Groups/TopNav/TopNav';
import FiltersBar from '../../Dashboard/FiltersBar/FiltersBar';
import UserCardsGrid from '../../Dashboard/UserCardGrid/UserCardGrid';
import mockUsers from '../../../data/mockUsers';

interface FilterCriteria {
  countries: string[];
  ageRange: [number, number];
  dateRange: [Dayjs | null, Dayjs | null];
  date_added: Dayjs | null;
}

interface User {
  id: number;
  name: string;
  country?: string;
  age?: number;
  date_added: string;
}

const MyGroups: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<FilterCriteria>({
    countries: [],
    ageRange: [14, 37],
    dateRange: [null, null],
    date_added: null,
  });

  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleSearch = (value: string) => setSearchTerm(value);
  const handleSortBy = () => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  const handleFilterApply = (newFilters: FilterCriteria) => setFilters(newFilters);

  const handleAddUser = (newUser: Partial<User>) => {
    if (!newUser.name) {
      throw new Error("User name is required."); // Ensure the name is provided
    }
  
    const userWithDate: User = {
      ...newUser,
      date_added: new Date().toISOString(), // Add the current date
      id: users.length + 1, // Generate a unique ID
      name: newUser.name, // Ensure name is explicitly defined
    };
  
    setUsers((prevUsers) => [userWithDate, ...prevUsers]);
    console.log('New user added:', userWithDate);
  };
  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) =>
      sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  return (
    <div className="MyGroups-layout">
      <Sidebar onCollapse={(isCollapsed) => setCollapsed(isCollapsed)} />
      <div className={`MyGroups-main ${collapsed ? 'collapsed-sidebar' : ''}`}>
        <TopNav
          groupName="Diabetes Group"
          totalMembers={users.length}
          onSearchClick={() => console.log('Search clicked')}
          onFilterClick={() => console.log('Filter clicked')}
          onSortClick={() => console.log('Sort clicked')}
          onAddClick={() => console.log('Add clicked')}
        />
        <FiltersBar
          onSearch={handleSearch}
          onSortBy={handleSortBy}
          onFilterApply={handleFilterApply}
          onAddUser={handleAddUser} // Pass the updated function
          totalUsers={filteredUsers.length}
        />
        <UserCardsGrid searchTerm={searchTerm} filters={filters} sortOrder={sortOrder} />
      </div>
    </div>
  );
};

export default MyGroups;