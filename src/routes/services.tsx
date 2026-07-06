import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { FabricPattern } from "@/components/FabricPattern";
import craneAsset from "@/assets/crane.jpg.asset.json";
import factoryAsset from "@/assets/factory.jpg.asset.json";
import { toAbsoluteUrl } from "@/lib/site";
const crane = { url: toAbsoluteUrl(craneAsset.url) };
const factory = { url: toAbsoluteUrl(factoryAsset.url) };

const TITLE = "Services — Global Sourcing, Ocean Logistics & Inland Delivery | QianTron";
const DESC =
  "End-to-end machinery services: global sourcing, RoRo and container ocean freight, port clearance and inland delivery across Africa.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const steps = [
    "Global Sourcing",
    "Inspection",
    "Ocean Shipping",
    "Port Clearance",
    "Inland Transport",
    "Doorstep Delivery",
  ];
  return (
    <main className="min-h-screen bg-arch-white">
      <SiteNav />

      <section className="relative bg-charcoal py-32 pt-40 text-arch-white">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="section-eyebrow !text-dragon">Ecosystem</div>
          <h1 className="text-display mt-4 text-5xl font-black leading-[0.95] md:text-7xl">
            The complete<br />acquisition <span className="text-dragon">ecosystem.</span>
          </h1>
          <p className="text-editorial mt-8 max-w-2xl text-xl text-arch-white/80">
            Six disciplines. One accountable house. From the moment a unit is specified to the day it breaks ground on your site.
          </p>

          <div className="mt-14 grid grid-cols-2 gap-[1px] bg-arch-white/10 md:grid-cols-6">
            {steps.map((s, i) => (
              <div key={s} className="bg-charcoal p-6">
                <div className="text-editorial text-3xl text-dragon">{String(i + 1).padStart(2, "0")}</div>
                <div className="text-display mt-4 text-base font-bold">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-arch-white py-24 text-charcoal">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <div className="section-eyebrow">Global Sourcing</div>
            <h2 className="text-display mt-4 text-4xl font-black md:text-5xl">Tier-one origins.<br />Vetted every time.</h2>
            <p className="mt-6 text-[15px] leading-relaxed text-graphite">
              Direct relationships with OEMs across Asia, Europe and the Middle East. Every unit inspected, documented and dispatched under QianTron's own commissioning protocol.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="border border-border bg-concrete p-8 bg-blueprint">
              <div className="section-eyebrow">Shipping Corridor</div>
              <div className="mt-8 flex items-center justify-between">
                {["Shanghai", "Singapore", "Mombasa", "Site"].map((p, i, arr) => (
                  <div key={p} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rotate-45 border-2 border-dragon bg-arch-white" />
                      <div className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em]">{p}</div>
                    </div>
                    {i < arr.length - 1 && <div className="mx-3 flex-1 border-t border-dashed border-steel/50" />}
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-[11px] uppercase tracking-[0.2em] text-steel">
                <div>Loading · D+0</div>
                <div className="text-center">In-transit · D+18</div>
                <div className="text-right">Delivery · D+32</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-concrete py-24">
        <FabricPattern
          className="absolute -bottom-20 -right-20 h-[460px] w-[460px]"
          tone="steel" corner="br" rings={34} spacing={15} opacity={0.14} motion="drift" duration={30}
        />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="section-eyebrow">Port Clearance</div>
          <h2 className="text-display mt-3 text-4xl font-black md:text-5xl">Clearance, measured in <span className="text-dragon">hours.</span></h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { s: "Documentation", v: "98%", d: "Pre-filed HS codes" },
              { s: "Duty Assessment", v: "6 hrs", d: "Median clearance" },
              { s: "Inspection", v: "Green", d: "Trusted-trader lane" },
              { s: "Release", v: "24 hrs", d: "Port to gate-out" },
            ].map((c) => (
              <div key={c.s} className="border border-border bg-arch-white p-6">
                <div className="text-[10px] uppercase tracking-[0.3em] text-steel">{c.s}</div>
                <div className="text-display mt-4 text-3xl font-black text-dragon">{c.v}</div>
                <div className="mt-2 text-[12px] text-graphite">{c.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative overflow-hidden">
              <img src={crane.url} alt="Terminal crane" className="h-full min-h-[320px] w-full object-cover" />
            </div>
            <div className="border border-border bg-arch-white p-8">
              <div className="section-eyebrow">Inland Corridor</div>
              <div className="mt-6 space-y-5">
                {[
                  ["Mombasa Port", "Origin terminal"],
                  ["Nairobi Hub", "Escort handoff · +8 hrs"],
                  ["Kampala Cross", "Bond transit · +26 hrs"],
                  ["Site Delivery", "Commissioned · +48 hrs"],
                ].map(([p, d], i) => (
                  <div key={p} className="flex items-center gap-5">
                    <div className={`h-4 w-4 ${i === 3 ? "bg-dragon" : "border-2 border-dragon bg-arch-white"}`} />
                    <div className="flex-1">
                      <div className="text-display text-base font-bold">{p}</div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-steel">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-charcoal py-24 text-arch-white">
        <FabricPattern
          className="absolute bottom-[-4rem] left-[-4rem] h-[500px] w-[500px]"
          tone="dragon" corner="bl" rings={40} spacing={14} opacity={0.13} motion="breathe" duration={10}
        />
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <div className="section-eyebrow !text-dragon">RoRo Specialization</div>
            <h2 className="text-display mt-4 text-4xl font-black leading-[0.9] md:text-6xl">
              Oversized cargo,<br /><span className="text-dragon">delivered.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-arch-white/75">
              Roll-on Roll-off is not a service line — it is a discipline. Purpose-built vessels, drive-on stevedoring and factory-direct dispatch.
            </p>
          </div>
          <div className="md:col-span-7">
            <img src={factory.url} alt="Factory line" className="h-[360px] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-arch-white py-20 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h3 className="text-display text-3xl font-black md:text-4xl">Ready to specify a consignment?</h3>
          <Link to="/contact" className="mt-8 inline-block bg-dragon px-8 py-4 text-[12px] font-bold uppercase tracking-[0.3em] text-arch-white hover:bg-dragon-deep transition">
            Request a Quote
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
