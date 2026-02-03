import { patchRating } from '../api/exercisesApi.js';
import { showSuccess, showError } from '../utils/notifications.js';

const ratingModal = document.getElementById('ratingModal');
const ratingForm = document.getElementById('ratingForm');
const closeBtn = document.getElementById('ratingModalClose');
const starsContainer = document.getElementById('ratingStars');
const ratingValueDisplay = document.getElementById('ratingValueDisplay');

let currentExerciseId = null;

export function initRating() {
  if (!ratingModal || !ratingForm) return;

  closeBtn.addEventListener('click', closeRatingModal);
  ratingModal.addEventListener('click', (e) => {
    if (e.target === ratingModal) closeRatingModal();
  });

  starsContainer.addEventListener('change', (e) => {
    const value = parseInt(e.target.value);
    ratingValueDisplay.textContent = value.toFixed(1);
    updateStarsVisuals(value);
  });
  
  ratingForm.addEventListener('submit', handleRatingSubmit);
}

export function openRatingModal(id) {
  if (!ratingModal) return;
  currentExerciseId = id;
  ratingModal.classList.add('is-open');
  resetRatingForm();
}

function closeRatingModal() {
  ratingModal.classList.remove('is-open');
}

function updateStarsVisuals(rating) {
  const labels = starsContainer.querySelectorAll('.rating-star-label');
  labels.forEach((label, index) => {
    const useTag = label.querySelector('use');
    if (index < rating) {
      useTag.setAttribute('href', './img/icons/star.svg');
    } else {
      useTag.setAttribute('href', './img/icons/zero-star.svg');
    }
  });
}

function resetRatingForm() {
  ratingForm.reset();
  ratingValueDisplay.textContent = '0.0';
  updateStarsVisuals(0); 
}

async function handleRatingSubmit(e) {
  e.preventDefault();

  const formData = new FormData(ratingForm);
  const ratingValue = formData.get('rate');
  const email = formData.get('email');
  const review = formData.get('review');

  if (!ratingValue) {
    showError('Please select a rating');
    return;
  }

  const data = {
    rate: parseInt(ratingValue),
    email: email,
    review: review
  };

  try {
    await patchRating(currentExerciseId, data);
    showSuccess('Thank you for your feedback!');
    closeRatingModal();
  } catch (error) {
    if (error.message.includes('409')) {
       showError('You have already rated this exercise.');
    } else {
       showError('Something went wrong. Please try again.');
    }
  }
}