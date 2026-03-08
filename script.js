/* ══════════════════════════════════════════════════════
   eNTRUST Data Governance — JavaScript
   ══════════════════════════════════════════════════════ */

/* ── Navbar: scroll effect ── */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveNavLink();
});

/* ── Mobile menu toggle ── */
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

/* Close menu when a link is clicked */
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

/* Close menu on outside click */
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  }
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveNavLink() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

/* ── State of the Art: pillar tabs ── */
const sotaTabs = document.querySelectorAll('.sota-tab');
const sotaRows = document.querySelectorAll('.sota-table tbody tr');

sotaTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    sotaTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const pillar = tab.dataset.pillar;
    sotaRows.forEach(row => {
      const show = pillar === 'all' || row.dataset.pillar === pillar;
      row.classList.toggle('hidden', !show);
    });
  });
});

/* ── Publications: filter buttons ── */
const pubFilters = document.querySelectorAll('.pub-filter');
const pubCards   = document.querySelectorAll('.pub-card');

pubFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    pubFilters.forEach(f => f.classList.remove('active'));
    filter.classList.add('active');

    const val = filter.dataset.filter;
    pubCards.forEach(card => {
      const show = val === 'all' || card.dataset.filter === val;
      card.classList.toggle('hidden', !show);
    });
  });
});

/* ── Smooth reveal on scroll (IntersectionObserver) ── */
const revealTargets = document.querySelectorAll(
  '.pillar-card, .pub-card, .tool-card, .team-card, .stat, .interconnect-box'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

/* ── Smooth scroll offset fix for fixed nav ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 20;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
