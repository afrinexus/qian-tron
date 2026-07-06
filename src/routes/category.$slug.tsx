import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { Category } from "@/lib/site";
import { CATEGORIES, CONTACT, categoryBySlug } from "@/lib/site";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { SquareCanvas } from "@/components/SquareCanvas";
import { FabricPattern } from "@/components/FabricPattern";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = categoryBySlug(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.category;
    const title = c ? `${c.name} — QianTron Machinery` : "QianTron Machinery";
    const desc = c
      ? `${c.tagline} ${c.intro}`
      : "Premium heavy machinery for Africa's builders, miners and infrastructure operators.";

    const scripts = c
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: `${c.name} — QianTron`,
              itemListElement: c.machines.map((m, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "Product",
                  name: m.name,
                  sku: m.code,
                  image: m.image,
                  category: c.name,
                  brand: { "@type": "Brand", name: "QianTron" },
                },
              })),
            }),
          },
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                { "@type": "ListItem", position: 2, name: "Machinery", item: "/services" },
                { "@type": "ListItem", position: 3, name: c.name, item: `/category/${c.slug}` },
              ],
            }),
          },
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "QianTron",
              url: "/",
            }),
          },
        ]
      : [];

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: c ? `/category/${c.slug}` : "/" },
        ...(c ? [{ property: "og:image", content: c.hero }, { name: "twitter:image", content: c.hero }] : []),
      ],
      links: [{ rel: "canonical", href: c ? `/category/${c.slug}` : "/" }],
      scripts,
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-arch-white">
      <div className="text-center">
        <div className="text-display text-6xl font-black text-dragon">404</div>
        <div className="mt-2 text-steel">Category not found.</div>
        <Link to="/" className="mt-6 inline-block border border-dragon px-4 py-2 text-[11px] uppercase tracking-[0.25em]">
          Back home
        </Link>
      </div>
    </div>
  ),
});

