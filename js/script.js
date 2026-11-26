(() => {
  const elements = Array.from(document.querySelectorAll('.reveal'));
  if (!elements.length || typeof IntersectionObserver !== 'function') return;
  if (typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let observer;
  try {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending');
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    elements.forEach((element) => observer.observe(element));
    elements.forEach((element) => element.classList.add('reveal-pending'));
  } catch (_) {
    // Animation is optional; keep the portfolio readable if setup fails.
    elements.forEach((element) => element.classList.remove('reveal-pending'));
    if (observer) observer.disconnect();
  }
})();
