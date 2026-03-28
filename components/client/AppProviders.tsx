"use client";

import AdminSessionProvider from "@/components/client/AdminSessionProvider";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminSessionProvider>{children}</AdminSessionProvider>;
}
