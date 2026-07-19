import { createClient } from "@/lib/supabase/server";
import { DashboardCharts } from "@/components/charts/dashboard-charts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          You are signed in as {user?.email ?? "your account"}.
        </p>
      </div>

      <DashboardCharts />

      <Card>
        <CardHeader>
          <CardTitle>Protected area</CardTitle>
          <CardDescription>
            This route is protected by Supabase Auth and the Next.js proxy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-7 text-muted-foreground">
            Only authenticated users can view this page. Add new protected
            routes under <code className="text-foreground">app/(protected)/</code>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
