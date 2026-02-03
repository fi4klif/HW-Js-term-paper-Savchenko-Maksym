import { fetchFilters } from '../api/filtersApi.js';
import { fetchExercises } from '../api/exercisesApi.js';
import { renderCategories } from '../render/renderCategories.js';
import { renderExercises } from '../render/renderExercises.js';
import { renderPagination } from '../render/renderPagination.js';
import { state } from '../utils/state.js';
import { resetSearch, toggleSearchVisibility } from './search.js';

const filterButtons = document.getElementById('filterButtons');
const exercisesCategory = document.getElementById('exercisesCategory');
const categoriesList = document.getElementById('categoriesList');
const exercisesList = document.getElementById('exercisesList');
const exercisesHeaderWrapper = document.querySelector('.exercises-header-wrapper');

export async function handleFilters() {
  const data = await fetchFilters(state.currentFilter, state.currentPage, state.limit);

  if (exercisesCategory) exercisesCategory.textContent = '';
  
  if (categoriesList) categoriesList.style.display = 'grid';
  if (exercisesList) exercisesList.style.display = 'none';

  toggleSearchVisibility(false);

  if (data) {
    state.totalPages = data.totalPages;
    renderCategories(data.results);
    renderPagination(state.totalPages, state.currentPage);
    initCategoryCardListeners();
  }
}

function initCategoryCardListeners() {
  const cards = document.querySelectorAll('.category-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const categoryName = card.dataset.name;
      const filter = card.dataset.filter;

      state.activeCategory = categoryName;
      state.activeCategoryFilter = filter;
      state.currentPage = 1; 
      
      if (categoriesList) categoriesList.style.display = 'none';
      if (exercisesList) exercisesList.style.display = 'grid';
      if (exercisesCategory) exercisesCategory.textContent = ` / ${categoryName}`;
      
      toggleSearchVisibility(true);
      handleLoadExercises();
    });
  });
}

export async function handleLoadExercises() {
  const data = await fetchExercises(
    state.activeCategoryFilter, 
    state.activeCategory, 
    state.searchQuery, 
    state.currentPage, 
    state.limit 
  );

  if (data) {
    state.totalPages = data.totalPages;
    renderExercises(data.results);
    renderPagination(state.totalPages, state.currentPage);
    
    if (exercisesHeaderWrapper) {
       exercisesHeaderWrapper.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

export function initFilterListeners() {
  if (!filterButtons) return;

  filterButtons.addEventListener('click', async (e) => {
    if (e.target.classList.contains('filter-btn')) {
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');

      const newFilter = e.target.dataset.filter;
      state.currentFilter = newFilter;
      state.currentPage = 1;
      
      resetSearch();
      state.activeCategory = ''; 
      
      await handleFilters();
    }
  });
}