import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { Category } from "@/lib/site";
import { CATEGORIES, CONTACT, categoryBySlug } from "@/lib/site";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";

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
      scripts: c
        ? [{
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: c.name,
              description: c.intro,
              image: c.hero,
              brand: { "@type": "Brand", name: "QianTron" },
            }),
          }]
        : [],
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
      <section className="relative min-h-[80vh] overflow-hidden bg-charcoal text-arch-white">
        <img src={c.hero} alt={c.name} className="absolute inset-0 h-full w-full object-cover opacity-65" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/20" />
        <div className="relative mx-auto flex min-h-[80vh] max-w-[1400px] flex-col justify-end px-6 pb-16 pt-32 md:px-10">
          <div className="section-eyebrow !text-dragon">Series {c.ref} · Machinery</div>
          <h1 className="text-display mt-4 text-6xl font-black leading-[0.9] md:text-8xl">{c.name}</h1>
          <p className="text-editorial mt-6 max-w-2xl text-2xl text-arch-white/85">{c.tagline}</p>
        </div>
      </section>

      {/* Intro + Highlights */}
      <section className="bg-arch-white py-24 text-charcoal">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-7">
            <div className="section-eyebrow">Overview</div>
            <p className="text-editorial mt-4 text-2xl leading-snug text-graphite md:text-3xl">{c.intro}</p>
            <div className="mt-10 h-[1px] w-16 bg-dragon" />
            <div className="mt-8">
              <div className="section-eyebrow">Typical Applications</div>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {c.applications.map((a) => (
                  <li key={a} className="flex items-center gap-3 border-b border-border pb-2 text-[14px] text-graphite">
                    <span className="h-2 w-2 rotate-45 bg-dragon" /> {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="border border-border bg-concrete p-8 bg-blueprint">
              <div className="section-eyebrow">Specifications</div>
              <div className="mt-6 space-y-6">
                {c.highlights.map((h) => (
                  <div key={h.k} className="border-l-2 border-dragon pl-4">
                    <div className="text-display text-3xl font-black text-dragon">{h.k}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-steel">{h.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <a
              href={`${CONTACT.emailHref}?subject=${encodeURIComponent(`Enquiry: ${c.name}`)}`}
              className="mt-6 flex w-full items-center justify-center gap-2 bg-dragon px-6 py-4 text-[12px] font-bold uppercase tracking-[0.3em] text-arch-white hover:bg-dragon-deep transition"
            >
              Request Quote for {c.name}
            </a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-concrete py-24">
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

      {/* Related categories */}
      <section className="bg-arch-white py-24">
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
                className="group block overflow-hidden bg-concrete"
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
