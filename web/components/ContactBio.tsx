import { Reveal } from "@/components/Reveal";
import { CONTACT } from "@/lib/content";

/* ==========================================================================
   문의 한 갈래 — 사진 한 장 + 안내 한 문단 + 연락처

   Contact 의 두 갈래(입단 문의 · 자선 공연 문의)가 같은 짜임입니다.
   사진과 문안만 다르고 나머지는 글자 하나까지 같았습니다 — 연락처를
   적는 방식(Mobile · Email 두 줄짜리 <dl>)이 특히 그렇습니다.
   한쪽만 고치는 날이 오지 않도록 한 곳에 둡니다.

   ★ 전화·메일은 web/content/site.json 의 contact 에서 옵니다.
     이 컴포넌트도, 부르는 두 페이지도 번호를 적어 두지 않습니다.

   ★ 짜임(사진 1 : 글 1.6)은 style.css 의 [.bio] 입니다 — 원래 원장
     이야기용이던 것을 그대로 가져다 씁니다.
   ========================================================================== */

export default function ContactBio({
  src,
  alt,
  heading,
  children,
}: {
  src: string;
  alt: string;
  heading: string;
  /** 안내 문단. 문장 안에 강조나 줄바꿈이 들어갈 수 있어 통째로 받습니다. */
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="bio">
        <div className="bio__ph">
          <img src={src} width={1920} height={1281} alt={alt} loading="lazy" />
        </div>
        <div className="bio__t">
          <h2 className="sec__h">{heading}</h2>
          <p>{children}</p>
          <dl className="bio__ct">
            <div>
              <dt>Mobile</dt>
              <dd>{CONTACT.tel}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{CONTACT.email}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Reveal>
  );
}
