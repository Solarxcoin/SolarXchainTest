// walletService.js
const fs = require('fs');
const path = require('path');
const Wallet = require('./wallet');

const walletFilePath = path.join(__dirname, 'wallets.json');

function initializeWallets() {
  let wallets = [];

  try {
    // Try to read existing wallets from the JSON file
    const fileContent = fs.readFileSync(walletFilePath, 'utf-8');
    wallets = JSON.parse(fileContent);
  } catch (error) {
    // Handle errors, e.g., the file doesn't exist or is not valid JSON
    console.error('Error reading wallets file:', error);
  }

  // If no wallets were loaded or there was an error, create some default wallets
  if (wallets.length === 0) {
    const aliceWallet = new Wallet().createKeyPair('Alice');
    const bobWallet = new Wallet().createKeyPair('Bob');

    // Add the default wallets to the array
    wallets.push(aliceWallet, bobWallet);

    // Save the default wallets to the JSON file
    saveWallets(wallets);
  }

  return wallets;
}

function saveWallets(wallets) {
  try {
    // Save the wallets array to the JSON file
    fs.writeFileSync(walletFilePath, JSON.stringify(wallets, null, 2), 'utf-8');
  } catch (error) {
    // Handle errors, e.g., unable to write to the file
    console.error('Error writing wallets file:', error);
  }
}

module.exports = {
  initializeWallets,
  saveWallets,
};
