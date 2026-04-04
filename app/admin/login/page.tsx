"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setError(error.message);
      setIsSubmitting(false);
      return;
    }

    router.replace("/");
  };

  return (
    <main className="fixed inset-0 z-[200] flex items-center justify-center font-[var(--font-body)] text-black">
      <div className="absolute inset-0">
        <Image
          src="/Images/tourpackageInternationalbackground.jpg"
          alt="Admin login background"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="relative w-[min(92vw,560px)] rounded-2xl bg-white/95 p-8 shadow-2xl sm:p-10">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/Images/companyCurrentLogo.png"
            alt="Advocate Tours and Travel Inc."
            width={240}
            height={70}
            className="h-auto w-52"
          />
          <h1 className="mt-4 text-xl font-semibold text-[#1f1f1f]">
            Admin Login
          </h1>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#1f1f1f]">Email</label>
            <input
              type="email"
              placeholder="Type your email..."
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-[#bcbcbc] bg-white px-3 py-2 text-sm text-black outline-none transition focus:border-[#50a7a4] focus:ring-2 focus:ring-[#50a7a4]/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#1f1f1f]">
              Password
            </label>
            <input
              type="password"
              placeholder="Type your password..."
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-[#bcbcbc] bg-white px-3 py-2 text-sm text-black outline-none transition focus:border-[#50a7a4] focus:ring-2 focus:ring-[#50a7a4]/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#1f1f1f]">OTP</label>
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                placeholder="Enter OTP"
                className="min-w-[12rem] flex-1 rounded-md border border-[#bcbcbc] bg-white px-3 py-2 text-sm text-black outline-none transition focus:border-[#50a7a4] focus:ring-2 focus:ring-[#50a7a4]/20"
              />
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#50a7a4] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#458f8c]"
              >
                Send
                <Image
                  src="/Images/sendMessage.png"
                  alt=""
                  aria-hidden="true"
                  width={18}
                  height={18}
                  className="h-4 w-4 object-contain"
                />
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-[#1f1f1f]">
            <input type="checkbox" className="h-4 w-4 accent-[#50a7a4]" />
            Remember me
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-md bg-[#50a7a4] px-4 py-2.5 text-base font-semibold text-white transition-colors hover:bg-[#458f8c] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
