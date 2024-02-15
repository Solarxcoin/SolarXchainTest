import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiHandlers from '../api-handlers';

const apiHandler = new ApiHandlers();

const AddressTransactionsPage = () => {
  const { address } = useParams();
  const [addressTransactions, setAddressTransactions] = useState([]);

  useEffect(() => {
    const fetchAddressTransactions = async () => {
      try {
        const response = await apiHandler.exchangeApiHandler.getAddressTransactions(address);
        if (response?.data?.transactions) {
          setAddressTransactions(response.data.transactions);
        }
      } catch (error) {
        console.error('Error fetching address transactions:', error);
      }
    };

    fetchAddressTransactions();
  }, [address]);

  return (
    <div>
      <h2>Transactions for Address: {address}</h2>
      <ul>
        {addressTransactions.map((transaction, index) => (
          <li key={index}>{/* Render transaction details here */}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddressTransactionsPage;