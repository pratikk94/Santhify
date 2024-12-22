// Base URL
const BASE_URL = "https://testapi.studentpro.vils.ai/santhify/api/v1/library";

// Folder API Endpoints
export const LibraryAPI = {
  CREATE_FOLDER: (folderName: string, parentFolderId: string = "ROOT") =>
    `${BASE_URL}/public/folder/${parentFolderId}/create?folder_name=${folderName}`,
  
  GET_FOLDERS: (folderId: string = "ROOT") =>
    `${BASE_URL}/public/folder/${folderId}`,
    
  DELETE_FOLDER: (folderId: string) =>
    `${BASE_URL}/public/folder/${folderId}/delete`,
    
  RENAME_FOLDER: (folderId: string) =>
    `${BASE_URL}/public/folder/${folderId}/rename`,
    
  MOVE_FOLDER: (folderId: string, targetFolderId: string) =>
    `${BASE_URL}/public/folder/${folderId}/move/${targetFolderId}`,

  // File Operations within Folders
  UPLOAD_FILE: (folderId: string = "ROOT") =>
    `${BASE_URL}/public/folder/${folderId}/upload`,
    
  DELETE_FILE: (folderId: string, fileId: string) =>
    `${BASE_URL}/public/folder/${folderId}/file/${fileId}/delete`,
    
  MOVE_FILE: (sourceFolder: string, fileId: string, targetFolder: string) =>
    `${BASE_URL}/public/folder/${sourceFolder}/file/${fileId}/move/${targetFolder}`,
    
  RENAME_FILE: (folderId: string, fileId: string) =>
    `${BASE_URL}/public/folder/${folderId}/file/${fileId}/rename`,
};