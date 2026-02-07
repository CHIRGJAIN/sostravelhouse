import { Link } from "react-router-dom";
import { blogPosts } from "@/data/mockData";
import { Clock, ArrowRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { formatDate } from "@/lib/format";

export default function Blog() {
  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Travel Blog" subtitle="Tips, guides, and inspiration for your next trip." />
      <div className="container mx-auto px-4 py-12">
        {featured && (
          <Link to={`/blog/${featured.slug}`} className="group mb-12 grid gap-6 overflow-hidden card-surface card-accent md:grid-cols-2">
            <img src={featured.image} alt={featured.title} className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col justify-center p-6">
              <span className="mb-2 inline-flex w-fit rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-foreground">Featured</span>
              <h2 className="font-heading text-2xl font-bold text-foreground group-hover:text-primary">{featured.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{featured.excerpt}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span>{featured.author}</span>
                <span>|</span>
                <span>{formatDate(featured.date)}</span>
                <span>|</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{featured.readTime}</span>
              </div>
            </div>
          </Link>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group overflow-hidden card-surface card-interactive card-accent">
              <img src={post.image} alt={post.title} className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
              <div className="p-5">
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{t}</span>
                  ))}
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-primary line-clamp-2">{post.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatDate(post.date)}</span>
                  <span className="flex items-center gap-1 text-primary">Read more <ArrowRight className="h-3 w-3" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
