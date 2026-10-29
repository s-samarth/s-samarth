import { PageHead } from "../notebook/PageHead";
import { Reveal } from "../Reveal";

/**
 * Page two: the launch film, taped in like a print. Frontend note: the video
 * is a plain <video> with `preload="none"` and a poster, so the page stays
 * light until someone presses play; `playsInline` stops iPhones going full
 * screen on their own.
 */
export const VideoSection = () => (
  <section id="watch">
    <div className="page-x py-20 md:py-28">
      <PageHead
        page="02"
        name="Watch · 75 seconds"
        title={
          <>
            The whole idea, <em className="text-redpen">in 75 seconds.</em>
          </>
        }
        lede="Most dictation apps guess, and you find out after you hit send. This one checks with you, only when it’s unsure. Sound on: it’s cut to the beat."
      />
      <Reveal className="mt-12">
        <figure className="print mx-auto max-w-5xl">
          <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-2" />
          <video
            className="block aspect-video w-full bg-graphite"
            controls
            preload="none"
            playsInline
            poster="/desi-dictation/launch-poster.jpg"
          >
            <source src="/desi-dictation/launch.mp4" type="video/mp4" />
            Your browser can’t play this video.{" "}
            <a href="/desi-dictation/launch.mp4">Download it instead.</a>
          </video>
          <figcaption className="label mt-2.5 px-1 !text-[10px]">
            fig. 2 · The launch film. App screens are real; the dictation scenes are redrawn, in the maker’s own voice.
          </figcaption>
        </figure>
      </Reveal>
    </div>
  </section>
);
