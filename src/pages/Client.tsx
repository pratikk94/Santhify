import React from 'react';

import '../styles/client.css';
import OverviewHeader from '../components/Navigation/OverviewHeader/OverviewHeader';
import BasicInfo from '../components/Client/BasicInfo/BasicInfo';
import ClientTabs from '../components/Client/ClientTabs/ClientTabs';

const Client: React.FC = () => {
  return (
    <div className="client-main">
      <div className="client-header">
        <OverviewHeader />
        <BasicInfo />
      </div>
      <div className="client-content">
        <ClientTabs />
      </div>
    </div>
  );
};

export default Client;