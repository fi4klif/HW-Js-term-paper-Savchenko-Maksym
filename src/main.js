// ===== API Configuration =====
const API_BASE_URL = 'https://your-energy.b.goit.study/api';

// ===== State Management =====
let currentFilter = 'Muscles';
let currentPage = 1;
let currentLimit = 12;
let currentSearchQuery = '';
let currentExercises = [];
let selectedExerciseId = null;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// ===== DOM Elements =====
const filterButtons = document.getElementById('filterButtons');
const categoriesList = document.getElementById('categoriesList');
const exercisesList = document.getElementById('exercisesList');
const pagination = document.getElementById('pagination');
const exercisesTitle = document.getElementById('exercisesTitle');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const exerciseModal = document.getElementById('exerciseModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const ratingModal = document.getElementById('ratingModal');
const ratingModalClose = document.getElementById('ratingModalClose');
const ratingForm = document.getElementById('ratingForm');
const ratingStars = document.getElementById('ratingStars');
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const popularTagsList = document.getElementById('popularTagsList');
const favoritesList = document.getElementById('favoritesList');
const emptyState = document.getElementById('emptyState');
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const subscribeForm = document.getElementById('subscribeForm');
const subscribeEmail = document.getElementById('subscribeEmail');
const subscribeMessage = document.getElementById('subscribeMessage');

// ===== API Requests =====

/**
 * Fetch exercise filters (Muscles, Body parts, Equipment)
 */
async function fetchFilters(filter) {
  try {
    const response = await fetch(`${API_BASE_URL}/filters?filter=${filter}`);
    if (!response.ok) throw new Error('Failed to fetch filters');
    return await response.json();
  } catch (error) {
    console.error('Error fetching filters:', error);
    return [];
  }
}

/**
 * Fetch exercises with filters
 */
async function fetchExercises(params = {}) {
  try {
    const query = new URLSearchParams({
      page: params.page || currentPage,
      limit: params.limit || currentLimit,
      ...(params.filter && { filter: params.filter }),
      ...(params.keyword && { keyword: params.keyword }),
    });

    const response = await fetch(`${API_BASE_URL}/exercises?${query}`);
    if (!response.ok) throw new Error('Failed to fetch exercises');
    return await response.json();
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return [];
  }
}

/**
 * Fetch single exercise details
 */
async function fetchExerciseDetails(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/exercises/${id}`);
    if (!response.ok) throw new Error('Failed to fetch exercise details');
    return await response.json();
  } catch (error) {
    console.error('Error fetching exercise details:', error);
    return null;
  }
}

/**
 * Fetch daily quote
 */
async function fetchQuote() {
  try {
    const response = await fetch(`${API_BASE_URL}/quote`);
    if (!response.ok) throw new Error('Failed to fetch quote');
    return await response.json();
  } catch (error) {
    console.error('Error fetching quote:', error);
    return null;
  }
}

/**
 * Submit exercise rating
 */
async function submitRating(exerciseId, rating, email) {
  try {
    const response = await fetch(`${API_BASE_URL}/exercises/${exerciseId}/rating`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating }),
    });
    if (!response.ok) throw new Error('Failed to submit rating');
    return await response.json();
  } catch (error) {
    console.error('Error submitting rating:', error);
    return null;
  }
}

/**
 * Subscribe to newsletter
 */
async function subscribe(email) {
  try {
    const response = await fetch(`${API_BASE_URL}/subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Subscription failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Error subscribing:', error);
    throw error;
  }
}

// ===== UI Rendering Functions =====

/**
 * Render filter buttons
 */
async function renderFilters() {
  filterButtons.addEventListener('click', async e => {
    if (e.target.classList.contains('filter-btn')) {
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      e.target.classList.add('active');
      currentFilter = e.target.dataset.filter;
      currentPage = 1;
      await loadCategories();
    }
  });
}

/**
 * Load and render category cards
 */
async function loadCategories() {
  const categories = await fetchFilters(currentFilter);
  categoriesList.innerHTML = '';

  if (!categories.length) {
    categoriesList.innerHTML = '<p>No categories found</p>';
    return;
  }

  categories.forEach(category => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.innerHTML = `
      <h3 class="category-name">${category.name}</h3>
      <p class="category-type">${currentFilter}</p>
    `;
    card.addEventListener('click', async () => {
      await loadExercises({ filter: category.name });
      exercisesTitle.textContent = `Exercises - ${category.name}`;
    });
    categoriesList.appendChild(card);
  });
}

/**
 * Load and render exercises
 */
async function loadExercises(params = {}) {
  const data = await fetchExercises(params);
  currentExercises = data.results || [];
  const totalPages = data.totalPages || 1;

  renderExercisesList();
  renderPagination(totalPages);
}

/**
 * Render exercise cards
 */
