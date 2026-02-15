(function () {
  function init() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Show everything immediately
      var els = document.querySelectorAll('.reveal');
      for (var i = 0; i < els.length; i++) els[i].classList.add('visible');
      return;
    }

    // Scroll reveal
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    var reveals = document.querySelectorAll('.reveal');
    for (var j = 0; j < reveals.length; j++) observer.observe(reveals[j]);

    // Nav border on scroll
    var nav = document.querySelector('body > nav');
    if (nav) {
      var hero = document.querySelector('.hero');
      var heroBottom = hero ? hero.offsetHeight : 100;
      window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }, { passive: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
