import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Loader2 } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axios';
import { LibraryAPI } from './endpoints';
import { useLibrary } from './hooks/useLibrary';
import { readFileAsBase64, getFileType } from './utils';
import { ModalType, DragItem } from './types';
import { FolderItem } from './components/FolderItem';
import { FileItem } from './components/FileItem';
import { CreateFolderModal } from './components/CreateFolderModal';
import { UploadFileModal } from './components/UploadFileModal';
import { RenameModal } from './components/RenameModal';
import { PathBreadcrumb } from './components/PathBreadcrumb';
import { ActionDropdown } from './components/ActionDropdown';

const FileManager: React.FC = () => {
  const [path, setPath] = useState<string[]>(['Home']);
  const [currentFolder, setCurrentFolder] = useState<string>('ROOT');

  // For dropdown & modal
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [folderName, setFolderName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // For rename functionality
  const [itemToRename, setItemToRename] = useState<{
    id: string;
    name: string;
    type: 'file' | 'folder';
  } | null>(null);

  const { combinedData, isLoading, error, refetchAll } = useLibrary(currentFolder);

  // -- Navigation
  const handleGoBack = async () => {
    if (path.length > 1) {
      const newPath = path.slice(0, -1);
      setPath(newPath);
      const parentFolderId = newPath.length > 1 ? newPath[newPath.length - 1] : 'ROOT';
      setCurrentFolder(parentFolderId);
      await refetchAll();
    }
  };

  const handleFolderClick = async (folderId: string, folderName: string) => {
    setPath((prev) => [...prev, folderName]);
    setCurrentFolder(folderId);
    await refetchAll();
  };

  // -- Deletions (now implemented as status changes)
  const handleDeleteFolder = async (folderId: string) => {
    try {
      if (!window.confirm('Are you sure you want to delete this folder?')) return;
      const folder = combinedData.folders.find(f => f.id === folderId);
      if (!folder) return;
      await handleChangeStatus(folderId, 'folder', 'ARCHIVED', folder.isPublic || false, true);
      toast.success('Folder deleted successfully');
      await refetchAll();
    } catch (error) {
      console.error('Error deleting folder:', error);
      toast.error('Failed to delete folder. Please try again.');
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      if (!window.confirm('Are you sure you want to delete this file?')) return;
      const file = combinedData.files.find(f => f.id === fileId);
      if (!file) return;
      await handleChangeStatus(fileId, 'file', 'ARCHIVED', file.isPublic || false, true);
      toast.success('File deleted successfully');
      await refetchAll();
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Failed to delete file. Please try again.');
    }
  };

  // -- Create Folder
  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      toast.error('Please provide a folder name.');
      return;
    }
    try {
      const endpoint = isPublic ? 'public' : 'private';
      await axiosInstance.post(LibraryAPI.CREATE_FOLDER(endpoint, folderName, currentFolder));
      toast.success('Folder created successfully');
      await refetchAll();
      setFolderName('');
      setModalType(null);
    } catch (error) {
      console.error('Error creating folder:', error);
      toast.error('Failed to create folder. Please try again.');
    }
  };

  // -- Upload File
  const handleUploadFile = async () => {
    if (!selectedFile) {
      toast.error('Please choose a file first.');
      return;
    }
    try {
      const fileBase64 = await readFileAsBase64(selectedFile);
      const base64Data = fileBase64.split(',')[1];

      const body = {
        title: selectedFile.name,
        type: getFileType(selectedFile.type),
        data: base64Data,
      };

      const endpoint = isPublic ? 'public' : 'private';
      await axiosInstance.post(LibraryAPI.UPLOAD_FILE(endpoint, currentFolder), body);

      toast.success('File uploaded successfully');
      await refetchAll();
      setSelectedFile(null);
      setModalType(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file. Please try again.');
    }
  };

  // -- Rename functionality
  const handleRenameClick = (id: string, currentName: string, type: 'file' | 'folder') => {
    setItemToRename({ id, name: currentName, type });
    setModalType('rename');
  };

  const handleRename = async (newName: string) => {
    if (!itemToRename) return;

    try {
      const item = itemToRename.type === 'folder' 
        ? combinedData.folders.find(f => f.id === itemToRename.id)
        : combinedData.files.find(f => f.id === itemToRename.id);
      
      if (!item) return;

      const endpoint = item.isPublic ? 'public' : 'private';
      if (itemToRename.type === 'folder') {
        await axiosInstance.put(LibraryAPI.RENAME_FOLDER(endpoint, itemToRename.id, newName));
      } else {
        await axiosInstance.put(LibraryAPI.RENAME_FILE(endpoint, itemToRename.id, newName));
      }
      toast.success(`${itemToRename.type === 'folder' ? 'Folder' : 'File'} renamed successfully`);
      await refetchAll();
      setItemToRename(null);
      setModalType(null);
    } catch (error) {
      console.error('Error renaming item:', error);
      toast.error('Failed to rename item. Please try again.');
    }
  };

  // -- Change Status functionality
  const handleChangeStatus = async (
    id: string, 
    type: 'file' | 'folder', 
    newStatus: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED', 
    isPublic: boolean,
    silent: boolean = false
  ) => {
    try {
      const endpoint = isPublic ? 'public' : 'private';
      if (type === 'folder') {
        await axiosInstance.put(LibraryAPI.CHANGE_FOLDER_STATUS(endpoint, id, newStatus));
      } else {
        await axiosInstance.put(LibraryAPI.CHANGE_FILE_STATUS(endpoint, id, newStatus));
      }
      if (!silent) {
        toast.success(`${type === 'folder' ? 'Folder' : 'File'} status updated successfully`);
      }
      await refetchAll();
    } catch (error) {
      console.error('Error changing status:', error);
      if (!silent) {
        toast.error('Failed to change status. Please try again.');
      }
    }
  };

  // -- Drag and Drop functionality
  const handleDrop = async (item: DragItem, targetFolderId: string) => {
    try {
      const endpoint = item.isPublic ? 'public' : 'private';
      if (item.type === 'FILE') {
        await axiosInstance.put(LibraryAPI.MOVE_FILE(endpoint, item.id, targetFolderId));
      } else {
        await axiosInstance.put(LibraryAPI.MOVE_FOLDER(endpoint, item.id, targetFolderId));
      }
      toast.success(`${item.type === 'FILE' ? 'File' : 'Folder'} moved successfully`);
      await refetchAll();
    } catch (error) {
      console.error('Error moving item:', error);
      toast.error('Failed to move item. Please try again.');
    }
  };

  // Render loading / error states
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-gray-600">Loading contents...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h3 className="text-xl font-semibold text-red-600">Error loading contents</h3>
        <p className="text-gray-600">
          {error instanceof Error ? error.message : 'An unknown error occurred'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );

  return (
    <ErrorBoundary fallback={<div className="text-center p-4">Error in file manager</div>}>
      <DndProvider backend={HTML5Backend}>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <PathBreadcrumb
              path={path}
              onGoBack={handleGoBack}
              totalItems={combinedData.folders.length + combinedData.files.length}
            />
            <div className="flex items-center gap-6">
              <ActionDropdown
                isOpen={isDropdownOpen}
                onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
                onModalTypeSelect={setModalType}
              />
            </div>
          </div>

          {/* Folder and File list */}
          <div className="space-y-8">
            {/* Folders */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">Folders</h2>
              {combinedData.folders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {combinedData.folders.map((folder) => (
                    <FolderItem
                      key={folder.id}
                      folder={folder}
                      onFolderClick={handleFolderClick}
                      onDelete={handleDeleteFolder}
                      onRename={(id, name) => handleRenameClick(id, name, 'folder')}
                      onDrop={(item, targetFolderId) => handleDrop(item, targetFolderId)}
                      onChangeStatus={(id, newStatus) => handleChangeStatus(id, 'folder', newStatus, folder.isPublic || false)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No folders yet</h3>
                  <p className="text-gray-500">Create a new folder to organize your files</p>
                </div>
              )}
            </div>

            {/* Files */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">Files</h2>
              {combinedData.files.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {combinedData.files.map((file) => (
                    <FileItem
                      key={file.id}
                      file={file}
                      onDelete={handleDeleteFile}
                      onRename={(id, name) => handleRenameClick(id, name, 'file')}
                      onChangeStatus={(id, newStatus) => handleChangeStatus(id, 'file', newStatus, file.isPublic || false)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No files uploaded</h3>
                  <p className="text-gray-500">Upload files to start managing your content</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        <CreateFolderModal
          isOpen={modalType === 'folder'}
          onClose={() => setModalType(null)}
          folderName={folderName}
          setFolderName={setFolderName}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          onSubmit={handleCreateFolder}
        />

        <UploadFileModal
          isOpen={modalType === 'file'}
          onClose={() => setModalType(null)}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          onFileSelect={setSelectedFile}
          onSubmit={handleUploadFile}
        />

        {itemToRename && (
          <RenameModal
            isOpen={modalType === 'rename'}
            onClose={() => {
              setModalType(null);
              setItemToRename(null);
            }}
            currentName={itemToRename.name}
            itemType={itemToRename.type}
            onSubmit={(newName) => handleRename(newName)}
          />
        )}
      </DndProvider>
    </ErrorBoundary>
  );
};

export default FileManager;
