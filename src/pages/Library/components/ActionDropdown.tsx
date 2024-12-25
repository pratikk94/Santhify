import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModalType } from '../types';

interface ActionDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onModalTypeSelect: (type: ModalType) => void;
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({
  isOpen,
  onToggle,
  onModalTypeSelect,
}) => {
  return (
    <div className="relative">
      <motion.button
        onClick={onToggle}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-md transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        <span>New</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10"
          >
            <motion.button
              onClick={() => {
                onModalTypeSelect('folder');
                onToggle();
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              whileHover={{ backgroundColor: '#f3f4f6' }}
              transition={{ duration: 0.2 }}
            >
              Create Folder
            </motion.button>
            <motion.button
              onClick={() => {
                onModalTypeSelect('file');
                onToggle();
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              whileHover={{ backgroundColor: '#f3f4f6' }}
              transition={{ duration: 0.2 }}
            >
              Upload File
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};