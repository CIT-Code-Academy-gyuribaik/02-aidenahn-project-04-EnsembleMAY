/* ==========================================================================
   앙상블 메이 — 콘텐츠 데이터
   --------------------------------------------------------------------------
   사진과 영상을 추가할 때는 이 파일만 고치면 됩니다. HTML은 건드리지 않습니다.

   [사진 추가]
     1. 파일 이름을 규칙대로 붙여 assets/img/gallery/ 에 넣습니다.
        규칙은 그 폴더의 README.txt 에 있습니다 (YYYYMMDD-행사-번호.webp).
     2. 아래 GALLERY 목록에 한 덩어리를 복사해서 붙이고 값을 고칩니다.
        src 를 비워두면 색 블록이 대신 나옵니다.
        ratio 는 가로/세로입니다. 사진의 실제 픽셀 크기를 그대로 적으면
        (예: "1170/780") 사진이 늦게 떠도 자리가 밀리지 않습니다.
        title 은 화면에 안 보이지만 눈이 불편한 분에게 읽어주는 설명입니다.
        사진에 무엇이 담겼는지 한 줄로 적어 주세요.

   [영상 추가]
     유튜브 · 인스타그램 · 직접 올린 파일 세 가지를 받습니다.
     자세한 설명은 아래 VIDEOS 목록 위에 적어두었습니다.

   목록의 맨 앞이 사이트에서도 맨 앞에 나옵니다. 최신 것을 위에 두세요.
   ========================================================================== */

/* ── 연락처 ────────────────────────────────────────────────────────────────
   ★ 전화번호를 여기 한 곳에만 적으면 사이트 전체 팝업에 반영됩니다.
     tel 을 비워두면 팝업에 "전화번호를 아직 넣지 않았습니다" 라고 나옵니다.
     공개 전에 반드시 채우세요.
   예)  tel: "010-1234-5678"
   ───────────────────────────────────────────────────────────────────────── */
window.CONTACT = {
  tel:   "010-0000-0000",   /* DRAFT · 실제 번호로 바꿔주세요 */
  email: "ensemblemay2025@gmail.com"
};

/* ── 활동 사진 ────────────────────────────────────────────────────────────
   사진마다 "어느 공연에서 찍었는지"와 "무슨 종류인지"를 달아 둡니다.
   이 두 줄이 사이트의 세 가지 동작을 굴립니다.

     show : 아래 SHOWS 의 id 입니다. 이걸 달면 —
              · Concert [지난 공연] 카드의 대표 사진이 자동으로 정해집니다
                (그 공연 사진 중 이 목록에서 맨 앞에 있는 것)
              · 카드를 눌러 크게 보면 그 공연 사진이 차례로 넘어가고,
                다 넘기면 다음 공연 사진으로 이어집니다
              · 정렬할 때 그 공연 날짜를 사진 날짜로 씁니다
            공연장에서 찍은 사진이 아니면 비워 둡니다.

     tag  : 사진 종류. 지금은 분류용으로만 두었습니다(화면에 안 나옵니다).
            나중에 갤러리에 [무대 / 연습 / 나눔] 같은 거르개를 붙일 때 씁니다.
              stage    무대 · 공연
              outreach 나눔 공연 (도서관 · 학교 등)
              practice 연습
              group    단체 사진
              detail   악기 · 손 같은 가까이 찍은 컷

   ★ 날짜는 파일 이름에서 읽습니다. 따로 적지 않습니다.
     이름 규칙이 YYYYMMDD-행사-번호.webp 라서, 앞의 여덟 자리가 곧 날짜입니다.
     날짜를 고치고 싶으면 파일 이름을 고치고 여기 src 한 줄만 맞추면
     정렬이 따라옵니다. 같은 값을 두 군데 적어 두면 한쪽만 고치고 잊습니다.
     (이름에 날짜가 없는 파일은 show 의 날짜를, 그것도 없으면 date 를 봅니다.)

   이 목록의 순서는 날짜 최신순입니다. 같은 날짜 안에서는 번호순입니다.
   순서가 정하는 것 두 가지 —
     · 홈 화면에 나가는 앞 8장
     · 지난 공연 카드의 대표 사진 (그 공연 사진 중 맨 앞의 것)
   갤러리 페이지는 화면에서 다시 정렬하므로 이 순서와 무관합니다.

   ★ 연습 사진 17장에는 줄 끝에 "날짜 추정" 이라고 적어 두었습니다.
     원본 파일명에 날짜가 없어서 실제로 연습한 날 중 하나를 골라 넣은
     값입니다. 정확한 날짜를 아시면 파일 이름을 고치면 됩니다.
   ───────────────────────────────────────────────────────────────────────── */
