import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Mood Tracker Heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/Mood Tracker/i);
  expect(linkElement).toBeInTheDocument();
});
