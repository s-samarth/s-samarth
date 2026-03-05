import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import articleDashboard from "@/assets/article-dashboard.jpg";
import articleMetrics from "@/assets/article-metrics.jpg";
import articleInstagram from "@/assets/article-instagram.jpg";

const articles = [
{
  title: "Your Dashboard Is Lying to You",
  description: "Why most product dashboards create an illusion of insight — and what to do about it.",
  url: "https://open.substack.com/pub/samarthsaraswat/p/your-dashboard-is-lying-to-you-the?r=7ntb71&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
  image: articleDashboard
},
{
  title: "Your Product Has 47 Metrics and Zero Direction",
  description: "The metric overload problem and how to focus on what actually matters.",
  url: "https://open.substack.com/pub/samarthsaraswat/p/your-product-has-47-metrics-and-zero?r=7ntb71&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
  image: articleMetrics
},
{
  title: "Instagram Knows You Better Than Your Parents",
  description: "How recommendation algorithms build intimate user models — and the product implications.",
  url: "https://open.substack.com/pub/samarthsaraswat/p/instagram-knows-you-better-than-your?r=7ntb71&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
  image: articleInstagram
}];


export const ArticlesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="articles" className="section-padding relative">
      <div className="absolute top-10 left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      
      <div className="container-narrow relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          
          <p className="text-primary text-sm tracking-widest uppercase mb-4 font-semibold">Writing</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Featured
            <span className="text-gradient"> Articles</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Product thinking, AI strategy, and metric design on Substack
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, index) =>
          <motion.a
            key={article.title}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            className="glass-card-hover rounded-2xl overflow-hidden flex flex-col group cursor-pointer">
            
              {/* Cover Image */}
              <div className="aspect-[16/10] overflow-hidden">
                <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-foreground font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm flex-1">{article.description}</p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium mt-4">
                  Read on Substack
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-10">
          
          <Button variant="outline" size="lg" asChild>
            <a href="https://samarthsaraswat.substack.com/" target="_blank" rel="noopener noreferrer">
              <BookOpen className="w-4 h-4" />
              View All Articles on Substack
            </a>
          </Button>
        </motion.div>
      </div>
    </section>);

};