const categoriesList = document.getElementById('categoriesList');

export function renderCategories(categories) {
  if (!categories || categories.length === 0) return;

  const markup = categories.map((category) => {
    const { filter, name, imgUrl, imgURL } = category;
    const imageSrc = imgUrl || imgURL;
    const style = `background: linear-gradient(0deg, rgba(17, 17, 17, 0.5), rgba(17, 17, 17, 0.5)), url('${imageSrc}') center/cover no-repeat;`;

    return `
      <li class="category-card" style="${style}" data-name="${name}" data-filter="${filter}">
        <div class="category-content">
            <h3 class="category-name">${name}</h3>
            <p class="category-type">${filter}</p>
        </div>
      </li>
    `;
  }).join('');

  categoriesList.innerHTML = markup;
}