const API_BASE_URL = 'https://your-energy.b.goit.study/api';

export async function fetchQuote() {
  try {
    const response = await fetch(`${API_BASE_URL}/quote`);
    if (!response.ok) {
      throw new Error(`Error fetching quote: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch quote error:', error);
    return null;
  }
}