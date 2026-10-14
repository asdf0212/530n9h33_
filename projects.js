// 프로젝트 데이터. 새 작업은 이 배열 맨 위에 추가하면 목록과 필터에 자동 반영됩니다.
// tags: graphic / identity / editorial / digital / exhibition 중 여러 개 가능
// thumb: 썸네일 이미지 경로 (없으면 빈 박스로 표시)
//
// ── 상세 페이지(work/?p=slug)용 필드 — 없으면 해당 부분만 생략됨 ──
// hero:  첫 화면 꽉 찬 썸네일. 이미지 또는 .mp4 (없으면 thumb 사용, 그것도 없으면 빈 화면)
// info:  오버뷰 표의 행들 [라벨, 값]  예) ["period", "2025.02 - 2025.05"]
// en/kr: 오버뷰 설명 문단
// board: 오버뷰 아래 이미지·영상 콜라주. 위에서부터 순서대로 쌓임
//   { image: "경로", ratio: "16/9" }        풀폭 이미지 (ratio는 파일 없을 때 자리 비율)
//   { video: "경로.mp4" }                    자동재생 루프 영상
//   { embed: "https://youtu.be/..." }        유튜브·비메오 (16:9)
//   { row: [ {image…}, {video…} ] }          한 줄에 2개 나란히
//   { text: "문단" }                          짧은 설명
window.PROJECTS = [
  {
    slug: "lg-mandalic-web",
    title: "LG ELECTRONICS\nCOLLAGE STUDENT ART COLLABORATION POP-UP EXHIBITION",
    year: 2025,
    tags: ["exhibition"],
    thumb: "",
    summary:
      'The Mandalic Web is a media art project visualizing the "connection" value of LG\'s webOS platform, using a radiating-and-converging mandala/spiderweb motif in a looping motion graphic and a participatory installation where visitors attach handwritten notes of their experiences to form one connected network.',
    hero: "",
    info: [
      ["period", "2026.00 - 2026.00"],
      ["team", "solo"],
      ["contribution", "personal work 100%"],
      ["field", "exhibition"],
      ["application", "motion graphic, installation"],
    ],
    en: 'The Mandalic Web is a media art project visualizing the "connection" value of LG\'s webOS platform, using a radiating-and-converging mandala/spiderweb motif in a looping motion graphic and a participatory installation where visitors attach handwritten notes of their experiences to form one connected network.',
    kr: "The mandalic web은 LG전자 WEB OS의 비전인 ‘경험의 연결’의 핵심가치를 표현한 미디어아트 프로젝트입니다. 확산-수렴의 모티프를 만다라와 거미줄의 형상으로 엮어 반복되는 루프 애니메이션 모션그래픽과 설치 작품으로 표현하였으며, 모션그래픽 영상으로는 확산과 수렴의 시각화를, 설치 작품에는 방문객이 직접 메모지를 걸며 ‘경험의 연결’ 그 자체를 체감을 의도하였습니다.",
    // 실제 파일이 들어오기 전까지 자리만 잡아둔 샘플 보드
    board: [
      { image: "", ratio: "16/9" },
      { row: [{ image: "", ratio: "4/5" }, { image: "", ratio: "4/5" }] },
      { video: "", ratio: "16/9" },
      { row: [{ image: "", ratio: "1/1" }, { video: "", ratio: "1/1" }] },
      { image: "", ratio: "3/2" },
    ],
  },
  {
    slug: "deflare",
    title: "deflare",
    year: 2026,
    tags: ["graphic"],
    thumb: "",
    summary:
      'This book archives formal elements found in everyday life using the Zettelkasten method, adopting its "vertical numbering" and "connection" as graphic motifs to document the collected images, the contexts of their discovery, and the insights drawn from them.',
  },
  {
    slug: "line4thon",
    title: "2025 LINE4THON",
    year: 2025,
    tags: ["identity"],
    thumb: "",
    summary:
      'As key visual director for the Likelion University 13th-cohort joint hackathon "Line 4-thon," I built a modular, pixel-based graphic system on an intuitive grid, so non-designer teammates could easily combine and extend it into everything from the logo to goods and banners, keeping the online and offline experience consistent.',
  },
  {
    slug: "layered-portrait",
    title: "the layered portrait:\nCOEXISTING FACES OF EULJIRO",
    year: 2026,
    tags: ["graphic"],
    thumb: "",
    summary:
      'This book archives formal elements found in everyday life using the Zettelkasten method, adopting its "vertical numbering" and "connection" as graphic motifs to document the collected images, the contexts of their discovery, and the insights drawn from them.',
  },
  {
    slug: "gyeongchun-line-forest-park",
    title: "GYEONgchun line forest park",
    year: 2026,
    tags: ["graphic"],
    thumb: "",
    summary:
      'This book archives formal elements found in everyday life using the Zettelkasten method, adopting its "vertical numbering" and "connection" as graphic motifs to document the collected images, the contexts of their discovery, and the insights drawn from them.',
  },
  {
    slug: "zettelkasten-archive-book",
    title: "IMAGE REFERENCE ZETTELKASTEN PERMANENT MEMO ARCHIVE BOOK",
    year: 2026,
    tags: ["graphic"],
    thumb: "",
    summary:
      'This book archives formal elements found in everyday life using the Zettelkasten method, adopting its "vertical numbering" and "connection" as graphic motifs to document the collected images, the contexts of their discovery, and the insights drawn from them.',
  },
  {
    slug: "exit6-content-design",
    title: "exit6 general store\ncontent design",
    year: 2026,
    tags: ["graphic"],
    thumb: "",
    summary:
      'This book archives formal elements found in everyday life using the Zettelkasten method, adopting its "vertical numbering" and "connection" as graphic motifs to document the collected images, the contexts of their discovery, and the insights drawn from them.',
  },
  {
    slug: "dot-line-type-and-symbol",
    title: "DOT LINE TYPE AND SYMBOL",
    year: 2025,
    tags: ["digital"],
    thumb: "",
    summary:
      "DOT LINE TYPE AND SYMBOL is an interactive web design project based on Armin Hofmann's and Emil Ruder's design theory, where scrolling transforms dots into lines, planes, and symbols in black and white, turning a static theory book into a dynamic interface that lets users experience the grammar of form rather than just read it.",
  },
];

window.CATEGORIES = ["all", "graphic", "identity", "editorial", "digital", "exhibition"];
