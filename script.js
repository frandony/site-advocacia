// NAV scroll effect
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── MENU HAMBURGER ──────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileOverlay = document.getElementById('mobileMenuOverlay');
const mobileClose = document.getElementById('mobileMenuClose');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-nav-cta');

function openMenu() {
  hamburger.classList.add('open');
  mobileOverlay.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  hamburger.classList.remove('open');
  mobileOverlay.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  hamburger.classList.contains('open') ? closeMenu() : openMenu();
});
mobileClose.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));


// Hero bg parallax otimizado
const heroBg = document.getElementById('heroBg');

// Adiciona a classe de carregamento inicial
setTimeout(() => {
  if(heroBg) heroBg.classList.add('loaded');
}, 100);

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  // Só executa se estivermos na parte superior para poupar processamento
  if(y < window.innerHeight && heroBg) {
    // Usamos translate3d para ativar a aceleração por hardware (GPU)
    // Mantemos um scale levemente maior (1.05) para garantir que não sobre espaço nas bordas
    heroBg.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(1.05)`;
  }
}, { passive: true }); 

// Reveal on scroll (Animações de entrada)
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => io.observe(el));

// Stagger child reveals (Efeito cascata em grids)
document.querySelectorAll('.depo-layout, .areas-grid').forEach(parent => {
  parent.querySelectorAll('.depo-card, .area-card').forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.12}s`;
  });
});