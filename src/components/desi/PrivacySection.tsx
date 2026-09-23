import { privacyPoints, speeds } from "@/data/ddProduct";
import { PageHead } from "../notebook/PageHead";
import { Reveal } from "../Reveal";
import { Highlight } from "../notebook/Highlight";

/**
 * Page four: privacy on the left as a ticked list, speed on the right as a
 * yellow sticky note of three numbers.
 */
export const PrivacySection = () => (
  <section id="privacy">
    <div className="page-x py-20 md:py-28">
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div>
          <PageHead
            page="04"
            name="Privacy · Speed"
            title={
              <>
                Your voice never <em className="text-redpen">leaves your Mac.</em>
              </>
            }
          />
          <Reveal delay={0.1}>
            <ul className="mt-9 space-y-4">
              {privacyPoints.map((point) => (
                <li key={point} className="flex gap-4 text-[19px] leading-snug text-graphite">
                  <span className="mt-0.5 font-hand text-[26px] leading-none text-redpen" aria-hidden="true">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <p className="lede mt-8 max-w-xl">
              The models run <Highlight delay={0.3}>on your Mac itself</Highlight>, so it is fast without being anyone
              else’s computer.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative mx-auto w-full max-w-[400px] rotate-[1.5deg] bg-[#FCE58A] px-7 pb-7 pt-8 shadow-[0_1px_2px_rgba(29,36,48,0.1),0_18px_30px_-18px_rgba(29,36,48,0.5)]">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-2" />
            <p className="label !text-graphite-dim">Measured, not promised</p>
            <dl className="mt-4 divide-y divide-dashed divide-graphite/25">
              {speeds.map((s) => (
                <div key={s.value} className="py-4">
                  <dt className="headline text-[3rem] leading-none">{s.value}</dt>
                  <dd className="mt-1.5 text-[15.5px] leading-snug text-graphite-dim">{s.what}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
