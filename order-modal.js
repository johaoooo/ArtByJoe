/* ============================================================
   ORDER MODAL + i18n TRADUCTION
   Art by Joe — MTN Mobile Money · FR / EN / ES
   ============================================================ */

(function () {
  'use strict';

  const i18n = {
    fr: {
      nav_home:'Accueil', nav_gallery:'Galerie', nav_shop:'Boutique', nav_about:'À Propos', nav_contact:'Contact', nav_order:'Commander',
      hero_tag:'Créations Uniques · Bénin 🇧🇯',
      hero_title:"L\'Art du Nœud, <span class=\"highlight\">Tissé avec Âme</span>",
      hero_desc:"Découvrez l\'univers du macramé artisanal de Joseph Dehazounde. Chaque pièce est unique — sandales, sacs, pixel art — créée avec passion à Porto-Novo.",
      hero_btn1:'Découvrir mes créations', hero_btn2:'En savoir plus', scroll_lbl:'Défiler',
      gallery_tag:'Portfolio', gallery_title:'Mes <span class="highlight-text">Créations</span>',
      gallery_desc:'Les vraies créations de Joseph — 100% faites main à Porto-Novo & Calavi, Bénin.',
      filter_all:'Tout', filter_pixel:'🎨 Pixel Macramé', filter_bag:'👜 Sacs', filter_shoes:'👡 Sandales',
      gallery_cta:'Commander une création personnalisée', cat_pixel:'Pixel Macramé', cat_bag:'Sacs Macramé', cat_shoes:'Sandales Macramé',
      shop_tag:'Boutique', shop_title:'Nos <span class="highlight-text">Produits</span>',
      shop_desc:'Commandez directement vos créations préférées — livraison à Porto-Novo et Calavi.', btn_order:'Commander',
      stat_years:'Ans de passion', stat_creations:'Créations uniques', stat_handmade:'Fait à la main', stat_cities:'Villes au Bénin',
      about_tag:'Mon Histoire', about_title:"À Propos<br>d\'<span class=\"highlight-text\">Art by Joe</span>",
      about_p1:"Je m\'appelle <strong>Joseph Dehazounde</strong>, passionné d\'art manuel depuis toujours. C\'est durant la période COVID en <strong>2020</strong> que j\'ai découvert le macramé — un art ancestral du nœud qui m\'a immédiatement captivé.",
      about_p2:"Basé à <strong>Porto-Novo</strong> (carrefour du Cinquantenaire) et à <strong>Calavi à l\'UAC</strong>, je crée des pièces uniques : sandales papillon & géométriques, sacs tissés, portraits pixel macramé.",
      feat1_title:'Fait Main', feat1_desc:'Chaque pièce est unique',
      feat2_title:'Matériaux Naturels', feat2_desc:'Fils de qualité premium',
      feat3_title:'Livraison Soignée', feat3_desc:'Porto-Novo & Calavi',
      contact_tag:'Restons en Contact', contact_title:'Parlons de <span class="highlight-text">Votre Projet</span>',
      contact_desc:"Vous avez une idée de création personnalisée ? N\'hésitez pas — je suis disponible et réactif !",
      lbl_name:'Votre nom *', lbl_email:'Votre email *', lbl_subject:'Sujet', lbl_message:'Votre message *',
      ph_name:'Joseph Dupont', ph_email:'vous@exemple.com', ph_subject:'Commande personnalisée', ph_message:'Décrivez votre projet...',
      btn_send:'Envoyer le message', success_title:'Message envoyé !', success_msg:'Merci ! Joseph vous répond très vite.',
      footer_desc:'Créations macramé 100% faites main — sandales, sacs, pixel art. Porto-Novo & Calavi, Bénin 🇧🇯',
      footer_nav:'Navigation', footer_svc:'Services', footer_contact:'Contact',
      svc1:'Commandes personnalisées', svc2:'Sandales macramé', svc3:'Sacs macramé', svc4:'Pixel macramé',
      footer_copy:'© 2025 Art by Joe · Tous droits réservés · Fait avec ❤ au Bénin 🇧🇯',
      modal_title:'Passer une commande', modal_lbl_name:'Votre nom complet *', modal_lbl_phone:'Votre téléphone *',
      modal_lbl_city:'Votre ville *', modal_lbl_note:'Note (taille, couleur…)', modal_lbl_momo:'N° MoMo pour le paiement *',
      modal_ph_name:'Ex: Awa Mensah', modal_ph_phone:'Ex: +229 97 00 00 00', modal_ph_city:'Ex: Porto-Novo',
      modal_ph_note:'Ex: Taille 39, couleur rouge', modal_ph_momo:'Votre numéro MTN MoMo',
      modal_momo_title:'Paiement MTN Mobile Money',
      modal_momo_desc:'Envoyez <strong>PRICE</strong> au numéro <span class="momo-number">MOMO_NUMBER</span> avant de valider.',
      modal_momo_steps:['Ouvrez votre app MTN MoMo','Transfert → entrez le numéro','Montant : PRICE','Validez, puis confirmez ici'],
      modal_submit:'Confirmer la commande ✓', modal_sending:'Envoi en cours…',
      modal_success_title:'Commande reçue ! 🎉',
      modal_success_msg:'Merci <strong>NAME</strong> ! Votre commande a bien été enregistrée. Joseph vous contactera très vite au <strong>PHONE</strong> pour confirmer.',
    },
    en: {
      nav_home:'Home', nav_gallery:'Gallery', nav_shop:'Shop', nav_about:'About', nav_contact:'Contact', nav_order:'Order Now',
      hero_tag:'Unique Creations · Benin 🇧🇯',
      hero_title:"The Art of Knots, <span class=\"highlight\">Woven with Soul</span>",
      hero_desc:"Discover Joseph Dehazounde's world of handcrafted macramé. Each piece is unique — sandals, bags, pixel art — crafted with passion in Porto-Novo.",
      hero_btn1:'Discover my creations', hero_btn2:'Learn more', scroll_lbl:'Scroll',
      gallery_tag:'Portfolio', gallery_title:'My <span class="highlight-text">Creations</span>',
      gallery_desc:"Joseph's real creations — 100% handmade in Porto-Novo & Calavi, Benin.",
      filter_all:'All', filter_pixel:'🎨 Pixel Macramé', filter_bag:'👜 Bags', filter_shoes:'👡 Sandals',
      gallery_cta:'Order a custom creation', cat_pixel:'Pixel Macramé', cat_bag:'Macramé Bags', cat_shoes:'Macramé Sandals',
      shop_tag:'Shop', shop_title:'Our <span class="highlight-text">Products</span>',
      shop_desc:'Order your favourite creations directly — delivery to Porto-Novo and Calavi.', btn_order:'Order',
      stat_years:'Years of passion', stat_creations:'Unique creations', stat_handmade:'Handmade', stat_cities:'Cities in Benin',
      about_tag:'My Story', about_title:"About<br><span class=\"highlight-text\">Art by Joe</span>",
      about_p1:"My name is <strong>Joseph Dehazounde</strong>, passionate about hand crafts since forever. It was during the COVID period in <strong>2020</strong> that I discovered macramé — an ancestral knotting art that immediately captivated me.",
      about_p2:"Based in <strong>Porto-Novo</strong> (Cinquantenaire crossroads) and <strong>Calavi at UAC</strong>, I create unique pieces: butterfly & geometric sandals, woven bags, pixel macramé portraits.",
      feat1_title:'Handmade', feat1_desc:'Every piece is unique',
      feat2_title:'Natural Materials', feat2_desc:'Premium quality threads',
      feat3_title:'Careful Delivery', feat3_desc:'Porto-Novo & Calavi',
      contact_tag:'Stay in Touch', contact_title:"Let's Talk About <span class=\"highlight-text\">Your Project</span>",
      contact_desc:"Have a custom creation idea? Don't hesitate — I'm available and responsive!",
      lbl_name:'Your name *', lbl_email:'Your email *', lbl_subject:'Subject', lbl_message:'Your message *',
      ph_name:'John Doe', ph_email:'you@example.com', ph_subject:'Custom order', ph_message:'Describe your project...',
      btn_send:'Send message', success_title:'Message sent!', success_msg:'Thank you! Joseph will reply very soon.',
      footer_desc:'100% handmade macramé creations — sandals, bags, pixel art. Porto-Novo & Calavi, Benin 🇧🇯',
      footer_nav:'Navigation', footer_svc:'Services', footer_contact:'Contact',
      svc1:'Custom orders', svc2:'Macramé sandals', svc3:'Macramé bags', svc4:'Pixel macramé',
      footer_copy:'© 2025 Art by Joe · All rights reserved · Made with ❤ in Benin 🇧🇯',
      modal_title:'Place an order', modal_lbl_name:'Your full name *', modal_lbl_phone:'Your phone *',
      modal_lbl_city:'Your city *', modal_lbl_note:'Note (size, colour…)', modal_lbl_momo:'MoMo number for payment *',
      modal_ph_name:'E.g. Awa Mensah', modal_ph_phone:'E.g. +229 97 00 00 00', modal_ph_city:'E.g. Porto-Novo',
      modal_ph_note:'E.g. Size 39, red colour', modal_ph_momo:'Your MTN MoMo number',
      modal_momo_title:'MTN Mobile Money Payment',
      modal_momo_desc:'Send <strong>PRICE</strong> to <span class="momo-number">MOMO_NUMBER</span> before confirming.',
      modal_momo_steps:['Open your MTN MoMo app','Transfer → enter the number','Amount: PRICE','Validate, then confirm here'],
      modal_submit:'Confirm order ✓', modal_sending:'Sending…',
      modal_success_title:'Order received! 🎉',
      modal_success_msg:'Thank you <strong>NAME</strong>! Your order has been registered. Joseph will contact you very soon at <strong>PHONE</strong> to confirm.',
    },
    es: {
      nav_home:'Inicio', nav_gallery:'Galería', nav_shop:'Tienda', nav_about:'Acerca de', nav_contact:'Contacto', nav_order:'Pedir',
      hero_tag:'Creaciones Únicas · Benín 🇧🇯',
      hero_title:"El Arte del Nudo, <span class=\"highlight\">Tejido con Alma</span>",
      hero_desc:"Descubre el mundo del macramé artesanal de Joseph Dehazounde. Cada pieza es única — sandalias, bolsos, pixel art — creada con pasión en Porto-Novo.",
      hero_btn1:'Descubrir mis creaciones', hero_btn2:'Saber más', scroll_lbl:'Desplazar',
      gallery_tag:'Portafolio', gallery_title:'Mis <span class="highlight-text">Creaciones</span>',
      gallery_desc:'Las verdaderas creaciones de Joseph — 100% hechas a mano en Porto-Novo & Calavi, Benín.',
      filter_all:'Todo', filter_pixel:'🎨 Pixel Macramé', filter_bag:'👜 Bolsos', filter_shoes:'👡 Sandalias',
      gallery_cta:'Pedir una creación personalizada', cat_pixel:'Pixel Macramé', cat_bag:'Bolsos Macramé', cat_shoes:'Sandalias Macramé',
      shop_tag:'Tienda', shop_title:'Nuestros <span class="highlight-text">Productos</span>',
      shop_desc:'Pide directamente tus creaciones favoritas — entrega en Porto-Novo y Calavi.', btn_order:'Pedir',
      stat_years:'Años de pasión', stat_creations:'Creaciones únicas', stat_handmade:'Hecho a mano', stat_cities:'Ciudades en Benín',
      about_tag:'Mi Historia', about_title:"Acerca de<br><span class=\"highlight-text\">Art by Joe</span>",
      about_p1:"Me llamo <strong>Joseph Dehazounde</strong>, apasionado por las manualidades desde siempre. Fue durante el período COVID en <strong>2020</strong> que descubrí el macramé — un arte ancestral del nudo que me cautivó de inmediato.",
      about_p2:"Con base en <strong>Porto-Novo</strong> (cruce del Cincuentenario) y <strong>Calavi en la UAC</strong>, creo piezas únicas: sandalias mariposa y geométricas, bolsos tejidos, retratos pixel macramé.",
      feat1_title:'Hecho a Mano', feat1_desc:'Cada pieza es única',
      feat2_title:'Materiales Naturales', feat2_desc:'Hilos de calidad premium',
      feat3_title:'Entrega Cuidadosa', feat3_desc:'Porto-Novo & Calavi',
      contact_tag:'Mantengamos el Contacto', contact_title:'Hablemos de <span class="highlight-text">Tu Proyecto</span>',
      contact_desc:"¿Tienes una idea de creación personalizada? No dudes — ¡estoy disponible y soy reactivo!",
      lbl_name:'Tu nombre *', lbl_email:'Tu correo *', lbl_subject:'Asunto', lbl_message:'Tu mensaje *',
      ph_name:'Ej: Juan García', ph_email:'tu@ejemplo.com', ph_subject:'Pedido personalizado', ph_message:'Describe tu proyecto...',
      btn_send:'Enviar mensaje', success_title:'¡Mensaje enviado!', success_msg:'¡Gracias! Joseph te responderá muy pronto.',
      footer_desc:'Creaciones de macramé 100% hechas a mano — sandalias, bolsos, pixel art. Porto-Novo & Calavi, Benín 🇧🇯',
      footer_nav:'Navegación', footer_svc:'Servicios', footer_contact:'Contacto',
      svc1:'Pedidos personalizados', svc2:'Sandalias macramé', svc3:'Bolsos macramé', svc4:'Pixel macramé',
      footer_copy:'© 2025 Art by Joe · Todos los derechos reservados · Hecho con ❤ en Benín 🇧🇯',
      modal_title:'Realizar un pedido', modal_lbl_name:'Tu nombre completo *', modal_lbl_phone:'Tu teléfono *',
      modal_lbl_city:'Tu ciudad *', modal_lbl_note:'Nota (talla, color…)', modal_lbl_momo:'N° MoMo para el pago *',
      modal_ph_name:'Ej: Awa Mensah', modal_ph_phone:'Ej: +229 97 00 00 00', modal_ph_city:'Ej: Porto-Novo',
      modal_ph_note:'Ej: Talla 39, color rojo', modal_ph_momo:'Tu número MTN MoMo',
      modal_momo_title:'Pago MTN Mobile Money',
      modal_momo_desc:'Envía <strong>PRICE</strong> al número <span class="momo-number">MOMO_NUMBER</span> antes de confirmar.',
      modal_momo_steps:['Abre tu app MTN MoMo','Transferencia → ingresa el número','Monto: PRICE','Valida y confirma aquí'],
      modal_submit:'Confirmar pedido ✓', modal_sending:'Enviando…',
      modal_success_title:'¡Pedido recibido! 🎉',
      modal_success_msg:'¡Gracias <strong>NAME</strong>! Tu pedido ha sido registrado. Joseph te contactará muy pronto al <strong>PHONE</strong> para confirmar.',
    }
  };

  /* CONFIG */
  const MOMO_NUMBER = '+229 01 62 10 86 94';
  const API_URL     = '/api/orders';
  const LANGS       = ['fr', 'en', 'es'];
  let currentLang   = localStorage.getItem('abj_lang') || 'fr';

  /* ══ 3. BOUTON LANGUE UNIQUE CYCLIQUE ══ */
  function injectLangSwitcher() {
    const headerContent = document.querySelector('.header-content');
    if (!headerContent) return;
    const switcher = document.createElement('div');
    switcher.className = 'lang-switcher';
    switcher.innerHTML = '<button class="lang-btn" id="lang-cycle">' + currentLang.toUpperCase() + '</button>';
    const burger = headerContent.querySelector('.burger-menu');
    headerContent.insertBefore(switcher, burger);
    const btn = document.getElementById('lang-cycle');
    btn.addEventListener('click', () => {
      const idx  = LANGS.indexOf(currentLang);
      const next = LANGS[(idx + 1) % LANGS.length];
      applyLang(next);
    });
    btn.addEventListener('mouseenter', () => document.body.classList.add('hov'));
    btn.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
  }

  function updateLangButtons() {
    const btn = document.getElementById('lang-cycle');
    if (btn) btn.textContent = currentLang.toUpperCase();
  }

  /* ══ 4. APPLIQUER LA TRADUCTION ══ */
  function applyLang(lang) {
    if (!i18n[lang]) return;
    currentLang = lang;
    localStorage.setItem('abj_lang', lang);
    const t = i18n[lang];
    const set   = (sel, key, attr = 'innerHTML') => { const el = document.querySelector(sel); if (el && t[key] !== undefined) el[attr] = t[key]; };
    const setPh = (sel, key) => { const el = document.querySelector(sel); if (el && t[key] !== undefined) el.placeholder = t[key]; };

    set('a[href="#home"].nav-link',     'nav_home',    'textContent');
    set('a[href="#galerie"].nav-link',  'nav_gallery', 'textContent');
    set('a[href="#boutique"].nav-link', 'nav_shop',    'textContent');
    set('a[href="#apropos"].nav-link',  'nav_about',   'textContent');
    set('a[href="#contact"].nav-link',  'nav_contact', 'textContent');
    document.querySelectorAll('a[href="#contact"].btn-primary.desktop-only').forEach(el => el.textContent = t.nav_order);

    set('.hero-subtitle',    'hero_tag',   'textContent');
    set('.hero-title',       'hero_title');
    set('.hero-description', 'hero_desc',  'textContent');
    const heroBtns = document.querySelectorAll('.hero-buttons .btn');
    if (heroBtns[0]) heroBtns[0].textContent = t.hero_btn1;
    if (heroBtns[1]) heroBtns[1].textContent = t.hero_btn2;
    set('.scroll-indicator span', 'scroll_lbl', 'textContent');

    const gallSection = document.querySelector('.gallery-section');
    if (gallSection) {
      const tags = gallSection.querySelectorAll('.section-tag');
      if (tags[0]) tags[0].textContent = t.gallery_tag;
      set('.gallery-section .section-title',       'gallery_title');
      set('.gallery-section .section-description', 'gallery_desc', 'textContent');
      set('.gallery-cta .btn', 'gallery_cta', 'textContent');
      const filterBtns = gallSection.querySelectorAll('.filter-btn');
      ['filter_all','filter_pixel','filter_bag','filter_shoes'].forEach((k, i) => { if (filterBtns[i] && t[k]) filterBtns[i].innerHTML = t[k]; });
      const catTitles = gallSection.querySelectorAll('.gal-cat-title');
      ['cat_pixel','cat_bag','cat_shoes'].forEach((k, i) => { if (catTitles[i] && t[k]) catTitles[i].textContent = t[k]; });
    }

    const boutSection = document.querySelector('.boutique-section');
    if (boutSection) {
      const btags = boutSection.querySelectorAll('.section-tag');
      if (btags[0]) btags[0].textContent = t.shop_tag;
      set('.boutique-section .section-title',       'shop_title');
      set('.boutique-section .section-description', 'shop_desc', 'textContent');
      boutSection.querySelectorAll('.prod-hover .btn').forEach(btn => {
        const priceMatch = btn.textContent.match(/[\d\s]+FCFA/);
        const priceStr   = priceMatch ? priceMatch[0].trim() : '';
        btn.textContent  = t.btn_order + ' — ' + priceStr;
      });
    }

    const statLabels = document.querySelectorAll('.stat-l');
    ['stat_years','stat_creations','stat_handmade','stat_cities'].forEach((k, i) => { if (statLabels[i] && t[k]) statLabels[i].textContent = t[k]; });

    set('.about .section-tag',   'about_tag',   'textContent');
    set('.about .section-title', 'about_title');
    const aboutTexts = document.querySelectorAll('.about-text');
    if (aboutTexts[0]) aboutTexts[0].innerHTML = t.about_p1;
    if (aboutTexts[1]) aboutTexts[1].innerHTML = t.about_p2;
    const featTitles = document.querySelectorAll('.feature-item h4');
    const featDescs  = document.querySelectorAll('.feature-item p');
    ['feat1_title','feat2_title','feat3_title'].forEach((k, i) => { if (featTitles[i] && t[k]) featTitles[i].textContent = t[k]; });
    ['feat1_desc','feat2_desc','feat3_desc'].forEach((k, i)   => { if (featDescs[i]  && t[k]) featDescs[i].textContent  = t[k]; });

    set('.contact .section-tag',   'contact_tag',   'textContent');
    set('.contact .section-title', 'contact_title');
    set('.contact-description',    'contact_desc',  'textContent');
    const labels = document.querySelectorAll('.contact-form .form-group label');
    ['lbl_name','lbl_email','lbl_subject','lbl_message'].forEach((k, i) => { if (labels[i] && t[k]) labels[i].textContent = t[k]; });
    setPh('#name','ph_name'); setPh('#email','ph_email'); setPh('#subject','ph_subject'); setPh('#message','ph_message');
    const sendBtn = document.querySelector('#contact-form .btn-primary span');
    if (sendBtn) sendBtn.textContent = t.btn_send;
    set('#form-success h3', 'success_title', 'textContent');
    set('#form-success p',  'success_msg',   'textContent');

    set('.footer-text', 'footer_desc', 'textContent');
    const footerTitles = document.querySelectorAll('.footer-title');
    if (footerTitles[1]) footerTitles[1].textContent = t.footer_nav;
    if (footerTitles[2]) footerTitles[2].textContent = t.footer_svc;
    if (footerTitles[3]) footerTitles[3].textContent = t.footer_contact;
    set('.footer-bottom p', 'footer_copy', 'textContent');
    const svcLinks = document.querySelectorAll('.footer-column:nth-child(3) .footer-links a');
    ['svc1','svc2','svc3','svc4'].forEach((k, i) => { if (svcLinks[i] && t[k]) svcLinks[i].textContent = t[k]; });
    const footerNavLinks = document.querySelectorAll('.footer-column:nth-child(2) .footer-links a');
    ['nav_home','nav_gallery','nav_shop','nav_about','nav_contact'].forEach((k, i) => { if (footerNavLinks[i] && t[k]) footerNavLinks[i].textContent = t[k]; });

    updateModalLang();
    updateLangButtons();
    document.documentElement.lang = lang;
  }

  /* ══ 5. ORDER MODAL ══ */
  let currentProduct = null;
  const overlay = document.createElement('div');
  overlay.id = 'order-overlay';
  overlay.className = 'order-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML = `
    <div class="order-modal" id="order-modal">
      <div class="order-modal-header">
        <h2 id="om-title">Passer une commande</h2>
        <button class="order-modal-close" id="om-close" aria-label="Fermer">&#x2715;</button>
      </div>
      <div class="order-product-recap" id="om-recap">
        <img class="order-product-img" id="om-img" src="" alt=""/>
        <div class="order-product-info">
          <h3 id="om-product-name"></h3>
          <div class="order-product-price" id="om-price"></div>
        </div>
      </div>
      <div class="momo-block" id="om-momo">
        <div class="momo-icon">&#x1F4F1;</div>
        <div class="momo-info">
          <h4 id="om-momo-title">Paiement MTN Mobile Money</h4>
          <p id="om-momo-desc"></p>
          <ol class="momo-steps" id="om-momo-steps"></ol>
        </div>
      </div>
      <form class="order-form" id="order-form" novalidate>
        <div class="order-form-row">
          <div class="order-form-group">
            <label id="om-lbl-name" for="om-customer-name">Votre nom *</label>
            <input type="text" id="om-customer-name" required/>
          </div>
          <div class="order-form-group">
            <label id="om-lbl-phone" for="om-customer-phone">Téléphone *</label>
            <input type="tel" id="om-customer-phone" required/>
          </div>
        </div>
        <div class="order-form-row">
          <div class="order-form-group">
            <label id="om-lbl-city" for="om-customer-city">Ville *</label>
            <input type="text" id="om-customer-city" required/>
          </div>
          <div class="order-form-group">
            <label id="om-lbl-momo" for="om-momo-phone">N° MoMo *</label>
            <input type="tel" id="om-momo-phone" required/>
          </div>
        </div>
        <div class="order-form-group">
          <label id="om-lbl-note" for="om-note">Note</label>
          <textarea id="om-note" rows="2"></textarea>
        </div>
        <button type="submit" class="order-submit-btn" id="om-submit">
          <span id="om-submit-lbl">Confirmer la commande &#x2713;</span>
        </button>
      </form>
      <div class="order-success" id="om-success">
        <span class="order-success-icon">&#x1F389;</span>
        <h3 id="om-success-title">Commande reçue !</h3>
        <p id="om-success-msg"></p>
        <div class="order-id" id="om-order-id"></div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const omTitle        = document.getElementById('om-title');
  const omImg          = document.getElementById('om-img');
  const omProductName  = document.getElementById('om-product-name');
  const omPrice        = document.getElementById('om-price');
  const omMomoTitle    = document.getElementById('om-momo-title');
  const omMomoDesc     = document.getElementById('om-momo-desc');
  const omMomoSteps    = document.getElementById('om-momo-steps');
  const omForm         = document.getElementById('order-form');
  const omSuccess      = document.getElementById('om-success');
  const omSuccessTitle = document.getElementById('om-success-title');
  const omSuccessMsg   = document.getElementById('om-success-msg');
  const omOrderId      = document.getElementById('om-order-id');
  const omSubmit       = document.getElementById('om-submit');
  const omSubmitLbl    = document.getElementById('om-submit-lbl');

  function updateModalLang() {
    if (!currentProduct) return;
    const t = i18n[currentLang];
    omTitle.textContent = t.modal_title;
    document.getElementById('om-lbl-name').textContent  = t.modal_lbl_name;
    document.getElementById('om-lbl-phone').textContent = t.modal_lbl_phone;
    document.getElementById('om-lbl-city').textContent  = t.modal_lbl_city;
    document.getElementById('om-lbl-note').textContent  = t.modal_lbl_note;
    document.getElementById('om-lbl-momo').textContent  = t.modal_lbl_momo;
    document.getElementById('om-customer-name').placeholder  = t.modal_ph_name;
    document.getElementById('om-customer-phone').placeholder = t.modal_ph_phone;
    document.getElementById('om-customer-city').placeholder  = t.modal_ph_city;
    document.getElementById('om-note').placeholder           = t.modal_ph_note;
    document.getElementById('om-momo-phone').placeholder     = t.modal_ph_momo;
    omMomoTitle.textContent = t.modal_momo_title;
    omMomoDesc.innerHTML = t.modal_momo_desc
      .replace('PRICE', currentProduct.price + ' FCFA')
      .replace('MOMO_NUMBER', MOMO_NUMBER);
    omMomoSteps.innerHTML = t.modal_momo_steps
      .map(s => '<li>' + s.replace('PRICE', currentProduct.price + ' FCFA') + '</li>').join('');
    omSubmitLbl.textContent = t.modal_submit;
  }

  function openOrderModal(product) {
    currentProduct = product;
    omImg.src = product.img || '';
    omImg.alt = product.name;
    omProductName.textContent = product.name;
    omPrice.textContent       = product.price + ' FCFA';
    omForm.style.display = 'flex';
    omSuccess.classList.remove('show');
    omForm.reset();
    omSubmit.disabled = false;
    updateModalLang();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeOrderModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    currentProduct = null;
  }

  document.getElementById('om-close').addEventListener('click', closeOrderModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeOrderModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeOrderModal(); });
  [document.getElementById('om-close'), omSubmit].forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
  });

  omForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const t     = i18n[currentLang];
    const name  = document.getElementById('om-customer-name').value.trim();
    const phone = document.getElementById('om-customer-phone').value.trim();
    const city  = document.getElementById('om-customer-city').value.trim();
    const momo  = document.getElementById('om-momo-phone').value.trim();
    const note  = document.getElementById('om-note').value.trim();

    if (!name || !phone || !city || !momo) {
      [{id:'om-customer-name',val:name},{id:'om-customer-phone',val:phone},
       {id:'om-customer-city',val:city},{id:'om-momo-phone',val:momo}].forEach(({id, val}) => {
        const el = document.getElementById(id);
        el.style.borderColor = val ? '' : '#EF4444';
        el.style.boxShadow   = val ? '' : '0 0 0 3px rgba(239,68,68,.15)';
      });
      return;
    }

    omSubmitLbl.textContent = t.modal_sending;
    omSubmit.disabled = true;

    const payload = {
      product_name: currentProduct.name, product_price: currentProduct.price,
      product_img: currentProduct.img || '', customer_name: name,
      customer_phone: phone, customer_city: city, customer_note: note, payment_phone: momo
    };

    try {
      const res  = await fetch(API_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      const data = await res.json();
      if (res.ok) {
        omForm.style.display = 'none';
        omSuccessTitle.textContent = t.modal_success_title;
        omSuccessMsg.innerHTML = t.modal_success_msg.replace('NAME', name).replace('PHONE', phone);
        omOrderId.textContent  = '#' + String(data.order.id).padStart(4, '0');
        omSuccess.classList.add('show');
      } else { throw new Error(data.error || 'Erreur'); }
    } catch(err) {
      console.error('Erreur commande :', err);
      alert('Une erreur est survenue. Veuillez réessayer.');
      omSubmitLbl.textContent = t.modal_submit;
      omSubmit.disabled = false;
    } finally {
      omSubmit.disabled = false;
      omSubmitLbl.textContent = t.modal_submit;
    }
  });

  ['om-customer-name','om-customer-phone','om-customer-city','om-momo-phone'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => { el.style.borderColor = ''; el.style.boxShadow = ''; });
  });

  /* ══ 6. ATTACHER AUX BOUTONS COMMANDER ══ */
  function attachOrderButtons() {
    document.querySelectorAll('.prod-card').forEach(card => {
      const btn        = card.querySelector('.prod-hover .btn');
      const nameEl     = card.querySelector('.prod-name');
      const imgEl      = card.querySelector('.prod-img img');
      const priceText  = btn ? btn.textContent : '';
      const priceMatch = priceText.match(/[\d\s]+/);
      const price      = priceMatch ? parseInt(priceMatch[0].replace(/\s/g,'')) : 0;
      if (btn) {
        btn.addEventListener('click', e => {
          e.stopPropagation();
          openOrderModal({ name: nameEl ? nameEl.textContent.trim() : 'Création', price, img: imgEl ? imgEl.src : '' });
        });
      }
    });
    document.querySelectorAll('.btn-primary.btn-sm').forEach(btn => {
      btn.addEventListener('mouseenter', () => document.body.classList.add('hov'));
      btn.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
    });
  }

  /* ══ 7. INIT ══ */
  function init() {
    injectLangSwitcher();
    attachOrderButtons();
    applyLang(currentLang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
