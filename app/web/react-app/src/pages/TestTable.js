// ParentComponent.js
import React, { useState, useEffect } from 'react';

const TestTable = () => {
  const [formData, setFormData] = useState({ name: '', age: '' });
  const [tableData, setTableData] = useState([]);
  const [price, setPrice] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.age) {
      setTableData((prevData) => [...prevData, formData]);
      setFormData({ name: '', age: '' });
    }
  };


  useEffect(() => {
    // const fetchTokenPrice = async () => {
    //   try {
    //     const response = await fetch('http://localhost:3001/get-solx-token-price');
    //     const data = await response.json();
        
    //     // Assuming setPrice is a function that updates the state with the received price
    //     setPrice(data.price);
    //   } catch (error) {
    //     console.error('Fetch error:', error);
    //   }
    // };
    
    // fetchTokenPrice();

    const fetchTokenPrice = async () => {
      const apiKey = '3199b437-e6ee-4de8-b3a3-66f715a08e4d'; // Replace with your actual CoinMarketCap API key
      const id = 28162;
    
      try {
        const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${id}&convert=USD&CMC_PRO_API_KEY=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
    
        if (data.data[id] && data.data[id].quote && data.data[id].quote.USD && data.data[id].quote.USD.price) {
          const price = data.data[id].quote.USD.price;
    
          // Assuming setPrice is a function that updates the state with the received price
          setPrice(price);
        } else {
          console.error('API response does not contain the expected price structure:', data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    
    fetchTokenPrice();
    
  }, []);


  return (
    <div className='s2'>
        <div className='container'>
            <div className="col-12">
                <div className="t1">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-8">
                                <div className="row">
                                <div className="col-12 col-md-6 ps-0 pe-0">
                                    <div className="d-flex flex-column">
                                    <div
                                        className="border-bottom border-end px-4 py-3 d-flex gap-3 align-items-center"
                                    >
                                        <img src="./images/svg/coin.svg" alt="SOLX" width="40"/>
                                        <div className="">
                                        <p className="mb-0" >
                                            SolarX Price
                                        </p>
                                        <p className="mb-0">
                                        {price !== null ? (
                                            <p className='mb-0'>{price.toString().slice(0, 6)}$</p>
                                        ) : (
                                            <p>Loading...</p>
                                        )}
                                        </p>
                                        </div>
                                    </div>
                                    <div
                                        className="border-end border-bottom-sm-none px-4 py-3 d-flex gap-3 align-items-center"
                                    >
                                        <img
                                        src="./images/svg/usdt.svg"
                                        alt="SOLX"
                                        width="40"
                                        />
                                        <div className="">
                                        <p className="mb-0" >
                                            USDT Price
                                        </p>
                                        <p className="mb-0">0.99$ @ 133.428 SOLX</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 ps-0 pe-0">
                                    <div className="d-flex flex-column">
                                    <div
                                        className="border-bottom border-end px-4 py-3 d-flex gap-3 align-items-center">
                                        <img
                                        src="./images/svg/usdt.svg"
                                        alt="SOLX"
                                        width="40"
                                        />
                                        <div className="">
                                        <p className="mb-0" >
                                            Total Transactions
                                        </p>
                                        <p className="mb-0">0.99$ @ 133.428 SOLX</p>
                                        </div>
                                    </div>
                                    <div
                                        className="border-end px-4 py-3 gap-3 d-flex align-items-center"  >
                                        <img
                                        src="./images/svg/usdt.svg"
                                        alt="SOLX"
                                        width="40"
                                        />
                                        <div className="">
                                        <p className="mb-0" >
                                            Latest blocks
                                        </p>
                                        <p className="mb-0">0.99$ @ 133.428 SOLX</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-4 px-3 py-3 border-top">
                                <div className="d-flex align-items-center justify-content-center">
                                <p>asd</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default TestTable;

