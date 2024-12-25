import { useState } from 'react';
import ProfilePage from './Profile';
import SecurityPage from './Security';
import { User, Lock, ChevronRight } from 'lucide-react';

const AccountIndexPage = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Lock className="w-5 h-5" /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-72 border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your account preferences</p>
        </div>
        <nav className="mt-6 px-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`
                flex items-center w-full px-4 py-3 mb-2 rounded-lg
                transition-all duration-200 ease-in-out
                ${
                  activeTab === item.id
                    ? 'bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
                }
              `}
              onClick={() => setActiveTab(item.id as 'profile' | 'security')}
            >
              <span className={`mr-3 ${activeTab === item.id ? 'text-indigo-600' : 'text-gray-500'}`}>
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.label}</span>
              {activeTab === item.id && (
                <span className="ml-auto text-indigo-600">
                  <ChevronRight className="w-5 h-5" />
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'profile' ? <ProfilePage /> : <SecurityPage />}
      </div>
    </div>
  );
};

export default AccountIndexPage;