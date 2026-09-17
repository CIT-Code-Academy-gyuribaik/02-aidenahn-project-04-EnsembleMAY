"use client";

import {
  Children,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

const CAP = 480;
const CAP_ALL = 760;

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

  delay?: number;

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

export function RevealSeq({
  children,
  step = 70,
  base = 0,
  className,
  style,
}: {
  children: ReactNode;
  step?: number;

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
