// MORE 패널 (CONTACT / PROFILE). About 페이지에는 마크업이 들어 있고,
// 다른 페이지에서는 [data-more] 링크를 누를 때 about/ 페이지에서 패널을 불러와 띄운다.
//   <a href="about/?more=contact" data-more="contact">…</a>
// JS가 없거나 불러오기에 실패하면 링크 그대로 About으로 이동 → 거기서 ?more= 값으로 패널이 열림.
(function () {
  var body = document.body;
  var panel, panelBody, closeBtn, scrim, tabs;
  var lastTrigger = null;
  var loading = null;

  /* ---------- Setup ---------- */
  function bind() {
    panel = document.getElementById("more");
    panelBody = document.getElementById("more-body");
    closeBtn = document.getElementById("more-close");
    scrim = document.getElementById("more-scrim");
    tabs = Array.prototype.slice.call(panel.querySelectorAll('[role="tab"]'));

    closeBtn.addEventListener("click", close);
    if (scrim) scrim.addEventListener("click", close);

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab); });
      tab.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!d) return;
        var next = tabs[(i + d + tabs.length) % tabs.length];
        select(next);
        next.focus();
      });
    });
  }

  // about/ 페이지에서 패널 + 배경막을 가져와 현재 페이지에 붙임
  function load(aboutUrl) {
    if (panel) return Promise.resolve();
    if (loading) return loading;
    loading = fetch(aboutUrl)
      .then(function (res) {
        if (!res.ok) throw new Error(res.status);
        return res.text();
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        ["more-scrim", "more"].forEach(function (id) {
          var el = doc.getElementById(id);
          // about/ 기준 상대 경로(../assets 등)를 현재 페이지 기준으로 바꿈
          el.querySelectorAll("[src], [href]").forEach(function (n) {
            ["src", "href"].forEach(function (attr) {
              var v = n.getAttribute(attr);
              if (v) n.setAttribute(attr, new URL(v, aboutUrl).href);
            });
          });
          body.appendChild(document.adoptNode(el));
        });
        bind();
        panel.offsetWidth; // 붙인 직후에도 슬라이드 트랜지션이 보이도록 리플로우
      });
    return loading;
  }

  /* ---------- Open / close ---------- */
  // byPointer: 마우스/터치로 열고 닫을 땐 초점 테두리를 그리지 않음 (키보드일 때만 표시)
  function focusEl(el, byPointer) {
    el.focus({ preventScroll: true, focusVisible: !byPointer });
  }

  function open(tabName, trigger, byPointer) {
    lastTrigger = trigger || null;
    if (tabName) {
      var tab = document.getElementById("tab-" + tabName);
      if (tab) select(tab);
    }
    panel.inert = false;
    panel.classList.add("is-open");
    body.classList.add("more-open");
    setExpanded(true);
    focusEl(closeBtn, byPointer);
  }

  function close(e) {
    var byPointer = !!(e && e.detail > 0);
    panel.classList.remove("is-open");
    body.classList.remove("more-open");
    setExpanded(false);
    panel.inert = true;
    if (lastTrigger) focusEl(lastTrigger, byPointer);
  }

  function isOpen() {
    return panel && panel.classList.contains("is-open");
  }

  function setExpanded(v) {
    var btn = document.getElementById("more-open");
    if (btn) btn.setAttribute("aria-expanded", String(v));
  }

  function select(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    panelBody.scrollTop = 0;
  }

  /* ---------- Triggers ---------- */
  document.addEventListener("click", function (e) {
    // About 상단 MORE 버튼: 열고 닫기 토글
    var moreBtn = e.target.closest("#more-open");
    if (moreBtn) {
      isOpen() ? close(e) : open(null, moreBtn, e.detail > 0);
      return;
    }
    // [data-more] 링크: 현재 페이지에서 해당 탭으로 열기
    var link = e.target.closest("[data-more]");
    if (!link || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    var aboutUrl = link.href.split("?")[0];
    load(aboutUrl).then(
      function () { open(link.dataset.more, link, e.detail > 0); },
      function () { location.href = link.href; } // 불러오기 실패 시 About으로 이동
    );
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen()) close();
  });

  /* ---------- Init ---------- */
  if (document.getElementById("more")) {
    bind();
    var initial = new URLSearchParams(location.search).get("more");
    if (initial === "contact" || initial === "profile") {
      open(initial, document.getElementById("more-open"));
    }
  }
})();
