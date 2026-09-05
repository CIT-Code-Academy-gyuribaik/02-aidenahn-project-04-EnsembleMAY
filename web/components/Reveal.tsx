"use client";

/* ==========================================================================
   스크롤 등장 애니메이션

   예전 main.js 가 data-reveal / data-reveal-group / data-reveal-seq 속성을
   훑어서 하던 일을 컴포넌트로 옮겼습니다. 화면에 내는 클래스와 속성은
   그대로라, style.css 의 규칙(1313행 [data-reveal])을 고치지 않았습니다.

     <Reveal>          덩어리 하나가 올라옵니다
     <RevealGroup>     자식들이 순서대로 올라옵니다 (제목 → 목록 → 더보기)
     <RevealSeq>       같은 것이 여럿일 때 한 줄씩 (곡 목록 · 사진첩)

   RevealSeq 가 따로 있는 이유 — 항목을 하나씩 지켜보면, 목록이 화면보다
   길 때 뒤쪽 항목이 눈에 들어온 뒤에도 제 지연시간만큼 더 기다렸다
   나타나서 굼떠 보입니다. 덩어리 하나만 지켜보고, 보이기 시작한 순간부터
   안에서 한 줄씩 흐르는 편이 읽는 순서와 맞습니다.
   ========================================================================== */

import {
  Children,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/* 지연을 480ms 에서 끊습니다. 항목이 많을 때 뒤쪽이 늦게 나타나면
   답답합니다. 겹쳐 쓴 경우까지 합쳐도 760ms 를 넘기지 않습니다. */
const CAP = 480;
const CAP_ALL = 760;

/** 화면에 들어왔는지. 한 번 들어오면 되돌아와도 다시 재생하지 않습니다. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }
    /* ★ threshold(넓이 비율)가 아니라 rootMargin 으로만 시점을 잡습니다.
       ────────────────────────────────────────────────────────────────
       예전에는 threshold 0.12 였습니다 — [이 덩어리의 12% 가 화면에 들어오면]
       이라는 뜻입니다. 덩어리가 화면보다 작을 때는 맞는 말인데, 화면보다
       한참 클 때는 성립하지 않습니다.
         공연 연혁(/concert/past/)의 표가 2674px 입니다. 900px 짜리 화면에
         제목 아래로 첫 줄이 보이는 상태에서도 들어온 넓이는 316px, 비율로
         0.118 이라 0.12 에 닿지 못합니다. 그래서 첫 화면에서는 아무것도
         나타나지 않고, 스크롤을 조금 내려야 그제서야 일곱 줄이 한꺼번에
         올라왔습니다. 긴 목록일수록 더 많이 내려야 합니다.
       threshold 0 은 [한 픽셀이라도 걸치면] 입니다. 여기에 아래쪽 여백을
       -12% 로 두어, 덩어리의 윗변이 화면 바닥에서 화면 높이의 12% 만큼
       올라온 뒤에 켜지게 합니다. 짧은 덩어리에는 예전과 거의 같게 동작하고,
       긴 목록은 윗변이 보이는 순간 바로 켜집니다. */
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, seen };
}

type RevealProps = {
  children: ReactNode;
  /** 시작을 늦출 시간(ms) */
  delay?: number;
  /** 덩어리보다 조금 덜 움직이는 "항목"용 */
  item?: boolean;
  className?: string;
};

export function Reveal({ children, delay = 0, item, className }: RevealProps) {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-reveal={item ? "item" : ""}
      className={(className ?? "") + (seen ? " is-in" : "")}
      style={{ ["--d" as string]: `${Math.min(Math.round(delay), CAP_ALL)}ms` }}
    >
      {children}
    </div>
  );
}

/** 자식들이 step(ms) 간격으로 순서대로 올라옵니다. */
export function RevealGroup({
  children,
  step = 80,
  className,
}: {
  children: ReactNode;
  step?: number;
  className?: string;
}) {
  const items = Children.toArray(children).filter(isValidElement);
  return (
    <div className={className}>
      {items.map((child, i) => (
        <Reveal key={i} delay={Math.min(i * step, CAP)}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}

/**
 * 같은 것이 여럿 있는 자리(곡 한 줄, 사진 한 장).
 * 덩어리 하나만 지켜보고, 보이면 안의 항목이 차례로 나옵니다.
 */
export function RevealSeq({
  children,
  step = 70,
  base = 0,
  className,
  style,
}: {
  children: ReactNode;
  step?: number;
  /** 바깥 그룹에서 물려받은 시작 시각 */
  base?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const { ref, seen } = useInView<HTMLDivElement>();
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <div className={className} ref={ref} style={style}>
      {items.map((child, i) => (
        <div
          key={i}
          data-reveal="item"
          className={seen ? "is-in" : undefined}
          style={{
            ["--d" as string]: `${Math.min(base + Math.min(i * step, CAP), CAP_ALL)}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
