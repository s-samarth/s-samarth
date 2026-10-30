import { Star } from "lucide-react";
import { legal, release } from "@/data/desiDictation";

/**
 * The ask at the foot of both Desi Dictation pages: star the repo. A star
 * can only be given on GitHub itself, so the button opens the repo page,
 * where the Star button sits at the top right. The legal links ride along.
 */
export const RepoLove = () => (
  <div className="card mt-12 max-w-2xl rotate-[0.4deg] px-6 pb-6 pt-5">
    <span className="tape -top-3 right-10 !h-5 !w-16 rotate-3" />
    <p className="label border-b-2 border-redpen/50 pb-2">Free · Open source · On GitHub</p>
    <p className="mt-3 text-[18px] leading-snug text-graphite">
      If Desi Dictation saved you some typing, <em className="text-redpen">star the repo.</em>
    </p>
    <p className="mt-2 text-[16.5px] leading-snug text-graphite-dim">
      It’s free, there’s no account, and the app sends me nothing, so a star is the only way I know someone out there
      is using it. Shower some love: it’s what keeps me building.
    </p>
    <div className="mt-5 flex flex-wrap items-center gap-6">
      <a href={release.repo} target="_blank" rel="noopener noreferrer" className="btn-stamp !px-5 !py-2.5">
        <Star size={15} /> Star on GitHub
      </a>
      <span className="hand -rotate-2 !text-[21px]">top-right of the repo page ↗</span>
    </div>
    <p className="label mt-6 flex flex-wrap gap-x-5 gap-y-2 !text-[10.5px]">
      <a href={release.repo} target="_blank" rel="noopener noreferrer" className="link-ink">
        Source code
      </a>
      <a href={legal.terms} target="_blank" rel="noopener noreferrer" className="link-ink">
        Terms of service
      </a>
      <a href={legal.privacy} target="_blank" rel="noopener noreferrer" className="link-ink">
        Privacy policy
      </a>
    </p>
  </div>
);
