import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { FabricPattern } from "@/components/FabricPattern";
import { fabric } from "@/lib/fabric-presets";
import { SERVICES, serviceBySlug, type Service } from "@/lib/services-data";
import { CONTACT } from "@/lib/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = serviceBySlug(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    const title = s ? `${s.name} — QianTron Services` : "QianTron Services";
    const desc = s ? `${s.tagline} ${s.intro}` : "QianTron end-to-end machinery services.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: s ? `/services/${s.slug}` : "/services" },
        ...(s ? [{ property: "og:image", content: s.hero }, { name: "twitter:image", content: s.hero }] : []),
      ],
      links: [{ rel: "canonical", href: s ? `/services/${s.slug}` : "/services" }],
    };
  },
  component: ServiceDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-arch-white">
      <div className="text-center">
        <div className="text-display text-6xl font-black text-dragon">404</div>
        <div className="mt-2 text-steel">Service not found.</div>
        <Link to="/services" className="mt-6 inline-block border border-dragon px-4 py-2 text-[11px] uppercase tracking-[0.25em]">
          All services
        </Link>
      </div>
    </div>
  ),
});

function ServiceDetail() {
  const { service: s } = Route.useLoaderData() as { service: Service };
  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 5);

  return (
    <main className="min-h-screen bg-arch-white">
      <SiteNav />

      {/* Hero */}
      <section className="relative min-h-[70vh] overflow-hidden bg-charcoal text-arch-white">
        <img src={s.hero} alt={s.name} className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/20" />
        <FabricPattern className="absolute -bottom-24 -right-24 h-[520px] w-[520px]" {...fabric("hero-gold")} />
        <div className="relative mx-auto flex min-h-[70vh] max-w-[1400px] flex-col justify-end px-6 pb-16 pt-32 md:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 text-[10px] uppercase tracking-[0.3em] text-arch-white/60">
            <Link to="/" className="hover:text-dragon">Home</Link>
            <span className="mx-2 text-arch-white/30">/</span>
            <Link to="/services" className="hover:text-dragon">Services</Link>
            <span className="mx-2 text-arch-white/30">/</span>
            <span className="text-dragon">{s.name}</span>
          </nav>
          <div className="section-eyebrow !text-dragon">Service · {s.index}</div>
          <h1 className="text-display mt-4 text-5xl font-black leading-[0.95] md:text-7xl">{s.name}</h1>
          <p className="text-editorial mt-6 max-w-2xl text-xl text-arch-white/85">{s.tagline}</p>
        </div>
      </section>

      {/* Intro + metrics */}
      <section className="relative overflow-hidden bg-arch-white py-24 text-charcoal">
        <FabricPattern className="absolute -bottom-16 -right-16 h-[440px] w-[440px]" {...fabric("editorial-steel")} />
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <div className="section-eyebrow">Discipline</div>
            <h2 className="text-display mt-3 text-4xl font-black leading-[0.95] md:text-5xl">{s.headline}</h2>
            <div className="mt-6 h-[1px] w-16 bg-dragon" />
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-6">
              {s.metrics.map((m) => (
                <div key={m.k}>
                  <div className="text-display text-2xl font-black text-dragon md:text-3xl">{m.k}</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-steel">{m.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="text-editorial text-2xl leading-snug text-graphite md:text-3xl">{s.intro}</p>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <div className="section-eyebrow">Deliverables</div>
                <ul className="mt-4 space-y-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-3 border-b border-border pb-2 text-[14px] text-graphite">
                      <span className="h-2 w-2 rotate-45 bg-dragon" /> {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="section-eyebrow">Process</div>
                <ul className="mt-4 space-y-2 text-[14px] text-graphite">
                  {s.process.map((p) => (
                    <li key={p.k} className="flex items-center gap-3 border-b border-border pb-2">
                      <span className="text-editorial text-lg text-dragon w-8">{p.k}</span> {p.v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="relative overflow-hidden bg-concrete py-24">
        <FabricPattern className="absolute -bottom-16 left-[-4rem] h-[420px] w-[420px]" {...fabric("editorial-bronze")} />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="section-eyebrow">Continue</div>
          <h3 className="text-display mt-3 text-3xl font-black md:text-4xl">Other services in the ecosystem.</h3>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
            {others.map((o) => (
              <Link key={o.slug} to="/services/$slug" params={{ slug: o.slug }}
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
            <div className="section-eyebrow !text-dragon">Engage</div>
            <div className="text-display mt-3 text-3xl font-black md:text-4xl">Scope your {s.name.toLowerCase()} requirement.</div>
          </div>
          <a href={`${CONTACT.emailHref}?subject=${encodeURIComponent(`Enquiry: ${s.name}`)}`}
            className="bg-dragon px-8 py-4 text-[12px] font-bold uppercase tracking-[0.3em] text-arch-white hover:bg-dragon-deep transition">
            Contact QianTron →
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
