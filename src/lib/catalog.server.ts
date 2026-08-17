import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export async function readCatalogRows() {
  const supabase = createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );

  const [cats, machs] = await Promise.all([
    supabase
      .from("categories")
      .select("slug,name,ref,tagline,intro,hero_image,gallery,highlights,applications,sort_order,id")
      .order("sort_order"),
    supabase
      .from("machines")
      .select("category_id,code,name,tag,image,specs,sort_order")
      .order("sort_order"),
  ]);

  if (cats.error || machs.error) return { categories: [], machines: [] };
  return { categories: cats.data ?? [], machines: machs.data ?? [] };
}
