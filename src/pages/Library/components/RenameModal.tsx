import React, { useState, useEffect } from 'react';

interface RenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  itemType: 'file' | 'folder';
  onSubmit: (newName: string) => void;
}

export const RenameModal: React.FC<RenameModalProps> = ({
  isOpen,
  onClose,
  currentName,
  itemType,
  onSubmit,
}) => {
  const [newName, setNewName] = useState(currentName);

  useEffect(() => {
    setNewName(currentName);
  }, [currentName]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (newName.trim() && newName !== currentName) {
      onSubmit(newName.trim());
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">
          Rename {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
        </h2>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          New Name
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            disabled={!newName.trim() || newName === currentName}
          >
            Rename
          </button>
        </div>
      </div>
    </div>
  );
}; 