function CategoryPage() {
  const { category: c } = Route.useLoaderData() as { category: Category };
  const others = CATEGORIES.filter((x) => x.slug !== c.slug).slice(0, 4);

  return (
    <main className="min-h-screen bg-arch-white">
      <SiteNav />

      {/* Hero */}
      <section className="relative min-h-[85vh] overflow-hidden bg-charcoal text-arch-white">
        <img src={c.hero} alt={c.name} className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/20" />
        <SquareCanvas className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />
        <div className="relative mx-auto flex min-h-[85vh] max-w-[1400px] flex-col justify-end px-6 pb-20 pt-32 md:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 text-[10px] uppercase tracking-[0.3em] text-arch-white/60">
            <Link to="/" className="hover:text-dragon">Home</Link>
            <span className="mx-2 text-arch-white/30">/</span>
            <Link to="/services" className="hover:text-dragon">Machinery</Link>
            <span className="mx-2 text-arch-white/30">/</span>
            <span className="text-dragon">{c.name}</span>
          </nav>
          <div className="section-eyebrow !text-dragon">Series {c.ref} · Volume MMXXV</div>
          <h1 className="text-display mt-4 text-6xl font-black leading-[0.9] md:text-8xl">{c.name}</h1>
          <p className="text-editorial mt-6 max-w-2xl text-2xl text-arch-white/85">{c.tagline}</p>
          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-arch-white/15 pt-6">
            {c.highlights.map((h) => (
              <div key={h.k} className="flex items-baseline gap-3">
                <div className="text-display text-2xl font-black text-dragon">{h.k}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-arch-white/60">{h.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Polished Intro */}
      <section className="relative overflow-hidden bg-arch-white py-28 text-charcoal">
        <FabricPattern
          className="absolute -bottom-20 -right-16 h-[480px] w-[480px]"
          tone="bronze" corner="br" rings={34} spacing={17} opacity={0.15} motion="drift" duration={30}
        />
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <div className="section-eyebrow">Chapter I</div>
            <div className="text-display mt-3 text-5xl font-black leading-[0.95] md:text-6xl">
              The <span className="text-dragon">{c.name}</span> Register.
            </div>
            <div className="mt-8 h-[1px] w-16 bg-dragon" />
            <div className="text-editorial mt-6 text-sm uppercase tracking-[0.3em] text-steel">
              Vol. {c.ref} · {c.machines.length} Models Registered
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="text-editorial text-2xl leading-snug text-graphite md:text-3xl">{c.intro}</p>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <div className="section-eyebrow">Typical Applications</div>
                <ul className="mt-4 space-y-2">
                  {c.applications.map((a) => (
                    <li key={a} className="flex items-center gap-3 border-b border-border pb-2 text-[14px] text-graphite">
                      <span className="h-2 w-2 rotate-45 bg-dragon" /> {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="section-eyebrow">Sourcing Standard</div>
                <ul className="mt-4 space-y-2 text-[14px] text-graphite">
                  <li className="flex items-center gap-3 border-b border-border pb-2">
                    <span className="h-2 w-2 bg-dragon" /> Pre-shipment inspection
                  </li>
                  <li className="flex items-center gap-3 border-b border-border pb-2">
                    <span className="h-2 w-2 bg-dragon" /> Origin: EU · Japan · China Tier-1
                  </li>
                  <li className="flex items-center gap-3 border-b border-border pb-2">
                    <span className="h-2 w-2 bg-dragon" /> RoRo & container shipping
                  </li>
                  <li className="flex items-center gap-3 border-b border-border pb-2">
                    <span className="h-2 w-2 bg-dragon" /> Doorstep commissioning
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Machinery Cards */}
      <section className="relative bg-concrete py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex items-end justify-between">
            <div>
              <div className="section-eyebrow">Chapter II</div>
              <h2 className="text-display mt-3 text-4xl font-black leading-[0.95] md:text-6xl">
                The Register.
              </h2>
            </div>
            <div className="hidden text-[11px] uppercase tracking-[0.3em] text-steel md:block">
              {c.machines.length} models · specify to enquire
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {c.machines.map((m, idx) => (
              <Link
                key={m.code}
                to="/category/$slug/$machine"
                params={{ slug: c.slug, machine: m.code.toLowerCase() }}
                className="group relative flex flex-col overflow-hidden border border-border bg-arch-white transition hover:border-dragon"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute left-0 top-0 bg-dragon px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-arch-white">
                    {m.code}
                  </div>
                  <div className="absolute bottom-0 right-0 bg-charcoal/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-arch-white/90 backdrop-blur">
                    {m.tag}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-steel">Model No. {String(idx + 1).padStart(2, "0")}</div>
                    <div className="text-editorial text-xl text-dragon">/{c.ref}</div>
                  </div>
                  <h3 className="text-display mt-2 text-2xl font-black leading-tight">{m.name}</h3>
                  <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-4">
                    {m.specs.map((s) => (
                      <div key={s.k} className="border-l-2 border-dragon pl-2">
                        <div className="text-display text-base font-black text-charcoal">{s.k}</div>
                        <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-steel">{s.v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-[11px] font-bold uppercase tracking-[0.3em] text-charcoal transition group-hover:text-dragon">
                    <span>View Specification</span>
                    <span className="text-lg transition group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reference Fleet */}
      <section className="bg-arch-white py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="section-eyebrow">Reference Fleet</div>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {c.gallery.map((img, i) => (
              <div key={i} className="relative overflow-hidden">
                <img src={img} alt={`${c.name} reference ${i + 1}`} className="aspect-[4/3] w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal py-20 text-arch-white">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 px-6 text-center md:flex-row md:px-10 md:text-left">
          <div>
            <div className="section-eyebrow !text-dragon">Request Quote</div>
            <div className="text-display mt-3 text-3xl font-black md:text-4xl">
              Specify your {c.name.toLowerCase()} programme.
            </div>
          </div>
          <a
            href={`${CONTACT.emailHref}?subject=${encodeURIComponent(`Enquiry: ${c.name}`)}`}
            className="bg-dragon px-8 py-4 text-[12px] font-bold uppercase tracking-[0.3em] text-arch-white hover:bg-dragon-deep transition"
          >
            Contact QianTron →
          </a>
        </div>
      </section>

      {/* Related */}
      <section className="bg-concrete py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex items-end justify-between">
            <div>
              <div className="section-eyebrow">Also in the Collection</div>
              <h2 className="text-display mt-3 text-4xl font-black md:text-5xl">Explore other machinery.</h2>
            </div>
            <Link to="/" className="hidden text-[11px] uppercase tracking-[0.3em] text-dragon hover:underline md:block">
              ← Back to collection
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/category/$slug"
                params={{ slug: o.slug }}
                className="group block overflow-hidden bg-arch-white"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={o.hero} alt={o.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-steel">Series {o.ref}</div>
                  <div className="text-display mt-1 text-base font-bold">{o.name}</div>
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
