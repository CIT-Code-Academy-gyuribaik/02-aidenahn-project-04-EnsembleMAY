"use client";

/* 영상 한 편
   ★ 누르기 전에는 아무것도 부르지 않습니다. */

import { useEffect, useRef, useState } from "react";
import type { Video } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { T, pickText } from "@/lib/i18n";

function kindOf(v: Video) {
  if (v.id) return "yt" as const;
  if (v.mp4) return "mp4" as const;
  if (v.ig) return "ig" as const;
  return "none" as const;
}

/* 유튜브 기본 썸네일. 어느 영상이든 있는 크기(480×360)라 깨질 일이 없습니다 — maxresdefault 는 없는 영상이 있어 대신 씁니다. */
function ytThumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export default function VideoCard({ video, auto = false }: { video: Video; auto?: boolean }) {
  const { lang } = useLang();
  /* 제목·설명은 content/videos.json 이 titleEn · metaEn 으로 들고 있습니다. */
  const title = pickText(lang, video.title, video.titleEn);
  const meta = pickText(lang, video.meta, video.metaEn);
  const [playing, setPlaying] = useState(false);
  const kind = kindOf(video);
  const boxRef = useRef<HTMLDivElement>(null);

  /* 저절로 트는 것이 실제로 켜졌는지. auto 를 넘겨받아도 동작 줄이기 설정이거나 IntersectionObserver 가 없으면 꺼집니다. 그때는 검은
     판 + 재생 단추로 돌아가야 합니다 — 누를 것이 없으면 영영 못 봅니다. 처음 값을 auto 로 두는 이유는 서버가 그린 것과 브라우저가 처음 그리는
     것을 같게 하려는 것입니다. */
  const [autoOn, setAutoOn] = useState(auto);

  /* 화면에 들어왔는지 지켜봅니다. */
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

  /* 인스타그램은 유튜브처럼 iframe 을 바로 걸 수 없습니다 (X-Frame-Options: DENY). */
  if (kind === "ig") {
    return (
      <div>
        <a className="vid__f" href={video.ig} target="_blank" rel="noopener">
          <span className="vid__play" />
        </a>
        <p className="vid__t">{title}</p>
        <p className="vid__m">{meta}</p>
      </div>
    );
  }

  /* playsinline 이 없으면 아이폰이 영상을 전체 화면으로 빼앗아 갑니다.
     ★ 저절로 트는 자리에서는 소리를 끕니다(mute=1). */
  const ytSrc =
    `https://www.youtube.com/embed/${encodeURIComponent(video.id ?? "")}` +
    `?autoplay=1&rel=0&playsinline=1${autoOn ? "&mute=1" : ""}`;

  /* 유튜브는 안 적어도 자기 썸네일이 있습니다. */
  const thumb = video.thumb ?? (kind === "yt" && video.id ? ytThumb(video.id) : undefined);
  /* eslint-disable-next-line @next/next/no-img-element -- 유튜브 도메인 이미지라 next/image 최적화 대상이
     아닙니다. */
  const thumbImg = thumb && <img className="vid__th" src={thumb} alt="" />;

  return (
    <div ref={boxRef}>
      {playing && kind === "yt" ? (
        <div className="vid__f">
          <iframe
            src={ytSrc}
            title={title}
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : playing && kind === "mp4" ? (
        <div className="vid__f">
          <video src={video.mp4} controls autoPlay playsInline preload="metadata" />
        </div>
      ) : autoOn ? (
        /* 저절로 틀 자리 — 누를 것이 없으니 단추는 없지만, 트이기 전까지 잠깐이라도 검게 비어 있지 않도록 썸네일은 그대로 둡니다. */
        <div className="vid__f">{thumbImg}</div>
      ) : (
        <button
          className="vid__f"
          aria-label={`${title} — ${T.gallery.play[lang]}`}
          disabled={kind === "none"}
          onClick={() => setPlaying(true)}
        >
          {thumbImg}
          <span className="vid__play" />
        </button>
      )}
      <p className="vid__t">{title}</p>
      <p className="vid__m">{meta}</p>
    </div>
  );
}
