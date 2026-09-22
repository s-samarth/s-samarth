import articleDashboard from "@/assets/article-dashboard.jpg";
import articleMetrics from "@/assets/article-metrics.jpg";
import articleInstagram from "@/assets/article-instagram.jpg";

export interface Article {
  title: string;
  description: string;
  /** Canonical post URL, without share-tracking parameters. */
  url: string;
  image: string;
  /** Describes the cover for screen readers and search engines. */
  imageAlt: string;
}

export const articles: Article[] = [
  {
    title: "Your Dashboard Is Lying to You",
    description:
      "There is nothing worse than thinking your product is a hit while every customer out there just hates it, but you don't know it. A guide on how to decide product metrics, so that you have an accurate read.",
    url: "https://samarthsaraswat.substack.com/p/your-dashboard-is-lying-to-you-the",
    image: articleDashboard,
    imageAlt: "Cover for “Your Dashboard Is Lying to You”: a smiling product manager in front of green dashboard charts while the company building burns behind them.",
  },
  {
    title: "Your Product Has 47 Metrics and Zero Direction",
    description: "The metric overload problem and how to focus on what actually matters. An explainer on North Star Metrics.",
    url: "https://samarthsaraswat.substack.com/p/your-product-has-47-metrics-and-zero",
    image: articleMetrics,
    imageAlt: "Cover for “Your Product Has 47 Metrics and Zero Direction”: a comic of a PM, designer, engineer and marketer each shouting a different metric while the CEO frowns.",
  },
  {
    title: "Instagram Knows You Better Than Your Parents",
    description: "The product metrics Instagram is tracking for its users, and why those metrics are the best indicators of active engagement.",
    url: "https://samarthsaraswat.substack.com/p/instagram-knows-you-better-than-your",
    image: articleInstagram,
    imageAlt: "Cover for “Instagram Knows You Better Than Your Parents”: a comic of a parent yelling “Sleep!” while their kid scrolls Instagram in bed for “just five more minutes”.",
  },
];
