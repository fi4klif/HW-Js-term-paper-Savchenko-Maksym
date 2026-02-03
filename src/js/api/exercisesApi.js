const API_BASE_URL = 'https://your-energy.b.goit.study/api';

/* Fetch Exercises List */
export async function fetchExercises(filter, name, keyword = '', page = 1, limit = 10) {
  let filterKey = '';
  if (filter === 'Body parts') filterKey = 'bodypart';
  else if (filter === 'Muscles') filterKey = 'muscles';
  else if (filter === 'Equipment') filterKey = 'equipment';

  const params = new URLSearchParams({
    [filterKey]: name,
    keyword,
    page,
    limit,
  });

  try {
    const response = await fetch(`${API_BASE_URL}/exercises?${params}`);
    if (!response.ok) throw new Error('Failed to fetch exercises');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

/* Fetch Single Exercise Details */
export async function fetchExerciseById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/exercises/${id}`);
    if (!response.ok) throw new Error('Failed to fetch exercise details');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

/* Send Rating (PATCH) */
export async function patchRating(id, ratingData) {
  try {
    const response = await fetch(`${API_BASE_URL}/exercises/${id}/rating`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ratingData),
    });

    if (!response.ok) {
        // Отримуємо текст помилки
        const errorData = await response.json().catch(() => ({}));
        // Якщо сервер повертає "Such email already exists", передаємо це далі
        throw new Error(errorData.message || `Error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}