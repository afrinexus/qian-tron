/**
 * Shared image metadata model: every catalogue image can carry a focal point
 * (CSS object-position), alt text and a caption, so the same asset crops
 * correctly in hero, 4:3 card and square layouts across the site.
 */
export type ImageMeta = {
  url: string;
  focal: string;
  alt: string;
  caption: string;
};

/** Gallery slides may be plain URLs (legacy/bundled data) or full meta objects. */
export type GalleryItem = string | Partial<ImageMeta>;

export type SchemaImageObject = {
  "@type": "ImageObject";
  contentUrl: string;
  url: string;
  name?: string;
  description?: string;
  caption?: string;
};

export const DEFAULT_FOCAL = "50% 50%";

const clampPct = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

/** Normalises "x% y%" strings, tolerating junk and legacy empty values. */
export function normalizeFocal(value: unknown): string {
  if (typeof value !== "string") return DEFAULT_FOCAL;
  const m = value.trim().match(/^(-?\d+(?:\.\d+)?)%\s+(-?\d+(?:\.\d+)?)%$/);
  if (!m) return DEFAULT_FOCAL;
  return `${clampPct(Number(m[1]))}% ${clampPct(Number(m[2]))}%`;
}

export const focalToXY = (focal: string): { x: number; y: number } => {
  const [x, y] = normalizeFocal(focal).split(" ").map((p) => Number(p.replace("%", "")));
  return { x: x ?? 50, y: y ?? 50 };
};

export const xyToFocal = (x: number, y: number) => `${clampPct(x)}% ${clampPct(y)}%`;

/** Resolves any image input into a complete meta object with sane fallbacks. */
export function resolveImage(input: GalleryItem | undefined | null, fallbackAlt = ""): ImageMeta {
  if (!input) return { url: "", focal: DEFAULT_FOCAL, alt: fallbackAlt, caption: "" };
  if (typeof input === "string") {
    return { url: input, focal: DEFAULT_FOCAL, alt: fallbackAlt, caption: "" };
  }
  return {
    url: String(input.url ?? ""),
    focal: normalizeFocal(input.focal),
    alt: String(input.alt || fallbackAlt),
    caption: String(input.caption ?? ""),
  };
}

const STORAGE_PUBLIC_PATH = "/storage/v1/object/public/";
const STORAGE_RENDER_PATH = "/storage/v1/render/image/public/";

/**
 * Returns an on-demand, CDN-cached thumbnail URL for public catalogue-media
 * uploads. Other URLs retain the original source because their image service
 * capabilities are not known.
 */
export function responsiveImageUrl(url: string, width: number): string {
  if (!url || !url.includes(STORAGE_PUBLIC_PATH)) return url;
  const rendered = url.replace(STORAGE_PUBLIC_PATH, STORAGE_RENDER_PATH);
  const separator = rendered.includes("?") ? "&" : "?";
  return `${rendered}${separator}width=${Math.max(1, Math.round(width))}&quality=82`;
}

export function responsiveImageSrcSet(
  url: string,
  widths: readonly number[] = [320, 480, 640, 960, 1280, 1600, 1920],
): string | undefined {
  if (!url.includes(STORAGE_PUBLIC_PATH)) return undefined;
  return widths.map((width) => `${responsiveImageUrl(url, width)} ${width}w`).join(", ");
}

/** Schema.org image metadata; unlike Open Graph, JSON-LD accepts ImageObject. */
export function toSchemaImage(
  input: GalleryItem | undefined | null,
  fallbackAlt: string,
  absoluteUrl: (url: string) => string,
): SchemaImageObject | null {
  const image = resolveImage(input, fallbackAlt);
  if (!image.url) return null;
  const url = absoluteUrl(image.url);
  return {
    "@type": "ImageObject",
    contentUrl: url,
    url,
    ...(image.alt ? { name: image.alt, description: image.alt } : {}),
    ...(image.caption ? { caption: image.caption } : {}),
  };
}

/** Serialises a gallery item for storage, dropping empty optional fields. */
export function serializeImage(meta: ImageMeta): ImageMeta {
  return {
    url: meta.url.trim(),
    focal: normalizeFocal(meta.focal),
    alt: meta.alt.trim(),
    caption: meta.caption.trim(),
  };
}
