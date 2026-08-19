import { resolveImage, type GalleryItem, type ImageMeta } from "@/lib/media";

/**
 * Image that honours a stored focal point so the subject stays framed in any
 * aspect ratio (hero, 4:3 card, square tile). Alt text and captions come from
 * the CMS, falling back to the model/category name.
 */
export function FocalImage({
  image,
  fallbackAlt = "",
  className = "",
  loading,
}: {
  image: GalleryItem | ImageMeta | undefined | null;
  fallbackAlt?: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  const meta = resolveImage(image as GalleryItem, fallbackAlt);
  if (!meta.url) return null;
  return (
    <img
      src={meta.url}
      alt={meta.alt || fallbackAlt}
      loading={loading}
      style={{ objectPosition: meta.focal }}
      className={className}
    />
  );
}

/** Small editorial caption strip used under gallery slides and hero figures. */
export function ImageCaption({ text, className = "" }: { text: string; className?: string }) {
  if (!text) return null;
  return (
    <figcaption className={`mt-2 text-[11px] uppercase tracking-[0.2em] text-steel ${className}`}>
      {text}
    </figcaption>
  );
}
