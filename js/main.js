'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initPortraitImages();
  initSmoothScroll();
});


// ── Navigation ────────────────────────────────────────────────

function initNav() {
  const nav    = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav__link');

  // Solid background on scroll
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
    updateActiveLink(navLinks);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // Mobile hamburger
  toggle?.addEventListener('click', () => {
    const open = toggle.classList.toggle('is-open');
    links?.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Close mobile nav when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle?.classList.remove('is-open');
      links?.classList.remove('is-open');
      document.body.style.overflow = '';
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });
}

function updateActiveLink(navLinks) {
  const sections = document.querySelectorAll('section[id]');
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href')?.replace('#', '');
    link.classList.toggle('is-active', href === current);
  });
}


// ── Scroll Reveal ─────────────────────────────────────────────

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}


// ── Portrait image loading ────────────────────────────────────

function initPortraitImages() {
  const portraits = document.querySelectorAll(
    '.hero__portrait-img, .about__portrait-img'
  );

  portraits.forEach(img => {
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add('is-loaded');
    } else {
      img.addEventListener('load',  () => img.classList.add('is-loaded'));
      img.addEventListener('error', () => img.remove());
    }
  });
}


// ── Smooth Scroll (JS fallback for older browsers) ────────────

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
