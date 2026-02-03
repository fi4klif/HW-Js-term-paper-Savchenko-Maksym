const API_BASE_URL = 'https://your-energy.b.goit.study/api';

export async function subscribeToNewsletter(email) {
  try {
    const response = await fetch(`${API_BASE_URL}/subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    // 409 Conflict - означає, що такий email вже підписаний
    if (response.status === 409) {
        throw new Error('This email is already subscribed.');
    }

    if (!response.ok) {
      throw new Error('Failed to subscribe. Please try again.');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}