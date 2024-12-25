import React, { useState, useRef } from 'react';
import { Pagination } from 'antd';
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

const UserCardsGrid: React.FC<UserCardsGridProps> = ({
  searchTerm,
  filters,
  sortOrder,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // Fixed 12 items per page
  const gridRef = useRef<HTMLDivElement>(null);

  // Filter users based on search term, filters, and sorting
  const filteredUsers = mockUsers
    .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((user) =>
      filters.countries.length ? filters.countries.includes(user.country) : true
    )
    .filter((user) => {
      if (!user.age) return true;
      return user.age >= filters.ageRange[0] && user.age <= filters.ageRange[1];
    })
    .filter((user) => {
      if (filters.dateRange[0] && filters.dateRange[1]) {
        const userDate = dayjs(user.date_added, 'YYYY-MM-DD');
        return userDate.isBetween(filters.dateRange[0], filters.dateRange[1], 'day', '[]');
      }
      return true;
    })
    .filter((user) => {
      if (filters.date_added) {
        const userDate = dayjs(user.date_added, 'YYYY-MM-DD');
        return userDate.isSame(filters.date_added, 'day');
      }
      return true;
    })
    .sort((a, b) =>
      sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  // Paginate users
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full p-6">
      {filteredUsers.length > 0 ? (
        <>
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedUsers.map((user) => (
              <div key={user.id} className="w-full">
                <UserCard user={user} />
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredUsers.length}
              onChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
          No users match the current filters.
        </div>
      )}
    </div>
  );
};

export default UserCardsGrid;