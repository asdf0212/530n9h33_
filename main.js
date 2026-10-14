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

  function currentTag() {
    var tag = new URLSearchParams(location.search).get("tag");
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
    if (tag === "all") url.searchParams.delete("tag");
    else url.searchParams.set("tag", tag);
    history.pushState(null, "", url);
    render();
  }

  /* ---------- Cards ---------- */
  function cardEl(p) {
    var card = document.createElement("a");
    card.className = "card";
    card.href = "work/?p=" + encodeURIComponent(p.slug);

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
    }

    var meta = document.createElement("div");
    meta.className = "card-meta";
    var badges = document.createElement("div");
    badges.className = "card-badges";
    badges.appendChild(badge(String(p.year), "badge badge--year"));
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

    if (!list.length) {
      var empty = document.createElement("p");
      empty.className = "works-empty";
      empty.textContent = "No works in this category yet.";
      worksEl.appendChild(empty);
      return;
    }

    var columns = [];
    for (var i = 0; i < cols; i++) {
      var col = document.createElement("div");
      col.className = "works-col";
      columns.push(col);
      worksEl.appendChild(col);
    }
    list.forEach(function (p, i) { columns[i % cols].appendChild(cardEl(p)); });
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

  render();
})();
