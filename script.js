/* ==========================================================================
   GEO · Fortaleza — Fase 1: Hero Cinematográfico + Navegação
   - Revelação escalonada ao carregar
   - Zoom lento / parallax do vídeo dirigido por scroll (rAF, GPU-only)
   - Header com mudança de estado ao rolar + barra de progresso
   - Menu mobile acessível
   - Respeito total a prefers-reduced-motion e economia de bateria
   ========================================================================== */
(function () {
  "use strict";

  var body = document.body;
  var header = document.getElementById("siteHeader");
  var progressBar = document.getElementById("scrollProgress");
  var heroMedia = document.getElementById("heroMedia");
  var heroVideo = document.getElementById("heroVideo");
  var menuToggle = document.getElementById("menuToggle");
  var mainNav = document.getElementById("mainNav");

  /* ---------- Preferências de movimento ---------- */
  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reducedMotion = motionQuery.matches;
  if (motionQuery.addEventListener) {
    motionQuery.addEventListener("change", function (e) {
      reducedMotion = e.matches;
      if (reducedMotion) resetMediaTransform();
    });
  }

  /* ---------- 1. Revelação escalonada ao carregar ---------- */
  function triggerReveal() {
    body.classList.add("is-loaded");
  }
  // Dispara no primeiro frame pintado (fontes podem trocar métricas logo depois)
  requestAnimationFrame(function () {
    requestAnimationFrame(triggerReveal);
  });
  // Rede de segurança caso fonts/loading demorem
  window.addEventListener("load", triggerReveal);

  /* ---------- 2. Vídeo: fade-in quando pronto + economia de recursos ---------- */
  if (heroVideo) {
    var markReady = function () { heroVideo.classList.add("is-ready"); };
    if (heroVideo.readyState >= 2) {
      markReady();
    } else {
      heroVideo.addEventListener("loadeddata", markReady, { once: true });
    }
    // Alguns navegadores bloqueiam autoplay mesmo sem áudio: mantém poster/fallback
    var tryPlay = heroVideo.play();
    if (tryPlay && tryPlay.catch) { tryPlay.catch(function () { /* silencioso */ }); }

    // Pausa o vídeo quando o hero sai da viewport (bateria/CPU em mobile)
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (reducedMotion) return;
          if (entry.isIntersecting) {
            var p = heroVideo.play();
            if (p && p.catch) p.catch(function () {});
          } else {
            heroVideo.pause();
          }
        });
      }, { threshold: 0.05 }).observe(heroVideo);
    }
  }

  /* ---------- 3. Scroll: header state + progresso + parallax/zoom do hero ---------- */
  var ticking = false;
  var lastY = -1;

  function resetMediaTransform() {
    if (heroMedia) heroMedia.style.transform = "";
  }

  function onScrollFrame() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset || 0;
    if (y === lastY) return;
    lastY = y;

    // Header: transparente -> véu com blur após ~80px
    if (header) header.classList.toggle("is-scrolled", y > 80);

    // Barra fina de progresso do documento
    if (progressBar) {
      var docH = Math.max(
        document.documentElement.scrollHeight - window.innerHeight, 1
      );
      var ratio = Math.min(Math.max(y / docH, 0), 1);
      progressBar.style.transform = "scaleX(" + ratio.toFixed(4) + ")";
    }

    // Parallax + zoom lento contínuo no vídeo/fallback enquanto o hero vive na tela
    if (heroMedia && !reducedMotion) {
      var heroH = window.innerHeight || 1;
      var p = Math.min(Math.max(y / heroH, 0), 1); // 0..1 ao longo de uma tela
      var scale = 1.06 + p * 0.14;                // 1.06 -> 1.20 : aproximação lenta
      var drift = p * 90;                          // leve subida (parallax suave)
      heroMedia.style.transform =
        "translate3d(0," + (-drift).toFixed(2) + "px,0) scale(" + scale.toFixed(4) + ")";
    } else if (heroMedia && reducedMotion) {
      resetMediaTransform();
    }
  }

  function requestTick() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScrollFrame);
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick, { passive: true });
  onScrollFrame(); // estado inicial (ex.: página recarregada no meio do scroll)

  /* ---------- 4. Menu mobile (overlay fullscreen) ---------- */
  function setMenu(open) {
    if (!mainNav || !menuToggle) return;
    mainNav.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    body.style.overflow = open ? "hidden" : "";
    if (open) {
      var firstLink = mainNav.querySelector("a");
      if (firstLink) firstLink.focus({ preventScroll: true });
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
    });
  }

  if (mainNav) {
    mainNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mainNav && mainNav.classList.contains("is-open")) {
      setMenu(false);
      if (menuToggle) menuToggle.focus();
    }
  });

  /* ---------- 5. Link ativo conforme a seção visível ---------- */
  var sections = ["hero", "geo", "experiencia", "falar"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  function setActive(id) {
    var links = document.querySelectorAll(".nav-link, .dot");
    links.forEach(function (el) {
      var match = el.getAttribute("href") === "#" + id;
      el.classList.toggle("is-active", match);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
      });
      var bestId = null, best = 0;
      Object.keys(visible).forEach(function (id) {
        if (visible[id] > best) { best = visible[id]; bestId = id; }
      });
      if (bestId) setActive(bestId);
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
    sections.forEach(function (s) { io.observe(s); });
  }
})();
