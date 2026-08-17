import type { Metadata } from "next";
import { Reveal, RevealSeq } from "@/components/Reveal";
import { SHOWS } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "주요 연혁",
  description: "앙상블 메이가 걸어온 길. 창단부터 지금까지의 공연과 활동 기록입니다.",
  path: "/about/history/",
});

/* ==========================================================================
   주요 연혁

   ★ 지금은 공연 기록(web/content/shows.json)에서 자동으로 뽑아 놓았습니다.
     창단·수상·언론 같은 공연 아닌 항목은 아직 없습니다.

     내용을 채우실 때는 두 가지 방법이 있습니다.
       (1) 공연만으로 충분하다  → 지금 그대로 두시면 공연을 추가할 때마다
                                 연혁도 따라 늘어납니다
       (2) 공연 아닌 것도 넣겠다 → web/content/history.json 을 새로 만들고
                                 이 파일이 그것을 읽도록 바꿉니다.
                                 말씀해 주시면 만들어 드리겠습니다
   ========================================================================== */

export default function AboutHistoryPage() {
  /* 최근이 위로 옵니다. 날짜가 "2026.06.21" 꼴이라 글자 그대로 비교해도
     시간 순서가 맞습니다. */
  const rows = [...SHOWS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <h2 className="sec__h">주요 연혁</h2>
      <Reveal>
        <p className="sec__lead">
          앙상블 메이가 무대에 선 기록입니다. 정기 연주회와 자선 공연을 함께 적었습니다.
        </p>
      </Reveal>

      <RevealSeq className="facts" step={60}>
        {rows.map((s) => (
          <div className="facts__r" key={s.id}>
            <div className="facts__k">{s.date}</div>
            <div className="facts__v">
              <b>{s.title}</b>
              {s.venue && <> · {s.venue}</>}
              {s.note && <> — {s.note}</>}
            </div>
          </div>
        ))}
      </RevealSeq>
    </>
  );
}
