"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAdminSession } from "@/components/client/AdminSessionProvider";

type AdminGuardProps = {
  children: React.ReactNode;
};

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAdmin, isLoading } = useAdminSession();

  const isLoginRoute = pathname === "/admin/login";
  const isReady = isLoginRoute || (!isLoading && isAdmin);

  useEffect(() => {
    if (isLoginRoute) return;

    if (!isLoading && !isAdmin) {
      supabase.auth.signOut();
      router.replace("/admin/login");
      return;
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.replace("/admin/login");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [isAdmin, isLoading, isLoginRoute, router]);

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] text-base text-[#2d2d2d]">
        Checking admin session...
      </div>
    );
  }

  return <>{children}</>;
}
