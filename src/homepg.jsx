import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './cssFiles/homepg.css';
import SearchBar from './components/SearchBar';

const Home = () => {
  const navigate = useNavigate();

  // Function to navigate to Songs page with category
  const handleCategoryClick = (type, value) => {
    navigate(`/songs?${type}=${value}`);
  };

  return (
    <>

      <header>
        <div className="logo">
          <h1><abbr title="Dua Music Player">DMP</abbr></h1>
        </div>
        <SearchBar />
      </header>

    
      <section className="sect1">

        <section className="section bollywood">
          <h1 onClick={() => handleCategoryClick("music", "Bollywood")}>Bollywood</h1>
          <ul>
            <li>Tum Mile</li>
            <li>Kesariya</li>
            <li>Naatu Naatu</li>
            <li>Tum Hi Ho</li>
            <li>Ghungroo</li>
            <li>Tenu Sang Rakhna</li>
          </ul>
        </section>

        <section className="section hollywood">
          <h1 onClick={() => handleCategoryClick("music", "Hollywood")}>Hollywood</h1>
          <ul>
            <li>Blinding Lights - The Weeknd</li>
            <li>Levitating - Dua Lipa</li>
            <li>Shivers - Ed Sheeran</li>
            <li>As It Was - Harry Styles</li>
            <li>Stay - Justin Bieber & The Kid</li>
          </ul>
        </section>

        <section className="section bands">
          <h1 onClick={() => handleCategoryClick("music", "Bands")}>Bands</h1>
          <ul>
            <li>BTS</li>
            <li>Coldplay</li>
            <li>Imagine Dragons</li>
            <li>BlackPink</li>
            <li>Maroon 5</li>
            <li>OneRepublic</li>
          </ul>
        </section>

        <section className="section singers">
          <h1 onClick={() => handleCategoryClick("artist", "Artists")}>Artists</h1>
          <ul>
            <li>Arijit Singh</li>
            <li>Taylor Swift</li>
            <li>Atif Aslam</li>
            <li>Ed Sheeran</li>
            <li>Billie Eilish</li>
          </ul>
        </section>
      </section>

      <footer>
        <p>&copy; 2025 DMP - Dua Music Player</p>
      </footer>
    </>
  );
};

export default Home;
