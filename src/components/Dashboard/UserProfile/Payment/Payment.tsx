import React from 'react';
import { Table, Button, Dropdown, Menu, Badge } from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import './Payment.css';

interface Payment {
  id: number;
  transactionId: string;
  type: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  accountData: { logo: string; lastDigits: string };
  transactionDate: string;
  amount: string;
}

const payments: Payment[] = [
  {
    id: 1,
    transactionId: '1234567890',
    type: 'Sale',
    status: 'Approved',
    accountData: { logo: 'rupay', lastDigits: '5943' },
    transactionDate: 'Nov 4, 2024',
    amount: '₹ 2499.00',
  },
  {
    id: 2,
    transactionId: '1234567890',
    type: 'Sale',
    status: 'Approved',
    accountData: { logo: 'rupay', lastDigits: '5943' },
    transactionDate: 'Nov 4, 2024',
    amount: '₹ 2499.00',
  },
  {
    id: 3,
    transactionId: '1234567890',
    type: 'Sale',
    status: 'Approved',
    accountData: { logo: 'rupay', lastDigits: '5943' },
    transactionDate: 'Nov 4, 2024',
    amount: '₹ 2499.00',
  },
  {
    id: 4,
    transactionId: '1234567890',
    type: 'Sale',
    status: 'Approved',
    accountData: { logo: 'visa', lastDigits: '5943' },
    transactionDate: 'Nov 4, 2024',
    amount: '₹ 2499.00',
  },
];

const Payment: React.FC = () => {
  const renderLogo = (logo: string) => {
    switch (logo) {
      case 'rupay':
        return <img src="https://via.placeholder.com/50x20?text=RuPay" alt="RuPay" />;
      case 'visa':
        return <img src="https://via.placeholder.com/50x20?text=VISA" alt="Visa" />;
      default:
        return <img src="https://via.placeholder.com/50x20?text=Logo" alt="Logo" />;
    }
  };

  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge
          status={
            status === 'Approved'
              ? 'success'
              : status === 'Pending'
              ? 'warning'
              : 'error'
          }
          text={status}
        />
      ),
    },
    {
      title: 'Account Data',
      dataIndex: 'accountData',
      key: 'accountData',
      render: (account: { logo: string; lastDigits: string }) => (
        <div className="account-data">
          {renderLogo(account.logo)}
          <span>•••• {account.lastDigits}</span>
        </div>
      ),
    },
    {
      title: 'Transaction Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right' as const,
    },
    {
      title: '',
      key: 'actions',
      align: 'right' as const,
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">
                <Button type="link" danger>
                  Delete
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
    <div className="payment-container">
      <div className="payment-header">
        <h2>Payments List</h2>
        <div className="payment-actions">
          <Button type="default" icon={<PlusOutlined />}>
            Add existing payment
          </Button>
          <Button type="primary" icon={<PlusOutlined />}>
            Create new payment
          </Button>
        </div>
      </div>
      <Table
        dataSource={payments}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="payment-table"
      />
    </div>
  );
};

export default Payment;