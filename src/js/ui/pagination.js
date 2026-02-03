import { state } from '../utils/state.js';
import { handleFilters, handleLoadExercises } from './filters.js';

const paginationContainer = document.getElementById('pagination');
const exercisesList = document.getElementById('exercisesList');
const categoriesList = document.getElementById('categoriesList');

export function initPaginationListeners() {
  if (!paginationContainer) return;

  paginationContainer.addEventListener('click', (e) => {
    if (!exercisesList && !categoriesList) return;

    const btn = e.target.closest('.pagination-btn');
    if (!btn || btn.disabled || btn.classList.contains('active')) return;

    const newPage = Number(btn.dataset.page);
    
    if (newPage) {
      state.currentPage = newPage;
      
      if (exercisesList && exercisesList.style.display !== 'none') {
        handleLoadExercises();
      } else {
        handleFilters();
      }
      
      const filtersSection = document.querySelector('.exercises-section');
      if (filtersSection) {
        filtersSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
} 