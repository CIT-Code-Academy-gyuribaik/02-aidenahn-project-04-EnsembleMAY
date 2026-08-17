import type { Metadata } from "next";
import { CONTACT } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "개인정보처리방침",
  description:
    "앙상블 메이 홈페이지는 방문자에게서 개인정보를 직접 수집하지 않습니다. " +
    "수집 범위, 외부 서비스로 전달되는 기록, 아동 사진 처리 기준을 안내합니다.",
  path: "/privacy/",
});

/* 전화번호·메일은 web/content/site.json 한 곳에서 옵니다.
   예전에는 이 페이지에도 번호가 직접 박혀 있었습니다. */
const telHref = `tel:${CONTACT.tel.replace(/[^0-9+]/g, "")}`;

export default function PrivacyPage() {
  return (
    <>
      <div className="phead">
        <div className="wrap">
          <p className="eyebrow">Privacy</p>
          <h1>개인정보처리방침</h1>
          <p>
            이 홈페이지는 방문자에게서 개인정보를 직접 수집하지 않습니다. 아래는 그 범위와,
            그럼에도 남는 기록에 대한 설명입니다.
          </p>
        </div>
      </div>

      <section className="sec sec--first">
        <div className="wrap">
          <div className="doc">
            <h2>1. 수집하지 않는 것</h2>
            <p>
              이 사이트에는 가입, 로그인, 문의 양식이 없습니다. 이름·연락처를 입력받는 칸이
              어디에도 없으며, 방문자를 식별하기 위한 쿠키나 분석 도구를 앙상블 메이가 직접
              심어두지 않았습니다.
            </p>

            <h2>2. 문의를 주실 때</h2>
            <p>문의는 전화, 문자, 이메일로만 받습니다. 그때 알려주신 내용은 상담과 답변에만 씁니다.</p>
            <ul>
              <li>입단 상담 — 아이 이름, 나이, 악기, 보호자 연락처</li>
              <li>자선 공연 문의 — 담당자 성명, 소속, 연락처, 희망 일정</li>
            </ul>
            <p>
              상담이 끝나고 더 이상 필요하지 않게 되면 지웁니다. 단원으로 등록된 뒤의 기록은 활동
              기간과 그 뒤 1년까지 보관하고 폐기합니다. 동의 없이 제3자에게 제공하지 않습니다.
            </p>

            <h2>3. 외부 서비스로 전달되는 기록</h2>
            <p>
              화면을 제대로 보여주기 위해 아래 외부 서비스를 불러옵니다. 이 과정에서 방문자의 IP
              주소와 브라우저 정보가 해당 서비스에 전달됩니다. 앙상블 메이는 그 기록을 받아보지
              않습니다.
            </p>
            <ul>
              <li>
                <b>Google Fonts</b> — 글꼴 (fonts.googleapis.com, fonts.gstatic.com)
              </li>
              <li>
                <b>jsDelivr</b> — 글꼴 (cdn.jsdelivr.net)
              </li>
              <li>
                <b>YouTube</b> — 연주 영상. 목록 화면에서 미리보기 이미지를 불러오고, 재생 버튼을
                누르면 YouTube가 자체 쿠키를 설정할 수 있습니다. 재생하지 않으면 영상 자체는
                불러오지 않습니다.
              </li>
            </ul>

            <h2>4. 아동의 사진과 이름</h2>
            <p>
              단원 명단은 홈페이지에 두지 않습니다. 공연 프로그램의 연주자 표기도 이름 없이 편성만
              적습니다.
            </p>
            <p>
              활동 사진은 보호자의 동의를 받은 것만 올립니다. 내리기를 원하시면 아래 연락처로
              알려주세요. 확인 후 바로 삭제합니다.
            </p>

            <h2>5. 문의와 요청</h2>
            <p>열람, 정정, 삭제, 처리 정지 요청은 아래로 연락 주시면 됩니다.</p>
            <ul>
              <li>개인정보 보호책임자 — ○○○</li>
              <li>
                전화 — <a href={telHref}>{CONTACT.tel}</a>
              </li>
              <li>
                이메일 — <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
            </ul>

            <h2>6. 변경</h2>
            <p>내용이 바뀌면 이 페이지에 새 시행일과 함께 올립니다.</p>

            <p className="doc__rev">시행일 2026년 8월 1일</p>
          </div>
        </div>
      </section>
    </>
  );
}
