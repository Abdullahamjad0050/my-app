// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchBar.css'; // Styling below

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/songs/search?title=${query}`);
      const song = response.data;

      if (song) {
        localStorage.setItem('selectedSong', JSON.stringify(song));
        navigate('../songpage');
      } else {
        alert('Song not found');
      }
    } catch (error) {
      console.error('Search failed:', error);
      alert('Error searching song');
    }
  };

  return (
    <div className="dmp-search-bar">
      <input
        type="text"
        placeholder="Search music..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
