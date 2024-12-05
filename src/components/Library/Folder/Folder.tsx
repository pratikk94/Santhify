import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './Folder.css';
import { FolderFilled, MoreOutlined } from '@ant-design/icons';

interface FolderProps {
  folder: {
    id: string;
    name: string;
    icon?: JSX.Element; // Optional custom icon
  };
  onDrop: (itemId: string) => void; // For handling drag-and-drop
  onClick: () => void; // For opening a modal or triggering an action on folder click
  isHighlighted?: boolean; // For highlighting when an item is dragged over
}

const Folder: React.FC<FolderProps> = ({ folder, onDrop, onClick, isHighlighted }) => {
  const [, drop] = useDrop({
    accept: 'file',
    drop: (item: { id: string }) => {
      onDrop(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'folder',
    item: { id: folder.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`folder ${isHighlighted ? 'highlighted' : ''} ${isDragging ? 'dragging' : ''}`}
      onClick={onClick}
    >
      <div className="folder-content">
        <div className="folder-icon">
          {folder.icon || <FolderFilled style={{ color: '#635CF4', fontSize: '24px' }} />} {/* Default to Ant Design's FolderFilled */}
        </div>
        <span className="folder-name">{folder.name}</span>
      </div>
      <MoreOutlined className="folder-options" />
    </div>
  );
};

export default Folder;