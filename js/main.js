// ============================================
// PORTFOLIO — Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initActiveNav();
  initTypewriter();
  initScrollReveal();
  initProjectFilter();
  initContactForm();
  initCertModal();
});

// ============================================
// NAVBAR — glass effect on scroll
// ============================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load in case page is already scrolled
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu      = document.querySelector('.navbar-menu');
  if (!hamburger || !menu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close when a nav link is clicked
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on backdrop click
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('open') &&
        !menu.contains(e.target) &&
        !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  function closeMenu() {
    menu.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ============================================
// ACTIVE NAV LINK — highlight current page
// ============================================
function initActiveNav() {
  const page  = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');

  links.forEach(link => {
    const href = link.getAttribute('href');
    const isHome = (page === '' || page === 'index.html') && (href === 'index.html' || href === './');
    const isMatch = href === page;

    // Don't add active class to the CTA button (Contact)
    if ((isHome || isMatch) && !link.classList.contains('nav-cta')) {
      link.classList.add('active');
    }
  });
}

// ============================================
// TYPEWRITER EFFECT
// ============================================
function initTypewriter() {
  const textEl = document.querySelector('.typewriter-text');
  if (!textEl) return;

  const roles = [
    'Frontend Developer',
    'UI/UX Designer',
    'Backend Engineer',
    'Laravel Developer',
    'AI App Builder'
  ];

  let roleIdx    = 0;
  let charIdx    = 0;
  let deleting   = false;
  let paused     = false;

  function tick() {
    if (paused) return;

    const current = roles[roleIdx];

    if (!deleting) {
      charIdx++;
      textEl.textContent = current.substring(0, charIdx);

      if (charIdx === current.length) {
        // Finished typing → wait 2s then delete
        paused = true;
        setTimeout(() => {
          deleting = true;
          paused   = false;
          setTimeout(tick, 80);
        }, 2200);
        return;
      }
      setTimeout(tick, 90 + Math.random() * 40); // slight variability for realism

    } else {
      charIdx--;
      textEl.textContent = current.substring(0, charIdx);

      if (charIdx === 0) {
        deleting = false;
        roleIdx  = (roleIdx + 1) % roles.length;
        setTimeout(tick, 400); // brief pause before next word
        return;
      }
      setTimeout(tick, 55);
    }
  }

  // Start after hero animation
  setTimeout(tick, 1600);
}

// ============================================
// SCROLL REVEAL — Intersection Observer
// ============================================
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // fire once
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(el => observer.observe(el));
}

// ============================================
// PROJECT FILTER (Projects page only)
// ============================================
function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards   = document.querySelectorAll('.project-card');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Toggle active button
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show / hide cards and toggle wide layout for figma/uiux projects
      cards.forEach(card => {
        const categories = card.dataset.category || '';
        const visible = filter === 'all' || categories.includes(filter);
        card.classList.toggle('hidden', !visible);

        // If 'all' is selected, standard card layout is used (remove figma-wide)
        // If 'uiux' filter is selected, make UI/UX cards wide
        if (card.id === 'project-figma-mobile') {
          if (filter === 'uiux') {
            card.classList.add('figma-wide');
          } else {
            card.classList.remove('figma-wide');
          }
        }

        // Re-trigger reveal animation
        if (visible) {
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 50);
        }
      });
    });
  });
}

// ============================================
// CONTACT FORM — mailto fallback
// ============================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = (form.querySelector('#name')?.value    || '').trim();
    const email   = (form.querySelector('#email')?.value   || '').trim();
    const subject = (form.querySelector('#subject')?.value || '').trim();
    const message = (form.querySelector('#message')?.value || '').trim();

    if (!name || !email || !message) return;

    // TODO: Replace 'your.email@example.com' with your actual email address
    const mailto = `mailto:your.email@example.com`
      + `?subject=${encodeURIComponent(subject || `Portfolio Contact from ${name}`)}`
      + `&body=${encodeURIComponent(`Hi,\n\nName: ${name}\nEmail: ${email}\n\n${message}\n\nSent via portfolio contact form.`)}`;

    window.location.href = mailto;

    // Show success message
    const successEl = document.getElementById('form-success');
    if (successEl) {
      successEl.style.display = 'block';
      setTimeout(() => { successEl.style.display = 'none'; }, 5000);
    }

    form.reset();
  });
}

// ============================================
// CERTIFICATE MODAL
// ============================================
function initCertModal() {
  const modal          = document.getElementById('certModal');
  const closeBtn       = document.getElementById('closeCertModal');
  const frame          = document.getElementById('certFrame');
  const modalTitle     = document.getElementById('modalTitle');
  const openNewBtn     = document.getElementById('certModalOpenNew');
  const downloadBtn    = document.getElementById('certModalDownload');
  const openButtons    = document.querySelectorAll('.open-cert-modal');

  if (!modal || !frame) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const pdfFile  = btn.dataset.pdf;
      const pdfTitle = btn.dataset.title || 'Certificate Preview';

      if (!pdfFile) return;

      if (modalTitle) modalTitle.textContent = pdfTitle;
      frame.src = pdfFile;

      if (openNewBtn) {
        openNewBtn.href = pdfFile;
      }

      if (downloadBtn) {
        downloadBtn.href = pdfFile;
      }

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // delay resetting src so animation finishes cleanly
    setTimeout(() => {
      frame.src = 'about:blank';
    }, 200);
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

