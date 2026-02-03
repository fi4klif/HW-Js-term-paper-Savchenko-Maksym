const favoritesList = document.getElementById('favoritesList');

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function renderFavoritesMarkup(exercises) {
  if (!favoritesList) return;

  if (!exercises || exercises.length === 0) {
    favoritesList.innerHTML = `
      <div class="favorites-empty">
        <p class="favorites-empty-text">It appears that you haven't added any exercises to your favorites yet...</p>
        <a href="./index.html" class="favorites-link">To the exercises</a>
      </div>
    `;
    return;
  }

  const markup = exercises.map(({ _id, name, burnedCalories, bodyPart, target }) => {
    return `
      <div class="exercise-card">
        <div class="exercise-header">
          <div class="exercise-badge">WORKOUT</div>
          
          <button class="exercise-remove-btn" data-id="${_id}">
            <svg aria-label="Remove">
              <use href="./img/icons/trash.svg"></use>
              </svg>
          </button>

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

  favoritesList.innerHTML = markup;
}