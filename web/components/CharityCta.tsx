"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";

export default function CharityCta({
  anchor = false,
}: {
  anchor?: boolean;
}) {
  const { lang } = useLang();

  return (
    <section className="cta" id={anchor ? "charity" : undefined}>
      <div className="wrap">
        {lang === "kor" ? (
          <>
            <h2>자선 공연 신청 안내</h2>
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
          </>
        ) : (
          <>
            <h2>Charity Concert Inquiry</h2>
            <p>
              If your school, library, welfare center, or organization would like to host a
              charity concert with Ensemble MAY, please feel free to contact us at any time.
              <br />
              We will go anywhere we are needed, bringing warmth through music.
            </p>
            <div className="cta__b">
              <Link className="btn btn--ghost" href="/contact/charity/">
                Contact Us
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
