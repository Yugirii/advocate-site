"use client";

import Link from "next/link";
import Image from "next/image";
import { Holtwood_One_SC } from "next/font/google";
import { useEffect, useState } from "react";
import AdminPublishButton from "@/components/client/AdminPublishButton";
import { useAdminSession } from "@/components/client/AdminSessionProvider";
import type { BlogPostEntry } from "@/content/blogSamples";
import { supabase } from "@/lib/supabaseClient";

const holtwood = Holtwood_One_SC({
  subsets: ["latin"],
  weight: "400",
});

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

export default function BlogPage() {
  const { isAdmin, isLoading } = useAdminSession();
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

          const slug = pickFirstString(blogRow.slug);
          if (!slug) return null;

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
            return getSlugTimestamp(slug) ?? 0;
          })();

          const resolvedCover = coverImage || contentImage;
          const resolvedContent = contentImage || coverImage;

          const post: BlogPostEntry = {
            slug,
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

	        {hasPosts ? (
	          <div className="mt-4 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
	            {featuredPost ? (
	              <article className="space-y-3">
	                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
		                  <Image
		                    src={featuredPost.contentImage}
		                    alt={featuredPost.title}
		                    fill
		                    sizes="(min-width: 1024px) 560px, 100vw"
		                    className="object-cover"
		                    priority
		                    unoptimized={isInlineImageSrc(featuredPost.contentImage)}
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
		                        sizes="(min-width: 1024px) 220px, (min-width: 640px) 40vw, 100vw"
		                        className="object-cover"
		                        unoptimized={isInlineImageSrc(post.contentImage)}
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
	        ) : (
	          <p className="mt-6 text-base leading-7 text-[#2d2d2d]">
	            No blog posts yet.
	          </p>
	        )}
	      </div>

	    </main>
	  );
	}
