import React, { useState } from 'react';
import './UserProfile.css';
import { Tabs, Avatar } from 'antd';
import Sidebar from '../../Navigation/Sidebar/Sidebar';
import TopNav from '../../../components/Dashboard/UserProfile/TopNav/TopNav';
import Profile from '../../Client/BasicInfo/Profile/Profile';
import ClientUploads from './ClientUploads/ClientUploads';
import Payment from './Payment/Payment';
import Learning from '../../Client/Learning/Learning';
import AssignClientModal from '../Modal/AddClientModal/AddClientModal';
import AddGroupModal from '../Modal/AddGroupModal/AddGroupModal';

const { TabPane } = Tabs;

interface UserProfileProps {
  userId: string; // Assuming user ID is passed as a prop
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
  const [isAssignClientModalVisible, setIsAssignClientModalVisible] = useState(false);

  const user = {
    id: userId,
    name: 'Abhishek Sudhakar',
    profilePicture: '',
    stats: {
      totalFiles: 15,
      recentUploads: 5,
    },
    uploads: [
      { id: 1, name: 'Afternoon lunch image', dateAdded: '11/11/2024', type: 'image' },
      { id: 2, name: 'Calisthenics document', dateAdded: '11/11/2024', type: 'pdf' },
      { id: 3, name: 'Workout video plan', dateAdded: '11/11/2024', type: 'video' },
      { id: 4, name: 'Dinner lunch image', dateAdded: '11/11/2024', type: 'image' },
      { id: 5, name: 'Diet chat voice note', dateAdded: '11/11/2024', type: 'audio' },
    ],
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar onCollapse={(isCollapsed) => setCollapsed(isCollapsed)} />

      {/* Main Content */}
      <div className={`dashboard-main ${collapsed ? 'collapsed-sidebar' : ''}`}>
        {/* Top Navigation */}
        <TopNav
          onGroupsClick={() => setIsGroupModalVisible(true)}
          onAddUserClick={() => setIsAssignClientModalVisible(true)}
        />

        {/* User Profile Header */}
        <div className="user-profile-container">
          <div className="user-header">
            <Avatar size={64} style={{ backgroundColor: '#635CF4', color: '#fff' }}>
              {user.name[0]}
            </Avatar>
            <div className="user-info">
              <h2 className="user-name">{user.name}</h2>
              <p className="user-stats">
                {user.stats.totalFiles} Total Files | {user.stats.recentUploads} Recent Uploads
              </p>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultActiveKey="1" className="user-tabs">
            <TabPane tab="Profile" key="1">
              <Profile />
            </TabPane>
            <TabPane tab="Learning" key="2">
              <Learning />
            </TabPane>
            <TabPane tab="Client Uploads" key="3">
              <ClientUploads />
            </TabPane>
            <TabPane tab="Payments" key="4">
              <Payment />
            </TabPane>
          </Tabs>
        </div>
      </div>

      {/* Add Group Modal */}
      <AddGroupModal
        isVisible={isGroupModalVisible}
        onClose={() => setIsGroupModalVisible(false)}
        userName={user.name}
      />

      {/* Assign Client Modal */}
      <AssignClientModal
        visible={isAssignClientModalVisible}
        onCancel={() => setIsAssignClientModalVisible(false)}
        onSave={(selectedUsers) => {
          console.log('Selected Users:', selectedUsers);
          setIsAssignClientModalVisible(false);
        }}
      />
    </div>
  );
};

export default UserProfile;