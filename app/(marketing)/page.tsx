import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-10 px-6 py-20">
      <div className="max-w-2xl space-y-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {APP_NAME}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Build smarter with {APP_NAME}.
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Secure sign-in with email and Google — powered by Supabase Auth and
          deployed on Railway.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/signup"
          className={cn(buttonVariants({ size: "lg" }), "h-12 px-6")}
        >
          Get started
        </Link>
        <Link
          href="/dashboard"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-12 px-6",
          )}
        >
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}
