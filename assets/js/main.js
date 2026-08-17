/* ==========================================================================
   앙상블 메이 — 동작
   상단 바 상태 / 모바일 메뉴 / 갤러리 렌더 / 라이트박스 / 영상 지연 삽입
   ========================================================================== */
(function () {
  "use strict";

  /* 움직임을 줄여 달라고 설정한 분에게는 아래 패럴랙스를 붙이지 않습니다.
     리빌(등장 애니메이션)은 CSS 쪽에서 이미 멈춰 있습니다. */
  var calm = window.matchMedia &&
             window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* ── 상단 바 글자색을 뒤 배경에 맞춥니다 (홈) ─────────────────────────
     홈의 상단 바는 색을 깔지 않고 흐림만 겁니다. 그래서 글자색이 뒤에
     오는 것에 따라 달라져야 합니다 — 어두운 구간에서는 흰색, 밝은
     구간에서는 먹색입니다.

     뒤 픽셀을 직접 읽는 방법은 없습니다(브라우저가 화면을 내주지 않습니다).
     그래서 구간 단위로 판단합니다 — 지금 상단 바가 덮고 있는 자리에 어떤
     섹션이 걸쳐 있는지 찾아서, 그 섹션이 어두운 쪽인지 봅니다.
     어두운 쪽은 클래스로 알 수 있습니다: 히어로 · sec--dark · CTA · 푸터.
     섹션을 새로 넣어도 클래스만 맞으면 따로 손볼 것이 없습니다.

     갤러리처럼 사진이 지나가는 구간은 한 섹션 안에서도 밝기가 들쭉날쭉
     합니다. 거기까지는 구간 판단으로 못 잡아서, style.css 쪽에서 글자에
     옅은 그림자를 깔아 두었습니다.                                     */
  var hdr = document.querySelector(".hdr");
  if (hdr && document.body.dataset.hdr === "overlay") {
    /* 홈이 fullPage 로 넘어가면서 섹션마다 div.section 껍데기가 하나씩
       생겼습니다. 그래서 "main 의 바로 아래 자식"으로는 더 이상 찾을 수
       없습니다 — 껍데기를 건너뛰고 알맹이를 바로 집습니다.
       순서는 문서에 적힌 순서 그대로라(히어로 → 글 칸 셋 → CTA → 푸터)
       아래 반복문이 위에서부터 훑는 방식은 그대로입니다.
       이 블록은 data-hdr="overlay" 인 홈에서만 돕니다. 다른 페이지는
       전부 "solid" 라서 여기 걸리지 않습니다.                        */
    var bands = document.querySelectorAll("main .hero, main .sec, main .cta, footer");
    var isDark = function (el) {
      return el.classList.contains("hero") || el.classList.contains("sec--dark") ||
             el.classList.contains("cta")  || el.classList.contains("foot");
    };
    var waitingHdr = false;
    var paint = function () {
      waitingHdr = false;
      /* 바 높이의 조금 아래를 재는 이유 — 경계에 딱 걸치면 스크롤할 때
         두 구간 사이에서 색이 깜빡입니다. */
      var y = hdr.offsetHeight * 0.55, light = false;
      for (var i = 0; i < bands.length; i++) {
        var r = bands[i].getBoundingClientRect();
        if (r.top <= y && r.bottom > y) { light = !isDark(bands[i]); break; }
      }
      hdr.classList.toggle("is-onlight", light);
    };
    var queue = function () {
      if (waitingHdr) return;
      waitingHdr = true;
      requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
  }

  /* ── 히어로 배경: 아주 얕은 패럴랙스 ──────────────────────────────────
     내린 만큼의 0.4배로 배경이 뒤따라 내려옵니다. 20px 에서 멈춥니다 —
     그 위로 더 가면 사진이 아니라 화면이 흔들리는 것처럼 보입니다.

     transform 이 아니라 translate 를 쓰는 이유 — .hero__bg 는 페이지가
     열릴 때 kenburns 가 transform(scale) 을 잡고 있습니다. 같은 속성에
     손을 대면 둘이 서로 덮어씁니다. translate 는 별개 속성이라 겹쳐서
     적용됩니다(.rep__dots · .lb__nav 에서 쓰는 것과 같은 방식입니다).

     아래로 미는 것이지 위로 당기는 것이 아닙니다. 위로 당기면 히어로
     아래쪽에 빈 띠가 생겨 그대로 보입니다. 아래로 밀면 빈 자리가 위에
     생기는데, 그 자리는 이미 화면 밖으로 올라간 뒤라(0.4배는 언제나
     스크롤량보다 작습니다) 눈에 닿지 않습니다.                         */
  var hbg = document.querySelector(".hero__bg");
  if (hbg && !calm) {
    var waiting = false;
    var park = function () {
      waiting = false;
      hbg.style.translate = "0 " + Math.min(window.scrollY * 0.4, 20).toFixed(1) + "px";
    };
    window.addEventListener("scroll", function () {
      /* 스크롤 이벤트는 한 프레임에 여러 번 옵니다. 그릴 때 한 번만 계산합니다. */
      if (waiting) return;
      waiting = true;
      requestAnimationFrame(park);
    }, { passive: true });
    park();
  }

  /* ── 히어로 사진 넘기기 ───────────────────────────────────────────────
     content.js 의 HERO 에 적은 사진을 한 장씩 겹쳐 놓고 번갈아 띄웁니다.
     넘기는 것은 opacity 하나뿐입니다 — 사진을 갈아 끼우는 방식(src 교체)은
     새 사진을 받아오는 동안 한 번 깜빡입니다.

     HERO 가 비어 있으면 아무것도 하지 않습니다. style.css 의
     .hero__bg 가 들고 있는 hero.webp 한 장이 예전 그대로 나옵니다.

     타이머를 멈추는 자리가 두 곳 있습니다.
       · 히어로가 화면 밖으로 나갔을 때 (다른 칸을 보고 있는 동안)
       · 탭을 다른 곳으로 옮겼을 때
     보이지도 않는 사진을 2초마다 바꾸면 배터리만 씁니다.            */
  var heroList = (window.HERO || []).filter(Boolean);
  if (hbg && heroList.length) {
    var ms = window.HERO_MS || {};
    var HOLD = ms.hold || 2000;
    var FADE = ms.fade || 900;

    hbg.style.setProperty("--hero-fade", FADE + "ms");
    hbg.classList.add("is-slides");   /* 위에 겹칠 것이므로 hero.webp 는 받지 않습니다 */

    var slides = heroList.map(function (src, i) {
      var s = document.createElement("div");
      s.className = "hero__s" + (i === 0 ? " is-on" : "");
      s.style.backgroundImage = 'url("' + String(src).replace(/"/g, "%22") + '")';
      hbg.appendChild(s);
      return s;
    });

    /* 첫 장 말고는 나중에 받아 둡니다. 넘어가는 순간에 받기 시작하면
       그 한 번은 흰 자리가 스쳐 지나갑니다.                          */
    if (slides.length > 1) {
      window.addEventListener("load", function () {
        heroList.slice(1).forEach(function (src) { new Image().src = src; });
      });
    }

    /* 한 장뿐이거나(넘길 것이 없습니다) 동작 줄이기를 켠 경우에는
       첫 장에서 그대로 멈춥니다. 2초마다 화면 전체가 바뀌는 것은
       움직임에 예민한 분들에게 가장 부담이 큰 종류입니다.           */
    if (slides.length > 1) {
      var at = 0, timer = null, heroSeen = true;
      var hero = hbg.closest(".hero") || hbg;

      /* 지금 몇 번째인지 알려 주는 점입니다. 사진이 저절로 넘어가면
         사람은 "몇 장이나 더 있지?" 를 알 수 없습니다 — 점이 그 답입니다.
         눌러서 바로 그 장으로 갈 수도 있습니다.                       */
      var dots = document.createElement("div");
      dots.className = "hero__dots";
      dots.setAttribute("role", "group");
      dots.setAttribute("aria-label", "히어로 사진 넘기기");

      var buttons = slides.map(function (_, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "hero__dot" + (i === 0 ? " is-on" : "");
        b.setAttribute("aria-label", (i + 1) + "번째 사진");
        if (i === 0) b.setAttribute("aria-current", "true");
        b.addEventListener("click", function () {
          go(i);
          /* 방금 누른 장이 바로 넘어가 버리면 누른 보람이 없습니다.
             시계를 처음부터 다시 셉니다. */
          if (timer) { run(false); run(true); }
        });
        dots.appendChild(b);
        return b;
      });
      hero.appendChild(dots);

      var go = function (i) {
        slides[at].classList.remove("is-on");
        buttons[at].classList.remove("is-on");
        buttons[at].removeAttribute("aria-current");
        at = i;
        slides[at].classList.add("is-on");
        buttons[at].classList.add("is-on");
        buttons[at].setAttribute("aria-current", "true");
      };
      var step = function () { go((at + 1) % slides.length); };
      var run = function (on) {
        if (on && !timer) timer = setInterval(step, HOLD);
        else if (!on && timer) { clearInterval(timer); timer = null; }
      };
      var check = function () { run(heroSeen && !document.hidden); };

      /* 동작 줄이기를 켠 분에게는 저절로 넘기지 않습니다. 점을 눌러
         직접 넘기는 것은 그대로 됩니다 — 스스로 일으킨 움직임까지
         막을 이유는 없습니다. */
      if (!calm) {
        document.addEventListener("visibilitychange", check);
        if ("IntersectionObserver" in window) {
          new IntersectionObserver(function (es) {
            heroSeen = es[0].isIntersecting;
            check();
          }, { threshold: 0.01 }).observe(hero);
        } else {
          run(true);
        }
      }
    }
  }

  /* ── 모바일 메뉴 ──────────────────────────────────────────────────── */
  var burger = document.querySelector(".burger");
  var menu = document.querySelector(".menu");
  if (burger && menu) {
    var setMenu = function (open) {
      menu.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", String(open));
    };
    burger.addEventListener("click", function () {
      setMenu(!menu.classList.contains("is-open"));
    });
    menu.addEventListener("click", function (e) {
      /* 항목 · 닫기 단추 · 서랍 바깥의 막. 셋 다 누르면 닫힙니다.
         e.target === menu 는 "막을 직접 눌렀다"는 뜻입니다 — 서랍(판) 안을
         누른 경우는 target 이 판이나 그 자식이라 여기 걸리지 않습니다. */
      if (e.target === menu || e.target.closest("a") || e.target.closest(".menu__x")) {
        setMenu(false);
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* ── 사진과 공연 잇기 ─────────────────────────────────────────────────
     GALLERY 의 show 값이 SHOWS 의 id 를 가리킵니다. 이 연결 하나가
       · 지난 공연 카드의 대표 사진
       · 공연별로 넘겨 보기
       · 갤러리 날짜 정렬
     세 가지를 다 굴립니다. 사진 목록은 GALLERY 한 곳뿐입니다 —
     같은 사진 경로를 두 군데 적어 두면 한쪽만 고치고 잊습니다.        */
  var SHOWS = window.SHOWS || [];
  var PHOTOS = window.GALLERY || [];

  function showById(id) {
    for (var i = 0; i < SHOWS.length; i++) if (SHOWS[i].id === id) return SHOWS[i];
    return null;
  }
  function photosOf(id) {
    return PHOTOS.filter(function (p) { return p.show === id; });
  }
  /* 이 사진이 언제 것인가.
     ★ 파일 이름이 먼저입니다. 이름 규칙이 YYYYMMDD-행사-번호.webp 라서
       이름만 고쳐도 정렬이 따라옵니다 — content.js 를 두 군데 고칠 일이
       없습니다(경로 한 줄만 바꾸면 됩니다).
     이름에 날짜가 없는 파일은 공연 날짜 → 직접 적은 date 순으로 찾습니다.
     셋 다 없으면 빈 값이고, 정렬하면 맨 뒤로 갑니다. */
  function photoDate(p) {
    var m = /(\d{4})(\d{2})(\d{2})/.exec(String(p.src).split("/").pop());
    if (m) return m[1] + "." + m[2] + "." + m[3];
    var s = p.show ? showById(p.show) : null;
    return (s && s.date) || p.date || "";
  }
  /* 크게 보기 설명줄 — 공연 사진이면 공연 이름·날짜가 그대로 나옵니다. */
  function photoCaption(p) {
    var s = p.show ? showById(p.show) : null;
    return s ? [s.title, s.date].filter(Boolean).join(" · ") : (p.caption || "");
  }

  /* ── 사진 / 영상 탭 (gallery.html) ────────────────────────────────────
     한 페이지 안에서 골라 봅니다. 처음에는 사진입니다.
     주소 끝에 #videos 가 붙어 들어오면 영상이 먼저 열립니다 — 푸터의
     [연주 영상] 링크가 6개 파일에 그대로 들어 있어서 그 주소를 살렸습니다.

     탭을 바꿀 때 내용을 다시 그리지 않고 감췄다 보이기만 합니다.
     영상 썸네일은 loading="lazy" 라, 감춰져 있는 동안에는 받아오지도
     않습니다 — 사진만 보고 나가는 분에게 영상 몫이 부담되지 않습니다. */
  var tabs = document.querySelector("[data-tabs]");
  if (tabs) {
    var tabBtns = tabs.querySelectorAll("[data-tab]");
    var sortbar = document.querySelector("[data-sortbar]");

    var setTab = function (name, remember) {
      tabBtns.forEach(function (b) {
        var on = b.dataset.tab === name;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-selected", String(on));
        b.tabIndex = on ? 0 : -1;      /* 탭 묶음은 화살표로 옮겨 다닙니다 */
      });
      document.querySelectorAll("[data-panel]").forEach(function (p) {
        p.hidden = p.dataset.panel !== name;
      });
      /* 정렬은 사진에만 쓰입니다 */
      if (sortbar) sortbar.hidden = name !== "photos";
      /* 주소에도 남겨서 새로 고치거나 링크를 나눠도 같은 탭이 열립니다.
         replaceState 라 뒤로 가기 기록이 쌓이지 않습니다. */
      if (remember && history.replaceState) history.replaceState(null, "", "#" + name);
    };

    tabs.addEventListener("click", function (e) {
      var b = e.target.closest("[data-tab]");
      if (b) setTab(b.dataset.tab, true);
    });
    /* role="tablist" 를 붙였으면 좌우 화살표로도 옮겨 다녀야 합니다. */
    tabs.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      var list = Array.prototype.slice.call(tabBtns);
      var i = list.indexOf(document.activeElement);
      if (i < 0) return;
      e.preventDefault();
      var next = list[(i + (e.key === "ArrowRight" ? 1 : -1) + list.length) % list.length];
      next.focus();
      setTab(next.dataset.tab, true);
    });

    var fromHash = location.hash === "#videos" || location.hash === "#photos";
    setTab(location.hash === "#videos" ? "videos" : "photos", false);
    /* 주소로 바로 들어오면 브라우저는 감춰져 있던 판으로 뛰려고 합니다.
       그 자리에서는 탭 줄이 화면 위로 밀려 보이지 않으므로, 줄이 보이는
       자리로 다시 올려 세웁니다(위 여백은 html 의 scroll-padding-top). */
    if (fromHash) {
      var bar = document.querySelector(".tabbar");
      if (bar) requestAnimationFrame(function () { bar.scrollIntoView(); });
    }
  }

  /* ── 갤러리 ─────────────────────────────────────────────────────────
     기본은 최신순입니다. [과거순] 으로 바꿀 수 있습니다.               */
  var mas = document.querySelector("[data-gallery]");
  /* ★ 이 배열은 통째로 바꾸지 않고 안만 갈아 끼웁니다. 아래 bindLb 가 이
     배열을 그대로 붙잡고 있어서, 새 배열로 갈아치우면 정렬을 바꾼 뒤
     크게 보기가 옛 순서를 가리킵니다. */
  var shown = [];

  if (mas && window.GALLERY) {
    var limit = parseInt(mas.dataset.gallery, 10);
    /* 홈은 앞에서 고른 8장을 목록 순서 그대로 씁니다 — 가로 사진으로
       골라 둔 자리라 순서가 바뀌면 단 높이가 들쭉날쭉해집니다.
       정렬은 갤러리 페이지에서만 합니다. */
    var pool = isNaN(limit) ? PHOTOS.slice() : PHOTOS.slice(0, limit);
    var firstSort = isNaN(limit) ? "new" : "none";

    /* 날짜는 "2026.01" 꼴이라 글자 그대로 비교해도 시간 순서가 맞습니다.
       날짜를 모르는 사진은 최신순이든 과거순이든 맨 뒤에 둡니다 —
       언제 것인지 모르는 사진을 아무 자리에나 끼워 넣지 않습니다. */
    /* dir 은 1 이 과거순(오름차순), -1 이 최신순(내림차순)입니다.
       날짜가 빠진 쪽은 dir 과 상관없이 늘 뒤로 보냅니다. */
    var byDate = function (a, dir) {
      return a.sort(function (x, y) {
        var dx = photoDate(x), dy = photoDate(y);
        if (!dx || !dy) return dx ? -1 : dy ? 1 : 0;
        return dx < dy ? -dir : dx > dy ? dir : 0;
      });
    };
    var order = {
      "new": function (a) { return byDate(a, -1); },
      old:   function (a) { return byDate(a,  1); }
    };

    /* 사진마다 제목을 달 수 없어서 화면에는 제목·부제목을 쓰지 않습니다.
       .mas__ov 는 글 없이 남깁니다 — 눌러서 크게 볼 수 있다는 표시입니다.
       title 은 alt 로만 남습니다(화면에는 안 보이고 읽어주는 기계만 씁니다). */
    var draw = function (how) {
      var list = order[how] ? order[how](pool.slice()) : pool.slice();
      shown.length = 0;
      Array.prototype.push.apply(shown, list);
      mas.innerHTML = shown.map(function (g, i) {
        var inner = g.src
          ? '<img src="' + g.src + '" alt="' + esc(g.title) + '" loading="lazy">'
          : "";
        return (
          '<a class="mas__i" href="#" data-i="' + i + '">' +
          '<span class="mas__ph" style="aspect-ratio:' + g.ratio + '">' + inner + "</span>" +
          '<span class="mas__ov"></span></a>'
        );
      }).join("");
    };
    draw(firstSort);

    /* 정렬 고르개. 브라우저 기본 <select> 대신 직접 만든 것이라 여는 것 ·
       고르는 것 · 키보드까지 여기서 챙깁니다.
       다시 그린 사진에는 data-reveal 이 붙지 않으므로 곧바로 보입니다 —
       정렬을 바꿀 때마다 처음부터 다시 올라오면 성가십니다. */
    var sel = document.querySelector("[data-sort]");
    if (sel) {
      var selBtn = sel.querySelector(".sel__b");
      var selLab = sel.querySelector("[data-sel-label]");
      var selList = sel.querySelector(".sel__list");
      var opts = Array.prototype.slice.call(sel.querySelectorAll(".sel__o"));

      var openSel = function (on) {
        selList.hidden = !on;
        sel.classList.toggle("is-open", on);
        selBtn.setAttribute("aria-expanded", String(on));
        if (on) {
          /* 펼치면 지금 골라져 있는 줄로 초점을 옮깁니다 — 화살표를 누르면
             거기서부터 움직입니다. */
          var cur = opts.filter(function (o) {
            return o.getAttribute("aria-selected") === "true";
          })[0] || opts[0];
          cur.focus();
        }
      };
      var choose = function (o) {
        opts.forEach(function (x) {
          x.setAttribute("aria-selected", String(x === o));
        });
        selLab.textContent = o.textContent;
        draw(o.dataset.value);
        openSel(false);
        selBtn.focus();
      };

      selBtn.addEventListener("click", function () { openSel(selList.hidden); });
      selList.addEventListener("click", function (e) {
        var o = e.target.closest(".sel__o");
        if (o) choose(o);
      });
      sel.addEventListener("keydown", function (e) {
        if (e.key === "Escape") { openSel(false); selBtn.focus(); return; }
        if (selList.hidden) {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); openSel(true); }
          return;
        }
        var i = opts.indexOf(document.activeElement);
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          opts[(i + (e.key === "ArrowDown" ? 1 : -1) + opts.length) % opts.length].focus();
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (i >= 0) choose(opts[i]);
        }
      });
      /* 바깥을 누르면 닫습니다. sel 안을 누른 경우는 위 두 처리가 맡습니다. */
      document.addEventListener("click", function (e) {
        if (!sel.contains(e.target)) openSel(false);
      });
    }
  }

  /* ── 단원 ─────────────────────────────────────────────────────────────
     홈의 [함께 연주하는 아이들]. 이름·파트는 있는 사람에게만 붙습니다 —
     빈 줄을 그려 두면 아직 안 채운 자리가 무너진 것처럼 보입니다.      */
  var mem = document.querySelector("[data-members]");
  if (mem && window.MEMBERS) {
    mem.innerHTML = window.MEMBERS.map(function (m) {
      var face = m.src
        ? '<span class="mem__ph"><img src="' + esc(m.src) + '" alt="' +
          esc(m.name || "앙상블 메이 단원") + '" loading="lazy"></span>'
        : '<span class="mem__ph" aria-hidden="true"></span>';
      return '<div class="mem__c">' + face +
        (m.name ? '<p class="mem__n">' + esc(m.name) + "</p>" : "") +
        (m.part ? '<p class="mem__p">' + esc(m.part) + "</p>" : "") +
        "</div>";
    }).join("");
  }

  /* ── 지난 공연 ────────────────────────────────────────────────────────
     Concert 페이지의 연혁 목록. data/content.js 의 SHOWS 를 씁니다.
     사진은 있는 공연에만 붙습니다 — 없는 줄에 빈 상자를 두면 목록이
     듬성듬성해 보입니다. 사진이 붙은 줄만 눌러서 크게 볼 수 있고,
     좌우 화살표도 사진이 있는 공연끼리만 넘어갑니다.                    */
  var hist = document.querySelector("[data-shows]");
  var showPix = [];

  if (hist && window.SHOWS) {
    hist.innerHTML = SHOWS.map(function (s) {
      /* 이 공연 사진 = GALLERY 에서 show 가 이 공연을 가리키는 것들.
         맨 앞이 카드의 대표 사진입니다. */
      var pics = photosOf(s.id);
      var face, tag, attr;

      if (pics.length) {
        /* showPix 는 [공연1 사진들, 공연2 사진들, …] 을 한 줄로 이어 붙인
           것입니다. 카드에는 그 공연이 시작되는 자리를 적어 둡니다 —
           누르면 그 공연 첫 사진부터 열리고, 계속 넘기면 자연스럽게
           다음 공연 사진으로 이어집니다. */
        var start = showPix.length;
        pics.forEach(function (p) {
          showPix.push({
            src: p.src,
            ratio: p.ratio || "3/2",
            title: p.title,
            caption: photoCaption(p)
          });
        });
        /* 사진이 있으면 눌러서 크게 볼 수 있으니 <a> 입니다. */
        tag = "a";
        attr = ' href="#" data-i="' + start + '"';
        face = '<span class="bento__ph">' +
               '<img src="' + esc(pics[0].src) + '" alt="' + esc(pics[0].title) + '" loading="lazy">' +
               '<span class="bento__ov"></span>' +
               /* 여러 장이면 장수를 적습니다 — 눌러서 넘길 수 있다는 표시입니다. */
               (pics.length > 1 ? '<span class="bento__n">' + pics.length + '장</span>' : "") +
               "</span>";
      } else {
        /* 사진이 아직 없으면 로고 마크를 얹은 버건디 판으로 둡니다.
           빈 회색 상자를 두면 "빠진 칸"으로 보이고, 칸을 아예 빼면
           연혁에 구멍이 납니다. 누를 것이 없으니 <div> 입니다. */
        tag = "div";
        attr = "";
        face = '<span class="bento__ph bento__ph--empty" aria-hidden="true"></span>';
      }

      return "<" + tag + ' class="bento__c' + (s.wide ? " bento__c--w" : "") + '"' + attr + ">" +
        face +
        '<span class="bento__d">' + esc(s.date) + "</span>" +
        '<span class="bento__t">' + esc(s.title) +
          (s.note ? ' <em>' + esc(s.note) + "</em>" : "") + "</span>" +
        (s.venue ? '<span class="bento__v">' + esc(s.venue) + "</span>" : "") +
        "</" + tag + ">";
    }).join("");
  }

  /* ── 포스터 ───────────────────────────────────────────────────────────
     Concert 페이지의 [지난 공연 포스터]. data/content.js 의 POSTERS 를 씁니다.
     포스터는 자르지 않습니다 — 날짜·장소가 가장자리에 있는 경우가 많습니다.
     그래서 높이를 고정하지 않고 이미지 원래 비율로 둡니다.                */
  var pos = document.querySelector("[data-posters]");
  var posters = [];

  if (pos && window.POSTERS) {
    posters = window.POSTERS;

    pos.innerHTML = posters.map(function (p, i) {
      var face = p.src
        ? '<span class="poster__ph">' +
            '<img src="' + p.src + '" alt="' + esc(p.title) + ' 포스터" loading="lazy">' +
            '<span class="poster__ov"><span>크게 보기</span></span></span>'
        /* 파일이 아직 없을 때. 어디에 무엇을 넣어야 하는지 화면에 적어둡니다. */
        /* 비율은 CSS 가 3/4 로 고정합니다. 여기서 따로 주지 않습니다 —
           주면 사진이 없는 칸만 높이가 달라집니다. */
        : '<span class="poster__ph poster__ph--empty">' +
            /* 안내는 span 하나로 감쌉니다 — grid 안에서 b 가 따로 칸을 차지합니다 */
            '<span class="poster__hint"><span>포스터 이미지를 넣어주세요<br>' +
            '<b>assets/img/poster/</b> 에 파일을 두고<br>' +
            '<b>data/content.js</b> 의 POSTERS 에 경로를 적습니다</span></span></span>';
      return (
        '<a class="poster" href="#" data-i="' + i + '">' + face +
        '<span class="poster__t">' + esc(p.title) + "</span>" +
        '<span class="poster__m">' + esc(p.caption) + "</span></a>"
      );
    }).join("");
  }

  /* ── 라이트박스 ───────────────────────────────────────────────────────
     활동 사진과 포스터가 같은 창을 함께 씁니다. 아래 bindLb 로 묶음을
     등록하면 그 묶음 안에서만 좌우로 넘어갑니다 — 사진을 보다가 포스터로
     넘어가지 않습니다.                                                   */
  var lb = document.querySelector(".lb");
  var lbBody = lb && lb.querySelector("[data-lb-body]");
  var lbCap = lb && lb.querySelector("[data-lb-cap]");
  var lbList = [], lbCur = 0, lbBack = null, lbCapOn = true;

  function lbDraw(i) {
    lbCur = (i + lbList.length) % lbList.length;
    var g = lbList[lbCur];
    if (g.src) {
      lbBody.innerHTML = '<img src="' + g.src + '" alt="' + esc(g.title) + '">';
    } else {
      /* 자리 표시 블록. 세로로 긴 포스터가 화면 밖으로 나가지 않도록
         비율을 지키면서 가로 88vw · 세로 78vh 안에 들어오게 잡습니다. */
      var r = String(g.ratio || "4/3").split("/");
      var f = (parseFloat(r[0]) || 4) / (parseFloat(r[1]) || 3);
      lbBody.innerHTML = '<div class="lb__ph" style="aspect-ratio:' + f +
        ";width:min(88vw,calc(78vh * " + f.toFixed(4) + '))"></div>';
    }
    /* 몇 번째 장인지는 남깁니다 — 제목이 아니라 길 안내입니다. */
    var n = lbList.length > 1 ? (lbCur + 1) + " / " + lbList.length : "";
    lbCap.innerHTML = lbCapOn
      ? "<b>" + esc(g.title) + "</b>" + esc(g.caption) + (n ? " · " + n : "")
      : esc(n);
  }
  function lbOpen(items, i, trigger, showCap) {
    lbList = items;
    lbCapOn = showCap !== false;   /* 활동 사진은 제목·부제목 없이 사진만 봅니다 */
    lbBack = trigger || null;      /* 닫으면 눌렀던 자리로 초점을 되돌립니다 */
    lbDraw(i);
    lb.classList.toggle("is-single", lbList.length < 2);   /* 한 장이면 화살표를 숨깁니다 */
    lb.classList.add("is-open");
    document.body.classList.add("menu-open");
    lb.querySelector(".lb__x").focus();
  }
  function lbClose() {
    lb.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    if (lbBack) lbBack.focus();
    lbBack = null;
  }
  function bindLb(host, sel, items, showCap) {
    if (!lb || !host || !items.length) return;
    host.addEventListener("click", function (e) {
      var a = e.target.closest(sel);
      if (!a) return;
      e.preventDefault();
      lbOpen(items, parseInt(a.dataset.i, 10), a, showCap);
    });
  }

  if (lb) {
    bindLb(mas, ".mas__i", shown, false);      /* 활동 사진 — 제목·부제목 없음 */
    bindLb(pos, ".poster", posters, true);     /* 포스터 — 공연 이름이 필요합니다 */
    /* a.bento__c 로 좁힌 이유 — 사진이 없는 칸은 <div> 라 여기 걸리지 않습니다.
       data-i 가 없는 칸이 걸리면 크게 보기가 빈 화면으로 열립니다. */
    bindLb(hist, "a.bento__c", showPix, true); /* 지난 공연 — 날짜·장소를 함께 */

    lb.addEventListener("click", function (e) {
      if (e.target.closest("[data-lb-prev]")) return lbDraw(lbCur - 1);
      if (e.target.closest("[data-lb-next]")) return lbDraw(lbCur + 1);
      if (e.target.closest(".lb__x") || e.target === lb) lbClose();
    });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") lbClose();
      if (e.key === "ArrowLeft") lbDraw(lbCur - 1);
      if (e.key === "ArrowRight") lbDraw(lbCur + 1);
    });
  }

  /* ── 영상 ─────────────────────────────────────────────────────────────
     세 가지를 받습니다. 누르기 전에는 아무것도 부르지 않습니다.
       id  : 유튜브 영상 id       → iframe
       ig  : 인스타그램 게시물 주소 → blockquote + embed.js
       mp4 : 직접 올린 파일 경로   → <video>

     ★ 인스타그램은 유튜브처럼 iframe 을 바로 걸 수 없습니다.
       instagram.com/…/embed/ 가 X-Frame-Options: DENY 를 보내서
       브라우저가 프레임을 거부합니다. 인스타그램이 공식으로 열어 둔 길은
       blockquote + embed.js 하나뿐이라 그 방식을 씁니다.                */
  /* 어느 목록을 그릴지는 data-video-list 로 고릅니다. 적지 않으면 VIDEOS 입니다.
       <div data-videos>                            갤러리 — VIDEOS 전부
       <div data-videos="1">                        VIDEOS 중 맨 앞 한 편
       <div data-videos="1" data-video-list="HOME_VIDEO">   홈의 큰 영상
     홈을 VIDEOS 의 맨 앞에서 떼어 낸 이유 — 홈에 무엇을 걸지는 자주 바뀌는데,
     그때마다 VIDEOS 의 순서를 바꾸면 갤러리의 영상 순서까지 같이 흔들립니다.
     홈에 거는 것은 content.js 의 HOME_VIDEO 한 곳만 보면 됩니다.          */
  document.querySelectorAll("[data-videos]").forEach(function (vids) {
    var pool = window[vids.dataset.videoList || "VIDEOS"];
    if (!pool) return;
    pool = [].concat(pool);            /* 한 편만 적어 둔 경우도 목록으로 다룹니다 */
    if (!pool.length) return;

    var vlimit = parseInt(vids.dataset.videos, 10);
    var list = isNaN(vlimit) ? pool : pool.slice(0, vlimit);

    vids.innerHTML = list.map(function (v) {
      /* 인스타그램은 공개 썸네일 주소를 주지 않습니다. thumb 를 적지 않으면
         버건디 자리 표시 위에 재생 단추만 놓입니다.                      */
      /* 유튜브 썸네일은 maxresdefault(1280×720)를 먼저 부릅니다.
         예전에 쓰던 hqdefault 는 480×360 이라, 홈의 큰 영상 자리(폭이
         1000px 를 넘습니다)에서는 두 배 넘게 늘어나 뭉갭니다. 게다가
         hqdefault 는 4:3 이라 위아래에 검은 띠가 붙어 있습니다.

         maxresdefault 는 HD 로 올린 영상에만 있습니다. 없으면 유튜브가
         404 를 주므로, 그때는 onerror 로 hqdefault 로 내려갑니다.
         onerror 를 먼저 지우는 이유 — 대체 주소마저 실패하면 무한히
         자기를 다시 부릅니다.                                          */
      var yt = 'https://i.ytimg.com/vi/' + esc(v.id || "");
      var thumb = v.thumb
        ? '<img src="' + esc(v.thumb) + '" alt="" loading="lazy">'
        : v.id
          ? '<img src="' + yt + '/maxresdefault.jpg" alt="" loading="lazy" ' +
            'onerror="this.onerror=null;this.src=\'' + yt + '/hqdefault.jpg\'">'
          : "";
      var kind = v.id ? "yt" : v.ig ? "ig" : v.mp4 ? "mp4" : "";
      return (
        "<div>" +
        '<button class="vid__f" data-kind="' + kind + '" ' +
        'data-src="' + esc(v.id || v.ig || v.mp4 || "") + '" ' +
        'aria-label="' + esc(v.title) + ' 재생">' +
        thumb + '<span class="vid__play"></span></button>' +
        '<p class="vid__t">' + esc(v.title) + "</p>" +
        '<p class="vid__m">' + esc(v.meta) + "</p>" +
        "</div>"
      );
    }).join("");

    vids.addEventListener("click", function (e) {
      var b = e.target.closest(".vid__f");
      if (!b || !b.dataset.src) return;
      var src = b.dataset.src;

      if (b.dataset.kind === "yt") {
        b.outerHTML =
          '<div class="vid__f"><iframe src="https://www.youtube.com/embed/' +
          encodeURIComponent(src) +
          '?autoplay=1&rel=0" title="연주 영상" allow="accelerometer; autoplay; ' +
          'encrypted-media; picture-in-picture" allowfullscreen></iframe></div>';

      } else if (b.dataset.kind === "mp4") {
        /* playsinline 이 없으면 아이폰이 영상을 전체 화면으로 빼앗아 갑니다. */
        b.outerHTML =
          '<div class="vid__f"><video src="' + esc(src) +
          '" controls autoplay playsinline preload="metadata"></video></div>';

      } else if (b.dataset.kind === "ig") {
        igEmbed(b, src);
      }
    });
  });

  /* 인스타그램 임베드. 누른 뒤에 스크립트를 딱 한 번만 받아옵니다.
     받는 도중에 다른 영상을 눌러도 괜찮습니다 — process() 는 문서 전체에서
     아직 처리하지 않은 blockquote 를 모두 찾아 바꿉니다.                */
  var igPending = false;
  function igEmbed(btn, url) {
    var box = document.createElement("div");
    box.className = "vid__ig";
    box.innerHTML = '<blockquote class="instagram-media" data-instgrm-version="14" ' +
      'data-instgrm-permalink="' + esc(url) + '"></blockquote>';
    btn.parentNode.replaceChild(box, btn);

    var run = function () { if (window.instgrm) window.instgrm.Embeds.process(); };
    if (window.instgrm) return run();
    if (igPending) return;
    igPending = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.instagram.com/embed.js";
    s.onload = run;
    document.body.appendChild(s);
  }

  /* ── 문의 팝업 ────────────────────────────────────────────────────────
     data-open="mdl-enroll" 을 붙인 버튼을 누르면 그 팝업이 열립니다.
     닫기: X 버튼 · 까만 배경 클릭 · ESC. 닫으면 눌렀던 버튼으로 초점이 돌아갑니다.
     전화번호는 data/content.js 의 CONTACT.tel 한 곳에서 옵니다.              */
  var C = window.CONTACT || {};
  var digits = String(C.tel || "").replace(/[^0-9+]/g, "");

  function telBlock() {
    if (!digits) {
      return '<div class="ct"><p class="ct__note">' +
        '전화번호를 아직 넣지 않았습니다.<br>' +
        'data/content.js 의 <b>CONTACT.tel</b> 에 적어주세요.</p></div>';
    }
    return '<div class="ct"><div class="ct__row">' +
      '<p class="ct__k">전화 · 문자</p>' +
      '<a class="ct__v" href="tel:' + digits + '">' + esc(C.tel) + "</a>" +
      '<span class="ct__b">' +
      '<a class="btn btn--solid" href="tel:' + digits + '">전화하기</a>' +
      '<a class="btn" href="sms:' + digits + '">문자 보내기</a>' +
      "</span></div></div>";
  }

  function telEmailBlock() {
    var mail = C.email || "";
    var out = '<div class="ct">';
    if (digits) {
      out += '<div class="ct__row"><p class="ct__k">전화</p>' +
        '<a class="ct__v" href="tel:' + digits + '">' + esc(C.tel) + "</a></div>";
    } else {
      out += '<p class="ct__note">전화번호를 아직 넣지 않았습니다. ' +
        'data/content.js 의 <b>CONTACT.tel</b> 에 적어주세요.</p>';
    }
    if (mail) {
      out += '<div class="ct__row"><p class="ct__k">이메일</p>' +
        '<a class="ct__v ct__v--sm" href="mailto:' + esc(mail) +
        '?subject=%5B%EC%9E%90%EC%84%A0%20%EA%B3%B5%EC%97%B0%5D%20%EB%AC%B8%EC%9D%98">' +
        esc(mail) + "</a></div>";
    }
    return out + "</div>";
  }

  document.querySelectorAll('[data-contact="tel"]').forEach(function (el) {
    el.innerHTML = telBlock();
  });
  document.querySelectorAll('[data-contact="tel-email"]').forEach(function (el) {
    el.innerHTML = telEmailBlock();
  });

  var openMdl = null, lastFocus = null;

  function showMdl(m, trigger) {
    openMdl = m; lastFocus = trigger || null;
    m.classList.add("is-open");
    document.body.classList.add("menu-open");
    var x = m.querySelector(".mdl__x");
    if (x) x.focus();
  }
  function hideMdl() {
    if (!openMdl) return;
    openMdl.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    if (lastFocus) lastFocus.focus();
    openMdl = null; lastFocus = null;
  }

  document.querySelectorAll("[data-open]").forEach(function (b) {
    b.addEventListener("click", function (e) {
      var m = document.getElementById(b.dataset.open);
      if (!m) return;
      e.preventDefault();
      showMdl(m, b);
    });
  });

  document.querySelectorAll(".mdl").forEach(function (m) {
    m.addEventListener("click", function (e) {
      /* 카드 바깥(까만 영역)이나 X 를 누르면 닫습니다. */
      if (e.target === m || e.target.closest(".mdl__x")) hideMdl();
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && openMdl) hideMdl();
  });

  /* ── 등장 애니메이션 ──────────────────────────────────────────────────
     data-reveal        : 그 요소 하나가 올라옵니다.
     data-reveal-group  : 자식들이 순서대로 올라옵니다. 값은 간격(ms).
                          섹션 안의 "덩어리"(제목 · 목록 · 더보기)용입니다.
     data-reveal-seq    : 자식들이 항목 하나씩 올라옵니다. 값은 간격(ms).
                          곡 한 줄, 사진 한 장처럼 같은 것이 여럿 있는
                          자리에 씁니다. 덩어리보다 조금 덜 움직입니다
                          (11px / 0.58s — style.css 의 [data-reveal="item"]).

     둘은 겹쳐 쓸 수 있습니다. 어떤 덩어리가 스스로 seq 이거나 그 안에
     seq 를 품고 있으면, 그 덩어리는 통째로 뜨지 않습니다 — 대신 시작
     시각만 물려주고 안쪽 항목이 하나씩 뜹니다. 겹쳐 띄우면 바깥이 흐린
     동안 안쪽도 흐려서 두 번 페이드하는 것처럼 보입니다.
     안쪽이 다 나온 뒤에 다음 형제로 넘어갑니다 — 그래서 목록 아래의
     [더보기] 가 마지막 줄보다 먼저 나오는 일이 없습니다.

       <div class="wrap" data-reveal-group="80">     덩어리 단위
         <h2 class="sec__h">…</h2>
         <div class="rep" data-reveal-seq="70">      곡 한 줄씩
           <div class="rep__r">…</div>
         </div>
         <a class="more">…</a>
       </div>

     갤러리·영상을 그린 뒤에 실행되므로 자동으로 생성된 카드도 포함됩니다.  */
  var targets = [];
  /* 지연을 480ms 에서 끊습니다. 항목이 많을 때 뒤쪽이 늦게 나타나면 답답합니다.
     겹쳐 쓴 경우까지 합쳐도 760ms 를 넘기지 않습니다. */
  var CAP = 480, CAP_ALL = 760;

  function reveal(el, at, kind) {
    el.setAttribute("data-reveal", kind || "");
    el.style.setProperty("--d", Math.min(Math.round(at), CAP_ALL) + "ms");
    targets.push(el);
  }
  function seqStep(box) { return parseInt(box.dataset.revealSeq, 10) || 70; }
  /* 이 목록이 처음부터 끝까지 나오는 데 걸리는 시간 */
  function seqSpan(box) {
    var s = seqStep(box);
    return Math.min((box.children.length - 1) * s, CAP) + s;
  }

  document.querySelectorAll("[data-reveal]").forEach(function (el) {
    targets.push(el);
  });

  document.querySelectorAll("[data-reveal-group]").forEach(function (g) {
    var step = parseInt(g.dataset.revealGroup, 10) || 80;
    var t = 0;                       /* 다음 덩어리가 나타날 시각 */

    Array.prototype.forEach.call(g.children, function (child) {
      /* 자신이 seq 이거나(홈의 곡 목록·사진첩), 안에 seq 를 품고 있거나
         (about 의 두 단 곡 목록 — 단마다 하나씩 들어 있습니다) */
      var boxes = child.hasAttribute("data-reveal-seq")
        ? [child]
        : Array.prototype.slice.call(child.querySelectorAll("[data-reveal-seq]"));

      if (boxes.length) {
        var span = 0;
        boxes.forEach(function (box) {
          box.dataset.revealAt = t;        /* 시작 시각을 물려줍니다 */
          span = Math.max(span, seqSpan(box));   /* 두 단은 나란히 흐릅니다 */
        });
        t += span;
        return;                            /* 덩어리 자신은 뜨지 않습니다 */
      }
      reveal(child, t);
      t += step;
    });
  });

  /* 위 반복문이 먼저 돌아야 revealAt(시작 시각)이 채워집니다.
     바깥 그룹이 없는 자리(gallery.html 의 사진첩)에서는 0 부터 시작합니다.

     항목을 하나씩 지켜보지 않고 덩어리 하나만 지켜봅니다(targets 에는
     box 를 넣습니다). 항목마다 따로 지켜보면, 목록이 화면보다 길 때
     뒤쪽 항목이 눈에 들어온 뒤에도 제 지연시간만큼 더 기다렸다 나타나서
     굼떠 보입니다. 덩어리가 보이기 시작한 순간부터 한 줄씩 흐르는 편이
     읽는 순서와도 맞습니다.                                          */
  document.querySelectorAll("[data-reveal-seq]").forEach(function (box) {
    var step = seqStep(box);
    var base = parseInt(box.dataset.revealAt, 10) || 0;
    Array.prototype.forEach.call(box.children, function (item, i) {
      item.setAttribute("data-reveal", "item");
      item.style.setProperty("--d",
        Math.min(base + Math.min(i * step, CAP), CAP_ALL) + "ms");
    });
    if (box.children.length) targets.push(box);
  });

  /* seq 덩어리는 자기가 뜨는 게 아니라 안의 항목을 차례로 띄웁니다. */
  function show(el) {
    if (el.hasAttribute("data-reveal-seq")) {
      Array.prototype.forEach.call(el.children, function (item) {
        item.classList.add("is-in");
      });
    } else {
      el.classList.add("is-in");
    }
  }

  if (targets.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          show(en.target);
          io.unobserve(en.target);          /* 한 번만. 되돌아와도 다시 재생되지 않습니다. */
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      targets.forEach(function (el) { io.observe(el); });
    } else {
      targets.forEach(show);
    }
  }

  /* ── 현재 페이지 표시 ─────────────────────────────────────────────── */
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a, .menu a").forEach(function (a) {
    if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page");
  });

  /* ── 상단 내비: 밑줄이 마우스를 따라갑니다 ────────────────────────────
     현재 페이지 아래 있던 선 하나가 올려놓은 항목으로 미끄러져 가고,
     벗어나면 제자리로 돌아옵니다. 선은 여기서 만들어 붙입니다 —
     6개 파일의 마크업을 건드리지 않으려고 이렇게 했습니다.
     이 블록이 실행되지 않으면 예전처럼 현재 항목에 선이 고정으로 남습니다.
     반드시 위 [현재 페이지 표시] 다음에 있어야 합니다. aria-current 를 읽습니다. */
  var nav = document.querySelector(".nav");
  if (nav && nav.children.length) {
    var ind = document.createElement("span");
    ind.className = "nav__ind";
    nav.appendChild(ind);
    nav.classList.add("is-ind");

    /* 홈에는 자기 자신을 가리키는 항목이 없습니다. 그때는 null 이고,
       올려놓기 전까지 선이 보이지 않습니다. 방침 페이지도 같습니다.

       Contact 는 네모 단추라 밑줄을 긋지 않습니다 — 테두리 안에 선이
       하나 더 들어가면 지저분합니다. 그 페이지(contact.html)에서는
       단추가 채워지는 것으로 [여기 있다]를 알립니다. */
    var cur = nav.querySelector('[aria-current="page"]:not(.nav__cta)');

    /* 움직이는 방식 세 가지.
         "jump" — 전환 없음. 첫 배치, 창 크기 변경, 폰트 교체.
                  안 그러면 페이지가 열릴 때 선이 왼쪽 끝에서 날아옵니다.
         "fade" — 자리는 바로 잡고 밝기만 켬. 숨어 있다 처음 나타날 때
                  (홈·방침처럼 현재 항목이 없는 화면의 첫 hover).
         "glide"— 평소. 지금 자리에서 목적지까지 미끄러집니다.            */
    var slide = function (el, how) {
      if (how === "glide" && ind.style.opacity !== "1") how = "fade";
      ind.style.transition = how === "jump" ? "none"
                           : how === "fade" ? "opacity 180ms ease"
                           : "";
      if (el && el.offsetWidth) {
        ind.style.width = el.offsetWidth + "px";
        ind.style.transform = "translateX(" + el.offsetLeft + "px)";
        ind.style.opacity = "1";
      } else {
        ind.style.opacity = "0";   /* 갈 곳이 없으면 사라집니다 */
      }
      if (how === "jump") {
        void ind.offsetWidth;      /* 위 값을 먼저 반영시킨 뒤 전환을 되돌립니다 */
        ind.style.transition = "";
      }
    };

    slide(cur, "jump");

    var onOver = function (e) {
      var a = e.target.closest("a");
      if (!a) return;              /* 항목 사이 빈틈 — 선은 있던 자리에 둡니다 */
      /* 네모 단추 위에서는 선이 따라오지 않고 제자리로 물러납니다. */
      slide(a.classList.contains("nav__cta") ? cur : a, "glide");
    };
    var onOut = function () { slide(cur, "glide"); };

    nav.addEventListener("mouseover", onOver);
    nav.addEventListener("focusin", onOver);   /* 키보드 탭 이동도 같이 */
    nav.addEventListener("mouseleave", onOut);
    nav.addEventListener("focusout", onOut);

    /* 글자 폭이 바뀌면 자리도 바뀝니다 — 웹폰트가 늦게 오는 경우와
       창 크기를 바꾸는 경우. 모바일에서는 .nav 가 숨겨져 폭이 0이므로
       slide 가 알아서 선을 감춥니다. */
    var replace = function () { slide(cur, "jump"); };
    window.addEventListener("resize", replace);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(replace);
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
})();
