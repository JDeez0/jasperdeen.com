(function () {
  var track = document.querySelector('.tl-track');
  if (!track) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  track.classList.add('tl-js');
  var fill = track.querySelector('.tl-track-fill');
  var items = track.querySelectorAll('.timeline-list li');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('tl-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    items.forEach(function (li) { io.observe(li); });
  } else {
    items.forEach(function (li) { li.classList.add('tl-visible'); });
  }

  if (!fill) return;
  var ticking = false;
  function updateFill() {
    ticking = false;
    var rect = track.getBoundingClientRect();
    var vh = window.innerHeight;
    var total = rect.height + vh;
    var scrolled = vh - rect.top;
    var progress = Math.min(1, Math.max(0, scrolled / total));
    fill.style.transform = 'scaleY(' + progress + ')';
  }
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateFill);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateFill();
})();
