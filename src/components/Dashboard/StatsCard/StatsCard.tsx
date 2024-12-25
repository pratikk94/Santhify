import React from 'react';

const StatsCards: React.FC = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Clients */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <h5 className="text-gray-600 text-sm font-medium">Total Clients</h5>
              <p className="text-2xl font-bold text-gray-900">453</p>
            </div>
            <div className="border-t border-gray-200"></div>
            <div>
              <h5 className="text-gray-600 text-sm font-medium">Last 30 Days</h5>
              <p className="text-2xl font-bold text-gray-900">32</p>
            </div>
          </div>
        </div>

        {/* Total Assessments */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <h5 className="text-gray-600 text-sm font-medium">Total Assessments</h5>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="border-t border-gray-200"></div>
            <div>
              <h5 className="text-gray-600 text-sm font-medium">Last 30 Days</h5>
              <p className="text-2xl font-bold text-gray-900">32</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;