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

   ★ 사진은 잘라서 새로 굽지 않았습니다
     카드가 3:4 인데 원본은 가로로 깁니다. object-fit:cover 로 덮고
     pos(가로 위치)만 지정합니다. 사진첩(gallery)이 그대로 원본을 쓰고
     있어서, 잘라 낸 파일을 따로 두면 같은 사진이 두 벌이 됩니다.
   ========================================================================== */

import Link from "next/link";
import { RevealSeq } from "@/components/Reveal";
import { POSTERS, asset, showById } from "@/lib/content";

type Card = {
  /** shows.json 의 id — 날짜·장소·이름이 여기서 옵니다 */
  show: string;
  /** 포스터를 거는 카드. posters.json 의 몇 번째인지 */
  poster?: number;
  /** 현장 사진을 거는 카드 */
  src?: string;
  /** 3:4 로 덮을 때 원본의 어느 가로 위치를 살릴지 */
  pos?: string;
  /** shows.json 의 이름 대신 쓸 이름 */
  title?: string;
};

const CARDS: readonly Card[] = [
  { show: "concert2", poster: 0 },
  /* shows.json 에는 "제1회 정기연주회" 로 있지만, 포스터와 시안이
     모두 [창단 연주회] 라고 부릅니다 — 부르는 이름을 따릅니다. */
  { show: "concert1", poster: 1, title: "창단 연주회" },
  { show: "library2512", src: "assets/img/gallery/20251213-library-03.webp", pos: "37%" },
  { show: "mekorea", src: "assets/img/gallery/20260525-mekorea-01.webp", pos: "40%" },
];

/** "2026.06.21" → "2026.6.21". 시안이 앞의 0 을 떼고 씁니다. */
const shortDate = (d: string) => d.replace(/\.0/g, ".");

export default function HomeConcerts() {
  return (
    <>
      <h2 className="chd">Concert</h2>

      <RevealSeq className="cgrid" step={70}>
        {CARDS.map((c) => {
          const s = showById(c.show);
          const poster = c.poster !== undefined ? POSTERS[c.poster] : undefined;
          const title = c.title || poster?.title || s?.title || "";

          return (
            <div className="ccd" key={c.show}>
              <span className="ccd__ph">
                {/* eslint-disable-next-line @next/next/no-img-element */}
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
          찾게 되는 자리입니다. 시안에는 제목 옆에 있었습니다. */}
      <Link className="cmore" href="/concert/">
        공연 더보기
        <span aria-hidden="true">▶</span>
      </Link>
    </>
  );
}
