import React, { useState } from 'react';
import { Modal, Input, List, Checkbox, Button } from 'antd';
import '../AddClientModal/AddClientModal.css';

interface User {
  id: number;
  name: string;
  avatar?: string; // Optional avatar URL
}

interface AssignClientModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (selectedUsers: User[]) => void;
}

const AssignClientModal: React.FC<AssignClientModalProps> = ({
  visible,
  onCancel,
  onSave,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const userList: User[] = [
    { id: 1, name: 'Abhishek Sudhakar', avatar: 'https://via.placeholder.com/40' },
    { id: 2, name: 'Preethi Sundar' },
    { id: 3, name: 'Vatsav Varma', avatar: 'https://via.placeholder.com/40' },
    { id: 4, name: 'Kanna Vidya V' },
  ];

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Toggle user selection
  const handleToggleUser = (user: User) => {
    setSelectedUsers((prev) =>
      prev.some((selected) => selected.id === user.id)
        ? prev.filter((selected) => selected.id !== user.id)
        : [...prev, user]
    );
  };

  // Save selected users
  const handleSave = () => {
    onSave(selectedUsers);
    onCancel(); // Close the modal after saving
  };

  // Filter users based on search term
  const filteredUsers = userList.filter((user) =>
    user.name.toLowerCase().includes(searchTerm)
  );

  return (
    <Modal
      title="Assign client to"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      {/* Search Input */}
      <Input
        placeholder="Search for user"
        value={searchTerm}
        onChange={handleSearch}
        allowClear
        style={{ marginBottom: 16 }}
      />

      {/* User List */}
      <List
        dataSource={filteredUsers}
        locale={{ emptyText: 'No users found' }} // Display message when no matches
        renderItem={(user) => (
          <List.Item>
            <Checkbox
              checked={selectedUsers.some((selected) => selected.id === user.id)}
              onChange={() => handleToggleUser(user)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* {user.avatar && <Avatar src={user.avatar} />} */}
                {user.name}
              </div>
            </Checkbox>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default AssignClientModal;