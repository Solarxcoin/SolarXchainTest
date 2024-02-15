import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Row, Col, Container } from 'react-bootstrap';

const SearchAddressPage = () => {
  const { address, coinBalance } = useParams();
  const [addressData, setAddressData] = useState(null);
  const [addressTransactions, setAddressTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch address data
        const addressResponse = await fetch(`http://localhost:10101/blockchain/v1/address/${address}/${coinBalance}`);
        const addressData = await addressResponse.json();
        setAddressData(addressData.data);

        const transactionsResponse = await fetch(`http://localhost:10101/blockchain/v1/transactions/mempool/mined-transactions`);
        const transactionsData = await transactionsResponse.json();
        setAddressTransactions(transactionsData.data.transactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [address, coinBalance]);

  return (

    <Container className="mt-4">
      <h2 className="mb-4">Search Address Page</h2>

      {addressData && (
        <div className="mb-4">
          <p>
            <b>Coin Balance:</b> {addressData.coinBalance} <b>SOLX</b>
          </p>
        </div>
      )}

      <div>
        <h3 className="mb-3">All Transactions for Address</h3>
        <Row>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Direction</th>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Transaction Value</th>
                  <th>Fee Value</th>
                  <th>Reward Value</th>
                  <th>Transaction Type</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {addressTransactions
                  .filter(
                    (transaction) =>
                      transaction.transaction.sender === address || transaction.transaction.receiver === address
                  )
                  .map((filteredTransaction, index) => (
                    <tr key={index}>
                      <td>{filteredTransaction.transaction.uuid}</td>
                      <td>{filteredTransaction.transaction.sender === address ? 'OUT' : 'IN'}</td>
                      <td>
                        {filteredTransaction.transaction.sender === address
                          ? filteredTransaction.transaction.sender
                          : filteredTransaction.transaction.receiver}
                      </td>
                      <td>
                        {filteredTransaction.transaction.sender === address
                          ? filteredTransaction.transaction.receiver
                          : filteredTransaction.transaction.sender}
                      </td>
                      <td>{filteredTransaction.transaction.transactionValue}</td>
                      <td>{filteredTransaction.transaction.feeValue}</td>
                      <td>{filteredTransaction.transaction.rewardValue}</td>
                      <td>{filteredTransaction.transaction.transactionType}</td>
                      <td>{filteredTransaction.timestamp}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default SearchAddressPage;