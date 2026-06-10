/* DFYNE Design System — Interactive Behaviors */
(function () {
  "use strict";

  /* ---- Carousel / Rail scroll ---- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-dfyne-carousel-prev], [data-dfyne-carousel-next]");
    if (!btn) return;
    var railId = btn.getAttribute("data-dfyne-carousel-prev") || btn.getAttribute("data-dfyne-carousel-next");
    var rail = document.getElementById(railId);
    if (!rail) return;
    var direction = btn.hasAttribute("data-dfyne-carousel-prev") ? -1 : 1;
    rail.scrollBy({ left: rail.clientWidth * 0.8 * direction, behavior: "smooth" });
  });

  /* ---- Accordion ---- */
  document.addEventListener("click", function (e) {
    var trigger = e.target.closest("[data-dfyne-accordion]");
    if (!trigger) return;
    var targetId = trigger.getAttribute("data-dfyne-accordion");
    var content = document.getElementById(targetId);
    if (!content) return;
    var isOpen = content.getAttribute("aria-hidden") !== "true";
    content.setAttribute("aria-hidden", isOpen ? "true" : "false");
    content.style.display = isOpen ? "none" : "block";
    trigger.setAttribute("aria-expanded", isOpen ? "false" : "true");
    var chevron = trigger.querySelector("[data-dfyne-chevron]");
    if (chevron) {
      chevron.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
    }
  });

  /* ---- Size Selector ---- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-dfyne-size-selector] .dfyne-size-button:not([disabled])");
    if (!btn) return;
    var group = btn.closest("[data-dfyne-size-selector]");
    if (!group) return;
    group.querySelectorAll(".dfyne-size-button").forEach(function (b) {
      b.setAttribute("aria-pressed", "false");
    });
    btn.setAttribute("aria-pressed", "true");
  });

  /* ---- Color Swatch Selector ---- */
  document.addEventListener("click", function (e) {
    var swatch = e.target.closest("[data-dfyne-color-selector] .dfyne-color-swatch");
    if (!swatch) return;
    var group = swatch.closest("[data-dfyne-color-selector]");
    if (!group) return;
    group.querySelectorAll(".dfyne-color-swatch").forEach(function (s) {
      s.setAttribute("aria-pressed", "false");
    });
    swatch.setAttribute("aria-pressed", "true");
  });

  /* ---- Announcement Bar auto-rotate ---- */
  var bars = document.querySelectorAll("[data-dfyne-announcement]");
  bars.forEach(function (bar) {
    var slides = bar.querySelectorAll("[data-dfyne-announcement-slide]");
    if (slides.length <= 1) return;
    var current = 0;
    slides.forEach(function (s, i) { s.style.display = i === 0 ? "flex" : "none"; });
    setInterval(function () {
      slides[current].style.display = "none";
      current = (current + 1) % slides.length;
      slides[current].style.display = "flex";
    }, 4000);
  });
})();