function renderExercisesList() {
  exercisesList.innerHTML = '';

  if (!currentExercises.length) {
    exercisesList.innerHTML = '<p>No exercises found</p>';
    return;
  }

  currentExercises.forEach(exercise => {
    const isFavorite = favorites.some(fav => fav._id === exercise._id);
    const card = document.createElement('div');
    card.className = 'exercise-card';
    card.innerHTML = `
      <div class="exercise-card-header">
        <h3 class="exercise-name">${exercise.name}</h3>
        <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                data-id="${exercise._id}" 
                aria-label="Add to favorites">
          ❤️
        </button>
      </div>
      <div class="exercise-info">
        <p><strong>Body Part:</strong> ${exercise.bodyPart}</p>
        <p><strong>Target:</strong> ${exercise.target}</p>
        <p><strong>Calories:</strong> ${exercise.burnedCalories || 'N/A'}</p>
        <p><strong>Rating:</strong> ${exercise.rating?.toFixed(1) || 'N/A'}</p>
      </div>
      <button class="btn-primary btn-start" data-id="${exercise._id}">Start</button>
    `;

    const favoriteBtn = card.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', e => {
      e.stopPropagation();
      toggleFavorite(exercise);
      favoriteBtn.classList.toggle('active');
    });

    card.querySelector('.btn-start').addEventListener('click', () => {
      openExerciseModal(exercise._id);
    });

    exercisesList.appendChild(card);
  });
}

/**
 * Render pagination buttons
 */
function renderPagination(totalPages) {
  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
    btn.textContent = i;
    btn.addEventListener('click', async () => {
      currentPage = i;
      await loadExercises({ filter: currentFilter, keyword: currentSearchQuery });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    pagination.appendChild(btn);
  }
}

/**
 * Open exercise details modal
 */
async function openExerciseModal(exerciseId) {
  selectedExerciseId = exerciseId;
  const exercise = await fetchExerciseDetails(exerciseId);

  if (!exercise) {
    modalBody.innerHTML = '<p>Error loading exercise details</p>';
    exerciseModal.classList.add('active');
    return;
  }

  const isFavorite = favorites.some(fav => fav._id === exerciseId);

  modalBody.innerHTML = `
    <div class="modal-exercise">
      ${exercise.gifUrl ? `<video class="modal-video" controls><source src="${exercise.gifUrl}" type="video/mp4"></video>` : ''}
      <h2 class="modal-title">${exercise.name}</h2>
      <p class="modal-rating">⭐ ${exercise.rating?.toFixed(1) || 'N/A'}</p>
      <p><strong>Body Part:</strong> ${exercise.bodyPart}</p>
      <p><strong>Target Muscle:</strong> ${exercise.target}</p>
      <p><strong>Equipment:</strong> ${exercise.equipment || 'N/A'}</p>
      <p><strong>Calories Burned:</strong> ${exercise.burnedCalories || 'N/A'}</p>
      <p><strong>Description:</strong> ${exercise.description || 'No description available'}</p>
      <div class="modal-actions">
        <button class="btn-primary btn-favorite ${isFavorite ? 'active' : ''}" data-id="${exerciseId}">
          ${isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
        </button>
        <button class="btn-secondary" id="ratingBtn">Give a rating</button>
      </div>
    </div>
  `;

  document.querySelector('.btn-favorite').addEventListener('click', e => {
    e.target.classList.toggle('active');
    toggleFavorite(exercise);
    const isFav = favorites.some(fav => fav._id === exerciseId);
    e.target.textContent = isFav ? '❤️ Remove from Favorites' : '🤍 Add to Favorites';
  });

  document.getElementById('ratingBtn').addEventListener('click', () => {
    exerciseModal.classList.remove('active');
    openRatingModal();
  });

  exerciseModal.classList.add('active');
}

/**
 * Open rating modal
 */
function openRatingModal() {
  renderRatingStars();
  ratingModal.classList.add('active');

  ratingForm.onsubmit = async e => {
    e.preventDefault();
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const email = document.getElementById('ratingEmail').value;

    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    await submitRating(selectedExerciseId, rating, email);
    alert('Rating submitted successfully!');
    ratingModal.classList.remove('active');
    ratingForm.reset();
  };
}

/**
 * Render rating stars (1-5)
 */
function renderRatingStars() {
  ratingStars.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const label = document.createElement('label');
    label.className = 'rating-star-label';
    label.innerHTML = `
      <input type="radio" name="rating" value="${i}" ${i === 3 ? 'checked' : ''} />
      <span class="star">★</span>
    `;
    ratingStars.appendChild(label);
  }
}

/**
 * Load and display daily quote
 */
async function loadQuote() {
  const today = new Date().toDateString();
  const cachedQuote = localStorage.getItem('dailyQuote');
  const cachedDate = localStorage.getItem('quoteDate');

  if (cachedQuote && cachedDate === today) {
    displayQuote(JSON.parse(cachedQuote));
    return;
  }

  const quote = await fetchQuote();
  if (quote) {
    localStorage.setItem('dailyQuote', JSON.stringify(quote));
    localStorage.setItem('quoteDate', today);
    displayQuote(quote);
  }
}

/**
 * Display quote on page
 */
function displayQuote(quote) {
  if (quoteText) {
    quoteText.textContent = `"${quote.quote}"`;
    quoteAuthor.textContent = `— ${quote.author}`;
  }
}

