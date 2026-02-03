import { initFilterListeners, handleFilters, handleLoadExercises } from './js/ui/filters.js';
import { initPaginationListeners } from './js/ui/pagination.js';
import { initSearch, toggleSearchVisibility } from './js/ui/search.js';
import { initQuote } from './js/ui/quote.js';
import { initModal, openExerciseModal } from './js/ui/modal.js';
import { initRating } from './js/ui/rating.js';
import { initFooter } from './js/ui/footer.js';
import { initFavorites } from './js/ui/favorites.js';
import { initHeader } from './js/ui/header.js';
import { initMobileMenu } from './js/ui/mobile-menu.js';
import { initHeaderActive } from './js/ui/header-active.js';

/* Initialization */
initHeaderActive();
initMobileMenu();
initHeader();
initQuote();
initSearch(handleLoadExercises);
initFilterListeners();
initPaginationListeners();
initModal();
initRating();
initFooter(); 
initFavorites();

/* Initial State */
toggleSearchVisibility(false);

/* First Render */
const categoriesList = document.getElementById('categoriesList');
if (categoriesList) {
    handleFilters();
}

/* Global Listeners */
const exercisesList = document.getElementById('exercisesList');
if (exercisesList) {
  exercisesList.addEventListener('click', (e) => {
    const btn = e.target.closest('.exercise-start-btn');
    if (btn) {
      const id = btn.dataset.id;
      openExerciseModal(id);
    }
  });
}