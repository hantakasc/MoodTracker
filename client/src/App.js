import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MoodLogger from './MoodLogger'; // Component for logging moods
import MoodHistory from './MoodHistory'; // Component to see mood history
import MindfulnessQuote from './MindfulnessQuote'; // Component for daily mindfulness quotes

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Mood Tracker</h1>

        {/* Navigation Bar */}
        <nav>
          <Link to="/">Home</Link>
          <Link to="/history">Mood History</Link>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<MainPage />} /> {/* Home route */}
          <Route path="/history" element={<MoodHistory />} /> {/* Mood History page */}
        </Routes>
      </div>
    </Router>
  );
}

// Main page component w/ MindfulnessQuote and MoodLogger components
function MainPage() {
  return (
    <div>
      <MindfulnessQuote /> 
      <MoodLogger /> 
    </div>
  );
}

export default App;