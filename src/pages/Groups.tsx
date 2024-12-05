
import React, { useState } from 'react';
import { Button, Card, List, Modal, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../styles/groups.css';

const Groups: React.FC = () => {
  const [groups, setGroups] = useState<string[]>(['Team Alpha', 'Beta Squad', 'Project Gamma']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const handleAddGroup = () => {
    if (newGroupName) {
      setGroups([...groups, newGroupName]);
      setNewGroupName('');
      setIsModalVisible(false);
    }
  };

  return (
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

      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={groups}
        renderItem={(group) => (
          <List.Item>
            <Card title={group} className="group-card">
              Members: {Math.floor(Math.random() * 10) + 1} {/* Mock member count */}
            </Card>
          </List.Item>
        )}
      />

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
  );
};

export default Groups;