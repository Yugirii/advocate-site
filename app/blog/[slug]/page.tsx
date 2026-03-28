"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Holtwood_One_SC } from "next/font/google";
import { useEffect, useState } from "react";
import { sampleBlogPosts, type BlogPostEntry } from "@/content/blogSamples";
import { supabase } from "@/lib/supabaseClient";

const holtwood = Holtwood_One_SC({
  subsets: ["latin"],
  weight: "400",
});

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [posts, setPosts] = useState<BlogPostEntry[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  type BlogPostRow = {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    cover_image: string;
    content_image: string;
    created_at?: string;
  };

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(
          "slug,title,excerpt,content,date,cover_image,content_image,created_at"
        )
        .order("created_at", { ascending: false });

      if (!isMounted) return;

      if (error || !data || data.length === 0) {
        setPosts(sampleBlogPosts);
      } else {
        const mapped = data.map((row: BlogPostRow): BlogPostEntry => ({
          slug: row.slug,
          title: row.title,
          excerpt: row.excerpt,
          content: row.content,
          date: row.date,
          coverImage: row.cover_image,
          contentImage: row.content_image,
        }));
        setPosts(mapped);
      }
      setIsFetching(false);
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const post = posts.find((entry) => entry.slug === slug);
  const otherPosts = posts.filter((entry) => entry.slug !== slug).slice(0, 2);

  if (isFetching) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-6 py-20 pt-[7.5rem] font-[var(--font-body)] text-black sm:px-8 sm:pt-[8.5rem]">
        <div className="mx-auto w-full max-w-5xl">
          <p className="text-base text-[#2d2d2d]">Loading blog post...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-20 pt-[7.5rem] font-[var(--font-body)] text-black sm:px-8 sm:pt-[8.5rem]">
      <div className="mx-auto w-full max-w-5xl">
        {!post ? (
          <div className="rounded-md border border-black/10 bg-white p-6 text-center">
            <p className="text-base text-[#2d2d2d]">Blog post not found.</p>
            <Link
              href="/blog"
              className="mt-4 inline-block text-sm font-semibold text-[#50a7a4] transition-colors hover:text-[#E39727]"
            >
              Back to Blogs
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.8fr]">
            <article>
              <h1 className="text-2xl font-semibold leading-tight text-black sm:text-3xl">
                {post.title}
              </h1>
              <div className="mt-4 overflow-hidden rounded-md">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={900}
                  height={600}
                  className="h-auto w-full object-cover"
                />
              </div>
              <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-[#2d2d2d] sm:text-base">
                {post.content}
              </p>
            </article>

            <aside className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#1f1f1f]">
                Explore other blogs
              </h2>
              {otherPosts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="flex gap-4"
                >
                  <div className="relative h-24 w-28 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={item.contentImage}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.08em] text-[#6b6b6b]">
                      {item.date}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-black">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))}
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
