const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav-links');
const themeToggle = document.querySelector('#themeToggle');
const music = document.querySelector('#bgMusic');
const musicBtn = document.querySelector('#musicBtn');

menu?.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
function updateThemeIcon(){
  const dark = document.documentElement.dataset.theme === 'dark';
  themeToggle.textContent = dark ? '☀' : '☾';
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}
updateThemeIcon();
themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('portfolio-theme', next);
  updateThemeIcon();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

musicBtn?.addEventListener('click', async () => {
  if (music.paused) {
    try { await music.play(); musicBtn.textContent = '⏸ Pause Music'; }
    catch { musicBtn.textContent = '▶ Tap to Play'; }
  } else { music.pause(); musicBtn.textContent = '🎵 Play Music'; }
});
