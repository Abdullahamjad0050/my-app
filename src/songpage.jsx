import React, { useEffect, useState, useRef } from 'react';
import './cssFiles/songpage.css';
import SearchBar from './components/SearchBar';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SongPlayer = () => {
  const { name } = useParams(); // From route: /song/:name
  const [song, setSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');
  const audioRef = useRef(null);

  useEffect(() => {
    const selectedSong = JSON.parse(localStorage.getItem("selectedSong"));

    if (selectedSong) {
      setSong(selectedSong);
    } else if (name) {
      // If no selected song in localStorage, try fetching from backend
      const fetchSong = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/songs/search?name=${encodeURIComponent(name)}`);
          if (res.data.length > 0) {
            setSong(res.data[0]); // Use the first match
          } else {
            setError('Song not found.');
          }
        } catch (err) {
          setError('Failed to fetch song.');
        }
      };

      fetchSong();
    }
  }, [name]);

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <header>
        <div className="logo">
          <h1><abbr title="Dua Music Player">DMP</abbr></h1>
        </div>
        <SearchBar />
      </header>

      <main>
        <div className="song-container">
          <button className="back-button" onClick={goBack}>&#8592; Back</button>

          {error && <h3 style={{ color: 'red' }}>{error}</h3>}

          {song && (
            <>
              <div className="cover-container">
                <img id="cover-image" src={song.thumbnail} alt="Song Cover" />
              </div>

              <h2 id="song-title">{song.title}</h2>

              {song.videoId && (
                <div className="video-container">
                  <iframe
                    id="youtube-player"
                    title="YouTube Video Player"
                    width="400"
                    height="315"
                    src={`https://www.youtube.com/embed/${song.videoId}?autoplay=0&controls=1`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <footer>
        <p>&copy; 2025 DMP - Dua Music Player</p>
      </footer>
    </>
  );
};

export default SongPlayer;
