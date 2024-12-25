import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../utils/axios';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const updatePassword = async (newPassword: string) => {
  const { data } = await axiosInstance.put('/account/update-password', {
    new_password: newPassword,
  });
  return data;
};

const SecurityPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const updatePasswordMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      setNewPassword('');
      setConfirmPassword('');
      setError(null);
      toast.success('Password updated successfully');
    },
    onError: (err) => {
      setError('Failed to update password');
      toast.error('Failed to update password');
    },
  });

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    updatePasswordMutation.mutate(newPassword);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-8">
        <section className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="w-1 h-8 bg-blue-500 rounded-full"></span>
              Change Password
            </h2>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-6 max-w-lg">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm bg-red-50 p-4 rounded-lg border border-red-100"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
                minLength={8}
                disabled={updatePasswordMutation.isPending}
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
                minLength={8}
                disabled={updatePasswordMutation.isPending}
                placeholder="Confirm new password"
              />
            </div>

            <div className="pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-8 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={updatePasswordMutation.isPending}
              >
                {updatePasswordMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating Password...
                  </div>
                ) : (
                  'Update Password'
                )}
              </motion.button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SecurityPage;