import Link from "next/link";
import { requestPasswordReset } from "@/actions/auth";
import { AuthFormShell } from "@/components/auth/auth-form-shell";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ForgotPasswordFormProps = {
  error?: string;
  message?: string;
};

const errorMessages: Record<string, string> = {
  "missing-email": "Enter the email address for your account.",
  "reset-failed": "Could not send reset email. Try again in a moment.",
  "session-expired": "Your reset link expired. Request a new one.",
};

export function ForgotPasswordForm({ error, message }: ForgotPasswordFormProps) {
  return (
    <AuthFormShell
      title="Forgot password"
      description="Enter your email and we'll send you a reset link."
      footer={
        <Link
          href="/login"
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Back to sign in
        </Link>
      }
    >
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>
            {errorMessages[error] ?? "Something went wrong. Try again."}
          </AlertDescription>
        </Alert>
      ) : null}

      {message === "check-email" ? (
        <Alert>
          <AlertDescription>
            If an account exists for that email, you&apos;ll receive a password
            reset link shortly.
          </AlertDescription>
        </Alert>
      ) : null}

      <form action={requestPasswordReset} className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className="h-10"
            required
          />
        </div>
        <Button type="submit" className="mt-1 h-10 w-full" size="lg">
          Send reset link
        </Button>
      </form>
    </AuthFormShell>
  );
}
