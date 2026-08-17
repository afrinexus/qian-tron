import { CATEGORIES, type Category, type Machine } from "@/lib/site";

type Row = Record<string, unknown>;

const asPairs = (value: unknown): { k: string; v: string }[] =>
  Array.isArray(value)
    ? (value as Row[])
        .filter((x) => x && typeof x === "object")
        .map((x) => ({ k: String(x.k ?? ""), v: String(x.v ?? "") }))
    : [];

const asStrings = (value: unknown): string[] =>
  Array.isArray(value) ? (value as unknown[]).map((x) => String(x)).filter(Boolean) : [];

/**
 * Overlays live database rows on top of the bundled catalog so CMS edits
 * (names, taglines, intros, hero + gallery images, machines and specs)
 * appear on the public site immediately. Falls back to the static catalog
 * for any field the database leaves empty, and for the whole catalog when
 * the database is unreachable.
 */
export function mergeCatalog(rows: {
  categories: Row[];
  machines: Row[];
}): Category[] {
  if (!rows?.categories?.length) return CATEGORIES;

  const merged = rows.categories.map((c) => {
    const slug = String(c.slug ?? "");
    const fallback = CATEGORIES.find((s) => s.slug === slug);
    const machines: Machine[] = rows.machines
      .filter((m) => m.category_id === c.id)
      .map((m) => {
        const code = String(m.code ?? "");
        const fb = fallback?.machines.find((x) => x.code === code);
        const specs = asPairs(m.specs);
        return {
          code,
          name: String(m.name ?? fb?.name ?? code),
          tag: String(m.tag || fb?.tag || ""),
          image: String(m.image || fb?.image || fallback?.hero || ""),
          specs: specs.length ? specs : (fb?.specs ?? []),
        };
      });

    const gallery = asStrings(c.gallery);
    const highlights = asPairs(c.highlights);
    const applications = asStrings(c.applications);

    return {
      slug,
      name: String(c.name ?? fallback?.name ?? slug),
      ref: String(c.ref ?? fallback?.ref ?? ""),
      tagline: String(c.tagline || fallback?.tagline || ""),
      intro: String(c.intro || fallback?.intro || ""),
      hero: String(c.hero_image || fallback?.hero || ""),
      gallery: gallery.length ? gallery : (fallback?.gallery ?? []),
      highlights: highlights.length ? highlights : (fallback?.highlights ?? []),
      applications: applications.length ? applications : (fallback?.applications ?? []),
      machines: machines.length ? machines : (fallback?.machines ?? []),
    } satisfies Category;
  });

  // keep any static-only categories that were never migrated
  const seen = new Set(merged.map((c) => c.slug));
  return [...merged, ...CATEGORIES.filter((c) => !seen.has(c.slug))];
}
