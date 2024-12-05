import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import './StatsCards.css';

const { Title, Text } = Typography;

const StatsCards: React.FC = () => {
  return (
    <div className="stats-cards">
      <Row gutter={[16, 16]} justify="center">
        {/* Total Clients */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Card bordered className="stat-card">
            <div className="stat-content">
              <div className="stat-section">
                <Title level={4} className="stat-title">Total Clients</Title>
                <Text className="stat-number">453</Text>
              </div>
              <div className="stat-section">
                <Title level={4} className="stat-title">Last 30 Days</Title>
                <Text className="stat-small-number">32</Text>
              </div>
            </div>
          </Card>
        </Col>

        {/* Total Assessments */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Card bordered className="stat-card">
            <div className="stat-content">
              <div className="stat-section">
                <Title level={4} className="stat-title">Total Assessments</Title>
                <Text className="stat-number">3</Text>
              </div>
              <div className="stat-section">
                <Title level={4} className="stat-title">Last 30 Days</Title>
                <Text className="stat-small-number">32</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatsCards;