import React, { useState, useEffect } from 'react';
import { Modal, Input, List, Checkbox, Button } from 'antd';
import './AddGroupModal.css';

interface Group {
  id: number;
  name: string;
  isChecked: boolean;
}

interface AddGroupModalProps {
  isVisible: boolean;
  onClose: () => void;
  userName: string;
}

const AddGroupModal: React.FC<AddGroupModalProps> = ({ isVisible, onClose, userName }) => {
  const [groups, setGroups] = useState<Group[]>([
    { id: 1, name: 'Gain Checks', isChecked: true },
    { id: 2, name: 'Onboarding', isChecked: false },
    { id: 3, name: 'Fitness Goals', isChecked: false },
    { id: 4, name: 'Diet Tracking', isChecked: true },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGroups, setFilteredGroups] = useState<Group[]>(groups);

  // Update filtered groups with debouncing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilteredGroups(
        groups.filter((group) =>
          group.name.toLowerCase().includes(searchTerm)
        )
      );
    }, 300); // 300ms debounce delay
    return () => clearTimeout(timeout); // Cleanup previous timeout
  }, [searchTerm, groups]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleCheckboxChange = (id: number) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === id ? { ...group, isChecked: !group.isChecked } : group
      )
    );
  };

  const handleSave = () => {
    const selectedGroups = groups.filter((group) => group.isChecked);
    console.log('Selected Groups:', selectedGroups);
    onClose();
  };

  return (
    <Modal
      title={`Add ${userName} to`}
      open={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
      className="add-group-modal"
    >
      <Input
        placeholder="Search for group"
        onChange={handleSearch}
        value={searchTerm}
        className="search-input"
        allowClear
      />
      <List
        dataSource={filteredGroups}
        renderItem={(group) => (
          <List.Item>
            <Checkbox
              checked={group.isChecked}
              onChange={() => handleCheckboxChange(group.id)}
            >
              {group.name}
            </Checkbox>
          </List.Item>
        )}
        locale={{ emptyText: 'No groups found' }}
      />
    </Modal>
  );
};

export default AddGroupModal;