import Link from "next/link";
import { Holtwood_One_SC } from "next/font/google";
import { blogPosts } from "@/content/blog";

const holtwood = Holtwood_One_SC({
  subsets: ["latin"],
  weight: "400",
});

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-20 pt-[4.5rem] font-[var(--font-body)] text-black sm:px-8 sm:pt-[5.5rem]">
      <div className="mx-auto w-full max-w-5xl">
        <h1
          className={`${holtwood.className} text-3xl uppercase leading-[1.1] tracking-[0.03em] text-[#50a7a4] sm:text-4xl`}
        >
          Blogs
        </h1>

        {blogPosts.length === 0 ? (
          <p className="mt-6 text-base leading-7 text-[#2d2d2d]">
            No blog posts yet.
          </p>
        ) : (
          <div className="mt-8 space-y-6">
            {blogPosts.map((post) => (
              <article key={post.slug} className="border-b border-black/10 pb-6">
                <h2 className="text-2xl font-semibold leading-tight text-black">
                  {post.title}
                </h2>
                <p className="mt-2 text-base leading-7 text-[#2d2d2d]">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-3 inline-block text-base font-semibold text-[#50a7a4] transition-colors duration-200 hover:text-[#E39727]"
                >
                  Read more
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
