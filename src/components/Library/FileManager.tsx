import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from '../Navigation/Sidebar/Sidebar';
import TopNav from './TopNav/TopNav';
import Folder from './Folder/Folder';
import File from './File/File';
import '../Library/styles/FileManager.css';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  parentId?: string | null;
  color: string;
}

const initialData: FileItem[] = [
  { id: '1', name: '2020 Planning', type: 'folder', color: '#635CF4', parentId: null },
  { id: '2', name: 'Finances', type: 'folder', color: '#635CF4', parentId: null },
  { id: '3', name: 'Work Files', type: 'folder', color: '#635CF4', parentId: null },
  { id: '4', name: 'Jane Cooper.pdf', type: 'file', color: '#C4F2E3', parentId: null },
  { id: '5', name: 'Brooklyn Simmons.mp4', type: 'file', color: '#DAD9FF', parentId: null },
];

const FileManager: React.FC = () => {
  const [items, setItems] = useState<FileItem[]>(initialData);
  const [path, setPath] = useState<string[]>(['Home']);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [highlightedFolder, setHighlightedFolder] = useState<string | null>(null);

  const enterFolder = (folderId: string, folderName: string) => {
    setCurrentFolderId(folderId);
    setPath((prev) => [...prev, folderName]);
  };

  const goBack = () => {
    if (path.length > 1) {
      setPath((prev) => prev.slice(0, -1));
      const parentFolderId = items.find((item) => item.id === currentFolderId)?.parentId;
      setCurrentFolderId(parentFolderId || null);
    }
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
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <TopNav path={path} onGoBack={goBack} />
        <DndProvider backend={HTML5Backend}>
          <div className="file-manager">
            <div className="file-manager-header">
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
      </div>
    </div>
  );
};

export default FileManager;