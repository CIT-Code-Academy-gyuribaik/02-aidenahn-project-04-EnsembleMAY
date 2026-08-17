/* ==========================================================================
   히어로에 흐르는 금색 물결선

   오선지를 한 번 휘어 놓은 모양입니다. 같은 곡선 아홉 줄을 조금씩 아래로
   내려 겹칩니다 — 한 줄만 그으면 장식이지만, 여러 줄을 나란히 두면 악보의
   결로 읽힙니다.

   ★ 가운데는 거의 안 보이게 둡니다.
     선의 색을 단색이 아니라 가로 그라디언트로 줍니다. 양 끝은 또렷하고
     가운데로 갈수록 사라집니다. 제목이 앉는 자리가 한가운데라, 단색으로
     두면 글자 뒤로 선이 지나가 읽는 것을 방해합니다.

   ★ 가림막(.hero__veil) 위에 얹습니다.
     아래에 두면 가림막이 선까지 같이 눌러서 사진과 함께 묻힙니다.
     선은 사진이 아니라 사진 위에 얹는 장식입니다.

   비율은 고정하지 않습니다(preserveAspectRatio=none). 화면이 넓어지면
   물결도 같이 늘어나야 "화면을 가로지르는 한 줄기"로 보입니다 — 비율을
   지키면 좁은 화면에서 물결 한 마디만 크게 잘려 들어옵니다.
   ========================================================================== */

/** 겹쳐 그릴 줄 수와 줄 간격(px, viewBox 기준) */
const LINES = 9;
const GAP = 15;

export default function HeroWaves() {
  return (
    <svg
      className="hero__wave"
      viewBox="0 0 1440 760"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* 가장 진한 곳도 .3 을 넘기지 않습니다. 처음 .55 로 두었더니 양
            끝에 금색 다발이 두 덩어리로 뭉쳐서, 사진 위에 얹은 결이
            아니라 그려 넣은 그림처럼 보였습니다. 옅게 깔고 넓게 퍼뜨리는
            편이 사진에 스며듭니다. */}
        <linearGradient id="heroWaveFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#C9A66B" stopOpacity="0" />
          <stop offset="0.06" stopColor="#D8B87E" stopOpacity="0.3" />
          <stop offset="0.28" stopColor="#C9A66B" stopOpacity="0.12" />
          <stop offset="0.5" stopColor="#C9A66B" stopOpacity="0.05" />
          <stop offset="0.72" stopColor="#C9A66B" stopOpacity="0.12" />
          <stop offset="0.94" stopColor="#D8B87E" stopOpacity="0.3" />
          <stop offset="1" stopColor="#C9A66B" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g fill="none" stroke="url(#heroWaveFade)" strokeWidth="1">
        {Array.from({ length: LINES }, (_, i) => (
          <path
            key={i}
            d="M -60 300 C 320 110, 560 330, 860 292 S 1220 250, 1500 130"
            transform={`translate(0 ${i * GAP})`}
          />
        ))}
      </g>
    </svg>
  );
}
