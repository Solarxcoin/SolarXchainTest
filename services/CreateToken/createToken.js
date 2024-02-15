const readlineSync = require('readline-sync');
const fs = require('fs');

// Function to generate a random alphanumeric string
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function createToken() {
  const tokenData = {};

  // Generate a unique TokenID with "sx" prefix
  tokenData.TokenID = `sx${generateRandomString(40)}`;

  tokenData.Symbol = readlineSync.question('Enter Token Symbol: ');
  tokenData.Name = readlineSync.question('Enter Token Name: ');
  tokenData.Decimal = readlineSync.question('Enter Token Decimal: ');
  tokenData.FixedSupply = readlineSync.question('Is it a Fixed Supply Token? (true/false): ');

  if (tokenData.FixedSupply.toLowerCase() === 'true') {
    tokenData.InitialSupply = readlineSync.question('Enter Initial Supply: ');
    tokenData.OwnerAddressToken = readlineSync.question('Enter Owner Address for Fixed Supply Token: ');
  }

  tokenData.Burn = readlineSync.question('Does the Token support Burn? (true/false): ');
  if (tokenData.Burn.toLowerCase() === 'true') {
    tokenData.BurnAddress = readlineSync.question('Enter Burn Address: ');
  }

  tokenData.Mint = readlineSync.question('Does the Token support Mint? (true/false): ');
  if (tokenData.Mint.toLowerCase() === 'true') {
    tokenData.MintAddress = readlineSync.question('Enter Mint Address: ');
  }

  tokenData.TransferFeeTokenValue = readlineSync.question('Enter Transfer Fee Token Value: ');
  tokenData.FeeTokenReceiverAddress = readlineSync.question('Enter Fee Token Receiver Address: ');

  const jsonString = JSON.stringify(tokenData, null, 2);

  fs.writeFileSync('createdToken.json', jsonString);

  console.log('Token data has been saved to createdToken.json');
}

createToken();