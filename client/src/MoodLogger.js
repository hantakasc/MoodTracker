import React, { useState } from 'react';

function MoodLogger() {
  const [moodType, setMoodType] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8002/moods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1, // Going to replace with user ID
          mood_type: moodType,
          notes: notes,
        }),
      });
      const data = await response.json();
      console.log('Mood entry created:', data);
      // To reset the form fields
      setMoodType('');
      setNotes('');
    } catch (error) {
      console.error('Error creating mood entry:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Mood Type:
        <input
          type="text"
          value={moodType}
          onChange={(e) => setMoodType(e.target.value)}
        />
      </label>
      <label>
        Notes:
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </label>
      <button type="submit">Log Mood</button>
    </form>
  );
}

export default MoodLogger;