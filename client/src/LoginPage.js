import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LoginPage() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div>
      <h1>Welcome to Mood Tracker</h1>

      {!isAuthenticated ? (
        <div>
          <button onClick={() => loginWithRedirect()}>Log In</button>
          <button onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>
            Sign Up
          </button>
        </div>
      ) : (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;