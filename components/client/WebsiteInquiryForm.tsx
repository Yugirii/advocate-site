"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";

type WebsiteInquiryFormProps = {
  className?: string;
  initialMessage?: string;
  submitLabel?: string;
  helperNote?: string;
  showSubmitIcon?: boolean;
  variant?: "default" | "simple";
  inquiryType?: "website" | "visa";
  inquiryTarget?: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const getInitialState = (initialMessage?: string): FormState => ({
  name: "",
  email: "",
  phone: "",
  message: initialMessage?.trim() ?? "",
});

const inputClassName =
  "w-full rounded-none border border-[#d89b2e] bg-white px-4 py-2 text-base text-[#2d2d2d] outline-none placeholder:text-[#8f8f8f]";
const textareaClassName =
  "mt-5 min-h-40 w-full resize-none rounded-none border border-[#d89b2e] bg-white px-4 py-3 text-base text-[#2d2d2d] outline-none placeholder:text-[#8f8f8f] max-md:mt-4 max-md:min-h-36";

export default function WebsiteInquiryForm({
  className = "",
  initialMessage,
  submitLabel = "Send",
  helperNote,
  showSubmitIcon = true,
  variant = "default",
  inquiryType = "website",
  inquiryTarget,
}: WebsiteInquiryFormProps) {
  const [formState, setFormState] = useState<FormState>(
    getInitialState(initialMessage)
  );
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    setFormState(getInitialState(initialMessage));
    setFormErrors({});
    setStatus({ type: "idle", message: "" });
  }, [initialMessage]);

  const updateField = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};
    const name = formState.name.trim();
    const email = formState.email.trim();
    const phone = formState.phone.trim();
    const message = formState.message.trim();

    if (!name) {
      nextErrors.name = "Required Field";
    } else if (!/^[A-Za-z\s.'-]+$/.test(name)) {
      nextErrors.name = "Allowed Characters";
    }

    if (!email) {
      nextErrors.email = "Required Field";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Invalid Email format";
    }

    if (phone && !/^\d+$/.test(phone)) {
      nextErrors.phone = "Numbers only";
    }

    if (!message) {
      nextErrors.message = "Required Field";
    } else if (message.length > 600) {
      nextErrors.message = "Message must be 600 characters or less";
    }

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateField = (field: keyof FormErrors) => {
    let error: string | null = null;
    const name = formState.name.trim();
    const email = formState.email.trim();
    const phone = formState.phone.trim();
    const message = formState.message.trim();

    if (field === "name") {
      if (!name) {
        error = "Required Field";
      } else if (!/^[A-Za-z\s.'-]+$/.test(name)) {
        error = "Allowed Characters";
      }
    }

    if (field === "email") {
      if (!email) {
        error = "Required Field";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        error = "Invalid Email format";
      }
    }

    if (field === "phone") {
      if (phone && !/^\d+$/.test(phone)) {
        error = "Numbers only";
      }
    }

    if (field === "message") {
      if (!message) {
        error = "Required Field";
      } else if (message.length > 600) {
        error = "Message must be 600 characters or less";
      }
    }

    setFormErrors((prev) => {
      const next = { ...prev };
      if (error) {
        next[field] = error;
      } else {
        delete next[field];
      }
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status.type === "loading") return;

    if (!validateForm()) {
      return;
    }

    setStatus({ type: "loading", message: "Sending inquiry..." });

    try {
      const response = await fetch("/api/website-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name.trim(),
          email: formState.email.trim(),
          phone: formState.phone.trim(),
          message: formState.message.trim(),
          inquiryType,
          inquiryTarget: inquiryTarget?.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Unable to send the inquiry right now.");
      }

      setFormState(getInitialState(initialMessage));
      setStatus({
        type: "success",
        message: "Inquiry sent. We will get back to you soon.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to send the inquiry right now.",
      });
    }
  };

  if (variant === "simple") {
    return (
      <form className={className} onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-base font-medium leading-6 text-[#1f1f1f]">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              value={formState.email}
              onChange={(event) => updateField("email", event.target.value)}
              onBlur={() => validateField("email")}
              className="w-full rounded-md border border-[#bcbcbc] bg-white px-3 py-2.5 text-base text-black outline-none transition focus:border-[#50a7a4] focus:ring-2 focus:ring-[#50a7a4]/20"
              required
            />
            {formErrors.email ? (
              <p className="text-sm text-red-600">{formErrors.email}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-base font-medium leading-6 text-[#1f1f1f]">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formState.name}
              onChange={(event) => updateField("name", event.target.value)}
              onBlur={() => validateField("name")}
              className="w-full rounded-md border border-[#bcbcbc] bg-white px-3 py-2.5 text-base text-black outline-none transition focus:border-[#50a7a4] focus:ring-2 focus:ring-[#50a7a4]/20"
              required
            />
            {formErrors.name ? (
              <p className="text-sm text-red-600">{formErrors.name}</p>
            ) : null}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-base font-medium leading-6 text-[#1f1f1f]">
              Phone
            </label>
            <input
              type="tel"
              value={formState.phone}
              onChange={(event) =>
                updateField("phone", event.target.value.replace(/\D/g, ""))
              }
              onBlur={() => validateField("phone")}
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full rounded-md border border-[#bcbcbc] bg-white px-3 py-2.5 text-base text-black outline-none transition focus:border-[#50a7a4] focus:ring-2 focus:ring-[#50a7a4]/20"
            />
            {formErrors.phone ? (
              <p className="text-sm text-red-600">{formErrors.phone}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <label className="text-base font-medium leading-6 text-[#1f1f1f]">
            Message <span className="text-red-600">*</span>
          </label>
          <textarea
            value={formState.message}
            onChange={(event) => updateField("message", event.target.value)}
            onBlur={() => validateField("message")}
            maxLength={600}
            rows={6}
            className="w-full resize-y rounded-md border border-[#bcbcbc] bg-white px-3 py-2.5 text-base text-black outline-none transition focus:border-[#50a7a4] focus:ring-2 focus:ring-[#50a7a4]/20"
            required
          />
          {formErrors.message ? (
            <p className="text-sm text-red-600">{formErrors.message}</p>
          ) : null}
        </div>

        {helperNote ? (
          <p className="mt-4 text-sm leading-6 text-red-600">{helperNote}</p>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          {status.type !== "idle" ? (
            <p
              className={`text-sm ${
                status.type === "error" ? "text-red-600" : "text-[#1f1f1f]"
              }`}
            >
              {status.message}
            </p>
          ) : null}
          <button
            type="submit"
            className="min-w-[9rem] cursor-pointer rounded-md bg-[#50a7a4] px-6 py-2.5 text-xl font-medium text-white transition-colors duration-200 hover:bg-[#458f8c] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={status.type === "loading"}
          >
            {status.type === "loading" ? "Sending..." : submitLabel}
          </button>
        </div>
      </form>
    );
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-5 min-[980px]:grid-cols-3 max-md:gap-4">
        <input
          type="text"
          placeholder="Name"
          value={formState.name}
          onChange={(event) => updateField("name", event.target.value)}
          onBlur={() => validateField("name")}
          className={inputClassName}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formState.email}
          onChange={(event) => updateField("email", event.target.value)}
          onBlur={() => validateField("email")}
          className={inputClassName}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={formState.phone}
          onChange={(event) =>
            updateField("phone", event.target.value.replace(/\D/g, ""))
          }
          onBlur={() => validateField("phone")}
          inputMode="numeric"
          pattern="[0-9]*"
          className={inputClassName}
        />
      </div>
      {(formErrors.name || formErrors.email || formErrors.phone) && (
        <div className="grid grid-cols-1 gap-2 min-[980px]:grid-cols-3">
          <div>
            {formErrors.name ? (
              <p className="text-sm text-red-600">{formErrors.name}</p>
            ) : null}
          </div>
          <div>
            {formErrors.email ? (
              <p className="text-sm text-red-600">{formErrors.email}</p>
            ) : null}
          </div>
          <div>
            {formErrors.phone ? (
              <p className="text-sm text-red-600">{formErrors.phone}</p>
            ) : null}
          </div>
        </div>
      )}

      <textarea
        placeholder="Message"
        value={formState.message}
        onChange={(event) => updateField("message", event.target.value)}
        onBlur={() => validateField("message")}
        maxLength={600}
        className={textareaClassName}
        required
      />
      {formErrors.message ? (
        <p className="text-sm text-red-600">{formErrors.message}</p>
      ) : null}

      {helperNote ? (
        <p className="mt-4 text-sm leading-6 text-red-600">{helperNote}</p>
      ) : null}

      <div
        className={`flex flex-wrap items-center justify-end gap-3 ${
          helperNote ? "mt-3" : "mt-5"
        }`}
      >
        {status.type !== "idle" && (
          <p
            className={`text-base ${
              status.type === "error" ? "text-red-600" : "text-[#2d2d2d]"
            }`}
          >
            {status.message}
          </p>
        )}
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-[#50a7a4] px-5 py-2 text-base font-semibold text-white transition-colors hover:bg-[#458f8c] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={status.type === "loading"}
        >
          {status.type === "loading" ? "Sending..." : submitLabel}
          {showSubmitIcon ? (
            <Image
              src="/Images/sendMessage.png"
              alt=""
              aria-hidden="true"
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            />
          ) : null}
        </button>
      </div>
    </form>
  );
}
