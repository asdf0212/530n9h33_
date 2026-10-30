// 이미지·영상 불러오는 동안 "l0ad1n9…" 표시 (Figma: loading)
//   window.watchMedia(상자, img 또는 video)
// - 0.2초 안에 뜨면(캐시 등) 표시하지 않음 → 깜빡임 방지
// - 다 불러오면 표시를 지우고 이미지를 부드럽게 보여줌
// - 실패하면 표시만 지우고 빈 상자로 둠
(function () {
  var SHOW_AFTER = 200;

  function isReady(media) {
    return media.tagName === "VIDEO" ? media.readyState >= 2 : media.complete && media.naturalWidth > 0;
  }

  window.watchMedia = function (box, media) {
    if (!box || !media) return;
    box.classList.add("media-wait");
    if (isReady(media)) {
      box.classList.add("media-ready");
      return;
    }
    var timer = setTimeout(function () { box.classList.add("is-loading"); }, SHOW_AFTER);
    function done(ok) {
      clearTimeout(timer);
      box.classList.remove("is-loading");
      if (ok) box.classList.add("media-ready");
    }
    media.addEventListener(media.tagName === "VIDEO" ? "loadeddata" : "load", function () { done(true); }, { once: true });
    media.addEventListener("error", function () { done(false); }, { once: true });
  };
})();
