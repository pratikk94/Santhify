import React, { useState, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LibraryAPI } from "../../../../utiils/LibraryAPI";
import './AddFolderModal.css';

// Rate limiting queue handler
const queue: Array<() => Promise<unknown>> = [];
let isProcessing = false;

const processQueue = async () => {
  if (isProcessing || queue.length === 0) return;
  isProcessing = true;
  
  while (queue.length > 0) {
    const request = queue.shift();
    if (request) {
      try {
        await request();
        // Wait 1 second between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Queue processing error:', error);
      }
    }
  }
  
  isProcessing = false;
};

interface AddFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSuccess: () => void;
}

const TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE0YjEzMzNmLTA3NWUtNGY0Zi05MzFlLTVhZmI0OTRhOTgwZCIsImV4cCI6MTczNDg3MjQzMCwib3JnYW5pemF0aW9uX2lkIjoiMzA0MjAwOGYtMjU0OS00ZDQ2LTlhYmQtZDU1YjBkMDAzOWQ3IiwiY2xpZW50IjoiV1JJVEUiLCJncm91cCI6IldSSVRFIiwibGlicmFyeSI6IldSSVRFIiwicGF5bWVudCI6IkRFTlkiLCJhY2NvdW50IjoiV1JJVEUiLCJpc19hZG1pbiI6dHJ1ZX0.M6J-PYDX9Udd6oBXt5SHLsixWWodKLaNc7ZVg0lY4d1KIQnEagL8p3oKdpxBkEeCwU8YSoY-PbBY1pUK5hh-wQ';

const AddFolderModal: React.FC<AddFolderModalProps> = ({
  isOpen,
  onClose,
  onCreateSuccess,
}) => {
  const [folderName, setFolderName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch folders from ROOT
  const { refetch } = useQuery({
    queryKey: ['folders'],
    queryFn: async () => {
      const response = await axios.get(LibraryAPI.GET_FOLDERS('ROOT'), {
        headers: {
          'Authorization': `Bearer ${TOKEN}`
        }
      });
      return response.data;
    }
  });

  const createFolderMutation = useMutation({
    mutationFn: async (newFolderName: string) => {
      const makeRequest = async () => {
        const response = await axios.post(
          LibraryAPI.CREATE_FOLDER(newFolderName),
          { parent_folder_id: "ROOT" },
          {
            headers: {
              'Authorization': `Bearer ${TOKEN}`,
              'Content-Type': 'application/json'
            }
          }
        );
        return response.data;
      };

      return new Promise((resolve, reject) => {
        queue.push(async () => {
          try {
            const result = await makeRequest();
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
        processQueue();
      });
    },
    onSuccess: () => {
      alert("Folder created successfully!");
      refetch();
      onCreateSuccess();
      setFolderName("");
      onClose();
    },
    onError: (error) => {
      console.error('Error creating folder:', error);
      alert("Failed to create folder. Please try again.");
    }
  });

  const uploadFileMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        `${LibraryAPI.UPLOAD_FILE()}?parent_folder_id=ROOT`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
            console.log(`Upload Progress: ${percentCompleted}%`);
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      alert("File uploaded successfully!");
      refetch();
      onCreateSuccess();
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    onError: (error) => {
      console.error('Error uploading file:', error);
      alert("Failed to upload file. Please try again.");
    }
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['audio/*', 'video/*', 'application/pdf'];
      if (!allowedTypes.some(type => file.type.match(type))) {
        alert('Please upload only audio, video, or PDF files');
        return;
      }
      
      const maxSize = 100 * 1024 * 1024; // 100MB in bytes
      if (file.size > maxSize) {
        alert('File size should not exceed 100MB');
        return;
      }

      uploadFileMutation.mutate(file);
    }
  };

  const handleCreate = () => {
    if (folderName.trim()) {
      createFolderMutation.mutate(folderName);
    } else {
      alert("Folder name cannot be empty!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>New Folder or File</h2>
        
        {/* Folder Creation Section */}
        <div className="section">
          <h3>Create Folder</h3>
          <input
            type="text"
            placeholder="Untitled folder"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="folder-input"
          />
          <button onClick={handleCreate} className="create-button">
            {createFolderMutation.status === "pending" ? "Creating..." : "Create Folder"}
          </button>
        </div>

        {/* File Upload Section */}
        <div className="section">
          <h3>Upload File</h3>
          <p className="file-instructions">
            Supported formats: Audio, Video, PDF<br/>
            Maximum size: 100MB
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="audio/*,video/*,application/pdf"
            style={{ display: 'none' }}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="upload-button"
            disabled={uploadFileMutation.status === "pending"}
          >
            {uploadFileMutation.status === "pending" 
              ? "Uploading..." 
              : "Choose File"}
          </button>
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFolderModal;