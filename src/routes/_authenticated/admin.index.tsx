import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { analyticsSummary } from "@/lib/analytics.functions";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Overview,
});

function Overview() {
  const fn = useServerFn(analyticsSummary);
  const { data, isLoading } = useQuery({ queryKey: ["analytics"], queryFn: () => fn() });

  return (
    <div className="p-8 md:p-12">
      <div className="section-eyebrow">Admin</div>
      <h1 className="text-display mt-3 text-4xl font-black">Operations overview.</h1>
      <p className="mt-2 text-steel">Last 30 days of pageviews and lifetime enquiry status.</p>

      {isLoading || !data ? (
        <div className="mt-10 text-steel">Loading metrics…</div>
      ) : (
        <>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-6">
            <Stat label="Pageviews (30d)" value={data.totalViews} />
            <Stat label="Enquiries" value={data.totalEnquiries} />
            <Stat label="New" value={data.enquiryCounts.new ?? 0} accent />
            <Stat label="Contacted" value={data.enquiryCounts.contacted ?? 0} />
            <Stat label="Quoted" value={data.enquiryCounts.quoted ?? 0} />
            <Stat label="Closed" value={data.enquiryCounts.closed ?? 0} />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="border border-border bg-arch-white p-6 lg:col-span-2">
              <div className="section-eyebrow">Traffic · 30 days</div>
              <div className="mt-6 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.daily}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--concrete)" />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="var(--dragon)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="border border-border bg-arch-white p-6">
              <div className="section-eyebrow">Top pages</div>
              <ul className="mt-6 divide-y divide-border">
                {data.topPaths.length === 0 && <li className="py-3 text-sm text-steel">No traffic yet.</li>}
                {data.topPaths.map((p) => (
                  <li key={p.path} className="flex items-center justify-between py-3 text-sm">
                    <span className="truncate text-graphite">{p.path}</span>
                    <span className="text-display font-bold text-dragon">{p.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`border ${accent ? "border-dragon" : "border-border"} bg-arch-white p-5`}>
      <div className="text-[10px] uppercase tracking-[0.3em] text-steel">{label}</div>
      <div className={`text-display mt-3 text-3xl font-black ${accent ? "text-dragon" : "text-charcoal"}`}>{value}</div>
    </div>
  );
}
