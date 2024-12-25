import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PathBreadcrumbProps {
  path: string[];
  onGoBack: () => void;
  totalItems: number;
}

export const PathBreadcrumb: React.FC<PathBreadcrumbProps> = ({
  path,
  onGoBack,
  totalItems,
}) => {
  return (
    <div className="flex items-center justify-between mb-8 bg-white">
      <div className="flex items-center gap-3 mr-4">
        {path.length > 1 && (
          <button
            onClick={onGoBack}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 hover:shadow-md"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <nav className="flex items-center" aria-label="Breadcrumb">
          {path.map((segment, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <span className="mx-2 text-gray-400 select-none relative top-[-1px]">/</span>
              )}
              <span className={`text-lg ${
                index === path.length - 1 
                  ? 'font-semibold text-gray-800'
                  : 'text-gray-500'
              }`}>
                {segment}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>
      <div className="px-4 py-1 bg-gray-100 rounded-full">
        <p className="text-sm font-medium text-gray-600">
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </p>
      </div>
    </div>
  );
};