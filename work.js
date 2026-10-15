// 프로젝트 상세 페이지: work/?p=<slug> 로 projects.js 의 데이터를 읽어 그림
(function () {
  // 아티팩트 빌드(window.HASH_ROUTES)에서는 work/index.html#slug 형태
  var HASH_ROUTES = window.HASH_ROUTES === true;
  var slug = HASH_ROUTES ? location.hash.slice(1) : new URLSearchParams(location.search).get("p");
  var project = (window.PROJECTS || []).filter(function (p) { return p.slug === slug; })[0];

  /* ---------- 닫기: 목록에서 왔으면 뒤로가기(스크롤·필터 유지), 아니면 목록으로 ---------- */
  document.getElementById("work-close").addEventListener("click", function (e) {
    var ref = document.referrer && new URL(document.referrer);
    var fromList = ref && ref.origin === location.origin && !/\/(work|about)\//.test(ref.pathname);
    if (fromList && history.length > 1) {
      e.preventDefault();
      history.back();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !document.body.classList.contains("more-open")) {
      document.getElementById("work-close").click();
    }
  });

  if (!project) {
    var main = document.getElementById("work");
    main.innerHTML =
      '<div class="work-missing"><p>Project not found.</p><p><a href="' + (HASH_ROUTES ? "../index.html" : "../") + '">Back to works</a></p></div>';
    return;
  }

  document.title = project.title.replace(/\n/g, " ") + " — 530n9h33";

  /* ---------- helpers ---------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  // 같은 폴더 기준 경로(assets/…)를 work/ 페이지 기준으로 보정
  function src(path) {
    return /^(https?:)?\/\//.test(path) || path.charAt(0) === "/" ? path : "../" + path;
  }

  function isVideo(path) {
    return /\.(mp4|webm|mov)$/i.test(path);
  }

  function mediaEl(path, alt) {
    if (isVideo(path)) {
      var v = document.createElement("video");
      v.src = src(path);
      v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
      v.setAttribute("muted", "");
      return v;
    }
    var img = document.createElement("img");
    img.src = src(path);
    img.alt = alt || "";
    img.loading = "lazy";
    img.decoding = "async";
    return img;
  }

  function embedUrl(url) {
    var yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
    if (yt) return "https://www.youtube.com/embed/" + yt[1] + "?rel=0";
    var vm = url.match(/vimeo\.com\/(\d+)/);
    if (vm) return "https://player.vimeo.com/video/" + vm[1];
    return url;
  }

  /* ---------- ① Hero ---------- */
  var heroPath = project.hero || project.thumb;
  if (heroPath) {
    var heroMedia = mediaEl(heroPath, "");
    if (heroMedia.tagName === "IMG") heroMedia.loading = "eager";
    document.getElementById("work-hero").appendChild(heroMedia);
  }

  /* ---------- ② Overview ---------- */
  document.getElementById("work-title").textContent = project.title.replace(/\n/g, " ");

  var info = document.getElementById("work-info");
  function row(label, value, cls) {
    var r = el("div", cls);
    r.append(el("dt", null, label), el("dd", null, value));
    info.appendChild(r);
  }
  (project.info || []).forEach(function (pair) { row(pair[0], pair[1], "is-meta"); });
  if (project.en) row("EN", project.en);
  if (project.kr) row("KR", project.kr);

  /* ---------- ③ Board ---------- */
  var board = document.getElementById("work-board");

  function block(item) {
    if (item.text) return el("p", "board-text", item.text);

    var box = el("div", "board-media");
    if (item.embed) {
      box.style.aspectRatio = item.ratio || "16/9";
      var f = document.createElement("iframe");
      f.src = embedUrl(item.embed);
      f.title = project.title + " video";
      f.loading = "lazy";
      f.allow = "autoplay; fullscreen; picture-in-picture";
      f.allowFullscreen = true;
      box.appendChild(f);
      return box;
    }

    var path = item.image || item.video;
    box.style.aspectRatio = item.ratio || "16/9";   // 파일이 없을 때 자리 비율
    if (path) box.appendChild(mediaEl(path, item.alt));
    return box;
  }

  (project.board || []).forEach(function (item) {
    if (item.row) {
      var r = el("div", "board-row");
      r.style.setProperty("--n", Math.min(item.row.length, 2));   // 최대 2단
      item.row.forEach(function (child) { r.appendChild(block(child)); });
      board.appendChild(r);
    } else {
      board.appendChild(block(item));
    }
  });
  if (!board.children.length) board.remove();
})();
