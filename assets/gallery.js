/* Gallery: photos drift slowly; clicking one opens it and types its line underneath. */
(function () {
  var data = JSON.parse(document.getElementById("photos").textContent);
  var stage = document.getElementById("stage");
  var lb = document.getElementById("lb");
  var lbImg = lb.querySelector("img");
  var lbCap = lb.querySelector(".lb-cap");
  var lbCount = lb.querySelector(".lb-count");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* Loose scatter for up to 12 photos: left %, top %, width (px, desktop) */
  var SLOTS = [[4,10,300],[27,36,330],[52,3,300],[71,42,350],[8,58,240],[44,64,230],[80,6,220],[60,72,210],[22,2,200],[90,60,190],[36,0,180],[2,32,180]];
  var current = -1, typing = null, cards = [];

  data.forEach(function (p, i) {
    var s = SLOTS[i % SLOTS.length];
    var f = document.createElement("div");
    f.className = "float";
    f.style.setProperty("--x", s[0] + "%");
    f.style.setProperty("--y", s[1] + "%");
    f.style.setProperty("--w", s[2] + "px");
    f.style.setProperty("--t", (16 + Math.random() * 10).toFixed(1) + "s");
    f.style.setProperty("--dl", (-Math.random() * 20).toFixed(1) + "s");
    f.style.setProperty("--dx", ((Math.random() * 2 - 1) * 22).toFixed(0) + "px");
    f.style.setProperty("--dy", ((Math.random() * 2 - 1) * 18).toFixed(0) + "px");
    f.style.setProperty("--r0", ((Math.random() * 2 - 1) * 3).toFixed(1) + "deg");
    f.style.setProperty("--r1", ((Math.random() * 2 - 1) * 3).toFixed(1) + "deg");
    f.style.zIndex = String(10 - (i % 5));
    f.innerHTML = '<button type="button" class="photo" aria-label="Open photo: ' + p.alt.replace(/"/g, "&quot;") + '">' +
      '<img src="' + p.thumb + '" alt="' + p.alt.replace(/"/g, "&quot;") + '" width="' + p.w + '" height="' + p.h + '" loading="lazy" decoding="async"></button>';
    var btn = f.querySelector("button");
    btn.addEventListener("click", function () { open(i, btn); });
    stage.appendChild(f);
    cards.push(btn);
  });
  stage.classList.add("ready");

  function type(text) {
    clearInterval(typing);
    if (reduce) { lbCap.textContent = text; return; }
    lbCap.textContent = "";
    lbCap.classList.add("typing");
    var n = 0;
    typing = setInterval(function () {
      n += 1;
      lbCap.textContent = text.slice(0, n);
      if (n >= text.length) { clearInterval(typing); lbCap.classList.remove("typing"); }
    }, 24);
  }
  function show(i) {
    current = (i + data.length) % data.length;
    var p = data[current];
    lbImg.src = p.src; lbImg.alt = p.alt;
    lbImg.width = p.w; lbImg.height = p.h;
    lbCount.textContent = (current + 1) + " of " + data.length;
    lbCap.setAttribute("aria-label", p.caption);
    type(p.caption);
  }
  function open(i, from) {
    show(i);
    lb.showModal();
    document.documentElement.classList.add("lb-open");
    if (reduce || !from || !lbImg.animate) return;
    var a = from.getBoundingClientRect(), b = lbImg.getBoundingClientRect();
    if (!b.width) return;
    var sx = a.width / b.width, sy = a.height / b.height;
    lbImg.animate([
      { transform: "translate(" + (a.left - b.left) + "px," + (a.top - b.top) + "px) scale(" + sx + "," + sy + ")", transformOrigin: "0 0", borderRadius: "14px" },
      { transform: "none", transformOrigin: "0 0", borderRadius: "16px" }
    ], { duration: 520, easing: "cubic-bezier(.16,1,.3,1)" });
  }
  function close() {
    clearInterval(typing);
    lb.close();
  }
  lb.addEventListener("close", function () {
    document.documentElement.classList.remove("lb-open");
    if (cards[current]) cards[current].focus();
  });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
  lb.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
  lb.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); show(current + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); show(current - 1); }
  });
  var x0 = null;
  lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  });
})();
