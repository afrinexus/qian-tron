import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

const pageviewSchema = z.object({
  path: z.string().min(1).max(400),
  referrer: z.string().max(500).optional().or(z.literal("")),
});

export const trackPageView = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => pageviewSchema.parse(input))
  .handler(async ({ data }) => {
    const supabase = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
    );
    await supabase.from("page_views").insert({
      path: data.path,
      referrer: data.referrer || null,
    });
    return { ok: true };
  });

async function assertAdmin(supabase: ReturnType<typeof createClient<Database>>, userId: string) {
  const { data, error } = await supabase.rpc("has_role" as never, { _user_id: userId, _role: "admin" } as never);
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden");
}

export const analyticsSummary = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase as never, context.userId);
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { data: views } = await context.supabase
      .from("page_views")
      .select("path, created_at")
      .gte("created_at", since)
      .limit(10000);
    const { data: enquiries } = await context.supabase
      .from("enquiries")
      .select("status, created_at");

    const byDay = new Map<string, number>();
    for (const v of views ?? []) {
      const d = new Date(v.created_at as string).toISOString().slice(0, 10);
      byDay.set(d, (byDay.get(d) ?? 0) + 1);
    }
    const daily = Array.from(byDay.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, count }));

    const byPath = new Map<string, number>();
    for (const v of views ?? []) byPath.set(v.path, (byPath.get(v.path) ?? 0) + 1);
    const topPaths = Array.from(byPath.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, count]) => ({ path, count }));

    const enquiryCounts = { new: 0, contacted: 0, quoted: 0, closed: 0 } as Record<string, number>;
    for (const e of enquiries ?? []) enquiryCounts[e.status as string] = (enquiryCounts[e.status as string] ?? 0) + 1;

    return {
      totalViews: views?.length ?? 0,
      totalEnquiries: enquiries?.length ?? 0,
      enquiryCounts,
      daily,
      topPaths,
    };
  });
