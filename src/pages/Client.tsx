import React from 'react';

import '../styles/client.css'; // Updated CSS file for the client
import Sidebar from '../components/Navigation/Sidebar/Sidebar';

import OverviewHeader from '../components/Navigation/OverviewHeader/OverviewHeader';
import BasicInfo from '../components/Client/BasicInfo/BasicInfo';
import ClientTabs from '../components/Client/ClientTabs/ClientTabs';
import TopNav from '../components/Client/TopNav/TopNav';

const Client: React.FC = () => {
  return (
    <div className="client-layout">
      <Sidebar />
      <div className="client-main">
        <TopNav />
        <div className="client-header">
          <OverviewHeader />
          <BasicInfo />
        </div>
        <div className="client-content">
          <ClientTabs />
        </div>
      </div>
    </div>
  );
};

export default Client;