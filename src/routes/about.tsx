import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import logo from "@/assets/logo-new.png.asset.json";
import volvo from "@/assets/volvo.jpg.asset.json";
import jcb from "@/assets/jcb.jpg.asset.json";
import komatsu from "@/assets/komatsu.jpg.asset.json";
import crane from "@/assets/crane.jpg.asset.json";
import catBlack from "@/assets/cat-black.jpg.asset.json";
import truckBlue from "@/assets/truck-blue.jpg.asset.json";

const TITLE = "About QianTron — Global Sourcing & Machinery Delivery Partner";
const DESC =
  "QianTron is Africa's premier heavy equipment sourcing, logistics and delivery house. Our story, mission and network.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const industries = [
    { h: "Construction", img: jcb.url },
    { h: "Mining", img: komatsu.url },
    { h: "Infrastructure", img: crane.url },
    { h: "Agriculture", img: volvo.url },
    { h: "Government", img: catBlack.url },
    { h: "Logistics", img: truckBlue.url },
  ];
  return (
    <main className="min-h-screen bg-arch-white">
      <SiteNav />

      <section className="relative bg-arch-white py-32 pt-40 text-charcoal">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-10">
          <div className="relative md:col-span-5">
            <img src={logo.url} alt="" className="absolute -left-8 top-0 h-[380px] w-[380px] object-contain opacity-[0.07]" />
            <div className="relative">
              <div className="section-eyebrow">Founder's Letter</div>
              <div className="mt-8 h-[1px] w-16 bg-dragon" />
              <p className="text-editorial mt-8 text-3xl leading-[1.2] text-graphite md:text-4xl">
                "We do not simply move machinery. We deliver <span className="text-dragon">industrial certainty</span> — from the factory floor to the project site."
              </p>
              <div className="mt-6 text-[11px] uppercase tracking-[0.3em] text-steel">— Office of the Chairman</div>
            </div>
          </div>
          <div className="md:col-span-7 md:pl-12">
            <div className="section-eyebrow">Chapter One</div>
            <h1 className="text-display mt-4 text-5xl font-black md:text-6xl">A different kind of<br />machinery house.</h1>
            <div className="hairline w-full mt-6" />
            <div className="mt-8 grid grid-cols-1 gap-6 text-[15px] leading-relaxed text-graphite md:grid-cols-2">
              <p>
                QianTron was founded on a single conviction: that Africa's builders, miners and infrastructure operators deserve the same procurement discipline and delivery certainty afforded to the world's largest industrial buyers.
              </p>
              <p>
                We operate at the intersection of <strong>global sourcing</strong>, ocean logistics and inland execution — a vertically integrated house that treats every unit as mission-critical from origin to deployment.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                ["120+", "Units in-transit"],
                ["18", "Countries served"],
                ["24/7", "Logistics command"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-display text-3xl font-black text-dragon md:text-4xl">{k}</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-steel">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-concrete py-24 bg-blueprint text-charcoal">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 md:grid-cols-3 md:px-10">
          {[
            { h: "Mission", p: "To supply Africa's most ambitious builders with machinery, mobility and logistics excellence — delivered with the precision of a global trading house." },
            { h: "Vision", p: "To become the definitive machinery infrastructure partner across the African continent by 2030." },
            { h: "Values", p: "Precision. Integrity. Velocity. Every unit, every port, every kilometer of inland haul." },
          ].map((b) => (
            <div key={b.h} className="border-l-2 border-dragon pl-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-graphite">{b.h}</div>
              <p className="mt-3 text-[15px] leading-relaxed text-steel">{b.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-arch-white py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="section-eyebrow">Sectors</div>
          <h2 className="text-display mt-3 text-4xl font-black md:text-5xl">Industries served.</h2>
          <div className="mt-10 grid grid-cols-2 gap-[1px] bg-border md:grid-cols-3">
            {industries.map((it, i) => (
              <div key={it.h} className="group relative overflow-hidden bg-charcoal aspect-[4/3]">
                <img src={it.img} alt={it.h} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:opacity-40 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
                <div className="relative flex h-full flex-col justify-between p-6 text-arch-white">
                  <div className="text-editorial text-2xl text-dragon">0{i + 1}</div>
                  <div>
                    <div className="text-display text-2xl font-black">{it.h}</div>
                    <div className="mt-2 h-[1px] w-8 bg-dragon" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-arch-white pb-20 text-center">
        <Link to="/services" className="inline-block border border-dragon px-8 py-4 text-[12px] font-bold uppercase tracking-[0.3em] text-dragon hover:bg-dragon hover:text-arch-white transition">
          See our services →
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
