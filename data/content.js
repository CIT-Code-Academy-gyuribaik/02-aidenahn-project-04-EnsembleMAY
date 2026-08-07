/* ==========================================================================
   앙상블 메이 — 콘텐츠 데이터
   --------------------------------------------------------------------------
   사진과 영상을 추가할 때는 이 파일만 고치면 됩니다. HTML은 건드리지 않습니다.

   [사진 추가]
     1. 파일을 assets/img/gallery/ 에 넣습니다. webp 를 권합니다 —
        지금 있는 39장도 png·jpg 원본을 webp 로 바꾼 것이고, 그것만으로
        15.4MB 가 2.6MB 가 됐습니다.
     2. 아래 GALLERY 목록 맨 앞에 한 덩어리를 복사해서 붙이고 값을 고칩니다.
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

     date : show 가 없는 사진의 날짜입니다. "2026.01" 처럼 적습니다.
            갤러리의 [최신순 / 과거순] 정렬에 쓰입니다.
            비워 두면 정렬했을 때 맨 뒤로 갑니다 — 언제 것인지 모르는 사진을
            아무 자리에나 끼워 넣지 않으려고 그렇게 두었습니다.

   ★ 22장은 tag 만 달고 show·date 를 비워 두었습니다. 인스타그램 캡션에
     근거가 있는 17장만 공연에 이었습니다. 나머지는 어느 공연 것인지
     제가 알 수 없어 비워 뒀습니다 — 아시는 대로 채워 주세요.
   ───────────────────────────────────────────────────────────────────────── */
