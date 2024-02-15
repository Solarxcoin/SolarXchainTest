const { MongoClient } = require('mongodb');

// Connection URI for MongoDB
const uri = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB URI

// Database Name
const dbName = 'test';

// Function to check the MongoDB connection
async function checkMongoDBConnection() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to the MongoDB server
    await client.connect();

    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

// Execute the function to check the connection
checkMongoDBConnection();