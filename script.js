(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var root = document.documentElement;

  if (finePointer && !reduceMotion) {
    var cursorX = window.innerWidth / 2;
    var cursorY = window.innerHeight / 2;
    var ticking = false;

    function updateCursorGlow() {
      root.style.setProperty("--cursor-x", cursorX + "px");
      root.style.setProperty("--cursor-y", cursorY + "px");
      ticking = false;
    }

    window.addEventListener(
      "pointermove",
      function (event) {
        cursorX = event.clientX;
        cursorY = event.clientY;

        if (!ticking) {
          window.requestAnimationFrame(updateCursorGlow);
          ticking = true;
        }
      },
      { passive: true }
    );

    root.classList.add("has-cursor-glow");
  }

  var revealTargets = document.querySelectorAll(
    ".credibility-strip, .section-block, .contact-section, .build-card, .project-card, .process-step, .industry-card, .tech-strip li, .contact-card"
  );
  var typewriter = document.getElementById("hero-typewriter");

  if (typewriter) {
    var phrases = (typewriter.getAttribute("data-phrases") || "")
      .split("|")
      .map(function (phrase) {
        return phrase.trim();
      })
      .filter(Boolean);

    if (phrases.length > 0) {
      typewriter.textContent = phrases[0];

      if (!reduceMotion && phrases.length > 1) {
        var phraseIndex = 0;
        var charIndex = phrases[0].length;
        var deleting = true;

        function tickTypewriter() {
          var phrase = phrases[phraseIndex];
          var delay = deleting ? 28 : 42;

          if (deleting) {
            charIndex -= 1;
            typewriter.textContent = phrase.slice(0, Math.max(charIndex, 0));

            if (charIndex <= 0) {
              deleting = false;
              phraseIndex = (phraseIndex + 1) % phrases.length;
              delay = 220;
            }
          } else {
            phrase = phrases[phraseIndex];
            charIndex += 1;
            typewriter.textContent = phrase.slice(0, charIndex);

            if (charIndex >= phrase.length) {
              deleting = true;
              delay = 4200;
            }
          }

          window.setTimeout(tickTypewriter, delay);
        }

        window.setTimeout(tickTypewriter, 3200);
      }
    }
  }

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (target) {
      target.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12,
    }
  );

  revealTargets.forEach(function (target, index) {
    target.classList.add("reveal-target");
    target.style.setProperty("--reveal-delay", Math.min(index % 8, 5) * 45 + "ms");
    observer.observe(target);
  });
})();
