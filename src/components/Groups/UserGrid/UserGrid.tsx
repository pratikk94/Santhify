import React from 'react';

import './UserGrid.css';
import UserCard from '../UserCard/UserCard';

const mockUsers = [
  { id: 1, name: 'Abhishek Sudhakar VS', initials: 'A', color: '#5F9EA0' },
  { id: 2, name: 'Bhavana S', initials: 'B', color: '#F5A623' },
  { id: 3, name: 'Catherine Rose R', initials: 'C', color: '#00BCD4' },
  { id: 4, name: 'Dinesh S', initials: 'D', color: '#9C27B0' },
  { id: 5, name: 'Elango Karthikeyan S', initials: 'E', color: '#009688' },
  { id: 6, name: 'Karthikeyan M', initials: 'K', color: '#FF4081' },
  { id: 7, name: 'Naveen Krishnan K', initials: 'N', color: '#FFC107' },
  { id: 8, name: 'Preethi Sundar', initials: 'P', color: '#FF5722' },
  { id: 9, name: 'Raghavan S', initials: 'R', color: '#795548' },
  { id: 10, name: 'Manisha K', initials: 'M', color: '#FF9800' },
];

const UserGrid: React.FC = () => {
  const handleProfileClick = (userName: string) => {
    console.log(`Profile clicked for ${userName}`);
  };

  const handleContactClick = (userName: string) => {
    console.log(`Contact clicked for ${userName}`);
  };

  return (
    <div className="user-grid">
      {mockUsers.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onProfileClick={() => handleProfileClick(user.name)}
          onContactClick={() => handleContactClick(user.name)}
        />
      ))}
    </div>
  );
};

export default UserGrid;