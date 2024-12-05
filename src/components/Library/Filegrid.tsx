import React from 'react';
import FileCard from './FileCard';
import FolderCard from './FolderCard';

interface FileGridProps {
  type: 'recent' | 'folder' | 'file'; // Define the type options
}

const FileGrid: React.FC<FileGridProps> = ({ type }) => {
  const items = [
    { id: 1, name: 'File 1', type: 'file', icon: 'pdf' },
    { id: 2, name: 'Folder 1', type: 'folder', icon: 'folder' },
    { id: 3, name: 'File 2', type: 'file', icon: 'doc' },
    { id: 4, name: 'Folder 2', type: 'folder', icon: 'folder' },
  ];

  // Filter items based on the `type` prop
  const filteredItems =
    type === 'recent'
      ? items // Show all items for recent
      : items.filter((item) => item.type === type);

  return (
    <div className="file-grid">
      {filteredItems.map((item) =>
        item.type === 'file' ? (
          <FileCard key={item.id} file={item} />
        ) : (
          <FolderCard key={item.id} folder={item} />
        )
      )}
    </div>
  );
};

export default FileGrid;