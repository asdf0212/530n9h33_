// 행잉 펑추에이션 (모든 브라우저용)
// 여는 따옴표·괄호가 줄 맨 앞에 오면 글줄 밖(왼쪽)으로 내밀어, 글자 시작선이 똑바로 맞게 함.
// 원리: 따옴표 앞에 [밀기] 공간, 따옴표 자체에 [당기기] 음수 여백을 같은 폭으로 줌.
//   - 줄 중간: 밀기 + 당기기가 상쇄 → 아무 변화 없음
//   - 줄 맨 앞: 밀기는 윗줄 끝에 남고 당기기만 적용 → 따옴표가 왼쪽으로 매달림
// 새로 그린 영역은 window.hangPunctuation(요소) 로 다시 적용.
(function () {
  var OPEN = "‘“\"'(（[「『《〈";
  var SKIP = "script, style, input, textarea, .hang-pull, [data-no-hang]";
  var BLOCK = "p, dd, dt, li, h1, h2, h3, h4, blockquote, figcaption, td, th, div";

  function isOpen(ch) {
    return OPEN.indexOf(ch) !== -1;
  }

  // 이 텍스트 노드 앞에, 같은 블록 안에 공백이 아닌 글자가 있는지
  function hasTextBefore(node) {
    var block = node.parentElement.closest(BLOCK);
    if (!block) return true;
    var range = document.createRange();
    range.setStart(block, 0);
    range.setEnd(node, 0);
    return /\S/.test(range.toString());
  }

  function span(cls, text) {
    var s = document.createElement("span");
    s.className = cls;
    if (text) s.textContent = text;
    else s.setAttribute("aria-hidden", "true");
    return s;
  }

  function processNode(node) {
    var text = node.nodeValue;
    var frag = document.createDocumentFragment();
    var last = 0;
    var touched = false;

    for (var i = 0; i < text.length; i++) {
      if (!isOpen(text[i])) continue;

      var prev = i > 0 ? text[i - 1] : null;
      var atBlockStart = i === 0 && !hasTextBefore(node);
      var afterSpace = prev !== null && /\s/.test(prev);
      if (!atBlockStart && !afterSpace) continue; // 단어 중간 아포스트로피(it's) 등은 제외

      if (afterSpace) {
        // 공백 "앞"에 밀기를 둬야 줄바꿈 시 윗줄 끝에 남음
        frag.appendChild(document.createTextNode(text.slice(last, i - 1)));
        frag.appendChild(span("hang-push"));
        frag.appendChild(document.createTextNode(prev));
      } else {
        frag.appendChild(document.createTextNode(text.slice(last, i)));
      }
      frag.appendChild(span("hang-pull", text[i]));
      last = i + 1;
      touched = true;
    }

    if (!touched) return;
    frag.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode.replaceChild(frag, node);
  }

  // 따옴표 실제 폭을 재서 밀기/당기기 값을 em으로 맞춤 (폰트 로드 후 다시 실행)
  function measure(root) {
    root.querySelectorAll(".hang-pull").forEach(function (pull) {
      var size = parseFloat(getComputedStyle(pull).fontSize) || 16;
      var em = (pull.getBoundingClientRect().width / size).toFixed(3) + "em";
      pull.style.marginLeft = "-" + em;
      var push = pull.previousSibling && pull.previousSibling.previousSibling;
      if (push && push.classList && push.classList.contains("hang-push")) {
        push.style.marginRight = em;
      }
    });
  }

  function hangPunctuation(root) {
    root = root || document.body;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !/[‘“"'(（\[「『《〈]/.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        if (n.parentElement.closest(SKIP)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(processNode);
    measure(root);
  }

  window.hangPunctuation = hangPunctuation;
  hangPunctuation(document.body);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { measure(document.body); });
  }
})();
