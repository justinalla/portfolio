// ============================================================
// Portfolio — Justin Allaglo · JS partagé (toutes les pages)
// ============================================================

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Année courante (footer) ----------
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

// ---------- Barre de progression de lecture ----------
const progress = document.querySelector('.progress');
if (progress) {
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = max > 0 ? (window.scrollY / max) * 100 + '%' : '0%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ---------- Apparition au défilement (.reveal) ----------
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// ---------- Compteurs animés ([data-count]) ----------
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const animate = el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }
    const dur = 1400;
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(el => io.observe(el));
  } else {
    counters.forEach(animate);
  }
}

// ---------- Filtre des projets par discipline (page Travail) ----------
// « Tout » affiche tous les projets ; un badge spécifique n'affiche
// que les projets concernés, les autres sont masqués.
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('#grid .card');
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => {
      c.classList.remove('active');
      c.setAttribute('aria-pressed', 'false');
    });
    chip.classList.add('active');
    chip.setAttribute('aria-pressed', 'true');
    const f = chip.dataset.f;
    cards.forEach(card => {
      const match = f === 'all' || card.dataset.tags.split(' ').includes(f);
      card.classList.toggle('hide', !match);
    });
  });
});
