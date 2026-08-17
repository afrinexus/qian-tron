import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { FabricPattern } from "@/components/FabricPattern";
import { fabric } from "@/lib/fabric-presets";
import { CONTACT, toAbsoluteUrl, type Category } from "@/lib/site";
import { getPublicCatalog } from "@/lib/catalog.functions";
import { mergeCatalog } from "@/lib/catalog-merge";
import { INDUSTRIES } from "@/lib/industries";

export const Route = createFileRoute("/machinery/$type")({
  loader: async ({ params }) => {
    const all = mergeCatalog(await getPublicCatalog());
    const category = all.find((c) => c.slug === params.type);
    if (!category) throw notFound();
    return { category, others: all.filter((c) => c.slug !== params.type) };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.category;
    if (!c) {
      return {
        meta: [
          { title: "Machinery type not found | QianTron" },
          { name: "robots", content: "noindex" },
        ],
      };
    }

    const url = toAbsoluteUrl(`/machinery/${c.slug}`);
    const title = `${c.name} — Machinery Type Catalogue | QianTron`;
    const desc = `${c.tagline} ${c.intro}`.slice(0, 158);
    const images = [c.hero, ...c.gallery];

    const products = c.machines.map((m, i) => ({
      "@type": "ListItem" as const,
      position: i + 1,
      item: {
        "@type": "Product",
        name: m.name,
        sku: m.code,
        model: m.code,
        category: c.name,
        image: [m.image, ...c.gallery.filter((g) => g !== m.image)],
        description: `${m.name} — ${m.tag}. ${c.tagline}`,
        brand: { "@type": "Brand", name: m.name.split(" ")[0] },
        manufacturer: { "@type": "Organization", name: m.name.split(" ")[0] },
        url: toAbsoluteUrl(`/category/${c.slug}/${m.code.toLowerCase()}`),
        additionalProperty: [
          ...m.specs.map((s) => ({ "@type": "PropertyValue", name: s.v, value: s.k })),
          { "@type": "PropertyValue", name: "Series", value: c.ref },
          { "@type": "PropertyValue", name: "Segment", value: m.tag },
          { "@type": "PropertyValue", name: "Sourcing", value: CONTACT.sourcing },
        ],
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "USD",
          seller: { "@type": "Organization", name: "QianTron" },
          url: toAbsoluteUrl(`/category/${c.slug}/${m.code.toLowerCase()}`),
        },
      },
    }));

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:site_name", content: "QianTron" },
        { property: "og:locale", content: "en_US" },
        { property: "og:image", content: toAbsoluteUrl(c.hero) },
        { property: "og:image:secure_url", content: toAbsoluteUrl(c.hero) },
        { property: "og:image:alt", content: `${c.name} — QianTron machinery catalogue` },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: toAbsoluteUrl(c.hero) },
        { name: "twitter:image:alt", content: `${c.name} — QianTron machinery catalogue` },
      ],

      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: title,
            description: desc,
            url,
            image: images,
            isPartOf: { "@type": "WebSite", name: "QianTron", url: toAbsoluteUrl("/") },
            about: {
              "@type": "ProductGroup",
              name: c.name,
              description: c.intro,
              image: images,
              brand: { "@type": "Brand", name: "QianTron" },
              productGroupID: c.ref,
              additionalProperty: [
                ...c.highlights.map((h) => ({ "@type": "PropertyValue", name: h.v, value: h.k })),
                { "@type": "PropertyValue", name: "Applications", value: c.applications.join(", ") },
                { "@type": "PropertyValue", name: "Models Registered", value: String(c.machines.length) },
              ],
            },
            mainEntity: {
              "@type": "ItemList",
              name: `${c.name} catalogue`,
              numberOfItems: c.machines.length,
              itemListElement: products,
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            name: `${c.name} — QianTron Offer Catalogue`,
            url,
            itemListElement: c.machines.map((m, i) => ({
              "@type": "Offer",
              position: i + 1,
              itemOffered: {
                "@type": "Product",
                name: m.name,
                sku: m.code,
                model: m.code,
                image: [m.image],
                brand: { "@type": "Brand", name: m.name.split(" ")[0] },
                additionalProperty: m.specs.map((s) => ({
                  "@type": "PropertyValue",
                  name: s.v,
                  value: s.k,
                })),
              },
              availability: "https://schema.org/InStock",
              seller: { "@type": "Organization", name: "QianTron" },
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: toAbsoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Machinery", item: toAbsoluteUrl("/machinery") },
              { "@type": "ListItem", position: 3, name: c.name, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: MachineryTypePage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-arch-white">
      <div className="text-center">
        <div className="text-display text-6xl font-black text-dragon">404</div>
        <div className="mt-2 text-steel">Machinery type not found.</div>
        <Link to="/machinery" className="mt-6 inline-block border border-dragon px-4 py-2 text-[11px] uppercase tracking-[0.25em]">
          All machinery
        </Link>
      </div>
    </div>
  ),
});

function MachineryTypePage() {
  const { category: c, others } = Route.useLoaderData() as {
    category: Category;
    others: Category[];
  };
  const industries = INDUSTRIES.filter((i) => i.machineryCategories.includes(c.slug));

  return (
    <main className="min-h-screen bg-arch-white">
      <SiteNav />

      {/* Hero */}
      <section className="relative min-h-[72vh] overflow-hidden bg-charcoal text-arch-white">
        <img src={c.hero} alt={c.name} className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/25" />
        <FabricPattern className="absolute -bottom-24 -right-24 h-[560px] w-[560px]" {...fabric("hero-gold")} />
        <div className="relative mx-auto flex min-h-[72vh] max-w-[1400px] flex-col justify-end px-6 pb-16 pt-32 md:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 text-[10px] uppercase tracking-[0.3em] text-arch-white/60">
            <Link to="/" className="hover:text-dragon">Home</Link>
            <span className="mx-2 text-arch-white/30">/</span>
            <Link to="/machinery" className="hover:text-dragon">Machinery</Link>
            <span className="mx-2 text-arch-white/30">/</span>
            <span className="text-dragon">{c.name}</span>
          </nav>
          <div className="section-eyebrow !text-dragon">Series {c.ref} · Volume MMXXV</div>
          <h1 className="text-display mt-4 text-5xl font-black leading-[0.9] md:text-7xl">{c.name}</h1>
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

      {/* Intro + applications */}
      <section className="relative overflow-hidden bg-arch-white py-24 text-charcoal">
        <FabricPattern className="absolute -bottom-16 -right-16 h-[470px] w-[470px]" {...fabric("editorial-bronze")} />
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <div className="section-eyebrow">Machinery Type</div>
            <h2 className="text-display mt-3 text-4xl font-black leading-[0.95] md:text-5xl">
              The <span className="text-dragon">{c.name}</span> register.
            </h2>
            <div className="mt-6 h-[1px] w-16 bg-dragon" />
            <div className="text-editorial mt-6 text-sm uppercase tracking-[0.3em] text-steel">
              Vol. {c.ref} · {c.machines.length} models registered
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="text-editorial text-2xl leading-snug text-graphite md:text-3xl">{c.intro}</p>
            <div className="mt-10">
              <div className="section-eyebrow">Typical Applications</div>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {c.applications.map((a) => (
                  <li key={a} className="flex items-center gap-3 border-b border-border pb-2 text-[14px] text-graphite">
                    <span className="h-2 w-2 rotate-45 bg-dragon" /> {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section className="relative overflow-hidden bg-concrete py-24">
        <FabricPattern className="absolute -bottom-20 left-[-5rem] h-[500px] w-[500px]" {...fabric("editorial-steel")} />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="section-eyebrow">Catalogue · {c.machines.length} models</div>
          <h3 className="text-display mt-3 text-3xl font-black md:text-5xl">Registered {c.name.toLowerCase()}.</h3>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.machines.map((m) => (
              <Link
                key={m.code}
                to="/category/$slug/$machine"
                params={{ slug: c.slug, machine: m.code.toLowerCase() }}
                className="group flex flex-col overflow-hidden border border-border bg-arch-white transition hover:border-dragon"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105" />
                  <div className="absolute left-0 top-0 bg-dragon px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-arch-white">
                    {m.code}
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="text-display text-lg font-black leading-tight">{m.name}</div>
                    <div className="mt-1 text-[12px] text-steel">{m.tag}</div>
                  </div>
                  <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4">
                    {m.specs.map((s) => (
                      <div key={s.v}>
                        <dt className="text-[8px] uppercase tracking-[0.2em] text-steel">{s.v}</dt>
                        <dd className="text-display text-sm font-black text-charcoal">{s.k}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries served by this type */}
      {industries.length > 0 && (
        <section className="relative overflow-hidden bg-arch-white py-20">
          <FabricPattern className="absolute -bottom-14 -right-14 h-[400px] w-[400px]" {...fabric("editorial-steel")} />
          <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="section-eyebrow">Deployed In</div>
            <div className="mt-8 flex flex-wrap gap-3">
              {industries.map((i) => (
                <Link
                  key={i.slug}
                  to="/industries/$slug"
                  params={{ slug: i.slug }}
                  className="border border-border px-5 py-3 text-[11px] font-bold uppercase tracking-[0.25em] text-charcoal transition hover:border-dragon hover:text-dragon"
                >
                  {i.index} · {i.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other types */}
      <section className="bg-concrete py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="section-eyebrow">Other Fleets</div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {others.map((o) => (
              <Link key={o.slug} to="/machinery/$type" params={{ type: o.slug }}
                className="group block border border-border bg-arch-white p-5 transition hover:border-dragon">
                <div className="text-editorial text-2xl text-dragon">{o.ref}</div>
                <div className="text-display mt-3 text-sm font-bold leading-tight">{o.name}</div>
                <div className="mt-3 h-[1px] w-6 bg-dragon transition group-hover:w-12" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal py-20 text-arch-white">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 px-6 text-center md:flex-row md:px-10 md:text-left">
          <div>
            <div className="section-eyebrow !text-dragon">Specify a Fleet</div>
            <div className="text-display mt-3 text-3xl font-black md:text-4xl">
              Request {c.name.toLowerCase()} availability and lead times.
            </div>
          </div>
          <a href={`${CONTACT.emailHref}?subject=${encodeURIComponent(`Machinery Enquiry: ${c.name}`)}`}
            className="bg-dragon px-8 py-4 text-[12px] font-bold uppercase tracking-[0.3em] text-arch-white transition hover:bg-dragon-deep">
            Contact QianTron →
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
