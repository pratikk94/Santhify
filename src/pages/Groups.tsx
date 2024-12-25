import React, { useState } from 'react';
import '../styles/Groups.css';
import axiosInstance from '../utils/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, User, Settings } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Creator {
  id: string;
  firstname: string;
  lastname: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  status: string;
  created_by: Creator;
}

const fetchGroups = async () => {
  const response = await axiosInstance.get('/group/all');
  if (response.data.status === 'SUCCESS') {
    return response.data.data.groups;
  }
  throw new Error('Failed to fetch groups');
};

const GroupsPageIndex: React.FC = () => {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const { data: groups = [], isLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: fetchGroups
  });

  const addGroupMutation = useMutation({
    mutationFn: async ({ name, description }: { name: string; description: string }) => {
      const response = await axiosInstance.post('/group/add', { name, description });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      setNewGroupName('');
      setNewGroupDescription('');
      setIsModalVisible(false);
    }
  });

  const updateGroupMutation = useMutation({
    mutationFn: async ({ id, name, description }: { id: string; name: string; description: string }) => {
      const response = await axiosInstance.put(`/group/${id}/details`, { name, description });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      setNewGroupName('');
      setNewGroupDescription('');
      setIsEditModalVisible(false);
      setSelectedGroup(null);
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await axiosInstance.put(`/group/${id}/change-status?new_status=${status}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      setSelectedStatus('');
      setIsStatusModalVisible(false);
      setSelectedGroup(null);
    }
  });

  const handleAddGroup = () => {
    if (newGroupName) {
      addGroupMutation.mutate({
        name: newGroupName,
        description: newGroupDescription
      });
    }
  };

  const handleUpdateGroup = () => {
    if (selectedGroup && newGroupName) {
      updateGroupMutation.mutate({
        id: selectedGroup.id,
        name: newGroupName,
        description: newGroupDescription
      });
    }
  };

  const handleUpdateStatus = () => {
    if (selectedGroup && selectedStatus) {
      updateStatusMutation.mutate({
        id: selectedGroup.id,
        status: selectedStatus
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Groups</h2>
        <button 
          onClick={() => setIsModalVisible(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-md transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Group
        </button>
      </div>

      {groups.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-lg">No groups found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.map((group: Group) => (
            <div key={group.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-semibold">
                  {group.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{group.name}</h3>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    group.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                    group.status === 'INACTIVE' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {group.status}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{group.description}</p>
              <div className="mt-auto">
                <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {group.created_by.firstname} {group.created_by.lastname}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedGroup(group);
                        setSelectedStatus(group.status);
                        setIsStatusModalVisible(true);
                      }}
                      className="text-blue-600 hover:text-white font-medium flex items-center gap-1 hover:bg-blue-600 rounded-lg p-2"
                    >
                      <Settings className="w-4 h-4" />
                      Status
                    </button>
                    <button
                      onClick={() => {
                        setSelectedGroup(group);
                        setNewGroupName(group.name);
                        setNewGroupDescription(group.description);
                        setIsEditModalVisible(true);
                      }}
                      className="text-blue-600 hover:text-white font-medium flex items-center gap-1 hover:bg-blue-600 rounded-lg p-2"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isModalVisible && (
          <motion.div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 1000 }}
          >
            <motion.div 
              className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-bold mb-6">Add New Group</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
                  <input
                    type="text"
                    placeholder="Enter group name"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    placeholder="Enter group description"
                    value={newGroupDescription}
                    onChange={(e) => setNewGroupDescription(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setNewGroupName('');
                    setNewGroupDescription('');
                    setIsModalVisible(false);
                  }}
                  className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddGroup}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Add Group
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isEditModalVisible && (
          <motion.div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 1000 }}
          >
            <motion.div 
              className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-bold mb-6">Edit Group</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
                  <input
                    type="text"
                    placeholder="Enter group name"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    placeholder="Enter group description"
                    value={newGroupDescription}
                    onChange={(e) => setNewGroupDescription(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setSelectedGroup(null);
                    setNewGroupName('');
                    setNewGroupDescription('');
                    setIsEditModalVisible(false);
                  }}
                  className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateGroup}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Update Group
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isStatusModalVisible && (
          <motion.div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 1000 }}
          >
            <motion.div 
              className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-bold mb-6">Update Status</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setSelectedGroup(null);
                    setSelectedStatus('');
                    setIsStatusModalVisible(false);
                  }}
                  className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateStatus}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Update Status
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GroupsPageIndex;