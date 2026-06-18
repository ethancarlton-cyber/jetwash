// JetWash — mobile hamburger nav (Wave B 2026-06-18)
// Toggles the existing .nav-desktop into a dropdown panel on mobile.
document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav-desktop');
  if (!header || !toggle || !nav) return;

  function close() {
    header.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }
  function open() {
    header.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
  }
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    header.classList.contains('nav-open') ? close() : open();
  });
  // close after tapping a link inside the menu
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) close();
  });
  // close on outside click / Escape
  document.addEventListener('click', function (e) {
    if (header.classList.contains('nav-open') && !header.contains(e.target)) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
});
