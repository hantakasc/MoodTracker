import React, { useEffect, useState } from 'react';

function MoodHistory() {
  const [moods, setMoods] = useState([]); // State to hold mood entries
  const [editingMood, setEditingMood] = useState(null); // State for editing a mood
  const [updatedMoodType, setUpdatedMoodType] = useState('');
  const [updatedNotes, setUpdatedNotes] = useState('');
  const [message, setMessage] = useState(''); // State for feedback messages

  useEffect(() => {
    fetchMoodHistory(); // Load mood history when the component loads
  }, []);

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

  // Start editing a mood
  const handleEdit = (mood) => {
    setEditingMood(mood.mood_id);
    setUpdatedMoodType(mood.mood_type);
    setUpdatedNotes(mood.notes);
  };

  // Save the edited mood
  const handleSave = async (mood_id) => {
    try {
      const response = await fetch(`http://localhost:8002/api/moods/${mood_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mood_type: updatedMoodType,
          notes: updatedNotes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update mood entry');
      }

      const updatedMood = await response.json();
      setMessage('Mood entry updated successfully.');

      // Update the moods list
      setMoods(
        moods.map((mood) =>
          mood.mood_id === mood_id ? updatedMood : mood
        )
      );

      setEditingMood(null); // Exit editing mode
    } catch (error) {
      console.error('Error updating mood entry:', error);
      setMessage('Failed to update mood entry. Please try again.');
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingMood(null);
  };

  // Delete a mood entry
  const handleDelete = async (mood_id) => {
    try {
      const response = await fetch(`http://localhost:8002/api/moods/${mood_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete mood entry');
      }

      setMessage('Mood entry deleted successfully.');
      setMoods(moods.filter((mood) => mood.mood_id !== mood_id)); // Remove from state
    } catch (error) {
      console.error('Error deleting mood entry:', error);
      setMessage('Failed to delete mood entry. Please try again.');
    }
  };

  return (
    <div className="mood-history">
      <h2>Mood History</h2>
      {message && <p>{message}</p>}
      <button onClick={fetchMoodHistory}>Refresh Mood History</button>
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
                <td>
                  {editingMood === entry.mood_id ? (
                    <input
                      type="text"
                      value={updatedMoodType}
                      onChange={(e) => setUpdatedMoodType(e.target.value)}
                    />
                  ) : (
                    entry.mood_type
                  )}
                </td>
                <td>
                  {editingMood === entry.mood_id ? (
                    <textarea
                      value={updatedNotes}
                      onChange={(e) => setUpdatedNotes(e.target.value)}
                    />
                  ) : (
                    entry.notes || 'N/A'
                  )}
                </td>
                <td>
                  {editingMood === entry.mood_id ? (
                    <>
                      <button onClick={() => handleSave(entry.mood_id)}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(entry)}>Edit</button>
                      <button onClick={() => handleDelete(entry.mood_id)}>Delete</button>
                    </>
                  )}
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
