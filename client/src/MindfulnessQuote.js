import React, { useEffect, useState } from 'react';

function MindfulnessQuote() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('http://localhost:8002/api/quotes');
        const data = await response.json();
        setQuote(data.quote); 
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div>
      <h3>Mindfulness Quote of the Day</h3>
      <p>{quote || 'Loading...'}</p>
    </div>
  );
}

export default MindfulnessQuote;