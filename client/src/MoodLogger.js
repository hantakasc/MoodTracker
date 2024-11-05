import React, { useEffect, useState } from 'react';
//import MindfulnessQuote from './MindfulnessQuote';

function MoodLogger() {
  const [moodType, setMoodType] = useState('');
  const [notes, setNotes] = useState('');
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  // Fetch quote from API
  /*useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('http://localhost:8002/api/quotes');
        if (!response.ok) {
          throw new Error('Failed to fetch quote');
        }
        const data = await response.json();
        setQuote(data.quote);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchQuote();
  }, []);*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8002/moods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1, 
          mood_type: moodType,
          notes: notes,
        }),
      });

      const data = await response.json();
      console.log('Mood entry created:', data);
      
      // Reset form fields
      setMoodType('');
      setNotes('');
    } catch (error) {
      console.error('Error creating mood entry:', error);
    }
  };

  return (
    <div>
      <h1>Mood Logger</h1>

     {/*  Display the Quote of the Day 
      <section>
        {quote ? (
          <MindfulnessQuote quote={quote} />
        ) : (
          <p>{error || 'Loading quote...'}</p>
        )}
      </section> */}

      {/* Mood Logging Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="moodType">Mood Type:</label>
          <input
            type="text"
            id="moodType"
            value={moodType}
            onChange={(e) => setMoodType(e.target.value)}
            placeholder="Enter your mood"
          />
        </div>

        <div>
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes here"
          ></textarea>
        </div>

        <button type="submit">Log Mood</button>
      </form>
    </div>
  );
}

export default MoodLogger;