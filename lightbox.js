/* ============================================================
   LIGHTBOX — Art by Joe
   Clic sur image → visionneuse plein écran
   Navigation clavier + boutons prev/next
   ============================================================ */

(function () {
  'use strict';

  // ── Créer le DOM de la lightbox ─────────────────────────────
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Visionneuse d\'image');
  lb.innerHTML = `
    <div class="lightbox-container">
      <img class="lightbox-img" src="" alt="" draggable="false"/>
      <div class="lightbox-caption">
        <h3 class="lb-title"></h3>
        <p class="lb-cat"></p>
      </div>
    </div>
    <button class="lightbox-close" aria-label="Fermer">✕</button>
    <button class="lightbox-prev" aria-label="Précédent">‹</button>
    <button class="lightbox-next" aria-label="Suivant">›</button>
    <div class="lightbox-counter"></div>
    <div class="lightbox-bar" style="width:0"></div>
  `;
  document.body.appendChild(lb);

  // ── Références éléments ────────────────────────────────────
  const lbImg     = lb.querySelector('.lightbox-img');
  const lbTitle   = lb.querySelector('.lb-title');
  const lbCat     = lb.querySelector('.lb-cat');
  const lbClose   = lb.querySelector('.lightbox-close');
  const lbPrev    = lb.querySelector('.lightbox-prev');
  const lbNext    = lb.querySelector('.lightbox-next');
  const lbCounter = lb.querySelector('.lightbox-counter');
  const lbBar     = lb.querySelector('.lightbox-bar');

  // ── Données images ─────────────────────────────────────────
  let images = [];   // [{src, title, cat}]
  let current = 0;

  function collectImages() {
    images = [];

    // Galerie
    document.querySelectorAll('.gallery-item-inner').forEach(item => {
      const img   = item.querySelector('img');
      const h3    = item.querySelector('.gallery-overlay h3');
      const p     = item.querySelector('.gallery-overlay p');
      if (img) images.push({
        src:   img.src,
        alt:   img.alt,
        title: h3 ? h3.textContent : (img.alt || ''),
        cat:   p  ? p.textContent  : ''
      });
    });

    // Boutique
    document.querySelectorAll('.prod-img').forEach(item => {
      const img  = item.querySelector('img');
      const card = item.closest('.prod-card');
      const name = card ? card.querySelector('.prod-name') : null;
      const cat  = card ? card.querySelector('.prod-cat')  : null;
      if (img) images.push({
        src:   img.src,
        alt:   img.alt,
        title: name ? name.textContent : (img.alt || ''),
        cat:   cat  ? cat.textContent  : 'Boutique'
      });
    });
  }

  // ── Ouvrir ─────────────────────────────────────────────────
  function open(index) {
    collectImages();
    if (!images.length) return;
    current = ((index % images.length) + images.length) % images.length;
    render();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbImg.focus();
  }

  function render() {
    const d = images[current];
    lbImg.src = d.src;
    lbImg.alt = d.alt || d.title;
    lbTitle.textContent = d.title;
    lbCat.textContent   = d.cat;
    lbCounter.textContent = `${current + 1} / ${images.length}`;
    lbBar.style.width   = `${((current + 1) / images.length) * 100}%`;

    // Cacher les flèches si 1 seule image
    lbPrev.style.display = images.length > 1 ? '' : 'none';
    lbNext.style.display = images.length > 1 ? '' : 'none';

    // Micro-animation de transition
    lbImg.style.opacity = '0';
    lbImg.style.transform = 'scale(.96)';
    requestAnimationFrame(() => {
      lbImg.style.transition = 'opacity .25s ease, transform .25s ease';
      lbImg.style.opacity = '1';
      lbImg.style.transform = 'scale(1)';
    });
  }

  // ── Fermer ─────────────────────────────────────────────────
  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lbImg.src = ''; }, 350);
  }

  // ── Navigation ─────────────────────────────────────────────
  function prev() { current = (current - 1 + images.length) % images.length; render(); }
  function next() { current = (current + 1) % images.length; render(); }

  // ── Événements boutons ─────────────────────────────────────
  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click',  prev);
  lbNext.addEventListener('click',  next);

  // Clic sur l'overlay (fond) → ferme
  lb.addEventListener('click', e => {
    if (e.target === lb) close();
  });

  // ── Clavier ────────────────────────────────────────────────
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    switch (e.key) {
      case 'Escape':     close(); break;
      case 'ArrowLeft':  prev();  break;
      case 'ArrowRight': next();  break;
    }
  });

  // ── Swipe mobile ───────────────────────────────────────────
  let touchStartX = 0;
  lb.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  });

  // ── Attacher les clics aux images ──────────────────────────
  function attachClicks() {
    // Galerie
    document.querySelectorAll('.gallery-item-inner').forEach((item, i) => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        collectImages();
        // Trouver l'index exact de cette image dans images[]
        const img = item.querySelector('img');
        const idx = images.findIndex(d => d.src === img.src);
        open(idx >= 0 ? idx : i);
      });
    });

    // Boutique
    document.querySelectorAll('.prod-img').forEach(item => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        collectImages();
        const img = item.querySelector('img');
        const idx = images.findIndex(d => d.src === img.src);
        open(idx >= 0 ? idx : 0);
      });
    });
  }

  // Attacher après chargement du DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachClicks);
  } else {
    attachClicks();
  }

  // ── Curseur sur les éléments lightbox ──────────────────────
  [lbClose, lbPrev, lbNext].forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
  });

})();
