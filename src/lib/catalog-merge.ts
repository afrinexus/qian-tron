import { CATEGORIES, type Category, type Machine } from "@/lib/site";
import { DEFAULT_FOCAL, normalizeFocal, resolveImage, type GalleryItem } from "@/lib/media";

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
 * Gallery slides are stored either as plain URL strings (legacy rows) or as
 * `{ url, focal, alt, caption }` objects once edited in the CMS. Both shapes
 * normalise into full image meta here so rendering is uniform.
 */
const asGallery = (value: unknown, fallbackAlt: string): GalleryItem[] =>
  Array.isArray(value)
    ? (value as unknown[])
        .map((item) => resolveImage(item as GalleryItem, fallbackAlt))
        .filter((m) => Boolean(m.url))
    : [];

/**
 * Overlays live database rows on top of the bundled catalog so CMS edits
 * (names, taglines, intros, hero + gallery images, focal points, alt text,
 * captions, machines and specs) appear on the public site immediately. Falls
 * back to the static catalog for any field the database leaves empty, and for
 * the whole catalog when the database is unreachable.
 */
export function mergeCatalog(rows: {
  categories: Row[];
  machines: Row[];
}): Category[] {
  if (!rows?.categories?.length) return CATEGORIES;

  const merged = rows.categories.map((c) => {
    const slug = String(c.slug ?? "");
    const fallback = CATEGORIES.find((s) => s.slug === slug);
    const name = String(c.name ?? fallback?.name ?? slug);
    const machines: Machine[] = rows.machines
      .filter((m) => m.category_id === c.id)
      .map((m) => {
        const code = String(m.code ?? "");
        const fb = fallback?.machines.find((x) => x.code === code);
        const specs = asPairs(m.specs);
        const machineName = String(m.name ?? fb?.name ?? code);
        return {
          code,
          name: machineName,
          tag: String(m.tag || fb?.tag || ""),
          image: String(m.image || fb?.image || fallback?.hero || ""),
          imageFocal: normalizeFocal(m.image_focal ?? fb?.imageFocal ?? DEFAULT_FOCAL),
          imageAlt: String(m.image_alt || fb?.imageAlt || machineName),
          imageCaption: String(m.image_caption ?? fb?.imageCaption ?? ""),
          specs: specs.length ? specs : (fb?.specs ?? []),
        };
      });

    const gallery = asGallery(c.gallery, name);
    const highlights = asPairs(c.highlights);
    const applications = asStrings(c.applications);

    return {
      slug,
      name,
      ref: String(c.ref ?? fallback?.ref ?? ""),
      tagline: String(c.tagline || fallback?.tagline || ""),
      intro: String(c.intro || fallback?.intro || ""),
      hero: String(c.hero_image || fallback?.hero || ""),
      heroFocal: normalizeFocal(c.hero_focal ?? fallback?.heroFocal ?? DEFAULT_FOCAL),
      heroAlt: String(c.hero_alt || fallback?.heroAlt || name),
      heroCaption: String(c.hero_caption ?? fallback?.heroCaption ?? ""),
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
