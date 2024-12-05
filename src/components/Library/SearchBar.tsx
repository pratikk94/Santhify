import React from 'react';
import { Input } from 'antd';

const SearchBar: React.FC = () => {
  return (
    <div className="search-bar">
      <Input.Search placeholder="Search for files and folders" allowClear />
    </div>
  );
};

export default SearchBar;