import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listCatalog, updateMachine, updateCategory } from "@/lib/cms.functions";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/machinery")({
  component: MachineryCMS,
});

type Machine = {
  id: string; category_id: string; code: string; name: string;
  tag: string; image: string; sort_order: number;
  specs: { k: string; v: string }[];
};
type Category = {
  id: string; slug: string; name: string; ref: string;
  tagline: string; intro: string; hero_image: string;
};

function MachineryCMS() {
  const load = useServerFn(listCatalog);
  const patchMachine = useServerFn(updateMachine);
  const patchCategory = useServerFn(updateCategory);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ["catalog"], queryFn: () => load() });
  const [editMachine, setEditMachine] = useState<Machine | null>(null);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const mMut = useMutation({
    mutationFn: (m: Machine) => patchMachine({ data: {
      id: m.id, name: m.name, tag: m.tag, image: m.image,
      sort_order: m.sort_order, specs: m.specs,
    } as never }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["catalog"] }); toast.success("Machine saved."); setEditMachine(null); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Save failed."),
  });
  const cMut = useMutation({
    mutationFn: (c: Category) => patchCategory({ data: {
      id: c.id, name: c.name, tagline: c.tagline, intro: c.intro, hero_image: c.hero_image,
    } as never }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["catalog"] }); toast.success("Category saved."); setEditCategory(null); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Save failed."),
  });

  if (isLoading || !data) return <div className="p-12 text-steel">Loading catalog…</div>;

  return (
    <div className="p-8 md:p-12">
      <div className="section-eyebrow">Catalog</div>
      <h1 className="text-display mt-3 text-4xl font-black">Machinery CMS.</h1>
      <p className="mt-2 max-w-2xl text-sm text-steel">
        Edit categories and individual machines. Changes save to Lovable Cloud and are immediately available to the enquiry pipeline.
      </p>

      <div className="mt-10 space-y-10">
        {data.categories.map((c) => {
          const cat = c as Category;
          const machines = data.machines.filter((m) => m.category_id === cat.id).map((m) => ({ ...m, specs: (m.specs as unknown as { k: string; v: string }[]) ?? [] })) as Machine[];
          return (
            <section key={cat.id} className="border border-border bg-arch-white">
              <header className="flex items-center justify-between border-b border-border p-5">
                <div className="flex items-center gap-4">
                  <img src={cat.hero_image} alt="" className="h-14 w-20 object-cover" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-steel">Series {cat.ref}</div>
                    <div className="text-display text-xl font-black">{cat.name}</div>
                    <div className="text-[12px] text-steel">{cat.tagline}</div>
                  </div>
                </div>
                <button onClick={() => setEditCategory(cat)} className="border border-charcoal px-4 py-2 text-[10px] uppercase tracking-[0.3em] hover:bg-charcoal hover:text-arch-white">Edit category</button>
              </header>
              <table className="w-full text-sm">
                <thead className="bg-concrete">
                  <tr>
                    <th className="p-3 text-left text-[10px] uppercase tracking-[0.25em] text-steel">Code</th>
                    <th className="p-3 text-left text-[10px] uppercase tracking-[0.25em] text-steel">Name</th>
                    <th className="p-3 text-left text-[10px] uppercase tracking-[0.25em] text-steel">Tag</th>
                    <th className="p-3 text-left text-[10px] uppercase tracking-[0.25em] text-steel">Specs</th>
                    <th className="p-3" />
                  </tr>
                </thead>
                <tbody>
                  {machines.map((m) => (
                    <tr key={m.id} className="border-t border-border">
                      <td className="p-3 font-mono text-xs">{m.code}</td>
                      <td className="p-3 font-bold">{m.name}</td>
                      <td className="p-3 text-graphite">{m.tag}</td>
                      <td className="p-3 text-[11px] text-steel">{m.specs.map((s) => `${s.k} ${s.v}`).join(" · ")}</td>
                      <td className="p-3 text-right">
                        <button onClick={() => setEditMachine(m)} className="text-[11px] uppercase tracking-[0.2em] text-dragon hover:underline">Edit →</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          );
        })}
      </div>

      {editMachine && (
        <MachineDrawer m={editMachine} onClose={() => setEditMachine(null)} onSave={(m) => mMut.mutate(m)} saving={mMut.isPending} />
      )}
      {editCategory && (
        <CategoryDrawer c={editCategory} onClose={() => setEditCategory(null)} onSave={(c) => cMut.mutate(c)} saving={cMut.isPending} />
      )}
    </div>
  );
}

function Drawer({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/70 p-4" onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border bg-arch-white p-8" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

function MachineDrawer({ m, onClose, onSave, saving }: { m: Machine; onClose: () => void; onSave: (m: Machine) => void; saving: boolean }) {
  const [state, setState] = useState<Machine>(m);
  return (
    <Drawer onClose={onClose}>
      <div className="section-eyebrow">Machine · {state.code}</div>
      <div className="text-display mt-2 text-2xl font-black">Edit machine</div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <Field label="Name"><input className="input" value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} /></Field>
        <Field label="Tag"><input className="input" value={state.tag} onChange={(e) => setState({ ...state, tag: e.target.value })} /></Field>
        <Field label="Sort order"><input type="number" className="input" value={state.sort_order} onChange={(e) => setState({ ...state, sort_order: Number(e.target.value) })} /></Field>
        <Field label="Image URL"><input className="input" value={state.image} onChange={(e) => setState({ ...state, image: e.target.value })} /></Field>
      </div>
      <div className="mt-6">
        <div className="section-eyebrow">Specs</div>
        <div className="mt-3 space-y-2">
          {state.specs.map((s, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <input className="input" placeholder="Value (e.g. 22T)" value={s.k} onChange={(e) => {
                const copy = [...state.specs]; copy[i] = { ...s, k: e.target.value }; setState({ ...state, specs: copy });
              }} />
              <input className="input" placeholder="Label (e.g. Weight)" value={s.v} onChange={(e) => {
                const copy = [...state.specs]; copy[i] = { ...s, v: e.target.value }; setState({ ...state, specs: copy });
              }} />
              <button onClick={() => setState({ ...state, specs: state.specs.filter((_, j) => j !== i) })} className="border border-border px-3 text-sm">×</button>
            </div>
          ))}
          <button onClick={() => setState({ ...state, specs: [...state.specs, { k: "", v: "" }] })} className="border border-border px-4 py-2 text-[11px] uppercase tracking-[0.25em]">+ Add spec</button>
        </div>
      </div>
      <div className="mt-8 flex justify-end gap-3">
        <button onClick={onClose} className="border border-border px-5 py-2 text-[11px] uppercase tracking-[0.3em]">Cancel</button>
        <button disabled={saving} onClick={() => onSave(state)} className="bg-dragon px-5 py-2 text-[11px] uppercase tracking-[0.3em] text-arch-white disabled:opacity-60">{saving ? "Saving…" : "Save"}</button>
      </div>
      <style>{`.input{border:1px solid var(--border);background:white;padding:.5rem .75rem;font-size:14px;width:100%}.input:focus{outline:none;border-color:var(--dragon)}`}</style>
    </Drawer>
  );
}

function CategoryDrawer({ c, onClose, onSave, saving }: { c: Category; onClose: () => void; onSave: (c: Category) => void; saving: boolean }) {
  const [state, setState] = useState<Category>(c);
  return (
    <Drawer onClose={onClose}>
      <div className="section-eyebrow">Category · {state.slug}</div>
      <div className="text-display mt-2 text-2xl font-black">Edit category</div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <Field label="Name"><input className="input" value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} /></Field>
        <Field label="Hero image URL"><input className="input" value={state.hero_image} onChange={(e) => setState({ ...state, hero_image: e.target.value })} /></Field>
      </div>
      <div className="mt-4">
        <Field label="Tagline"><input className="input" value={state.tagline} onChange={(e) => setState({ ...state, tagline: e.target.value })} /></Field>
      </div>
      <div className="mt-4">
        <Field label="Intro"><textarea rows={4} className="input" value={state.intro} onChange={(e) => setState({ ...state, intro: e.target.value })} /></Field>
      </div>
      <div className="mt-8 flex justify-end gap-3">
        <button onClick={onClose} className="border border-border px-5 py-2 text-[11px] uppercase tracking-[0.3em]">Cancel</button>
        <button disabled={saving} onClick={() => onSave(state)} className="bg-dragon px-5 py-2 text-[11px] uppercase tracking-[0.3em] text-arch-white disabled:opacity-60">{saving ? "Saving…" : "Save"}</button>
      </div>
      <style>{`.input{border:1px solid var(--border);background:white;padding:.5rem .75rem;font-size:14px;width:100%}.input:focus{outline:none;border-color:var(--dragon)}`}</style>
    </Drawer>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.3em] text-steel">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
