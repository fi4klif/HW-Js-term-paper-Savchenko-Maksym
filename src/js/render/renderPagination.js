const paginationContainer = document.getElementById('pagination');

export function renderPagination(totalPages, currentPage = 1) {
  let markup = '';

  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }

  markup += `
    <button class="pagination-btn nav-btn" data-page="1" ${currentPage === 1 ? 'disabled' : ''}>«</button>
    <button class="pagination-btn nav-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>‹</button>
  `;

  const delta = 1;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      markup += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    } else if (i === currentPage - delta - 1 || i === currentPage + delta + 1) {
      markup += `<span class="pagination-dots">...</span>`;
    }
  }

  markup += `
    <button class="pagination-btn nav-btn" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}>›</button>
    <button class="pagination-btn nav-btn" data-page="${totalPages}" ${currentPage === totalPages ? 'disabled' : ''}>»</button>
  `;

  paginationContainer.innerHTML = markup;
}