/**
 * Load popular exercises for hero section
 */
async function loadPopularTags() {
  const exercises = await fetchExercises({ limit: 5 });
  const tags = exercises.results?.slice(0, 5) || [];

  if (popularTagsList) {
    popularTagsList.innerHTML = '';
    tags.forEach(exercise => {
      const tag = document.createElement('li');
      tag.className = 'popular-tag';
      tag.textContent = exercise.name;
      tag.addEventListener('click', async () => {
        await loadExercises({ keyword: exercise.name });
        exercisesTitle.textContent = `Search Results: ${exercise.name}`;
      });
      popularTagsList.appendChild(tag);
    });
  }
}

/**
 * Toggle favorite exercise
 */
function toggleFavorite(exercise) {
  const index = favorites.findIndex(fav => fav._id === exercise._id);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(exercise);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

/**
 * Render favorites page
 */
function renderFavoritesPage() {
  if (!favoritesList) return;

  if (!favorites.length) {
    emptyState.style.display = 'block';
    favoritesList.innerHTML = '';
    return;
  }

  emptyState.style.display = 'none';
  favoritesList.innerHTML = '';

  favorites.forEach(exercise => {
    const card = document.createElement('div');
    card.className = 'exercise-card';
    card.innerHTML = `
      <div class="exercise-card-header">
        <h3 class="exercise-name">${exercise.name}</h3>
        <button class="delete-btn" data-id="${exercise._id}" aria-label="Remove from favorites">
          🗑️
        </button>
      </div>
      <div class="exercise-info">
        <p><strong>Body Part:</strong> ${exercise.bodyPart}</p>
        <p><strong>Target:</strong> ${exercise.target}</p>
        <p><strong>Calories:</strong> ${exercise.burnedCalories || 'N/A'}</p>
        <p><strong>Rating:</strong> ${exercise.rating?.toFixed(1) || 'N/A'}</p>
      </div>
      <button class="btn-primary btn-start" data-id="${exercise._id}">Start</button>
    `;

    card.querySelector('.delete-btn').addEventListener('click', e => {
      e.stopPropagation();
      favorites = favorites.filter(fav => fav._id !== exercise._id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      card.remove();
      if (!favorites.length) {
        emptyState.style.display = 'block';
      }
    });

    card.querySelector('.btn-start').addEventListener('click', () => {
      openExerciseModal(exercise._id);
    });

    favoritesList.appendChild(card);
  });
}

// ===== Event Listeners =====

/**
 * Search form submission
 */
if (searchForm) {
  searchForm.addEventListener('submit', async e => {
    e.preventDefault();
    currentSearchQuery = searchInput.value.trim();
    currentPage = 1;
    if (currentSearchQuery) {
      await loadExercises({ keyword: currentSearchQuery });
      exercisesTitle.textContent = `Search Results: ${currentSearchQuery}`;
    } else {
      await loadExercises();
    }
  });
}

/**
 * Modal close button
 */
if (modalClose) {
  modalClose.addEventListener('click', () => {
    exerciseModal.classList.remove('active');
  });
}

if (ratingModalClose) {
  ratingModalClose.addEventListener('click', () => {
    ratingModal.classList.remove('active');
  });
}

/**
 * Close modal on backdrop click
 */
if (exerciseModal) {
  exerciseModal.addEventListener('click', e => {
    if (e.target === exerciseModal) {
      exerciseModal.classList.remove('active');
    }
  });
}

if (ratingModal) {
  ratingModal.addEventListener('click', e => {
    if (e.target === ratingModal) {
      ratingModal.classList.remove('active');
    }
  });
}

/**
 * Close modal on Escape key
 */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    exerciseModal.classList.remove('active');
    ratingModal.classList.remove('active');
  }
});

/**
 * Mobile menu toggle
 */
if (burgerBtn && mobileMenu) {
  burgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    burgerBtn.classList.toggle('active');
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      burgerBtn.classList.remove('active');
    });
  });
}

/**
 * Subscribe form
 */
if (subscribeForm) {
  subscribeForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = subscribeEmail.value.trim();

    if (!validateEmail(email)) {
      subscribeMessage.innerHTML =
        '<p style="color: red;">Please enter a valid email address</p>';
      return;
    }

    try {
      await subscribe(email);
      subscribeMessage.innerHTML =
        '<p style="color: green;">Successfully subscribed!</p>';
      subscribeForm.reset();
    } catch (error) {
      subscribeMessage.innerHTML =
        '<p style="color: red;">Subscription failed. Please try again.</p>';
    }
  });
}

// ===== Utility Functions =====

/**
 * Email validation regex
 */
function validateEmail(email) {
  const regex = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return regex.test(email);
}

// ===== Initialization =====

/**
 * Initialize app based on current page
 */
async function init() {
  const currentPage = window.location.pathname;

  if (currentPage.includes('page-2')) {
    // Favorites page
    await loadQuote();
    renderFavoritesPage();
  } else {
    // Home page
    await loadQuote();
    await renderFilters();
    await loadCategories();
    await loadExercises();
    await loadPopularTags();
  }
}

// Start the app
init();
