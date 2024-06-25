const User = require('./tasks'); // Import the User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = "your_secret_key";

const signup = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName) {
      return res.status(400).json({ msg: "Username is required" });
    }
    
    // Check if user with the same username already exists
    const existingUser = await User.User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create new user
    const newUser = await User.User.create({ userName, password: hashedPassword,tasks: [] });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    
    // Find user by username
    const user = await User.User.findOne({ userName });
    if (!user) {
      return res.status(401)
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({mag:"Invalid credentials"});
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });
    // const id = user._id
    console.log(user._id);
    res.status(200).json({ success: true, id: user._id });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { signup, login };