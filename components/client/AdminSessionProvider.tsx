"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type AdminSessionValue = {
  isAdmin: boolean;
  isLoading: boolean;
  userEmail: string | null;
};

const AdminSessionContext = createContext<AdminSessionValue>({
  isAdmin: false,
  isLoading: true,
  userEmail: null,
});

export const useAdminSession = () => useContext(AdminSessionContext);

export default function AdminSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const syncSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;
      setUserEmail(data.session?.user.email ?? null);
      setIsLoading(false);
    };

    syncSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) return;
        setUserEmail(session?.user.email ?? null);
        setIsLoading(false);
      }
    );

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const allowedEmail =
    typeof process.env.NEXT_PUBLIC_ADMIN_EMAIL === "string"
      ? process.env.NEXT_PUBLIC_ADMIN_EMAIL.trim().toLowerCase()
      : "";

  const value = useMemo<AdminSessionValue>(() => {
    if (!userEmail) {
      return { isAdmin: false, isLoading, userEmail: null };
    }
    const isAdmin = allowedEmail
      ? userEmail.toLowerCase() === allowedEmail
      : true;
    return { isAdmin, isLoading, userEmail };
  }, [allowedEmail, isLoading, userEmail]);

  return (
    <AdminSessionContext.Provider value={value}>
      {children}
    </AdminSessionContext.Provider>
  );
}
