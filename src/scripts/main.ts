import { animate, inView, stagger } from 'motion';

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

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let motionAllowed = !motionPreference.matches;
const runningAnimations: ReturnType<typeof animate>[] = [];

// Content is visible in the HTML and CSS; animations enhance a working page.
if (motionAllowed) {
  runningAnimations.push(animate('[data-intro]', { opacity: [0, 1], y: [20, 0] }, { duration: 0.7, delay: stagger(0.09), ease: [0.22, 1, 0.36, 1] }));
  inView('[data-reveal]', element => {
    if (motionAllowed) runningAnimations.push(animate(element, { opacity: [0.35, 1], y: [22, 0] }, { duration: 0.65, ease: [0.22, 1, 0.36, 1] }));
  }, { amount: 0.1 });
}
motionPreference.addEventListener('change', event => {
  motionAllowed = !event.matches;
  if (event.matches) runningAnimations.forEach(animation => animation.complete());
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
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  const visible: HTMLElement[] = [];
  cards.forEach(card => {
    card.hidden = filter !== 'all' && !(card.dataset.tags || '').split(' ').includes(filter || '');
    if (!card.hidden) visible.push(card);
  });
  if (results) results.textContent = `${visible.length} résultat${visible.length > 1 ? 's' : ''}`;
  if (motionAllowed) runningAnimations.push(animate(visible, { opacity: [0.4, 1], y: [12, 0] }, { duration: 0.32, delay: stagger(0.035) }));
  scheduleProgress();
}));

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
