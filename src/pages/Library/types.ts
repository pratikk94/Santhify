export interface User {
  id: string;
  firstname: string;
  lastname: string;
}

export type ItemStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export interface Folder {
  id: string;
  name: string;
  created_by: User;
  created_at: string;
  status: ItemStatus;
  isPublic?: boolean;
}

export interface FileItem {
  id: string;
  name: string;
  url: string;
  type: 'AUDIO' | 'VIDEO' | 'DOCUMENT';
  created_by: User;
  created_at: string;
  status: ItemStatus;
  isPublic?: boolean;
}

export interface LibraryResponse {
  status: string;
  message: string;
  data: {
    folders: Folder[];
    files: FileItem[];
  };
}

export type ModalType = 'folder' | 'file' | 'rename' | null;

export type FileType = 'AUDIO' | 'VIDEO' | 'IMAGE' | 'WORD_DOCUMENT' | 'TEXT' | 'PDF' | 'PPT';

export interface DragItem {
  type: 'FILE' | 'FOLDER';
  id: string;
  name: string;
  isPublic: boolean;
}

export interface DropResult {
  targetId: string;
  targetType: 'FOLDER';
}