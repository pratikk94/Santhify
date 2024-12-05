import React from 'react';
import { MoreOutlined } from '@ant-design/icons';

interface FileCardProps {
  file: { id: number; name: string; icon: string };
}

const FileCard: React.FC<FileCardProps> = ({ file }) => {
  return (
    <div className="file-card">
      <div className="file-icon">
        {/* Replace with actual icons */}
        <img src={`/icons/${file.icon}.svg`} alt={`${file.name} icon`} />
      </div>
      <div className="file-name">{file.name}</div>
      <MoreOutlined className="file-menu-icon" />
    </div>
  );
};

export default FileCard;