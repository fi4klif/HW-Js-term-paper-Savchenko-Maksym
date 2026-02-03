export function initMobileMenu() {
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('mobileMenuCloseBtn');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!burgerBtn || !mobileMenu || !closeBtn) return;

  burgerBtn.addEventListener('click', () => {
    mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden'; 
  });

  const closeMenu = () => {
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = ''; 
  };

  closeBtn.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}