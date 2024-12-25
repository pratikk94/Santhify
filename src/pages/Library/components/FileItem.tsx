import React, { useState, useRef, useEffect } from 'react';
import { File as FileIcon, Globe, Lock, Trash2, Edit, Archive } from 'lucide-react';
import { useDrag } from 'react-dnd';
import { FileItem as FileItemType, ItemStatus } from '../types';

interface FileItemProps {
  file: FileItemType;
  onDelete?: (id: string) => void;
  onRename?: (id: string, currentName: string) => void;
  onChangeStatus?: (id: string, newStatus: ItemStatus) => void;
}

export const FileItem: React.FC<FileItemProps> = ({
  file,
  onDelete,
  onRename,
  onChangeStatus
}) => {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: {
      type: 'FILE',
      id: file.id,
      name: file.name,
      isPublic: file.isPublic,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (file.status !== 'ARCHIVED') {
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
      ref={drag}
      onContextMenu={handleContextMenu}
      className={`group p-5 border rounded-xl hover:shadow-lg transition-all duration-200 ${
        file.isPublic ? 'bg-green-50/70 border-green-200' : 'bg-yellow-50/70 border-yellow-200'
      } ${isDragging ? 'opacity-50 scale-95' : ''} ${
        file.status === 'ARCHIVED' ? 'opacity-50 grayscale' : ''
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${file.isPublic ? 'bg-green-100' : 'bg-yellow-100'}`}>
              <FileIcon
                className={`w-6 h-6 ${file.isPublic ? 'text-green-600' : 'text-yellow-600'}`}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 text-lg truncate max-w-[200px]" title={file.name}>
                  {file.name}
                </h3>
                {file.isPublic ? (
                  <Globe className="w-4 h-4 text-green-600" />
                ) : (
                  <Lock className="w-4 h-4 text-orange-600" />
                )}
                {file.status === 'ARCHIVED' && (
                  <Archive className="w-4 h-4 text-gray-600" />
                )}
              </div>
              <p className="text-sm text-gray-600 font-medium">
                {file.created_by?.firstname || 'Unknown'}{' '}
                {file.created_by?.lastname || 'User'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-3 border-gray-100">
          <p className="text-xs text-gray-500 font-medium">
            Created {new Date(file.created_at).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </p>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            file.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
            file.status === 'INACTIVE' ? 'bg-yellow-100 text-yellow-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {file.status.charAt(0) + file.status.slice(1).toLowerCase()}
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
          {onRename && file.status !== 'ARCHIVED' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRename(file.id, file.name);
                setContextMenu(null);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Rename
            </button>
          )}
          {file.isPublic && onDelete && file.status !== 'ARCHIVED' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(file.id);
                setContextMenu(null);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 text-red-600"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
          {onChangeStatus && file.status !== 'ARCHIVED' && (
            <div className="px-4 py-2 text-sm">
              <select
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation();
                  onChangeStatus(file.id, e.target.value as ItemStatus);
                  setContextMenu(null);
                }}
                value={file.status}
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