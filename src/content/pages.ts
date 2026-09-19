/**
 * The notebook's pages, in order. Each id is a section anchor; `page` is the
 * number written in the margin, and `label` is what the nav shows.
 */
export interface NotebookPage {
  id: "who" | "built" | "writes" | "day-job" | "ticket";
  page: string;
  label: string;
}

export const pages: NotebookPage[] = [
  { id: "who", page: "02", label: "Who" },
  { id: "built", page: "03", label: "Built" },
  { id: "writes", page: "04", label: "Writes" },
  { id: "day-job", page: "05", label: "Day job" },
  { id: "ticket", page: "06", label: "Ticket" },
];
