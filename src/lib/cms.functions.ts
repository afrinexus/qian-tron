import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

async function assertAdmin(supabase: ReturnType<typeof createClient<Database>>, userId: string) {
  const { data, error } = await supabase.rpc("has_role" as never, { _user_id: userId, _role: "admin" } as never);
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden");
}

export const listCatalog = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase as never, context.userId);
    const [cats, machs] = await Promise.all([
      context.supabase.from("categories").select("*").order("sort_order"),
      context.supabase.from("machines").select("*").order("sort_order"),
    ]);
    if (cats.error) throw new Error(cats.error.message);
    if (machs.error) throw new Error(machs.error.message);
    return { categories: cats.data ?? [], machines: machs.data ?? [] };
  });

const machineSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(160),
  tag: z.string().max(160),
  image: z.string().max(500),
  sort_order: z.number().int().min(0).max(9999),
  specs: z.array(z.object({ k: z.string().max(80), v: z.string().max(80) })).max(20),
});

export const updateMachine = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => machineSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as never, context.userId);
    const { id, ...patch } = data;
    const { error } = await context.supabase.from("machines").update(patch).eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(160),
  tagline: z.string().max(400),
  intro: z.string().max(4000),
  hero_image: z.string().max(500),
});

export const updateCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => categorySchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as never, context.userId);
    const { id, ...patch } = data;
    const { error } = await context.supabase.from("categories").update(patch).eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role" as never, {
      _user_id: context.userId,
      _role: "admin",
    } as never);
    return { isAdmin: Boolean(data) };
  });
