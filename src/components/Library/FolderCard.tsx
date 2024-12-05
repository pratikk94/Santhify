import React from 'react';
import { MoreOutlined } from '@ant-design/icons';

interface FolderCardProps {
  folder: { id: number; name: string; icon: string };
}

const FolderCard: React.FC<FolderCardProps> = ({ folder }) => {
  return (
    <div className="folder-card">
      <div className="folder-icon">
        {/* Replace with actual icons */}
        <img src={`/icons/${folder.icon}.svg`} alt={`${folder.name} icon`} />
      </div>
      <div className="folder-name">{folder.name}</div>
      <MoreOutlined className="folder-menu-icon" />
    </div>
  );
};

export default FolderCard;