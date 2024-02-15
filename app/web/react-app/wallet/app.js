const blockchain = [];
const wallets = [];

// Funksioni per me gjeneru walletin e ri
function generateWallet() {
  // Gjenerimi i private key
  const privateKey = generatePrivateKey();
  const publicKey = generatePublicKey(privateKey);

  // krijimi i llogaris
  const account = {
    privateKey,
    publicKey,
    balance: 0,
  };

  wallets.push(account);

  // Update wallet
  const walletDetails = document.getElementById("walletDetails");
  walletDetails.innerHTML = `Account created successfully:<br>Public Key: ${publicKey}<br>Private Key: ${privateKey}<br>Balance: ${account.balance}`;
}

// funksioni per me gjeneru ni privat key te rastsishem
function generatePrivateKey() {
  return "0000x" + Math.random().toString(36).substring(2, 66); // Private key
}

// Funksioni per me kriju public key prej private key
function generatePublicKey(privateKey) {
  return "0000x" + generatePrivateKey();
}

// Funksioni me u ba log in me private key
function loginWithPrivateKey() {
  const privateKeyInput = prompt("Enter your private key:");

  for (const wallet of wallets) {
    if (wallet.privateKey === privateKeyInput) {
      // Transaksione shembull
      const transactionHistory = [
        { from: wallet.privateKey, to: "Recipient1", amount: 5 },
        { from: wallet.publicKey, to: "Recipient2", amount: 10 },
        { from: wallet.publicKey, to: "Recipient3", amount: 20 },
        { from: wallet.privateKey, to: "Recipient4", amount: 15 },
        { from: wallet.publicKey, to: "Recipient5", amount: 100 },
        { from: wallet.privateKey, to: "Recipient6", amount: 200 },
      ];

      const transactionHistoryDiv =
        document.getElementById("transactionHistory");
      transactionHistoryDiv.innerHTML = "<h2>Transaction History</h2>";
      for (const transaction of transactionHistory) {
        transactionHistoryDiv.innerHTML += `<p>From: ${transaction.from}<br>To: ${transaction.to}<br>Amount: ${transaction.amount}</p>`;
      }

      return;
    }
  }

  alert("Invalid private key. Please try again.");
}

document
  .getElementById("generateWallet")
  .addEventListener("click", generateWallet);
document
  .getElementById("loginButton")
  .addEventListener("click", loginWithPrivateKey);
