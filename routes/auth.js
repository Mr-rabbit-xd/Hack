const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Key = require('../models/Key');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'buntyhacksecret';

// ✅ Signup
router.post('/signup', async (req, res) => {
  const { username, password, secretkey } = req.body;

  if (!username || !password || !secretkey)
    return res.status(400).json({ message: 'All fields are required.' });

  const keyDoc = await Key.findOne({ key: secretkey });
  if (!keyDoc || keyDoc.used)
    return res.status(400).json({ message: 'Invalid or already used key.' });

  const existingUser = await User.findOne({ username });
  if (existingUser)
    return res.status(400).json({ message: 'Username already taken.' });

  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPass, usedKey: secretkey });
  await newUser.save();

  keyDoc.used = true;
  keyDoc.usedBy = username;
  await keyDoc.save();

  return res.json({ message: 'Signup successful. Please login.' });
});

// ✅ Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'All fields required.' });

  const user = await User.findOne({ username });
  if (!user)
    return res.status(400).json({ message: 'Invalid credentials.' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: 'Invalid credentials.' });

  const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
    expiresIn: '7d',
  });

  return res.json({ message: 'Login success!', token });
});

module.exports = router;
