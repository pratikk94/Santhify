import React, { useState } from 'react';
import { Table, Tag, Button } from 'antd';
import '../styles/Payment.css';
import Sidebar from '../components/Navigation/Sidebar/Sidebar';

interface Payment {
  key: string;
  name: string;
  amount: string;
  date: string;
  status: 'Paid' | 'Pending' | 'Failed';
}

const Payments: React.FC = () => {
    const [payments] = useState<Payment[]>([
        { key: '1', name: 'Invoice #1234', amount: '$120.00', date: '2023-12-01', status: 'Paid' },
        { key: '2', name: 'Invoice #1235', amount: '$240.00', date: '2023-11-15', status: 'Pending' },
        { key: '3', name: 'Invoice #1236', amount: '$360.00', date: '2023-11-10', status: 'Failed' },
      ]);
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = '';
        if (status === 'Paid') color = 'green';
        else if (status === 'Pending') color = 'orange';
        else if (status === 'Failed') color = 'red';

        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const [collapsed, setCollapsed] = useState<boolean>(false); // State to track sidebar collapse


  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar
        
        onCollapse={(isCollapsed) => setCollapsed(isCollapsed)} // Handle collapse
      />

      {/* Main Content */}
      <div className={`dashboard-main ${collapsed ? 'collapsed-sidebar' : ''}`}>
      <div className="payments-page">
      <div className="payments-header">
        <h2>Payments</h2>
        <Button type="primary">Add Payment</Button>
      </div>

      <Table columns={columns} dataSource={payments} />
    </div>
      </div>
    </div>
    
  );
};

export default Payments;