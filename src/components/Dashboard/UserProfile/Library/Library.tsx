import React, { useState } from 'react';
import { Modal, Button, Breadcrumb } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Folder from '../../../Library/Folder/Folder'; // Ensure the correct path to Folder component
import File from '../../../Library/File/File'; // Ensure the correct path to File component

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  parentId?: string | null;
  color: string;
}

interface LibraryModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const initialData: FileItem[] = [
  { id: '1', name: '2020 Planning', type: 'folder', color: '#635CF4', parentId: null },
  { id: '2', name: 'Finances', type: 'folder', color: '#635CF4', parentId: null },
  { id: '3', name: 'Work Files', type: 'folder', color: '#635CF4', parentId: null },
  { id: '4', name: 'Jane Cooper.pdf', type: 'file', color: '#C4F2E3', parentId: null },
  { id: '5', name: 'Brooklyn Simmons.mp4', type: 'file', color: '#DAD9FF', parentId: null },
  { id: '6', name: 'Project Docs', type: 'folder', color: '#FFDDC1', parentId: '1' }, // Nested folder
  { id: '7', name: 'Q1 Budget.xlsx', type: 'file', color: '#C2F5E9', parentId: '1' },
];

const LibraryModal: React.FC<LibraryModalProps> = ({ isVisible, onClose }) => {
  const [items, setItems] = useState<FileItem[]>(initialData);
  const [path, setPath] = useState<string[]>(['Home']);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [highlightedFolder, setHighlightedFolder] = useState<string | null>(null);

  const enterFolder = (folderId: string, folderName: string) => {
    setCurrentFolderId(folderId);
    setPath((prev) => [...prev, folderName]);
  };

  const moveToPath = (index: number) => {
    if (index === 0) {
      setCurrentFolderId(null); // Go to Home
    } else {
      const targetFolderName = path[index];
      const targetFolder = items.find(
        (item) => item.name === targetFolderName && item.type === 'folder'
      );
      setCurrentFolderId(targetFolder?.id || null);
    }
    setPath((prev) => prev.slice(0, index + 1)); // Trim path up to the clicked item
  };

  const moveItem = (itemId: string, targetFolderId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, parentId: targetFolderId } : item
      )
    );
    setHighlightedFolder(targetFolderId); // Highlight the folder
    setTimeout(() => setHighlightedFolder(null), 2000); // Remove highlight after 2 seconds
  };

  const files = items.filter((item) => item.type === 'file' && item.parentId === currentFolderId);
  const folders = items.filter((item) => item.type === 'folder' && item.parentId === currentFolderId);

  return (
    <Modal
      title="Library"
      open={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
      width={'70vw'} // Larger width
      style={{
        top: 20, // Adjust top position if needed
        height: '90vh', // Adjust height
        overflow: 'hidden',
      }}
      bodyStyle={{
        maxHeight: 'calc(90vh - 55px)', // Prevent overflow in the body
        overflowY: 'auto',
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <div className="file-manager">
          <div className="file-manager-header">
            <Breadcrumb>
              {path.map((name, index) => (
                <Breadcrumb.Item key={index}>
                  <Button
                    type="link"
                    onClick={() => moveToPath(index)}
                    style={{ padding: 0, margin: 0 }}
                  >
                    {name}
                  </Button>
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
            <p>{items.length} items</p>
          </div>
          <div className="file-sections">
            <div className="section">
              <h3>Folders</h3>
              <div className="folder-grid">
                {folders.length > 0 ? (
                  folders.map((folder) => (
                    <Folder
                      key={folder.id}
                      folder={folder}
                      onDrop={(itemId) => moveItem(itemId, folder.id)}
                      isHighlighted={highlightedFolder === folder.id}
                      onClick={() => enterFolder(folder.id, folder.name)}
                    />
                  ))
                ) : (
                  <div className="empty-message">No folders found.</div>
                )}
              </div>
            </div>
            <div className="section">
              <h3>Files</h3>
              <div className="file-grid">
                {files.length > 0 ? (
                  files.map((file) => <File key={file.id} file={file} />)
                ) : (
                  <div className="empty-message">No files found.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DndProvider>
    </Modal>
  );
};

export default LibraryModal;