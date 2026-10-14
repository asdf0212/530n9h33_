// 등장 모션 (B. Mask line)
// 텍스트: 줄마다 보이지 않는 틈 아래에서 밀려 올라옴 (투명도 변화 없음)
// 이미지: 16px 아래에서 차분하게 떠오름
// 페이지에 들어왔을 때 + 스크롤로 화면에 들어올 때 한 번씩 재생.
// 새로 그린 영역은 window.reveal(요소) 로 다시 등록.
(function () {
  var root = document.documentElement;
  if (!root.classList.contains("reveal-on")) return; // 동작 줄이기 설정 등으로 꺼진 경우

  var TEXT = ".card-title, .card-summary, .work-title, .work-info dt, .work-info dd, .board-text, " +
             ".more-h, .more-page p, .more-rows dt, .more-rows dd";   // MORE 패널 (CONTACT / PROFILE)
  var MASK = ".card-badges";            // 줄로 나누지 않고 통째로 틈에서 올라옴
  var BLOCK = ".card-thumb, .board-media";
  var LINE_STAGGER = 70;   // 한 요소 안에서 줄 사이 (ms)
  var ITEM_STAGGER = 90;   // 동시에 들어온 요소들 사이 (ms)
  var ROW_STAGGER = 45;    // [data-rv-rows] 안(MORE 패널): 같은 줄(라벨+내용)은 함께, 행마다 차례로
  var DURATION = 750;

  var queue = [];
  var flushTimer = null;

  /* ---------- 텍스트를 줄 단위로 감싸기 ---------- */
  // 단어·공백·인라인 요소(행잉 따옴표, <wbr> 등)를 그대로 유지한 채 측정 → 같은 높이끼리 한 줄로 묶음
  function splitLines(el) {
    var tokens = [];
    Array.prototype.slice.call(el.childNodes).forEach(function (node) {
      if (node.nodeType === 3) {
        node.nodeValue.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { tokens.push({ node: document.createTextNode(part), space: true }); return; }
          var w = document.createElement("span");
          w.className = "rv-w";
          w.textContent = part;
          tokens.push({ node: w });
        });
      } else {
        tokens.push({ node: node, inline: true });
      }
    });

    el.textContent = "";
    tokens.forEach(function (t) { el.appendChild(t.node); });

    var lines = [];
    var current = null;
    tokens.forEach(function (t) {
      var top = null;
      if (!t.space && t.node.getBoundingClientRect) {
        var r = t.node.getBoundingClientRect();
        if (r.width || r.height) top = Math.round(r.top);
      }
      if (top !== null && (!current || Math.abs(top - current.top) > 2)) {
        current = { top: top, nodes: [] };
        lines.push(current);
      }
      if (!current) { current = { top: top || 0, nodes: [] }; lines.push(current); }
      current.nodes.push(t.node);
    });

    lines.forEach(function (l, i) {
      var mask = document.createElement("span");
      mask.className = "rv-line";
      var inner = document.createElement("span");
      inner.className = "rv-inner";
      inner.style.setProperty("--rv-i", i);
      l.nodes.forEach(function (n) { inner.appendChild(n); });
      mask.appendChild(inner);
      el.appendChild(mask);
    });
    return lines.length;
  }

  // 애니메이션이 끝나면 원래 구조로 되돌림 (화면 폭이 바뀌어도 줄바꿈이 자연스럽게)
  function unsplit(el) {
    el.querySelectorAll(".rv-line").forEach(function (mask) {
      var inner = mask.firstChild;
      while (inner.firstChild) el.insertBefore(inner.firstChild, mask);
      mask.remove();
    });
    el.querySelectorAll(".rv-w").forEach(function (w) {
      w.replaceWith(document.createTextNode(w.textContent));
    });
    el.normalize();
  }

  /* ---------- 재생 ---------- */
  function play(el, delay) {
    el.style.setProperty("--rv-delay", delay + "ms");
    var total;
    if (el.classList.contains("rv-text")) {
      var count = splitLines(el);
      total = delay + (count - 1) * LINE_STAGGER + DURATION;
    } else {
      total = delay + (el.classList.contains("rv-mask") ? DURATION : 600);
    }
    el.classList.add("rv-play");
    el._rvTimer = setTimeout(function () {
      if (el.classList.contains("rv-text")) unsplit(el);
      el.classList.remove("rv-pending", "rv-play", "rv-text", "rv-mask", "rv-block");
      el.style.removeProperty("--rv-delay");
    }, total + 50);
  }

  // 한 프레임 안에 화면에 들어온 요소들을 위→아래, 같은 높이면 왼→오른쪽 순으로 차례대로
  function flush() {
    flushTimer = null;
    var items = queue.splice(0);
    items.sort(function (a, b) {
      var ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      return Math.round(ra.top / 24) - Math.round(rb.top / 24) || ra.left - rb.left;
    });
    var i = 0, rows = [];
    items.forEach(function (el) {
      if (el.closest("[data-rv-rows]")) {
        var row = Math.round(el.getBoundingClientRect().top / 8);
        if (rows.indexOf(row) === -1) rows.push(row);
        play(el, Math.min(rows.indexOf(row), 14) * ROW_STAGGER);
      } else {
        play(el, Math.min(i++, 8) * ITEM_STAGGER);
      }
    });
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      queue.push(e.target);
    });
    if (queue.length && !flushTimer) flushTimer = setTimeout(flush, 30);
  }, { rootMargin: "0px 0px -8% 0px" });

  function register(scope) {
    scope = scope || document.body;
    scope.querySelectorAll(TEXT).forEach(function (el) {
      if (el.classList.contains("rv-pending") || el.dataset.rvDone) return;
      el.dataset.rvDone = "1";
      el.classList.add("rv-pending", "rv-text");
      io.observe(el);
    });
    [[MASK, "rv-mask"], [BLOCK, "rv-block"]].forEach(function (pair) {
      scope.querySelectorAll(pair[0]).forEach(function (el) {
        if (el.classList.contains("rv-pending") || el.dataset.rvDone) return;
        el.dataset.rvDone = "1";
        el.classList.add("rv-pending", pair[1]);
        io.observe(el);
      });
    });
  }

  // 폰트가 준비된 뒤 줄을 재야 줄바꿈이 정확함 (최대 1초 대기)
  var fontsReady = new Promise(function (resolve) {
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(resolve);
    setTimeout(resolve, 1000);
  });

  // 이미 재생된 영역을 처음 상태로 되돌려 다시 재생 (MORE 패널을 열거나 탭을 바꿀 때)
  function reset(scope) {
    var sel = TEXT + ", " + MASK + ", " + BLOCK;
    scope.querySelectorAll(sel).forEach(function (el) {
      if (!el.dataset.rvDone) return;
      clearTimeout(el._rvTimer);
      io.unobserve(el);
      var q = queue.indexOf(el);
      if (q !== -1) queue.splice(q, 1);
      if (el.querySelector(".rv-line")) unsplit(el);
      el.classList.remove("rv-pending", "rv-play", "rv-text", "rv-mask", "rv-block");
      el.style.removeProperty("--rv-delay");
      delete el.dataset.rvDone;
    });
  }

  window.reveal = function (scope) {
    fontsReady.then(function () { register(scope); });
  };
  // 다시 재생: 패널처럼 옆에서 밀려 들어오는 곳은 화면 진입 감지에 맡기면 라벨·내용이 따로 시작되므로,
  // 지금 세로로 보이는 범위의 요소는 한 번에 모아 순서대로 재생 (아래쪽은 스크롤할 때 재생)
  window.reveal.replay = function (scope) {
    fontsReady.then(function () {
      reset(scope);
      register(scope);
      var bottom = window.innerHeight;
      var clip = scope.closest(".more-body");
      if (clip) bottom = Math.min(bottom, clip.getBoundingClientRect().bottom);
      scope.querySelectorAll(".rv-pending").forEach(function (el) {
        if (el.getBoundingClientRect().top < bottom) {
          io.unobserve(el);
          if (queue.indexOf(el) === -1) queue.push(el);
        }
      });
      if (queue.length && !flushTimer) flushTimer = setTimeout(flush, 0);
    });
  };
  window.reveal(document.body);
})();
