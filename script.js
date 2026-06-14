(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var root = document.documentElement;
  var loaderStartedAt = Date.now();
  var minLoaderDuration = 1000;
  var siteLoader = document.getElementById("site-loader");
  var siteHeader = document.querySelector(".site-header");
  var scrollNav = document.querySelector("[data-scroll-nav]");
  var scrollNavButtons = scrollNav ? scrollNav.querySelectorAll("[data-scroll-page]") : [];
  var scrollNavTicking = false;
  var scrollProgressTicking = false;
  var experienceYearLabels = document.querySelectorAll("[data-experience-years]");
  var navScrollTicking = false;
  var navItems = Array.prototype.slice
    .call(document.querySelectorAll(".nav-links a[href^='#']"))
    .map(function (link) {
      var sectionId = link.hash ? link.hash.slice(1) : "";
      var section = sectionId ? document.getElementById(sectionId) : null;

      return {
        link: link,
        section: section,
      };
    })
    .filter(function (item) {
      return item.section;
    })
    .sort(function (a, b) {
      return a.section.compareDocumentPosition(b.section) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });

  function updateExperienceYears() {
    var currentYear = new Date().getFullYear();

    Array.prototype.forEach.call(experienceYearLabels, function (label) {
      var startYear = parseInt(label.getAttribute("data-experience-start-year"), 10);

      if (!startYear || startYear > currentYear) {
        return;
      }

      label.textContent = currentYear - startYear + "+";
    });
  }

  function getHeaderHeight() {
    return siteHeader ? siteHeader.offsetHeight : 0;
  }

  updateExperienceYears();

  function setActiveNavItem(activeItem) {
    navItems.forEach(function (item) {
      var isActive = item === activeItem;

      item.link.classList.toggle("is-active", isActive);

      if (isActive) {
        item.link.setAttribute("aria-current", "page");
      } else {
        item.link.removeAttribute("aria-current");
      }
    });
  }

  function updateActiveNavItem() {
    var headerHeight = getHeaderHeight();
    var activationLine = headerHeight + Math.min(window.innerHeight * 0.22, 180);
    var activeItem = navItems[0];
    var isNearPageBottom = window.innerHeight + window.scrollY >= root.scrollHeight - 2;

    if (isNearPageBottom) {
      activeItem = navItems[navItems.length - 1];
    } else {
      navItems.forEach(function (item) {
        if (item.section.getBoundingClientRect().top <= activationLine) {
          activeItem = item;
        }
      });
    }

    setActiveNavItem(activeItem);
    navScrollTicking = false;
  }

  function scheduleActiveNavUpdate() {
    if (navItems.length === 0 || navScrollTicking) {
      return;
    }

    window.requestAnimationFrame(updateActiveNavItem);
    navScrollTicking = true;
  }

  window.addEventListener("scroll", scheduleActiveNavUpdate, { passive: true });
  window.addEventListener("resize", scheduleActiveNavUpdate);
  window.addEventListener("load", scheduleActiveNavUpdate);
  scheduleActiveNavUpdate();

  function revealLoadedSite() {
    var elapsed = Date.now() - loaderStartedAt;
    var remaining = Math.max(0, minLoaderDuration - elapsed);

    window.setTimeout(function () {
      document.body.classList.add("is-loaded");
      document.body.classList.remove("is-loading");

      if (siteLoader) {
        siteLoader.setAttribute("aria-hidden", "true");

        window.setTimeout(
          function () {
            if (siteLoader.parentNode) {
              siteLoader.parentNode.removeChild(siteLoader);
            }
          },
          reduceMotion ? 0 : 480
        );
      }
    }, remaining);
  }

  if (document.readyState === "complete") {
    revealLoadedSite();
  } else {
    window.addEventListener("load", revealLoadedSite, { once: true });
  }

  function updatePageScrollProgress() {
    var scrollMax = Math.max(0, root.scrollHeight - window.innerHeight);
    var progress = scrollMax > 0 ? window.scrollY / scrollMax : 0;

    progress = Math.max(0, Math.min(1, progress));
    root.style.setProperty("--page-scroll-progress", progress.toFixed(4));
    scrollProgressTicking = false;
  }

  function schedulePageScrollProgress() {
    if (!scrollProgressTicking) {
      window.requestAnimationFrame(updatePageScrollProgress);
      scrollProgressTicking = true;
    }
  }

  window.addEventListener("scroll", schedulePageScrollProgress, { passive: true });
  window.addEventListener("resize", schedulePageScrollProgress);
  window.addEventListener("load", schedulePageScrollProgress);
  updatePageScrollProgress();

  var scrollTargets = [
    "#top",
    "#services",
    "#work",
    "#process",
    ".industries-section",
    "#about",
    ".pre-contact-grid",
    "#contact",
  ]
    .map(function (selector) {
      return document.querySelector(selector);
    })
    .filter(Boolean);

  function getTargetTop(target) {
    return target.getBoundingClientRect().top + window.scrollY;
  }

  function getCurrentScrollTargetIndex() {
    var currentLine = window.scrollY + getHeaderHeight() + 32;
    var currentIndex = 0;

    scrollTargets.forEach(function (target, index) {
      if (getTargetTop(target) <= currentLine) {
        currentIndex = index;
      }
    });

    return currentIndex;
  }

  function updateScrollNavState() {
    if (!scrollNav || scrollNavButtons.length === 0) {
      return;
    }

    var isNearTop = window.scrollY <= 8;
    var isNearBottom = window.innerHeight + window.scrollY >= root.scrollHeight - 8;

    Array.prototype.forEach.call(scrollNavButtons, function (button) {
      var direction = button.getAttribute("data-scroll-page");
      button.disabled = direction === "up" ? isNearTop : isNearBottom;
    });

    scrollNavTicking = false;
  }

  function scheduleScrollNavUpdate() {
    if (!scrollNav || scrollNavTicking) {
      return;
    }

    window.requestAnimationFrame(updateScrollNavState);
    scrollNavTicking = true;
  }

  function scrollToTargetIndex(index) {
    var target = scrollTargets[index];

    if (!target) {
      return;
    }

    window.scrollTo({
      top: Math.max(0, getTargetTop(target) - getHeaderHeight() - 18),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  if (scrollNav && scrollTargets.length > 1) {
    scrollNav.hidden = false;

    Array.prototype.forEach.call(scrollNavButtons, function (button) {
      button.addEventListener("click", function () {
        var direction = button.getAttribute("data-scroll-page");
        var currentIndex = getCurrentScrollTargetIndex();
        var nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

        if (direction === "up" && currentIndex === 0) {
          window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "auto" : "smooth",
          });
          return;
        }

        if (direction === "down" && currentIndex === scrollTargets.length - 1) {
          window.scrollTo({
            top: Math.max(0, root.scrollHeight - window.innerHeight),
            behavior: reduceMotion ? "auto" : "smooth",
          });
          return;
        }

        nextIndex = Math.max(0, Math.min(scrollTargets.length - 1, nextIndex));
        scrollToTargetIndex(nextIndex);
      });
    });

    window.addEventListener("scroll", scheduleScrollNavUpdate, { passive: true });
    window.addEventListener("resize", scheduleScrollNavUpdate);
    window.addEventListener("load", scheduleScrollNavUpdate);
    updateScrollNavState();
  }

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
    ".credibility-strip, .section-block, .contact-section, .build-card, .project-carousel, .process-step, .industry-card, .contact-card"
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

  var projectCarousel = document.querySelector("[data-project-carousel]");
  var projectDetails = Array.prototype.slice.call(document.querySelectorAll(".project-details"));
  var projectDetailsMobileQuery = window.matchMedia("(max-width: 680px)");
  var projectDetailsAnimationMs = 260;
  var projectDetailsMobileExpanded = false;

  function updateProjectCarouselDetailsLock() {
    if (!projectCarousel) {
      return;
    }

    projectCarousel.classList.toggle(
      "is-details-open",
      projectDetailsMobileQuery.matches && projectDetailsMobileExpanded
    );
  }

  function setProjectDetailsInstant(details, open) {
    details.open = open;
    details.style.height = "";
    details.style.overflow = "";
    details.style.transition = "";
    details.removeAttribute("data-animating");
  }

  function closeProjectDetailsExcept(activeDetails) {
    if (!projectDetailsMobileQuery.matches) {
      return;
    }

    projectDetails.forEach(function (details) {
      if (details !== activeDetails) {
        setProjectDetailsInstant(details, false);
      }
    });
  }

  function syncProjectDetailsMode() {
    projectDetails.forEach(function (details) {
      setProjectDetailsInstant(details, !projectDetailsMobileQuery.matches);
    });

    projectDetailsMobileExpanded = false;
    updateProjectCarouselDetailsLock();
  }

  function getProjectDetailsClosedHeight(details) {
    var summary = details.querySelector("summary");
    return summary ? summary.offsetHeight : 0;
  }

  function getProjectDetailsOpenHeight(details) {
    var previousHeight = details.style.height;
    var previousTransition = details.style.transition;

    details.style.transition = "none";
    details.style.height = "auto";

    var height = details.scrollHeight;

    details.style.height = previousHeight;
    details.style.transition = previousTransition;

    return height;
  }

  function finishProjectDetailsAnimation(details, open) {
    details.open = open;
    details.style.height = "";
    details.style.overflow = "";
    details.style.transition = "";
    details.removeAttribute("data-animating");
  }

  function animateProjectDetails(details, open) {
    var startHeight = details.open ? details.offsetHeight : getProjectDetailsClosedHeight(details);

    details.style.overflow = "hidden";
    details.style.height = startHeight + "px";
    details.style.transition = "height " + projectDetailsAnimationMs + "ms ease";
    details.setAttribute("data-animating", "true");

    if (open) {
      details.open = true;
    }

    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        var endHeight = open ? getProjectDetailsOpenHeight(details) : getProjectDetailsClosedHeight(details);
        details.style.height = endHeight + "px";
      });
    });

    window.setTimeout(function () {
      finishProjectDetailsAnimation(details, open);
    }, projectDetailsAnimationMs + 40);
  }

  if (projectDetails.length > 0) {
    syncProjectDetailsMode();

    projectDetails.forEach(function (details) {
      var summary = details.querySelector("summary");

      if (!summary) {
        return;
      }

      summary.addEventListener("click", function (event) {
        if (!projectDetailsMobileQuery.matches || details.hasAttribute("data-animating")) {
          return;
        }

        event.preventDefault();

        var nextOpen = !details.open;
        projectDetailsMobileExpanded = nextOpen;
        updateProjectCarouselDetailsLock();

        if (nextOpen) {
          closeProjectDetailsExcept(details);
        }

        if (reduceMotion) {
          setProjectDetailsInstant(details, nextOpen);
          return;
        }

        animateProjectDetails(details, nextOpen);
      });
    });

    if (typeof projectDetailsMobileQuery.addEventListener === "function") {
      projectDetailsMobileQuery.addEventListener("change", syncProjectDetailsMode);
    } else if (typeof projectDetailsMobileQuery.addListener === "function") {
      projectDetailsMobileQuery.addListener(syncProjectDetailsMode);
    }
  }

  if (projectCarousel) {
    var projectTrack = projectCarousel.querySelector("[data-project-track]");
    var projectSlides = Array.prototype.slice.call(projectCarousel.querySelectorAll("[data-project-slide]"));
    var projectPrev = projectCarousel.querySelector("[data-project-prev]");
    var projectNext = projectCarousel.querySelector("[data-project-next]");

    if (projectTrack && projectSlides.length > 0) {
      var projectIndex = 0;
      var projectAutoTimer = null;
      var projectRestartTimer = null;
      var projectScrollTicking = false;
      var projectAutoDelay = 12000;
      var projectRestartDelay = 15000;

      function syncActiveProjectDetails() {
        if (!projectDetailsMobileQuery.matches) {
          return;
        }

        var activeSlide = projectSlides[projectIndex];
        var activeDetails = activeSlide ? activeSlide.querySelector(".project-details") : null;

        if (!activeDetails) {
          return;
        }

        closeProjectDetailsExcept(activeDetails);
        setProjectDetailsInstant(activeDetails, projectDetailsMobileExpanded);
      }

      function updateProjectProgress() {
        projectSlides.forEach(function (slide, index) {
          slide.setAttribute("aria-current", index === projectIndex ? "true" : "false");
        });

        syncActiveProjectDetails();
      }

      function goToProject(nextIndex, immediate) {
        projectIndex = (nextIndex + projectSlides.length) % projectSlides.length;

        var scrollTarget = projectIndex * projectTrack.clientWidth;

        if (typeof projectTrack.scrollTo === "function") {
          projectTrack.scrollTo({
            left: scrollTarget,
            behavior: immediate || reduceMotion ? "auto" : "smooth",
          });
        } else {
          projectTrack.scrollLeft = scrollTarget;
        }

        updateProjectProgress();
      }

      function syncProjectFromScroll() {
        projectScrollTicking = false;

        if (projectDetailsMobileQuery.matches && projectDetailsMobileExpanded) {
          var lockedTarget = projectIndex * projectTrack.clientWidth;

          if (Math.abs(projectTrack.scrollLeft - lockedTarget) > 1) {
            projectTrack.scrollLeft = lockedTarget;
          }

          return;
        }

        var slideWidth = projectTrack.clientWidth || 1;
        var nextIndex = Math.round(projectTrack.scrollLeft / slideWidth);
        nextIndex = Math.max(0, Math.min(projectSlides.length - 1, nextIndex));

        if (nextIndex !== projectIndex) {
          projectIndex = nextIndex;
          updateProjectProgress();
        }
      }

      function stopProjectAuto() {
        if (projectAutoTimer) {
          window.clearInterval(projectAutoTimer);
          projectAutoTimer = null;
        }

        if (projectRestartTimer) {
          window.clearTimeout(projectRestartTimer);
          projectRestartTimer = null;
        }
      }

      function startProjectAuto() {
        if (reduceMotion || projectDetailsMobileQuery.matches || projectSlides.length < 2 || projectAutoTimer) {
          return;
        }

        projectAutoTimer = window.setInterval(function () {
          goToProject(projectIndex + 1);
        }, projectAutoDelay);
      }

      function scheduleProjectAuto() {
        stopProjectAuto();

        if (reduceMotion || projectDetailsMobileQuery.matches || projectSlides.length < 2) {
          return;
        }

        projectRestartTimer = window.setTimeout(startProjectAuto, projectRestartDelay);
      }

      if (projectPrev) {
        projectPrev.addEventListener("click", function () {
          goToProject(projectIndex - 1);
          scheduleProjectAuto();
        });
      }

      if (projectNext) {
        projectNext.addEventListener("click", function () {
          goToProject(projectIndex + 1);
          scheduleProjectAuto();
        });
      }

      projectTrack.addEventListener(
        "scroll",
        function () {
          if (!projectScrollTicking) {
            window.requestAnimationFrame(syncProjectFromScroll);
            projectScrollTicking = true;
          }
        },
        { passive: true }
      );

      projectCarousel.addEventListener("pointerenter", stopProjectAuto);
      projectCarousel.addEventListener("pointerleave", scheduleProjectAuto);
      projectCarousel.addEventListener("focusin", stopProjectAuto);
      projectCarousel.addEventListener("focusout", scheduleProjectAuto);

      window.addEventListener("resize", function () {
        goToProject(projectIndex, true);

        if (projectDetailsMobileQuery.matches) {
          stopProjectAuto();
        } else {
          scheduleProjectAuto();
        }
      });

      updateProjectProgress();
      startProjectAuto();
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
