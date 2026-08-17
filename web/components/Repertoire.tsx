import { Reveal, RevealSeq } from "@/components/Reveal";
import { REPERTOIRE, type Piece } from "@/lib/content";

/* ==========================================================================
   지금까지 연주한 곡

   한 공연의 순서표가 아니라, 아이들이 올린 곡이 쌓인 목록입니다.
   그래서 1부·2부 대신 두 단으로 나눠 놓습니다.

   조판은 공연 프로그램 방식입니다 — 곡 이름 아래 작곡가.
   곡은 web/content/repertoire.json 에 있습니다. 목록 맨 뒤에 더하면
   두 단으로 알아서 다시 나뉩니다.

   ★ 원래 About 에 있던 것을 Concert 로 옮겼습니다. About 이 사람 이야기
     (단원·단장·연혁·스토리)로 정리되면서, 곡은 공연 쪽이 제자리입니다.
     예전 주소(/about/#repertoire)로 들어오던 링크 셋도 여기로 돌렸습니다.
   ========================================================================== */

/* 읽는 순서가 [왼쪽 전부 → 오른쪽 전부] 라 앞쪽 절반이 왼쪽입니다.
   홀수면 왼쪽이 한 곡 더 갖습니다. */
function split(list: Piece[]): [Piece[], Piece[]] {
  const half = Math.ceil(list.length / 2);
  return [list.slice(0, half), list.slice(half)];
}

function Column({ pieces }: { pieces: Piece[] }) {
  return (
    <RevealSeq step={70}>
      {pieces.map((p) => (
        <div className="prog__i" key={p.title + p.composer}>
          <p className="prog__t">
            {p.title}
            {p.sub && <em>{p.sub}</em>}
          </p>
          <p className="prog__c">{p.composer}</p>
          {p.ensemble && <p className="prog__e">{p.ensemble}</p>}
        </div>
      ))}
    </RevealSeq>
  );
}

export default function Repertoire() {
  const [left, right] = split(REPERTOIRE);

  return (
    <section className="sec sec--dark sec--c" id="repertoire">
      <div className="wrap">
        <Reveal>
          <h2 className="sec__h">지금까지 연주한 곡</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="sec__lead">
            정기 연주회와 자선 공연을 거치며 아이들이 연습한 곡을 모았습니다.
          </p>
        </Reveal>

        <div className="orn" aria-hidden="true">
          <span />
        </div>

        {/* 두 단이 각각 seq 입니다. 왼쪽을 다 훑고 오른쪽으로 넘어가면
            오른쪽 첫 곡이 1초 가까이 늦습니다. 나란히 흘려보냅니다. */}
        <div className="prog">
          <Column pieces={left} />
          <Column pieces={right} />
        </div>

        <div className="orn" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
