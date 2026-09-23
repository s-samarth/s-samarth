import { useEffect, useState } from "react";

/**
 * "A ticket was raised" is news for three parts of the page that don't share
 * a parent: the form, the set list in the hero and the footer.
 *
 * Frontend note: instead of lifting state up to Index and threading props
 * through every section, the form fires a DOM CustomEvent on `window` and
 * anyone who cares listens. The trade-off: it's invisible in the component
 * tree, so it lives in this one file with one name. For app-wide state that
 * many components *write*, a React context would be the better tool.
 */
const EVENT = "notebook:ticket-sent";

export const announceTicketSent = () => window.dispatchEvent(new Event(EVENT));

export const useTicketSent = () => {
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const onSent = () => setSent(true);
    window.addEventListener(EVENT, onSent);
    return () => window.removeEventListener(EVENT, onSent);
  }, []);
  return sent;
};
