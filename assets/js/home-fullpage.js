/* ==========================================================================
   앙상블 메이 — 홈(index.html) 섹션 스냅 스크롤
   fullPage.js v4.0.30 / 바닐라 JS 판입니다. jQuery 는 쓰지 않습니다.
   (jquery.fullpage.js 는 v2 계열의 옛 배포판입니다. 이 사이트에는 jQuery 가
    한 줄도 없어서, 그것 하나 때문에 90KB 를 더 싣는 대신 vanilla 판을 씁니다.)

   반드시 main.js 다음에 실려야 합니다 — 단원 사진과 갤러리는 main.js 가
   그려 넣습니다. 그 전에 초기화하면 fullPage 가 빈 칸의 높이를 재고 맙니다.

   이 파일은 main.js 를 건드리지 않고 얹히도록 만들었습니다.
   맞물리는 곳이 세 군데 있고, 각각 아래에 이유를 적어 두었습니다.
     1. 상단 바 색   — scroll 이벤트가 오지 않는 문제
     2. 메뉴 · 팝업  — 열려 있는 동안 휠로 칸이 넘어가는 문제
     3. 늦게 오는 사진 — 다 실린 뒤 높이를 다시 재는 문제
   ========================================================================== */
(function () {
  "use strict";

  var root = document.getElementById("main");
  if (!root || typeof fullpage === "undefined") return;

  /* ── 손으로 만지는 값 세 개 ───────────────────────────────────────────── */

  /* 칸이 넘어가는 데 걸리는 시간. */
  var SPEED = 700;

  /* 이 폭 아래로는 fullPage 를 끄고 보통 스크롤로 돌아갑니다.
     900px 인 이유 — style.css 가 바로 이 폭에서 상단 내비를 감추고
     햄버거로 바꿉니다(--hdr 도 95px → 102px 로 커집니다). 스냅 경계를
     레이아웃 경계와 같은 자리에 두면 "메뉴는 모바일인데 스크롤은
     데스크톱"인 어정쩡한 구간이 생기지 않습니다.
     768 로 하고 싶으면 이 숫자만 고치면 됩니다. 다만 769~900px 구간이
     그 어정쩡한 구간이 됩니다. */
  var BREAK_W = 900;

  /* 창 높이가 이보다 낮으면 역시 보통 스크롤로 돌아갑니다.
     마지막 칸에 CTA 와 푸터가 같이 들어 있어서, 낮은 창에서는 한 화면에
     담기지 않습니다. 잘린 채로 스냅되느니 그냥 스크롤되는 편이 낫습니다. */
  var BREAK_H = 700;

  /* 몇 번째 칸부터 상단 바를 흰 바탕으로 바꿀지. 0 부터 세므로 2 = 세 번째.
       0 히어로 · 1 영상   → 사진과 어두운 지면. 바탕 없이 흰 글자.
       2 단원 · 3 갤러리 · 4 CTA+푸터 → 흰 바탕에 먹색 글자.
     숫자만 바꾸면 경계가 옮겨집니다. 5 를 넣으면 아예 안 바뀝니다.       */
  var SOLID_FROM = 2;

  /* ── 움직임 줄이기 ─────────────────────────────────────────────────────
     스냅 스크롤은 사용자가 조금 굴렸는데 화면이 한 칸을 통째로 움직입니다.
     그 움직임을 힘들어하는 분들이 있습니다(어지럼증). 운영체제에서 "동작
     줄이기"를 켜 두었으면 아예 붙이지 않고 보통 스크롤로 둡니다 —
     main.js 의 등장 애니메이션은 style.css 쪽에서 이미 멈춰 있습니다.
     main.js 가 패럴랙스를 다루는 방식(calm)과 같은 판단입니다.        */
  if (window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;

  /* ── 1. 상단 바 색 되살리기 ────────────────────────────────────────────
     홈의 상단 바는 배경색이 없습니다. 대신 main.js 가 window 의 scroll 을
     듣고, 바가 지금 덮고 있는 칸이 어두운지 밝은지 보고 글자색을 뒤집습니다.

     그런데 fullPage 는 페이지를 실제로 스크롤하지 않습니다. container 를
     transform 으로 밀어 올릴 뿐이라 scroll 이벤트가 한 번도 오지 않습니다.
     그대로 두면 히어로에서 쓰던 흰 글씨가 밝은 [단원] 칸 위에 그대로
     남아서 로고와 메뉴가 보이지 않습니다.

     다행히 main.js 의 계산은 getBoundingClientRect 로 합니다. 그건
     transform 을 반영하기 때문에 값 자체는 처음부터 멀쩡했습니다.
     빠진 것은 "다시 재 보라"는 신호뿐입니다. 그래서 칸이 넘어가는 동안
     scroll 이벤트를 대신 쏴 줍니다. main.js 는 한 줄도 고치지 않습니다.

     한 번만 쏘면 안 됩니다 — 전환이 시작되는 순간에는 아직 히어로가
     바 밑에 있고, 700ms 에 걸쳐 다음 칸이 올라옵니다. 그 사이 내내
     쏴 줘야 색이 제때 바뀝니다.                                        */
  /* ── 상단 바를 흰 바탕으로 ─────────────────────────────────────────────
     .hdr 에 is-solid 를 붙였다 뗍니다. 생김새는 style.css 의
     [홈: 세 번째 칸부터 흰 바탕] 한 곳에 있습니다.

     data-hdr 을 "solid" 로 바꾸지 않는 이유는 그 주석에 적어 두었습니다 —
     규칙 묶음이 통째로 갈리면 transition 도 같이 갈려서 툭 바뀝니다.     */
  var hdrEl = document.querySelector(".hdr");
  function solid(on) {
    if (hdrEl) hdrEl.classList.toggle("is-solid", !!on);
  }

  var pulseEnd = 0, pulsing = false;
  function pulse(ms) {
    pulseEnd = Math.max(pulseEnd, Date.now() + ms);
    if (pulsing) return;
    pulsing = true;
    (function tick() {
      window.dispatchEvent(new Event("scroll"));
      if (Date.now() < pulseEnd) requestAnimationFrame(tick);
      else pulsing = false;
    }());
  }

  /* ── 초기화 ──────────────────────────────────────────────────────────── */
  new fullpage("#main", {

    /* ★ 라이선스 키 — README 의 [fullPage 라이선스] 항목을 먼저 읽어 주세요.
       비워 두면 콘솔에 오류가 찍히고 오른쪽 아래에 "Made with fullpage.js"
       딱지가 붙습니다. 동작 자체는 막히지 않습니다. */
    licenseKey: "",

    /* 어떤 요소를 한 칸으로 볼 것인가. 기본값이지만 눈에 보이게 적어 둡니다.
       index.html 의 #main > .section 다섯 개가 여기 걸립니다. */
    sectionSelector: ".section",

    /* ── 넘어가는 모양 ── */
    scrollingSpeed: SPEED,
    css3: true,                /* transform 으로 밉니다. top 을 움직이는 것보다 눕니다 */
    /* 가속했다가 끝에서 부드럽게 멎습니다. style.css 의 등장 애니메이션
       (@keyframes rise)이 쓰는 곡선과 같은 값이라, 칸이 올라오는 결과
       그 안의 글이 떠오르는 결이 서로 어긋나지 않습니다. */
    easingcss3: "cubic-bezier(.22,.61,.36,1)",

    /* ── 어디에 멈추는가 ── */
    autoScrolling: true,
    scrollBar: false,
    /* 어중간하게 걸쳐 있으면 가까운 칸으로 붙여 세웁니다. 트랙패드처럼
       스크롤이 잘게 들어오는 입력에서 특히 필요합니다. */
    fitToSection: true,
    fitToSectionDelay: 600,
    /* 마지막 칸(푸터)에서 더 굴려도 처음으로 돌아가지 않습니다.
       위쪽도 마찬가지입니다 — 끝은 끝으로 둡니다. */
    loopBottom: false,
    loopTop: false,

    /* ── 칸 안쪽 ── */
    /* fullPage 가 내용을 감싸는 상자를 만들어 가운데 정렬하는 기능입니다.
       끕니다 — 히어로는 .hero__bg / .hero__veil 을 position:absolute 로
       깔아 두었고, 사이에 상자가 하나 끼면 그 층이 어긋납니다.
       가운데 정렬은 fullpage-home.css 에서 직접 합니다. */
    verticalCentered: false,
    /* 칸 안에 따로 스크롤을 만드는 기능입니다. 끕니다 — 켜면 fullPage 가
       칸의 자식들을 .fp-overflow 라는 상자로 감쌉니다. 그러면 히어로의
       절대 위치 층과 .sec 의 여백이 다 그 상자 기준으로 다시 잡혀서
       style.css 를 손대야 합니다. 대신 창이 낮을 때는 위 BREAK_H 로
       보통 스크롤에 넘깁니다. */
    scrollOverflow: false,

    /* ── 길잡이 ── */
    /* 오른쪽 점 없음, 주소창 해시 없음 — 화면을 비워 두기로 했습니다.
       점을 켜려면 navigation:true 로 바꾸고 anchors 에 칸 수(5개)만큼
       이름을 넣으면 됩니다. 예:
         navigation: true,
         navigationTooltips: ["Home","About","Members","Gallery","Contact"],
         anchors: ["home","about","members","gallery","contact"],           */
    navigation: false,
    anchors: [],
    recordHistory: false,
    /* 키보드로도 넘어갑니다(↑↓ · PageUp/Down · Home/End).
       스냅 스크롤에서 이걸 끄면 마우스가 없는 사람은 페이지를 볼 수
       없게 됩니다. 반드시 켜 둔 채로 두세요. */
    keyboardScrolling: true,

    /* ── 여기서는 fullPage 가 손을 떼는 자리 ──
       사진 크게 보기 · 문의 팝업 · 모바일 메뉴 안에서 굴린 휠은
       칸을 넘기지 않고 그 안에서만 움직입니다. */
    normalScrollElements: ".lb, .mdl, .menu",

    /* ── 반응형 ──
       둘 중 하나라도 걸리면 fullPage 가 <html> 에서 fp-enabled 를 떼고
       보통 스크롤로 돌아갑니다. fullpage-home.css 의 규칙이 전부
       .fp-enabled 아래 있으므로 덧칠도 같이 사라집니다.
       그 상태의 홈은 이 작업을 하기 전과 똑같습니다 — 세로로 쭉 이어지고,
       main.js 의 등장 애니메이션이 스크롤에 맞춰 하나씩 올라옵니다. */
    responsiveWidth: BREAK_W,
    responsiveHeight: BREAK_H,

    /* ── 넘어갈 때마다 상단 바를 다시 칠합니다 ──
       창 크기가 바뀌면 남은 자리도 바뀝니다. fullPage 가 칸 높이를 다시
       잰 뒤(afterResize)에 이어서 사진 크기도 다시 맞춥니다 — 순서가
       중요해서 따로 resize 를 듣지 않고 여기에 붙였습니다. */
    /* 상단 바 색이 바뀌는 시점 ─────────────────────────────────────────
       바꾸기 좋은 순간은 "상단 바 자리를 목적지 칸이 덮은 때"입니다.
       그 순간이 방향에 따라 정반대입니다.

         위로 갈 때  — 올라오는 칸은 화면 위에서 내려옵니다. 그래서 상단 바
                      자리를 곧바로 덮습니다. 전환이 시작할 때 바꿉니다.
         아래로 갈 때 — 올라오는 칸은 화면 아래에서 올라옵니다. 상단 바
                      자리에 닿는 것은 맨 마지막입니다. 그때까지 상단 바
                      아래에는 떠나는 칸이 그대로 있습니다. 전환이 끝난
                      뒤에 바꿉니다.

       한쪽 시점으로 통일하면 반대 방향에서 반드시 어긋납니다 — 어두운
       칸 위에 먹색 글자가, 또는 밝은 칸 위에 흰 글자가 놓입니다.
       바뀌는 것 자체는 style.css 의 transition 이 380ms 에 걸쳐 녹입니다. */
    onLeave: function (origin, destination) {
      if (destination.index < origin.index) solid(destination.index >= SOLID_FROM);
      pulse(SPEED + 200);
    },
    afterLoad: function (origin, destination) {
      solid(destination.index >= SOLID_FROM);
      pulse(150);
    },
    afterRender: function () { rows(); fit(); pulse(150); },
    afterResize: function () { fit(); pulse(150); },
    /* 반응형(보통 스크롤)으로 내려가면 칸이라는 개념이 없어집니다.
       예전처럼 main.js 가 뒤 배경을 보고 글자색만 맞추도록 되돌립니다. */
    afterResponsive: function (isResponsive) {
      if (isResponsive) solid(false);
      fit();
      pulse(400);
    }
  });

  var fp = window.fullpage_api;
  if (!fp) return;

  /* ── 2. 메뉴 · 팝업이 열려 있는 동안 ───────────────────────────────────
     서랍이나 문의 팝업이 떠 있는데 뒤에서 칸이 넘어가면, 닫았을 때 엉뚱한
     자리에 와 있습니다. 열려 있는 동안에는 휠과 키보드를 막습니다.

     main.js 는 모바일 메뉴와 문의 팝업 둘 다 <body> 에 menu-open 을
     붙였다 뗍니다(main.js 의 setMenu · showMdl · hideMdl). 그 클래스 하나만
     지켜보면 두 경우가 다 걸립니다 — main.js 에 신호를 새로 만들지
     않아도 되는 이유입니다.                                            */
  var wasOpen = false;
  new MutationObserver(function () {
    var open = document.body.classList.contains("menu-open");
    if (open === wasOpen) return;
    wasOpen = open;
    fp.setAllowScrolling(!open);
    fp.setKeyboardScrolling(!open);
  }).observe(document.body, { attributes: true, attributeFilter: ["class"] });

  /* ── 3. 늦게 오는 사진 ─────────────────────────────────────────────────
     fullPage 는 초기화하는 순간의 높이를 재 둡니다. 단원·갤러리 사진은
     main.js 가 먼저 그려 넣지만(그래서 이 파일이 뒤에 실립니다), 그림 파일
     자체는 그 뒤에 도착합니다. 영상도 지연 삽입입니다. 다 실리고 나면
     한 번 다시 재라고 알려 줍니다.                                     */
  window.addEventListener("load", function () {
    fp.reBuild();
    fit();
    pulse(300);
  });

  /* ══════════════════════════════════════════════════════════════════════
     4. 칸에 안 들어가면 줄입니다

     단원 사진은 fullpage-home.css 가 계산으로 잡아 둡니다. 거기서 쓰는
     "줄 수"만 여기서 실제 인원으로 세어 넣어 줍니다 — 8명이면 2줄,
     12명이면 3줄입니다. 이 한 줄이 없으면 단원을 늘렸을 때 CSS 는 여전히
     2줄로 알고 계산해서 아랫줄이 잘립니다.

     활동 사진(갤러리)은 계산으로 못 잡습니다 — 사진마다 비율이 다르고
     어느 단으로 떨어질지는 브라우저가 정합니다. 그래서 재 보고 줄입니다.
     ══════════════════════════════════════════════════════════════════════ */

  /* 단원 줄 수를 세어 CSS 에 넘깁니다. 4단 기준입니다(.mem--4). */
  function rows() {
    document.querySelectorAll("#main .mem").forEach(function (m) {
      var n = m.children.length;
      if (n) m.style.setProperty("--rows", Math.ceil(n / 4));
    });
  }

  /* 재 보고 줄이기.
     넘친 높이만큼을 사진 덩어리에서 덜어 냅니다. 폭을 줄이면 높이가
     같은 비율로 따라 줄어드는 것들이라(사진은 비율이 고정입니다),
     "넘친 만큼 / 지금 높이" 가 그대로 줄일 비율이 됩니다.

     한 번에 안 맞을 수 있어서 몇 번 반복합니다 — 단을 나눠 쌓는 갤러리는
     폭이 줄면 사진이 다른 단으로 옮겨 가서 높이가 예상과 조금 달라집니다.
     세 번이면 충분히 맞아떨어집니다.

     0.45 아래로는 줄이지 않습니다. 그보다 작아지면 사진이 무엇인지
     알아볼 수 없어서, 차라리 조금 넘치는 편이 낫습니다. 그런 창은
     대부분 responsiveHeight(700px) 에 먼저 걸려 보통 스크롤로 갑니다. */
  var MEDIA = ".mas, .feat__v, .duo__m";
  var MIN = 0.45;

  /* 폭을 지정합니다. 큰 영상 칸에서는 아래 글 상자도 같은 폭으로 따라갑니다 —
     두 단의 바깥 끝이 영상의 좌우 끝과 어긋나면 한 덩어리로 보이지 않습니다.
     px 를 빈 문자열로 넘기면 둘 다 CSS 값(--feat-w)으로 되돌아갑니다.     */
  function cap(media, px) {
    media.style.maxWidth = px;
    if (media.classList.contains("feat__v")) {
      var txt = media.parentElement.querySelector(".feat__t");
      if (txt) txt.style.maxWidth = px;
    }
  }

  function fit() {
    /* 반응형으로 내려가 fullPage 가 손을 뗀 상태면, 줄여 놓았던 것을
       원래대로 되돌리고 물러납니다. 이 줄이 없으면 창을 좁혔을 때
       모바일 화면에 좁아진 사진이 그대로 남습니다. */
    if (!document.documentElement.classList.contains("fp-enabled")) {
      document.querySelectorAll("#main " + MEDIA.split(", ").join(", #main "))
        .forEach(function (m) { cap(m, ""); });
      return;
    }

    document.querySelectorAll("#main .section").forEach(function (sec) {
      var media = sec.querySelector(MEDIA);
      var inner = sec.firstElementChild;
      if (!media || !inner) return;

      cap(media, "");                       /* 먼저 원래대로 되돌리고 잽니다 —
                                               창을 다시 넓혔을 때 줄어든 채로
                                               굳지 않게 하는 줄입니다. */
      var room = sec.clientHeight;
      var full = media.getBoundingClientRect().width;
      if (!room || !full) return;

      for (var pass = 0; pass < 3; pass++) {
        var over = inner.offsetHeight - room;
        if (over <= 1) return;                       /* 다 들어갑니다 */

        var box = media.getBoundingClientRect();
        if (box.height < 80) return;                 /* 더 줄일 것이 없습니다 */

        var scale = (box.height - over) / box.height;
        var next = Math.max(full * MIN, box.width * scale);
        if (next >= box.width - 1) return;           /* 더 안 줄어듭니다 */
        cap(media, Math.floor(next) + "px");
      }
    });
  }

  rows();
  fit();

}());
