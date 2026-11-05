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
  const collapseSidebarButton = document.getElementById('sidebar-collapse-toggle');
  let opener = null;

  if (collapseSidebarButton) {
    collapseSidebarButton.addEventListener('click', () => {
      if (mobile.matches) return;
      const collapsed = document.body.classList.toggle('sidebar-collapsed');
      collapseSidebarButton.setAttribute('aria-expanded', String(!collapsed));
      collapseSidebarButton.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Minimize sidebar');
    });
  }

  // Education cards share one detail panel; the active timeline dot follows selection.
  const educationButtons = [...document.querySelectorAll('.education-select')];
  const educationDetail = document.getElementById('education-detail');
  if (educationButtons.length && educationDetail) {
    const detailDate = document.getElementById('education-detail-date');
    const detailDegree = document.getElementById('education-detail-degree');
    const detailSchool = document.getElementById('education-detail-school');
    const educationPhoto = document.getElementById('education-photo');
    const reduceEducationMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let educationSwapTimer;
    let educationAutoTimer;
    let educationInView = false;
    educationButtons.forEach(button => { const photo = new Image(); photo.src = button.dataset.photo; });
    const selectSchool = (button, automatic = false) => {
      educationDetail.setAttribute('aria-live', automatic ? 'off' : 'polite');
      educationButtons.forEach(item => {
        const selected = item === button;
        item.setAttribute('aria-pressed', String(selected));
        item.closest('.education-item').classList.toggle('is-selected', selected);
      });
      window.clearTimeout(educationSwapTimer);
      educationDetail.classList.add('is-switching');
      const showSchool = () => {
        const school = button.querySelector('.education-school').textContent;
        detailDate.textContent = button.querySelector('.timeline-date').textContent;
        detailDegree.textContent = button.querySelector('.education-degree').textContent;
        detailSchool.textContent = school;
        educationPhoto.src = button.dataset.photo;
        educationPhoto.alt = `Photo of ${school}`;
        educationDetail.classList.remove('is-switching');
      };
      if (reduceEducationMotion.matches) showSchool();
      else educationSwapTimer = window.setTimeout(showSchool, 160);
    };
    const startEducationAutoplay = () => {
      window.clearInterval(educationAutoTimer);
      if (!educationInView || document.hidden || reduceEducationMotion.matches) return;
      educationAutoTimer = window.setInterval(() => {
        const current = educationButtons.findIndex(button => button.getAttribute('aria-pressed') === 'true');
        selectSchool(educationButtons[(current + 1) % educationButtons.length], true);
      }, 5000);
    };
    educationButtons.forEach(button => button.addEventListener('click', () => {
      selectSchool(button);
      startEducationAutoplay();
    }));
    if ('IntersectionObserver' in window) {
      const educationObserver = new IntersectionObserver(entries => {
        educationInView = entries[0].isIntersecting;
        startEducationAutoplay();
      }, { threshold: 0.25 });
      educationObserver.observe(document.getElementById('education'));
    } else {
      educationInView = true;
      startEducationAutoplay();
    }
    document.addEventListener('visibilitychange', startEducationAutoplay);
    reduceEducationMotion.addEventListener('change', startEducationAutoplay);
  }

  // College memories in the contact section; the image remains visible without JS.
  const journey = document.getElementById('college-journey');
  const journeyPhoto = document.getElementById('journey-photo');
  const journeyPosition = document.getElementById('journey-position');
  const journeyDots = document.getElementById('journey-dots');
  const journeyPrev = document.getElementById('journey-prev');
  const journeyNext = document.getElementById('journey-next');
  const journeyToggle = document.getElementById('journey-toggle');
  if (journey && journeyPhoto && journeyPosition && journeyDots && journeyPrev && journeyNext && journeyToggle) {
    const photos = Array.from({ length: 10 }, (_, index) =>
      `assets/images/college-journey/college-${String(index + 1).padStart(2, '0')}.jpg`);
    const reduceJourneyMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let journeyIndex = 0;
    let journeyTimer;
    let journeySwapTimer;
    let journeyVisible = false;
    let journeyHovered = false;
    let journeyFocused = false;
    let journeyPaused = reduceJourneyMotion.matches;
    let journeyForcePlay = false;
    const dots = photos.map((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Show college photo ${index + 1} of ${photos.length}`);
      dot.setAttribute('aria-current', String(index === 0));
      dot.addEventListener('click', () => { showJourney(index); startJourneyAutoplay(); });
      journeyDots.append(dot);
      return dot;
    });
    const syncJourneyToggle = () => {
      journeyToggle.textContent = journeyPaused ? 'Play' : 'Pause';
      journeyToggle.setAttribute('aria-label', journeyPaused ? 'Play college photo slideshow' : 'Pause college photo slideshow');
      journeyToggle.setAttribute('aria-pressed', String(journeyPaused));
    };
    const showJourney = (index, automatic = false) => {
      window.clearTimeout(journeySwapTimer);
      journeyIndex = (index + photos.length) % photos.length;
      journeyPhoto.classList.add('is-switching');
      const swap = () => {
        journeyPhoto.src = photos[journeyIndex];
        journeyPhoto.alt = `Group photo from Daniel's college journey, photo ${journeyIndex + 1} of ${photos.length}`;
        journeyPosition.setAttribute('aria-live', automatic ? 'off' : 'polite');
        journeyPosition.textContent = `${String(journeyIndex + 1).padStart(2, '0')} / ${photos.length}`;
        dots.forEach((dot, dotIndex) => dot.setAttribute('aria-current', String(dotIndex === journeyIndex)));
        journeyPhoto.classList.remove('is-switching');
        const nextPhoto = new Image();
        nextPhoto.src = photos[(journeyIndex + 1) % photos.length];
      };
      if (reduceJourneyMotion.matches) swap();
      else journeySwapTimer = window.setTimeout(swap, 180);
    };
    const startJourneyAutoplay = () => {
      window.clearInterval(journeyTimer);
      if (journeyPaused || reduceJourneyMotion.matches || document.hidden || !journeyVisible || ((journeyHovered || journeyFocused) && !journeyForcePlay)) return;
      journeyTimer = window.setInterval(() => showJourney(journeyIndex + 1, true), 5000);
    };
    journeyPrev.addEventListener('click', () => { showJourney(journeyIndex - 1); startJourneyAutoplay(); });
    journeyNext.addEventListener('click', () => { showJourney(journeyIndex + 1); startJourneyAutoplay(); });
    journeyToggle.addEventListener('click', () => {
      journeyPaused = !journeyPaused;
      journeyForcePlay = !journeyPaused;
      syncJourneyToggle();
      startJourneyAutoplay();
    });
    journey.addEventListener('mouseenter', () => { journeyHovered = true; startJourneyAutoplay(); });
    journey.addEventListener('mouseleave', () => { journeyHovered = false; startJourneyAutoplay(); });
    journey.addEventListener('focusin', () => { journeyFocused = true; startJourneyAutoplay(); });
    journey.addEventListener('focusout', event => {
      if (!journey.contains(event.relatedTarget)) { journeyFocused = false; startJourneyAutoplay(); }
    });
    document.addEventListener('visibilitychange', startJourneyAutoplay);
    reduceJourneyMotion.addEventListener('change', () => {
      if (reduceJourneyMotion.matches) { journeyPaused = true; journeyForcePlay = false; }
      journeyToggle.hidden = reduceJourneyMotion.matches;
      syncJourneyToggle();
      startJourneyAutoplay();
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        journeyVisible = entries[0].isIntersecting;
        startJourneyAutoplay();
      }, { threshold: 0.25 }).observe(journey);
    } else { journeyVisible = true; startJourneyAutoplay(); }
    journeyToggle.hidden = reduceJourneyMotion.matches;
    syncJourneyToggle();
  }

  // Profile carousel: manual image clicks advance immediately; autoplay pauses for
  // reduced-motion preferences, hidden tabs, hover, and keyboard focus.
  const profileSlides = [
    {src:'assets/images/project-photo.jpg', alt:'Daniel Matthew R. Desiderio wearing a white blazer'},
    {src:'assets/images/profile-slides/portrait-arch.png', alt:'Daniel standing beside a stone arch in a black shirt'},
    {src:'assets/images/profile-slides/portrait-coast.png', alt:'Daniel looking toward the coast from a viewpoint'}
  ];
  const profileNext = document.getElementById('hero-photo-next');
  const profileImage = document.getElementById('hero-profile-image');
  const profileStack = [...document.querySelectorAll('.photo-card')];
  const profilePosition = document.getElementById('profile-slide-position');
  const profileToggle = document.getElementById('profile-slideshow-toggle');
  const reducedMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (profileNext && profileImage && profileStack.length === 3 && profilePosition && profileToggle) {
    let currentProfileSlide = 0;
    let manuallyPaused = reducedMotionPreference.matches;
    if (manuallyPaused) {
      profileToggle.textContent = 'Play';
      profileToggle.setAttribute('aria-label', 'Play profile photo slideshow');
      profileToggle.setAttribute('aria-pressed', 'true');
    }
    const syncProfileSlide = () => {
      const photo = profileSlides[currentProfileSlide];
      profileImage.alt = photo.alt;
      const next = profileSlides[(currentProfileSlide + 1) % profileSlides.length];
      const after = profileSlides[(currentProfileSlide + 2) % profileSlides.length];
      profileStack[0].querySelector('img').src = after.src;
      profileStack[1].querySelector('img').src = next.src;
      profileImage.src = photo.src;
      profileNext.classList.remove('is-advancing');
      void profileNext.offsetWidth;
      profileNext.classList.add('is-advancing');
      profilePosition.textContent = `Photo ${currentProfileSlide + 1} of ${profileSlides.length}`;
      profileNext.setAttribute('aria-label', `Show next profile photo. Current photo ${currentProfileSlide + 1} of ${profileSlides.length}.`);
    };
    const advanceProfileSlide = () => {
      currentProfileSlide = (currentProfileSlide + 1) % profileSlides.length;
      syncProfileSlide();
    };
    profileNext.addEventListener('click', advanceProfileSlide);
    profileToggle.addEventListener('click', () => {
      manuallyPaused = !manuallyPaused;
      profileToggle.textContent = manuallyPaused ? 'Play' : 'Pause';
      profileToggle.setAttribute('aria-label', manuallyPaused ? 'Play profile photo slideshow' : 'Pause profile photo slideshow');
      profileToggle.setAttribute('aria-pressed', String(manuallyPaused));
    });
    const canAutoplay = () => !manuallyPaused && !document.hidden && !profileNext.matches(':hover') && !profileNext.matches(':focus-within') && !profileToggle.matches(':focus');
    window.setInterval(() => { if (canAutoplay()) advanceProfileSlide(); }, 5000);
    reducedMotionPreference.addEventListener?.('change', event => {
      if (event.matches) {
        manuallyPaused = true;
        profileToggle.textContent = 'Play';
        profileToggle.setAttribute('aria-label', 'Play profile photo slideshow');
        profileToggle.setAttribute('aria-pressed', 'true');
      }
    });
  }

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

  // Project cards open a detail view using only the documented project information.
  const projectDialog = document.getElementById('project-dialog');
  const projectDialogClose = document.getElementById('project-dialog-close');
  let projectTrigger = null;
  document.querySelectorAll('.project-open').forEach(button => button.addEventListener('click', () => {
    const card = button.closest('.project-card');
    const title = card.querySelector('h3').textContent;
    const thumbnail = card.querySelector('.project-card-image img');
    projectTrigger = button;
    document.getElementById('project-dialog-category').textContent = card.querySelector('.project-index').textContent;
    document.getElementById('project-dialog-title').textContent = title;
    document.getElementById('project-dialog-overview').textContent = card.querySelector('.project-card-content > p').textContent;
    document.getElementById('project-dialog-programming').textContent = button.dataset.programming;
    const image = document.getElementById('project-dialog-image');
    image.src = thumbnail.getAttribute('src');
    image.alt = thumbnail.alt;
    const highlights = document.getElementById('project-dialog-highlights');
    highlights.replaceChildren(...[...card.querySelectorAll('.project-highlights span')].map(item => {
      const feature = document.createElement('span');
      feature.textContent = item.textContent;
      return feature;
    }));
    const liveLink = document.getElementById('project-dialog-live-link');
    liveLink.hidden = !button.dataset.liveUrl;
    if (button.dataset.liveUrl) liveLink.href = button.dataset.liveUrl;
    projectDialog.showModal();
    document.body.classList.add('modal-open');
    projectDialogClose.focus();
  }));
  projectDialogClose.addEventListener('click', () => projectDialog.close());
  projectDialog.addEventListener('click', event => { if (event.target === projectDialog) projectDialog.close(); });
  projectDialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (projectTrigger?.isConnected) projectTrigger.focus();
  });

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
