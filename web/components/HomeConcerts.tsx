/* ==========================================================================
   홈 — 공연 넉 장

   무대 사진을 지면 가득 깔고 그 위에 카드 넉 장을 세웁니다. 앞의 둘은
   정기 연주회 포스터, 뒤의 둘은 공연 현장 사진입니다.

   ★ 카드는 누르는 것이 아닙니다
     보여 주기만 합니다. 눌러서 크게 보거나 사진첩으로 들어가는 길은
     [공연 더보기] 하나로 모읍니다 — 카드마다 누를 곳이 있으면 어디를
     눌러야 무엇이 나오는지가 애매해집니다.

   ★ 왜 넉 장만 걸까
     스냅 스크롤이라 한 화면에 담겨야 합니다. 전부 늘어놓는 대신 대표
     넉 장만 걸고 나머지는 Concert 로 넘깁니다.

   ★ 날짜·장소는 여기서 짓지 않습니다
     content/shows.json 한 곳에서만 옵니다. 아래 CARDS 에는 "어떤 넷을
     어떤 그림으로 걸지" 만 적습니다 — 공연 정보를 고칠 일이 생기면
     shows.json 을 고치면 되고, 이 파일은 건드리지 않아도 됩니다.
     정기 연주회에 어느 포스터를 걸지도 여기서 정하지 않습니다 —
     lib/content.ts 의 posterOf 가 답합니다. 공연 연혁 표(PastShows)도
     같은 것을 봅니다.

   ★ 사진은 잘라서 새로 굽지 않았습니다
     카드가 3:4 인데 원본은 가로로 깁니다. object-fit:cover 로 덮고
     pos(가로 위치)만 지정합니다. 사진첩(gallery)이 그대로 원본을 쓰고
     있어서, 잘라 낸 파일을 따로 두면 같은 사진이 두 벌이 됩니다.
   ========================================================================== */

import Link from "next/link";
import { Reveal, RevealSeq } from "@/components/Reveal";
import { asset, posterOf, showById } from "@/lib/content";

type Card = {
  /** shows.json 의 id — 날짜·장소·이름이 여기서 옵니다 */
  show: string;
  /** 포스터가 없는 공연에 걸 현장 사진 */
  src?: string;
  /** 3:4 로 덮을 때 원본의 어느 가로 위치를 살릴지 */
  pos?: string;
  /** shows.json 의 이름 대신 쓸 이름 */
  title?: string;
};

const CARDS: readonly Card[] = [
  { show: "concert2" },
  /* shows.json 에는 "제1회 정기연주회" 로 있지만, 포스터와 시안이
     모두 [창단 연주회] 라고 부릅니다 — 부르는 이름을 따릅니다. */
  { show: "concert1", title: "창단 연주회" },
  { show: "library2512", src: "assets/img/gallery/20251213-library-03.webp", pos: "37%" },
  { show: "mekorea", src: "assets/img/gallery/20260525-mekorea-01.webp", pos: "40%" },
];

/** "2026.06.21" → "2026.6.21". 시안이 앞의 0 을 떼고 씁니다. */
const shortDate = (d: string) => d.replace(/\.0/g, ".");

/* ── 칸이 들어오면 위에서 아래로 한 줄기로 흐릅니다 ──────────────────────
   제목 → 부제 → 카드 넉 장 → [공연 더보기].

   예전에는 카드 넉 장에만 등장이 걸려 있었습니다. 나머지 셋은 칸이
   넘어오는 순간 이미 떠 있어서, 눈에는 [제목과 부제는 그냥 있고 카드만
   나중에 놓이는] 것으로 보였습니다. 스냅으로 딱 멈춘 뒤에 드러나는
   자리라 첫 줄부터 차례로 짚어 주는 편이 자연스럽습니다.

   ★ 시각은 전부 여기 모아 둡니다.
     넷이 따로 흩어져 있으면 하나를 늦출 때 나머지와의 사이가 어긋납니다.
     STEP 만 카드 사이 간격이고, 나머지 셋은 그 앞뒤에 붙는 시각입니다.

   ★ 마지막(MORE_AT)이 760ms 를 넘지 않게 잡았습니다.
     components/Reveal.tsx 가 그보다 늦은 지연을 잘라 냅니다 — 넘기면
     [공연 더보기] 만 제자리에 걸려 리듬이 깨집니다.

   ★ 넷이 같은 속도로 움직이도록 style.css 의 [.csec__in [data-reveal]] 이
     이 칸 전체의 전환 시간을 1.05s 로 잡습니다. 사진첩·곡 목록보다
     느린 값입니다 — 한 화면에 일곱 개뿐이라 서두를 이유가 없습니다.  */
const TITLE_AT = 0;
const SUB_AT = 90;
const CARDS_AT = 190;
/** 카드 한 장과 다음 장 사이. 70 에서 150 으로 벌렸습니다 — 넉 장이
    한꺼번에 뜨는 것에 가까웠는데, 한 장씩 놓이는 것이 보이게 했습니다. */
const STEP = 150;
/** 넉 장이 다 놓인 다음. 마지막 카드(190 + 3 × 150 = 640)보다 뒤입니다. */
const MORE_AT = 750;

export default function HomeConcerts() {
  return (
    <>
      <Reveal item delay={TITLE_AT}>
        <h2 className="chd">Concert</h2>
      </Reveal>

      {/* 제목 밑 한 줄. 공연을 왜 여느냐에 대한 답이라 여기가 자리입니다 —
          Contact·자선공연 페이지에도 같은 말이 있지만, 거기까지 들어가는
          사람은 이미 알고 온 사람입니다. */}
      <Reveal item delay={SUB_AT}>
        <p className="csub">
          앙상블 메이는 <span className="csub__k">강남구자원봉사센터의 공식 봉사단체</span>
          입니다.
        </p>
      </Reveal>

      {/* base 는 제목·부제가 지나간 다음부터 세라는 뜻입니다 — 카드가
          제 혼자 0 에서 시작하면 부제와 겹쳐 두 줄기로 갈라집니다. */}
      <RevealSeq className="cgrid" base={CARDS_AT} step={STEP}>
        {CARDS.map((c) => {
          const s = showById(c.show);
          const poster = posterOf(c.show);
          const title = c.title || poster?.title || s?.title || "";

          return (
            <div className="ccd" key={c.show}>
              <span className="ccd__ph">
                <img
                  src={poster?.src || (c.src ? asset(c.src) : "")}
                  alt={poster ? `${title} 포스터` : title}
                  loading="lazy"
                  style={c.pos ? { objectPosition: `${c.pos} center` } : undefined}
                />
              </span>
              <span className="ccd__d">{s ? shortDate(s.date) : ""}</span>
              {/* 장소가 없는 공연도 있습니다. 칸은 남겨 둡니다 —
                  지우면 그 카드만 이름이 한 줄 올라와 넷이 어긋납니다. */}
              <span className="ccd__v">{s?.venue}</span>
              <span className="ccd__t">{title}</span>
            </div>
          );
        })}
      </RevealSeq>

      {/* 넉 장을 다 보고 난 다음에 나옵니다 — 여기가 "더 있나?" 하고
          찾게 되는 자리입니다. 시안에는 제목 옆에 있었습니다.
          등장도 마지막입니다: 넉 장이 다 놓인 뒤에야 눈이 여기로 옵니다. */}
      <Reveal item delay={MORE_AT}>
        <Link className="cmore" href="/concert/">
          공연 더보기
          <span aria-hidden="true">▶</span>
        </Link>
      </Reveal>
    </>
  );
}
