"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogPostEntry } from "@/content/blogSamples";
import { supabase } from "@/lib/supabaseClient";

type FormState = {
  title: string;
  content: string;
  coverImage: string;
  contentImage: string;
};

type CropField = "coverImage" | "contentImage";

type CropModalState = {
  field: CropField;
  src: string;
  mimeType: string;
  naturalWidth: number;
  naturalHeight: number;
  zoom: number;
  offsetX: number;
  offsetY: number;
};

type ViewportSize = {
  width: number;
  height: number;
};

const CROP_CONFIG: Record<
  CropField,
  {
    aspect: number;
    targetWidth: number;
    targetHeight: number;
    stageClass: string;
    frameClass: string;
    minZoom: number;
    defaultZoom: number;
  }
> = {
  coverImage: {
    aspect: 16 / 5,
    targetWidth: 1600,
    targetHeight: 500,
    stageClass: "aspect-[16/9]",
    frameClass: "aspect-[16/5] w-full",
    minZoom: 1,
    defaultZoom: 1,
  },
  contentImage: {
    aspect: 4 / 3,
    targetWidth: 1200,
    targetHeight: 900,
    stageClass: "aspect-[5/4]",
    frameClass: "aspect-[4/3] w-full",
    minZoom: 1,
    defaultZoom: 1,
  },
};

const BLOG_IMAGE_BUCKET =
  process.env.NEXT_PUBLIC_BLOG_IMAGE_BUCKET?.trim() || "blog-images";

const MIME_EXTENSION_MAP: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const isDataUrl = (value: string) => value.startsWith("data:");

const normalizeSlugForPath = (slug: string) =>
  slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "") || "post";

const dataUrlToBlob = (dataUrl: string) => {
  const [metadata, base64] = dataUrl.split(",");
  const mimeMatch = metadata?.match(/^data:([^;]+);base64$/i);

  if (!mimeMatch || !base64) {
    throw new Error("Unsupported image format.");
  }

  const mimeType = mimeMatch[1].toLowerCase();
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return {
    mimeType,
    blob: new Blob([bytes], { type: mimeType }),
  };
};

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });

const loadImageDimensions = (src: string) =>
  new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () =>
      resolve({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    image.onerror = () => reject(new Error("Failed to load image."));
    image.src = src;
  });

const createImageElement = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image."));
    image.src = src;
  });

const getCropMetrics = (crop: CropModalState, viewport: ViewportSize) => {
  if (
    !viewport.width ||
    !viewport.height ||
    !crop.naturalWidth ||
    !crop.naturalHeight
  ) {
    return {
      scale: 1,
      sourceWidth: 0,
      sourceHeight: 0,
      maxOffsetX: 0,
      maxOffsetY: 0,
    };
  }

  const scale =
    Math.max(
      viewport.width / crop.naturalWidth,
      viewport.height / crop.naturalHeight
    ) * crop.zoom;

  const renderedWidth = crop.naturalWidth * scale;
  const renderedHeight = crop.naturalHeight * scale;

  return {
    scale,
    sourceWidth: viewport.width / scale,
    sourceHeight: viewport.height / scale,
    maxOffsetX: Math.max(0, (renderedWidth - viewport.width) / 2),
    maxOffsetY: Math.max(0, (renderedHeight - viewport.height) / 2),
  };
};

const getClampedOffsets = (
  offsetX: number,
  offsetY: number,
  crop: CropModalState,
  viewport: ViewportSize
) => {
  const { maxOffsetX, maxOffsetY } = getCropMetrics(crop, viewport);

  return {
    offsetX: clamp(offsetX, -maxOffsetX, maxOffsetX),
    offsetY: clamp(offsetY, -maxOffsetY, maxOffsetY),
  };
};

const createCroppedImage = async (
  crop: CropModalState,
  viewport: ViewportSize
) => {
  const image = await createImageElement(crop.src);
  const config = CROP_CONFIG[crop.field];
  const { scale, sourceWidth, sourceHeight } = getCropMetrics(crop, viewport);

  const sourceX = clamp(
    (crop.naturalWidth - sourceWidth) / 2 - crop.offsetX / scale,
    0,
    Math.max(0, crop.naturalWidth - sourceWidth)
  );
  const sourceY = clamp(
    (crop.naturalHeight - sourceHeight) / 2 - crop.offsetY / scale,
    0,
    Math.max(0, crop.naturalHeight - sourceHeight)
  );

  const canvas = document.createElement("canvas");
  canvas.width = config.targetWidth;
  canvas.height = config.targetHeight;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Failed to create crop canvas.");
  }

  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    config.targetWidth,
    config.targetHeight
  );

  const mimeType =
    crop.mimeType === "image/png" || crop.mimeType === "image/webp"
      ? crop.mimeType
      : "image/jpeg";

  return canvas.toDataURL(
    mimeType,
    mimeType === "image/png" ? undefined : 0.92
  );
};

