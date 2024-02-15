const http = require('http');
const https = require('https');
const url = require('url');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const apiKey = '3199b437-e6ee-4de8-b3a3-66f715a08e4d'; // Replace with your actual CoinMarketCap API key
  const id = 28162;
  const name = 'SolarX';

  if (req.url === '/get-solx-token-price' && req.method === 'GET') {
    try {
      const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${id}&convert=USD`;

      https.get(apiUrl, { headers: { 'X-CMC_PRO_API_KEY': apiKey } }, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          try {
            const jsonData = JSON.parse(data);

            if (jsonData.data[id] && jsonData.data[id].quote && jsonData.data[id].quote.USD && jsonData.data[id].quote.USD.price) {
              const price = jsonData.data[id].quote.USD.price;
              res.writeHead(200);
              res.end(JSON.stringify({ price }));
            } else {
              res.writeHead(500);
              res.end(JSON.stringify({ error: `Cryptocurrency not found or data not available for ${name} (ID: ${id}).` }));
            }
          } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: `Error parsing response: ${error.message}` }));
          }
        });
      }).on('error', (error) => {
        res.writeHead(500);
        res.end(JSON.stringify({ error: `Error making request: ${error.message}` }));
      });
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: `Server error: ${error.message}` }));
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
