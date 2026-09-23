import { ArrowRight } from "lucide-react";
import { SA_INSTALL_PATH, SA_PATH, saRelease } from "@/data/surviveAi";
import { Reveal } from "../Reveal";
import { ApkStamp } from "./SaHero";

/**
 * The last word on both Survive AI pages: download again, the other page,
 * the 112 line, and a signature that leads back to the rest of the notebook.
 */
export const SaCta = ({ onInstallPage = false }: { onInstallPage?: boolean }) => (
  <section>
    <div className="page-x pb-20">
      <Reveal className="border-t-2 border-graphite pt-10">
        <h2 className="headline text-[2.4rem] md:text-[3rem]">
          Set it up <em>before you need it.</em>
        </h2>
        <div className="mt-7 flex flex-wrap items-center gap-6">
          <ApkStamp />
          {onInstallPage ? (
            <a href={SA_PATH} className="btn-pen">
              About Survive AI <ArrowRight size={14} />
            </a>
          ) : (
            <a href={SA_INSTALL_PATH} className="btn-pen">
              Install guide <ArrowRight size={14} />
            </a>
          )}
          <a href={saRelease.repo} target="_blank" rel="noopener noreferrer" className="btn-pen">
            Source on GitHub
          </a>
        </div>
        <p className="mt-8 max-w-2xl text-[16.5px] leading-relaxed text-graphite-dim">
          Survive AI gives general guidance from written guides. It is not a doctor. In a life-threatening emergency,
          call <span className="font-medium text-graphite">112</span>.
        </p>
        <p className="hand mt-6 -rotate-1 text-[23px]">
          made by{" "}
          <a href="/" className="text-redpen underline decoration-2 underline-offset-4 hover:text-graphite">
            Samarth Saraswat
          </a>
          . questions?{" "}
          <a href="/#ticket" className="text-redpen underline decoration-2 underline-offset-4 hover:text-graphite">
            raise a ticket
          </a>
          .
        </p>
      </Reveal>
    </div>
  </section>
);
