import { createClient } from "@/lib/supabase/server";
import { HeaderBrand } from "@/components/layout/header-brand";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { SiteHeaderNav } from "@/components/layout/site-header-nav";

export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <HeaderBrand />

        <nav className="flex items-center gap-2">
          <ModeToggle />
          <SiteHeaderNav isAuthenticated={Boolean(user)} />
        </nav>
      </div>
    </header>
  );
}
