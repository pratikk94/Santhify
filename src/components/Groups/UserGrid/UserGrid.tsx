import React, { useState } from 'react';
import { Pagination } from 'antd';
import './UserGrid.css';
import UserCard from '../UserCard/UserCard';
import { useNavigate } from 'react-router-dom';

const mockUsers = [
  { id: 1, name: 'Abhishek Sudhakar VS', initials: 'A', color: '#5F9EA0' ,dateAdded:"12/02/2024"},
  { id: 2, name: 'Bhavana S', initials: 'B', color: '#F5A623' ,dateAdded:"12/02/2024"},
  { id: 3, name: 'Catherine Rose R', initials: 'C', color: '#00BCD4' ,dateAdded:"12/02/2024"},
  { id: 4, name: 'Dinesh S', initials: 'D', color: '#9C27B0' ,dateAdded:"12/02/2024"},
  { id: 5, name: 'Elango Karthikeyan S', initials: 'E', color: '#009688' ,dateAdded:"12/02/2024"},
  { id: 6, name: 'Karthikeyan M', initials: 'K', color: '#FF4081' ,dateAdded:"12/02/2024"},
  { id: 7, name: 'Naveen Krishnan K', initials: 'N', color: '#FFC107' ,dateAdded:"12/02/2024"},
  { id: 8, name: 'Preethi Sundar', initials: 'P', color: '#FF5722' ,dateAdded:"12/02/2024"},
  { id: 9, name: 'Raghavan S', initials: 'R', color: '#795548' ,dateAdded:"12/02/2024"},
  { id: 10, name: 'Manisha K', initials: 'M', color: '#FF9800' ,dateAdded:"12/02/2024"},
  { id: 11, name: 'Shivani R', initials: 'S', color: '#4CAF50' ,dateAdded:"12/02/2024"},
  { id: 12, name: 'Ramesh V', initials: 'R', color: '#F44336' ,dateAdded:"12/02/2024"},
  { id: 13, name: 'Anjali T', initials: 'A', color: '#9C27B0',dateAdded:"12/02/2024" },
  { id: 14, name: 'Gopal P', initials: 'G', color: '#FFC107' ,dateAdded:"12/02/2024"},
  { id: 15, name: 'Meena K', initials: 'M', color: '#795548' ,dateAdded:"12/02/2024"},
];

const UserGrid: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Paginate the users
  const paginatedUsers = mockUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleNavigateToProfile = (userId: number) => {
    navigate(`/profile/${userId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="user-grid-container">
      <div className="user-grid">
        {paginatedUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onProfileClick={() => handleNavigateToProfile(user.id)}
            onContactClick={() => console.log(`Contact clicked for ${user.name}`)}
          />
        ))}
      </div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={mockUsers.length}
        onChange={handlePageChange}
        className="user-grid-pagination"
      />
    </div>
  );
};

export default UserGrid;