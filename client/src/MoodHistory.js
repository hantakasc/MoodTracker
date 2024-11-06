import React, { useEffect, useState } from 'react';

function MoodHistory() {
  const [moods, setMoods] = useState([]); // State to hold mood entries

  useEffect(() => {
    // Fetch mood history from backend API when component loads
    const fetchMoodHistory = async () => {
      try {
        const response = await fetch('http://localhost:8002/api/moods'); 
        const data = await response.json();
        setMoods(data); 
      } catch (error) {
        console.error('Error fetching mood history:', error);
      }
    };

    fetchMoodHistory();
  }, []);

  return (
    <div className="mood-history">
      <h2>Mood History</h2>
      {moods.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Mood</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {moods.map((entry) => (
              <tr key={entry.mood_id}>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>{entry.mood_type}</td>
                <td>{entry.notes || 'N/A'}</td>
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