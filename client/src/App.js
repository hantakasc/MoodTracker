import React from 'react';
import MoodLogger from './MoodLogger';
import MindfulnessQuote from './MindfulnessQuote'; 
import MoodHistory from './MoodHistory';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Mood Tracker</h1>
      <MindfulnessQuote /> 
      <MoodLogger />
      <MoodHistory />
    </div>
  );
}

export default App;