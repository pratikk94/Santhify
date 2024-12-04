import React, { useState } from 'react';
import { Tabs } from 'antd';

import './ClientTabs.css';
import UploadSection from '../UploadSection/UploadSection';
import ProfileTab from '../BasicInfo/Profile/Profile';
import Learning from '../Learning/Learning';

const { TabPane } = Tabs;

// Mock data for client uploads
const mockUploads = {
  PDFs: [
    { id: 1, name: 'Diabetes Chart.pdf' },
    { id: 2, name: 'Echo Test Report.pdf' },
    { id: 3, name: 'HBA1C.pdf' },
    { id: 4, name: 'Thyroid.pdf' },
    { id: 5, name: 'Haemoglobin.pdf' },
    { id: 6, name: 'Jane Cooper.pdf' },
  ],
  Videos: [
    { id: 7, name: 'Brooklyn Simmons.mp4' },
    { id: 8, name: 'Brooklyn Simmons.mp4' },
  ],
};

const ClientTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('3');

  return (
    <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
      <TabPane tab="Profile" key="1">
        <ProfileTab />
      </TabPane>
      <TabPane tab="Learning" key="2">
       <Learning/>
      </TabPane>
      <TabPane tab="Client Uploads" key="3">
        <UploadSection title="PDFs" items={mockUploads.PDFs} />
        <UploadSection title="Videos" items={mockUploads.Videos} />
      </TabPane>
    </Tabs>
  );
};

export default ClientTabs;