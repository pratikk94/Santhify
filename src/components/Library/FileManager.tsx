import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios, { AxiosError } from 'axios';
import TopNav from './TopNav/TopNav';
import Sidebar from '../Navigation/Sidebar/Sidebar';
import { LibraryAPI } from '../../utiils/LibraryAPI';
import './FileManager.css';
import { ErrorBoundary } from 'react-error-boundary';

interface User {
  id: string;
  firstname: string;
  lastname: string;
}

interface Folder {
  id: string;
  name: string;
  created_by: User;
  created_at: string;
  status: 'ACTIVE' | 'INACTIVE';
}

interface FileItem {
  id: string;
  name: string;
  url: string;
  type: 'AUDIO' | 'VIDEO' | 'DOCUMENT';
  created_by: User;
  created_at: string;
  status: 'ACTIVE' | 'INACTIVE';
}

interface LibraryResponse {
  status: string;
  message: string;
  data: {
    folders: Folder[];
    files: FileItem[];
  };
}

const TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE0YjEzMzNmLTA3NWUtNGY0Zi05MzFlLTVhZmI0OTRhOTgwZCIsImV4cCI6MTczNDg3MjQzMCwib3JnYW5pemF0aW9uX2lkIjoiMzA0MjAwOGYtMjU0OS00ZDQ2LTlhYmQtZDU1YjBkMDAzOWQ3IiwiY2xpZW50IjoiV1JJVEUiLCJncm91cCI6IldSSVRFIiwibGlicmFyeSI6IldSSVRFIiwicGF5bWVudCI6IkRFTlkiLCJhY2NvdW50IjoiV1JJVEUiLCJpc19hZG1pbiI6dHJ1ZX0.M6J-PYDX9Udd6oBXt5SHLsixWWodKLaNc7ZVg0lY4d1KIQnEagL8p3oKdpxBkEeCwU8YSoY-PbBY1pUK5hh-wQ';

const FileManager: React.FC = () => {
  const [path, setPath] = useState<string[]>(['Home']);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [currentFolder, setCurrentFolder] = useState<string>('ROOT');

  const { data: libraryData, isLoading, error, refetch } = useQuery<LibraryResponse>({
    queryKey: ['folder-contents', currentFolder],
    queryFn: async () => {
      const makeRequest = async (retryCount = 0) => {
        try {
          const response = await axios.get<LibraryResponse>(
            LibraryAPI.GET_FOLDERS(currentFolder),
            {
              headers: {
                'Authorization': `Bearer ${TOKEN}`
              }
            }
          );
          return response.data;
        } catch (error: unknown) {
          const err = error as AxiosError;
          if (err.response?.status === 429 && retryCount < 3) {
            const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
            await new Promise(resolve => setTimeout(resolve, delay));
            return makeRequest(retryCount + 1);
          }
          if (err.response?.status === 401) {
            throw new Error('Unauthorized access. Please check your credentials.');
          }
          throw err;
        }
      };
      return makeRequest();
    },
    retry: false, // Disable default retry behavior
    refetchOnWindowFocus: false, // Prevent refetch on window focus
    staleTime: 30000 // Consider data fresh for 30 secon
  });

  const handleGoBack = () => {
    if (path.length > 1) {
      const newPath = path.slice(0, -1);
      setPath(newPath);
      // Get the ID of the parent folder or default to ROOT
      const parentFolderId = newPath.length > 1 ? newPath[newPath.length - 1] : 'ROOT';
      setCurrentFolder(parentFolderId);
    }
  };

  const handleFolderClick = async (folderId: string, folderName: string) => {
    setPath(prev => [...prev, folderName]);
    setCurrentFolder(folderId);
  };

  const handleDeleteFolder = async (folderId: string) => {
    try {
      if (!window.confirm('Are you sure you want to delete this folder?')) return;

      await axios.delete(
        LibraryAPI.DELETE_FOLDER(folderId),
        {
          headers: {
            'Authorization': `Bearer ${TOKEN}`
          }
        }
      );
      refetch();
    } catch (error) {
      console.error('Error deleting folder:', error);
      alert('Failed to delete folder. Please try again.');
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      if (!window.confirm('Are you sure you want to delete this file?')) return;

      await axios.delete(
        LibraryAPI.DELETE_FILE(currentFolder, fileId),
        {
          headers: {
            'Authorization': `Bearer ${TOKEN}`
          }
        }
      );
      refetch();
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete file. Please try again.');
    }
  };

  if (isLoading) return (
    <div className="loading-container">
      <div className="loading-spinner" />
      <p>Loading contents...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <h3>Error loading contents</h3>
      <p>{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
      <button onClick={() => refetch()}>Retry</button>
    </div>
  );

  return (
    <div className="dashboard-layout">
      <Sidebar onCollapse={(isCollapsed) => setCollapsed(isCollapsed)} />
      <div className={`dashboard-main ${collapsed ? 'collapsed-sidebar' : ''}`}>
        <TopNav 
          path={path} 
          onGoBack={handleGoBack}
          onRefresh={refetch}
        />
        <ErrorBoundary fallback={<div>Error in file manager</div>}>
          <DndProvider backend={HTML5Backend}>
            <div className="file-manager">
              <div className="file-manager-header">
                <p>{(libraryData?.data?.folders?.length || 0) + (libraryData?.data?.files?.length || 0)} items</p>
              </div>
              <div className="file-sections">
                <div className="section">
                  <h2>Folders</h2>
                  <div className="folders-grid">
                    {libraryData?.data.folders.map((folder) => (
                      <div 
                        key={folder.id} 
                        className="folder-card"
                        onClick={() => handleFolderClick(folder.id, folder.name)}
                        style={{ cursor: 'pointer' }}
                      >
                        <h3>{folder.name}</h3>
                        <p>Created by: {folder.created_by.firstname} {folder.created_by.lastname}</p>
                        <p>Created at: {new Date(folder.created_at).toLocaleDateString()}</p>
                        <button onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFolder(folder.id);
                        }}>Delete</button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="section">
                  <h2>Files</h2>
                  <div className="files-grid">
                    {libraryData?.data.files.map((file: FileItem) => (
                      <div key={file.id} className="file-card">
                        <h3>{file.name}</h3>
                        <p>Type: {file.type}</p>
                        <p>Created by: {file.created_by.firstname} {file.created_by.lastname}</p>
                        <p>Created at: {new Date(file.created_at).toLocaleDateString()}</p>
                        <button onClick={() => handleDeleteFile(file.id)}>Delete</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DndProvider>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default FileManager;