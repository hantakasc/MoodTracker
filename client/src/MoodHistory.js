import React, { useEffect, useState } from 'react';

function MoodHistory() {
  const [moods, setMoods] = useState([]); // State to hold mood entries
  const [message, setMessage] = useState(''); // State for feedback messages

  useEffect(() => {
    // Fetch mood history from backend API when component loads
    const fetchMoodHistory = async () => {
      try {
        const response = await fetch('http://localhost:8002/api/moods');
        if (!response.ok) {
          throw new Error('Failed to fetch mood history');
        }
        const data = await response.json();
        setMoods(data);
      } catch (error) {
        console.error('Error fetching mood history:', error);
        setMessage('Error loading mood history. Please try again later.');
      }
    };

    fetchMoodHistory();
  }, []);

  // Delete a mood entry
  const handleDelete = async (mood_id) => {
    try {
      const response = await fetch(`http://localhost:8002/api/moods/${mood_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete mood entry');
      }

      const data = await response.json();
      setMessage(data.message); // Show that it was a success

      // Update the moods list by filtering the deleted mood
      setMoods(moods.filter((mood) => mood.mood_id !== mood_id));
    } catch (error) {
      console.error('Error deleting mood entry:', error);
      setMessage('Failed to delete mood entry. Please try again.');
    }
  };

  return (
    <div className="mood-history">
      <h2>Mood History</h2>
      {message && <p>{message}</p>}
      {moods.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Mood</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {moods.map((entry) => (
              <tr key={entry.mood_id}>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>{entry.mood_type}</td>
                <td>{entry.notes || 'N/A'}</td>
                <td>
                  <button onClick={() => handleDelete(entry.mood_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No mood history available.</p>
      )}
    </div>
  );
}

export default MoodHistory;