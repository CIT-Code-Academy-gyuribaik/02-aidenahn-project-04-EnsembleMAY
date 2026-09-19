"use client";

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

function ytThumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export default function VideoCard({ video, auto = false }: { video: Video; auto?: boolean }) {
  const { lang } = useLang();

  const title = pickText(lang, video.title, video.titleEn);
  const meta = pickText(lang, video.meta, video.metaEn);
  const [playing, setPlaying] = useState(false);
  const kind = kindOf(video);
  const boxRef = useRef<HTMLDivElement>(null);

  const [autoOn, setAutoOn] = useState(auto);

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
