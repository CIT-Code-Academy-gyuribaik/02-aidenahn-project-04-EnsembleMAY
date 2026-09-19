import SnapScroll from "@/components/SnapScroll";
import HeroSlideshow from "@/components/HeroSlideshow";
import HeroWordmark from "@/components/HeroWordmark";
import HomeBanners from "@/components/HomeBanners";
import HomeConcerts from "@/components/HomeConcerts";
import CharityCta from "@/components/CharityCta";
import VideoCard from "@/components/VideoCard";
import { Reveal } from "@/components/Reveal";
import { asset, HOME_VIDEO } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <SnapScroll>

        <section className="hero">
          <HeroSlideshow />
          <div className="hero__veil" />
          <div className="hero__body">

            <h1 className="hero__lines hero__lines--wm">
              <span className="sr">Ensemble M.A.Y.</span>
              <HeroWordmark />
            </h1>

            <div className="hero__orn" aria-hidden="true">
              <span />
            </div>

            <p className="hero__en">
              <span>A string ensemble created by children who love music</span>
              <span>We practice sharing and service through music</span>
            </p>
          </div>
        </section>

        <section className="sec sec--first sec--dark">
          <div className="wrap">
            <Reveal>
              <div className="feat">
                <div className="vids vids--one feat__v">

                  <VideoCard video={HOME_VIDEO} auto />
                </div>
                <div className="feat__t">

                  <h2 className="sec__h sr">음악을 사랑하는 아이들이 만들어 가는 현악 앙상블</h2>

                  <div className="pair">
                    <p className="pair__ko">
                      &apos;앙상블 메이&apos;는 단원들이 각자의 꿈을 음악 안에서 발견하고 키워갈 수
                      있도록 응원합니다. 무대 위의 작은 경험들이 모여 스스로에 대한 확신과 미래를
                      향한 용기로 이어지기를 바라며, 오늘도 한 걸음씩 나아가고 있습니다.
                    </p>
                    <p className="pair__en">
                      Ensemble M.A.Y. encourages each member to discover and nurture their own
                      dreams through music. We hope that these small experiences on stage will
                      grow into confidence in themselves and courage for the future, and so we
                      take one step forward, every day.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="csec">
          <div className="csec__bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("assets/img/gallery/20250614-concert1-09.webp")} alt="" />
          </div>
          <div className="csec__in">
            <HomeConcerts />
          </div>
        </section>

        <section className="sec sec--dark sec--banner">
          <div className="wrap">
            <HomeBanners />
          </div>
        </section>
      </SnapScroll>

      <CharityCta />
    </>
  );
}
