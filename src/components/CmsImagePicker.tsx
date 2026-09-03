import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  DEFAULT_FOCAL,
  focalToXY,
  resolveImage,
  xyToFocal,
  type GalleryItem,
  type ImageMeta,
} from "@/lib/media";

const BUCKET = "catalog-media";

/** Aspect ratios the public site crops images into. */
const RATIOS: { label: string; css: string }[] = [
  { label: "Hero 16:9", css: "16 / 9" },
  { label: "Card 4:3", css: "4 / 3" },
  { label: "Tile 1:1", css: "1 / 1" },
];

async function uploadFile(file: File): Promise<string> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type || undefined,
    upsert: false,
  });
  if (error) throw new Error(error.message);
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

/**
 * Click-to-set focal point cropper: the admin clicks the subject of the photo
 * and every layout (hero, card, tile) keeps that point in frame.
 */
function FocalPicker({ meta, onChange }: { meta: ImageMeta; onChange: (focal: string) => void }) {
  const [ratio, setRatio] = useState(RATIOS[0]!.css);
  const { x, y } = focalToXY(meta.focal);
  if (!meta.url) return null;

  const set = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    onChange(xyToFocal(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100));
  };

  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-center gap-2">
        {RATIOS.map((r) => (
          <button
            key={r.css}
            type="button"
            onClick={() => setRatio(r.css)}
            className={`border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] ${
              ratio === r.css ? "border-dragon text-dragon" : "border-border text-steel"
            }`}
          >
            {r.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onChange(DEFAULT_FOCAL)}
          className="border border-border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-steel"
        >
          Reset crop
        </button>
        <span className="text-[11px] text-steel">Focal {meta.focal}</span>
      </div>
      <div
        role="presentation"
        onClick={set}
        style={{ aspectRatio: ratio }}
        className="relative mt-2 w-full cursor-crosshair overflow-hidden border border-border bg-concrete"
      >
        <img
          src={meta.url}
          alt={meta.alt}
          style={{ objectPosition: meta.focal }}
          className="h-full w-full object-cover"
        />
        <span
          style={{ left: `${x}%`, top: `${y}%` }}
          className="pointer-events-none absolute -ml-2 -mt-2 h-4 w-4 rounded-full border-2 border-arch-white bg-dragon shadow"
        />
      </div>
      <p className="mt-1 text-[11px] text-steel">
        Click the photo to set the focal point — preview each ratio to confirm the crop.
      </p>
    </div>
  );
}

function MetaFields({ meta, onChange }: { meta: ImageMeta; onChange: (m: ImageMeta) => void }) {
  return (
    <div className="mt-3 grid gap-2 sm:grid-cols-2">
      <label className="block">
        <span className="text-[10px] uppercase tracking-[0.25em] text-steel">Alt text (SEO / accessibility)</span>
        <input
          className="input mt-1"
          placeholder="Cat 395 mining excavator loading haul truck"
          value={meta.alt}
          onChange={(e) => onChange({ ...meta, alt: e.target.value })}
        />
      </label>
      <label className="block">
        <span className="text-[10px] uppercase tracking-[0.25em] text-steel">Caption (shown under image)</span>
        <input
          className="input mt-1"
          placeholder="Quarry deployment · Nakuru, Kenya"
          value={meta.caption}
          onChange={(e) => onChange({ ...meta, caption: e.target.value })}
        />
      </label>
    </div>
  );
}

/** Single image field: URL input, device upload, focal crop, alt text + caption. */
export function ImageField({
  value,
  onChange,
}: {
  value: ImageMeta;
  onChange: (meta: ImageMeta) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const meta = resolveImage(value);

  const pick = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    try {
      const url = await uploadFile(files[0]!);
      onChange({ ...meta, url });
      toast.success("Image uploaded.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = "";
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <input
          className="input flex-1"
          placeholder="https://… or upload"
          value={meta.url}
          onChange={(e) => onChange({ ...meta, url: e.target.value })}
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => ref.current?.click()}
          className="border border-charcoal px-4 py-2 text-[10px] uppercase tracking-[0.25em] disabled:opacity-60"
        >
          {busy ? "Uploading…" : "Upload"}
        </button>
      </div>
      <input ref={ref} type="file" accept="image/*" hidden onChange={(e) => pick(e.target.files)} />
      <FocalPicker meta={meta} onChange={(focal) => onChange({ ...meta, focal })} />
      <MetaFields meta={meta} onChange={onChange} />
    </div>
  );
}

/** Gallery field: multi-file upload, per-slide crop, alt text and caption. */
export function GalleryField({
  value,
  onChange,
}: {
  value: GalleryItem[];
  onChange: (items: ImageMeta[]) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const list: ImageMeta[] = (value ?? []).map((item) => resolveImage(item));

  const pick = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    try {
      const urls = await Promise.all(Array.from(files).map(uploadFile));
      onChange(
        [...list, ...urls.map((url) => resolveImage({ url }))].slice(0, 12),
      );
      toast.success(`${urls.length} image${urls.length > 1 ? "s" : ""} added.`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = "";
    }
  };

  const patch = (i: number, next: ImageMeta) => {
    const copy = [...list];
    copy[i] = next;
    onChange(copy);
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const copy = [...list];
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
    onChange(copy);
  };

  return (
    <div className="mt-3 space-y-3">
      {list.map((item, i) => (
        <div key={i} className="border border-border p-3">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
            {item.url ? (
              <img
                src={item.url}
                alt={item.alt}
                style={{ objectPosition: item.focal }}
                className="h-12 w-16 object-cover"
              />
            ) : (
              <div className="h-12 w-16 bg-concrete" />
            )}
            <input
              className="input"
              placeholder="https://…"
              value={item.url}
              onChange={(e) => patch(i, { ...item, url: e.target.value })}
            />
            <div className="flex gap-1">
              <button type="button" onClick={() => move(i, -1)} className="border border-border px-2 text-sm">↑</button>
              <button type="button" onClick={() => move(i, 1)} className="border border-border px-2 text-sm">↓</button>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="border border-border px-2 text-[10px] uppercase tracking-[0.2em]"
              >
                {open === i ? "Done" : "Crop & text"}
              </button>
              <button type="button" onClick={() => onChange(list.filter((_, j) => j !== i))} className="border border-border px-3 text-sm">×</button>
            </div>
          </div>
          {open === i && (
            <>
              <FocalPicker meta={item} onChange={(focal) => patch(i, { ...item, focal })} />
              <MetaFields meta={item} onChange={(next) => patch(i, next)} />
            </>
          )}
        </div>
      ))}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy || list.length >= 12}
          onClick={() => ref.current?.click()}
          className="border border-charcoal px-4 py-2 text-[11px] uppercase tracking-[0.25em] disabled:opacity-60"
        >
          {busy ? "Uploading…" : "Upload images"}
        </button>
        <button
          type="button"
          disabled={list.length >= 12}
          onClick={() => onChange([...list, resolveImage({ url: "" })])}
          className="border border-border px-4 py-2 text-[11px] uppercase tracking-[0.25em] disabled:opacity-60"
        >
          + Add URL
        </button>
      </div>
      <input ref={ref} type="file" accept="image/*" multiple hidden onChange={(e) => pick(e.target.files)} />
      <p className="text-[11px] text-steel">
        Pick multiple files to build the catalogue slideshow. Up to 12 images, reorder with the arrows, then set each
        slide's crop, alt text and caption.
      </p>
    </div>
  );
}
