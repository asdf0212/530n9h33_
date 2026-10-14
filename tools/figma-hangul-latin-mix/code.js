// 선택한 레이어 안의 모든 텍스트에 "합성 글꼴"을 적용하는 로컬 Figma 플러그인.
//   한글          → Apple SD Gothic Neo (AppleSDGothicNeoR00 Regular)
//   그 외(영문·숫자·기호·공백) → Helvetica Neue
//     원래 굵은 글자(Medium/Bold 계열)였으면 Medium, 아니면 Regular
// 웹사이트 more.css 의 혼용 규칙(Helvetica 우선, 한글만 Apple SD)과 같은 결과가 나온다.

const KO = { family: "AppleSDGothicNeoR00", style: "Regular" };
const LATIN_REGULAR = { family: "Helvetica Neue", style: "Regular" };
const LATIN_MEDIUM = { family: "Helvetica Neue", style: "Medium" };

// 한글 자모, 호환 자모, 확장 자모, 완성형 음절
const HANGUL = /[ᄀ-ᇿ㄰-㆏ꥠ-꥿가-힯ힰ-퟿]/;

function isHeavy(font) {
  return /medium|bold|heavy|black|semi/i.test(font.style) || /B00|Bold/.test(font.family);
}

function sameFont(a, b) {
  return a.family === b.family && a.style === b.style;
}

function collectTextNodes(nodes) {
  const out = [];
  for (const node of nodes) {
    if (node.type === "TEXT") out.push(node);
    if ("findAllWithCriteria" in node) {
      out.push(...node.findAllWithCriteria({ types: ["TEXT"] }));
    }
  }
  return [...new Set(out)];
}

async function main() {
  const selection = figma.currentPage.selection;
  if (!selection.length) {
    figma.closePlugin("바꿀 레이어(프레임, 컴포넌트, 텍스트)를 먼저 선택하세요.");
    return;
  }

  try {
    await Promise.all([KO, LATIN_REGULAR, LATIN_MEDIUM].map((f) => figma.loadFontAsync(f)));
  } catch (e) {
    figma.closePlugin("폰트를 불러올 수 없어요. Helvetica Neue와 Apple SD Gothic Neo가 설치되어 있는지 확인하세요.");
    return;
  }

  const texts = collectTextNodes(selection);
  let changedNodes = 0;
  let skipped = 0;

  for (const node of texts) {
    const segments = node.getStyledTextSegments(["fontName"]);

    // 현재 쓰인 폰트를 모두 불러와야 범위 수정이 가능
    try {
      await Promise.all(segments.map((s) => figma.loadFontAsync(s.fontName)));
    } catch (e) {
      skipped++;
      continue;
    }

    let changed = false;
    for (const seg of segments) {
      const latin = isHeavy(seg.fontName) ? LATIN_MEDIUM : LATIN_REGULAR;
      let runStart = seg.start;
      let runFont = null;

      for (let i = seg.start; i <= seg.end; i++) {
        const target = i < seg.end ? (HANGUL.test(node.characters[i]) ? KO : latin) : null;
        if (runFont && (!target || !sameFont(target, runFont))) {
          if (!sameFont(runFont, seg.fontName)) {
            node.setRangeFontName(runStart, i, runFont);
            changed = true;
          }
          runStart = i;
        }
        runFont = target;
      }
    }
    if (changed) changedNodes++;
  }

  figma.closePlugin(
    `완료: 텍스트 ${texts.length}개 중 ${changedNodes}개 변경` + (skipped ? `, ${skipped}개는 폰트 문제로 건너뜀` : "")
  );
}

main();
