import articleDashboard from "@/assets/article-dashboard.jpg";
import articleMetrics from "@/assets/article-metrics.jpg";
import articleInstagram from "@/assets/article-instagram.jpg";

export interface Article {
  title: string;
  description: string;
  /** Canonical post URL, without share-tracking parameters. */
  url: string;
  image: string;
}

export const articles: Article[] = [
  {
    title: "Your Dashboard Is Lying to You",
    description:
      "There is nothing worse than thinking your product is a hit while every customer out there just hates it, but you don't know it. A guide on how to decide product metrics, so that you have an accurate read.",
    url: "https://samarthsaraswat.substack.com/p/your-dashboard-is-lying-to-you-the",
    image: articleDashboard,
  },
  {
    title: "Your Product Has 47 Metrics and Zero Direction",
    description: "The metric overload problem and how to focus on what actually matters. An explainer on North Star Metrics.",
    url: "https://samarthsaraswat.substack.com/p/your-product-has-47-metrics-and-zero",
    image: articleMetrics,
  },
  {
    title: "Instagram Knows You Better Than Your Parents",
    description: "The product metrics Instagram is tracking for its users, and why those metrics are the best indicators of active engagement.",
    url: "https://samarthsaraswat.substack.com/p/instagram-knows-you-better-than-your",
    image: articleInstagram,
  },
];
