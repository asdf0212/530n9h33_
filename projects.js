// 프로젝트 데이터. 새 작업은 이 배열 맨 위에 추가하면 목록과 필터에 자동 반영됩니다.
// tags: graphic / identity / editorial / digital / exhibition 중 여러 개 가능
// thumb: 썸네일 이미지 경로 (없으면 빈 박스로 표시)
// year: 모르면 null → 연도 배지 생략
// title: \n 자리에서 카드 제목 줄바꿈
//
// ── 상세 페이지(work/?p=slug)용 필드 — 없으면 해당 부분만 생략됨 ──
// hero:  첫 화면 꽉 찬 썸네일. 이미지 또는 .mp4 (없으면 thumb 사용, 그것도 없으면 빈 화면)
// heroMobile: 세로 화면(휴대폰)용 첫 화면 이미지 (1080×1920). 없으면 hero를 잘라서 사용
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
    slug: "gyeongchun-line-forest-park",
    title: "GYEONGCHUN LINE FOREST PARK",
    year: 2025,
    tags: ["identity"],
    thumb: "",
    summary:
      "A brand identity proposal for a former railway reborn as a forest trail, built around its linear spatial structure and the accumulated experience of passing through it. The system unifies three previously disconnected sections — Hagye, Gongneung, and Hwarang — through a modular polygon symbol, derivative pictograms, and zone-specific signage.",
    info: [
      ["period", "MAY 2025 – JUN 2025"],
      ["team", "Team of 4"],
      ["contribution", "Research 30% / Design 100%"],
      ["field", "Identity"],
      ["application", "Brand Identity, Signage System"],
    ],
    en: "A local branding project centered on the \"linear spatiality\" of GYEONGCHUN LINE FOREST PARK, a former railway reborn as a forest trail. After identifying that public awareness skewed heavily toward one section, I proposed an identity unifying its three disconnected sections — Hagye, Gongneung, and Hwarang — into a single continuous journey. Using lettering and polygon modules that echo the rail's linear structure as motifs, I built an expandable symbol and signage system with a distinct color system for each section.",
    kr: "폐철도에서 숲길로 변모한 경춘선숲길의 '선형적 공간성'에 주목한 로컬 브랜딩입니다. 특정 구간에만 인지가 편중된 문제를 발견하고, 단절된 세 구간(하계·공릉·화랑)을 하나의 여정으로 통합하는 아이덴티티를 제안했습니다. 폐철길의 선형 구조를 반영한 레터링과 폴리곤 모듈을 모티프로, 확장 가능한 심볼·사이니지 체계와 구간별 색상 시스템을 구축했습니다.",
  },
  {
    slug: "line4thon",
    title: "2025 LINE4THON",
    year: 2025,
    tags: ["identity"],
    thumb: "",
    summary:
      "Key visual direction for LINE4THON, Likelion’s 13th intercollegiate hackathon, translating the Seoul subway Line 4 map into a pixel-based modular graphic system that non-designer teammates could easily combine and extend across logos, goods, and signage.",
    info: [
      ["period", "AUG 2025 – NOV 2025"],
      ["team", "Team of 4"],
      ["contribution", "Visual Direction 100%"],
      ["field", "Identity"],
      ["application", "Key Visual, Event Identity, Merchandise"],
    ],
    en: "As key visual director for LINE4THON, a university-consortium hackathon hosted by Likelion, I oversaw visual consistency across the entire on- and offline experience. To streamline collaboration with non-design teammates, I used an intuitive grid-based \"pixel graphic\" as the core motif, building a modular system — from the logo to merchandise and banners — that anyone on the team could combine and extend on their own.",
    kr: "멋쟁이사자처럼 대학 연합 해커톤 4호선톤의 키 비주얼 디렉팅을 맡아 온·오프라인 경험 전반의 일관성을 총괄했습니다. 비전공자 팀원들과의 협업 효율을 위해 직관적인 그리드 시스템의 '픽셀 기반 그래픽'을 핵심 모티프로, 로고부터 굿즈·배너까지 누구나 조합하고 확장할 수 있는 모듈형 시스템을 구축했습니다.",
  },
  {
    slug: "exit6-general-store",
    title: "EXIT6 GENERAL STORE",
    year: 2026,
    tags: ["graphic"],
    thumb: "",
    summary:
      "SNS feed thumbnails and content graphics for a vintage lifestyle shop, translating its “vintage, familiar, faded” mood into a graphic language built from era-specific references — American vintage, 60s Swiss design, IKEA catalogs — and print textures such as silkscreen and risograph.",
    info: [
      ["period", "FEB 2026 –"],
      ["team", "Client Work"],
      ["contribution", "Design Assistant"],
      ["field", "Graphic"],
      ["application", "SNS Content Design / Thumbnail Design"],
    ],
    en: "Social feed content design for EXIT6 GENERAL STORE, a curated vintage shop whose pieces grow more appealing the more they're used. Within that vintage mood, I broke \"vintage-ness\" down into two working axes — era and style (American vintage, 1960s Swiss design, IKEA catalogs) and print texture (silkscreen, risograph, paper materiality) — and translated each into its own distinct graphic language.",
    kr: "EXIT6 GENERAL STORE의 SNS 피드 콘텐츠 디자인입니다. 쓸수록 손길이 닿아 매력이 깊어지는 빈티지 제품을 다루는 편집샵의 무드 안에서, '빈티지함'을 시대·스타일의 레퍼런스(아메리칸 빈티지, 60년대 스위스, 이케아 카탈로그)와 인쇄 질감의 언어(실크스크린, 리소그래프, 종이 물성)로 세분화해 다양한 그래픽으로 풀어냈습니다.",
  },
  {
    slug: "zettelkasten-archive-book",
    title: "IMAGE REFERENCE ZETTELKASTEN:\nPERMANENT MEMO ARCHIVE BOOK",
    year: 2026,
    tags: ["editorial"],
    thumb: "assets/works/zettelkasten-archive-book/thumb.jpg",
    hero: "assets/works/zettelkasten-archive-book/hero.jpg",
    heroMobile: "assets/works/zettelkasten-archive-book/hero-m.jpg",
    summary:
      "This book archives formal elements found in everyday life using the Zettelkasten method, adopting its “vertical numbering” and “connection” as graphic motifs to document the collected images, the contexts of their discovery, and the insights drawn from them.",
    info: [
      ["period", "APR 2026 – JUN 2026"],
      ["team", "SOLO"],
      ["contribution", "PERSONAL WORK 100%"],
      ["field", "Editorial"],
      ["application", "Book Design"],
    ],
    en: "This book archives formal elements found in everyday life using the Zettelkasten method, adopting its \"vertical numbering\" and \"connection\" as graphic motifs to document the collected images, the contexts of their discovery, and the insights drawn from them.",
    kr: "일상에서 수집한 조형 요소들을 제텔카스텐 메모 기법으로 스크랩하고, 그중 일부를 그래픽 디자인 레퍼런스로 활용하기 위해 선별하여 제작한 아카이브 북입니다. 제텔카스텐의 핵심인 버티컬 넘버링과 링크를 그래픽 모티프로 삼아 이미지와 발견 경위, 그리고 조형 요소에서 얻은 인사이트를 함께 기록했습니다.",
    board: [
      { image: "assets/works/zettelkasten-archive-book/임시 01.jpg", ratio: "16/9" },
      { image: "assets/works/zettelkasten-archive-book/임시 02.jpg", ratio: "16/9" },
      { image: "assets/works/zettelkasten-archive-book/임시 03.jpg", ratio: "16/9" },
      { image: "assets/works/zettelkasten-archive-book/임시 03-1.jpg", ratio: "16/9" },
      { image: "assets/works/zettelkasten-archive-book/임시 04.jpg", ratio: "16/9" },
      { image: "assets/works/zettelkasten-archive-book/임시 05.jpg", ratio: "16/9" },
      { image: "assets/works/zettelkasten-archive-book/임시 06.jpg", ratio: "16/9" },
      { row: [{ image: "assets/works/zettelkasten-archive-book/임시 07.jpg", ratio: "8/9" }, { image: "assets/works/zettelkasten-archive-book/임시 08.jpg", ratio: "8/9" }] },
      { image: "assets/works/zettelkasten-archive-book/임시 09.jpg", ratio: "16/9" },
      { image: "assets/works/zettelkasten-archive-book/임시 10.jpg", ratio: "16/9" },
    ],
  },
  {
    slug: "layered-portrait",
    title: "THE LAYERED PORTRAIT:\nCOEXISTING FACES OF EULJIRO",
    year: 2025,
    tags: ["editorial"],
    thumb: "",
    summary:
      "An editorial book weaving together interviews with those who lived through Euljiro’s gentrification by day and those who newly inhabit it by night, using a black-and-white color reversal between chapters to visualize two contrasting lives coexisting within one city.",
    info: [
      ["period", "MAY 2025 – JUN 2025"],
      ["team", "Team of 2"],
      ["contribution", "Editorial Design 50% / Graphic Design 100%"],
      ["field", "Editorial"],
      ["application", "Book Design"],
    ],
    en: "THE LAYERED PORTRAIT: COEXISTING FACES OF EULJIRO is a book design project weaving together interviews that capture the daytime lives of those who endured Euljiro's gentrification and the nighttime lives of those now reshaping the neighborhood. Rather than framing these two contrasting times as opposites, the project reads them through a lens of coexistence, giving visual form to the layered, three-dimensional facets of a city where different ways of living overlap. A layout built from a deconstructed map of Euljiro and film photography reveals how day and night, industrial sites and neon signs, white and black — binaries usually read as opposites — in fact always coexist within one city, forming a humanistic portrait of Euljiro's most human expressions today.",
    kr: "이중초상(異重肖像): 을지로의 겹쳐진 얼굴은 젠트리피케이션 속에서 을지로를 살아낸 사람들의 낮과 이곳을 새롭게 살아가는 사람들의 밤을 인터뷰로 엮어낸 북 디자인 프로젝트입니다. 상반된 두 시간을 대립이 아닌 '공존'의 시선으로 바라보며, 서로 다른 삶의 방식이 겹쳐진 도시의 입체적인 단면들을 포착해 시각적 서사로 구현했습니다. 을지로의 지도를 해체한 그래픽과 필름 사진으로 구성된 레이아웃은 낮과 밤, 산업현장과 네온사인, 백과 흑이라는 이분법적 요소들이 실제로는 한 도시 안에서 항상 겹쳐 존재한다는 것을 드러냅니다.",
  },
  {
    slug: "deflare",
    title: "DEFLARE",
    year: 2025,
    tags: ["digital"],
    thumb: "",
    summary:
      "A mobile UI system for a wildfire evacuation service that uses CNN-based fire-spread prediction to proactively guide users toward safe alternative shelters before a fire reaches them.",
    info: [
      ["period", "JUL 2025"],
      ["team", "Team of 4"],
      ["contribution", "Research 25% / UI Design 100%"],
      ["field", "Digital"],
      ["application", "UX/UI Design"],
    ],
    en: "DEFLARE is an intelligent evacuation service born from the problem of residents being forced to relocate evacuation sites four times during the Gyeongju wildfires, causing confusion and wasted resources. Working with the development team, I combined a CNN-based wildfire spread prediction model to design a UI that recommends not the physically nearest shelter, but the safest one that's actually reachable without crossing the fire's predicted spread path.",
    kr: "경주 산불 당시 대피소를 네 번이나 옮겨야 했던 혼란과 자원 낭비의 문제의식에서 출발한 지능형 대피 서비스입니다. 개발팀과 협업해 CNN 기반 산불 확산 예측 모델을 결합, 물리적으로 가장 가까운 대피소가 아닌 확산 경로를 피해 실질적으로 생존 가능한 가장 안전한 대피소를 제안하는 UI를 설계했습니다.",
  },
  {
    slug: "gusuk-gusuk",
    title: "GUSUK GUSUK:\nLOCAL MARKET ANALYSIS FOR FOUNDERS",
    year: 2025,
    tags: ["digital"],
    thumb: "assets/works/gusuk-gusuk/thumb.jpg",
    hero: "assets/works/gusuk-gusuk/hero.jpg",
    heroMobile: "assets/works/gusuk-gusuk/hero-m.jpg",
    summary:
      "A local commercial district analysis service for first-time founders that layers qualitative, everyday-life context — drawn from SNS, blogs, and delivery app data — onto conventional numbers-driven analysis. Starting from on-the-ground context uncovered through interviews with merchants and aspiring founders, the service translates complex data into an intuitively readable report.",
    info: [
      ["period", "SEP 2025 – DEC 2025"],
      ["team", "Team of 3"],
      ["contribution", "Research 33% / Design 60%"],
      ["field", "Digital"],
      ["application", "Service Design, Data Visualization, Web Report"],
    ],
    en: "GUSUK GUSUK is a local market analysis service for prospective business owners that layers qualitative, everyday context — drawn from social media, blogs, and delivery apps — onto conventional, numbers-only commercial analytics. Starting from on-the-ground context uncovered through interviews with shop owners and aspiring founders, I designed the service to translate complex data into an intuitively readable report format.",
    kr: "예비 창업자를 위한 지역 상권 분석 서비스로, 수치 중심의 기존 분석에 SNS·블로그·배달앱 등 생활 데이터 기반의 정성적 맥락을 더했습니다. 상인·예비 창업자 인터뷰로 발견한 현장의 맥락을 출발점 삼아, 복잡한 데이터를 직관적으로 읽을 수 있는 리포트 형태로 설계했습니다.",
    board: [
      { image: "assets/works/gusuk-gusuk/01.jpg", ratio: "16/9" },
      { image: "assets/works/gusuk-gusuk/02.jpg", ratio: "16/9" },
      { image: "assets/works/gusuk-gusuk/03.jpg", ratio: "16/9" },
      { image: "assets/works/gusuk-gusuk/04.jpg", ratio: "16/9" },
      { image: "assets/works/gusuk-gusuk/05.jpg", ratio: "16/9" },
      { image: "assets/works/gusuk-gusuk/06.jpg", ratio: "16/9" },
      { image: "assets/works/gusuk-gusuk/07.jpg", ratio: "16/9" },
    ],
  },
  {
    slug: "dot-line-type-and-symbol",
    title: "DOT LINE TYPE AND SYMBOL",
    year: 2025,
    tags: ["digital"],
    thumb: "",
    summary:
      "An interactive website translating the grammar of form — from point to line, plane, letterform, and symbol — drawn from Armin Hofmann and Emil Ruder’s typographic theory, independently designed and coded through scroll-based interaction.",
    info: [
      ["period", "MAY 2025 – JUN 2025"],
      ["team", "SOLO"],
      ["contribution", "Personal Work 100%"],
      ["field", "Digital"],
      ["application", "UX/UI Design"],
    ],
    en: "DOT LINE TYPE AND SYMBOL is a web design project exploring the order and structure of formal elements — dots, lines, letters, and symbols. Grounded in the design theories of Armin Hofmann and Emil Ruder, it translates a static theory book into an interactive web interface, where scrolling expands dots into lines and lines into planes and symbols against stark black-and-white contrast. The goal was to let users intuitively feel the logic of visual grammar through interaction, rather than simply read about it.",
    kr: "조형 요소—점, 선, 문자, 기호의 질서와 구조를 탐구하는 웹 디자인 프로젝트입니다. 아르민 호프만과 에밀 루더의 디자인 이론을 기반으로, 흑백의 대비 속에서 조형 언어가 전이되는 과정을 인터랙티브하게 구현하는 것을 목표로 두었습니다. 사용자의 스크롤에 따라 점이 선으로, 선이 면과 기호로 확장되는 시각적 경험을 설계했습니다. 정적인 이론서를 동적인 웹 인터페이스로 치환함으로써, 조형 문법의 원리를 단순히 읽는 것이 아니라 감각적으로 체득할 수 있도록 했습니다.",
  },
  {
    slug: "lg-mandalic-web",
    title: "THE MANDALIC WEB",
    year: 2025,
    tags: ["exhibition"],
    thumb: "",
    summary:
      "THE MANDALIC WEB visualizes the value of “connection” at the heart of LG Electronics’ webOS platform, shaping the links between people, generations, and experiences into a mandala-like web that radiates outward and converges to a single point. The project spans two media: a looping motion graphic of this radiating, converging web, and a participatory installation where visitors attach handwritten notes of their own experiences directly onto the web-shaped structure.",
    hero: "",
    info: [
      ["period", "FEB 2025 – MAY 2025"],
      ["team", "solo"],
      ["contribution", "personal work 100%"],
      ["field", "exhibition"],
      ["application", "motion graphic, installation"],
    ],
    en: "THE MANDALIC WEB is a media art project visualizing the \"connection\" value of LG's webOS platform, using a radiating-and-converging mandala/spiderweb motif in a looping motion graphic and a participatory installation where visitors attach handwritten notes of their experiences to form one connected network.",
    kr: "THE MANDALIC WEB은 LG전자 WEB OS의 비전인 ‘경험의 연결’의 핵심가치를 표현한 미디어아트 프로젝트입니다. 확산-수렴의 모티프를 만다라와 거미줄의 형상으로 엮어 반복되는 루프 애니메이션 모션그래픽과 설치 작품으로 표현하였으며, 모션그래픽 영상으로는 확산과 수렴의 시각화를, 설치 작품에는 방문객이 직접 메모지를 걸며 ‘경험의 연결’ 그 자체를 체감을 의도하였습니다.",
    // 실제 파일이 들어오기 전까지 자리만 잡아둔 샘플 보드
    board: [
      {"image": "", "ratio": "16/9"},
      {"row": [{"image": "", "ratio": "4/5"}, {"image": "", "ratio": "4/5"}]},
      {"video": "", "ratio": "16/9"},
      {"row": [{"image": "", "ratio": "1/1"}, {"video": "", "ratio": "1/1"}]},
      {"image": "", "ratio": "3/2"},
    ],
  },
];

window.CATEGORIES = ["all", "graphic", "identity", "editorial", "digital", "exhibition"];
