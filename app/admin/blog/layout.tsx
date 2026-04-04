import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/adminAuth";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

export default async function AdminBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}
