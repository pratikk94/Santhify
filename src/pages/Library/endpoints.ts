const BASE_URL = "https://testapi.studentpro.vils.ai/santhify/api/v1/library";

export const LibraryAPI = {
  // Folder Operations
  CREATE_FOLDER: (endpoint: "public" | "private", folderName: string, parentFolderId: string = "ROOT") =>
    `${BASE_URL}/${endpoint}/folder/create?folder_name=${folderName}&parent_folder_id=${parentFolderId}`,
  
  GET_FOLDERS: (endpoint: "public" | "private", folderId: string = "ROOT") =>
    `${BASE_URL}/${endpoint}/folder/${folderId}`,
    
  RENAME_FOLDER: (endpoint: "public" | "private", folderId: string, newName: string) =>
    `${BASE_URL}/${endpoint}/folder/${folderId}/rename?new_name=${newName}`,
    
  CHANGE_FOLDER_STATUS: (endpoint: "public" | "private", folderId: string, newStatus: "ACTIVE" | "INACTIVE" | "ARCHIVED") =>
    `${BASE_URL}/${endpoint}/folder/${folderId}/change-status?new_status=${newStatus}`,
    
  MOVE_FOLDER: (endpoint: "public" | "private", folderId: string, newFolderId: string) =>
    `${BASE_URL}/${endpoint}/folder/${folderId}/move-folder?new_folder_id=${newFolderId}`,

  // File Operations
  UPLOAD_FILE: (endpoint: "public" | "private", parentFolderId: string = "ROOT") =>
    `${BASE_URL}/${endpoint}/file/upload?parent_folder_id=${parentFolderId}`,

  RENAME_FILE: (endpoint: "public" | "private", fileId: string, newName: string) =>
    `${BASE_URL}/${endpoint}/file/${fileId}/rename?new_name=${newName}`,

  CHANGE_FILE_STATUS: (endpoint: "public" | "private", fileId: string, newStatus: "ACTIVE" | "INACTIVE" | "ARCHIVED") =>
    `${BASE_URL}/${endpoint}/file/${fileId}/change-status?new_status=${newStatus}`,

  MOVE_FILE: (endpoint: "public" | "private", fileId: string, newFolderId: string) =>
    `${BASE_URL}/${endpoint}/file/${fileId}/move-file?new_folder_id=${newFolderId}`,
};
