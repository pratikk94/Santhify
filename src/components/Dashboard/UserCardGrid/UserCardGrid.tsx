import React, { useState, useEffect, useRef } from 'react';
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
  const [itemsPerRow, setItemsPerRow] = useState(8); // Default to 8 elements per row
  const gridRef = useRef<HTMLDivElement>(null);

  // Dynamically calculate the number of items per row
  useEffect(() => {
    const calculateItemsPerRow = () => {
      if (gridRef.current) {
        const gridWidth = gridRef.current.offsetWidth;
        const cardWidth = 280; // Width of a single card
        const items = Math.floor(gridWidth / cardWidth); // Calculate number of items per row
        setItemsPerRow(items || 1); // Fallback to at least 1 if calculation fails
      }
    };

    calculateItemsPerRow(); // Calculate on load
    window.addEventListener('resize', calculateItemsPerRow); // Recalculate on resize

    return () => {
      window.removeEventListener('resize', calculateItemsPerRow); // Clean up event listener
    };
  }, []);

  // Total items to display per page
  const pageSize = itemsPerRow * 2;

  // Filter users based on search term, filters, and sorting
  const filteredUsers = mockUsers
    // Search Filter
    .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
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
    <div className="user-cards-grid">
      {filteredUsers.length > 0 ? (
        <>
          <div className="user-grid" ref={gridRef}>
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