// 라이트/다크 전환 버튼 (모든 페이지 공통). 초기 테마는 각 페이지 <head>의 인라인 스크립트가 정함.
(function () {
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;

  function syncLabel() {
    var dark = document.documentElement.dataset.theme === "dark";
    btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }

  btn.addEventListener("click", function () {
    var next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    syncLabel();
  });

  syncLabel();
})();
