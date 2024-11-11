import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MoodLogger from './MoodLogger';

describe('MoodLogger Component', () => {
  
      // Test to check if the form renders with empty fields
      test('renders MoodLogger form with empty fields', () => {
        render(<MoodLogger />);
    
        const moodInput = screen.getByPlaceholderText('Enter your mood');
        const notesInput = screen.getByPlaceholderText('Add notes here');
        const submitButton = screen.getByText('Log Mood');
    
        expect(moodInput).toBeInTheDocument();
        expect(notesInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(moodInput.value).toBe('');
        expect(notesInput.value).toBe('');
      });
    
      // Test if submit is successful
      test('submits mood entry successfully', async () => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve({ message: 'Mood entry created' }),
          })
        );
    
        render(<MoodLogger />);
    
        const moodInput = screen.getByPlaceholderText('Enter your mood');
        const notesInput = screen.getByPlaceholderText('Add notes here');
        const submitButton = screen.getByText('Log Mood');
    
        fireEvent.change(moodInput, { target: { value: 'Happy' } });
        fireEvent.change(notesInput, { target: { value: 'Feeling silly!' } });
    
        fireEvent.click(submitButton);
    
        await waitFor(() => {
          expect(fetch).toHaveBeenCalledWith('http://localhost:8002/moods', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: 1, mood_type: 'Happy', notes: 'Feeling silly!' }),
          });
        });
    
        global.fetch.mockRestore();
      });
    
      // Test for error during form submission
      test('displays error message when submission fails', async () => {
        global.fetch = jest.fn(() =>
          Promise.reject(new Error('Failed to submit mood entry'))
        );
    
        render(<MoodLogger />);
    
        const moodInput = screen.getByPlaceholderText('Enter your mood');
        const notesInput = screen.getByPlaceholderText('Add notes here');
        const submitButton = screen.getByText('Log Mood');
    
        fireEvent.change(moodInput, { target: { value: 'Sad' } });
        fireEvent.change(notesInput, { target: { value: 'Feeling down' } });
    
        fireEvent.click(submitButton);
    
        await waitFor(() => {
          expect(screen.getByText(/Error creating mood entry/i)).toBeInTheDocument();
        });
    
        global.fetch.mockRestore();
      });
    
    });