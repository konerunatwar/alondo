import Link from "next/link";
import { signInWithPassword } from "@/actions/auth";
import { AuthFormShell } from "@/components/auth/auth-form-shell";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginFormProps = {
  next?: string;
  error?: string;
  message?: string;
  details?: string;
};

const errorMessages: Record<string, string> = {
  "missing-fields": "Email and password are required.",
  "invalid-credentials": "Invalid email or password.",
  "auth-callback": "Social sign-in failed. Try again.",
};

export function LoginForm({
  next = "/dashboard",
  error,
  message,
  details,
}: LoginFormProps) {
  return (
    <AuthFormShell
      title="Sign in"
      description="Welcome back. Enter your credentials to continue."
      footer={
        <p className="text-sm text-muted-foreground">
          No account?{" "}
          <Link
            href="/signup"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Create one
          </Link>
        </p>
      }
    >
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>
            {errorMessages[error] ?? "Something went wrong. Try again."}
            {details ? (
              <span className="mt-2 block text-xs opacity-80">{details}</span>
            ) : null}
          </AlertDescription>
        </Alert>
      ) : null}

      {message === "check-email" ? (
        <Alert>
          <AlertDescription>
            Check your email to confirm your account, then sign in.
          </AlertDescription>
        </Alert>
      ) : null}

      {message === "password-updated" ? (
        <Alert>
          <AlertDescription>
            Your password was updated. Sign in with your new password.
          </AlertDescription>
        </Alert>
      ) : null}

      <form action={signInWithPassword} className="flex flex-col gap-4">
        <input type="hidden" name="next" value={next} />
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
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="shrink-0 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            className="h-10"
            required
          />
        </div>
        <Button type="submit" className="mt-1 h-10 w-full" size="lg">
          Sign in
        </Button>
      </form>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <OAuthButtons />
    </AuthFormShell>
  );
}
