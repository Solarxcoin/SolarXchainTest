import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExplorerPage from './pages/Explorer/ExplorerPage';
import SearchAddressPage from './pages/SearchAddressPage';
import AddressTransactionsPage from './pages/AddressTransactionsPage';  // Import the new component
import TokenForm from './pages/TokenForm';
import ConnectWallet from './pages/ConnectWallet';

function App() {
  return (

    <BrowserRouter>
      <NavigationBar />
      <Route path="/homePage">
        <HomePage />
      </Route>
      <Route path="/searchaddress/:address/:coinBalance" exact>
        <SearchAddressPage />
      </Route>
      <Route path="/searchaddress/:address/transactions" exact>
        <AddressTransactionsPage />
      </Route>
      <Route path="/createToken" exact>
        <TokenForm />
      </Route>
      <Route path="/connectWallet" exact>
        <ConnectWallet /> {/* Update the component */}
      </Route>
      <Route path="/" exact>
        <ExplorerPage />
      </Route>
      <Footer />
    </BrowserRouter>
  );
}

export default App;