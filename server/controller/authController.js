const User = require('../model/userSchema');

// Register user
exports.registerUser = async (req, res) => {
  const {username, password, admin } = req.body;


  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username is already registered' });
    }

    const newUser = new User({username, password, admin });
    await newUser.save();

    res.status(201).json({ message: 'Account created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }); 

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      role: user.admin ? 'admin' : 'user'
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
