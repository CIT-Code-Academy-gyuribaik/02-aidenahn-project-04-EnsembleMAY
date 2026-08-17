"use client";

/* ==========================================================================
   영상 한 편

   ★ 누르기 전에는 아무것도 부르지 않습니다.
     썸네일 한 장만 놓고, 누른 뒤에야 유튜브 iframe 이나 <video> 를 넣습니다.
     첫 화면에서 유튜브를 미리 불러오면 그것만으로 수백 KB 를 씁니다.

   유튜브 썸네일은 maxresdefault(1280×720)를 먼저 부릅니다.
   hqdefault 는 480×360 이라 홈의 큰 영상 자리(폭 1000px 이상)에서
   두 배 넘게 늘어나 뭉갭니다. 게다가 4:3 이라 위아래에 검은 띠가 있습니다.
   maxresdefault 는 HD 로 올린 영상에만 있어서, 없으면 hqdefault 로 내려갑니다.
   ========================================================================== */

import { useState } from "react";
import type { Video } from "@/lib/content";

function kindOf(v: Video) {
  if (v.id) return "yt" as const;
  if (v.mp4) return "mp4" as const;
  if (v.ig) return "ig" as const;
  return "none" as const;
}

export default function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const kind = kindOf(video);
  const [thumb, setThumb] = useState(
    video.thumb ?? (video.id ? `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg` : "")
  );

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

  return (
    <div>
      {playing && kind === "yt" ? (
        <div className="vid__f">
          <iframe
            src={`https://www.youtube.com/embed/${encodeURIComponent(video.id!)}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : playing && kind === "mp4" ? (
        <div className="vid__f">
          {/* playsInline 이 없으면 아이폰이 영상을 전체 화면으로 빼앗아 갑니다. */}
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
