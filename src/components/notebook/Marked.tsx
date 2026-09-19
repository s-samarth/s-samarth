import { Fragment } from "react";
import { Highlight } from "./Highlight";

interface MarkedProps {
  /** Plain text; wrap a run in *asterisks* to put the highlighter over it. */
  text: string;
  /** Seconds before the first stroke; later strokes follow 0.15 s apart. */
  delay?: number;
}

/** Renders text with highlighter strokes over the *starred* runs, in reading order. */
export const Marked = ({ text, delay = 0 }: MarkedProps) => {
  let marked = 0;
  return (
    <>
      {text.split("*").map((run, i) =>
        i % 2 === 1 ? (
          <Highlight key={i} delay={delay + 0.15 * marked++}>
            {run}
          </Highlight>
        ) : (
          <Fragment key={i}>{run}</Fragment>
        ),
      )}
    </>
  );
};
