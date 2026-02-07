import { useParams, Link } from "react-router-dom";
import { blogPosts } from "@/data/mockData";
import { Clock, ArrowLeft, Share2, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";

export default function BlogDetail() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  if (!post) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground">Post not found</h2>
          <Link to="/blog"><Button className="mt-4 rounded-xl">Back to Blog</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <img src={post.image} alt={post.title} className="h-64 w-full object-cover md:h-96" />
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <Link to="/blog" className="mb-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />Back to Blog
        </Link>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{t}</span>
          ))}
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">{post.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>{post.author}</span>
          <span>|</span>
          <span>{formatDate(post.date)}</span>
          <span>|</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readTime}</span>
        </div>

        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" className="gap-1 rounded-xl"><Share2 className="h-3 w-3" />Share</Button>
          <Button variant="outline" size="icon" className="rounded-xl h-8 w-8"><Facebook className="h-3 w-3" /></Button>
          <Button variant="outline" size="icon" className="rounded-xl h-8 w-8"><Twitter className="h-3 w-3" /></Button>
        </div>

        <article className="prose prose-sm mt-8 max-w-none text-muted-foreground">
          <p className="text-base leading-relaxed">{post.excerpt}</p>
          <p className="mt-4 leading-relaxed">{post.content}</p>
          <p className="mt-4 leading-relaxed">
            Planning your next adventure? Browse our curated tour packages at ENGEE HOLIDAYS and let our experts craft the perfect itinerary for you.
          </p>
        </article>

        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="font-heading text-xl font-bold text-foreground">Related Articles</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.id} to={`/blog/${r.slug}`} className="group rounded-xl border border-border bg-card p-4 hover:shadow-md">
                  <h4 className="font-heading text-sm font-semibold text-foreground group-hover:text-primary">{r.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
