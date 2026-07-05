import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listEnquiries, updateEnquiry } from "@/lib/enquiries.functions";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/enquiries")({
  component: EnquiriesPage,
});

const STATUSES = ["new", "contacted", "quoted", "closed"] as const;

function EnquiriesPage() {
  const list = useServerFn(listEnquiries);
  const update = useServerFn(updateEnquiry);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["enquiries"], queryFn: () => list() });
  const [openId, setOpenId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (input: { id: string; status: (typeof STATUSES)[number] }) => update({ data: input as never }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["enquiries"] });
      qc.invalidateQueries({ queryKey: ["analytics"] });
      toast.success("Status updated.");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Update failed."),
  });

  const open = data?.find((e) => e.id === openId);

  return (
    <div className="p-8 md:p-12">
      <div className="section-eyebrow">Trade Desk</div>
      <h1 className="text-display mt-3 text-4xl font-black">Enquiry inbox.</h1>

      <div className="mt-8 border border-border bg-arch-white">
        <table className="w-full text-sm">
          <thead className="bg-charcoal text-arch-white">
            <tr>
              <th className="p-3 text-left text-[10px] uppercase tracking-[0.25em]">Received</th>
              <th className="p-3 text-left text-[10px] uppercase tracking-[0.25em]">Name</th>
              <th className="p-3 text-left text-[10px] uppercase tracking-[0.25em]">Interest</th>
              <th className="p-3 text-left text-[10px] uppercase tracking-[0.25em]">Email</th>
              <th className="p-3 text-left text-[10px] uppercase tracking-[0.25em]">Status</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={6} className="p-6 text-center text-steel">Loading…</td></tr>}
            {data?.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-steel">No enquiries yet.</td></tr>}
            {data?.map((e) => (
              <tr key={e.id} className="border-t border-border hover:bg-concrete">
                <td className="p-3 text-steel">{new Date(e.created_at).toLocaleString()}</td>
                <td className="p-3 font-bold">{e.name}<div className="text-[11px] font-normal text-steel">{e.company || "—"}</div></td>
                <td className="p-3 text-graphite">{e.category_slug || "General"}<div className="text-[11px] text-steel">{e.machine_code || ""}</div></td>
                <td className="p-3"><a href={`mailto:${e.email}`} className="text-dragon hover:underline">{e.email}</a><div className="text-[11px] text-steel">{e.phone || ""}</div></td>
                <td className="p-3">
                  <select
                    value={e.status}
                    onChange={(ev) => mutation.mutate({ id: e.id, status: ev.target.value as (typeof STATUSES)[number] })}
                    className="border border-border bg-arch-white px-2 py-1 text-[11px] uppercase"
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="p-3 text-right">
                  <button onClick={() => setOpenId(e.id)} className="text-[11px] uppercase tracking-[0.2em] text-dragon hover:underline">View →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/70 p-4" onClick={() => setOpenId(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border bg-arch-white p-8" onClick={(e) => e.stopPropagation()}>
            <div className="section-eyebrow">Enquiry</div>
            <div className="text-display mt-2 text-2xl font-black">{open.name}</div>
            <div className="mt-1 text-sm text-steel">{new Date(open.created_at).toLocaleString()}</div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <Field label="Email" value={open.email} />
              <Field label="Phone" value={open.phone || "—"} />
              <Field label="Company" value={open.company || "—"} />
              <Field label="Category" value={open.category_slug || "—"} />
              <Field label="Machine" value={open.machine_name || "—"} />
              <Field label="Status" value={open.status} />
            </div>
            <div className="mt-6">
              <div className="section-eyebrow">Message</div>
              <p className="mt-2 whitespace-pre-wrap text-graphite">{open.message}</p>
            </div>
            <div className="mt-8 flex justify-end">
              <button onClick={() => setOpenId(null)} className="border border-charcoal px-5 py-2 text-[11px] uppercase tracking-[0.3em]">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-steel">{label}</div>
      <div className="mt-1 font-medium text-charcoal">{value}</div>
    </div>
  );
}
