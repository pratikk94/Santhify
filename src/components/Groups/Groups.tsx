import React, { useState } from 'react';
import { Modal, Input } from 'antd';
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
        <TopNav
          groupName="Diabetes Group"
          totalMembers={groups.length}
          onSearchClick={() => console.log('Search clicked')}
          onFilterClick={() => console.log('Filter clicked')}
          onSortClick={() => console.log('Sort clicked')}
          onAddClick={() => setIsModalVisible(true)}
        />

        {/* Groups Content */}
        <div className="groups-page">
          <UserGrid />

          {/* Add Group Modal */}
          <Modal
            title="Add New Group"
            open={isModalVisible}
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