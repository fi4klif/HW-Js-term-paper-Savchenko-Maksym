import { state } from '../utils/state.js';

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

export function initSearch(onSearch) {
  if (!searchForm || !searchInput) return;

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    state.searchQuery = query;
    state.currentPage = 1;

    if (typeof onSearch === 'function') {
      onSearch();
    }
  });
  
  searchInput.addEventListener('input', (e) => {
     if (e.target.value === '') {
         state.searchQuery = '';
     }
  });
}

export function resetSearch() {
  if (searchInput) {
    searchInput.value = '';
    state.searchQuery = '';
  }
}

export function toggleSearchVisibility(isVisible) {
  if (!searchForm) return;
  
  if (isVisible) {
    searchForm.classList.add('active');
  } else {
    searchForm.classList.remove('active');
  }
}