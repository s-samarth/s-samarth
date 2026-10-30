import { ArrowRight } from "lucide-react";
import { GET_ANCHOR, INSTALL_PATH, PRODUCT_PATH, release } from "@/data/desiDictation";
import { Reveal } from "../Reveal";
import { DownloadStamp } from "./DdHero";
import { RepoLove } from "./RepoLove";

/**
 * The last word on both Desi Dictation pages: download again, the other
 * page, a nudge to star the repo, and a signature that leads back to the
 * rest of the notebook.
 */
export const DdCta = ({ onInstallPage = false }: { onInstallPage?: boolean }) => (
  <section>
    <div className="page-x pb-20">
      <Reveal className="border-t-2 border-graphite pt-10">
        <h2 className="headline text-[2.4rem] md:text-[3rem]">
          Ready? <em>Kal meeting hai.</em>
        </h2>
        <div className="mt-7 flex flex-wrap items-center gap-6">
          <DownloadStamp />
          {onInstallPage ? (
            <a href={PRODUCT_PATH} className="btn-pen">
              About Desi Dictation <ArrowRight size={14} />
            </a>
          ) : (
            <a href={INSTALL_PATH} className="btn-pen">
              Install guide <ArrowRight size={14} />
            </a>
          )}
          <a href={release.notes} target="_blank" rel="noopener noreferrer" className="btn-pen">
            All releases
          </a>
        </div>
        <p className="mt-5 max-w-xl text-[16.5px] leading-snug text-graphite-dim">
          Easiest is the{" "}
          <a href={GET_ANCHOR} className="link-ink">
            one-line Terminal install
          </a>
          : no Apple warning. Taking the DMG? The same spot has the one command that clears it.
        </p>
        <RepoLove />
        <p className="hand mt-8 -rotate-1 text-[23px]">
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
