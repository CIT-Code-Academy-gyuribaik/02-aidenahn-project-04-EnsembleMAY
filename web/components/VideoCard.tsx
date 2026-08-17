"use client";

/* ==========================================================================
   영상 한 편

   ★ 누르기 전에는 아무것도 부르지 않습니다.
     썸네일 한 장만 놓고, 누른 뒤에야 유튜브 iframe 이나 <video> 를 넣습니다.
     첫 화면에서 유튜브를 미리 불러오면 그것만으로 수백 KB 를 씁니다.

   ★ auto — 화면에 들어오면 알아서 트는 자리
     홈의 둘째 칸처럼 "그 칸 자체가 영상"인 곳에 씁니다. 누르는 수고를
     덜자는 것이지, 아무 데나 붙일 것은 아닙니다.
       · 소리를 켠 채로 시작합니다.
       · 칸을 벗어나면 iframe 을 걷어냅니다. 안 보이는 영상이 계속 소리를
         내고 받아 오는 것을 막습니다.
       · 동작 줄이기(prefers-reduced-motion)를 켠 분에게는 자동으로 틀지
         않습니다. 저절로 움직이기 시작하는 것은 부담이 됩니다.

     ※ 브라우저가 막을 수 있습니다.
       크롬·사파리는 "소리 있는 자동 재생"을 기본으로 막습니다. 그 화면에
       들어오기까지 아무것도 누른 적이 없으면 — 휠로만 내려왔다면 —
       재생이 시작되지 않습니다. 그때는 유튜브 플레이어가 첫 장면과 재생
       단추를 띄운 채로 서 있습니다. 화면이 깨지지는 않지만 저절로 켜지지도
       않습니다. 항상 켜지게 하려면 소리를 끄고 시작하는 수밖에 없습니다
       (아래 mute=1 을 되살리면 됩니다).

   유튜브 썸네일은 maxresdefault(1280×720)를 먼저 부릅니다.
   hqdefault 는 480×360 이라 홈의 큰 영상 자리(폭 1000px 이상)에서
   두 배 넘게 늘어나 뭉갭니다. 게다가 4:3 이라 위아래에 검은 띠가 있습니다.
   maxresdefault 는 HD 로 올린 영상에만 있어서, 없으면 hqdefault 로 내려갑니다.
   ========================================================================== */

import { useEffect, useRef, useState } from "react";
import type { Video } from "@/lib/content";

function kindOf(v: Video) {
  if (v.id) return "yt" as const;
  if (v.mp4) return "mp4" as const;
  if (v.ig) return "ig" as const;
  return "none" as const;
}

export default function VideoCard({ video, auto = false }: { video: Video; auto?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const kind = kindOf(video);
  const [thumb, setThumb] = useState(
    video.thumb ?? (video.id ? `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg` : "")
  );
  const boxRef = useRef<HTMLDivElement>(null);

  /* 화면에 들어왔는지 지켜봅니다. 0.6 은 "칸이 거의 자리를 잡았을 때"
     입니다 — 넘어가는 도중에 잠깐 걸치는 것으로는 시작하지 않습니다. */
  useEffect(() => {
    if (!auto || kind === "ig" || kind === "none") return;
    const el = boxRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;

    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting), {
      threshold: 0.6,
    });
    io.observe(el);
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
     소리는 켠 채로 갑니다 — 항상 켜지게 하려면 여기에 &mute=1 을 붙입니다
     (위 auto 설명의 ※ 참고). */
  const ytSrc =
    `https://www.youtube.com/embed/${encodeURIComponent(video.id ?? "")}` +
    `?autoplay=1&rel=0&playsinline=1`;

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
      ) : (
        <button
          className="vid__f"
          data-kind={kind === "none" ? "" : kind}
          aria-label={`${video.title} 재생`}
          disabled={kind === "none"}
          onClick={() => setPlaying(true)}
        >
          {thumb && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={thumb}
              alt=""
              loading="lazy"
              onError={() => {
                /* maxresdefault 가 없는 영상이면 hqdefault 로 내려갑니다.
                   한 번만 바꿉니다 — 그것마저 실패하면 자리 표시만 남습니다. */
                if (video.id && thumb.includes("maxresdefault")) {
                  setThumb(`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`);
                } else {
                  setThumb("");
                }
              }}
            />
          )}
          <span className="vid__play" />
        </button>
      )}
      <p className="vid__t">{video.title}</p>
      <p className="vid__m">{video.meta}</p>
    </div>
  );
}
