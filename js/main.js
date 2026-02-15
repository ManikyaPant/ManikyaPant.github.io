/**
 * Manikya Pant — Portfolio
 * js/main.js
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════
     1. LOADER
  ═══════════════════════════════════ */
  const loader = document.getElementById('loader');
  const lbar   = document.getElementById('lbar');
  if (loader && lbar) {
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 16 + 4;
      if (p >= 100) { p = 100; clearInterval(iv); }
      lbar.style.width = p + '%';
      if (p === 100) setTimeout(() => loader.classList.add('hide'), 380);
    }, 80);
  }

  /* ═══════════════════════════════════
     2. CUSTOM CURSOR
  ═══════════════════════════════════ */
  const dot  = document.getElementById('c-dot');
  const ring = document.getElementById('c-ring');
  if (dot && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    (function loop() {
      rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, .stat-c, .pj-row, .sk-col, .sc, .tl-i').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('ch'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('ch'));
    });
  }

  /* ═══════════════════════════════════
     3. SCROLL PROGRESS + NAV
  ═══════════════════════════════════ */
  const nav     = document.getElementById('nav');
  const progBar = document.getElementById('progress');
  const bttBtn  = document.getElementById('btt');

  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const pct = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
    if (progBar) progBar.style.width = pct + '%';
    if (nav)     nav.classList.toggle('scrolled', window.scrollY > 50);
    if (bttBtn)  bttBtn.classList.toggle('show', window.scrollY > 500);
    updateHeroCounter();
    heroParallax();
  }, { passive: true });

  if (bttBtn) bttBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ═══════════════════════════════════
     4. HERO COUNTER
  ═══════════════════════════════════ */
  const heroCounter = document.getElementById('heroCounter');
  const secIds  = ['hero', 'about', 'skills', 'projects', 'timeline', 'contact'];
  const secNums = ['01',   '02',    '03',     '04',       '05',       '06'];

  function updateHeroCounter() {
    if (!heroCounter) return;
    const mid = window.scrollY + window.innerHeight * 0.45;
    secIds.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && mid >= el.offsetTop) heroCounter.textContent = secNums[i];
    });
  }

  /* ═══════════════════════════════════
     5. HERO PARALLAX
  ═══════════════════════════════════ */
  const heroName = document.getElementById('heroName');
  function heroParallax() {
    if (heroName) heroName.style.transform = `translateY(${window.scrollY * 0.16}px)`;
  }

  /* ═══════════════════════════════════
     6. HAMBURGER / MOBILE MENU
  ═══════════════════════════════════ */
  const burger  = document.getElementById('burger');
  const mobMenu = document.getElementById('mobMenu');

  function openMenu() {
    mobMenu.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    mobMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    mobMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (burger && mobMenu) {
    burger.addEventListener('click', () => mobMenu.classList.contains('open') ? closeMenu() : openMenu());
    document.querySelectorAll('.mm').forEach(a => a.addEventListener('click', closeMenu));
  }

  const hireCta = document.getElementById('hireCta');
  if (hireCta) hireCta.addEventListener('click', () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  });

  /* ═══════════════════════════════════
     7. REVEAL ON SCROLL
  ═══════════════════════════════════ */
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.querySelectorAll('.sk-fill').forEach(f => { f.style.transform = `scaleX(${f.dataset.w})`; });
      e.target.querySelectorAll('[data-count]').forEach(animCounter);
      revObs.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.rv').forEach(el => revObs.observe(el));

  /* ═══════════════════════════════════
     8. COUNTER ANIMATION
  ═══════════════════════════════════ */
  function animCounter(el) {
    if (el._counted) return;
    el._counted = true;
    const target = parseInt(el.dataset.count, 10);
    const numEl  = el.querySelector('.cn');
    if (!numEl) return;
    let cur = 0;
    const step = target / 45;
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      numEl.textContent = Math.floor(cur);
      if (cur >= target) clearInterval(t);
    }, 30);
  }

  /* ═══════════════════════════════════
     9. SKILL BARS
  ═══════════════════════════════════ */
  const skObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.sk-fill').forEach((f, i) => {
        setTimeout(() => { f.style.transform = `scaleX(${f.dataset.w})`; }, i * 80);
      });
      skObs.unobserve(e.target);
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('.sk-col').forEach(c => skObs.observe(c));

  /* ═══════════════════════════════════
     10. PROJECT FILTER
  ═══════════════════════════════════ */
  document.querySelectorAll('.fb').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.fb').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      const f = btn.dataset.f;
      document.querySelectorAll('.pj-row').forEach((row, i) => {
        const cats = row.dataset.cat || '';
        const show = f === 'all' || cats.includes(f);
        if (show) {
          row.classList.remove('gone');
          row.style.opacity = '0'; row.style.transform = 'translateY(20px)';
          setTimeout(() => {
            row.style.transition = 'opacity .5s ease, transform .5s ease';
            row.style.opacity = '1'; row.style.transform = 'none';
          }, i * 55);
        } else {
          row.classList.add('gone');
        }
      });
    });
  });

  /* ═══════════════════════════════════
     11. STAT CARD TILT
  ═══════════════════════════════════ */
  document.querySelectorAll('.stat-c').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2)  / r.width;
      const y = (e.clientY - r.top  - r.height / 2) / r.height;
      card.style.transform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 4}deg) translateX(4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ═══════════════════════════════════
     12. SMOOTH SCROLL
  ═══════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ═══════════════════════════════════
     13. TYPING CURSOR
  ═══════════════════════════════════ */
  const htag = document.querySelector('.h-tag');
  if (htag) {
    const caret = document.createElement('span');
    caret.textContent = '|';
    caret.style.cssText = 'color:var(--color-lime);margin-left:3px;';
    htag.appendChild(caret);
    setInterval(() => { caret.style.opacity = caret.style.opacity === '0' ? '1' : '0'; }, 530);
  }

  /* ═══════════════════════════════════
     14. FOOTER YEAR
  ═══════════════════════════════════ */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ═══════════════════════════════════
     15. STRIP PAUSE ON HOVER
  ═══════════════════════════════════ */
  const strip = document.getElementById('stripTrack');
  if (strip) {
    strip.addEventListener('mouseenter', () => strip.style.animationPlayState = 'paused');
    strip.addEventListener('mouseleave', () => strip.style.animationPlayState = 'running');
  }

  /* ═══════════════════════════════════
     16. KEYBOARD ACCESSIBILITY
  ═══════════════════════════════════ */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobMenu?.classList.contains('open')) closeMenu();
  });

})();
