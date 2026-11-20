(() => {
  'use strict';

  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');

  // Theme preference is optional; the page still works when storage is unavailable.
  try {
    const savedTheme = localStorage.getItem('soren-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;
  } catch (_) {}

  const updateThemeIcon = () => {
    if (!themeButton) return;
    const icon = themeButton.querySelector('i');
    if (icon) icon.className = root.dataset.theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  };
  updateThemeIcon();
  themeButton?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('soren-theme', root.dataset.theme); } catch (_) {}
    updateThemeIcon();
  });

  menuButton?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('open') ?? false;
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    const icon = menuButton.querySelector('i');
    if (icon) icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
    const icon = menuButton?.querySelector('i');
    if (icon) icon.className = 'fa-solid fa-bars';
  }));

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle('active', item === button));
    projectCards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
  }));

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('is-visible'));

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    // Replace this address with the owner's confirmed email before publishing.
    const recipient = 'sorenshamlou@gmail.com';
    const data = new FormData(form);
    const subject = encodeURIComponent(String(data.get('subject') || 'Portfolio inquiry'));
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
    if (recipient === 'sorenshamlou@gmail.com') {
      if (status) status.textContent = 'Email is not configured yet. Please contact me through Telegram';
      return;
    }
    if (status) status.textContent = 'Opening your email application…';
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
