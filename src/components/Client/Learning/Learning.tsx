import React, { useState } from 'react';
import { Table, Dropdown, Menu, Button, Modal } from 'antd';
import { MoreOutlined, FileOutlined, CameraOutlined, VideoCameraOutlined, PlusOutlined, UploadOutlined, BookOutlined } from '@ant-design/icons';
import './Learning.css';

interface LearningItem {
  id: number;
  name: string;
  dateAdded: string;
  iconType: 'file' | 'camera' | 'video';
}

const mockData: LearningItem[] = [
  { id: 1, name: 'Josephine Langford Activity Plan', dateAdded: '11/11/2024', iconType: 'camera' },
  { id: 2, name: 'Josephine Langford Mind Reprogramming Plan', dateAdded: '11/11/2024', iconType: 'file' },
  { id: 3, name: 'Josephine Langford Diet Plan', dateAdded: '11/11/2024', iconType: 'video' },
  { id: 4, name: 'Josephine Langford Plan', dateAdded: '11/11/2024', iconType: 'camera' },
  { id: 5, name: 'Josephine Langford', dateAdded: '11/11/2024', iconType: 'file' },
  { id: 6, name: 'Josephine Langford', dateAdded: '11/11/2024', iconType: 'file' },
];

const Learning: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const menu = (
    <Menu>
      <Menu.Item key="1">Remove from List</Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: LearningItem) => (
        <div className="learning-item">
          <span className="icon">
            {record.iconType === 'file' && <FileOutlined />}
            {record.iconType === 'camera' && <CameraOutlined />}
            {record.iconType === 'video' && <VideoCameraOutlined />}
          </span>
          {text}
        </div>
      ),
    },
    {
      title: 'Date Added',
      dataIndex: 'dateAdded',
      key: 'dateAdded',
    },
    {
      title: '',
      key: 'action',
      render: () => (
        <Dropdown overlay={menu} trigger={['click']}>
          <MoreOutlined className="action-icon" />
        </Dropdown>
      ),
    },
  ];

  const handleAddLearning = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="learning-container">
      <div className="learning-header">
        <h3>Learning Resources</h3>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddLearning}
          className="add-button"
        >
          Add
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={mockData}
        rowKey="id"
        pagination={false}
        className="learning-table"
      />

      {/* Upload Modal */}
      <Modal
        title="Upload Image"
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        className="upload-modal"
      >
        <div className="upload-container">
          <div className="upload-option">
            <div className="upload-icon">
              <BookOutlined />
            </div>
            <div className="upload-text">Add from Library</div>
          </div>
          <div className="upload-option">
            <div className="upload-icon">
              <UploadOutlined />
            </div>
            <div className="upload-text">
              Upload <br />
              <span className="upload-note">Supports jpg, png, maximum size of 2mb</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Learning;