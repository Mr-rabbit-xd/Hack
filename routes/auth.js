const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password, confirmPassword, privateKey } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: 'Passwords do not match' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ msg: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    privateKey
  });

  await newUser.save();
  res.status(201).json({ msg: 'Signup successful' });
});

module.exports = router;
