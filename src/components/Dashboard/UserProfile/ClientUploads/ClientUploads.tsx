import React from 'react';
import { Table, Button, Avatar, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import './ClientUploads.css';

interface UploadItem {
  id: number;
  name: string;
  type: 'image' | 'pdf' | 'video' | 'audio' | 'text';
  dateAdded: string;
}

const uploads: UploadItem[] = [
  { id: 1, name: 'Afternoon lunch image', type: 'image', dateAdded: '11/11/2024' },
  { id: 2, name: 'Calisthenics document', type: 'pdf', dateAdded: '11/11/2024' },
  { id: 3, name: 'Workout video plan', type: 'video', dateAdded: '11/11/2024' },
  { id: 4, name: 'Dinner lunch image', type: 'image', dateAdded: '11/11/2024' },
  { id: 5, name: 'Abhishek Sudhakar diet chat voice note', type: 'audio', dateAdded: '11/11/2024' },
  { id: 6, name: 'Comments Added by client', type: 'text', dateAdded: '11/11/2024' },
];

const renderFileIcon = (type: string) => {
  switch (type) {
    case 'image':
      return <Avatar style={{ backgroundColor: '#D8D5FE', color: '#635CF4' }}>📷</Avatar>;
    case 'pdf':
      return <Avatar style={{ backgroundColor: '#C4F2E3', color: '#635CF4' }}>📄</Avatar>;
    case 'video':
      return <Avatar style={{ backgroundColor: '#DAD9FF', color: '#635CF4' }}>🎥</Avatar>;
    case 'audio':
      return <Avatar style={{ backgroundColor: '#FFDADA', color: '#635CF4' }}>🎙</Avatar>;
    default:
      return <Avatar style={{ backgroundColor: '#FFF4D2', color: '#635CF4' }}>📝</Avatar>;
  }
};

const ClientUploads: React.FC = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: UploadItem) => (
        <div className="upload-item">
          {renderFileIcon(record.type)}
          <span className="upload-name">{text}</span>
        </div>
      ),
    },
    {
      title: 'Date Added',
      dataIndex: 'dateAdded',
      key: 'dateAdded',
      align: 'center',
      render: (text: string) => <span className="upload-date">{text}</span>,
    },
    {
      title: '',
      key: 'actions',
      align: 'right',
      render: (_: any, record: UploadItem) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="remove">
                <Button type="link" danger>
                  Remove from List
                </Button>
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button shape="circle" icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="client-uploads-container">
      <Table
        dataSource={uploads}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="client-uploads-table"
      />
    </div>
  );
};

export default ClientUploads;