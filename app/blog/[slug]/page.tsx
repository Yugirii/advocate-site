"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { BlogPostEntry } from "@/content/blogSamples";
import { supabase } from "@/lib/supabaseClient";

const formatPostDate = (value: string | null | undefined) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const pickFirstString = (...values: unknown[]) => {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value;
  }
  return "";
};

const excerptFromContent = (content: string) => {
  const trimmed = content.trim();
  if (!trimmed) return "";
  const match = trimmed.match(/[^.!?]+[.!?]/);
  if (match?.[0]) return match[0].trim();
  return trimmed.slice(0, 140);
};

const getSlugTimestamp = (slug: string) => {
  const lastPart = slug.split("-").pop();
  if (!lastPart) return null;
  const timestamp = Number.parseInt(lastPart, 36);
  return Number.isFinite(timestamp) ? timestamp : null;
};

const isInlineImageSrc = (src: string) =>
  src.startsWith("data:") || src.startsWith("blob:");

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [posts, setPosts] = useState<BlogPostEntry[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  type BlogPostRow = Record<string, unknown>;

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      let { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error?.code === "42703") {
        const fallback = await supabase.from("blog_posts").select("*");
        data = fallback.data;
        error = fallback.error;
      }

      if (!isMounted) return;

      if (error) {
        console.error("Failed to load blog posts:", error);
        setPosts([]);
        setIsFetching(false);
        return;
      }

      const mapped = (data ?? [])
        .map((row) => {
          const blogRow = row as BlogPostRow;

          const slugValue = pickFirstString(blogRow.slug);
          if (!slugValue) return null;

          const title = pickFirstString(blogRow.title);
          const content = pickFirstString(blogRow.content);
          const excerpt =
            pickFirstString(blogRow.excerpt, blogRow.summary) ||
            excerptFromContent(content);

          const coverImage = pickFirstString(
            blogRow.cover_image_url,
            blogRow.cover_image,
            blogRow.coverImageUrl,
            blogRow.coverimage,
            blogRow.coverImage,
            blogRow.coverimageurl,
            blogRow.cover_photo,
            blogRow.coverphoto,
            blogRow.coverPhoto
          );
          const contentImage = pickFirstString(
            blogRow.content_image_url,
            blogRow.content_image,
            blogRow.contentImageUrl,
            blogRow.contentimage,
            blogRow.contentImage,
            blogRow.contentimageurl,
            blogRow.content_photo,
            blogRow.contentphoto,
            blogRow.contentPhoto
          );

          const createdAt = pickFirstString(
            blogRow.published_at,
            blogRow.publishedAt,
            blogRow.publishedat,
            blogRow.created_at,
            blogRow.createdAt,
            blogRow.createdat,
            blogRow.inserted_at,
            blogRow.insertedAt,
            blogRow.insertedat
          );

          const dateLabel =
            pickFirstString(blogRow.date, blogRow.published_date) ||
            formatPostDate(createdAt);

          const sortKey = (() => {
            if (createdAt) {
              const parsed = new Date(createdAt).getTime();
              if (!Number.isNaN(parsed)) return parsed;
            }
            return getSlugTimestamp(slugValue) ?? 0;
          })();

          const resolvedCover = coverImage || contentImage;
          const resolvedContent = contentImage || coverImage;

          const post: BlogPostEntry = {
            slug: slugValue,
            title,
            excerpt,
            content,
            date: dateLabel,
            coverImage: resolvedCover,
            contentImage: resolvedContent,
          };

          return { post, sortKey };
        })
        .filter((item): item is { post: BlogPostEntry; sortKey: number } =>
          Boolean(item?.post)
        )
        .sort((a, b) => b.sortKey - a.sortKey)
        .map((item) => item.post);

      setPosts(mapped);
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
      <main className="min-h-screen bg-[var(--background)] px-6 py-20 pt-[72px] font-[var(--font-body)] text-black md:px-8 md:pt-[88px]">
        <div className="mx-auto w-full max-w-5xl">
          <p className="text-base text-[#2d2d2d]">Loading blog post...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] pb-20 pt-[72px] font-[var(--font-body)] text-black md:pt-[88px]">
      {!post ? (
        <div className="px-6 py-20 sm:px-8">
          <div className="mx-auto w-full max-w-5xl">
            <div className="rounded-md border border-black/10 bg-white p-6 text-center">
              <p className="text-base text-[#2d2d2d]">Blog post not found.</p>
              <Link
                href="/blog"
                className="mt-4 inline-block text-sm font-semibold text-[#50a7a4] transition-colors hover:text-[#E39727]"
              >
                Back to Blogs
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <section className="relative h-[240px] w-full overflow-hidden bg-[#d9d9d9] sm:h-[320px]">
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={`${post.title} cover`}
                fill
                sizes="100vw"
                className="object-cover"
                priority
                unoptimized={isInlineImageSrc(post.coverImage)}
              />
            ) : null}
          </section>

          <div className="px-6 py-10 sm:px-8 sm:py-12">
            <div className="mx-auto w-full max-w-[1140px]">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,620px)_340px] lg:justify-between lg:gap-x-16">
                <article className="max-w-[620px]">
                  <h1 className="max-w-[420px] text-xl font-semibold leading-[1.15] text-black sm:text-[2rem]">
                    {post.title}
                  </h1>

                  <div className="mt-5">
                    <div className="relative aspect-[4/3] w-full bg-[#d9d9d9]">
                      {post.contentImage ? (
                        <Image
                          src={post.contentImage}
                          alt={post.title}
                          fill
                          sizes="(min-width: 1024px) 640px, 100vw"
                          className="object-cover"
                          unoptimized={isInlineImageSrc(post.contentImage)}
                        />
                      ) : null}
                    </div>
                  </div>

                  <p className="mt-4 w-full whitespace-pre-wrap text-justify text-[13px] leading-6 text-[#2d2d2d] sm:text-sm sm:leading-7">
                    {post.content}
                  </p>
                </article>

                <aside className="lg:pt-7">
                  <h2 className="text-base font-semibold leading-none text-black sm:text-lg">
                    Explore other blogs
                  </h2>
                  <div className="mt-4 space-y-7">
                    {otherPosts.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/blog/${item.slug}`}
                        className="flex gap-4"
                      >
                        <div className="relative h-24 w-40 flex-shrink-0 bg-[#d9d9d9] sm:h-28 sm:w-44">
                          {item.contentImage ? (
                            <Image
                              src={item.contentImage}
                              alt={item.title}
                              fill
                              sizes="(min-width: 640px) 176px, 160px"
                              className="object-cover"
                              unoptimized={isInlineImageSrc(item.contentImage)}
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0 pt-0.5">
                          <p className="text-sm text-[#6b6b6b]">{item.date}</p>
                          <p className="mt-1 text-base font-semibold leading-7 text-black">
                            {item.title}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
