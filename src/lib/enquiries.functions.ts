import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

const enquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(2000),
  machine_code: z.string().trim().max(60).optional().or(z.literal("")),
  machine_name: z.string().trim().max(160).optional().or(z.literal("")),
  category_slug: z.string().trim().max(80).optional().or(z.literal("")),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => enquirySchema.parse(input))
  .handler(async ({ data }) => {
    const supabase = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
    );
    const row = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      message: data.message,
      machine_code: data.machine_code || null,
      machine_name: data.machine_name || null,
      category_slug: data.category_slug || null,
    };
    const { error } = await supabase.from("enquiries").insert(row);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const statusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "contacted", "quoted", "closed"]),
  admin_notes: z.string().max(4000).optional(),
});

async function assertAdmin(supabase: ReturnType<typeof createClient<Database>>, userId: string) {
  const { data, error } = await supabase.rpc("has_role" as never, { _user_id: userId, _role: "admin" } as never);
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden");
}

export const listEnquiries = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase as never, context.userId);
    const { data, error } = await context.supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const updateEnquiry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => statusSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as never, context.userId);
    const patch: { status: typeof data.status; admin_notes?: string } = { status: data.status };
    if (data.admin_notes !== undefined) patch.admin_notes = data.admin_notes;
    const { error } = await context.supabase.from("enquiries").update(patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
