(function () {
  "use strict";

  const header = document.getElementById("header");
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll("[data-nav]");
  const themeToggle = document.getElementById("theme-toggle");
  const yearEl = document.getElementById("year");
  const videoModal = document.getElementById("video-modal");
  const modalVideo = document.getElementById("modal-video");
  const modalCaption = document.getElementById("video-modal-caption");
   const sections = [...document.querySelectorAll("section[id]")];
  const contactForm = document.getElementById("contact-form");

  /* ----- Year ----- */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----- Theme ----- */
  const storedTheme = localStorage.getItem("va-portfolio-theme");

  function updateThemeToggleLabel(theme) {
    if (!themeToggle) return;
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("va-portfolio-theme", theme);
    updateThemeToggleLabel(theme);
  }

  if (storedTheme) {
    setTheme(storedTheme);
  } else {
    setTheme("dark");
  }

  themeToggle?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });

  /* ----- Header scroll ----- */
  function onScroll() {
    header?.classList.toggle("is-scrolled", window.scrollY > 40);
    updateActiveNav();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ----- Mobile nav ----- */
  navToggle?.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    navMenu?.classList.toggle("is-open", !open);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle?.setAttribute("aria-expanded", "false");
      navMenu?.classList.remove("is-open");
    });
  });

  /* ----- Active nav section ----- */


  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    let current = "";

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href")?.slice(1);
      link.classList.toggle("is-active", href === current);
    });
  }

  /* ----- Animated stats ----- */
  const statNums = document.querySelectorAll(".stat-num[data-count]");

  function animateCount(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window && statNums.length) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statNums.forEach((el) => statsObserver.observe(el));
  }

  /* ----- Video filter ----- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const editCards = document.querySelectorAll(".edit-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      filterBtns.forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", String(b === btn));
      });

      editCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        const show = filter === "all" || category === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ----- Video modal ----- */
  function openVideoModal(src, title) {
    if (!videoModal || !modalVideo) return;

    modalVideo.pause();
    modalVideo.removeAttribute("src");
    const source = modalVideo.querySelector("source");
    if (source) source.setAttribute("src", src);
    modalVideo.load();

    if (modalCaption) modalCaption.textContent = title || "";
    const titleEl = document.getElementById("video-modal-title");
    if (titleEl) titleEl.textContent = title || "Video preview";

    if (typeof videoModal.showModal === "function") {
      videoModal.showModal();
    } else {
      videoModal.setAttribute("open", "");
    }

    modalVideo.play().catch(() => {});
  }

  function closeVideoModal() {
    if (!videoModal || !modalVideo) return;
    modalVideo.pause();
    if (typeof videoModal.close === "function") {
      videoModal.close();
    } else {
      videoModal.removeAttribute("open");
    }
  }

  editCards.forEach((card) => {
    card.addEventListener("click", () => {
      const src = card.getAttribute("data-video");
      const title = card.getAttribute("data-title");
      if (src) openVideoModal(src, title);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  document.querySelector(".video-modal-close")?.addEventListener("click", closeVideoModal);

  videoModal?.addEventListener("click", (e) => {
    if (e.target === videoModal) closeVideoModal();
  });

  videoModal?.addEventListener("cancel", () => {
    modalVideo?.pause();
  });

  /* ----- Subtle magnetic buttons ----- */
  const magneticBtns = document.querySelectorAll("[data-magnetic]");

  magneticBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });

  /* ----- Contact form (demo) ----- */
  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn?.textContent;
    if (btn) btn.textContent = "Message sent (demo)";
    contactForm.reset();
    setTimeout(() => {
      if (btn && original) btn.textContent = original;
    }, 2500);
  });

  /* ----- Smooth anchor offset for fixed header ----- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();
