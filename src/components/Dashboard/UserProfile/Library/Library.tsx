import React, { useState } from 'react';
import { Modal, Button, Breadcrumb } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
          <div className="flex flex-col gap-6 p-6">
            {/* Title and Path Section */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-gray-800">My Library</h1>
              
              {/* Custom Breadcrumb */}
              <div className="flex items-center gap-2 text-sm">
                {path.map((name, index) => (
                  <div key={index} className="flex items-center">
                    {index > 0 && (
                      <span className="mx-2 text-gray-400">/</span>
                    )}
                    <button
                      onClick={() => moveToPath(index)}
                      className={`hover:text-blue-600 transition-colors ${
                        index === path.length - 1 
                          ? 'text-gray-600 font-medium'
                          : 'text-gray-400'
                      }`}
                    >
                      {name}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                  Folders
                </h2>
                {/* <div className="folder-grid">
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
                    <div className="text-gray-500 italic">No folders found.</div>
                  )}
                </div> */}
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                  Files
                </h2>
                {/* <div className="file-grid">
                  {files.length > 0 ? (
                    files.map((file) => <File key={file.id} file={file} />)
                  ) : (
                    <div className="text-gray-500 italic">No files found.</div>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </DndProvider>
    </Modal>
  );
};

export default LibraryModal;