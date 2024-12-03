import React from 'react';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard';
import 'antd/dist/reset.css';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Content style={{ margin: '24px', background: '#f4f4f4', padding: '24px', minHeight: '100vh' }}>
          <Dashboard />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;