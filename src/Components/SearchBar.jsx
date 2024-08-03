// src/components/SearchBar.js

import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className='search-bar-container'>
            <input
                type="text"
                placeholder="Search for a coin..."
                value={query}
                onChange={handleChange}
                className='search-bar'
            />
        </div>
    );
};

export default SearchBar;
