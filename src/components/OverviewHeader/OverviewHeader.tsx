import React from 'react';
import { Typography } from 'antd';
import '../OverviewHeader/OverviewHeader.css';

const { Title, Text } = Typography;

const OverviewHeader: React.FC = () => {
  return (
    <div className="overview-header">
      <Title level={2}>Overview</Title>
      <Text>Manage your team members and their accounts permissions here</Text>
    </div>
  );
};

export default OverviewHeader;