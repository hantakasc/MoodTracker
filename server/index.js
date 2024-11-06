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

// Route to fetch mindfulness quotes
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

// Route to retrieve all mood entries from the database
app.get('/api/moods', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM mood_entries ORDER BY date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Route to insert a new mood entry into the database
app.post('/api/moods', async (req, res) => {
  const { mood_type, notes } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO mood_entries (mood_type, notes, date) VALUES ($1, $2, NOW()) RETURNING *',
      [mood_type, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Database insertion error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Route to delete a mood entry from the database
app.delete('/api/moods/:mood_id', async (req, res) => {
  const { mood_id } = req.params;
  try {
    const result = await db.query('DELETE FROM mood_entries WHERE mood_id = $1 RETURNING *', [mood_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mood entry not found' });
    }
    res.status(200).json({ message: 'Mood entry deleted', deletedMood: result.rows[0] });
  } catch (err) {
    console.error('Database deletion error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});