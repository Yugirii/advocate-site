"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { BlogPostEntry } from "@/content/blogSamples";
import { supabase } from "@/lib/supabaseClient";

export default function PublishBlogPage() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    coverImage: "",
    contentImage: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const updateField = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setFormError(null);
  };

  const readFileAsDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Failed to read file."));
      reader.readAsDataURL(file);
    });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    field: "coverImage" | "contentImage"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      updateField(field, dataUrl);
    } catch {
      setFormError("Failed to load image. Please try again.");
    }
  };

  const getExcerpt = (content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return "";
    const match = trimmed.match(/[^.!?]+[.!?]/);
    if (match?.[0]) {
      return match[0].trim();
    }
    return trimmed.slice(0, 140);
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handlePublish = async () => {
    if (
      !formState.coverImage ||
      !formState.contentImage ||
      !formState.title.trim() ||
      !formState.content.trim()
    ) {
      setFormError("Please complete all fields before publishing.");
      return;
    }

    const nextPost: BlogPostEntry = {
      slug: `${slugify(formState.title)}-${Date.now().toString(36)}`,
      title: formState.title.trim(),
      content: formState.content.trim(),
      excerpt: getExcerpt(formState.content),
      date: formatDate(new Date()),
      coverImage: formState.coverImage,
      contentImage: formState.contentImage,
    };

    setIsPublishing(true);

    const { error } = await supabase.from("blog_posts").insert([
      {
        slug: nextPost.slug,
        title: nextPost.title,
        excerpt: nextPost.excerpt,
        content: nextPost.content,
        date: nextPost.date,
        cover_image: nextPost.coverImage,
        content_image: nextPost.contentImage,
      },
    ]);

    if (error) {
      setFormError("Failed to publish post. Please try again.");
      setIsPublishing(false);
      return;
    }

    router.push("/blog");
  };

  return (
    <main className="min-h-screen bg-[var(--background)] pb-20 pt-[72px] font-[var(--font-body)] text-black md:pt-[88px]">
      <div className="bg-[#d9d9d9]">
        <div className="mx-auto flex min-h-[170px] w-full items-center justify-center px-6 sm:px-8">
          <label className="inline-flex cursor-pointer items-center gap-3 rounded-md bg-white px-5 py-2 text-sm font-semibold text-[#1f1f1f] shadow">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1f1f1f]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 text-white"
                fill="currentColor"
              >
                <path d="M9 3h6l1.2 2H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3.8L9 3Zm3 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2.2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6Z" />
              </svg>
            </span>
            Upload Cover photo
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleImageChange(event, "coverImage")}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="mx-auto w-full max-w-2xl space-y-8 px-6 pt-10 sm:px-8">
        <div>
          <input
            type="text"
            value={formState.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="Type headline"
            className="w-full bg-transparent text-sm text-black outline-none placeholder:text-[#5d5d5d]"
          />
        </div>

        <div className="flex justify-center">
          <div className="flex aspect-[4/3] w-full items-center justify-center bg-[#d9d9d9]">
            <label className="inline-flex cursor-pointer items-center gap-3 rounded-md bg-white px-5 py-2 text-sm font-semibold text-[#1f1f1f] shadow">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1f1f1f]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 text-white"
                  fill="currentColor"
                >
                  <path d="M9 3h6l1.2 2H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3.8L9 3Zm3 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2.2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6Z" />
                </svg>
              </span>
              Upload content photo
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleImageChange(event, "contentImage")}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div>
          <textarea
            value={formState.content}
            onChange={(event) => updateField("content", event.target.value)}
            placeholder="Type Content"
            className="min-h-[200px] w-full resize-none bg-transparent text-sm text-black outline-none placeholder:text-[#5d5d5d]"
          />
        </div>

        {formError ? <p className="text-sm text-red-600">{formError}</p> : null}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/blog")}
            className="rounded-md border border-[#cfcfcf] px-4 py-2 text-sm font-semibold text-[#1f1f1f] transition-colors hover:border-[#E39727] hover:text-[#E39727]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePublish}
            disabled={isPublishing}
            className="rounded-md bg-[#50a7a4] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#458f8c] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPublishing ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
    </main>
  );
}
