import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MoodHistory from './MoodHistory';

// Tests for the MoodHistory component
describe('MoodHistory Component', () => {
    test('renders mood history table with data', async () => {
      const mockMoods = [
        {mood_id: 1, mood_type: 'Happy', notes: 'Silly goose mood!', date: '2024-11-06T12:00:00Z'},
        { mood_id: 2, mood_type: 'Sad', notes: 'Not so silly goose.', date: '2024-11-05T12:00:00Z' },
      ];

      // Mock the fetch API
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockMoods),
    })
  );

  render(<MoodHistory />);

  // Wait for data to load and check if it renders correctly
  await waitFor(() => expect(screen.getByText('Happy')).toBeInTheDocument());
  expect(screen.getByText('Silly goose mood!')).toBeInTheDocument();
  expect(screen.getByText('Sad')).toBeInTheDocument();
  expect(screen.getByText('Not so silly goose.')).toBeInTheDocument();

  
  global.fetch.mockRestore();
});
    });
  
    test('handles delete button click', async () => {
        const mockMoods = [
          { mood_id: 1, mood_type: 'Happy', notes: 'Silly goose mood!', date: '2024-11-06T12:00:00Z' },
        ];
      
        // Mock the fetch API
        global.fetch = jest.fn((url) => {
          if (url.endsWith('/api/moods')) {
            return Promise.resolve({
              json: () => Promise.resolve(mockMoods),
            });
          } else if (url.endsWith('/api/moods/1')) {
            return Promise.resolve({ ok: true });
          }
        });
      
        render(<MoodHistory />);
      
        await waitFor(() => expect(screen.getByText('Happy')).toBeInTheDocument());
      
        // Simulate clicking the Delete button
        fireEvent.click(screen.getByText('Delete'));
      
        // Wait for the entry to be removed from the table
        await waitFor(() => expect(screen.queryByText('Happy')).not.toBeInTheDocument());
      
        // Cleanup mock
        global.fetch.mockRestore();
      });