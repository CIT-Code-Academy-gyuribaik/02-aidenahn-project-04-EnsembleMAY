"use client";

/* ==========================================================================
   문의 단추 + 팝업

   예전에는 단추(data-open="mdl-enroll")와 팝업(<div id="mdl-enroll">)이
   HTML 안에서 멀찍이 떨어져 있었고, main.js 가 id 로 둘을 이어 줬습니다.
   페이지마다 팝업 마크업을 통째로 복사해 둬야 했고, 실제로 index.html 의
   자선 공연 팝업은 여는 단추가 사라진 뒤에도 남아 있었습니다.

   이제 단추 하나만 놓으면 자기 팝업을 자기가 데리고 다닙니다.
   화면에 내는 클래스(.mdl · .mdl__card …)는 예전 그대로입니다.

   두 종류가 있습니다.
     enroll   입단 문의   — 전화·문자
     charity  자선 공연 문의 — 전화·메일
   ========================================================================== */

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CONTACT } from "@/lib/content";

const digits = CONTACT.tel.replace(/[^0-9+]/g, "");

/* 전화·문자 줄. 번호를 아직 안 넣었으면 그 사실을 알려 줍니다 —
   빈칸으로 두면 공개한 뒤에야 알아챕니다. */
function TelBlock() {
  if (!digits) {
    return (
      <div className="ct">
        <p className="ct__note">
          전화번호를 아직 넣지 않았습니다.
          <br />
          web/content/site.json 의 <b>contact.tel</b> 에 적어주세요.
        </p>
      </div>
    );
  }
  return (
    <div className="ct">
      <div className="ct__row">
        <p className="ct__k">전화 · 문자</p>
        <a className="ct__v" href={`tel:${digits}`}>
          {CONTACT.tel}
        </a>
        <span className="ct__b">
          <a className="btn btn--solid" href={`tel:${digits}`}>
            전화하기
          </a>
          <a className="btn" href={`sms:${digits}`}>
            문자 보내기
          </a>
        </span>
      </div>
    </div>
  );
}

function TelEmailBlock() {
  const subject = encodeURIComponent("[자선 공연] 문의");
  return (
    <div className="ct">
      {digits ? (
        <div className="ct__row">
          <p className="ct__k">전화</p>
          <a className="ct__v" href={`tel:${digits}`}>
            {CONTACT.tel}
          </a>
        </div>
      ) : (
        <p className="ct__note">
          전화번호를 아직 넣지 않았습니다. web/content/site.json 의 <b>contact.tel</b> 에
          적어주세요.
        </p>
      )}
      {CONTACT.email && (
        <div className="ct__row">
          <p className="ct__k">이메일</p>
          <a className="ct__v ct__v--sm" href={`mailto:${CONTACT.email}?subject=${subject}`}>
            {CONTACT.email}
          </a>
        </div>
      )}
    </div>
  );
}

const COPY = {
  enroll: {
    kicker: "입단 문의",
    title: (
      <>
        문자나 전화로
        <br />
        상담해 드립니다.
      </>
    ),
    body: (
      <>
        아이 나이와 하고 싶은 악기만 알려주세요.
        <br />
        지금 얼마나 연주하는지는 몰라도 괜찮습니다.
      </>
    ),
    Contact: TelBlock,
  },
  charity: {
    kicker: "자선 공연 문의",
    title: (
      <>
        전화나 메일로
        <br />
        연락 주세요.
      </>
    ),
    body: (
      <>
        희망하시는 날짜와 장소, 예상 관객 규모를 알려주시면
        <br />
        연주 시간과 프로그램을 맞춰 구성합니다.
      </>
    ),
    Contact: TelEmailBlock,
  },
} as const;

export default function InquiryButton({
  kind,
  label,
  className = "btn btn--ghost",
}: {
  kind: keyof typeof COPY;
  label: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const copy = COPY[kind];

  const close = useCallback(() => setOpen(false), []);

  /* 열리면 닫기 단추로 초점을 옮기고, 닫히면 눌렀던 단추로 돌려 줍니다.
     키보드만 쓰는 분이 팝업을 닫은 뒤 화면 맨 위로 튕기지 않게 하는 부분입니다. */
  useEffect(() => {
    if (open) closeRef.current?.focus();
    else openerRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("menu-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        className={className}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        {label}
      </button>

      <div
        className={"mdl" + (open ? " is-open" : "")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-hidden={!open}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="mdl__card">
          <button ref={closeRef} className="mdl__x" aria-label="닫기" onClick={close}>
            &times;
          </button>
          <p className="mdl__k">{copy.kicker}</p>
          <h2 className="mdl__t" id={titleId}>
            {copy.title}
          </h2>
          <p className="mdl__b">{copy.body}</p>
          <copy.Contact />
        </div>
      </div>
    </>
  );
}
