const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3100;
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/blockchain', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for your tokens
const tokenSchema = new mongoose.Schema({
  TokenID: String,
  Symbol: String,
  Name: String,
  Decimal: Number,
  FixedSupply: Boolean,
  InitalSupply: Number,
  OwnerAddressToken: String,
  Burn: Boolean,
  BurnAddress: String,
  Mint: Boolean,
  MintAddress: String,
  TransferFeeTokenValue: Number,
  FeeTokenRecieverAddress: String,
});

// Create a model based on the schema
const Token = mongoose.model('createtoken', tokenSchema);

// Function to generate a unique TokenID
function generateTokenID() {
  return `SX${generateRandomString(40)}`;
}

// Function to generate a random alphanumeric string
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to validate token data
function validateTokenData(tokenData) {
  // Implement your validation rules
  // ...

  return true;
}

app.post('/createToken', async (req, res) => {
  const tokenData = req.body;

  // Generate a unique TokenID
  tokenData.TokenID = generateTokenID();

  // Validate tokenData
  if (!validateTokenData(tokenData)) {
    return res.status(400).json({ success: false, message: 'Invalid token data. Please check your input.' });
  }

  try {
    // Create a new token document in MongoDB
    const newToken = new Token(tokenData);
    await newToken.save();

    // Send the success response with TokenID
    res.json({ success: true, message: 'Token data has been saved to MongoDB', tokenID: tokenData.TokenID });
  } catch (error) {
    console.error('Error saving token data to MongoDB:', error);
    res.status(500).json({ success: false, message: 'Internal server error. Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});