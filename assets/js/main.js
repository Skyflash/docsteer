/* DocSteer — core interactions (no dependencies) */
(function () {
  "use strict";
  var DocSteer = window.DocSteer || {};
  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Dark / light mode ---------- */
  function currentMode() {
    return root.getAttribute("data-mode") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  var modeToggle = $("#modeToggle");
  if (modeToggle) {
    modeToggle.addEventListener("click", function () {
      var next = currentMode() === "dark" ? "light" : "dark";
      root.setAttribute("data-mode", next);
      try { localStorage.setItem("docsteer-mode", next); } catch (e) {}
    });
  }

  /* ---------- Skin picker ---------- */
  var picker = $("#skinPicker");
  if (picker) {
    var pbtn = picker.querySelector("button[aria-haspopup]");
    var setActive = function () {
      var cur = root.getAttribute("data-skin");
      $$(".skin-picker__opt", picker).forEach(function (o) {
        o.setAttribute("aria-checked", o.dataset.skinSet === cur);
      });
    };
    pbtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = picker.classList.toggle("is-open");
      pbtn.setAttribute("aria-expanded", open);
      setActive();
    });
    $$(".skin-picker__opt", picker).forEach(function (o) {
      o.addEventListener("click", function () {
        root.setAttribute("data-skin", o.dataset.skinSet);
        try { localStorage.setItem("docsteer-skin", o.dataset.skinSet); } catch (e) {}
        picker.classList.remove("is-open");
        pbtn.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("click", function () {
      picker.classList.remove("is-open");
      pbtn.setAttribute("aria-expanded", "false");
    });
  }

  /* ---------- Mobile sidebar drawer ---------- */
  var sidebar = $("#sidebar");
  var sTog = $("#sidebarToggle");
  var scrim = $("#sidebarScrim");
  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove("is-open");
    if (scrim) scrim.hidden = true;
    if (sTog) sTog.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (sTog && sidebar) {
    sTog.addEventListener("click", function () {
      var open = sidebar.classList.toggle("is-open");
      if (scrim) scrim.hidden = !open;
      sTog.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
  }
  if (scrim) scrim.addEventListener("click", closeSidebar);
  $$(".sidebar__link").forEach(function (l) { l.addEventListener("click", closeSidebar); });

  /* ---------- Collapsible sidebar groups ---------- */
  $$(".sidebar__group-title").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var group = btn.closest(".sidebar__group");
      var collapsed = group.classList.toggle("is-collapsed");
      btn.setAttribute("aria-expanded", !collapsed);
    });
  });

  /* ---------- Heading anchors + TOC ---------- */
  var content = $("#doc-content") || $(".doc-content");
  if (content) {
    var heads = $$("h2, h3", content).filter(function (h) { return h.id || h.textContent.trim(); });
    heads.forEach(function (h) {
      if (!h.id) {
        h.id = h.textContent.trim().toLowerCase()
          .replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
      }
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.className = "heading-anchor";
      a.setAttribute("aria-label", "Link to this section");
      a.innerHTML = '<i class="fa-solid fa-link" aria-hidden="true"></i>';
      h.appendChild(a);
    });

    var tocNav = $("#tocNav");
    if (DocSteer.toc && DocSteer.toc.enabled && tocNav && heads.length >= (DocSteer.toc.min || 2)) {
      var frag = document.createDocumentFragment();
      heads.forEach(function (h) {
        var link = document.createElement("a");
        link.href = "#" + h.id;
        link.textContent = h.firstChild ? h.firstChild.textContent.trim() : h.textContent.trim();
        link.className = "lvl-" + (h.tagName === "H3" ? "3" : "2");
        link.dataset.target = h.id;
        frag.appendChild(link);
      });
      tocNav.appendChild(frag);

      var tocLinks = $$("a", tocNav);
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          tocLinks.forEach(function (l) {
            l.classList.toggle("is-active", l.dataset.target === en.target.id);
          });
        });
      }, { rootMargin: "-80px 0px -70% 0px", threshold: 0 });
      heads.forEach(function (h) { spy.observe(h); });

      tocLinks.forEach(function (l) {
        l.addEventListener("click", function () {
          tocLinks.forEach(function (x) { x.classList.remove("is-active"); });
          l.classList.add("is-active");
        });
      });
    } else if (tocNav) {
      var tocAside = $("#toc");
      if (tocAside) tocAside.style.display = "none";
    }
  }

  /* ---------- Code blocks: header bar, language label, copy ---------- */
  var LANG_NAMES = {
    js: "JavaScript", javascript: "JavaScript", ts: "TypeScript", typescript: "TypeScript",
    rb: "Ruby", ruby: "Ruby", py: "Python", python: "Python", sh: "Shell", bash: "Bash",
    shell: "Shell", console: "Terminal", powershell: "PowerShell", yaml: "YAML", yml: "YAML",
    json: "JSON", html: "HTML", css: "CSS", scss: "SCSS", sass: "Sass", md: "Markdown",
    markdown: "Markdown", liquid: "Liquid", diff: "Diff", sql: "SQL", go: "Go", rust: "Rust",
    java: "Java", php: "PHP", xml: "XML", toml: "TOML", ini: "INI", text: "", plaintext: ""
  };

  function langOf(el) {
    var host = el.closest("[class*='language-']") || el;
    var m = /language-([\w+#-]+)/.exec(host.className || "");
    if (!m) return "";
    var key = m[1].toLowerCase();
    return LANG_NAMES.hasOwnProperty(key) ? LANG_NAMES[key] : m[1];
  }

  if (content) {
    $$("div.highlighter-rouge, div.highlight, figure.highlight", content).forEach(function (block) {
      // Only wrap the outermost Rouge container
      if (block.closest(".code-wrap")) return;
      if (block.parentNode.closest && block.parentNode.closest(".highlighter-rouge")) return;

      var wrap = document.createElement("div");
      wrap.className = "code-wrap";
      block.parentNode.insertBefore(wrap, block);

      var bar = document.createElement("div");
      bar.className = "code-wrap__bar";
      var label = langOf(block);
      bar.innerHTML = '<span class="code-wrap__lang">' + (label || "Code") + "</span>";
      wrap.appendChild(bar);
      wrap.appendChild(block);

      if (!DocSteer.codeCopy || !navigator.clipboard) return;

      var IDLE = '<i class="fa-regular fa-copy" aria-hidden="true"></i><span>Copy</span>';
      var DONE = '<i class="fa-solid fa-check" aria-hidden="true"></i><span>Copied</span>';
      var btn = document.createElement("button");
      btn.className = "code-copy";
      btn.type = "button";
      btn.setAttribute("aria-label", "Copy code to clipboard");
      btn.innerHTML = IDLE;
      bar.appendChild(btn);

      btn.addEventListener("click", function () {
        var code = block.querySelector("code") || block.querySelector("pre") || block;
        navigator.clipboard.writeText(code.innerText.replace(/\n+$/, "")).then(function () {
          btn.classList.add("is-done");
          btn.innerHTML = DONE;
          setTimeout(function () {
            btn.classList.remove("is-done");
            btn.innerHTML = IDLE;
          }, 1800);
        });
      });
    });

    /* ---------- Tables: wrap so wide ones scroll, not the page ---------- */
    $$("table", content).forEach(function (t) {
      if (t.closest(".table-scroll")) return;
      var box = document.createElement("div");
      box.className = "table-scroll";
      t.parentNode.insertBefore(box, t);
      box.appendChild(t);
    });
  }

  /* ---------- External links ---------- */
  $$(".doc-content a[href^='http']").forEach(function (a) {
    if (a.hostname !== location.hostname) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    }
  });

  /* ---------- FAQ accordion ---------- */
  // Opening and closing is native <details> behaviour; this only adds the
  // "expand all" control and makes #question deep links actually open the item.
  var faq = $("#faq");
  if (faq) {
    var faqItems = $$(".faq-item", faq);

    var openFromHash = function () {
      var id = decodeURIComponent(location.hash.slice(1));
      if (!id) return;
      var target = document.getElementById(id);
      if (!target || !target.classList.contains("faq-item")) return;
      target.open = true;
      target.scrollIntoView({ block: "start" });
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);

    // Keep the URL pointing at the question being opened, without piling up
    // history entries the Back button would have to walk through.
    faqItems.forEach(function (d) {
      var sum = $("summary", d);
      if (!sum) return;
      sum.addEventListener("click", function () {
        if (!d.open && d.id) history.replaceState(null, "", "#" + d.id);
      });
    });

    var faqAll = $("#faqToggleAll");
    if (faqAll) {
      faqAll.addEventListener("click", function () {
        var expand = faqAll.dataset.expanded !== "true";
        faqItems.forEach(function (d) { d.open = expand; });
        faqAll.dataset.expanded = expand;
        $("span", faqAll).textContent = expand ? "Collapse all" : "Expand all";
        $("i", faqAll).className = expand
          ? "fa-solid fa-angles-up"
          : "fa-solid fa-angles-down";
      });
    }
  }

  /* ---------- Back to top ---------- */
  var toTop = $("#toTop");
  if (toTop) {
    var onScroll = function () {
      var show = window.scrollY > 600;
      toTop.hidden = !show;
      toTop.classList.toggle("is-visible", show);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Esc closes drawers ---------- */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSidebar();
  });
})();
