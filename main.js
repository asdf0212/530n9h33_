(function () {
  var projects = window.PROJECTS || [];
  var categories = window.CATEGORIES || ["all"];
  var filterEl = document.getElementById("filter");
  var worksEl = document.getElementById("works");

  // 화면 폭별 컬럼 수 (Figma 1440 기준 4단)
  var breakpoints = [
    { query: "(min-width: 1200px)", cols: 4 },
    { query: "(min-width: 900px)", cols: 3 },
    { query: "(min-width: 600px)", cols: 2 },
  ];

  function currentCols() {
    for (var i = 0; i < breakpoints.length; i++) {
      if (window.matchMedia(breakpoints[i].query).matches) return breakpoints[i].cols;
    }
    return 1;
  }

  // 공유용 아티팩트 빌드에서는 주소창 쿼리(?tag=)를 못 써서 #graphic 같은 해시로 대신함 (tools/build-artifact.py)
  var HASH_ROUTES = window.HASH_ROUTES === true;

  function currentTag() {
    var tag = HASH_ROUTES ? location.hash.slice(1) : new URLSearchParams(location.search).get("tag");
    return categories.indexOf(tag) > 0 ? tag : "all";
  }

  /* ---------- Filter ---------- */
  function renderFilter() {
    var active = currentTag();
    filterEl.innerHTML = "";
    categories.forEach(function (cat) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      btn.textContent = cat;
      btn.setAttribute("aria-pressed", String(cat === active));
      btn.addEventListener("click", function () { setTag(cat); });
      filterEl.appendChild(btn);
    });
  }

  function setTag(tag) {
    var url = new URL(location.href);
    if (HASH_ROUTES) {
      url.hash = tag === "all" ? "" : tag;
    } else if (tag === "all") {
      url.searchParams.delete("tag");
    } else {
      url.searchParams.set("tag", tag);
    }
    history.pushState(null, "", url);
    render();
  }

  /* ---------- Cards ---------- */
  function cardEl(p) {
    var card = document.createElement("a");
    card.className = "card";
    card.href = HASH_ROUTES ? "work/index.html#" + p.slug : "work/?p=" + encodeURIComponent(p.slug);

    var title = document.createElement("h2");
    title.className = "card-title";
    title.textContent = p.title;

    var thumb = document.createElement("div");
    thumb.className = "card-thumb";
    if (p.thumb) {
      var isVideo = /\.(mp4|webm)$/i.test(p.thumb);
      var media = document.createElement(isVideo ? "video" : "img");
      media.src = p.thumb;
      if (isVideo) {
        media.muted = true; media.loop = true; media.autoplay = true; media.playsInline = true;
      } else {
        media.alt = ""; media.loading = "lazy";
      }
      thumb.appendChild(media);
      if (window.watchMedia) window.watchMedia(thumb, media);   // 불러오는 동안 l0ad1n9…
    } else {
      thumb.classList.add("is-placeholder");                    // 이미지 준비 전 임시 썸네일
    }

    var meta = document.createElement("div");
    meta.className = "card-meta";
    var badges = document.createElement("div");
    badges.className = "card-badges";
    if (p.year) badges.appendChild(badge(String(p.year), "badge badge--year"));   // 연도 모르면 생략
    p.tags.forEach(function (t) { badges.appendChild(badge(t, "badge")); });
    var summary = document.createElement("p");
    summary.className = "card-summary";
    summary.textContent = p.summary;
    meta.append(badges, summary);

    card.append(title, thumb, meta);
    return card;
  }

  function badge(text, cls) {
    var el = document.createElement("span");
    el.className = cls;
    el.textContent = text;
    return el;
  }

  // 순서대로 왼쪽→오른쪽 컬럼에 하나씩 배분 (Figma 배치와 동일)
  function renderWorks() {
    var tag = currentTag();
    var list = projects.filter(function (p) { return tag === "all" || p.tags.indexOf(tag) !== -1; });
    var cols = currentCols();
    worksEl.style.setProperty("--cols", cols);
    worksEl.innerHTML = "";

    renderCount(list.length);
    if (!list.length) return;   // 빈 카테고리는 아래 개수 표시("0 w0rks")가 대신 알려줌

    var columns = [];
    for (var i = 0; i < cols; i++) {
      var col = document.createElement("div");
      col.className = "works-col";
      columns.push(col);
      worksEl.appendChild(col);
    }
    list.forEach(function (p, i) { columns[i % cols].appendChild(cardEl(p)); });
    if (window.typeset) window.typeset(worksEl);
    if (window.reveal) window.reveal(worksEl);
  }

  /* ---------- 작업 개수: "N w0rks" (Figma: number-count / number-setting) ---------- */
  // 숫자는 조선굵은명조 이탤릭 SVG(assets/count/0~9.svg)를 이어 붙이고, w0rks도 SVG.
  // 색은 테마 색(--fg-dim)으로 칠하도록 SVG를 마스크로 사용.
  var countEl = document.getElementById("works-count");
  var DIGIT_W = [23.4185, 20.9043, 23.0236, 23.4185, 24.7958, 23.2094, 23.3442, 23.44, 23.4185, 23.3442];

  function glyph(file, width) {
    var s = document.createElement("span");
    s.className = "count-glyph";
    s.style.width = width + "px";
    var url = "url(" + new URL("assets/count/" + file, document.baseURI).href + ")";
    s.style.webkitMaskImage = url;
    s.style.maskImage = url;
    return s;
  }

  function renderCount(n) {
    if (!countEl) return;
    countEl.innerHTML = "";
    countEl.setAttribute("aria-label", n + (n === 1 ? " work" : " works"));
    // 등장 모션(reveal.js)이 이 안쪽 줄을 틈 아래에서 올림
    var inner = document.createElement("span");
    inner.className = "count-inner";
    var num = document.createElement("span");
    num.className = "count-num";
    var digits = String(n).split("");
    digits.forEach(function (d, i) {
      var g = glyph(d + ".svg", DIGIT_W[+d]);
      if (i > 0 && (d === "1" || digits[i - 1] === "1")) g.classList.add("near1");   // 1 앞뒤 보정
      num.appendChild(g);
    });
    // 1개면 단수(w0rk), 0개·2개 이상은 복수(w0rks)
    inner.append(num, n === 1 ? glyph("w0rk.svg", 73.2282) : glyph("w0rks.svg", 89.5641));
    countEl.appendChild(inner);
    if (window.reveal) window.reveal(countEl);
  }

  function render() {
    renderFilter();
    renderWorks();
  }

  /* ---------- Init ---------- */
  var lastCols = currentCols();
  window.addEventListener("resize", function () {
    var c = currentCols();
    if (c !== lastCols) { lastCols = c; renderWorks(); }
  });
  window.addEventListener("popstate", render);
  if (HASH_ROUTES) window.addEventListener("hashchange", render);

  render();
})();
