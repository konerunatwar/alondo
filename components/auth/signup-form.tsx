import Link from "next/link";
import { signUpWithPassword } from "@/actions/auth";
import { AuthFormShell } from "@/components/auth/auth-form-shell";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SignupFormProps = {
  error?: string;
};

const errorMessages: Record<string, string> = {
  "missing-fields": "Email and password are required.",
  "weak-password": "Password must be at least 8 characters.",
  "signup-failed": "Could not create account. Try a different email.",
};

export function SignupForm({ error }: SignupFormProps) {
  return (
    <AuthFormShell
      title="Create account"
      description="Enter your details below to get started."
      footer={
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      }
    >
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>
            {errorMessages[error] ?? "Something went wrong. Try again."}
          </AlertDescription>
        </Alert>
      ) : null}

      <form action={signUpWithPassword} className="flex flex-col gap-4">
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
          <Label htmlFor="password">Password</Label>
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
        <Button type="submit" className="mt-1 h-10 w-full" size="lg">
          Create account
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
