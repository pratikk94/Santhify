import { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  children: ReactNode;
  onEdit?: () => void;
}

const InfoCard = ({ title, children, onEdit }: InfoCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Edit
          </button>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default InfoCard; 