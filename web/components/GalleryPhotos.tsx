"use client";

/* ==========================================================================
   갤러리 — 활동 사진

   ★ GalleryBrowser 를 둘로 나눈 절반입니다.
     예전에는 사진과 영상을 한 컴포넌트가 들고 화면 안 탭으로 감췄다
     보였다 했습니다. 두 갈래가 각자 주소를 갖게 되면서(/gallery/ ·
     /gallery/videos/) 감출 일이 없어졌습니다 — 안 보이는 절반을
     함께 들고 다니지도 않습니다.

   정렬 단추를 <select> 로 두지 않은 이유(예전 주석 그대로) —
   펼친 목록은 브라우저·운영체제가 직접 그려서 CSS 가 닿지 않습니다.
   윈도우의 파란 선택 막대가 그것입니다. 그래서 단추 + 목록으로 만듭니다.
   ========================================================================== */

import { useEffect, useMemo, useRef, useState } from "react";
import { Lightbox, useLightbox } from "@/components/Lightbox";
import { RevealSeq } from "@/components/Reveal";
import { GALLERY, photoDate } from "@/lib/content";
import { toLbItems } from "@/lib/photos";

type Sort = "new" | "old";

const SORT_LABEL: Record<Sort, string> = { new: "최신순", old: "과거순" };

/** 한 번에 화면에 붙이는 장수. 4단 기준 6줄입니다. */
const STEP = 24;

