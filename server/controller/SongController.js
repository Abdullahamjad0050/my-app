const mongoose = require('mongoose');
const Song = require('../model/SongsName'); // songSchema connects to 'song' DB via mongoose.connection.useDb()

// Get all songs (supports filtering)
const getAllSongs = async (req, res) => {
  try {
    const { music, artist } = req.query;

    let query = {};
    if (music) query.music = music;
    if (artist) query.artist = artist;

    const songs = await Song.find(query);
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching songs', error: err.message });
  }
};

// Get one song by ID
const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ message: 'Song not found' });
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching song', error: err.message });
  }
};

// Create a new song
const createSong = async (req, res) => {
  try {
    const { title, videoId, music, artist } = req.body;

    const newSong = new Song({ title, videoId, music, artist });
    await newSong.save();

    res.status(201).json({ message: 'Song added successfully', song: newSong });
  } catch (err) {
    res.status(400).json({ message: 'Error creating song', error: err.message });
  }
};

// Update an existing song
const updateSong = async (req, res) => {
  try {
    const updated = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Song not found' });

    res.json({ message: 'Song updated', song: updated });
  } catch (err) {
    res.status(400).json({ message: 'Error updating song', error: err.message });
  }
};

// Delete a song
const deleteSong = async (req, res) => {
  try {
    const deleted = await Song.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Song not found' });

    res.json({ message: 'Song deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting song', error: err.message });
  }
};

module.exports = {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong
};
