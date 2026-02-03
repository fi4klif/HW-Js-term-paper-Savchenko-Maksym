const exercisesList = document.getElementById('exercisesList');

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function renderExercises(exercises) {
  if (!exercisesList) return;

  if (exercises.length === 0) {
    exercisesList.innerHTML = '<p class="no-results">No exercises found.</p>';
    return;
  }

  const markup = exercises.map(({ _id, rating, name, burnedCalories, bodyPart, target }) => {
    return `
      <div class="exercise-card">
        <div class="exercise-header">
          <div class="exercise-badge">WORKOUT</div>
          <div class="exercise-rating">
            <span>${rating.toFixed(1)}</span>
            <svg class="icon-star" width="18" height="18">
              <use href="./img/icons/star.svg"></use> 
            </svg>
          </div>
          <button class="exercise-start-btn" data-id="${_id}">
            Start
            <svg class="icon-arrow" width="16" height="16">
               <use href="./img/menu/arrow.svg"></use>
            </svg>
          </button>
        </div>

        <div class="exercise-title-row">
          <div class="icon-wrapper">
             <svg width="24" height="24">
               <use href="./img/icons/men-run-black.svg"></use>
             </svg>
          </div>
          <h3 class="exercise-title">${capitalize(name)}</h3>
        </div>

        <ul class="exercise-info">
          <li><span>Burned calories:</span> ${burnedCalories} / 3 min</li>
          <li><span>Body part:</span> ${capitalize(bodyPart)}</li>
          <li><span>Target:</span> ${capitalize(target)}</li>
        </ul>
      </div>
    `;
  }).join('');

  exercisesList.innerHTML = markup;
}