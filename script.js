/* ============================================
   ART BY JOE — script.js
   Style Tricy Crochet
   ============================================ */

// ── Variables globales ──
const header       = document.getElementById('header');
const burgerMenu   = document.getElementById('burger-menu');
const nav          = document.getElementById('nav');
const navLinks     = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scroll-to-top');
const contactForm  = document.getElementById('contact-form');
const formSuccess  = document.getElementById('form-success');
const filterBtns   = document.querySelectorAll('.filter-btn');
const loader       = document.getElementById('loader');
const cur          = document.getElementById('cur');
const curR         = document.getElementById('cur-r');

// ── LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => {
    if (loader) loader.classList.add('out');
  }, 1800);
});

// ── CURSEUR PERSONNALISÉ ──
document.addEventListener('mousemove', e => {
  if (cur)  { cur.style.left  = e.clientX + 'px'; cur.style.top  = e.clientY + 'px'; }
  if (curR) { curR.style.left = e.clientX + 'px'; curR.style.top = e.clientY + 'px'; }
});
document.querySelectorAll('a, button, .gallery-item-inner, .filter-btn, .prod-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
});

// ── HEADER SCROLL ──
window.addEventListener('scroll', () => {
  header && header.classList.toggle('scrolled', window.scrollY > 100);
});

// ── MENU MOBILE ──
function toggleMobileMenu() {
  burgerMenu.classList.toggle('active');
  nav.classList.toggle('active');
  document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
}
if (burgerMenu) burgerMenu.addEventListener('click', toggleMobileMenu);

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('active')) toggleMobileMenu();
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

document.addEventListener('click', e => {
  if (nav && nav.classList.contains('active') && !nav.contains(e.target) && !burgerMenu.contains(e.target)) {
    toggleMobileMenu();
  }
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') { e.preventDefault(); return; }
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 80;
      window.scrollTo({ top: target.offsetTop - headerH, behavior: 'smooth' });
    }
  });
});

// ── ANIMATIONS AU SCROLL ──
function animateOnScroll() {
  const elements = document.querySelectorAll(
    '.gallery-item, .feature-item, .about-image, .about-content, ' +
    '.contact-info, .contact-form-wrapper, .prod-card, .gal-category, .stat-item'
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}
window.addEventListener('load', animateOnScroll);

// ── FILTRES GALERIE ──
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    const categories = document.querySelectorAll('.gal-category');
    categories.forEach(cat => {
      if (filter === 'all' || cat.dataset.cat === filter) {
        cat.classList.remove('hidden');
        cat.style.opacity = '0';
        cat.style.transform = 'translateY(20px)';
        setTimeout(() => {
          cat.style.transition = 'opacity .4s ease, transform .4s ease';
          cat.style.opacity = '1';
          cat.style.transform = 'translateY(0)';
        }, 50);
      } else {
        cat.classList.add('hidden');
      }
    });
  });
});

// ── SCROLL TO TOP ──
window.addEventListener('scroll', () => {
  scrollTopBtn && scrollTopBtn.classList.toggle('show', window.scrollY > 500);
});
scrollTopBtn && scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── PARALLAXE HERO ──
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-image');
  if (hero) {
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
  }
}, { passive: true });

// ── FORMULAIRE CONTACT ──
// ── FORMULAIRE CONTACT ──
if (contactForm) {
    let lastSubmit = 0;
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const now = Date.now();
      if (now - lastSubmit < 5000) { alert('Veuillez attendre quelques secondes.'); return; }
  
      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
  
      if (!name || !email || !message) { alert('Veuillez remplir tous les champs obligatoires.'); return; }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) { alert('Veuillez entrer une adresse email valide.'); return; }
  
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<span>Envoi en cours...</span>';
      submitBtn.disabled = true;
      lastSubmit = now;
  
      try {
        const res = await fetch('http://localhost:3000/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message })
        });
  
        if (res.ok) {
          contactForm.style.display = 'none';
          if (formSuccess) formSuccess.classList.add('show');
          contactForm.reset();
          setTimeout(() => {
            contactForm.style.display = 'flex';
            if (formSuccess) formSuccess.classList.remove('show');
          }, 5000);
        } else {
          alert('Erreur lors de l\'envoi. Réessayez.');
        }
      } catch (err) {
        alert('Impossible de joindre le serveur. Vérifiez que le backend tourne.');
      } finally {
        submitBtn.innerHTML = '<span>Envoyer le message</span><span>✈</span>';
        submitBtn.disabled = false;
      }
    });
  }

// ── COMPTEURS STATS ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target || 0);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const update = () => {
    current += step;
    if (current < target) {
      el.textContent = Math.floor(current) + suffix;
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  };
  update();
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-n').forEach(animateCounter);
      statsObserver.disconnect();
    }
  });
}, { threshold: .5 });
const statsBand = document.querySelector('.stats-band');
if (statsBand) statsObserver.observe(statsBand);

// ── TOUCHE ECHAP ──
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nav && nav.classList.contains('active')) toggleMobileMenu();
});

// ── PAGE FADE IN ──
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

console.log('%c✿ Art by Joe — Macramé Artisanal · Bénin 🇧🇯', 'color: #FF1493; font-size: 18px; font-weight: bold;');