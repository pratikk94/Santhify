import React, { useState } from 'react';
import { Row, Col, Pagination } from 'antd';

import '../UserCardGrid/UserCardsGrid.css';
import moment from 'moment';
import mockUsers from '../../data/mockUsers';
import UserCard from '../UserCard/UserCard';

interface FilterCriteria {
  countries: string[];
  ageRange: [number, number];
  dateRange: [moment.Moment | null, moment.Moment | null];
  dateAdded: moment.Moment | null;
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
    .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
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
        const userDate = moment(user.dateAdded, 'DD/MM/YYYY');
        return userDate.isBetween(filters.dateRange[0], filters.dateRange[1], undefined, '[]');
      }
      return true;
    })
    // Date Added Filter
    .filter((user) => {
      if (filters.dateAdded) {
        const userDate = moment(user.dateAdded, 'DD/MM/YYYY');
        return userDate.isSame(filters.dateAdded, 'day');
      }
      return true;
    })
    // Sort Users
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="user-cards-grid">
      <Row gutter={[16, 16]} justify="center">
        {paginatedUsers.map((user) => (
          <Col 
            key={user.id} 
            xs={24} 
            sm={12} 
            md={8} 
            lg={6} 
            xl={6} 
            xxl={6  } // Adjust columns for extra-large screens
          >
            <UserCard user={user} />
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredUsers.length}
        onChange={handlePageChange}
        style={{ marginTop: '16px', textAlign: 'center', display: 'flex', justifyContent: 'center' }}
      />
    </div>  
  );
};

export default UserCardsGrid;