// routes/checkCoinBalance.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your User model

router.get('/:publicKey/:privateKey/coin-balance', async (req, res) => {
  const { publicKey, privateKey } = req.params;

  try {
    // Query the database to find a user with the provided public and private keys
    const user = await User.findOne({ publicKey, privateKey });

    if (user) {
      // If user is found, return the coin balance
      res.json({ coinBalance: user.coinBalance });
    } else {
      // If user is not found, return an appropriate response
      res.json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;