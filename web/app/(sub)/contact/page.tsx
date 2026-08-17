import type { Metadata } from "next";
import Link from "next/link";
import InquiryButton from "@/components/InquiryButton";
import { CONTACT } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "문의",
  description:
    "앙상블 메이 입단 상담과 자선 공연 요청을 받습니다. " +
    "받는 악기, 나이, 오디션, 회비 등 자주 받는 질문을 정리했습니다.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <div className="phead">
        <div className="wrap">
          <p className="eyebrow">Contact</p>
          <h1>무엇이든 편하게 물어봐 주세요.</h1>
          <p>
            입단 상담은 문자나 전화로, 자선 공연은 전화나 메일로 받습니다. 아래 버튼을 누르면
            연락처가 바로 나옵니다.
          </p>
        </div>
      </div>

      {/* 문의 카드는 이 사이트에서 실제로 눌러야 하는 자리입니다.
          어두운 지면에 올려서 눈이 먼저 가게 했습니다 — 이 페이지는 이 구간을
          빼면 흰색과 옅은 틴트뿐이라 어디를 봐야 할지가 서지 않았습니다. */}
      <section className="sec sec--dark sec--first">
        <div className="wrap">
          <div className="cards">
            <div className="card card--lead" id="enroll">
              <p className="card__k">입단</p>
              <h2>연주를 시작하고 싶다면</h2>
              <p>
                바이올린 · 비올라 · 첼로 단원을 모집하고 있습니다. 문자나 전화로 상담해 드립니다.
                아이 나이와 하고 싶은 악기만 알려주셔도 충분합니다.
              </p>
              <InquiryButton kind="enroll" label="입단 문의하기" className="btn btn--solid" />
            </div>

            <div className="card" id="charity">
              <p className="card__k">자선 공연</p>
              <h2>공연을 요청하고 싶다면</h2>
              <p>
                학교, 복지관, 지역 행사 등 어디든 갑니다. 희망하시는 날짜와 장소, 예상 관객 규모를
                알려주세요. 연주 시간과 프로그램은 그 자리에 맞춰 조정합니다.
              </p>
              <InquiryButton kind="charity" label="자선 공연 문의하기" className="btn" />
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec--tint">
        <div className="wrap">
          <p className="eyebrow">FAQ</p>
          <h2 className="sec__h">자주 받는 질문</h2>

          <div className="facts">
            <div className="facts__r">
              <div className="facts__k">받는 악기</div>
              <div className="facts__v">
                바이올린 · 비올라 · 첼로. 곡에 따라 피아노가 함께합니다.
              </div>
            </div>
            <div className="facts__r">
              <div className="facts__k">공연 일정</div>
              <div className="facts__v">
                정기 공연은 1년에 한 번, 자선 공연은 그 사이사이 수시로 섭니다.{" "}
                <Link href="/concert/">공연 안내</Link>에 자세히 적어두었습니다.
              </div>
            </div>
            <div className="facts__r">
              <div className="facts__k">연습 장소</div>
              <div className="facts__v">
                고정된 장소를 두지 않습니다. 공연 일정에 따라 그때그때 정해 미리 안내드립니다.
              </div>
            </div>
            <div className="facts__r">
              <div className="facts__k">연주 곡</div>
              <div className="facts__v">
                지브리와 영화음악, 대중가요, 탱고, 정통 클래식을 함께 올립니다.{" "}
                <Link href="/concert/#repertoire">지금까지 연주한 곡</Link>을 보시면 분위기를
                짐작하실 수 있습니다.
              </div>
            </div>
            <div className="facts__r">
              <div className="facts__k">문의 방법</div>
              <div className="facts__v">
                <b>입단</b>은 문자나 전화로 받습니다. <b>자선 공연</b>은 전화 또는{" "}
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> 으로 받습니다. 인스타그램{" "}
                <a
                  href="https://www.instagram.com/ensemble_m.a.y/"
                  target="_blank"
                  rel="noopener"
                >
                  @ensemble_m.a.y
                </a>{" "}
                메시지도 확인합니다.
              </div>
            </div>

            {/* DRAFT · 아래 네 항목은 실제 운영 방식 확인 필요 */}
            <div className="facts__r">
              <div className="facts__k">나이 · 실력</div>
              <div className="facts__v">
                초등 3학년부터 중학생까지 함께 연주합니다. 악기를 1년 정도 배운 경험이 있으면 무리
                없이 시작할 수 있습니다. 급수나 콩쿠르 기준은 따지지 않습니다.
              </div>
            </div>
            <div className="facts__r">
              <div className="facts__k">오디션</div>
              <div className="facts__v">
                정식 오디션은 없습니다. 첫 만남에서 편하게 한 곡 들려주시면 어느 파트가 맞을지 함께
                정합니다. 준비한 곡이 없어도 괜찮습니다.
              </div>
            </div>
            <div className="facts__r">
              <div className="facts__k">악기</div>
              <div className="facts__v">
                개인 악기로 참여합니다. 대여가 필요하시면 상담 때 말씀해 주세요. 방법을 함께
                찾아드립니다.
              </div>
            </div>
            <div className="facts__r">
              <div className="facts__k">회비</div>
              <div className="facts__v">
                월 회비가 있습니다. 금액은 상담 때 안내드립니다. 정기 연주회 대관료와 악보 비용은
                그때그때 따로 안내합니다.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
