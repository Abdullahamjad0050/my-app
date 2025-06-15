const mongoose = require('mongoose');

let userDbConnection;
let songDbConnection;

const connectUserDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.USER_DB_URI);
    userDbConnection = conn.connection.useDb('user');
    console.log('User DB connected!');
  } catch (err) {
    console.error('User DB error:', err.message);
    throw err;
  }
};

const connectSongDB = async () => {
  try {
    const conn = await mongoose.createConnection(process.env.SONG_DB_URI);
    songDbConnection = conn.useDb('song');
    console.log('Song DB connected!');
  } catch (err) {
    console.error('Song DB error:', err.message);
    throw err;
  }
};

module.exports = {
  connectUserDB,
  connectSongDB,
};
