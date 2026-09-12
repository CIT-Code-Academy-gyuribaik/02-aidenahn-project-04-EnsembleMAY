"use client";

/* 글자 한 조각만 언어를 따라가게 하는 부품
   ★ 왜 필요한가 — 페이지를 통째로 클라이언트로 만들지 않기 위해서입니다. 서브페이지는 저마다 export const metadata 를 내보냅니다.
     그런데 Next 는 "use client" 를 붙인 파일에서 metadata 를 내보내지 못하게 막습니다. 그렇다고 metadata 를 포기하면
     검색·공유 카드가 통째로 사라집니다. 그래서 페이지는 서버에 그대로 두고, 언어를 타는 [글자]만 이 부품으로 감쌉니다. <h2
     className="sr"> 같은 껍데기는 서버가 그리고, 그 안의 낱말만 브라우저에서 갈아 끼웁니다.
   ★ 감싸는 태그를 만들지 않습니다(<>{…}</>). 태그를 하나 끼워 넣으면 부모의 CSS 선택자(.bio__t > p 같은 것)가 한 칸 어긋납니다.
     글자만 내놓으면 쓰는 자리의 마크업이 그대로입니다. ── 쓰는 법 ── <h2 className="sr"><Say
     t={T.about.membersHeading} /></h2> <p><Say t={T.contact.enrollBody} /></p> */

import { useLang } from "@/lib/lang";
import type { Text } from "@/lib/i18n";

export default function Say({ t }: { t: Text }) {
  const { lang } = useLang();
  return <>{t[lang]}</>;
}
