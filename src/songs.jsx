import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './cssFiles/songs.css';
import SearchBar from './components/SearchBar';

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract query params from URL (e.g., ?music=Bollywood or ?artist=Taylor)
    const queryParams = new URLSearchParams(location.search);
    const music = queryParams.get('music');
    const artist = queryParams.get('artist');

    // If filter exists, fetch songs based on music or artist category
    let apiUrl = 'http://localhost:5000/songs';
    if (music) {
      apiUrl += `?music=${music}`;
    } else if (artist) {
      apiUrl += `?artist=${artist}`;
    }

    // Fetch songs from backend (filtered or all)
    axios.get(apiUrl).then((res) => {
      setSongs(res.data);
    });
  }, [location.search]);

  // On song click, navigate to individual song page using song._id
  const handleSongClick = (song) => {
    navigate(`/songpage/${song._id}`);
  };

  // Navigate back to previous page
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <header>
        <div className="logo"><h1><abbr title="Dua Music Player">DMP</abbr></h1></div>
        <SearchBar />
      </header>

      <main>
        <button className="back-button" onClick={goBack}>&larr; Back</button>
        <h2 className="section-title">Songs</h2>
        <ul className="song-list">
          {songs.map((song) => (
            <li key={song._id} className="song-item" onClick={() => handleSongClick(song)}>
              <img src={`https://img.youtube.com/vi/${song.videoId}/default.jpg`} alt={song.title} />
              <span>{song.title}</span>
            </li>
          ))}
        </ul>
      </main>

      <footer><p>&copy; 2025 DMP - Dua Music Player</p></footer>
    </>
  );
};

export default Songs;
