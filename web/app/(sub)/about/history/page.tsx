import type { Metadata } from "next";
import Timeline from "@/components/Timeline";
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

   생김새는 .facts(질문/답변 표)를 쓰지 않습니다. 그것을 쓰면 Contact 의
   FAQ 와 똑같이 생겨서, 시간이 흐르는 기록으로 읽히지 않습니다.
   세로선과 점으로 그립니다(.tl).
   ========================================================================== */

export default function AboutHistoryPage() {
  return (
    <>
      <h2 className="sr">주요 연혁</h2>
      <p className="abt__lead">
        앙상블 메이가 무대에 선 기록입니다. 정기 연주회와 자선 공연을 함께 적었습니다.
      </p>

      <Timeline />
    </>
  );
}
