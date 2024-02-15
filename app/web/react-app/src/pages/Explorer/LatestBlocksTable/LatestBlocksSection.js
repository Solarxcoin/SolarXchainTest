import React from 'react';
import { useState, useEffect } from "react";
import { Row, Col, Table } from 'react-bootstrap';
import MinedBlockRow from '../../../components/MinedBlockRow';
import MempoolTransactionRow from '../../../components/MempoolTransactionRow';
import ApiHandlers from "../../../api-handlers";

const apiHandler = new ApiHandlers();


const LatestBlocksSection = () => {

  const [latestBlocks, setLatestBlocks] = useState([]);
  const [latestPendingTransactions, setLatestPendingTransactions] = useState([]);

  const timestamp = () => new Date().toISOString();

  useEffect(() => {
    console.log(timestamp(), "Entered ExplorerPage useEffect");

    async function getExchangeData() {
      console.log(timestamp(), "Entered ExplorerPage getExchangeData");
      const [responseLatestMinedBlocks,
        responsePendingTransactionsFromMempool,
      ] = await Promise.all([
        apiHandler.exchangeApiHandler.getLatestMinedBlocksSummary(),
        apiHandler.exchangeApiHandler.getPendingTransactionsFromMempool()
      ]);
      if (responseLatestMinedBlocks?.data?.blocks) {
        setLatestBlocks(responseLatestMinedBlocks.data.blocks);
      }
      if (responsePendingTransactionsFromMempool?.data?.transactions) {
        setLatestPendingTransactions(responsePendingTransactionsFromMempool.data.transactions);
      }
    }

    const interval = setInterval(getExchangeData, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div className='blocks-table py-5'>
      <div className='container py-5'>
        <div className='row'>
        <div className='col-md-6 col-12'>
          <h3 className='mb-4'>Latest blocks</h3>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Block Index</th>
                <th>Mined At</th>
                <th>Coins</th>
                <th>Number of Transactions</th>
              </tr>
            </thead>
            <tbody>
            {latestBlocks.slice(0, 10).map((block, index) => <MinedBlockRow key={index} block={block} />)}
            </tbody>
          </Table>
          </div>
          <div className='col-md-6 col-12'>
          <h3 className='mb-4'>Mempool</h3>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Created At</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              {latestPendingTransactions.slice(0, 10).map((transaction, index) => (
                <MempoolTransactionRow key={index} transaction={transaction} />
              ))}
            </tbody>
          </Table>
          </div>
          </div>
      </div>
    </div>
  );
};

export default LatestBlocksSection;
