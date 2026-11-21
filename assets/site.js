/* Animesh Srivastava — site behaviour.
   Home: builds the constellation, plays the "signal lock" once per visit, sparkles plain dots.
   All pages: zoom transition home <-> section using cross-document View Transitions
   (Chrome, Edge, Safari 18.2+). Other browsers simply navigate. */
(function () {
  var SECTIONS = {
    awards:       { x: 0, y: 0, href: "awards.html" },
    experience:   { x: 3, y: 0, href: "experience.html" },
    projects:     { x: 1, y: 1, href: "projects.html" },
    learning:     { x: 0, y: 2, href: "learning.html" },
    ai:           { x: 2, y: 2, href: "ai.html" },
    publications: { x: 3, y: 3, href: "publications.html" },
    gallery:      { x: 1, y: 3, href: "gallery.html" }
  };
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var store = {
    get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} },
    del: function (k) { try { sessionStorage.removeItem(k); } catch (e) {} }
  };

  function sectionOf(url) {
    var path = new URL(url, location.href).pathname;
    var file = path.split("/").pop() || "index.html";
    if (/\/projects\/[^/]+$/.test(path)) return "projects";
    for (var k in SECTIONS) if (SECTIONS[k].href === file) return k;
    if (file === "index.html" || path.endsWith("/")) return "home";
    return null;
  }
  var here = document.body.dataset.section || sectionOf(location.href);

  function dotCenter(key) {
    var el = document.querySelector('.pt[data-key="' + key + '"] .core');
    if (!el) return null;
    var r = el.getBoundingClientRect();
    return [r.left + r.width / 2, r.top + r.height / 2];
  }
  function setVT(dir, x, y) {
    var w = innerWidth, h = innerHeight;
    var rmax = Math.hypot(Math.max(x, w - x), Math.max(y, h - y));
    root.style.setProperty("--vx", x + "px");
    root.style.setProperty("--vy", y + "px");
    root.style.setProperty("--vr", Math.ceil(rmax) + "px");
    root.dataset.vt = dir;
  }

  /* Leaving a page: remember how the next page should arrive. */
  window.addEventListener("pageswap", function (e) {
    if (!e.viewTransition || !e.activation) return;
    var to = sectionOf(e.activation.entry.url);
    if (here === "home" && to && to !== "home") {
      var c = dotCenter(to);
      if (c) store.set("vt", JSON.stringify({ d: "in", x: c[0], y: c[1] }));
    } else if (here !== "home" && to === "home") {
      store.set("vt", JSON.stringify({ d: "out", k: here }));
    } else {
      store.del("vt");
    }
  });

  /* Arriving on a page: zoom in from the dot, or shrink back into it. */
  window.addEventListener("pagereveal", function (e) {
    var raw = store.get("vt");
    store.del("vt");
    if (!e.viewTransition || !raw) return;
    var v; try { v = JSON.parse(raw); } catch (err) { return; }
    if (v.d === "in" && here !== "home") setVT("in", v.x, v.y);
    if (v.d === "out" && here === "home") {
      if (window.__buildPlot) window.__buildPlot(true);
      var c = dotCenter(v.k);
      if (c) {
        setVT("out", c[0], c[1]);
        var pt = document.querySelector('.pt[data-key="' + v.k + '"]');
        e.viewTransition.finished.then(function () {
          if (pt) { pt.classList.add("flash"); setTimeout(function () { pt.classList.remove("flash"); }, 1900); }
        });
      }
    }
    e.viewTransition.finished.then(function () { delete root.dataset.vt; });
  });

  /* ---------- home: constellation ---------- */
  var plot = document.getElementById("plot");
  if (!plot) return;
  var built = false;
  function build(returning) {
    if (built) return; built = true;
    var data = JSON.parse(document.getElementById("points").textContent);
    var byPos = {};
    data.forEach(function (d) { byPos[SECTIONS[d.key].x + "," + SECTIONS[d.key].y] = d; });
    var els = [];
    for (var j = 0; j < 4; j++) for (var i = 0; i < 4; i++) {
      var d = byPos[i + "," + j], el = document.createElement(d ? "a" : "span");
      el.style.left = (15.2 + i * 23.2) + "%";
      el.style.top = (15.2 + j * 23.2) + "%";
      var a = Math.random() * Math.PI * 2, r = 70 + Math.random() * 90;
      el.style.setProperty("--dx", (Math.cos(a) * r).toFixed(1) + "px");
      el.style.setProperty("--dy", (Math.sin(a) * r).toFixed(1) + "px");
      el.style.setProperty("--d", (Math.random() * 0.25).toFixed(2) + "s");
      if (d) {
        el.className = "pt" + (i === 3 ? " left" : "") + (j === 3 ? " up" : "");
        el.href = SECTIONS[d.key].href;
        el.dataset.key = d.key;
        el.innerHTML = '<span class="core" aria-hidden="true"><b></b><span class="ring"></span><span class="ring"></span><span class="ring"></span>' +
          '<span class="pv">' + (d.img ? '<img src="' + d.img + '" alt="" loading="lazy">' : '') + '<small>' + d.pv[0] + "</small><strong>" + d.pv[1] + "</strong><span>" + d.pv[2] + "</span><em>Open " + d.title.toLowerCase() + "</em></span></span>" +
          "<h2>" + d.title + "</h2><p>" + d.sub + "</p>";
        el.setAttribute("aria-label", d.title + ": " + d.sub);
      } else {
        el.className = "dot";
        el.setAttribute("aria-hidden", "true");
        el.innerHTML = "<i></i>";
        el.addEventListener("mouseenter", function () { var t = this; t.classList.remove("hov"); void t.offsetWidth; t.classList.add("hov"); });
        el.addEventListener("animationend", function () { this.classList.remove("hov"); });
      }
      plot.appendChild(el); els.push(el);
    }
    var body = document.body;
    function lock() {
      body.classList.remove("noisy"); body.classList.add("locked");
      els.forEach(function (e) { e.style.setProperty("--dx", "0px"); e.style.setProperty("--dy", "0px"); });
      setTimeout(function () { body.classList.add("settled"); }, 2300);
    }
    if (returning || reduce || store.get("locked")) {
      els.forEach(function (e) { e.style.transition = "none"; e.style.setProperty("--dx", "0px"); e.style.setProperty("--dy", "0px"); });
      body.classList.add("locked", "settled");
      body.offsetWidth;
      els.forEach(function (e) { e.style.transition = ""; });
    } else {
      body.classList.add("noisy");
      requestAnimationFrame(function () { requestAnimationFrame(function () { setTimeout(lock, 450); }); });
      store.set("locked", "1");
    }
  }
  window.__buildPlot = build;

  /* Ambient twinkle: plain dots sparkle on their own, one at a time, at random.
     Pauses while the tab is hidden; off when reduced motion is requested. */
  function twinkle() {
    if (reduce) return;
    var timer = null;
    function next() {
      timer = setTimeout(function () {
        if (!document.hidden && document.body.classList.contains("settled")) {
          var dots = plot.querySelectorAll(".dot:not(.hov)");
          if (dots.length) {
            var d = dots[Math.floor(Math.random() * dots.length)];
            void d.offsetWidth; d.classList.add("hov");
          }
        }
        next();
      }, 500 + Math.random() * 900);
    }
    next();
  }
  twinkle();
  build(false);
})();
