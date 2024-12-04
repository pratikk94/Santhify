import React from 'react';
import { Row, Col, Card } from 'antd';
import './UploadSection.css';

interface UploadSectionProps {
  title: string;
  items: { id: number; name: string }[];
}

const UploadSection: React.FC<UploadSectionProps> = ({ title, items }) => {
  return (
    <div className="upload-section">
      <h3>{title}</h3>
      <Row gutter={[16, 16]}>
        {items.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
            <Card className="upload-card">
              <div className="upload-icon">
                {title === 'PDFs' ? (
                  <img src="https://via.placeholder.com/48" alt="PDF" />
                ) : (
                  <img src="https://via.placeholder.com/48" alt="Video" />
                )}
              </div>
              <div className="upload-name">{item.name}</div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UploadSection;