window.GALLERY = [
  { src:"assets/img/gallery/20260621-concert2-01.webp", ratio:"856/569",
    title:"제2회 정기연주회 무대에 선 앙상블 메이 단원들",
    show:"concert2", tag:"stage" },
  { src:"assets/img/gallery/20260621-concert2-02.webp", ratio:"1170/780",
    title:"제2회 정기연주회 무대에 선 앙상블 메이 단원들",
    show:"concert2", tag:"stage" },
  { src:"assets/img/gallery/20260621-concert2-03.webp", ratio:"643/856",
    title:"제2회 정기연주회 무대에 선 앙상블 메이 단원들",
    show:"concert2", tag:"stage" },
  { src:"assets/img/gallery/20260621-concert2-04.webp", ratio:"860/644",
    title:"제2회 정기연주회 무대에 선 앙상블 메이 단원들",
    show:"concert2", tag:"stage" },
  { src:"assets/img/gallery/20260621-concert2-05.webp", ratio:"1280/960",
    title:"제2회 정기연주회 무대에 선 앙상블 메이 단원들",
    show:"concert2", tag:"stage" },
  { src:"assets/img/gallery/20260620-practice-01.webp", ratio:"856/650",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },
  { src:"assets/img/gallery/20260620-practice-02.webp", ratio:"1280/720",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },   /* 날짜 추정 — 파일 이름을 고치면 순서가 따라옵니다 */
  { src:"assets/img/gallery/20260617-practice-01.webp", ratio:"857/626",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },
  { src:"assets/img/gallery/20260617-practice-02.webp", ratio:"1280/960",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },   /* 날짜 추정 — 파일 이름을 고치면 순서가 따라옵니다 */
  { src:"assets/img/gallery/20260614-practice-01.webp", ratio:"856/642",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },
  { src:"assets/img/gallery/20260614-practice-02.webp", ratio:"1600/1200",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },   /* 날짜 추정 — 파일 이름을 고치면 순서가 따라옵니다 */
  { src:"assets/img/gallery/20260531-practice-01.webp", ratio:"637/854",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },
  { src:"assets/img/gallery/20260531-practice-02.webp", ratio:"1600/1200",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },   /* 날짜 추정 — 파일 이름을 고치면 순서가 따라옵니다 */
  { src:"assets/img/gallery/20260525-mekorea-01.webp", ratio:"856/450",
    title:"미앤코리아 공연에서 연주하는 앙상블 메이 단원들",
    show:"mekorea", tag:"stage" },
  { src:"assets/img/gallery/20260511-practice-01.webp", ratio:"859/587",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },
  { src:"assets/img/gallery/20260511-practice-02.webp", ratio:"1600/1200",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },   /* 날짜 추정 — 파일 이름을 고치면 순서가 따라옵니다 */
  { src:"assets/img/gallery/20260510-sfs-01.webp", ratio:"1170/721",
    title:"SFS 국제학교에서 연주하는 앙상블 메이 단원들",
    show:"sfs", tag:"stage" },
  { src:"assets/img/gallery/20260510-sfs-02.webp", ratio:"1170/721",
    title:"SFS 국제학교에서 연주하는 앙상블 메이 단원들",
    show:"sfs", tag:"stage" },
  { src:"assets/img/gallery/20260426-practice-01.webp", ratio:"858/607",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },
  { src:"assets/img/gallery/20260426-practice-02.webp", ratio:"1600/1200",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },   /* 날짜 추정 — 파일 이름을 고치면 순서가 따라옵니다 */
  { src:"assets/img/gallery/20260322-practice-01.webp", ratio:"858/642",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },
  { src:"assets/img/gallery/20260322-practice-02.webp", ratio:"856/596",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },
  { src:"assets/img/gallery/20260322-practice-03.webp", ratio:"1600/1200",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },   /* 날짜 추정 — 파일 이름을 고치면 순서가 따라옵니다 */
  { src:"assets/img/gallery/20260111-practice-01.webp", ratio:"1170/612",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },
  { src:"assets/img/gallery/20260111-practice-02.webp", ratio:"1170/618",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },
  { src:"assets/img/gallery/20260111-practice-03.webp", ratio:"540/285",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },
  { src:"assets/img/gallery/20260111-practice-04.webp", ratio:"1600/1200",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },   /* 날짜 추정 — 파일 이름을 고치면 순서가 따라옵니다 */
  { src:"assets/img/gallery/20260111-practice-05.webp", ratio:"1278/853",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },   /* 날짜 추정 — 파일 이름을 고치면 순서가 따라옵니다 */
  { src:"assets/img/gallery/20251224-yearend-01.webp", ratio:"1170/786",
    title:"가족 연말 파티 공연에서 연주하는 앙상블 메이 단원들",
    show:"yearend24", tag:"stage" },
  { src:"assets/img/gallery/20251224-yearend-02.webp", ratio:"1170/782",
    title:"가족 연말 파티 공연에서 연주하는 앙상블 메이 단원들",
    show:"yearend24", tag:"stage" },
  { src:"assets/img/gallery/20251224-yearend-03.webp", ratio:"1170/782",
    title:"가족 연말 파티 공연에서 연주하는 앙상블 메이 단원들",
    show:"yearend24", tag:"stage" },
  { src:"assets/img/gallery/20251224-yearend-04.webp", ratio:"1170/782",
    title:"가족 연말 파티 공연에서 연주하는 앙상블 메이 단원들",
    show:"yearend24", tag:"stage" },
  { src:"assets/img/gallery/20251224-yearend-05.webp", ratio:"1600/1200",
    title:"가족 연말 파티 공연에서 연주하는 앙상블 메이 단원들",
    show:"yearend24", tag:"stage" },
  { src:"assets/img/gallery/20251224-yearend-06.webp", ratio:"1600/1200",
    title:"가족 연말 파티 공연에서 연주하는 앙상블 메이 단원들",
    show:"yearend24", tag:"stage" },
  { src:"assets/img/gallery/20251224-yearend-07.webp", ratio:"1600/1200",
    title:"가족 연말 파티 공연에서 연주하는 앙상블 메이 단원들",
    show:"yearend24", tag:"stage" },
  { src:"assets/img/gallery/20251224-yearend-08.webp", ratio:"1600/1200",
    title:"가족 연말 파티 공연에서 연주하는 앙상블 메이 단원들",
    show:"yearend24", tag:"stage" },
  { src:"assets/img/gallery/20251224-yearend-09.webp", ratio:"1600/1200",
    title:"가족 연말 파티 공연에서 연주하는 앙상블 메이 단원들",
    show:"yearend24", tag:"stage" },
  { src:"assets/img/gallery/20251224-yearend-10.webp", ratio:"1600/1200",
    title:"가족 연말 파티 공연에서 연주하는 앙상블 메이 단원들",
    show:"yearend24", tag:"stage" },
  { src:"assets/img/gallery/20251213-library-01.webp", ratio:"1170/777",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2512", tag:"stage" },
  { src:"assets/img/gallery/20251213-library-02.webp", ratio:"1170/776",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2512", tag:"stage" },
  { src:"assets/img/gallery/20251213-library-03.webp", ratio:"1170/780",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2512", tag:"stage" },
  { src:"assets/img/gallery/20251213-library-04.webp", ratio:"1600/1063",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2512", tag:"stage" },
  { src:"assets/img/gallery/20251213-library-05.webp", ratio:"1600/1063",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2512", tag:"stage" },
  { src:"assets/img/gallery/20251213-library-06.webp", ratio:"1600/1063",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2512", tag:"stage" },
  { src:"assets/img/gallery/20251213-library-07.webp", ratio:"1600/1063",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2512", tag:"stage" },
  { src:"assets/img/gallery/20251213-library-08.webp", ratio:"1600/1063",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2512", tag:"stage" },
  { src:"assets/img/gallery/20251213-library-09.webp", ratio:"1600/1063",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2512", tag:"stage" },
  { src:"assets/img/gallery/20251213-library-10.webp", ratio:"1600/1063",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2512", tag:"stage" },
  { src:"assets/img/gallery/20251213-library-11.webp", ratio:"1600/1063",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2512", tag:"stage" },
  { src:"assets/img/gallery/20251213-library-12.webp", ratio:"1600/1063",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2512", tag:"stage" },
  { src:"assets/img/gallery/20251213-library-13.webp", ratio:"1600/1200",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2512", tag:"stage" },
  { src:"assets/img/gallery/20251213-library-14.webp", ratio:"1600/1200",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2512", tag:"stage" },
  { src:"assets/img/gallery/20251213-library-15.webp", ratio:"1600/1200",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2512", tag:"stage" },
  { src:"assets/img/gallery/20251103-practice-01.webp", ratio:"859/644",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },
  { src:"assets/img/gallery/20251103-practice-02.webp", ratio:"1600/1200",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },   /* 날짜 추정 — 파일 이름을 고치면 순서가 따라옵니다 */
  { src:"assets/img/gallery/20251103-practice-03.webp", ratio:"1280/720",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },   /* 날짜 추정 — 파일 이름을 고치면 순서가 따라옵니다 */
  { src:"assets/img/gallery/20251023-practice-01.webp", ratio:"858/606",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },
  { src:"assets/img/gallery/20251023-practice-02.webp", ratio:"1600/1600",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },   /* 날짜 추정 — 파일 이름을 고치면 순서가 따라옵니다 */
  { src:"assets/img/gallery/20251023-practice-03.webp", ratio:"1280/1280",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },   /* 날짜 추정 — 파일 이름을 고치면 순서가 따라옵니다 */
  { src:"assets/img/gallery/20250913-library-01.webp", ratio:"859/447",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2509", tag:"stage" },
  { src:"assets/img/gallery/20250913-library-02.webp", ratio:"720/405",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2509", tag:"stage" },
  { src:"assets/img/gallery/20250913-library-03.webp", ratio:"720/405",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2509", tag:"stage" },
  { src:"assets/img/gallery/20250913-library-04.webp", ratio:"1600/1200",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2509", tag:"stage" },
  { src:"assets/img/gallery/20250913-library-05.webp", ratio:"1600/1200",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2509", tag:"stage" },
  { src:"assets/img/gallery/20250913-library-06.webp", ratio:"1600/1200",
    title:"국립어린이청소년도서관에서 연주하는 앙상블 메이 단원들",
    show:"library2509", tag:"stage" },
  { src:"assets/img/gallery/20250614-concert1-01.webp", ratio:"1170/780",
    title:"제1회 정기연주회 무대에 선 앙상블 메이 단원들",
    show:"concert1", tag:"stage" },
  { src:"assets/img/gallery/20250614-concert1-02.webp", ratio:"1170/780",
    title:"제1회 정기연주회 무대에 선 앙상블 메이 단원들",
    show:"concert1", tag:"stage" },
  { src:"assets/img/gallery/20250614-concert1-03.webp", ratio:"1170/780",
    title:"제1회 정기연주회 무대에 선 앙상블 메이 단원들",
    show:"concert1", tag:"stage" },
  { src:"assets/img/gallery/20250614-concert1-04.webp", ratio:"857/571",
    title:"제1회 정기연주회 무대에 선 앙상블 메이 단원들",
    show:"concert1", tag:"stage" },
  { src:"assets/img/gallery/20250614-concert1-05.webp", ratio:"1170/780",
    title:"제1회 정기연주회 무대에 선 앙상블 메이 단원들",
    show:"concert1", tag:"stage" },
  { src:"assets/img/gallery/20250614-concert1-06.webp", ratio:"1600/1200",
    title:"제1회 정기연주회 무대에 선 앙상블 메이 단원들",
    show:"concert1", tag:"stage" },
  { src:"assets/img/gallery/20250614-concert1-07.webp", ratio:"1400/1050",
    title:"제1회 정기연주회 무대에 선 앙상블 메이 단원들",
    show:"concert1", tag:"stage" },
  { src:"assets/img/gallery/20250614-concert1-08.webp", ratio:"1440/1080",
    title:"제1회 정기연주회 무대에 선 앙상블 메이 단원들",
    show:"concert1", tag:"stage" },
  { src:"assets/img/gallery/20250614-concert1-09.webp", ratio:"1278/853",
    title:"제1회 정기연주회 무대에 선 앙상블 메이 단원들",
    show:"concert1", tag:"stage" },
  { src:"assets/img/gallery/20250614-concert1-10.webp", ratio:"1278/853",
    title:"제1회 정기연주회 무대에 선 앙상블 메이 단원들",
    show:"concert1", tag:"stage" },
  { src:"assets/img/gallery/20250614-concert1-11.webp", ratio:"1278/853",
    title:"제1회 정기연주회 무대에 선 앙상블 메이 단원들",
    show:"concert1", tag:"stage" },
  { src:"assets/img/gallery/20250420-practice-01.webp", ratio:"856/641",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },
  { src:"assets/img/gallery/20250420-practice-02.webp", ratio:"1440/960",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },   /* 날짜 추정 — 파일 이름을 고치면 순서가 따라옵니다 */
  { src:"assets/img/gallery/20250420-practice-03.webp", ratio:"1280/1280",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },   /* 날짜 추정 — 파일 이름을 고치면 순서가 따라옵니다 */
  { src:"assets/img/gallery/20250224-practice-01.webp", ratio:"860/480",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },
  { src:"assets/img/gallery/20250224-practice-02.webp", ratio:"1440/960",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },   /* 날짜 추정 — 파일 이름을 고치면 순서가 따라옵니다 */
  { src:"assets/img/gallery/20250224-practice-03.webp", ratio:"1280/720",
    title:"합주 연습 중인 앙상블 메이 단원들",
    tag:"practice" },   /* 날짜 추정 — 파일 이름을 고치면 순서가 따라옵니다 */
];

/* ── 단원 ─────────────────────────────────────────────────────────────────
   홈 화면 [함께 연주하는 아이들] 에 나옵니다. 4단이라 8명이 두 줄로 떨어집니다.
   인원을 늘리거나 줄이면 줄이 어긋날 수 있으니 4의 배수가 보기 좋습니다.

   src   : 사진. 세로로 긴 사진이 잘 맞습니다(칸 비율이 3:4 입니다).
           비워 두면 버건디 자리 표시가 대신 들어갑니다.
   name  : 이름. 비워 두면 이름 줄이 아예 생기지 않습니다.
   part  : 파트(Violin · Viola · Cello). 비워 두면 그 줄도 생기지 않습니다.

   ★ 사진 8장은 들어가 있습니다. 이름과 파트는 제가 지어낼 수 없어
     비워 두었습니다 — 채우면 사진 아래에 줄이 생깁니다.

   ※ 아이들 얼굴에 이름을 함께 붙이면 누구인지 특정됩니다. 홈페이지는
     검색으로 누구나 닿는 곳이라, 이름은 성만 쓰거나(김○○) 아예 비우고
     파트만 두는 쪽을 권합니다. privacy.html 에 적어 둔 "아동 사진은
     보호자 동의분만" 과 같은 맥락입니다.
   ───────────────────────────────────────────────────────────────────────── */
window.MEMBERS = [
  { src:"assets/img/members/member-01.webp", ratio:"853/1280", name:"", part:"" },
  { src:"assets/img/members/member-02.webp", ratio:"853/1280", name:"", part:"" },
  { src:"assets/img/members/member-03.webp", ratio:"854/1280", name:"", part:"" },
  { src:"assets/img/members/member-04.webp", ratio:"853/1280", name:"", part:"" },
  { src:"assets/img/members/member-05.webp", ratio:"853/1280", name:"", part:"" },
  { src:"assets/img/members/member-06.webp", ratio:"853/1280", name:"", part:"" },
  { src:"assets/img/members/member-07.webp", ratio:"854/1280", name:"", part:"" },
  { src:"assets/img/members/member-08.webp", ratio:"855/1280", name:"", part:"" }
];

/* ── 지난 공연 ────────────────────────────────────────────────────────────
   Concert 페이지의 [지난 공연] 목록입니다.

   date  : 표시되는 그대로 적습니다. "2025.06" 처럼 월까지만 적어도 되고
           날짜를 아는 공연은 "2025.06.14" 로 적어도 됩니다.
   title : 공연 이름
   venue : 장소. 모르거나 없으면 비워 둡니다 — 빈 줄이 생기지 않습니다.
   note  : 부제. 없으면 비워 둡니다.
   id    : 사진과 잇는 이름표입니다. 위 GALLERY 에서 show:"..." 에 이 값을
           적으면 그 사진이 이 공연 것이 됩니다. 영문 소문자로 짧게.
           ★ 사진은 여기에 적지 않습니다. 대표 사진은 그 공연 사진 중
             GALLERY 목록에서 맨 앞에 있는 것이 자동으로 쓰입니다.
             대표 사진을 바꾸려면 GALLERY 에서 그 사진을 위로 옮기세요.
             사진이 하나도 없으면 로고 마크를 얹은 버건디 판이 들어갑니다.
   wide  : true 면 두 칸을 차지합니다. 3단 격자라서 한 줄에 [넓은 것 + 하나]
           또는 [하나 + 하나 + 하나] 가 들어갑니다.
           ★ 지금 7개가 3·3·3 으로 딱 맞습니다 —
               1줄 [제2회 정기연주회 넓게] · 미앤코리아
               2줄 SFS · 연말 파티 · 도서관(12월)
               3줄 도서관(9월) · [제1회 정기연주회 넓게]
             정기연주회 두 번을 큰 칸으로 뒀습니다. 한 해를 대표하는
             무대라 위아래에서 섹션을 받쳐 줍니다.
             공연을 더하거나 빼면 줄 끝이 비는데, wide 를 옮기거나 꺼서
             다시 맞추면 됩니다. 칸 수 합이 3의 배수면 딱 떨어집니다.
             좁은 화면(900px 아래)에서는 wide 가 저절로 풀립니다.

   목록의 맨 앞이 사이트에서도 맨 앞입니다 — 최신 공연을 위에 둡니다.
   ───────────────────────────────────────────────────────────────────────── */
window.SHOWS = [
  { id:"concert2", date:"2026.06.21", title:"제2회 정기연주회", venue:"로데아트센터", note:"When Melodies Meet", wide:true },

  { id:"mekorea", date:"2026.05.25", title:"미앤코리아 공연", venue:"", note:"" },

  { id:"sfs", date:"2026.05.10", title:"SFS 국제학교 공연", venue:"", note:"" },

  { id:"yearend24", date:"2025.12.24", title:"가족 연말 파티 공연", venue:"", note:"단원 가족 초대" },

  { id:"library2512", date:"2025.12.13", title:"음악이 흐르는 도서관", venue:"국립어린이청소년도서관", note:"" },

  { id:"library2509", date:"2025.09.13", title:"음악이 흐르는 도서관", venue:"국립어린이청소년도서관", note:"" },

  { id:"concert1", date:"2025.06.14", title:"제1회 정기연주회", venue:"거암아트홀", note:"창단 공연", wide:true }
];

/* ── 지난 공연 포스터 ──────────────────────────────────────────────────────
   Concert 페이지의 [지난 공연 포스터] 에 나옵니다.

   1. 포스터 이미지를 assets/img/poster/ 에 넣습니다.
   2. 아래 src 에 경로를 적고, title 과 caption 을 실제 값으로 고칩니다.
      src 가 비어 있으면 자리 표시 블록과 안내 문구가 대신 나옵니다.

   ratio 는 src 가 비어 있을 때 자리 표시 블록의 비율입니다.
   사진이 들어가면 잘리지 않고 원래 비율 그대로 나옵니다 — 포스터는
   글자가 잘리면 안 되므로 일부러 자르지 않습니다.
   A4·A3 처럼 긴 포스터는 "5/7", 조금 덜 긴 것은 "3/4" 가 가깝습니다.

   장수는 자유입니다. 덩어리를 지우거나 복사해서 늘리면 됩니다.
   목록의 맨 앞이 사이트에서도 맨 앞입니다 — 최신 공연을 위에 둡니다.

   원본 PNG(합계 1.2MB)는 같은 폴더에 그대로 있습니다. webp 로 바꿔 100KB 가
   됐고, 사이트는 webp 만 씁니다. 원본은 지우셔도 됩니다.
   ───────────────────────────────────────────────────────────────────────── */
window.POSTERS = [
  { src:"assets/img/poster/2026-second-concert.webp", ratio:"3/4",
    title:"제2회 정기연주회", caption:"When Melodies Meet · 2026. 6. 21. 로데아트센터" },

  { src:"assets/img/poster/2025-first-concert.webp",  ratio:"4/5",
    title:"창단 연주회",     caption:"2025. 6. 14. 거암아트홀" }
];

/* ── 연주 영상 ─────────────────────────────────────────────────────────────
   세 가지 방식을 섞어 쓸 수 있습니다. 한 덩어리에 하나만 적으면 됩니다.

     id  : 유튜브        "https://www.youtube.com/watch?v=AbCdEfGh123" → AbCdEfGh123
     ig  : 인스타그램     게시물 주소를 통째로 붙여넣습니다
     mp4 : 직접 올린 파일  assets/img/gallery/ 등에 두고 경로를 적습니다

   thumb : 누르기 전에 보이는 사진. 비워 두면 버건디 자리 표시가 나옵니다.
           유튜브는 비워 두면 유튜브 썸네일을 자동으로 가져옵니다.
           ★ 인스타그램은 공개 썸네일 주소를 주지 않습니다. 갤러리 사진 중
             한 장을 골라 적어 주세요. 안 그러면 표지가 빈 색면입니다.

   ── 인스타그램을 쓸 때 알아 둘 것 ──────────────────────────────────────
     · 게시물이 공개 상태여야 합니다. 비공개 계정이면 아무것도 안 나옵니다.
     · 인스타그램 화면이 그대로 들어옵니다(계정 이름 · 좋아요 · 캡션).
       사이트 카드처럼 깔끔하게 나오지는 않습니다.
     · 누르기 전에는 인스타그램에 아무것도 요청하지 않습니다.
       누른 뒤에 인스타그램 스크립트를 받아옵니다(추적 코드가 함께 옵니다).
     · 게시물을 지우면 사이트에서도 사라집니다.
     ▸ 이 세 가지가 걸리면 mp4 로 직접 올리는 편이 낫습니다. 인스타그램에
       올린 영상은 [게시물 → 오른쪽 위 … → 링크 복사]가 아니라, 올릴 때 쓴
       원본 파일을 그대로 assets 에 두고 mp4 로 걸면 됩니다.
   ───────────────────────────────────────────────────────────────────────── */
/* ── ★ 홈 첫 화면(히어로) 사진 ────────────────────────────────────────────
   홈을 열면 맨 처음 보이는, 화면을 가득 채우는 사진입니다.
   여기에 여러 장을 적으면 한 장씩 부드럽게 넘어갑니다.

   ★ 사진 크기 — 2400 × 1350 (16:9) 을 권합니다. 자세한 이유는
     README 의 [히어로 사진] 항목에 적어 두었습니다. 요약하면:
       · 이 사진은 이제 화면 높이를 전부 씁니다(예전 750px 고정이 아닙니다)
       · 잘리는 것을 감안해 중요한 것(아이들 얼굴)은 가운데에 두세요
         — 넓은 화면에서는 위아래가, 휴대폰에서는 좌우가 잘립니다
       · WebP, 한 장 400KB 아래. 여러 장이면 다 받아야 넘어갑니다

   한 장만 적어도 됩니다(넘기지 않고 그 한 장이 그대로 있습니다).
   아예 비워 두면 예전처럼 assets/img/hero.webp 한 장을 씁니다.

   예)  window.HERO = [
          "assets/img/hero/hero-1.webp",
          "assets/img/hero/hero-2.webp",
          "assets/img/hero/hero-3.webp"
        ];
   ───────────────────────────────────────────────────────────────────────── */
window.HERO = [
  "assets/img/hero/hero-1.webp",   /* 무대 위 합주 — 앙상블 전체가 보입니다 */
  "assets/img/hero/hero-2.webp",   /* 연말 파티 연습 — 웃는 첼로 */
  "assets/img/hero/hero-3.webp",   /* 연습 가까이 — 활과 지판 */
  "assets/img/hero/hero-4.webp"    /* 단체 사진 — 흰 배경 */
  /* 순서를 바꾸고 싶으면 이 줄들의 차례만 바꾸면 됩니다.
     맨 위가 홈을 열었을 때 처음 보이는 사진입니다. */
];

/* 넘어가는 속도. 숫자는 1000 이 1초입니다.
     hold : 한 장에서 다음 장으로 넘어가는 간격
     fade : 다음 장으로 녹아드는 시간
   실제로 사진이 멈춰 있는 시간은 hold - fade 입니다.
   지금 값이면 3초 가만히 있다가 1초에 걸쳐 넘어갑니다.

   hold 를 바꿀 때는 fade 도 같이 봐 주세요. 둘의 차이가 멈춰 있는
   시간인데, 그게 1초 아래로 내려가면 사진이 멎는 순간이 없어서
   계속 흐물거리는 것처럼 보입니다.
     hold 2000 / fade  700  → 1.3초 멈춤 (빠릅니다)
     hold 4000 / fade 1000  → 3초 멈춤   ← 지금
     hold 6000 / fade 1200  → 4.8초 멈춤 (느긋합니다)

   hold 는 fade 보다 반드시 길어야 합니다 — 짧으면 다 나타나기도 전에
   다음 장이 시작해서 사진 두 장이 겹쳐 보입니다.                       */
window.HERO_MS = { hold: 4000, fade: 1000 };

/* ── ★ 홈 두 번째 칸의 큰 영상 ────────────────────────────────────────────
   홈 화면을 내리면 두 번째로 나오는, 화면을 꽉 채우는 영상 한 편입니다.
   아래 VIDEOS(갤러리 목록)와는 따로 놉니다 — 여기를 바꿔도 갤러리의
   영상 순서는 흔들리지 않습니다.

   ★★ 지금은 자리만 잡아 둔 상태입니다. id 가 비어 있어서 버건디 바탕에
       재생 단추만 나오고, 눌러도 아무 일도 일어나지 않습니다.
       유튜브 주소를 받으면 id 에 "영상 id" 만 넣으면 끝입니다.

   유튜브 id 는 주소에서 이 부분입니다 —
       https://youtu.be/dQw4w9WgXcQ              → dQw4w9WgXcQ
       https://www.youtube.com/watch?v=dQw4w9WgXcQ → dQw4w9WgXcQ
   주소 전체가 아니라 id 만 넣어야 합니다.

   예)  window.HOME_VIDEO = {
          id:    "dQw4w9WgXcQ",
          title: "제2회 정기연주회",
          meta:  "2026.06.21 · 로데아트센터"
        };

   썸네일은 적지 않아도 됩니다 — 유튜브가 주는 그림을 자동으로 씁니다.
   유튜브 말고 직접 올린 파일을 걸고 싶으면 id 대신
   mp4:"assets/video/….mp4" 와 thumb:"assets/img/….webp" 를 쓰면 됩니다.
   ───────────────────────────────────────────────────────────────────────── */
window.HOME_VIDEO = {
  id:    "ghWBQgkz_Xo",         /* https://youtu.be/ghWBQgkz_Xo */
  title: "제2회 정기연주회 · 가면무도회 왈츠",
  meta:  "2026.06.21 · 로데아트센터"
};

window.VIDEOS = [
  { mp4:"assets/video/20260621-concert2-01.mp4",
    thumb:"assets/img/gallery/20260621-concert2-01.webp",
    title:"제2회 정기연주회", meta:"2026.06.21 · 로데아트센터" },

  { mp4:"assets/video/20250614-concert1-01.mp4",
    thumb:"assets/img/gallery/20250614-concert1-01.webp",
    title:"제1회 정기연주회", meta:"2025.06.14 · 거암아트홀" },

  { mp4:"assets/video/20250614-concert1-02.mp4",
    thumb:"assets/img/gallery/20250614-concert1-05.webp",
    title:"제1회 정기연주회 · 4중주", meta:"2025.06.14 · 거암아트홀" },

  { mp4:"assets/video/20250921-practice-01.mp4",
    thumb:"assets/img/gallery/20251023-practice-01.webp",
    title:"오늘도 연습", meta:"2025.09.21" },

  { mp4:"assets/video/20250921-practice-02.mp4",
    thumb:"assets/img/gallery/20251023-practice-02.webp",
    title:"세 시간째 연습 중", meta:"연습실" }
];
