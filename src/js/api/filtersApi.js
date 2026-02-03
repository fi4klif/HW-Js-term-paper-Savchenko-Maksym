const API_BASE_URL = 'https://your-energy.b.goit.study/api';

export async function fetchFilters(filter, page = 1, limit = 12) {
  const params = new URLSearchParams({ filter, page, limit });
  try {
    const response = await fetch(`${API_BASE_URL}/filters?${params}`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}