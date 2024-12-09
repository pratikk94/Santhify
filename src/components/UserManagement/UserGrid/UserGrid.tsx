import React, { useState } from 'react';
import { Pagination } from 'antd';

import './UserGrid.css';
import UserCard from '../UserCard/UserCard';

const mockUsers = [
  { id: 1, name: 'Abhishek Sudhakar VS', roles: ['Admin', 'Data Export'], initials: 'A', color: '#5F9EA0' },
  { id: 2, name: 'Bhavana S', roles: ['Admin', 'Data Export'], initials: 'B', color: '#F5A623' },
  { id: 3, name: 'Catherine Rose R', roles: ['Admin', 'Data Export'], initials: 'C', color: '#00BCD4' },
  { id: 4, name: 'Dinesh S', roles: ['Admin', 'Data Export'], initials: 'D', color: '#9C27B0' },
  { id: 5, name: 'Elango Karthikeyan S', roles: ['Admin', 'Data Export'], initials: 'E', color: '#009688' },
  { id: 6, name: 'Karthikeyan M', roles: ['Admin', 'Data Export'], initials: 'K', color: '#FF4081' },
  { id: 7, name: 'Naveen Krishnan K', roles: ['Admin', 'Data Export'], initials: 'N', color: '#FFC107' },
  { id: 8, name: 'Preethi Sundar', roles: ['Admin', 'Data Export'], initials: 'P', color: '#FF5722' },
  { id: 9, name: 'Raghavan S', roles: ['Admin', 'Data Export'], initials: 'R', color: '#795548' },
  { id: 10, name: 'Manisha K', roles: ['Admin', 'Data Export'], initials: 'M', color: '#FF9800' },
];

const UserGrid: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const paginatedUsers = mockUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="user-grid-container">
      <header className="user-grid-header">
        <h1>User Management</h1>
        <p>Manage your team members and their accounts permissions here</p>
        <div className="user-grid-toolbar">
          <button className="toolbar-button">Search for user</button>
          <button className="toolbar-button">Filters</button>
          <button className="toolbar-button">Add</button>
        </div>
      </header>

      <div className="user-grid">
        {paginatedUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={mockUsers.length}
        onChange={(page) => setCurrentPage(page)}
        className="user-grid-pagination"
      />
    </div>
  );
};

export default UserGrid;