import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MoodLogger from './MoodLogger'; // Component for logging moods
import MoodHistory from './MoodHistory'; // Component to see mood history
import MindfulnessQuote from './MindfulnessQuote'; // Component for daily mindfulness quotes
import LoginPage from './LoginPage'; // Component for login
import PrivateRoute from './PrivateRoute'; // To protect routes
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

function App() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <Router>
      <div className="App">
        <h1>Mood Tracker</h1>

        {/* Navigation Bar */}
        <nav>
          <Link to="/">Home</Link>
          <Link to="/history">Mood History</Link>
          
          {isAuthenticated ? (
            <>
              <span>Hello, {user.name || user.email}!</span>
              <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
            </>
          ) : (
            <button onClick={() => loginWithRedirect()}>Login</button>
          )}
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <MoodHistory />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// Main page component w/ MindfulnessQuote and MoodLogger 
function MainPage() {
  return (
    <div>
      <MindfulnessQuote />
      <MoodLogger />
    </div>
  );
}

export default App;