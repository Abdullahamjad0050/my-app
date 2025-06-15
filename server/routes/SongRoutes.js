const express = require('express');
const router = express.Router();
const {
  createSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong
} = require('../controller/SongController');

// CRUD Routes
router.post('/', createSong);
router.get('/', getAllSongs);
router.get('/:id', getSongById);
router.patch('/:id', updateSong);
router.delete('/:id', deleteSong);

module.exports = router;