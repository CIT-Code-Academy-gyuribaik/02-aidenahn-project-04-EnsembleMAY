import type { Metadata } from "next";
import CharityCta from "@/components/CharityCta";
import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "공연 정보",
  description:
    "앙상블 메이는 1년에 한 번 정기 연주회를 열고, 그 사이사이 자선 공연으로 무대에 섭니다. " +
    "지금까지 연주한 곡과 자선 공연 문의를 여기에 모았습니다.",
  path: "/concert/",
});

/* Concert 의 기본 탭. 주소가 /concert/ 자체입니다.
   지난 공연 기록과 포스터는 /concert/past/ 로 나갔습니다 — 이 갈래는
   "무슨 공연을 하는 앙상블인가" 만 답합니다. */
export default function ConcertPage() {
  return (
    <>
      {/* 두 갈래를 나란히 놓습니다. .shows 가 두 단으로 벌리고, 각 단은
          [제목 → 사진 → 설명] 순으로 내려갑니다. 가운데 세로 실선은 .shows 가
          그립니다 — 900px 아래로 내려가면 한 단으로 접히고 가로선으로 바뀝니다.

          sec--first : 위 테두리를 지웁니다. 바로 위 하위 메뉴 띠가 이미
          아래쪽에 헤어라인을 긋고 있어서, 두면 선이 두 겹으로 보입니다. */}
      <section className="sec sec--first">
        <div className="wrap">
          <div className="shows">
            <Reveal>
              <div className="show show--ph">
                <p className="show__h">
                  <span className="show__k">정기 연주회</span>
                  <span className="show__f">연 1회</span>
                </p>
                <div className="show__ph">
                  <img
                    src="/assets/img/concert-regular.webp"
                    width={900}
                    height={600}
                    alt="무대 위에서 지휘자와 함께 합주하는 앙상블 메이 단원들"
                    loading="lazy"
                  />
                </div>
                <div className="show__b">
                  <p>
                    &apos;앙상블 메이&apos;는 강남구 자원봉사센터에 등록된 공식 봉사단체로서, 매년
                    한 번 정기공연을 열어 한 해 동안 쌓아온 노력을 나눔의 무대로 완성하고
                    있습니다. 일 년에 단 한 번뿐인 만큼 더욱 정성을 담아 준비하며, 그 시간이
                    관객들에게 위로와 즐거움을 전하는 의미 있는 순간이 되기를 바라고 있습니다.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="show show--ph">
                <p className="show__h">
                  <span className="show__k">자선 공연</span>
                  <span className="show__f">수시</span>
                </p>
                <div className="show__ph">
                  <img
                    src="/assets/img/concert-charity.webp"
                    width={900}
                    height={600}
                    alt="도서관 로비에서 관객 앞에 서서 연주하는 앙상블 메이 단원들"
                    loading="lazy"
                  />
                </div>
                <div className="show__b">
                  <p>
                    &apos;앙상블 메이&apos;는 학교, 도서관, 복지기관 등 다양한 곳의 요청을 받아
                    자선 공연을 진행하며 도움이 필요한 이웃들에게 따뜻한 마음을 전하고 있습니다.
                    강남구 자원봉사센터의 공식 봉사단체로서, 초청이 있는 곳이라면 어디든 찾아가
                    연주라는 재능을 나눔으로 연결하고자 합니다.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* [지금까지 연주한 곡] 섹션이 여기 있었습니다. 곡 목록은
          web/content/repertoire.json 에 그대로 남아 있으니, 되살리려면
          <Repertoire /> 를 이 자리에 다시 놓으면 됩니다.
          그 자리로 들어오던 링크 둘(Contact 의 [지금까지 연주한 곡],
          Gallery 영상 탭의 [아이들이 연주한 곡 보기])도 함께 정리했습니다. */}

      {/* 홈(푸터 위)과 같은 띠입니다 — 문안과 마크업은
          components/CharityCta.tsx 한 곳에 있습니다. */}
      <CharityCta anchor />
    </>
  );
}
