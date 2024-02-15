import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import desktopAppImage from "../static/images/deskt-app.png"
import { Download, Box } from "react-bootstrap-icons";

import ApiHandlers from '../api-handlers';
const apiHandler = new ApiHandlers();

function HomePage() {
  const [blockchainStatistics, setBlockchainStatistics] = useState({});
  const [price, setPrice] = useState(null);

  const timestamp = () => new Date().toISOString();

  // useEffect(() => {
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



  // }, []);


  useEffect(() => {
    console.log(timestamp(), 'Entered HomePage useEffect');
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

    async function getStats() {
      console.log(timestamp(), 'Entered HomePage getStats');
      const response = await apiHandler.exchangeApiHandler.getStatistics();
      if (response?.data?.statistics) {
        setBlockchainStatistics(response.data.statistics)
      }
    }
    const interval = setInterval(getStats, 1000);
    return () => clearInterval(interval);
  }, [])

  return (
    <Container>
      <Row>
        <Col sm="12" md="6" style={{
          backgroundImage: `url(${desktopAppImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '400px'
        }}>
        </Col>
        <Col sm="12" md="6" className="text-center text-md-right my-3">
          <h1>Welcome to SolarX Exchange.</h1>
          <p>Buy, Send, Receive coins with ease.</p>
          <Button variant="outline-primary" size="lg" className="my-5"><Download /> Download for macOS</Button>
        </Col>
      </Row>
      <Row>
        <Col className="my-5 text-center">
          <h1 className="display-4">Blocks mined</h1>
          <h2 className="display-5"><Box /> {blockchainStatistics?.totalNumberOfBlocksMined ? blockchainStatistics.totalNumberOfBlocksMined : '---'}</h2>
        </Col>

        {/* <div>
      <h1>Token Price on HomePage</h1>
      {price !== null ? (
        <p>Current price of SOLX: ${price.toString().slice(0, 5)}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div> */}


      </Row>
    </Container>
  );
}





export default HomePage;