window.GALLERY = [
  { src:"assets/img/gallery/stage-tutti.webp", ratio:"856/569",
    title:"무대 위에서 전체 합주를 하는 단원들",
    tag:"stage", date:"", caption:"정기 연주회" },
  { src:"assets/img/gallery/group-after-concert.webp", ratio:"860/644",
    title:"연주를 마치고 악기를 든 채 모인 단원들",
    tag:"group", date:"", caption:"공연을 마치고" },
  { src:"assets/img/gallery/stage-ensemble.webp", ratio:"1170/780",
    title:"무대에서 함께 연주하는 앙상블",
    show:"regular-1", tag:"stage" },
  { src:"assets/img/gallery/stage-cello-part.webp", ratio:"1170/780",
    title:"무대에 나란히 앉아 연주하는 첼로 파트",
    show:"regular-1", tag:"stage" },
  { src:"assets/img/gallery/library-cello.webp", ratio:"1170/780",
    title:"‘음악이 흐르는 도서관’ 안내판 앞에서 연주하는 첼로 단원들",
    show:"library-12", tag:"outreach" },
  { src:"assets/img/gallery/stage-violin-part.webp", ratio:"1170/780",
    title:"무대에서 활을 맞춰 켜는 바이올린 파트",
    show:"regular-1", tag:"stage" },
  { src:"assets/img/gallery/practice-tutti-piano.webp", ratio:"857/626",
    title:"피아노를 가운데 두고 둘러앉아 합주하는 연습실",
    tag:"practice", date:"", caption:"합주 연습" },
  { src:"assets/img/gallery/practice-cello-hands.webp", ratio:"856/641",
    title:"악보를 보며 첼로 활을 놀리는 손",
    tag:"practice", date:"", caption:"파트 연습" },
  { src:"assets/img/gallery/stage-violin.webp", ratio:"643/856",
    title:"무대에서 바이올린을 켜는 단원",
    tag:"stage", date:"", caption:"정기 연주회" },
  { src:"assets/img/gallery/first-concert-stage.webp", ratio:"1170/780",
    title:"첫 공연 무대에 선 앙상블 전체",
    show:"regular-1", tag:"stage" },
  { src:"assets/img/gallery/stage-cello-wide.webp", ratio:"1170/780",
    title:"넓은 무대에서 연주하는 첼로 단원들",
    show:"regular-1", tag:"stage" },
  { src:"assets/img/gallery/stage-conducted.webp", ratio:"856/650",
    title:"지휘에 맞춰 연주하는 무대 위 앙상블",
    tag:"stage", date:"", caption:"정기 연주회" },
  { src:"assets/img/gallery/stage-quartet.webp", ratio:"857/571",
    title:"그랜드 피아노 곁에서 연주하는 단원들",
    tag:"stage", date:"", caption:"정기 연주회" },
  { src:"assets/img/gallery/outreach-way-to-school.webp", ratio:"856/450",
    title:"‘학교 가는 길’ 화면을 띄운 무대에서 연주하는 단원들",
    tag:"outreach", date:"", caption:"나눔 공연" },
  { src:"assets/img/gallery/school-members.webp", ratio:"1170/721",
    title:"악기를 안고 나란히 선 단원 네 명",
    show:"sfs", tag:"group" },
  { src:"assets/img/gallery/school-outdoor-stage.webp", ratio:"1170/721",
    title:"야외 무대에서 연주하는 단원들",
    show:"sfs", tag:"outreach" },
  { src:"assets/img/gallery/library-audience.webp", ratio:"1170/777",
    title:"가족 관객 앞에서 연주하는 단원들",
    show:"library-12", tag:"outreach" },
  { src:"assets/img/gallery/library-wide.webp", ratio:"1170/776",
    title:"도서관 로비를 가득 채운 관객과 연주",
    show:"library-12", tag:"outreach" },
  { src:"assets/img/gallery/library-lobby.webp", ratio:"859/447",
    title:"도서관 로비에 자리를 잡고 연주하는 단원들",
    tag:"outreach", date:"", caption:"어린이청소년도서관" },
  { src:"assets/img/gallery/outreach-children.webp", ratio:"720/405",
    title:"바로 앞에 앉은 아이들에게 들려주는 연주",
    tag:"outreach", date:"", caption:"나눔 공연" },
  { src:"assets/img/gallery/outreach-hall.webp", ratio:"720/405",
    title:"밝은 로비에서 관객과 마주 보고 연주하는 모습",
    tag:"outreach", date:"", caption:"나눔 공연" },
  { src:"assets/img/gallery/library-stands.webp", ratio:"857/571",
    title:"크리스마스 트리 옆에 줄지어 선 빈 악보대",
    tag:"outreach", date:"", caption:"공연을 준비하며" },
  { src:"assets/img/gallery/yearend-stage.webp", ratio:"1170/782",
    title:"붉은 옷을 맞춰 입고 연주하는 단원들",
    show:"yearend", tag:"stage" },
  { src:"assets/img/gallery/yearend-group.webp", ratio:"1170/782",
    title:"연말 공연을 마치고 다 함께 모인 단원들",
    show:"yearend", tag:"group" },
  { src:"assets/img/gallery/yearend-cello.webp", ratio:"1170/782",
    title:"붉은 조명 아래에서 첼로를 켜는 단원",
    show:"yearend", tag:"stage" },
  { src:"assets/img/gallery/yearend-backstage.webp", ratio:"1170/786",
    title:"무대 옆에서 차례를 기다리는 단원들",
    show:"yearend", tag:"stage" },
  { src:"assets/img/gallery/yearend-violin.webp", ratio:"856/596",
    title:"붉은 옷을 입고 바이올린을 켜는 단원",
    tag:"stage", date:"", caption:"연말 공연" },
  { src:"assets/img/gallery/yearend-practice.webp", ratio:"860/480",
    title:"크리스마스 트리를 곁에 두고 연습하는 단원들",
    tag:"practice", date:"", caption:"12월 연습" },
  { src:"assets/img/gallery/practice-tutti-wide.webp", ratio:"856/642",
    title:"넓은 연습실에 둘러앉아 맞추는 합주",
    tag:"practice", date:"", caption:"합주 연습" },
  { src:"assets/img/gallery/practice-tutti-window.webp", ratio:"858/607",
    title:"창가에 자리를 잡고 연습하는 단원들",
    tag:"practice", date:"", caption:"합주 연습" },
  { src:"assets/img/gallery/practice-tutti-parts.webp", ratio:"858/606",
    title:"파트별로 나눠 앉아 연습하는 모습",
    tag:"practice", date:"", caption:"합주 연습" },
  { src:"assets/img/gallery/practice-with-piano.webp", ratio:"859/587",
    title:"피아노 옆에서 함께 맞추는 연습",
    tag:"practice", date:"", caption:"합주 연습" },
  { src:"assets/img/gallery/practice-hall.webp", ratio:"821/447",
    title:"공연장에서 하는 마지막 리허설",
    tag:"practice", date:"", caption:"리허설" },
  { src:"assets/img/gallery/practice-violin-part.webp", ratio:"1170/612",
    title:"악보를 보며 파트 연습을 하는 바이올린 단원들",
    tag:"practice", date:"2026.01", caption:"2026년 첫 연습" },
  { src:"assets/img/gallery/practice-cello-part.webp", ratio:"1170/618",
    title:"뒤에서 바라본 첼로 파트 연습",
    tag:"practice", date:"2026.01", caption:"2026년 첫 연습" },
  { src:"assets/img/gallery/practice-piano.webp", ratio:"540/285",
    title:"악보를 보며 피아노를 치는 손",
    tag:"practice", date:"2026.01", caption:"2026년 첫 연습" },
  { src:"assets/img/gallery/detail-violin-score.webp", ratio:"859/644",
    title:"악보대 너머로 보이는 바이올린과 활",
    tag:"detail", date:"", caption:"연습실에서" },
  { src:"assets/img/gallery/detail-piano-keys.webp", ratio:"858/642",
    title:"건반 위에 올린 손",
    tag:"detail", date:"", caption:"연습실에서" },
  { src:"assets/img/gallery/group-polaroid.webp", ratio:"637/854",
    title:"폴라로이드처럼 붙여 놓은 단원 단체 사진 넉 장",
    tag:"group", date:"", caption:"함께한 날들" }
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
  { id:"regular-2",  date:"2026.06", title:"제2회 정기연주회", venue:"로데아트센터",
    note:"When Melodies Meet", wide:true },

  { id:"meandkorea", date:"2026.05", title:"미앤코리아 공연", venue:"", note:"" },

  { id:"sfs",        date:"2026.05", title:"SFS 국제학교 공연", venue:"", note:"" },

  { id:"yearend",    date:"2025.12", title:"가족 연말 파티 공연", venue:"",
    note:"단원 가족 초대" },

  { id:"library-12", date:"2025.12", title:"음악이 흐르는 도서관",
    venue:"국립어린이청소년도서관", note:"" },

  { id:"library-09", date:"2025.09", title:"음악이 흐르는 도서관",
    venue:"국립어린이청소년도서관", note:"" },

  { id:"regular-1",  date:"2025.06", title:"제1회 정기연주회", venue:"거암아트홀",
    note:"창단 공연", wide:true }
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
window.VIDEOS = [
  { id:"", title:"2026 정기 연주회", meta:"전곡 · 1부 / 2부", thumb:"" },
  { id:"", title:"자선 공연 실황",   meta:"Libertango",       thumb:"" },
  { id:"", title:"Csárdás",          meta:"Violin 솔로",       thumb:"" },
  { id:"", title:"Sound of Music Medley", meta:"Cello 2중주",  thumb:"" }

  /* 인스타그램 — 주소만 붙여넣으면 됩니다
  ,{ ig:"https://www.instagram.com/reel/XXXXXXXXXXX/",
     thumb:"assets/img/gallery/practice-tutti-piano.webp",
     title:"오늘도 연습", meta:"연습실" }
  */

  /* 직접 올린 영상
  ,{ mp4:"assets/video/encore.mp4",
     thumb:"assets/img/gallery/first-concert-stage.webp",
     title:"앵콜곡", meta:"첫 공연" }
  */
];
