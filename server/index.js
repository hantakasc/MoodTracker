require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const db = require('./db'); 
const https = require('https');
const app = express();
const PORT = process.env.PORT || 8002;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Sample route to test the server and database connection
/*app.get('/test', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).send('Server error');
  }
});*/

app.get('/api/quotes', (req, res) => {
  const options = {
    method: 'GET',
    hostname: 'metaapi-mindfulness-quotes.p.rapidapi.com',
    path: '/v1/mindfulness',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'metaapi-mindfulness-quotes.p.rapidapi.com',
    },
  };

  const request = https.request(options, (response) => {
    let chunks = [];

    response.on('data', (chunk) => {
      chunks.push(chunk);
    });

    response.on('end', () => {
      const body = Buffer.concat(chunks);
      res.json(JSON.parse(body.toString()));
    });
  });

  request.on('error', (error) => {
    console.error(error);
    res.status(500).json({ error: 'Error fetching quote' });
  });

  request.end();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});