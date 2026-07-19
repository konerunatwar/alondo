"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/actions/auth";
import { isAuthUiPath } from "@/lib/auth/routes";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type SiteHeaderNavProps = {
  isAuthenticated: boolean;
};

export function SiteHeaderNav({ isAuthenticated }: SiteHeaderNavProps) {
  const pathname = usePathname();
  const isAuthPage = isAuthUiPath(pathname);

  if (isAuthenticated) {
    return (
      <>
        <Button
          variant="ghost"
          render={<Link href="/dashboard" />}
          nativeButton={false}
        >
          Dashboard
        </Button>
        <Separator orientation="vertical" className="mx-1 h-6" />
        <form action={signOut}>
          <Button type="submit" variant="outline" size="sm">
            Sign out
          </Button>
        </form>
      </>
    );
  }

  if (isAuthPage) {
    return null;
  }

  return (
    <>
      <Button
        variant="ghost"
        render={<Link href="/login" />}
        nativeButton={false}
      >
        Sign in
      </Button>
      <Button render={<Link href="/signup" />} nativeButton={false}>
        Sign up
      </Button>
    </>
  );
}
