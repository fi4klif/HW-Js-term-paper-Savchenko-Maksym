import { renderFavoritesMarkup } from '../render/renderFavorites.js';
import { renderPagination } from '../render/renderPagination.js';
import { openExerciseModal } from './modal.js';

const favoritesList = document.getElementById('favoritesList');
const favoritesEmpty = document.getElementById('favoritesEmpty');
const paginationContainer = document.getElementById('pagination');

const LS_KEY_FAVORITES = 'favorites';
const ITEMS_PER_PAGE_MOBILE = 8; 

let currentPage = 1;

export function initFavorites() {
  if (!favoritesList) return; 

  loadFavorites();

  favoritesList.addEventListener('click', handleListClick);
  
  if (paginationContainer) {
    paginationContainer.addEventListener('click', handlePaginationClick);
  }

  window.addEventListener('resize', () => {
    loadFavorites();
  });
}

function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem(LS_KEY_FAVORITES)) || [];

  if (favorites.length === 0) {
    favoritesList.innerHTML = '';
    favoritesList.style.display = 'none';
    if (favoritesEmpty) favoritesEmpty.style.display = 'block';
    if (paginationContainer) paginationContainer.innerHTML = '';
    return;
  }

  if (favoritesEmpty) favoritesEmpty.style.display = 'none';
  favoritesList.style.display = 'grid';

  const isDesktop = window.innerWidth >= 1440; 
  
  let itemsToRender = favorites;
  
  if (isDesktop) {
    if (paginationContainer) paginationContainer.innerHTML = '';
  } else {
    const totalPages = Math.ceil(favorites.length / ITEMS_PER_PAGE_MOBILE);
    
    if (currentPage > totalPages) {
      currentPage = totalPages || 1;
    }

    const start = (currentPage - 1) * ITEMS_PER_PAGE_MOBILE;
    const end = start + ITEMS_PER_PAGE_MOBILE;
    itemsToRender = favorites.slice(start, end);

    if (totalPages > 1) {
      renderPagination(totalPages, currentPage);
    } else {
      if (paginationContainer) paginationContainer.innerHTML = '';
    }
  }

  renderFavoritesMarkup(itemsToRender);
}

function handleListClick(e) {
  const removeBtn = e.target.closest('.exercise-remove-btn');
  const startBtn = e.target.closest('.exercise-start-btn');

  if (removeBtn) {
    e.preventDefault(); 
    const id = removeBtn.dataset.id;
    removeFavorite(id);
    return;
  }

  if (startBtn) {
    e.preventDefault();
    const id = startBtn.dataset.id;
    openExerciseModal(id);
  }
}

function removeFavorite(id) {
  const favorites = JSON.parse(localStorage.getItem(LS_KEY_FAVORITES)) || [];
  const newFavorites = favorites.filter(item => item._id !== id);
  localStorage.setItem(LS_KEY_FAVORITES, JSON.stringify(newFavorites));
  
  const totalPages = Math.ceil(newFavorites.length / ITEMS_PER_PAGE_MOBILE);
  if (currentPage > totalPages && currentPage > 1) {
      currentPage = totalPages;
  }

  loadFavorites();
}

function handlePaginationClick(e) {
  const btn = e.target.closest('.pagination-btn');
  if (!btn || btn.disabled || btn.classList.contains('active')) return;

  const newPage = Number(btn.dataset.page);
  if (newPage) {
    currentPage = newPage;
    loadFavorites();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}