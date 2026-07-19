import Link from "next/link";
import { updatePassword } from "@/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { AuthFormShell } from "@/components/auth/auth-form-shell";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ResetPasswordFormProps = {
  error?: string;
  hasSession: boolean;
};

const errorMessages: Record<string, string> = {
  "missing-fields": "Enter and confirm your new password.",
  "weak-password": "Password must be at least 8 characters.",
  mismatch: "Passwords do not match.",
  "update-failed": "Could not update password. Try again.",
};

export function ResetPasswordForm({ error, hasSession }: ResetPasswordFormProps) {
  if (!hasSession) {
    return (
      <AuthFormShell
        title="Reset link required"
        description="Open the link from your email to set a new password."
        footer={
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Request a new link
          </Link>
        }
      >
        <Alert>
          <AlertDescription>
            Your session may have expired. Request a fresh reset link to continue.
          </AlertDescription>
        </Alert>
      </AuthFormShell>
    );
  }

  return (
    <AuthFormShell
      title="Set new password"
      description="Choose a strong password for your account."
    >
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>
            {errorMessages[error] ?? "Something went wrong. Try again."}
          </AlertDescription>
        </Alert>
      ) : null}

      <form action={updatePassword} className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">New password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="h-10"
            minLength={8}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Repeat your password"
            className="h-10"
            minLength={8}
            required
          />
        </div>
        <Button type="submit" className="mt-1 h-10 w-full" size="lg">
          Update password
        </Button>
      </form>
    </AuthFormShell>
  );
}

export async function ResetPasswordFormLoader({
  error,
}: {
  error?: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <ResetPasswordForm error={error} hasSession={Boolean(user)} />;
}
