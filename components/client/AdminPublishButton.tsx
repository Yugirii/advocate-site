"use client";

import Link from "next/link";
import { useAdminSession } from "@/components/client/AdminSessionProvider";

type AdminPublishButtonProps = {
  href?: string;
  onClick?: () => void;
};

export default function AdminPublishButton({
  href = "/admin/blog/publish",
  onClick,
}: AdminPublishButtonProps) {
  const { isAdmin, isLoading } = useAdminSession();

  if (isLoading || !isAdmin) {
    return null;
  }

  if (!href) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-2 rounded-md bg-[#50a7a4] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#458f8c]"
      >
        <span className="text-lg leading-none">+</span>
        Publish
      </button>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-md bg-[#50a7a4] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#458f8c]"
    >
      <span className="text-lg leading-none">+</span>
      Publish
    </Link>
  );
}
