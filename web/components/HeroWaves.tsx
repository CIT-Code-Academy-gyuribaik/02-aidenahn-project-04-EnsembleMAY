/* ==========================================================================
   히어로에 흐르는 금색 물결선

   시안(ChatGPT Image … 11_03_54.png)에서 선을 픽셀로 추출해 옮긴 것입니다.

   ★ 평행선 다발이 아니라 '리본' 입니다.
     처음에는 같은 곡선을 15px 씩 내려 겹쳐 그렸는데 시안과 결이 달랐습니다.
     시안의 선들은 양 끝에서 부채처럼 벌어지고 가운데로 오면서 한 줄로
     모입니다. 그래서 곡선 하나가 아니라 [위 경계]와 [아래 경계] 두 곡선을
     두고, 그 사이를 고르게 나눠 열여섯 줄을 긋습니다.

     아래는 시안에서 잰 값입니다(원본 1491×1055, 상단 바 90px 을 뺀 좌표).
       위 경계   x=0 에서 178 → x≈450 에서 48(가장 높은 곳)
                → x≈1060 에서 245(가장 낮은 곳) → x≈1440 에서 75
       띠 폭     x=0 에서 158 → x≈240 에서 18(거의 한 줄로 모임)
                → x≈1000 까지 10 안팎 → 오른쪽 끝에서 134 로 다시 벌어짐

   ★ 가운데는 거의 안 보이게 둡니다.
     선의 색을 가로 그라디언트로 줍니다. 제목이 앉는 자리가 한가운데라,
     단색으로 두면 글자 뒤로 선이 지나가 읽는 것을 방해합니다. 시안도
     같은 자리에서 사라집니다 — 흉내가 아니라 같은 이유입니다.

   ★ 가림막(.hero__veil) 위에 얹습니다.
     아래에 두면 가림막이 선까지 같이 눌러서 사진과 함께 묻힙니다.

   비율은 고정하지 않습니다(preserveAspectRatio=none). 시안의 히어로가
   1491×965(1.55:1)이고 우리 화면도 그 언저리라, 늘어나도 모양이 거의
   그대로입니다. 대신 선 굵기는 non-scaling-stroke 로 1px 에 못 박습니다 —
   안 그러면 가로세로 배율이 달라질 때 굵기가 찌그러집니다.
   ========================================================================== */

const VW = 1491;
const VH = 965;

/** 겹쳐 그릴 줄 수 */
const LINES = 16;

/** 위 경계 — [x, y] */
const TOP: [number, number][] = [
  [0, 178], [60, 187], [120, 174], [180, 147], [240, 114], [300, 83],
  [360, 60], [420, 49], [470, 48], [530, 60], [600, 90], [670, 128],
  [760, 168], [860, 200], [960, 226], [1060, 245], [1120, 214],
  [1180, 164], [1260, 113], [1340, 84], [1420, 75], [1491, 80],
];

/** 띠 폭 — [x, 폭] */
const WIDE: [number, number][] = [
  [0, 158], [80, 124], [160, 68], [240, 18], [400, 26], [560, 22],
  [700, 16], [900, 11], [1060, 13], [1150, 26], [1250, 80],
  [1350, 112], [1440, 142], [1491, 158],
];

/** 표에서 x 위치의 값을 뽑습니다 (사이는 직선으로 이음) */
function at(table: [number, number][], x: number) {
  if (x <= table[0][0]) return table[0][1];
  for (let i = 0; i < table.length - 1; i++) {
    const [x0, y0] = table[i];
    const [x1, y1] = table[i + 1];
    if (x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
  }
  return table[table.length - 1][1];
}

/** 점들을 부드러운 곡선으로 (Catmull-Rom → 3차 베지에) */
function smooth(pts: [number, number][]) {
  const f = (n: number) => Math.round(n * 10) / 10;
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    d +=
      `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)},` +
      `${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)},` +
      `${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

/* 한 줄씩 미리 계산해 둡니다 — 화면이 바뀌어도 다시 그릴 일이 없습니다.
   60px 마다 한 점씩 잡고 곡선으로 이으면, 가장 굽은 곳(x≈450)에서도
   눈에 띄는 각이 생기지 않습니다. */
const PATHS = Array.from({ length: LINES }, (_, i) => {
  const t = i / (LINES - 1);
  const pts: [number, number][] = [];
  for (let x = 0; x <= VW; x += 60) {
    pts.push([x, at(TOP, x) + at(WIDE, x) * t]);
  }
  pts.push([VW, at(TOP, VW) + at(WIDE, VW) * t]);
  return smooth(pts);
});

export default function HeroWaves() {
  return (
    <svg
      className="hero__wave"
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* 시안의 밝기 결을 그대로 옮기되 전체적으로 한 단 낮췄습니다.
            시안의 배경은 거의 검은 벽이고 우리 히어로 사진은 밝은 연주홀
            이라, 같은 진하기로 두면 선만 도드라져 보입니다. 양 끝이
            또렷하고 가운데(제목 자리)에서 사라지는 결은 그대로입니다. */}
        <linearGradient id="heroWaveFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#C9A66B" stopOpacity="0.27" />
          <stop offset="0.14" stopColor="#E0C089" stopOpacity="0.4" />
          <stop offset="0.3" stopColor="#C9A66B" stopOpacity="0.22" />
          <stop offset="0.45" stopColor="#C9A66B" stopOpacity="0.06" />
          <stop offset="0.6" stopColor="#C9A66B" stopOpacity="0.04" />
          <stop offset="0.74" stopColor="#C9A66B" stopOpacity="0.1" />
          <stop offset="0.88" stopColor="#E0C089" stopOpacity="0.35" />
          <stop offset="1" stopColor="#C9A66B" stopOpacity="0.32" />
        </linearGradient>
      </defs>

      <g
        fill="none"
        stroke="url(#heroWaveFade)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      >
        {PATHS.map((d, i) => (
          <path key={i} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}
