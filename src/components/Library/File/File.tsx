import React from 'react';
import { useDrag } from 'react-dnd';
import './File.css';
import { FileOutlined } from '@ant-design/icons'; // Using Ant Design's FileOutlined icon

interface FileProps {
  file: {
    id: string;
    name: string;
    color: string;
  };
}

const File: React.FC<FileProps> = ({ file }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'file',
    item: { id: file.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`file ${isDragging ? 'dragging' : ''}`}
    >
      <div
        className="file-icon"
        style={{ backgroundColor: file.color }}
      >
        <FileOutlined className="file-svg-icon" />
      </div>
      <span className="file-name">{file.name}</span>
    </div>
  );
};

export default File;