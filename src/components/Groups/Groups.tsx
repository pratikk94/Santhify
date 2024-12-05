import React, { useState } from 'react';
import { Button, Card, List, Modal, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../Groups/Groups.css';
import Sidebar from '../Navigation/Sidebar/Sidebar';
import TopNav from '../Groups/TopNav/TopNav';
import UserGrid from './UserGrid/UserGrid';
const Groups: React.FC = () => {
  const [groups, setGroups] = useState<string[]>(['Team Alpha', 'Beta Squad', 'Project Gamma']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [collapsed, setCollapsed] = useState(false); // Track sidebar state

  const handleAddGroup = () => {
    if (newGroupName) {
      setGroups([...groups, newGroupName]);
      setNewGroupName('');
      setIsModalVisible(false);
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar onCollapse={(isCollapsed) => setCollapsed(isCollapsed)} />

      {/* Main Content */}
      <div className={`dashboard-main ${collapsed ? 'collapsed-sidebar' : ''}`}>
        {/* Top Navigation */}
        <TopNav />

        {/* Groups Content */}
        <div className="groups-page">
          <div className="groups-header">
            <h2>Groups</h2>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => setIsModalVisible(true)}
            >
              Add Group
            </Button>
          </div>

          <UserGrid/>

          {/* Add Group Modal */}
          <Modal
            title="Add New Group"
            visible={isModalVisible}
            onOk={handleAddGroup}
            onCancel={() => setIsModalVisible(false)}
            okText="Add"
          >
            <Input
              placeholder="Enter group name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Groups;