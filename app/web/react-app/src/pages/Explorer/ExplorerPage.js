import { useState, useEffect } from "react";
import {  Row, Col, Table} from "react-bootstrap";
import AddressSearchForm from '../AddressSearchForm';


import TestTable from '../TestTable';

import MinedTransactionRow from "../../components/MinedTransactionRow";
import ApiHandlers from "../../api-handlers";

import '../../index.css'


import LatestBlocksSection from "./LatestBlocksTable/LatestBlocksSection";
import CoinsTransactionsBlocks from "./CoinsTransactionsBlocks/CoinTransactionsBlocks";
// import AddressSearchFormm from "../AddressSearchFormm";



const apiHandler = new ApiHandlers();

function ExplorerPage() {
  const [latestMinedTransactions, setLatestMinedTransactions] = useState([]);

  const timestamp = () => new Date().toISOString();

  useEffect(() => {
    console.log(timestamp(), "Entered ExplorerPage useEffect");

    async function getExchangeData() {
      console.log(timestamp(), "Entered ExplorerPage getExchangeData");
      const [responseLatestMinedBlocks,
        responsePendingTransactionsFromMempool,
        responseLatestMinedTransactionFromMempool
      ] = await Promise.all([
        apiHandler.exchangeApiHandler.getLatestMinedBlocksSummary(),
        apiHandler.exchangeApiHandler.getPendingTransactionsFromMempool(),
        apiHandler.exchangeApiHandler.getLatestMinedTransactionsFromMempool(),
        apiHandler.exchangeApiHandler.getStatistics()
      ]);
      if (responseLatestMinedTransactionFromMempool?.data?.transactions) {
        setLatestMinedTransactions(responseLatestMinedTransactionFromMempool.data.transactions);
      }
    }

    const interval = setInterval(getExchangeData, 5000);
    return () => clearInterval(interval);
  });




  
  return (
    <>
    
      <Row className="s1 d-flex justify-content-center">
        <Col sm="12" md="8">
          <AddressSearchForm/>
        </Col>
      </Row>
      <TestTable />
      <CoinsTransactionsBlocks />
      
      <LatestBlocksSection/>

      <Row>
        <Col className="my-4">
          <h3>Mined transactions</h3>
          <Table responsive>
            <thead>
            <tr>
              <th>Mined At</th>
              <th>Details</th>
            </tr>
            </thead>
            <tbody>
            {latestMinedTransactions.map((block, index) => <MinedTransactionRow key={index}
                                                                                  transaction={block} />)}
            </tbody>
          </Table>
        </Col>





        
      </Row>
    </>
  );
}



const apiKey = '3199b437-e6ee-4de8-b3a3-66f715a08e4d'; // Replace with your actual API key
const symbol = 'BTC'; // Replace with the symbol of the token you want to get the price for

const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?symbol=${symbol}&CMC_PRO_API_KEY=${apiKey}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    if (data.status.error_code === 0) {
      const tokenInfo = data.data[0];
      const price = tokenInfo.quote.USD.price;
      console.log(`Current price of ${symbol}: $${price}`);
    } else {
      console.error('Error:', data.status.error_message);
    }
  })
  .catch(error => console.error('Fetch error:', error));




export default ExplorerPage;