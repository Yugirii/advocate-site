import Link from "next/link";
import { notFound } from "next/navigation";
import { Holtwood_One_SC } from "next/font/google";
import { blogPosts, getBlogPostBySlug } from "@/content/blog";

const holtwood = Holtwood_One_SC({
  subsets: ["latin"],
  weight: "400",
});

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-20 pt-[4.5rem] font-[var(--font-body)] text-black sm:px-8 sm:pt-[5.5rem]">
      <article className="mx-auto w-full max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#50a7a4]">
          Blog
        </p>

        <h1
          className={`${holtwood.className} mt-3 text-3xl uppercase leading-[1.1] tracking-[0.03em] text-[#50a7a4] sm:text-4xl`}
        >
          {post.title}
        </h1>

        <p className="mt-3 text-sm text-[#5d5d5d]">
          {post.date} · {post.author}
        </p>

        <p className="mt-8 whitespace-pre-wrap text-base leading-7 text-[#2d2d2d]">
          {post.content}
        </p>

        <Link
          href="/blog"
          className="mt-10 inline-block text-base font-semibold text-black transition-colors duration-200 hover:text-[#E39727]"
        >
          Back to Blogs
        </Link>
      </article>
    </main>
  );
}
