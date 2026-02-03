export function initHeaderActive() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    link.classList.remove('nav-link-active');
    link.style.color = '';

    const linkHref = link.getAttribute('href');

    if (
      (currentPath.endsWith('/') && linkHref.includes('index.html')) ||
      (currentPath.includes('index.html') && linkHref.includes('index.html')) ||
      (currentPath.includes('page-2.html') && linkHref.includes('page-2.html'))
    ) {
      if (link.classList.contains('nav-link')) {
        link.classList.add('nav-link-active');
      } else {
        link.style.color = '#F4F4F4';
      }
    }
  });
}