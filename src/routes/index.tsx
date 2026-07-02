import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/logo.jpg.asset.json";
import factory from "@/assets/factory.jpg.asset.json";
import truckBlue from "@/assets/truck-blue.jpg.asset.json";
import hyundai from "@/assets/hyundai.jpg.asset.json";
import catBlack from "@/assets/cat-black.jpg.asset.json";
import jcb from "@/assets/jcb.jpg.asset.json";
import komatsu from "@/assets/komatsu.jpg.asset.json";
import volvo from "@/assets/volvo.jpg.asset.json";
import crane from "@/assets/crane.jpg.asset.json";
import truckRed from "@/assets/truck-red.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Profile,
  head: () => ({
    meta: [
      { property: "og:image", content: `https://id-preview--a5ba2d04-d8e9-4348-b889-2fd83e339241.lovable.app${jcb.url}` },
      { name: "twitter:image", content: `https://id-preview--a5ba2d04-d8e9-4348-b889-2fd83e339241.lovable.app${jcb.url}` },
    ],
  }),
});

/* ---------- Reusable primitives ---------- */

function PageMark({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="page-number">{n}</span>
      <span className="section-eyebrow">{label}</span>
    </div>
  );
}

function Hairline() {
  return <div className="hairline w-full" />;
}

/* ---------- Chrome ---------- */

function Nav() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-charcoal/80 backdrop-blur-xl border-b border-white/5">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <a href="#cover" className="flex items-center gap-3">
          <img src={logo.url} alt="QianTron" className="h-9 w-9 object-contain" />
          <span className="text-display text-arch-white text-sm font-black tracking-[0.3em]">QIANTRON</span>
        </a>
        <div className="hidden gap-8 text-[11px] font-medium uppercase tracking-[0.25em] text-arch-white/60 md:flex">
          <a href="#who" className="hover:text-dragon transition">Who</a>
          <a href="#services" className="hover:text-dragon transition">Services</a>
          <a href="#portfolio" className="hover:text-dragon transition">Portfolio</a>
          <a href="#logistics" className="hover:text-dragon transition">Logistics</a>
          <a href="#network" className="hover:text-dragon transition">Network</a>
          <a href="#contact" className="hover:text-dragon transition">Contact</a>
        </div>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 border border-dragon px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-arch-white hover:bg-dragon transition"
        >
          Request Quote
        </a>
      </div>
    </nav>
  );
}

/* ---------- Page 1: Cover ---------- */

function Cover() {
  return (
    <section id="cover" className="relative min-h-screen w-full overflow-hidden bg-charcoal text-arch-white">
      <img
        src={jcb.url}
        alt="Premium heavy machinery"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/40 to-charcoal" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-transparent to-charcoal/40" />

      <div className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col justify-between px-6 pt-28 pb-12 md:px-10">
        <div className="flex flex-col items-center text-center">
          <img src={logo.url} alt="QianTron dragon mark" className="h-28 w-28 object-contain drop-shadow-[0_0_30px_rgba(183,28,28,0.5)]" />
          <div className="mt-4 text-[10px] tracking-[0.5em] text-arch-white/50 uppercase">Corporate Profile · MMXXV</div>
        </div>

        <div className="max-w-4xl">
          <div className="section-eyebrow !text-dragon">Volume I — 2025 Edition</div>
          <h1 className="text-display mt-6 text-[15vw] font-black leading-[0.85] md:text-[9rem]">
            QIAN<span className="text-dragon">TRON</span>
          </h1>
          <p className="text-editorial mt-8 max-w-2xl text-xl text-arch-white/80 md:text-2xl">
            Premium Machinery. Seamless Logistics.<br />
            <span className="text-arch-white">Delivered to your doorstep.</span>
          </p>
        </div>

        <div className="flex items-end justify-between border-t border-arch-white/10 pt-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-arch-white/50">
            Africa's Premier Heavy Equipment Partner
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-arch-white/50">
            No. 01 / 16
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page 2: Brand Story ---------- */

function BrandStory() {
  return (
    <section className="relative bg-arch-white py-32 text-charcoal">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-10">
        <div className="relative md:col-span-5">
          <img
            src={logo.url}
            alt=""
            className="absolute -left-8 top-0 h-[420px] w-[420px] object-contain opacity-[0.06]"
          />
          <div className="relative">
            <PageMark n="02" label="Founder's Letter" />
            <div className="mt-10 h-[1px] w-16 bg-dragon" />
            <p className="text-editorial mt-10 text-3xl leading-[1.2] text-graphite md:text-4xl">
              "We do not simply move machinery. We deliver <span className="text-dragon">industrial certainty</span> — from the factory floor to the project site."
            </p>
            <div className="mt-8 text-[11px] uppercase tracking-[0.3em] text-steel">
              — Office of the Chairman
            </div>
          </div>
        </div>

        <div className="md:col-span-7 md:pl-16">
          <div className="section-eyebrow">Chapter One</div>
          <h2 className="text-display mt-4 text-5xl font-black md:text-6xl">
            A different kind of<br />machinery house.
          </h2>
          <Hairline />
          <div className="mt-10 grid grid-cols-1 gap-8 text-[15px] leading-relaxed text-graphite md:grid-cols-2">
            <p>
              QianTron was founded on a single conviction: that Africa's builders, miners and infrastructure operators deserve the same procurement discipline, engineering rigor and delivery certainty afforded to the world's largest industrial buyers.
            </p>
            <p>
              We operate at the intersection of global sourcing, ocean logistics and inland execution — a vertically integrated house that treats every excavator, prime mover and grader as a mission-critical asset from origin to deployment.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              ["120+", "Machinery units in-transit"],
              ["18", "Countries served"],
              ["24/7", "Logistics command"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="text-display text-4xl font-black text-dragon md:text-5xl">{k}</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-steel">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page 3: Who We Are ---------- */

function WhoWeAre() {
  return (
    <section id="who" className="relative bg-concrete py-32 text-charcoal bg-blueprint">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="relative overflow-hidden">
              <img src={volvo.url} alt="Volvo excavator on rock face" className="h-[620px] w-full object-cover" />
              <div className="absolute left-4 top-4 border border-arch-white/40 bg-charcoal/50 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-arch-white">
                Fleet · Reference 336E
              </div>
            </div>
          </div>
          <div className="md:col-span-5">
            <PageMark n="03" label="Who We Are" />
            <h2 className="text-display mt-8 text-5xl font-black leading-[0.95] md:text-6xl">
              Engineered<br />
              <span className="text-dragon">for scale.</span>
            </h2>
            <Hairline />
            <div className="mt-10 space-y-8">
              {[
                {
                  h: "Mission",
                  p: "To supply Africa's most ambitious builders with machinery, mobility and logistics excellence — delivered with the precision of a global trading house.",
                },
                {
                  h: "Vision",
                  p: "To become the definitive machinery infrastructure partner across the African continent by 2030.",
                },
                {
                  h: "Values",
                  p: "Precision. Integrity. Velocity. Every unit, every port, every kilometer of inland haul.",
                },
              ].map((b) => (
                <div key={b.h} className="border-l-2 border-dragon pl-5">
                  <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-graphite">{b.h}</div>
                  <p className="mt-2 text-[15px] leading-relaxed text-steel">{b.p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page 4: Services Overview ---------- */

function ServicesOverview() {
  const steps = [
    "Global Sourcing",
    "Inspection",
    "Ocean Shipping",
    "Port Clearance",
    "Inland Transport",
    "Doorstep Delivery",
  ];
  return (
    <section id="services" className="relative bg-charcoal py-32 text-arch-white">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <PageMark n="04" label="Ecosystem" />
            <h2 className="text-display mt-8 text-5xl font-black leading-[0.95] md:text-6xl">
              The complete<br />acquisition<br /><span className="text-dragon">ecosystem.</span>
            </h2>
            <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-arch-white/70">
              Six disciplines. One accountable house. From the moment a unit is specified to the day it breaks ground on your site.
            </p>
          </div>

          <div className="md:col-span-8">
            <div className="relative aspect-square max-w-[560px] mx-auto">
              {/* concentric rings */}
              <div className="absolute inset-0 rounded-full border border-arch-white/10" />
              <div className="absolute inset-[8%] rounded-full border border-arch-white/15" />
              <div className="absolute inset-[18%] rounded-full border border-dragon/40" />
              <div className="absolute inset-[32%] rounded-full border border-arch-white/10" />

              <div className="absolute inset-[36%] flex items-center justify-center rounded-full bg-gradient-to-br from-dragon to-dragon-deep shadow-[0_0_60px_rgba(183,28,28,0.4)]">
                <img src={logo.url} alt="" className="h-20 w-20 object-contain" />
              </div>

              {steps.map((s, i) => {
                const angle = (i / steps.length) * Math.PI * 2 - Math.PI / 2;
                const x = 50 + Math.cos(angle) * 47;
                const y = 50 + Math.sin(angle) * 47;
                return (
                  <div
                    key={s}
                    className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center border border-dragon bg-charcoal text-[11px] font-bold text-dragon">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-2 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] text-arch-white">
                      {s}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page 5: Machinery Portfolio ---------- */

function Portfolio() {
  const cats = [
    { name: "Excavators", ref: "EX", img: jcb.url },
    { name: "Bulldozers", ref: "BD", img: factory.url },
    { name: "Wheel Loaders", ref: "WL", img: hyundai.url },
    { name: "Motor Graders", ref: "GR", img: volvo.url },
    { name: "Compaction Rollers", ref: "CR", img: komatsu.url },
    { name: "Industrial Forklifts", ref: "FL", img: crane.url },
  ];
  return (
    <section id="portfolio" className="relative bg-arch-white py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-end justify-between">
          <div>
            <PageMark n="05" label="The Collection" />
            <h2 className="text-display mt-6 text-5xl font-black leading-[0.95] md:text-7xl">
              Machinery<br />portfolio.
            </h2>
          </div>
          <div className="hidden max-w-xs text-[13px] leading-relaxed text-steel md:block">
            Sourced from tier-one manufacturers. Each unit inspected, documented and dispatched under QianTron's own commissioning protocol.
          </div>
        </div>
        <Hairline />

        <div className="relative mt-12 overflow-hidden">
          <img src={jcb.url} alt="JCB excavator hero" className="h-[520px] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 text-arch-white">
            <div className="section-eyebrow !text-yellow-machine">Featured Series</div>
            <div className="text-display mt-2 text-4xl font-black">JCB 520X · Tracked</div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
          {cats.map((c, i) => (
            <article key={c.name} className="group relative overflow-hidden bg-concrete">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={c.img} alt={c.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="flex items-end justify-between p-5">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-steel">Series {c.ref}·0{i + 1}</div>
                  <div className="text-display mt-1 text-xl font-bold">{c.name}</div>
                </div>
                <div className="text-editorial text-3xl text-dragon">→</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Page 6: Heavy Trucks (dark) ---------- */

function HeavyTrucks() {
  return (
    <section className="relative bg-charcoal py-32 text-arch-white">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <PageMark n="06" label="Prime Movers" />
            <h2 className="text-display mt-8 text-6xl font-black leading-[0.9] md:text-7xl">
              Haulage,<br /><span className="text-dragon">reimagined.</span>
            </h2>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-arch-white/70">
              Heavy trucks and prime movers built for continental distances. Engineered cabins, rebuilt drivetrains, warranty-backed powertrains.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-arch-white/10 pt-6">
              {[
                ["600+ HP", "Prime mover class"],
                ["70T", "GCW capacity"],
                ["Euro V", "Emissions ready"],
                ["24 mo", "Powertrain warranty"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-display text-2xl font-bold text-gold">{k}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-arch-white/50">{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="relative overflow-hidden">
              <img src={truckBlue.url} alt="Prime mover" className="h-[640px] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
              <div className="absolute bottom-6 right-6 text-right">
                <div className="text-[10px] uppercase tracking-[0.3em] text-arch-white/60">Model Reference</div>
                <div className="text-display text-2xl font-black">Kenworth 3000·R</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <img src={truckRed.url} alt="Peterbilt on Route 66" className="h-[380px] w-full object-cover" />
          <div className="flex flex-col justify-center bg-gunmetal/50 p-10">
            <div className="section-eyebrow !text-yellow-machine">Editorial</div>
            <p className="text-editorial mt-6 text-2xl leading-snug text-arch-white/90">
              "A prime mover is not a truck. It is the artery through which every construction economy must flow."
            </p>
            <div className="mt-8 text-[11px] uppercase tracking-[0.3em] text-arch-white/50">QianTron Journal · Vol. II</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page 7: Global Logistics ---------- */

function GlobalLogistics() {
  return (
    <section id="logistics" className="relative bg-arch-white py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <PageMark n="07" label="Ocean & Air" />
            <h2 className="text-display mt-8 text-5xl font-black leading-[0.95] md:text-6xl">
              Global<br />movement<br /><span className="text-dragon">choreography.</span>
            </h2>
          </div>

          <div className="md:col-span-8">
            <div className="relative border border-border bg-concrete p-8 bg-blueprint">
              <div className="section-eyebrow">Shipping Corridor</div>
              <div className="text-display mt-4 text-2xl font-bold">Origin → Discharge</div>
              <div className="mt-10 flex items-center justify-between">
                {["Shanghai", "Singapore", "Mombasa", "Site"].map((p, i, arr) => (
                  <div key={p} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rotate-45 border-2 border-dragon bg-arch-white" />
                      <div className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em]">{p}</div>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="mx-3 flex-1 border-t border-dashed border-steel/50" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-[11px] uppercase tracking-[0.2em] text-steel">
                <div>Loading · D+0</div>
                <div className="text-center">In-transit · D+18</div>
                <div className="text-right">Delivery · D+32</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                ["RoRo Vessels", "Roll-on Roll-off specialists for tracked and wheeled equipment above 20T."],
                ["Container", "Flat-rack, open-top and 40ft HC for parts, attachments and mid-weight units."],
                ["Break-Bulk", "Purpose-arranged sailings for oversized and abnormal load consignments."],
              ].map(([h, p]) => (
                <div key={h} className="border-t-2 border-dragon pt-5">
                  <div className="text-display text-lg font-bold">{h}</div>
                  <p className="mt-3 text-[13px] leading-relaxed text-steel">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page 8: Port Clearance ---------- */

function PortClearance() {
  return (
    <section className="relative bg-concrete py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-end justify-between">
          <div>
            <PageMark n="08" label="Clearance Dashboard" />
            <h2 className="text-display mt-6 text-5xl font-black leading-[0.95] md:text-6xl">
              Clearance,<br />measured in <span className="text-dragon">hours.</span>
            </h2>
          </div>
          <div className="hidden text-right text-[11px] uppercase tracking-[0.3em] text-steel md:block">
            Live Ops Board · Draft
          </div>
        </div>
        <Hairline />

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            { s: "Documentation", v: "98%", d: "Pre-filed HS codes" },
            { s: "Duty Assessment", v: "6 hrs", d: "Median clearance" },
            { s: "Inspection", v: "Green", d: "Trusted-trader lane" },
            { s: "Release", v: "24 hrs", d: "Port to gate-out" },
          ].map((c) => (
            <div key={c.s} className="border border-border bg-arch-white p-6">
              <div className="text-[10px] uppercase tracking-[0.3em] text-steel">{c.s}</div>
              <div className="text-display mt-4 text-4xl font-black text-dragon">{c.v}</div>
              <div className="mt-2 text-[12px] text-graphite">{c.d}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="border border-border bg-arch-white p-8">
            <div className="section-eyebrow">Workflow</div>
            <ol className="mt-6 space-y-4">
              {[
                "Pre-arrival documentation lodgement",
                "Duty and levy calculation",
                "Customs assessment and release",
                "Terminal handling and gate-out",
                "Inland dispatch instruction",
              ].map((s, i) => (
                <li key={s} className="flex items-start gap-4 border-b border-border pb-3 last:border-0">
                  <span className="text-editorial text-2xl text-dragon">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[14px] text-graphite">{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative overflow-hidden">
            <img src={crane.url} alt="Terminal crane" className="h-full min-h-[380px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-arch-white">
              <div className="text-[10px] uppercase tracking-[0.3em] text-arch-white/70">Terminal Operations</div>
              <div className="text-display mt-1 text-2xl font-black">Break-bulk handling</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page 9: RoRo Specialization ---------- */

function RoRo() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-charcoal text-arch-white">
      <img src={factory.url} alt="Factory line of yellow bulldozers" className="absolute inset-0 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/60 to-transparent" />

      <div className="relative mx-auto grid min-h-[85vh] max-w-[1400px] grid-cols-1 items-center px-6 py-32 md:grid-cols-12 md:px-10">
        <div className="md:col-span-6">
          <PageMark n="09" label="RoRo Specialization" />
          <h2 className="text-display mt-8 text-6xl font-black leading-[0.85] md:text-8xl">
            Oversized<br />cargo,<br /><span className="text-dragon">delivered.</span>
          </h2>
          <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-arch-white/75">
            Roll-on Roll-off is not a service line — it is a discipline. Purpose-built vessels, drive-on stevedoring and factory-direct dispatch for the machinery Africa needs today.
          </p>
          <div className="mt-10 flex items-center gap-6">
            <div className="border-l-2 border-dragon pl-4">
              <div className="text-display text-3xl font-black text-yellow-machine">200+T</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-arch-white/50">Per unit tonnage</div>
            </div>
            <div className="border-l-2 border-dragon pl-4">
              <div className="text-display text-3xl font-black text-yellow-machine">14 days</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-arch-white/50">Sailing cycle</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page 10: Inland Delivery ---------- */

function InlandDelivery() {
  return (
    <section className="relative bg-arch-white py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <PageMark n="10" label="Last Mile" />
            <h2 className="text-display mt-8 text-5xl font-black leading-[0.95] md:text-6xl">
              Port to<br />project.<br /><span className="text-dragon">Doorstep certain.</span>
            </h2>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-steel">
              A dedicated inland corridor of low-loaders, escort vehicles and permit coordinators. We route around bottlenecks, not through them.
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="relative border border-border bg-concrete p-10 bg-blueprint">
              <div className="section-eyebrow">Inland Corridor Map</div>
              <div className="mt-8 space-y-6">
                {[
                  ["Mombasa Port", "Origin terminal"],
                  ["Nairobi Hub", "Escort handoff · +8 hrs"],
                  ["Kampala Cross", "Bond transit · +26 hrs"],
                  ["Site Delivery", "Commissioned · +48 hrs"],
                ].map(([p, d], i) => (
                  <div key={p} className="flex items-center gap-6">
                    <div className="flex flex-col items-center">
                      <div className={`h-4 w-4 ${i === 3 ? "bg-dragon" : "border-2 border-dragon bg-arch-white"}`} />
                      {i < 3 && <div className="mt-2 h-10 w-[1px] border-l border-dashed border-steel" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-display text-lg font-bold">{p}</div>
                      <div className="text-[11px] uppercase tracking-[0.25em] text-steel">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page 11: Why QianTron ---------- */

function WhyQianTron() {
  const pillars = [
    { k: "01", h: "Quality Assurance", p: "Third-party inspection, pre-shipment testing, and QianTron commissioning sign-off." },
    { k: "02", h: "Global Sourcing", p: "Direct relationships with tier-one OEMs and vetted secondary market channels." },
    { k: "03", h: "Fast Delivery", p: "Median lading-to-site cycle of 32 days across our primary corridors." },
    { k: "04", h: "Professional Logistics", p: "In-house freight forwarding, customs brokerage and inland execution." },
    { k: "05", h: "End-to-End", p: "One contract. One partner. One account manager for the life of the acquisition." },
  ];
  return (
    <section className="relative bg-concrete py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="max-w-3xl">
          <PageMark n="11" label="Why QianTron" />
          <h2 className="text-display mt-8 text-5xl font-black leading-[0.95] md:text-7xl">
            Five pillars.<br />One <span className="text-dragon">standard.</span>
          </h2>
        </div>
        <Hairline />

        <div className="mt-14 grid grid-cols-1 gap-[1px] bg-border md:grid-cols-5">
          {pillars.map((p) => (
            <div key={p.k} className="group flex flex-col justify-between bg-arch-white p-8 transition hover:bg-charcoal">
              <div>
                <div className="text-editorial text-5xl text-dragon">{p.k}</div>
                <div className="text-display mt-6 text-xl font-bold group-hover:text-arch-white">{p.h}</div>
              </div>
              <p className="mt-8 text-[13px] leading-relaxed text-steel group-hover:text-arch-white/70">{p.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Page 12: Industries Served ---------- */

function Industries() {
  const items = [
    { h: "Construction", img: jcb.url },
    { h: "Mining", img: komatsu.url },
    { h: "Infrastructure", img: crane.url },
    { h: "Agriculture", img: volvo.url },
    { h: "Government", img: catBlack.url },
    { h: "Logistics", img: truckBlue.url },
  ];
  return (
    <section className="relative bg-arch-white py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-end justify-between">
          <div>
            <PageMark n="12" label="Sectors" />
            <h2 className="text-display mt-6 text-5xl font-black md:text-6xl">Industries served.</h2>
          </div>
          <div className="hidden text-[11px] uppercase tracking-[0.3em] text-steel md:block">Six verticals · One partner</div>
        </div>
        <Hairline />

        <div className="mt-12 grid grid-cols-2 gap-[1px] bg-border md:grid-cols-3">
          {items.map((it, i) => (
            <div key={it.h} className="group relative overflow-hidden bg-charcoal aspect-[4/3]">
              <img src={it.img} alt={it.h} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:opacity-40 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
              <div className="relative flex h-full flex-col justify-between p-6 text-arch-white">
                <div className="text-editorial text-2xl text-dragon">0{i + 1}</div>
                <div>
                  <div className="text-display text-3xl font-black">{it.h}</div>
                  <div className="mt-2 h-[1px] w-8 bg-dragon" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Page 13: Case Study ---------- */

function CaseStudy() {
  return (
    <section className="relative bg-charcoal py-32 text-arch-white">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <PageMark n="13" label="Case Study" />
            <h2 className="text-display mt-8 text-5xl font-black leading-[0.95] md:text-6xl">
              From factory<br />to <span className="text-dragon">site.</span>
            </h2>
            <p className="mt-8 text-[13px] leading-relaxed text-arch-white/70">
              A 12-unit excavator consignment for a mining consortium in the East African corridor.
            </p>
          </div>
          <div className="md:col-span-8">
            <img src={factory.url} alt="Factory line" className="h-[360px] w-full object-cover" />
            <div className="mt-8 grid grid-cols-1 gap-[1px] bg-arch-white/10 md:grid-cols-4">
              {[
                ["Day 01", "Factory dispatch", "Shanghai"],
                ["Day 18", "Vessel arrival", "Mombasa"],
                ["Day 22", "Customs release", "KRA cleared"],
                ["Day 30", "Site commissioning", "Handover"],
              ].map(([d, s, l]) => (
                <div key={d} className="bg-charcoal p-6">
                  <div className="text-editorial text-3xl text-dragon">{d}</div>
                  <div className="text-display mt-3 text-lg font-bold">{s}</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-arch-white/50">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page 14: Global Network ---------- */

function GlobalNetwork() {
  return (
    <section id="network" className="relative bg-arch-white py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <PageMark n="14" label="Global Network" />
            <h2 className="text-display mt-8 text-5xl font-black leading-[0.95] md:text-6xl">
              A supply chain<br />built on the <span className="text-dragon">globe.</span>
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                ["Sourcing hubs", "12"],
                ["Ocean corridors", "6"],
                ["African ports", "9"],
                ["Inland routes", "22"],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-border pt-4">
                  <div className="text-display text-4xl font-black text-dragon">{v}</div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-steel">{k}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-border bg-concrete">
              <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full">
                <defs>
                  <pattern id="dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="#5E6468" opacity="0.3" />
                  </pattern>
                </defs>
                <rect width="800" height="500" fill="url(#dots)" />
                {/* Very abstract continents outline */}
                {[
                  [180, 200, 40], [260, 240, 55], [340, 300, 45], [420, 260, 65],
                  [520, 220, 40], [600, 180, 35], [560, 320, 50], [440, 380, 55],
                ].map(([cx, cy, r], i) => (
                  <circle key={i} cx={cx} cy={cy} r={r} fill="#5E6468" opacity="0.25" />
                ))}
                {/* Route arcs */}
                {[
                  ["M 600 180 Q 480 100 340 300", "shanghai-nairobi"],
                  ["M 260 240 Q 350 350 440 380", "eu-southern-africa"],
                  ["M 520 220 Q 460 260 420 260", "gulf-hub"],
                ].map(([d], i) => (
                  <path key={i} d={d} fill="none" stroke="#B71C1C" strokeWidth="1.5" strokeDasharray="4 4" />
                ))}
                {/* Nodes */}
                {[[600, 180], [340, 300], [420, 260], [440, 380], [260, 240], [520, 220]].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="6" fill="#B71C1C" />
                    <circle cx={x} cy={y} r="14" fill="none" stroke="#B71C1C" strokeWidth="1" opacity="0.4" />
                  </g>
                ))}
              </svg>
              <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.3em] text-steel">
                Network map · schematic
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page 15: Future Infrastructure ---------- */

function Future() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-charcoal text-arch-white">
      <img src={hyundai.url} alt="Row of premium excavators" className="absolute inset-0 h-full w-full object-cover opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/60 to-charcoal" />

      <div className="relative mx-auto flex min-h-[85vh] max-w-[1400px] flex-col justify-center px-6 py-32 md:px-10">
        <PageMark n="15" label="The Horizon" />
        <h2 className="text-display mt-8 max-w-5xl text-6xl font-black leading-[0.85] md:text-[8rem]">
          Building<br /><span className="text-dragon">Africa's</span> future.
        </h2>
        <p className="text-editorial mt-10 max-w-2xl text-2xl leading-snug text-arch-white/85">
          Ports, rails, cities, mines and highways. Every unit we deliver is a foundation stone of the continent that will be.
        </p>
      </div>
    </section>
  );
}

/* ---------- Page 16: Back Cover / Contact ---------- */

function BackCover() {
  return (
    <section id="contact" className="relative bg-graphite text-arch-white">
      <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-10">
        <div className="flex flex-col items-center text-center">
          <img src={logo.url} alt="QianTron" className="h-40 w-40 object-contain drop-shadow-[0_0_50px_rgba(183,28,28,0.4)]" />
          <h2 className="text-display mt-10 text-6xl font-black tracking-[0.15em] md:text-8xl">
            QIAN<span className="text-dragon">TRON</span>
          </h2>
          <div className="mt-8 h-[1px] w-24 bg-dragon" />
          <p className="text-editorial mt-8 max-w-3xl text-2xl leading-snug text-arch-white/85">
            Powering Construction, Infrastructure, Logistics and Industry Across Africa.
          </p>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-10 border-t border-arch-white/10 pt-10 md:grid-cols-4">
          {[
            ["Head Office", "Nairobi · Kenya"],
            ["Sourcing", "Shanghai · Guangzhou"],
            ["Contact", "trade@qiantron.co"],
            ["Voice", "+254 000 000 000"],
          ].map(([h, v]) => (
            <div key={h}>
              <div className="text-[10px] uppercase tracking-[0.3em] text-arch-white/50">{h}</div>
              <div className="text-display mt-3 text-lg font-bold">{v}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-arch-white/10 pt-8 text-[10px] uppercase tracking-[0.3em] text-arch-white/40 md:flex-row">
          <div>© MMXXV QianTron · All Rights Reserved</div>
          <div>Corporate Profile · Volume I · 16 of 16</div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Root ---------- */

function Profile() {
  return (
    <main className="min-h-screen bg-arch-white">
      <Nav />
      <Cover />
      <BrandStory />
      <WhoWeAre />
      <ServicesOverview />
      <Portfolio />
      <HeavyTrucks />
      <GlobalLogistics />
      <PortClearance />
      <RoRo />
      <InlandDelivery />
      <WhyQianTron />
      <Industries />
      <CaseStudy />
      <GlobalNetwork />
      <Future />
      <BackCover />
    </main>
  );
}
