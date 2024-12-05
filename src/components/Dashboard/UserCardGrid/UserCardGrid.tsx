import React, { useState } from 'react';
import { Pagination } from 'antd';
import './UserCardsGrid.css';
import UserCard from '../UserCard/UserCard';
import mockUsers from '../../../data/mockUsers';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

// Extend dayjs with required plugins
dayjs.extend(isBetween);

interface FilterCriteria {
  countries: string[];
  ageRange: [number, number];
  dateRange: [Dayjs | null, Dayjs | null];
  date_added: Dayjs | null;
}

interface UserCardsGridProps {
  searchTerm: string;
  filters: FilterCriteria;
  sortOrder: 'asc' | 'desc';
}

const UserCardsGrid: React.FC<UserCardsGridProps> = ({ searchTerm, filters, sortOrder }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const filteredUsers = mockUsers
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
      if (!user.age) return true;
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
    // Sort Users
    .sort((a, b) =>
      sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="user-cards-grid">
      {paginatedUsers.length > 0 ? (
        <>
          <div className="user-grid">
            {paginatedUsers.map((user) => (
              <div key={user.id} className="user-card-wrapper">
                <UserCard user={user} />
              </div>
            ))}
          </div>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredUsers.length}
            onChange={handlePageChange}
            className="pagination"
          />
        </>
      ) : (
        <div className="empty-state">No users match the current filters.</div>
      )}
    </div>
  );
};

export default UserCardsGrid;