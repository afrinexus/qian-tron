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

const specsSchema = z.array(z.object({ k: z.string().max(80), v: z.string().max(80) })).max(20);

const focalSchema = z
  .string()
  .regex(/^\d{1,3}% \d{1,3}%$/, "Focal point must look like \"50% 40%\"")
  .default("50% 50%");

const machineSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(160),
  tag: z.string().max(160),
  image: z.string().max(500),
  image_focal: focalSchema,
  image_alt: z.string().max(300).default(""),
  image_caption: z.string().max(300).default(""),
  sort_order: z.number().int().min(0).max(9999),
  specs: specsSchema,
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

const newMachineSchema = z.object({
  category_id: z.string().uuid(),
  code: z.string().min(1).max(60),
  name: z.string().min(1).max(160),
  tag: z.string().max(160).default(""),
  image: z.string().max(500).default(""),
  image_focal: focalSchema,
  image_alt: z.string().max(300).default(""),
  image_caption: z.string().max(300).default(""),
  sort_order: z.number().int().min(0).max(9999).default(0),
  specs: specsSchema.default([]),
});

export const createMachine = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => newMachineSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as never, context.userId);
    const { error } = await context.supabase.from("machines").insert(data as never);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteMachine = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as never, context.userId);
    const { error } = await context.supabase.from("machines").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Gallery slides carry their own focal point, alt text and caption. */
const gallerySchema = z
  .array(
    z.union([
      z.string().max(500),
      z.object({
        url: z.string().max(500),
        focal: focalSchema,
        alt: z.string().max(300).default(""),
        caption: z.string().max(300).default(""),
      }),
    ]),
  )
  .max(12);

const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(160),
  tagline: z.string().max(400),
  intro: z.string().max(4000),
  hero_image: z.string().max(500),
  hero_focal: focalSchema,
  hero_alt: z.string().max(300).default(""),
  hero_caption: z.string().max(300).default(""),
  gallery: gallerySchema.default([]),
  sort_order: z.number().int().min(0).max(9999).optional(),
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

const newCategorySchema = z.object({
  slug: z.string().min(1).max(80).regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and dashes"),
  name: z.string().min(1).max(160),
  ref: z.string().min(1).max(40),
  tagline: z.string().max(400).default(""),
  intro: z.string().max(4000).default(""),
  hero_image: z.string().max(500).default(""),
  hero_focal: focalSchema,
  hero_alt: z.string().max(300).default(""),
  hero_caption: z.string().max(300).default(""),
  gallery: gallerySchema.default([]),
  sort_order: z.number().int().min(0).max(9999).default(0),
});

export const createCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => newCategorySchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as never, context.userId);
    const { error } = await context.supabase.from("categories").insert(data as never);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as never, context.userId);
    const machines = await context.supabase.from("machines").delete().eq("category_id", data.id);
    if (machines.error) throw new Error(machines.error.message);
    const { error } = await context.supabase.from("categories").delete().eq("id", data.id);
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
