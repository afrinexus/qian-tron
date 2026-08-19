import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const BUCKET = "catalog-media";

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

/** Single image field: URL input + device file picker upload. */
export function ImageField({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const pick = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    try {
      const url = await uploadFile(files[0]!);
      onChange(url);
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
        <input className="input flex-1" placeholder="https://… or upload" value={value} onChange={(e) => onChange(e.target.value)} />
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
      {value ? <img src={value} alt="" className="mt-2 h-20 w-full object-cover" /> : null}
    </div>
  );
}

/** Gallery field: pick several device files at once to build the slideshow. */
export function GalleryField({ value, onChange }: { value: string[]; onChange: (urls: string[]) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const list = value ?? [];

  const pick = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    try {
      const urls = await Promise.all(Array.from(files).map(uploadFile));
      onChange([...list, ...urls].slice(0, 12));
      toast.success(`${urls.length} image${urls.length > 1 ? "s" : ""} added.`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = "";
    }
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const copy = [...list];
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
    onChange(copy);
  };

  return (
    <div className="mt-3 space-y-2">
      {list.map((url, i) => (
        <div key={i} className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
          {url ? <img src={url} alt="" className="h-12 w-16 object-cover" /> : <div className="h-12 w-16 bg-concrete" />}
          <input
            className="input"
            placeholder="https://…"
            value={url}
            onChange={(e) => {
              const copy = [...list];
              copy[i] = e.target.value;
              onChange(copy);
            }}
          />
          <div className="flex gap-1">
            <button type="button" onClick={() => move(i, -1)} className="border border-border px-2 text-sm">↑</button>
            <button type="button" onClick={() => move(i, 1)} className="border border-border px-2 text-sm">↓</button>
            <button type="button" onClick={() => onChange(list.filter((_, j) => j !== i))} className="border border-border px-3 text-sm">×</button>
          </div>
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
          onClick={() => onChange([...list, ""])}
          className="border border-border px-4 py-2 text-[11px] uppercase tracking-[0.25em] disabled:opacity-60"
        >
          + Add URL
        </button>
      </div>
      <input ref={ref} type="file" accept="image/*" multiple hidden onChange={(e) => pick(e.target.files)} />
      <p className="text-[11px] text-steel">Pick multiple files to build the catalogue slideshow. Up to 12 images, reorder with the arrows.</p>
    </div>
  );
}
