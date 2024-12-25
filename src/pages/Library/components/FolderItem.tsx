import React, { useState, useRef, useEffect } from 'react';
import { Folder as FolderIcon, Globe, Lock, Trash2, Edit, Archive } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';
import { Folder, DragItem, ItemStatus } from '../types';

interface FolderItemProps {
  folder: Folder;
  onFolderClick: (id: string, name: string) => void;
  onDelete?: (id: string) => void;
  onRename?: (id: string, currentName: string) => void;
  onDrop?: (item: DragItem, targetId: string) => void;
  onChangeStatus?: (id: string, newStatus: ItemStatus) => void;
}

export const FolderItem: React.FC<FolderItemProps> = ({
  folder,
  onFolderClick,
  onDelete,
  onRename,
  onDrop,
  onChangeStatus,
}) => {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: {
      type: 'FOLDER',
      id: folder.id,
      name: folder.name,
      isPublic: folder.isPublic,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'ITEM',
    drop: (item: DragItem) => {
      if (item.id !== folder.id && onDrop && folder.status !== 'ARCHIVED') {
        onDrop(item, folder.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const dragDropRef = (el: HTMLDivElement) => {
    drag(el);
    drop(el);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (folder.status !== 'ARCHIVED') {
      onFolderClick(folder.id, folder.name);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (folder.status !== 'ARCHIVED') {
      setContextMenu({ x: e.clientX, y: e.clientY });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        setContextMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div
      ref={dragDropRef}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      className={`group p-5 border rounded-xl hover:shadow-lg transition-all duration-200 ${
        folder.isPublic ? 'bg-green-50/70 border-green-200' : 'bg-yellow-50/70 border-yellow-200'
      } ${isDragging ? 'opacity-50 scale-95' : ''} ${isOver ? 'border-blue-500 border-2' : ''} ${
        folder.status === 'ARCHIVED' ? 'opacity-50 grayscale' : ''
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${folder.isPublic ? 'bg-green-100' : 'bg-yellow-100'}`}>
              <FolderIcon
                className={`w-6 h-6 ${folder.isPublic ? 'text-green-600' : 'text-yellow-600'}`}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 text-lg">
                  {folder.name}
                </h3>
                {folder.isPublic ? (
                  <Globe className="w-4 h-4 text-green-600" />
                ) : (
                  <Lock className="w-4 h-4 text-orange-600" />
                )}
                {folder.status === 'ARCHIVED' && (
                  <Archive className="w-4 h-4 text-gray-600" />
                )}
              </div>
              <p className="text-sm text-gray-600 font-medium">
                {folder.created_by?.firstname || 'Unknown'}{' '}
                {folder.created_by?.lastname || 'User'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t pt-3 border-gray-100">
          <p className="text-xs text-gray-500 font-medium">
            Created {new Date(folder.created_at).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </p>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            folder.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
            folder.status === 'INACTIVE' ? 'bg-yellow-100 text-yellow-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {folder.status.charAt(0) + folder.status.slice(1).toLowerCase()}
          </span>
        </div>
      </div>

      {contextMenu && (
        <div
          ref={contextMenuRef}
          style={{
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
          }}
          className="bg-white border rounded-lg shadow-lg py-2 z-50 min-w-[160px]"
        >
          {onRename && folder.status !== 'ARCHIVED' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRename(folder.id, folder.name);
                setContextMenu(null);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Rename
            </button>
          )}
          {folder.isPublic && onDelete && folder.status !== 'ARCHIVED' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(folder.id);
                setContextMenu(null);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 text-red-600"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
          {onChangeStatus && folder.status !== 'ARCHIVED' && (
            <div className="px-4 py-2 text-sm">
              <select
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation();
                  onChangeStatus(folder.id, e.target.value as ItemStatus);
                  setContextMenu(null);
                }}
                value={folder.status}
                className="w-full border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ACTIVE">Set Active</option>
                <option value="INACTIVE">Set Inactive</option>
                <option value="ARCHIVED">Archive</option>
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
};