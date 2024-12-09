import React from 'react';

import './UserGrid.css';
import UserCard from '../UserCard/UserCard';
import { useNavigate } from 'react-router-dom';

const mockUsers = [
  { id: 1, name: 'Abhishek Sudhakar VS', initials: 'A', color: '#5F9EA0', peopleCount: 10 },
  { id: 2, name: 'Bhavana S', initials: 'B', color: '#F5A623', peopleCount: 12 },
  { id: 3, name: 'Catherine Rose R', initials: 'C', color: '#00BCD4', peopleCount: 8 },
  { id: 4, name: 'Dinesh S', initials: 'D', color: '#9C27B0', peopleCount: 15 },
  { id: 5, name: 'Elango Karthikeyan S', initials: 'E', color: '#009688', peopleCount: 20 },
  { id: 6, name: 'Karthikeyan M', initials: 'K', color: '#FF4081', peopleCount: 18 },
  { id: 7, name: 'Naveen Krishnan K', initials: 'N', color: '#FFC107', peopleCount: 25 },
  { id: 8, name: 'Preethi Sundar', initials: 'P', color: '#FF5722', peopleCount: 30 },
  { id: 9, name: 'Raghavan S', initials: 'R', color: '#795548', peopleCount: 5 },
  { id: 10, name: 'Manisha K', initials: 'M', color: '#FF9800', peopleCount: 40 },
];
const UserGrid: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleNavigateToGroup = (userId: number) => {
    navigate(`/groups/${userId}`); // Navigate to MyGroup.tsx with the user's ID
  };

  // const handleContactClick = (userName: string) => {
  //   console.log(`Contact clicked for ${userName}`);
  // };

  return (
    <div className="g-user-grid">
      {mockUsers.map((user) => (
        <UserCard
        key={user.id}
        user={user}
        onProfileClick={() => handleNavigateToGroup(user.id)} // Navigate on profile click
        onContactClick={() => console.log(`Contact clicked for ${user.name}`)}
      />
      ))}
    </div>
  );
};

export default UserGrid;