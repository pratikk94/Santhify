import React from 'react';
import { useParams } from 'react-router-dom';

const GroupDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Fetch group ID from the route

  return (
    <div>
      <h1>Group Details</h1>
      <p>You are viewing details for Group {id}.</p>
    </div>
  );
};

export default GroupDetails;