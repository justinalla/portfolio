import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const menuToggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const primaryNav = document.querySelector<HTMLElement>('#primary-navigation');
if (menuToggle && primaryNav) {
  const mobile = window.matchMedia('(max-width: 820px)');
  const setMenu = (open: boolean) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    primaryNav.hidden = mobile.matches && !open;
  };
  const resetMenu = () => {
    menuToggle.hidden = !mobile.matches;
    if (!mobile.matches && document.activeElement === menuToggle) primaryNav.querySelector<HTMLAnchorElement>('a')?.focus();
    if (mobile.matches && primaryNav.contains(document.activeElement)) menuToggle.focus();
    setMenu(false);
  };
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  primaryNav.addEventListener('click', event => {
    if ((event.target as Element).closest('a') && mobile.matches) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false); menuToggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!menuToggle.contains(event.target as Node) && !primaryNav.contains(event.target as Node)) setMenu(false);
  });
  mobile.addEventListener('change', resetMenu);
  resetMenu();
}

const lightbox = document.querySelector<HTMLDialogElement>('[data-lightbox]');
const lightboxImage = document.querySelector<HTMLImageElement>('[data-lightbox-image]');
const lightboxTitle = document.querySelector<HTMLElement>('[data-lightbox-title]');
const closeLightbox = document.querySelector<HTMLButtonElement>('[data-lightbox-close]');
let lightboxOpener: HTMLAnchorElement | null = null;
if (lightbox && lightboxImage && lightboxTitle && closeLightbox && typeof lightbox.showModal === 'function') {
  document.querySelectorAll<HTMLAnchorElement>('[data-lightbox-trigger]').forEach(link => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      lightboxOpener = link;
      lightboxImage.src = link.href;
      lightboxImage.alt = link.querySelector('img')?.alt || '';
      lightboxTitle.textContent = link.dataset.title || 'Capture de l’application';
      lightbox.showModal();
      document.documentElement.classList.add('overlay-open');
      closeLightbox.focus();
    });
  });
  closeLightbox.addEventListener('click', () => lightbox.close());
  let backdropPressed = false;
  lightbox.addEventListener('pointerdown', event => { backdropPressed = event.target === lightbox; });
  lightbox.addEventListener('click', event => {
    if (backdropPressed && event.target === lightbox) lightbox.close();
    backdropPressed = false;
  });
  lightbox.addEventListener('close', () => {
    document.documentElement.classList.remove('overlay-open');
    lightboxOpener?.focus({ preventScroll: true });
    lightboxImage.removeAttribute('src');
  });
}

// HTML stays visible without JavaScript. Reduced motion reverts all GSAP styles.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const media = gsap.matchMedia();
media.add('(prefers-reduced-motion: no-preference)', () => {
  const lines = document.querySelectorAll('[data-hero-line]');
  if (lines.length) gsap.from(lines, { yPercent: 105, rotation: 2, duration: .85, stagger: .1, ease: 'power3.out', clearProps: 'transform' });
  gsap.from('[data-intro]', { opacity: 0, y: 18, duration: .65, stagger: .08, delay: lines.length ? .2 : 0, ease: 'power2.out', clearProps: 'opacity,transform' });
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
    gsap.from(element, { opacity: .35, y: 24, duration: .65, ease: 'power2.out', clearProps: 'opacity,transform', scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
  });
});
// A subtle depth effect only on larger screens; native scrolling stays untouched.
media.add('(min-width: 821px) and (prefers-reduced-motion: no-preference)', () => {
  const stage = document.querySelector('.showcase-stage');
  if (stage) gsap.to('.showcase-phone', { y: -18, stagger: .08, ease: 'none', scrollTrigger: { trigger: stage, start: 'top center', end: 'bottom top', scrub: .7 } });
});
let filterAnimation: gsap.core.Tween | undefined;
motionPreference.addEventListener('change', event => {
  if (event.matches) {
    filterAnimation?.kill();
    gsap.set('[data-project]', { clearProps: 'opacity,transform' });
  }
});

const progress = document.querySelector<HTMLElement>('.reading-progress');
let framePending = false;
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`;
  framePending = false;
}
function scheduleProgress() {
  if (!framePending) { framePending = true; requestAnimationFrame(updateProgress); }
}
window.addEventListener('scroll', scheduleProgress, { passive: true });
window.addEventListener('resize', scheduleProgress);
updateProgress();

const filterButtons = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
const cards = document.querySelectorAll<HTMLElement>('[data-project]');
const results = document.querySelector<HTMLElement>('[data-results]');
const filterGroup = document.querySelector<HTMLElement>('[data-filters]');
if (filterGroup) filterGroup.hidden = false;
const applyFilter = (filter: string, updateUrl = true) => {
  filterAnimation?.kill();
  gsap.killTweensOf(cards);
  gsap.set(cards, { clearProps: 'opacity,transform' });
  filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item.dataset.filter === filter)));
  const visible: HTMLElement[] = [];
  cards.forEach(card => {
    card.hidden = filter !== 'all' && !(card.dataset.tags || '').split(' ').includes(filter);
    if (!card.hidden) visible.push(card);
  });
  if (results) results.textContent = `${visible.length} résultat${visible.length > 1 ? 's' : ''}`;
  if (!motionPreference.matches) filterAnimation = gsap.fromTo(visible, { opacity: .5, y: 10 }, { opacity: 1, y: 0, duration: .3, stagger: .035, overwrite: true, clearProps: 'opacity,transform' });
  if (updateUrl) {
    const next = new URL(window.location.href);
    if (filter === 'all') next.searchParams.delete('domaine');
    else next.searchParams.set('domaine', filter);
    window.history.replaceState(null, '', next);
  }
  ScrollTrigger.refresh();
  scheduleProgress();
};
if (filterGroup) {
  const readFilter = () => {
    const requested = new URLSearchParams(window.location.search).get('domaine');
    return Array.from(filterButtons).some(button => button.dataset.filter === requested) ? requested! : 'all';
  };
  applyFilter(readFilter(), false);
  filterButtons.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter || 'all')));
  window.addEventListener('popstate', () => applyFilter(readFilter(), false));
}

const copyButton = document.querySelector<HTMLButtonElement>('[data-copy]');
const copyStatus = document.querySelector<HTMLElement>('[data-copy-status]');
copyButton?.addEventListener('click', async () => {
  const email = copyButton.dataset.copy || '';
  try {
    await navigator.clipboard.writeText(email);
    if (copyStatus) copyStatus.textContent = 'Adresse copiée. Vous pouvez la coller dans votre messagerie.';
  } catch {
    if (copyStatus) copyStatus.textContent = 'Copie automatique indisponible. Sélectionnez l’adresse ci-dessus pour la copier.';
  }
});

const contactForm = document.querySelector<HTMLFormElement>('[data-contact-form]');
contactForm?.addEventListener('submit', event => {
 event.preventDefault();
 if (!contactForm.reportValidity()) return;
 const values = new FormData(contactForm);
 const service = String(values.get('service') || 'Mon projet');
 const body = `Bonjour Justin,\n\n${values.get('message')}\n\n${values.get('name')}\n${values.get('email')}`;
 window.location.href = `mailto:justinallaglocareer@gmail.com?subject=${encodeURIComponent(service)}&body=${encodeURIComponent(body)}`;
 const status = document.querySelector<HTMLElement>('[data-contact-status]');
 if (status) status.textContent = 'Votre messagerie va s’ouvrir. Si elle ne s’ouvre pas, utilisez le lien e-mail sur cette page. Votre message reste disponible ici.';
});
