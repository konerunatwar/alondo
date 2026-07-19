"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getServerSiteUrl } from "@/lib/env.server";

export async function signInWithPassword(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/dashboard");

  if (!email || !password) {
    redirect("/login?error=missing-fields");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/login?error=invalid-credentials");
  }

  redirect(next.startsWith("/") ? next : "/dashboard");
}

export async function signUpWithPassword(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect("/signup?error=missing-fields");
  }

  if (password.length < 8) {
    redirect("/signup?error=weak-password");
  }

  const supabase = await createClient();
  const siteUrl = await getServerSiteUrl();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback?next=/dashboard`,
    },
  });

  if (error) {
    redirect("/signup?error=signup-failed");
  }

  redirect("/login?message=check-email");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function requestPasswordReset(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    redirect("/forgot-password?error=missing-email");
  }

  const supabase = await createClient();
  const siteUrl = await getServerSiteUrl();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/reset-password`,
  });

  if (error) {
    redirect("/forgot-password?error=reset-failed");
  }

  redirect("/forgot-password?message=check-email");
}

export async function updatePassword(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!password || !confirmPassword) {
    redirect("/reset-password?error=missing-fields");
  }

  if (password.length < 8) {
    redirect("/reset-password?error=weak-password");
  }

  if (password !== confirmPassword) {
    redirect("/reset-password?error=mismatch");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/forgot-password?error=session-expired");
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirect("/reset-password?error=update-failed");
  }

  await supabase.auth.signOut();
  redirect("/login?message=password-updated");
}
