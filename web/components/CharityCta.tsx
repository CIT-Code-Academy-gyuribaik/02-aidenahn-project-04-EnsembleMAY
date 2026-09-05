/* ==========================================================================
   자선 공연 신청 안내 띠

   두 곳이 같은 것을 씁니다.
     · Concert(공연 정보) 맨 아래
     · 홈 — 스냅 칸이 다 끝난 뒤, 푸터 바로 위

   한 곳에서 문안을 고치면 둘 다 따라옵니다. 복사해 두면 한쪽만 고치는
   날이 옵니다 — SubTabs 를 About·Concert 가 나눠 쓰게 고친 것과 같은
   이유입니다.

   ★ 팝업이 아니라 링크입니다.
     예전에는 여기서 팝업(components/InquiryButton.tsx)이 열려 전화·메일을
     보여 줬습니다. 같은 내용을 Contact 의 [자선 공연 문의] 갈래가 이미
     제 주소를 갖고 담고 있어서 그쪽으로 보냅니다 — 링크로 건네줄 수 있고
     뒤로 가기도 동작합니다.

   ★ id 는 Concert 쪽만 답니다.
     한 화면에 같은 id 가 둘이면 안 됩니다. 홈에도 이 띠가 생겼지만
     /concert/#charity 로 들어오는 길은 원래 자리 하나면 충분합니다.
   ========================================================================== */

import Link from "next/link";

export default function CharityCta({
  /** 주소로 바로 짚을 수 있게 #charity 를 답니다. 한 화면에 하나만. */
  anchor = false,
}: {
  anchor?: boolean;
}) {
  return (
    <section className="cta" id={anchor ? "charity" : undefined}>
      <div className="wrap">
        <h2>자선 공연 신청 안내</h2>
        {/* 문장마다 한 줄씩 앉힙니다. 가운데 정렬이라 브라우저가 폭만 보고
            끊으면 두 문장이 한 줄에 섞여 어디가 문장 끝인지 안 보입니다.
            낱말이 갈라지지 않게 하는 것(word-break)은 style.css 의 .cta p 가
            맡습니다. */}
        <p>
          학교, 도서관, 복지기관 등에서 &apos;앙상블 메이&apos;와 함께하는 자선 공연을
          원하신다면 언제든지 문의해 주세요.
          <br />
          도움이 필요한 곳이라면 어디든 찾아가, 음악으로 따뜻한 마음을 전해드리겠습니다.
        </p>
        <div className="cta__b">
          <Link className="btn btn--ghost" href="/contact/charity/">
            자선 공연 문의
          </Link>
        </div>
      </div>
    </section>
  );
}
