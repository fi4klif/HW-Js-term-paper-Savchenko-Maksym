import { fetchExerciseById } from '../api/exercisesApi.js';
import { openRatingModal } from './rating.js';

const modal = document.getElementById('exerciseModal');
const modalCloseBtn = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody'); 

const LS_KEY_FAVORITES = 'favorites';

function onEscClick(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

export async function openExerciseModal(id) {
  if (!modal) return;

  modalBody.innerHTML = '<div class="loader" style="text-align:center; color:white; padding: 20px;">Loading...</div>';
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  
  window.addEventListener('keydown', onEscClick);

  const exercise = await fetchExerciseById(id);

  if (!exercise) {
    modalBody.innerHTML = '<p style="color:white; text-align:center;">Error loading details</p>';
    return;
  }

  renderModalContent(exercise);
  setupModalListeners(exercise);
}

function closeModal() {
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
  window.removeEventListener('keydown', onEscClick);
}

function renderModalContent(exercise) {
  const { _id, gifUrl, name, rating, target, bodyPart, equipment, popularity, burnedCalories, time, description } = exercise;

  const favorites = JSON.parse(localStorage.getItem(LS_KEY_FAVORITES)) || [];
  const isFavorite = favorites.some(item => item._id === _id);

  let starsMarkup = '';
  const roundedRating = Math.round(rating);

  for (let i = 1; i <= 5; i++) {
    const starIcon = i <= roundedRating ? './img/icons/star.svg' : './img/icons/zero-star.svg';
    
    starsMarkup += `
      <svg width="18" height="18">
         <use href="${starIcon}"></use>
      </svg>
    `;
  }

  modalBody.innerHTML = `
    <div class="modal-inner-flex"> 
      <div class="modal-gif-wrapper">
        <img src="${gifUrl}" alt="${name}" class="modal-gif" />
      </div>

      <div class="modal-right-side">
        <h3 class="modal-title">${name}</h3>
        
        <div class="modal-rating-wrapper">
          <span class="modal-rating-value">${rating.toFixed(1)}</span>
          ${starsMarkup}
        </div>

        <div class="modal-divider"></div>

        <div class="modal-details-list">
          <div class="modal-details-item">
            <span class="modal-details-label">Target</span>
            <span class="modal-details-value">${target}</span>
          </div>
          <div class="modal-details-item">
            <span class="modal-details-label">Body Part</span>
            <span class="modal-details-value">${bodyPart}</span>
          </div>
          <div class="modal-details-item">
            <span class="modal-details-label">Equipment</span>
            <span class="modal-details-value">${equipment}</span>
          </div>
          <div class="modal-details-item">
            <span class="modal-details-label">Popular</span>
            <span class="modal-details-value">${popularity}</span>
          </div>
          <div class="modal-details-item">
            <span class="modal-details-label">Burned Calories</span>
            <span class="modal-details-value">${burnedCalories}/${time} min</span>
          </div>
        </div>

        <div class="modal-divider"></div>

        <p class="modal-description">${description}</p>
      </div>
    </div>

    <div class="modal-buttons">
      <button class="btn-favorites ${isFavorite ? 'is-favorite' : ''}" id="btnAddToFavorites">
        <span>${isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
        <svg width="18" height="18">
            <use href="./img/menu/heart.svg"></use> 
        </svg>
      </button>
      
      <button class="btn-rating" id="btnGiveRating">
        Give a rating
      </button>
    </div>
  `;
}

function setupModalListeners(exercise) {
  const btnFav = document.getElementById('btnAddToFavorites');
  
  if (btnFav) {
    btnFav.addEventListener('click', () => {
      const favorites = JSON.parse(localStorage.getItem(LS_KEY_FAVORITES)) || [];
      const index = favorites.findIndex(item => item._id === exercise._id);

      if (index === -1) {
        favorites.push(exercise);
        btnFav.querySelector('span').textContent = 'Remove from favorites';
        btnFav.classList.add('is-favorite');
      } else {
        favorites.splice(index, 1);
        btnFav.querySelector('span').textContent = 'Add to favorites';
        btnFav.classList.remove('is-favorite');
      }

      localStorage.setItem(LS_KEY_FAVORITES, JSON.stringify(favorites));
    });
  }

  const btnRate = document.getElementById('btnGiveRating');
  if (btnRate) {
    btnRate.addEventListener('click', () => {
        closeModal();
        openRatingModal(exercise._id);
    });
  }
}

export function initModal() {
  if (!modal) return;
  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}