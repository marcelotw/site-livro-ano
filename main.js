/* =============================================
   CLUBE DO LIVRO — Interaction & Animation JS
   ============================================= */

'use strict';

// === Intersection Observer for scroll animations ===
(function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.animate-fade-up, .animate-fade-in'
  );

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
})();


// === Nav scroll effect (add shadow on scroll) ===
(function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const onScroll = () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 4px 32px rgba(0,0,0,0.4)'
      : 'none';
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();


// === Mobile menu toggle ===
(function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  const toggleMenu = () => {
    const isActive = toggle.classList.toggle('is-active');
    links.classList.toggle('is-active');
    toggle.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  };

  toggle.addEventListener('click', toggleMenu);

  // Close menu when clicking a link
  links.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      if (links.classList.contains('is-active')) {
        toggleMenu();
      }
    });
  });
})();


// === Smooth anchor links ===
(function initSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      if (!targetId || targetId === 'inicio') return;
      
      const target = document.getElementById(targetId);
      if (!target) return;
      
      e.preventDefault();
      const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


// === FAQ — close others when one opens ===
(function initFaq() {
  const details = document.querySelectorAll('.faq-item');
  details.forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (detail.open) {
        details.forEach((other) => {
          if (other !== detail) other.open = false;
        });
      }
    });
  });
})();


// === Mockup progress bar animation ===
(function initMockupAnimation() {
  const bar = document.querySelector('.mockup-bar-fill');
  if (!bar) return;

  const animateBar = () => {
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.transition = 'width 1.5s ease';
      bar.style.width = '65%';
    }, 600);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateBar();
        observer.disconnect();
      }
    },
    { threshold: 0.5 }
  );

  const phone = document.querySelector('.mockup-phone');
  if (phone) observer.observe(phone);
})();
