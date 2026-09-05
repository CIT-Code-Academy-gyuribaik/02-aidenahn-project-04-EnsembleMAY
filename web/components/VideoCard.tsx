"use client";

/* ==========================================================================
   영상 한 편

   ★ 누르기 전에는 아무것도 부르지 않습니다.
     검은 판과 재생 단추만 놓고, 누른 뒤에야 유튜브 iframe 이나 <video> 를
     넣습니다. 첫 화면에서 유튜브를 미리 불러오면 그것만으로 수백 KB 를 씁니다.

   ★ 미리보기 그림(썸네일)을 겁니다 — 유튜브는 자기 썸네일(i.ytimg.com),
     직접 올린 영상은 content/videos.json 의 thumb 을 씁니다.
     한때는 검은 판만 두었습니다(영상마다 밝기·색이 달라 여러 편이 늘어선
     자리가 얼룩덜룩해 보인다는 이유로). 눌러서 보기 전에 어떤 영상인지
     아예 안 보이는 쪽이 더 어색하다는 판단으로 되돌렸습니다 — 재생 단추는
     썸네일 위에 그대로 얹힙니다.

   ★ auto — 화면에 들어오면 알아서 트는 자리
     홈의 둘째 칸처럼 "그 칸 자체가 영상"인 곳에 씁니다. 누르는 수고를
     덜자는 것이지, 아무 데나 붙일 것은 아닙니다.
       · 소리를 끈 채로 시작합니다. 브라우저가 소리 나는 자동 재생을
         막습니다 — 자세한 것은 아래 ytSrc 의 ★ 를 보세요.
       · 칸을 벗어나면 iframe 을 걷어냅니다. 안 보이는 영상이 계속
         받아 오고 그리는 것을 막습니다.
       · 동작 줄이기(prefers-reduced-motion)를 켠 분에게는 자동으로 틀지
         않습니다. 저절로 움직이기 시작하는 것은 부담이 됩니다.
   ========================================================================== */

import { useEffect, useRef, useState } from "react";
import type { Video } from "@/lib/content";

function kindOf(v: Video) {
  if (v.id) return "yt" as const;
  if (v.mp4) return "mp4" as const;
  if (v.ig) return "ig" as const;
  return "none" as const;
}

/** 유튜브 기본 썸네일. 어느 영상이든 있는 크기(480×360)라 깨질 일이 없습니다
    — maxresdefault 는 없는 영상이 있어 대신 씁니다. */
function ytThumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export default function VideoCard({ video, auto = false }: { video: Video; auto?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const kind = kindOf(video);
  const boxRef = useRef<HTMLDivElement>(null);

  /* 저절로 트는 것이 실제로 켜졌는지. auto 를 넘겨받아도 동작 줄이기
     설정이거나 IntersectionObserver 가 없으면 꺼집니다. 그때는 검은 판 +
     재생 단추로 돌아가야 합니다 — 누를 것이 없으면 영영 못 봅니다. 처음 값을 auto 로 두는 이유는 서버가 그린 것과 브라우저가
     처음 그리는 것을 같게 하려는 것입니다. */
  const [autoOn, setAutoOn] = useState(auto);

  /* 화면에 들어왔는지 지켜봅니다. 0.6 은 "칸이 거의 자리를 잡았을 때"
     입니다 — 넘어가는 도중에 잠깐 걸치는 것으로는 시작하지 않습니다. */
  useEffect(() => {
    if (!auto || kind === "ig" || kind === "none") return;
    const el = boxRef.current;
    const ok = !!el && "IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (!ok) {
      setAutoOn(false);
      return;
    }

    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting), {
      threshold: 0.6,
    });
    io.observe(el!);
    return () => io.disconnect();
  }, [auto, kind]);

  /* 인스타그램은 유튜브처럼 iframe 을 바로 걸 수 없습니다
     (X-Frame-Options: DENY). 게시물로 보내는 링크만 남깁니다. */
  if (kind === "ig") {
    return (
      <div>
        <a className="vid__f" href={video.ig} target="_blank" rel="noopener">
          <span className="vid__play" />
        </a>
        <p className="vid__t">{video.title}</p>
        <p className="vid__m">{video.meta}</p>
      </div>
    );
  }

  /* playsinline 이 없으면 아이폰이 영상을 전체 화면으로 빼앗아 갑니다.
     그러면 저절로 시작한 영상이 화면을 통째로 덮습니다.

     ★ 저절로 트는 자리에서는 소리를 끕니다(mute=1).
       한때 소리를 켠 채로 두었는데, 그러자 아예 재생이 시작되지 않았습니다.
       크롬·사파리·파이어폭스가 "소리 나는 자동 재생"을 막기 때문입니다 —
       방문자가 그 페이지에서 무언가를 누른 적이 있어야 허락됩니다. 휠로
       내려오기만 한 첫 방문에는 누른 적이 없으니 막힙니다. 우리 코드가
       아니라 브라우저 규칙이라 우회할 방법이 없습니다.
       소리는 방문자가 플레이어의 스피커를 누르면 켜집니다.
     직접 눌러서 여는 경우(autoOn 이 아닐 때)는 누른 것 자체가 허락이므로
     소리를 켠 채로 시작합니다. */
  const ytSrc =
    `https://www.youtube.com/embed/${encodeURIComponent(video.id ?? "")}` +
    `?autoplay=1&rel=0&playsinline=1${autoOn ? "&mute=1" : ""}`;

  /* 유튜브는 안 적어도 자기 썸네일이 있습니다. 직접 올린 mp4 는
     videos.json 에 thumb 을 적어 둔 경우에만 보입니다. */
  const thumb = video.thumb ?? (kind === "yt" && video.id ? ytThumb(video.id) : undefined);
  /* eslint-disable-next-line @next/next/no-img-element -- 유튜브 도메인
     이미지라 next/image 최적화 대상이 아닙니다. */
  const thumbImg = thumb && <img className="vid__th" src={thumb} alt="" />;

  return (
    <div ref={boxRef}>
      {playing && kind === "yt" ? (
        <div className="vid__f">
          <iframe
            src={ytSrc}
            title={video.title}
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : playing && kind === "mp4" ? (
        <div className="vid__f">
          <video src={video.mp4} controls autoPlay playsInline preload="metadata" />
        </div>
      ) : autoOn ? (
        /* 저절로 틀 자리 — 누를 것이 없으니 단추는 없지만, 트이기 전까지
           잠깐이라도 검게 비어 있지 않도록 썸네일은 그대로 둡니다. */
        <div className="vid__f">{thumbImg}</div>
      ) : (
        <button
          className="vid__f"
          aria-label={`${video.title} 재생`}
          disabled={kind === "none"}
          onClick={() => setPlaying(true)}
        >
          {thumbImg}
          <span className="vid__play" />
        </button>
      )}
      <p className="vid__t">{video.title}</p>
      <p className="vid__m">{video.meta}</p>
    </div>
  );
}
