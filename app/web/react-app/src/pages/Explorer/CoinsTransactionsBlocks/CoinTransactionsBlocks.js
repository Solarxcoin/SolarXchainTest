import React from 'react';
import { useState, useEffect } from "react";
import { Box, Hdd } from "react-bootstrap-icons";

import ApiHandlers from "../../../api-handlers";

import MinedBlockCoinsChart from "../../../components/charts/MinedBlockCoinsChart";
import MinedBlockTransactionsChart from "../../../components/charts/MinedBlockTransactionsChart";

const apiHandler = new ApiHandlers();

const CoinsTransactionsBlocks = () => {

    const [latestBlocks, setLatestBlocks] = useState([]);
    const [latestStatistics, setLatestStatistics] = useState({});

    const timestamp = () => new Date().toISOString();

    useEffect(() => {
        console.log(timestamp(), "Entered ExplorerPage useEffect");
    
        async function getExchangeData() {
          console.log(timestamp(), "Entered ExplorerPage getExchangeData");
          const [responseLatestMinedBlocks,
            responseStatistics
          ] = await Promise.all([
            apiHandler.exchangeApiHandler.getLatestMinedBlocksSummary(),
            apiHandler.exchangeApiHandler.getStatistics()
          ]);
          if (responseLatestMinedBlocks?.data?.blocks) {
            setLatestBlocks(responseLatestMinedBlocks.data.blocks);
          }
          if (responseStatistics?.data?.statistics) {
            setLatestStatistics(responseStatistics.data.statistics);
          }
        }
    
        const interval = setInterval(getExchangeData, 5000);
        return () => clearInterval(interval);
      });

  return (
    <div className='coinstransactionsblocks'>
        <div className='container'>
            <h1 className='text-center mb-5 mt-5'>Explorer</h1>
            <div className='row mb-5'>
                <div className='col-md-6 col-12 mb-3'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4><Box/> Blocks Mined: {latestStatistics.totalNumberOfBlocksMined}</h4>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 col-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4><Hdd/> Blockchain size: {Number(latestStatistics.sizeOfBlockchainInBytes/Math.pow(1024,2)).toLocaleString()} MB</h4>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='row'>
                <div className='col-md-6 col-12 mb-3'>
                    <MinedBlockCoinsChart blocks={latestBlocks}/>
                </div>

                <div className='col-md-6 col-12'>
                    <MinedBlockTransactionsChart blocks={latestBlocks}/>
                </div>
            </div>
        </div>
    </div>
  );

};

export default CoinsTransactionsBlocks;
