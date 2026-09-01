/* DocSteer — image lightbox (no dependencies) */
(function () {
  "use strict";
  var DocSteer = window.DocSteer || {};
  if (!DocSteer.lightbox) return;

  var box = document.getElementById("lightbox");
  if (!box) return;

  var scope = document.querySelector(".doc-content") || document.querySelector(".prose");
  if (!scope) return;

  var imgs = Array.prototype.slice.call(scope.querySelectorAll("img"))
    .filter(function (img) {
      return !img.classList.contains("no-lightbox") &&
        !img.closest("a") &&
        (img.naturalWidth === 0 || img.naturalWidth > 40);
    });
  if (!imgs.length) return;

  var current = 0;
  var lastFocus = null;

  imgs.forEach(function (img, i) {
    img.classList.add("lightbox-trigger");
    img.setAttribute("role", "button");
    img.setAttribute("tabindex", "0");
    img.addEventListener("click", function () { openAt(i); });
    img.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openAt(i); }
    });
  });

  function caption(img) {
    return img.getAttribute("alt") ||
      (img.closest("figure") && img.closest("figure").querySelector("figcaption")
        ? img.closest("figure").querySelector("figcaption").textContent : "");
  }

  function build() {
    box.innerHTML =
      '<button class="lightbox__close" aria-label="Close (Esc)"><i class="fa-solid fa-xmark"></i></button>' +
      '<span class="lightbox__count"></span>' +
      '<figure class="lightbox__figure">' +
        (imgs.length > 1 ? '<button class="lightbox__btn lightbox__prev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>' : "") +
        '<img class="lightbox__img" alt="">' +
        (imgs.length > 1 ? '<button class="lightbox__btn lightbox__next" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>' : "") +
        '<figcaption class="lightbox__caption"></figcaption>' +
      "</figure>";

    box.querySelector(".lightbox__close").addEventListener("click", close);
    var p = box.querySelector(".lightbox__prev");
    var n = box.querySelector(".lightbox__next");
    if (p) p.addEventListener("click", function (e) { e.stopPropagation(); show(current - 1); });
    if (n) n.addEventListener("click", function (e) { e.stopPropagation(); show(current + 1); });
    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.classList.contains("lightbox__figure")) close();
    });
  }

  function show(i) {
    current = (i + imgs.length) % imgs.length;
    var src = imgs[current];
    var full = src.getAttribute("data-full") || src.currentSrc || src.src;
    var big = box.querySelector(".lightbox__img");
    big.src = full;
    big.alt = caption(src);
    box.querySelector(".lightbox__caption").textContent = caption(src);
    var count = box.querySelector(".lightbox__count");
    count.textContent = imgs.length > 1 ? (current + 1) + " / " + imgs.length : "";
  }

  function openAt(i) {
    lastFocus = document.activeElement;
    if (!box.dataset.built) { build(); box.dataset.built = "1"; }
    show(i);
    box.classList.add("is-open");
    box.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    box.querySelector(".lightbox__close").focus();
  }

  function close() {
    box.classList.remove("is-open");
    box.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
  });
})();
