import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "단장",
  description:
    "앙상블 메이를 만든 이야기. 잘 하는 아이보다 아직 음악인 아이를 지키려고 시작했습니다.",
  path: "/about/director/",
});

export default function AboutDirectorPage() {
  return (
    <>
      <h2 className="sec__h">단장 이야기</h2>
      <div className="bio">
        {/* 사진이 준비되면 이 자리에 <img> 를 넣으면 됩니다 */}
        <div className="bio__ph" />
        {/* DRAFT · 단장님 확인 필요
            성함(○○○)과 "반주를 했다"는 전제는 지난 프로그램의 Piano 표기에서
            추정한 것입니다. 포스터 두 장에는 음악감독이
            Shine Minyoung Kwon 으로 적혀 있습니다. 한글 성함을 확인해 주세요. */}
        <div className="bio__t">
          <p className="bio__n">○○○</p>
          <p className="bio__r">Director · Piano</p>

          <p>
            저는 오래 반주를 했습니다. 무대 옆에서 아이들이 첫 음을 내는 순간을 가장 가까이서 보는
            자리입니다.
          </p>
          <p>
            그 자리에서 자주 본 것은 실력보다 표정이었습니다. 잘 켜는 아이가 즐거워 보이지 않고,
            아직 서툰 아이가 활을 들 때 눈이 반짝이는 일이 많았습니다. 연습이 숙제가 된 아이와,
            아직 음악인 아이의 차이였습니다.
          </p>
          <p>
            앙상블 메이는 그 차이를 지키려고 만들었습니다. 그래서 아이들이 이미 알고 있는 곡으로
            시작합니다. 지브리와 영화음악으로 한 해를 열고, 바흐는 아이들이 먼저 궁금해할 때
            꺼냅니다.
          </p>
          <p>
            혼자 잘하는 것보다 옆 사람 소리를 듣는 것을 먼저 가르칩니다. 현악 앙상블에서는 그게
            실력입니다. 그리고 준비한 것을 필요한 곳에 가져갑니다. 박수를 받으러 가는 게 아니라,
            음악이 누군가에게 가 닿는 것을 아이들이 직접 보게 하려고 갑니다.
          </p>
        </div>
      </div>
    </>
  );
}
