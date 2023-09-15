// pages/search.tsx
import React from 'react';
import SearchBar from '../components/SearchBar';

const SearchPage: React.FC = () => {
  const handleSearch = (query: string) => {
    // Handle the search query (e.g., perform a search API request)
    console.log(`Searching for: ${query}`);
  };

  return (
    <div>
      <h1>Search Page</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
};

export default SearchPage;
