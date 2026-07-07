import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { FabricPattern } from "@/components/FabricPattern";
import { fabric } from "@/lib/fabric-presets";
import { INDUSTRIES, industryBySlug, type Industry } from "@/lib/industries";
import { CATEGORIES, CONTACT, categoryBySlug } from "@/lib/site";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = industryBySlug(params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) => {
    const i = loaderData?.industry;
    const title = i ? `${i.name} — QianTron Industries` : "QianTron Industries";
    const desc = i ? `${i.tagline} ${i.intro}` : "Industries served by QianTron.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: i ? `/industries/${i.slug}` : "/about" },
        ...(i ? [{ property: "og:image", content: i.hero }, { name: "twitter:image", content: i.hero }] : []),
      ],
      links: [{ rel: "canonical", href: i ? `/industries/${i.slug}` : "/about" }],
    };
  },
  component: IndustryDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-arch-white">
      <div className="text-center">
        <div className="text-display text-6xl font-black text-dragon">404</div>
        <div className="mt-2 text-steel">Industry not found.</div>
        <Link to="/about" className="mt-6 inline-block border border-dragon px-4 py-2 text-[11px] uppercase tracking-[0.25em]">
          All industries
        </Link>
      </div>
    </div>
  ),
});

function IndustryDetail() {
  const { industry: i } = Route.useLoaderData() as { industry: Industry };
  const others = INDUSTRIES.filter((x) => x.slug !== i.slug);
  const cats = i.machineryCategories.map(categoryBySlug).filter(Boolean) as NonNullable<ReturnType<typeof categoryBySlug>>[];

  return (
    <main className="min-h-screen bg-arch-white">
      <SiteNav />

      {/* Hero */}
      <section className="relative min-h-[75vh] overflow-hidden bg-charcoal text-arch-white">
        <img src={i.hero} alt={i.name} className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/25" />
        <FabricPattern className="absolute -bottom-24 -right-24 h-[560px] w-[560px]" {...fabric("hero-bronze")} />
        <div className="relative mx-auto flex min-h-[75vh] max-w-[1400px] flex-col justify-end px-6 pb-16 pt-32 md:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 text-[10px] uppercase tracking-[0.3em] text-arch-white/60">
            <Link to="/" className="hover:text-dragon">Home</Link>
            <span className="mx-2 text-arch-white/30">/</span>
            <Link to="/about" className="hover:text-dragon">Industries</Link>
            <span className="mx-2 text-arch-white/30">/</span>
            <span className="text-dragon">{i.name}</span>
          </nav>
          <div className="section-eyebrow !text-dragon">Sector · {i.index}</div>
          <h1 className="text-display mt-4 text-6xl font-black leading-[0.9] md:text-8xl">{i.name}</h1>
          <p className="text-editorial mt-6 max-w-2xl text-2xl text-arch-white/85">{i.tagline}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="relative overflow-hidden bg-arch-white py-24 text-charcoal">
        <FabricPattern className="absolute -bottom-16 -right-16 h-[460px] w-[460px]" {...fabric("editorial-steel")} />
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <div className="section-eyebrow">Practice</div>
            <h2 className="text-display mt-3 text-4xl font-black leading-[0.95] md:text-5xl">{i.headline}</h2>
            <div className="mt-6 h-[1px] w-16 bg-dragon" />
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-6">
              {i.metrics.map((m) => (
                <div key={m.k}>
                  <div className="text-display text-2xl font-black text-dragon md:text-3xl">{m.k}</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-steel">{m.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="text-editorial text-2xl leading-snug text-graphite md:text-3xl">{i.intro}</p>
            <div className="mt-10">
              <div className="section-eyebrow">Applications</div>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {i.applications.map((a) => (
                  <li key={a} className="flex items-center gap-3 border-b border-border pb-2 text-[14px] text-graphite">
                    <span className="h-2 w-2 rotate-45 bg-dragon" /> {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended machinery categories */}
      <section className="relative overflow-hidden bg-concrete py-24">
        <FabricPattern className="absolute -bottom-16 left-[-4rem] h-[440px] w-[440px]" {...fabric("editorial-bronze")} />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="section-eyebrow">Recommended Fleets</div>
          <h3 className="text-display mt-3 text-3xl font-black md:text-5xl">Machinery for {i.name.toLowerCase()}.</h3>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {cats.map((c) => (
              <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }}
                className="group relative overflow-hidden border border-border bg-arch-white transition hover:border-dragon">
                <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                  <img src={c.hero} alt={c.name} className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105" />
                  <div className="absolute left-0 top-0 bg-dragon px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-arch-white">
                    Series {c.ref}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-display text-xl font-black">{c.name}</div>
                  <div className="mt-2 text-[13px] text-steel">{c.tagline}</div>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[11px] font-bold uppercase tracking-[0.3em] text-charcoal transition group-hover:text-dragon">
                    <span>View Register</span><span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other industries */}
      <section className="bg-arch-white py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="section-eyebrow">Also Served</div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
            {others.map((o) => (
              <Link key={o.slug} to="/industries/$slug" params={{ slug: o.slug }}
                className="group block border border-border bg-arch-white p-5 transition hover:border-dragon">
                <div className="text-editorial text-2xl text-dragon">{o.index}</div>
                <div className="text-display mt-3 text-sm font-bold">{o.name}</div>
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
            <div className="section-eyebrow !text-dragon">Discuss a Programme</div>
            <div className="text-display mt-3 text-3xl font-black md:text-4xl">
              Specify a {i.name.toLowerCase()} programme with QianTron.
            </div>
          </div>
          <a href={`${CONTACT.emailHref}?subject=${encodeURIComponent(`Industry Enquiry: ${i.name}`)}`}
            className="bg-dragon px-8 py-4 text-[12px] font-bold uppercase tracking-[0.3em] text-arch-white hover:bg-dragon-deep transition">
            Contact QianTron →
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
