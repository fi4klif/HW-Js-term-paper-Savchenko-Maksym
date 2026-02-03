
export function initHeader() {
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const currentPath = window.location.pathname; 

  const setActiveLink = (links) => {
    links.forEach(link => {
      const href = link.getAttribute('href').replace('./', '');
      
      
      const isHome = (currentPath === '/' || currentPath.endsWith('index.html')) && href === 'index.html';
      const isCurrentPage = currentPath.endsWith(href);

      if (isHome || (href !== 'index.html' && isCurrentPage)) {
        link.classList.add('nav-link-active');
      } else {
        link.classList.remove('nav-link-active');
      }
    });
  };

  setActiveLink(navLinks);
  setActiveLink(mobileNavLinks);
}