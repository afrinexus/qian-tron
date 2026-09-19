import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { FabricPattern } from "@/components/FabricPattern";
import { fabric } from "@/lib/fabric-presets";
import { CATEGORIES } from "@/lib/site";
import { FocalImage } from "@/components/FocalImage";

const TITLE = "Machinery — Full Fleet Catalogue | QianTron";
const DESC =
  "Explore QianTron's full machinery catalogue: excavators, bulldozers, wheel loaders, motor graders, compaction rollers, industrial forklifts and heavy trucks.";

export const Route = createFileRoute("/machinery/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/machinery" },
    ],
    links: [{ rel: "canonical", href: "/machinery" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "QianTron Machinery Catalogue",
          itemListElement: CATEGORIES.map((c, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: c.name,
            url: `/machinery/${c.slug}`,
          })),
        }),
      },
    ],
  }),
  component: MachineryPage,
});

function MachineryPage() {
  return (
    <main className="min-h-screen bg-arch-white">
      <SiteNav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal py-32 pt-40 text-arch-white">
        <FabricPattern className="absolute -bottom-24 -right-24 h-[540px] w-[540px]" {...fabric("hero-gold")} />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="section-eyebrow !text-dragon">Volume MMXXV · Machinery Register</div>
          <h1 className="text-display mt-4 text-5xl font-black leading-[0.95] md:text-7xl">
            The full <span className="text-dragon">machinery</span> catalogue.
          </h1>
          <p className="text-editorial mt-8 max-w-2xl text-xl text-arch-white/80">
            Seven fleets. One accountable house. Select any tile to open its machinery-type page.
          </p>
        </div>
      </section>

      {/* Graphic tabs → dedicated type pages */}
      <section className="relative overflow-hidden bg-arch-white py-16">
        <FabricPattern className="absolute -bottom-16 -right-16 h-[440px] w-[440px]" {...fabric("editorial-bronze")} />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/machinery/$type"
                params={{ type: c.slug }}
                className="group relative overflow-hidden border border-border text-left transition hover:border-dragon"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
                  <FocalImage
                    image={{ url: c.hero, focal: c.heroFocal, alt: c.heroAlt, caption: c.heroCaption }}
                    fallbackAlt={c.name}
                    loading="lazy"
                    sizes="(min-width: 1024px) 14vw, (min-width: 640px) 25vw, 50vw"
                    className="h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                  <div className="absolute left-0 top-0 bg-charcoal/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-arch-white/80 group-hover:bg-dragon group-hover:text-arch-white">
                    {c.ref}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <div className="text-display text-sm font-black leading-tight text-arch-white">{c.name}</div>
                    <div className="mt-2 h-[2px] w-4 bg-arch-white/50 transition-all group-hover:w-10 group-hover:bg-dragon" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial index list */}
      <section className="relative overflow-hidden bg-concrete py-20">
        <FabricPattern className="absolute -bottom-16 left-[-4rem] h-[460px] w-[460px]" {...fabric("editorial-steel")} />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="section-eyebrow">Register Index</div>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/machinery/$type"
                params={{ type: c.slug }}
                className="group flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-baseline gap-5">
                  <span className="text-editorial text-2xl text-dragon">{c.ref}</span>
                  <span className="text-display text-2xl font-black transition group-hover:text-dragon md:text-3xl">
                    {c.name}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="max-w-md text-[13px] text-steel">{c.tagline}</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-charcoal transition group-hover:text-dragon">
                    {c.machines.length} Models →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
