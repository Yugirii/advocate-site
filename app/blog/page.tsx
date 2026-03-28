"use client";

import Link from "next/link";
import Image from "next/image";
import { Holtwood_One_SC } from "next/font/google";
import { useEffect, useState } from "react";
import AdminPublishButton from "@/components/client/AdminPublishButton";
import { useAdminSession } from "@/components/client/AdminSessionProvider";
import { sampleBlogPosts, type BlogPostEntry } from "@/content/blogSamples";
import { supabase } from "@/lib/supabaseClient";

const holtwood = Holtwood_One_SC({
  subsets: ["latin"],
  weight: "400",
});

export default function BlogPage() {
  const { isAdmin, isLoading } = useAdminSession();
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

  const [featuredPost, ...secondaryPosts] = posts;

  if (isFetching) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-6 py-20 pt-[7.5rem] font-[var(--font-body)] text-black sm:px-8 sm:pt-[8.5rem]">
        <div className="mx-auto w-full max-w-5xl">
          <p className="text-base text-[#2d2d2d]">Loading blog posts...</p>
        </div>
      </main>
    );
  }

  const hasPosts = posts.length > 0;
  const showPublishButton = isAdmin && !isLoading;

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-20 pt-[7.5rem] font-[var(--font-body)] text-black sm:px-8 sm:pt-[8.5rem]">
      <div className="mx-auto w-full max-w-5xl">
        {hasPosts ? (
          <>
            <div className="text-center">
              <h1
                className={`${holtwood.className} text-3xl uppercase leading-[1.05] tracking-[0.04em] text-[#E39727] sm:text-4xl`}
              >
                Travel Like Never Before
              </h1>
              <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-[#3b3b3b] sm:text-base">
                Explore travel tips, sample samsample samsample samsample
                samsample samsample samsample samsample sam
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-black">Blog Posts</h2>
              {showPublishButton ? <AdminPublishButton /> : null}
            </div>

            <div className="mt-4 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
              {featuredPost ? (
                <article className="space-y-3">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
                    <Image
                      src={featuredPost.contentImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <p className="text-xs uppercase tracking-[0.08em] text-[#6b6b6b]">
                      {featuredPost.date}
                    </p>
                    <h3 className="text-lg font-semibold text-black">
                      {featuredPost.title}
                    </h3>
                    <p className="text-sm leading-6 text-[#3b3b3b]">
                      {featuredPost.excerpt}
                    </p>
                  </Link>
                </article>
              ) : null}

              <div className="space-y-5">
                {secondaryPosts.slice(0, 3).map((post, index) => (
                  <article
                    key={`${post.slug}-${index}`}
                    className="grid gap-3 sm:grid-cols-[0.85fr_1fr]"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
                        <Image
                          src={post.contentImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    <div>
                      <Link href={`/blog/${post.slug}`}>
                        <p className="text-xs uppercase tracking-[0.08em] text-[#6b6b6b]">
                          {post.date}
                        </p>
                        <h3 className="mt-2 text-base font-semibold text-black">
                          {post.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-[#3b3b3b]">
                          {post.excerpt}
                        </p>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1
                className={`${holtwood.className} text-3xl uppercase leading-[1.1] tracking-[0.03em] text-[#50a7a4] sm:text-4xl`}
              >
                Blogs
              </h1>
              {showPublishButton ? <AdminPublishButton /> : null}
            </div>

            <p className="mt-6 text-base leading-7 text-[#2d2d2d]">
              No blog posts yet.
            </p>
          </>
        )}
      </div>

    </main>
  );
}
