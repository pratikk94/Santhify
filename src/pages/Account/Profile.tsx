import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../utils/axios';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface UserDetails {
  firstname: string;
  lastname: string;
  photo_url: string;
  email: string;
  gender: string;
  dob: string;
  country_code: string;
  phone_number: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
}

const fetchUserDetails = async () => {
  const { data } = await axiosInstance.get('/account/details');
  return data.data.user_details;
};

const updateUserDetails = async (updatedData: Partial<UserDetails>) => {
  const { data } = await axiosInstance.put('/account/details', updatedData);
  return data;
};

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editSection, setEditSection] = useState<'personal' | 'address' | null>(null);
  const [formData, setFormData] = useState<Partial<UserDetails>>({});

  const { data: userDetails, isLoading } = useQuery({
    queryKey: ['userDetails'],
    queryFn: fetchUserDetails,
  });

  const updateMutation = useMutation({
    mutationFn: updateUserDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userDetails'] });
      setIsEditModalOpen(false);
      setEditSection(null);
      toast.success('Profile updated successfully');
    },
    onError: (err) => {
      setError('Failed to update user details');
      toast.error('Failed to update profile');
    },
  });

  const handleEditClick = (section: 'personal' | 'address') => {
    setEditSection(section);
    setFormData(userDetails || {});
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-600 font-medium">{error}</div>;
  }

  if (!userDetails) {
    return <div className="flex items-center justify-center min-h-screen text-gray-600">No user details found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Profile Header */}
      <div className="flex items-center space-x-6 mb-12">
        <div className="relative">
          {userDetails.photo_url ? (
            <img 
              src={userDetails.photo_url} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold">
              {userDetails.firstname[0]}{userDetails.lastname[0]}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {userDetails.firstname} {userDetails.lastname}
          </h1>
          <p className="text-gray-600 mt-1">{userDetails.email}</p>
        </div>
      </div>

      {/* Information Sections */}
      <div className="space-y-8">
        {/* Personal Information */}
        <section className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="w-1 h-8 bg-blue-500 rounded-full"></span>
              Personal Information
            </h2>
            <button 
              onClick={() => handleEditClick('personal')}
              className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium text-sm rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <label className="block text-sm font-medium text-gray-500 mb-2">First Name</label>
              <p className="text-gray-900 font-medium">{userDetails.firstname || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <label className="block text-sm font-medium text-gray-500 mb-2">Last Name</label>
              <p className="text-gray-900 font-medium">{userDetails.lastname || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <label className="block text-sm font-medium text-gray-500 mb-2">Email</label>
              <p className="text-gray-900 font-medium">{userDetails.email || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <label className="block text-sm font-medium text-gray-500 mb-2">Phone</label>
              <p className="text-gray-900 font-medium">
                {userDetails.country_code && userDetails.phone_number ? 
                  `${userDetails.country_code} ${userDetails.phone_number}` : 
                  'N/A'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <label className="block text-sm font-medium text-gray-500 mb-2">Date of Birth</label>
              <p className="text-gray-900 font-medium">{userDetails.dob || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <label className="block text-sm font-medium text-gray-500 mb-2">Gender</label>
              <p className="text-gray-900 font-medium">{userDetails.gender || 'N/A'}</p>
            </div>
          </div>
        </section>

        {/* Address Information */}
        <section className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="w-1 h-8 bg-blue-500 rounded-full"></span>
              Address Information
            </h2>
            <button 
              onClick={() => handleEditClick('address')}
              className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium text-sm rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <label className="block text-sm font-medium text-gray-500 mb-2">Country</label>
              <p className="text-gray-900 font-medium">{userDetails.country || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <label className="block text-sm font-medium text-gray-500 mb-2">State</label>
              <p className="text-gray-900 font-medium">{userDetails.state || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <label className="block text-sm font-medium text-gray-500 mb-2">City</label>
              <p className="text-gray-900 font-medium">{userDetails.city || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <label className="block text-sm font-medium text-gray-500 mb-2">Postal Code</label>
              <p className="text-gray-900 font-medium">{userDetails.pincode || 'N/A'}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            style={{ zIndex: 1000 }}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white rounded-xl max-w-4xl w-full p-8 shadow-xl"
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                Edit {editSection === 'personal' ? 'Personal Information' : 'Address Information'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {editSection === 'personal' ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          name="firstname"
                          value={formData.firstname || ''}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          name="lastname"
                          value={formData.lastname || ''}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          placeholder="Enter your last name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                        <select
                          name="gender"
                          value={formData.gender || ''}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob || ''}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Country Code</label>
                        <input
                          type="text"
                          name="country_code"
                          value={formData.country_code || ''}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          placeholder="e.g. +1, +44, +91"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="text"
                          name="phone_number"
                          value={formData.phone_number || ''}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Enter your country"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Enter your state"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Enter your city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Enter your postal code"
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-100">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-8 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-8 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;