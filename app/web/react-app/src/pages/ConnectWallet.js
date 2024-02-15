import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import './styles.css';
//  import { Form, Button } from 'react-bootstrap';
const ConnectWallet = () => {
  const [wallets, setWallets] = useState([]);
  const [privateKeyInput, setPrivateKeyInput] = useState('');
  const [loginFormVisible, setLoginFormVisible] = useState(false);

  const generatePrivateKey = () => {
    let privateKey = "";
    const characters = "0123456789abcdef";
    for (let i = 0; i < 62; i++) {
      privateKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return "sx" + privateKey;
  }

  const generatePublicKey = (privateKey) => {
    const publicKeyHash = CryptoJS.SHA256(privateKey).toString(CryptoJS.enc.Hex);
    return "sx" + publicKeyHash.substring(0, 32);
  }

  const generateWallet = async () => {
    try {
      const response = await fetch('/blockchain/v1/wallets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });
      if (!response.ok) {
        throw new Error('Failed to create wallet');
      }
      const wallet = await response.json();
      setWallets([...wallets, wallet]);
      updateWalletDetails();
      displayGeneratedWallets();
    } catch (error) {
      console.error('Error creating wallet:', error);
    }
  }

  const updateWalletDetails = () => {
    const walletDetails = document.getElementById("walletDetails");
    walletDetails.innerHTML = `Account created successfully:<br>Public Key: ${wallets[wallets.length - 1].publicKey}<br>Private Key: ${wallets[wallets.length - 1].privateKey}<br>Balance: ${wallets[wallets.length - 1].balance}`;
  }

  const displayGeneratedWallets = () => {
    const generatedWalletsDiv = document.getElementById("generatedWallets");
    generatedWalletsDiv.innerHTML = "<h2>Generated Wallets</h2>";
    wallets.forEach(wallet => {
      generatedWalletsDiv.innerHTML += `<p>Public Key: ${wallet.publicKey}<br>Private Key: ${wallet.privateKey}</p>`;
    });
  }

  const loginWithPrivateKey = () => {
    setLoginFormVisible(!loginFormVisible);
  }

  const loginWithKeyButtonClicked = () => {
    for (const wallet of wallets) {
      if (wallet.privateKey === privateKeyInput) {
        const transactionHistory = [
          { from: wallet.privateKey, to: "Recipient1", amount: 5 },
          { from: wallet.publicKey, to: "Recipient2", amount: 10 },
          { from: wallet.publicKey, to: "Recipient3", amount: 20 },
          { from: wallet.privateKey, to: "Recipient4", amount: 15 },
          { from: wallet.publicKey, to: "Recipient5", amount: 100 },
          { from: wallet.privateKey, to: "Recipient6", amount: 200 },
        ];

        const transactionHistoryDiv = document.getElementById("transactionHistory");
        transactionHistoryDiv.innerHTML = "<h2>Transaction History</h2>";
        for (const transaction of transactionHistory) {
          transactionHistoryDiv.innerHTML += `<p>From: ${transaction.from}<br>To: ${transaction.to}<br>Amount: ${transaction.amount}</p>`;
        }

        setLoginFormVisible(false);
        return;
      }
    }

    alert("Invalid private key. Please try again.");
  }

  return (
    <div className="container1">
      <h1>Wallet</h1>
      <button onClick={generateWallet}>Create Account</button>
      <button onClick={loginWithPrivateKey}>Login with Private Key</button>
      {loginFormVisible &&
        <div id="loginForm">
          <label htmlFor="privateKeyInput">Enter your private key:</label>
          <input type="text" id="privateKeyInput" value={privateKeyInput} onChange={(e) => setPrivateKeyInput(e.target.value)} />
          <button onClick={loginWithKeyButtonClicked}>Login</button>
        </div>
      }
      <div id="walletDetails1"></div>
      <div id="transactionHistory1"></div>
      <div id="generatedWallets1"></div>
    </div>
  );
}

export default ConnectWallet;


// import React from 'react';
// import axios from 'axios';
// import { Form, Button } from 'react-bootstrap';

// // Assume clipboard implementation here
// const clipboard = {/* your clipboard implementation */ };

// class ConnectWallet extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       publicKey: '',
//       privateKey: '',
//       coinBalance: null,
//     };
//   }

//   handleConnectWallet = async () => {
//     try {
//       // Make a secure request to the server's endpoint
//       const response = await axios.get(`http://localhost:3100/checkCoinBalance/${this.state.publicKey}/${this.state.privateKey}/coin-balance`);

//       // Update state with the received coin balance
//       this.setState({ coinBalance: response.data.coinBalance });
//     } catch (error) {
//       console.error('Error getting coin amount:', error);
//       // Handle error if needed
//     }
//   };
//   // Your logic for creating, importing, and saving wallet
//   createWallet = () => {
//     // Implement the logic for creating a wallet
//     // Use this.setState to update the component state as needed

//   };

//   importWallet = () => {
//     // Implement the logic for importing a wallet
//     // Use this.setState to update the component state as needed
//   };

//   copyWalletAddress = () => {
//     const address = 'address'; // Replace with your logic to get the wallet address
//     if (address.length) {
//       clipboard.writeText(address);
//       // Handle clipboard write success
//     }
//   };


//   render() {
//     return (
//       <div className="text-center mt-5">
//         <p className="ms-4 mb-0 text-white">Start from here</p>
//         <h3 className="mb-3 ms-4 text-white">SolarX Chain Explorer</h3>
//         <div className="col-md-6 col-12 mx-auto">
//           <Form>
//             <Form.Group controlId="formPublicKey">
//               <Form.Label className="text-white">Public Key</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter public key"
//                 value={this.state.publicKey}
//                 onChange={(e) => this.setState({ publicKey: e.target.value })}
//               />
//             </Form.Group>

//             <Form.Group controlId="formPrivateKey">
//               <Form.Label className="text-white">Private Key</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter private key"
//                 value={this.state.privateKey}
//                 onChange={(e) => this.setState({ privateKey: e.target.value })}
//               />
//             </Form.Group>

//             <Button variant="primary" className="btnSearch" onClick={this.handleConnectWallet}>
//               Connect Wallet
//             </Button>
//           </Form>

//           {this.state.coinBalance !== null && (
//             <div>
//               <h4 className="text-white">Coin Balance</h4>
//               <p className="text-white">{this.state.coinBalance}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
//   //   render() {
//   //     return (
//   //       <div>
//   //         <h2>Connect Wallet</h2>
//   //         <Form>
//   //           <Form.Group controlId="formPublicKey">
//   //             <Form.Label >Public Key</Form.Label>
//   //             <Form.Control
//   //               type="text"
//   //               placeholder="Enter public key"
//   //               value={this.state.publicKey}
//   //               onChange={(e) => this.setState({ publicKey: e.target.value })}
//   //             />
//   //           </Form.Group>

//   //           <Form.Group controlId="formPrivateKey">
//   //             <Form.Label>Private Key</Form.Label>
//   //             <Form.Control
//   //               type="text"
//   //               placeholder="Enter private key"
//   //               value={this.state.privateKey}
//   //               onChange={(e) => this.setState({ privateKey: e.target.value })}
//   //             />
//   //           </Form.Group>

//   //           <Button variant="primary" onClick={this.handleConnectWallet}>
//   //             Connect Wallet
//   //           </Button>
//   //         </Form>

//   //         {this.state.coinBalance !== null && (
//   //           <div>
//   //             <h4>Coin Balance</h4>
//   //             <p>{this.state.coinBalance}</p>
//   //           </div>
//   //         )}
//   //       </div>
//   //     );
//   //   }
//   // }
// }
// export default ConnectWallet;