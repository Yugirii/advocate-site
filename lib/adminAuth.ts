const normalizeEmail = (value: string | null | undefined) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

export const getConfiguredAdminEmail = () =>
  normalizeEmail(
    process.env.ADMIN_EMAIL ?? process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? ""
  );

export const isAdminEmail = (email: string | null | undefined) => {
  const adminEmail = getConfiguredAdminEmail();
  if (!adminEmail) return false;
  return normalizeEmail(email) === adminEmail;
};