export default function GalleryPhotos() {
  const [sort, setSort] = useState<Sort>("new");
  const [selOpen, setSelOpen] = useState(false);
  /** 지금까지 화면에 붙인 장수. 스크롤이 끝에 가까워지면 STEP 만큼 늘립니다. */
  const [shown, setShown] = useState(STEP);
  const lb = useLightbox();
  const selRef = useRef<HTMLDivElement>(null);
  const more = useRef<HTMLDivElement>(null);

  /* 정렬 목록 바깥을 누르면 닫습니다. */
  useEffect(() => {
    if (!selOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!selRef.current?.contains(e.target as Node)) setSelOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [selOpen]);

  /* 날짜는 "2026.01.15" 꼴이라 글자 그대로 비교해도 시간 순서가 맞습니다.
     날짜를 모르는 사진은 최신순이든 과거순이든 맨 뒤에 둡니다 —
     언제 것인지 모르는 사진을 아무 자리에나 끼워 넣지 않습니다.

     ★ 같은 날 사진의 순서를 파일 이름으로 정합니다.
       예전에는 날짜가 같으면 0 을 돌려주고 끝이라, 그 안의 순서는
       gallery.json 에 적힌 차례가 그대로 나왔습니다. 하루에 다섯 장씩
       있는 날(20260621)이 최신순에서도 01 → 05 로 나오고, 파일을 손으로
       옮겨 적으면 순서가 같이 흔들렸습니다.
       이름이 20260621-concert2-03 꼴이라 뒤 번호가 곧 찍은 차례입니다.
       날짜와 같은 방향으로 비교하면 최신순에서는 05 → 01, 과거순에서는
       01 → 05 로 하루 안에서도 방향이 맞습니다. */
  const photos = useMemo(() => {
    const dir = sort === "new" ? -1 : 1;
    return [...GALLERY].sort((x, y) => {
      const dx = photoDate(x);
      const dy = photoDate(y);
      if (!dx || !dy) return dx ? -1 : dy ? 1 : 0;
      if (dx !== dy) return dx < dy ? -dir : dir;
      return x.src < y.src ? -dir : x.src > y.src ? dir : 0;
    });
  }, [sort]);

  const lbItems = useMemo(() => toLbItems(photos), [photos]);

  /* ── 스크롤을 내릴 때 이어서 붙입니다 ────────────────────────────────
     82장을 한 번에 그리지 않습니다. 처음 24장만 붙이고, 목록 끝이 화면에
     가까워지면 24장씩 잇습니다.

     img 의 loading="lazy" 만으로는 절반입니다 — 그것은 "화면 밖 사진은
     늦게 받는다" 일 뿐, 82장의 <a><span><img> 는 처음부터 전부 만들어져
     배치 계산에 들어갑니다. 만들지 않는 편이 확실합니다.

     rootMargin 800px — 바닥에 닿고 나서 부르면 빈 자리를 보게 됩니다.
     두 줄쯤 앞서 부르면 내려가는 동안 이미 자리에 들어와 있습니다. */
  useEffect(() => {
    if (shown >= photos.length) return;
    const el = more.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown((n) => Math.min(n + STEP, photos.length));
        }
      },
      { rootMargin: "800px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown, photos.length]);

  return (
    <>
      {/* 탭이 하위 메뉴 띠로 올라가면서 이 줄에는 정렬 단추만 남았습니다.
          .tabbar 를 그대로 두는 이유는 아래 헤어라인입니다 — 단추가
          사진 더미 위에 그냥 떠 있지 않고 한 줄로 앉습니다. */}
      <div className="tabbar">
        <div className="sortbar">
          <div className="sel" ref={selRef}>
            <button
              className="sel__b"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={selOpen}
              aria-label="사진 정렬"
              onClick={() => setSelOpen((v) => !v)}
            >
              <span>{SORT_LABEL[sort]}</span>
            </button>
            <ul className="sel__list" role="listbox" aria-label="사진 정렬" hidden={!selOpen}>
              {(["new", "old"] as Sort[]).map((s) => (
                <li
                  key={s}
                  className="sel__o"
                  role="option"
                  aria-selected={sort === s}
                  tabIndex={-1}
                  onClick={() => {
                    setSort(s);
                    /* 순서가 통째로 바뀌므로 처음 24장부터 다시 셉니다.
                       useEffect 로 되돌리지 않는 이유 — 효과 안에서 상태를
                       바꾸면 그릴 것을 정한 뒤에 또 그리게 됩니다. 바뀌는
                       계기가 이 클릭 하나뿐이라 여기서 함께 처리합니다. */
                    setShown(STEP);
                    setSelOpen(false);
                  }}
                >
                  {SORT_LABEL[s]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 사진이 한 장씩 40ms 간격으로 올라옵니다.
          key 에 sort 를 섞어 두면 정렬을 바꿀 때 다시 흐릅니다.

          칸 비율은 style.css 가 4/3 으로 고정합니다. 예전에는 사진마다
          제 비율(style={{aspectRatio}})을 걸어서 세로가 들쭉날쭉했습니다. */}
      <RevealSeq className="mas" step={40} key={sort}>
        {photos.slice(0, shown).map((p, i) => (
          <a
            key={p.src}
            className="mas__i"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              /* 라이트박스에는 82장을 그대로 넘깁니다 — 화면에 몇 장을
                 붙였든 크게 볼 때는 전부 넘겨 볼 수 있어야 합니다.
                 앞에서부터 자르므로 i 는 두 목록에서 같은 자리입니다. */
              lb.open(lbItems, i);
            }}
          >
            <span className="mas__ph">
              {/* 첫 두 줄(8장)은 열자마자 보이는 자리라 lazy 를 걸지
                  않습니다 — 화면 안에 있는 사진에 lazy 를 걸면 오히려
                  한 박자 늦게 뜹니다. 나머지는 스크롤을 따라옵니다. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.title}
                loading={i < 8 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={i < 4 ? "high" : "auto"}
              />
            </span>
            <span className="mas__ov" />
          </a>
        ))}
      </RevealSeq>

      {/* 이 자리가 화면에 가까워지면 다음 24장을 붙입니다.
          격자(.mas) 밖에 두어야 합니다 — 안에 두면 빈 칸 하나가 됩니다. */}
      {shown < photos.length && <div ref={more} aria-hidden="true" />}

      <Lightbox {...lb.props} />
    </>
  );
}
