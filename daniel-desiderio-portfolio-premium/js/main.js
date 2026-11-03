/* Portfolio interactions — plain JavaScript. No tracking, build tools, or external libraries. */
'use strict';
(() => {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('menu-toggle');
  const backdrop = document.getElementById('nav-backdrop');
  const links = [...document.querySelectorAll('.nav-link')];
  const sections = [...document.querySelectorAll('main > section[id]')];
  const toTop = document.getElementById('back-to-top');
  const progressBar = document.getElementById('reading-progress-bar');
  const mobile = window.matchMedia('(max-width: 900px)');
  let opener = null;

  // Accessible mobile drawer: Esc, outside click, focus containment and focus return.
  function setMenuOpen(open, returnFocus = false) {
    sidebar.classList.toggle('is-open', open);
    backdrop.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    document.body.classList.toggle('nav-open', open);
    if (open) {
      opener = document.activeElement;
      sidebar.querySelector('.side-brand-link')?.focus();
    } else if (returnFocus && opener instanceof HTMLElement && opener.isConnected) {
      opener.focus();
    }
  }
  toggle.addEventListener('click', () => setMenuOpen(!sidebar.classList.contains('is-open'), true));
  backdrop.addEventListener('click', () => setMenuOpen(false, true));
  links.forEach(link => link.addEventListener('click', () => {
    if (sidebar.classList.contains('is-open')) {
      setMenuOpen(false);
      const section = document.querySelector(link.hash);
      if (section) {
        section.setAttribute('tabindex', '-1');
        requestAnimationFrame(() => section.focus({preventScroll:true}));
      }
    }
  }));
  mobile.addEventListener?.('change', () => setMenuOpen(false));
  document.addEventListener('keydown', (event) => {
    if (!sidebar.classList.contains('is-open')) return;
    if (event.key === 'Escape') { event.preventDefault(); setMenuOpen(false, true); return; }
    if (event.key !== 'Tab') return;
    const focusable = [...sidebar.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter(el => el.getClientRects().length);
    if (!focusable.length) return;
    if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable.at(-1).focus(); }
    if (!event.shiftKey && document.activeElement === focusable.at(-1)) { event.preventDefault(); focusable[0].focus(); }
  });

  // Active numbered navigation and back-to-top visibility.
  let scheduled = false;
  function updatePosition() {
    const marker = mobile.matches ? 120 : Math.min(window.innerHeight * .35, 300);
    let active = 'home';
    sections.forEach(section => { if (section.getBoundingClientRect().top <= marker) active = section.id; });
    if (window.scrollY + innerHeight >= document.documentElement.scrollHeight - 5) active = 'contact';
    links.forEach(link => {
      const yes = link.hash === '#' + active;
      link.classList.toggle('is-active', yes);
      if (yes) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    toTop.classList.toggle('is-visible', window.scrollY > 440);
    // Percentage reflects actual document scroll, not an invented competence score.
    const availableScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = availableScroll > 0 ? Math.min(100, Math.max(0, window.scrollY / availableScroll * 100)) : 0;
    if (progressBar) progressBar.style.width = percentage.toFixed(2) + '%';
    scheduled = false;
  }
  function onPositionChange() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updatePosition);
  }
  window.addEventListener('scroll', onPositionChange, {passive:true});
  window.addEventListener('resize', onPositionChange, {passive:true});
  window.addEventListener('hashchange', onPositionChange);
  updatePosition();
  toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'}));

  // Reveal only after the JS observer has been registered. Reduce-motion users see all content.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, {threshold:0.07, rootMargin:'0px 0px 25px 0px'});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    document.documentElement.classList.add('motion-ready');
    reducedMotion.addEventListener?.('change', e => {
      if (e.matches) { document.documentElement.classList.remove('motion-ready'); observer.disconnect(); }
    });
  }

  // Certificate gallery arrows + native horizontal swipe/scroll/keyboard support.
  const gallery = document.getElementById('certificate-track');
  const slide = direction => {
    const card = gallery.querySelector('.certificate-card');
    const distance = (card?.getBoundingClientRect().width || 240) + 14;
    gallery.scrollBy({left:distance*direction,behavior:reducedMotion.matches?'auto':'smooth'});
  };
  document.getElementById('cert-prev').addEventListener('click', () => slide(-1));
  document.getElementById('cert-next').addEventListener('click', () => slide(1));

  const dialog = document.getElementById('certificate-dialog');
  const dialogTitle = document.getElementById('certificate-dialog-title');
  const dialogImage = document.getElementById('certificate-dialog-image');
  const dialogClose = document.getElementById('certificate-dialog-close');
  const fallback = 'assets/images/certs/placeholder.svg';
  let lastTrigger = null;
  document.querySelectorAll('.certificate-card img').forEach(img => img.addEventListener('error', () => {
    if (!img.src.endsWith('/placeholder.svg')) { img.src = fallback; img.alt = 'Certificate image coming soon'; }
  }));
  dialogImage.addEventListener('error', () => {
    if (!dialogImage.src.endsWith('/placeholder.svg')) { dialogImage.src = fallback; dialogImage.alt = 'Certificate image coming soon'; }
  });
  document.querySelectorAll('.certificate-card').forEach(card => card.addEventListener('click', () => {
    lastTrigger = card;
    dialogTitle.textContent = card.dataset.certTitle || 'Certificate';
    const thumbnail = card.querySelector('img');
    dialogImage.src = thumbnail?.getAttribute('src') || fallback;
    dialogImage.alt = 'Enlarged image: ' + (card.dataset.certTitle || 'certificate');
    dialog.showModal();
    document.body.classList.add('modal-open');
    dialogClose.focus();
  }));
  dialogClose.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (lastTrigger?.isConnected) lastTrigger.focus();
  });
  // showModal() makes the rest of the page inert; explicit loop handles all browsers.
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const focusable = [...dialog.querySelectorAll('button:not([disabled]), a[href], input:not([disabled])')];
    if (!focusable.length) return;
    if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable.at(-1).focus(); }
    else if (!event.shiftKey && document.activeElement === focusable.at(-1)) { event.preventDefault(); focusable[0].focus(); }
  });

  // The PDF wireframe presents mobile Awards and Honors as expandable rows.
  if (window.matchMedia('(max-width:700px)').matches) {
    document.querySelectorAll('.achievement-grid details').forEach(details => { details.open = false; });
  }
})();