export default function PublishBlogPage() {
  const router = useRouter();
  const cropViewportRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef({
    active: false,
    pointerId: -1,
    lastX: 0,
    lastY: 0,
  });

  const [formState, setFormState] = useState<FormState>({
    title: "",
    content: "",
    coverImage: "",
    contentImage: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [cropModal, setCropModal] = useState<CropModalState | null>(null);
  const [cropViewport, setCropViewport] = useState<ViewportSize>({
    width: 0,
    height: 0,
  });
  const [isSavingCrop, setIsSavingCrop] = useState(false);

  const insertPost = async (post: BlogPostEntry) => {
    const base = {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
    };

    const publishedAt = new Date().toISOString();
    const attempts = [
      {
        ...base,
        cover_image_url: post.coverImage,
        content_image_url: post.contentImage,
        published_at: publishedAt,
      },
      {
        ...base,
        cover_image_url: post.coverImage,
        content_image_url: post.contentImage,
      },
      { ...base, cover_image: post.coverImage, content_image: post.contentImage },
      { ...base, coverimage: post.coverImage, contentimage: post.contentImage },
      { ...base, coverImage: post.coverImage, contentImage: post.contentImage },
      { ...base, cover_photo: post.coverImage, content_photo: post.contentImage },
      { ...base, coverphoto: post.coverImage, contentphoto: post.contentImage },
      { ...base, coverPhoto: post.coverImage, contentPhoto: post.contentImage },
    ];

    let lastError: { code?: string; message?: string } | null = null;

    for (const payload of attempts) {
      const { error } = await supabase.from("blog_posts").insert([payload]);
      if (!error) return null;
      lastError = error;
      const missingColumn =
        error.code === "42703" ||
        error.code === "PGRST204" ||
        Boolean(error.message?.includes("schema cache"));
      if (!missingColumn) break;
    }

    return lastError;
  };

  const uploadCroppedImage = async (
    imageValue: string,
    postSlug: string,
    field: CropField
  ) => {
    if (!isDataUrl(imageValue)) {
      return {
        publicUrl: imageValue,
        uploadedPath: null as string | null,
      };
    }

    const { mimeType, blob } = dataUrlToBlob(imageValue);
    const fileExtension = MIME_EXTENSION_MAP[mimeType] || "jpg";
    const imageTypePrefix = field === "coverImage" ? "cover" : "content";
    const safeSlug = normalizeSlugForPath(postSlug);
    const uniquePart = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;
    const uploadPath = `${safeSlug}/${imageTypePrefix}-${uniquePart}.${fileExtension}`;

    const { error: uploadError } = await supabase.storage
      .from(BLOG_IMAGE_BUCKET)
      .upload(uploadPath, blob, {
        cacheControl: "31536000",
        contentType: mimeType,
        upsert: false,
      });

    if (uploadError) {
      throw new Error(
        `Failed to upload ${imageTypePrefix} image to storage bucket "${BLOG_IMAGE_BUCKET}". ${uploadError.message}`
      );
    }

    const { data } = supabase.storage
      .from(BLOG_IMAGE_BUCKET)
      .getPublicUrl(uploadPath);

    return {
      publicUrl: data.publicUrl,
      uploadedPath: uploadPath,
    };
  };

  const removeUploadedImages = async (paths: string[]) => {
    if (!paths.length) return;
    try {
      await supabase.storage.from(BLOG_IMAGE_BUCKET).remove(paths);
    } catch {
      // Best-effort cleanup only.
    }
  };

  const updateField = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setFormError(null);
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

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    field: CropField
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    try {
      const dataUrl = await readFileAsDataUrl(file);
      const dimensions = await loadImageDimensions(dataUrl);
      const config = CROP_CONFIG[field];

      setCropModal({
        field,
        src: dataUrl,
        mimeType: file.type || "image/jpeg",
        naturalWidth: dimensions.width,
        naturalHeight: dimensions.height,
        zoom: config.defaultZoom,
        offsetX: 0,
        offsetY: 0,
      });
      setFormError(null);
    } catch {
      setFormError("Failed to load image. Please try again.");
    }
  };

  const closeCropModal = () => {
    if (isSavingCrop) return;
    dragStateRef.current.active = false;
    dragStateRef.current.pointerId = -1;
    setCropModal(null);
  };

  const handleSaveCrop = async () => {
    if (!cropModal || !cropViewport.width || !cropViewport.height) return;

    setIsSavingCrop(true);

    try {
      const croppedImage = await createCroppedImage(cropModal, cropViewport);
      updateField(cropModal.field, croppedImage);
      setCropModal(null);
    } catch {
      setFormError("Failed to crop image. Please try again.");
    } finally {
      setIsSavingCrop(false);
    }
  };

  const handleCropPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!cropModal || isSavingCrop) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    event.preventDefault();

    dragStateRef.current = {
      active: true,
      pointerId: event.pointerId,
      lastX: event.clientX,
      lastY: event.clientY,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleCropPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.active) return;
    if (dragStateRef.current.pointerId !== event.pointerId) return;

    event.preventDefault();

    const deltaX = event.clientX - dragStateRef.current.lastX;
    const deltaY = event.clientY - dragStateRef.current.lastY;

    dragStateRef.current.lastX = event.clientX;
    dragStateRef.current.lastY = event.clientY;

    if (!deltaX && !deltaY) return;

    setCropModal((prev) => {
      if (!prev) return prev;

      const clampedOffsets = getClampedOffsets(
        prev.offsetX + deltaX,
        prev.offsetY + deltaY,
        prev,
        cropViewport
      );

      if (
        clampedOffsets.offsetX === prev.offsetX &&
        clampedOffsets.offsetY === prev.offsetY
      ) {
        return prev;
      }

      return {
        ...prev,
        ...clampedOffsets,
      };
    });
  };

  const handleCropPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragStateRef.current.active = false;
    dragStateRef.current.pointerId = -1;
  };

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

    const slug = `${slugify(formState.title)}-${Date.now().toString(36)}`;
    const uploadedPaths: string[] = [];

    setIsPublishing(true);

    try {
      const uploadedCover = await uploadCroppedImage(
        formState.coverImage,
        slug,
        "coverImage"
      );
      if (uploadedCover.uploadedPath) {
        uploadedPaths.push(uploadedCover.uploadedPath);
      }

      const uploadedContent = await uploadCroppedImage(
        formState.contentImage,
        slug,
        "contentImage"
      );
      if (uploadedContent.uploadedPath) {
        uploadedPaths.push(uploadedContent.uploadedPath);
      }

      const nextPost: BlogPostEntry = {
        slug,
        title: formState.title.trim(),
        content: formState.content.trim(),
        excerpt: getExcerpt(formState.content),
        date: formatDate(new Date()),
        coverImage: uploadedCover.publicUrl,
        contentImage: uploadedContent.publicUrl,
      };

      const error = await insertPost(nextPost);

      if (error) {
        await removeUploadedImages(uploadedPaths);
        setFormError(error.message ?? "Failed to publish post. Please try again.");
        return;
      }

      router.push("/blog");
    } catch (error) {
      await removeUploadedImages(uploadedPaths);
      const message =
        error instanceof Error
          ? error.message
          : "Failed to upload image. Please try again.";
      setFormError(message);
    } finally {
      setIsPublishing(false);
    }
  };

  const isCropModalOpen = Boolean(cropModal);

  useEffect(() => {
    if (!isCropModalOpen) return;

    const previousOverflow = document.body.style.overflow;

    const measureViewport = () => {
      const rect = cropViewportRef.current?.getBoundingClientRect();
      if (!rect) return;

      setCropViewport({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      });
    };

    const animationFrame = window.requestAnimationFrame(measureViewport);
    window.addEventListener("resize", measureViewport);
    document.body.style.overflow = "hidden";

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", measureViewport);
      document.body.style.overflow = previousOverflow;
      setCropViewport({ width: 0, height: 0 });
      dragStateRef.current.active = false;
      dragStateRef.current.pointerId = -1;
    };
  }, [isCropModalOpen]);

  useEffect(() => {
    if (!cropModal || !cropViewport.width || !cropViewport.height) return;

    const clampedOffsets = getClampedOffsets(
      cropModal.offsetX,
      cropModal.offsetY,
      cropModal,
      cropViewport
    );

    if (
      clampedOffsets.offsetX === cropModal.offsetX &&
      clampedOffsets.offsetY === cropModal.offsetY
    ) {
      return;
    }

    setCropModal((prev) =>
      prev
        ? {
            ...prev,
            ...clampedOffsets,
          }
        : prev
    );
  }, [cropModal, cropViewport]);

  useEffect(() => {
    if (!isCropModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSavingCrop) {
        dragStateRef.current.active = false;
        dragStateRef.current.pointerId = -1;
        setCropModal(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCropModalOpen, isSavingCrop]);

  const cropConfig = cropModal ? CROP_CONFIG[cropModal.field] : null;
  const cropMetrics =
    cropModal && cropViewport.width && cropViewport.height
      ? getCropMetrics(cropModal, cropViewport)
      : null;

  return (
    <>
      <main className="min-h-screen bg-[var(--background)] pb-20 pt-[72px] font-[var(--font-body)] text-black md:pt-[88px]">
        <div className="bg-[#d9d9d9]">
          <div className="relative mx-auto flex min-h-[170px] w-full items-center justify-center overflow-hidden px-6 sm:px-8">
            {formState.coverImage ? (
              <>
                <Image
                  src={formState.coverImage}
                  alt="Cover preview"
                  fill
                  sizes="100vw"
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/15" aria-hidden="true" />
              </>
            ) : null}

            <label className="relative inline-flex cursor-pointer items-center gap-3 rounded-md bg-white/95 px-5 py-2 text-sm font-semibold text-[#1f1f1f] shadow backdrop-blur transition-colors hover:bg-white">
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
              {formState.coverImage ? "Change Cover photo" : "Upload Cover photo"}
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
            <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-[#d9d9d9]">
              {formState.contentImage ? (
                <>
                  <Image
                    src={formState.contentImage}
                    alt="Content image preview"
                    fill
                    sizes="(min-width: 1024px) 672px, 100vw"
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
                </>
              ) : null}

              <label className="relative inline-flex cursor-pointer items-center gap-3 rounded-md bg-white/95 px-5 py-2 text-sm font-semibold text-[#1f1f1f] shadow backdrop-blur transition-colors hover:bg-white">
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
                {formState.contentImage
                  ? "Change content photo"
                  : "Upload content photo"}
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

      {cropModal && cropConfig ? (
        <div className="fixed inset-0 z-50 bg-black/35 px-4 py-6 sm:p-6">
          <div className="mx-auto flex h-full w-full max-w-[640px] items-center justify-center">
            <div className="w-full rounded-sm bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
              <h2 className="text-[1.05rem] font-medium text-black">Crop image</h2>

              <div className="mt-5">
                <div
                  className={`relative w-full cursor-grab overflow-hidden rounded-[2px] bg-[#8f8f8f] ${cropConfig.stageClass} touch-none select-none active:cursor-grabbing`}
                  onPointerDown={handleCropPointerDown}
                  onPointerMove={handleCropPointerMove}
                  onPointerUp={handleCropPointerUp}
                  onPointerCancel={handleCropPointerUp}
                >
                  {cropMetrics ? (
                    <div
                      className="pointer-events-none absolute left-1/2 top-1/2"
                      style={{
                        width: cropModal.naturalWidth,
                        height: cropModal.naturalHeight,
                        transform: `translate(-50%, -50%) translate(${cropModal.offsetX}px, ${cropModal.offsetY}px) scale(${cropMetrics.scale})`,
                        transformOrigin: "center",
                      }}
                    >
                      <Image
                        src={cropModal.src}
                        alt="Crop preview"
                        fill
                        unoptimized
                        sizes="(min-width: 640px) 512px, 90vw"
                        className="object-fill select-none"
                        draggable={false}
                        />
                      </div>
                  ) : null}

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div
                      ref={cropViewportRef}
                      className={`pointer-events-none relative border-2 border-white ${cropConfig.frameClass}`}
                      style={{
                        boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.32)",
                      }}
                    >
                      <span className="absolute -left-[3px] -top-[3px] h-4 w-4 border-l-[3px] border-t-[3px] border-white" />
                      <span className="absolute -right-[3px] -top-[3px] h-4 w-4 border-r-[3px] border-t-[3px] border-white" />
                      <span className="absolute -bottom-[3px] -left-[3px] h-4 w-4 border-b-[3px] border-l-[3px] border-white" />
                      <span className="absolute -bottom-[3px] -right-[3px] h-4 w-4 border-b-[3px] border-r-[3px] border-white" />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#444]">Zoom</span>
                    <input
                      type="range"
                      min={cropConfig.minZoom}
                      max="3"
                      step="0.01"
                      value={cropModal.zoom}
                      onChange={(event) => {
                        const nextZoom = Number(event.target.value);

                        setCropModal((prev) => {
                          if (!prev) return prev;

                          const nextCrop = {
                            ...prev,
                            zoom: nextZoom,
                          };
                          const clampedOffsets = getClampedOffsets(
                            nextCrop.offsetX,
                            nextCrop.offsetY,
                            nextCrop,
                            cropViewport
                          );

                          return {
                            ...nextCrop,
                            ...clampedOffsets,
                          };
                        });
                      }}
                      className="h-2 w-full accent-[#50a7a4]"
                    />
                  </div>
                  <p className="mt-2 text-xs text-[#6b6b6b]">
                    Drag the image under the crop frame.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeCropModal}
                  disabled={isSavingCrop}
                  className="rounded-md border border-[#E7B05C] px-6 py-2 text-sm font-medium text-[#1f1f1f] transition-colors hover:bg-[#fff6ea] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveCrop}
                  disabled={isSavingCrop || !cropViewport.width || !cropViewport.height}
                  className="rounded-md bg-[#50a7a4] px-8 py-2 text-sm font-medium text-white transition-colors hover:bg-[#458f8c] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSavingCrop ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
