import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cssFiles/adminpanel.css';

const AdminPanel = () => {
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({ title: '', videoId: '' });
  const [editingSong, setEditingSong] = useState(null);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    const res = await axios.get('http://localhost:5000/api/songs');
    setSongs(res.data);
  };

  const handleChange = (e) => {
    setNewSong({ ...newSong, [e.target.name]: e.target.value });
  };

  const handleAddSong = async (e) => {
    e.preventDefault();
    if (!newSong.title || !newSong.videoId) return alert("Both fields required.");
    await axios.post('http://localhost:5000/api/songs', newSong);
    setNewSong({ title: '', videoId: '' });
    fetchSongs();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/songs/${id}`);
    fetchSongs();
  };

  const handleEdit = (song) => {
    setEditingSong(song);
    setNewSong({ title: song.title, videoId: song.videoId });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/songs/${editingSong._id}`, newSong);
    setEditingSong(null);
    setNewSong({ title: '', videoId: '' });
    fetchSongs();
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel - Manage Songs</h2>

      <form onSubmit={editingSong ? handleUpdate : handleAddSong}>
        <input
          type="text"
          name="title"
          placeholder="Song Title"
          value={newSong.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="videoId"
          placeholder="YouTube Video ID"
          value={newSong.videoId}
          onChange={handleChange}
        />
        <button type="submit">{editingSong ? 'Update Song' : 'Add Song'}</button>
        {editingSong && (
          <button type="button" onClick={() => {
            setEditingSong(null);
            setNewSong({ title: '', videoId: '' });
          }}>
            Cancel
          </button>
        )}
      </form>

      <ul className="song-list">
        {songs.map((song) => (
          <li key={song._id}>
            <span>{song.title}</span> - <span>{song.videoId}</span>
            <button onClick={() => handleEdit(song)}>Edit</button>
            <button onClick={() => handleDelete(song._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;