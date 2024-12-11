// src/api/factCheckApi.js

export const checkFact = async (fact) => {
  try {
    const response = await fetch('https://fact-checking-assistant.onrender.com/factcheck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fact }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
