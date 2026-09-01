/* DocSteer — live search (no dependencies)
   Lightweight scored matcher over a prebuilt JSON index. */
(function () {
  "use strict";
  var DocSteer = window.DocSteer || {};
  if (!DocSteer.search || !DocSteer.search.enabled) return;

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var modal = $("#searchModal");
  var input = $("#searchInput");
  var list = $("#searchResults");
  var empty = $("#searchEmpty");
  var hint = $("#searchHint");
  if (!modal || !input || !list) return;

  var MAX = parseInt(list.dataset.max, 10) || DocSteer.search.max || 8;
  var index = null;
  var indexPromise = null;
  var activeIdx = -1;
  var lastFocus = null;

  // The in-flight promise is what gets cached, not a boolean: a second caller
  // arriving mid-fetch has to wait for the same request, and the old `loading`
  // flag resolved it with a null index instead.
  function loadIndex() {
    if (indexPromise) return indexPromise;
    indexPromise = fetch(list.dataset.endpoint || DocSteer.search.endpoint)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        index = data.map(function (d) {
          return {
            title: d.title || "",
            url: d.url,
            crumb: d.category || d.section || "",
            excerpt: d.excerpt || "",
            haystack: ((d.title || "") + " " + (d.tags || "") + " " +
              (d.category || "") + " " + (d.content || "")).toLowerCase()
          };
        });
        return index;
      })
      .catch(function () { indexPromise = null; return []; });
    return indexPromise;
  }

  function scoreItem(item, terms, raw) {
    var t = item.title.toLowerCase();
    var score = 0;
    if (t === raw) score += 120;
    if (t.indexOf(raw) === 0) score += 60;
    if (t.indexOf(raw) > -1) score += 30;
    for (var i = 0; i < terms.length; i++) {
      var term = terms[i];
      if (!term) continue;
      if (t.indexOf(term) > -1) score += 12;
      var pos = item.haystack.indexOf(term);
      if (pos === -1) return 0; // every term must appear somewhere
      score += Math.max(1, 8 - Math.floor(pos / 200));
    }
    return score;
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function highlight(text, terms) {
    var out = escapeHtml(text);
    terms.forEach(function (term) {
      if (term.length < 2) return;
      var re = new RegExp("(" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
      out = out.replace(re, "<mark>$1</mark>");
    });
    return out;
  }

  function render(results, terms) {
    list.innerHTML = "";
    activeIdx = -1;
    if (!results.length) {
      empty.hidden = false;
      hint.hidden = true;
      input.setAttribute("aria-expanded", "false");
      return;
    }
    empty.hidden = true;
    hint.hidden = true;
    input.setAttribute("aria-expanded", "true");

    var frag = document.createDocumentFragment();
    results.forEach(function (item, i) {
      var a = document.createElement("a");
      a.className = "search-result";
      a.href = item.url;
      a.setAttribute("role", "option");
      a.id = "sr-" + i;
      a.innerHTML =
        (item.crumb ? '<span class="search-result__crumb">' + escapeHtml(item.crumb) + "</span>" : "") +
        '<div class="search-result__title">' + highlight(item.title, terms) + "</div>" +
        (item.excerpt ? '<div class="search-result__excerpt">' + highlight(item.excerpt, terms) + "</div>" : "");
      a.addEventListener("mouseenter", function () { setActive(i); });
      frag.appendChild(a);
    });
    list.appendChild(frag);
  }

  function setActive(i) {
    var items = $$(".search-result", list);
    if (!items.length) return;
    activeIdx = (i + items.length) % items.length;
    items.forEach(function (el, n) {
      el.classList.toggle("is-active", n === activeIdx);
      if (n === activeIdx) {
        el.scrollIntoView({ block: "nearest" });
        input.setAttribute("aria-activedescendant", el.id);
      }
    });
  }

  function runSearch(raw) {
    if (raw.length < 2) {
      list.innerHTML = "";
      empty.hidden = true;
      hint.hidden = false;
      input.setAttribute("aria-expanded", "false");
      return;
    }
    loadIndex().then(function (idx) {
      var terms = raw.split(/\s+/);
      var scored = [];
      for (var i = 0; i < idx.length; i++) {
        var s = scoreItem(idx[i], terms, raw);
        if (s > 0) scored.push({ item: idx[i], s: s });
      }
      scored.sort(function (a, b) { return b.s - a.s; });
      render(scored.slice(0, MAX).map(function (x) { return x.item; }), terms);
    });
  }

  var debounce;
  function onInput() {
    clearTimeout(debounce);
    debounce = setTimeout(function () {
      runSearch(input.value.trim().toLowerCase());
    }, 90);
  }

  // `query` opens the modal on a term rather than on an empty field — the doc
  // footer's tags use it, so a tag lands on its results instead of on a blank
  // search. select() leaves it highlighted, so typing still replaces it.
  function open(query) {
    lastFocus = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    loadIndex();
    if (query) {
      input.value = query;
      runSearch(query.trim().toLowerCase());
    }
    setTimeout(function () { input.focus(); input.select(); }, 20);
  }
  function close() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  $$("[data-search-open]").forEach(function (b) {
    b.addEventListener("click", function (e) {
      e.preventDefault();
      open(b.getAttribute("data-search-open"));
    });
  });
  $$("[data-search-close]").forEach(function (b) {
    b.addEventListener("click", close);
  });
  input.addEventListener("input", onInput);

  input.addEventListener("keydown", function (e) {
    var items = $$(".search-result", list);
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(activeIdx + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(activeIdx - 1); }
    else if (e.key === "Enter") {
      if (items[activeIdx]) { location.href = items[activeIdx].href; }
      else if (items[0]) { location.href = items[0].href; }
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("is-open")) { e.preventDefault(); close(); }
    if (!DocSteer.search.hotkey) return;
    var typing = /^(input|textarea|select)$/i.test((e.target.tagName || "")) || e.target.isContentEditable;
    if (e.key === "/" && !typing && !modal.classList.contains("is-open")) { e.preventDefault(); open(); }
    if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) { e.preventDefault(); open(); }
  });
})();
