import React, { useState } from 'react';

function MoodLogger() {
  const [moodType, setMoodType] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8002/api/moods', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mood_type: moodType,
          notes: notes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to log mood. Please try again.');
      }

      const data = await response.json();
      console.log('Mood entry created:', data);

      // If successful
      setMessage('Mood logged successfully!');
      
      // Reset the form fields
      setMoodType('');
      setNotes('');
    } catch (error) {
      console.error('Error creating mood entry:', error);
      setMessage(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Mood Logger</h1>

      {/* Show feedback messages */}
      {message && <p>{message}</p>}

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