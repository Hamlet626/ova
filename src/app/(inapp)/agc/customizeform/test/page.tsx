"use client"

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div>
            <TextField
                label="Search"
                variant="outlined"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <IconButton onClick={handleSearch}>
                <SearchIcon />
            </IconButton>
        </div>
    );
};

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
