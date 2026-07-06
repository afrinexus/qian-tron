import { createFileRoute, Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo-new.png.asset.json";
import jcbAsset from "@/assets/jcb.jpg.asset.json";
import { CATEGORIES, PUBLIC_ORIGIN, toAbsoluteUrl } from "@/lib/site";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { QianTronWordmark } from "@/components/QianTronWordmark";
import { SquareCanvas } from "@/components/SquareCanvas";
import { FabricPattern } from "@/components/FabricPattern";

const logo = { url: toAbsoluteUrl(logoAsset.url) };
const jcb = { url: toAbsoluteUrl(jcbAsset.url) };
const TITLE = "QianTron — Global Sourcing & Machinery Delivery Across Africa";
const DESC =
  "Africa's premier heavy equipment sourcing, logistics and delivery partner. Global sourcing, RoRo shipping, port clearance and doorstep delivery.";
const HERO_URL = jcb.url;
const HOME_URL = `${PUBLIC_ORIGIN}/`;

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: HOME_URL },
      { property: "og:image", content: HERO_URL },
      { name: "twitter:image", content: HERO_URL },
    ],
    links: [{ rel: "canonical", href: HOME_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "QianTron",
          description: DESC,
          logo: logo.url,
          areaServed: "Africa",
          email: "info@qiantron.lucene.co",
          telephone: "+2547-2775-0097",
          address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
          sameAs: [],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "QianTron",
          url: HOME_URL,
          description: DESC,
          publisher: { "@type": "Organization", name: "QianTron" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: HOME_URL },
          ],
        }),
      },
    ],
  }),
});

function Home() {
  return (
    <main className="min-h-screen bg-arch-white">
      <SiteNav />

      {/* ============ Hero ============ */}
      <section className="relative min-h-screen w-full overflow-hidden bg-charcoal text-arch-white">
        <img src={HERO_URL} alt="Premium heavy machinery" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal" />
        <SquareCanvas className="pointer-events-none absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-transparent to-charcoal/30" />

        <div className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col justify-between px-6 pt-28 pb-14 md:px-10">
          <div className="flex flex-col items-center text-center">
            <img src={logo.url} alt="QianTron dragon mark" className="h-28 w-28 object-contain drop-shadow-[0_0_30px_rgba(183,28,28,0.5)]" />
          </div>

          <div className="max-w-5xl">
            <div className="section-eyebrow !text-dragon">Global Sourcing · Africa Delivery</div>
            <div className="mt-6 w-full text-arch-white">
              <QianTronWordmark className="w-full h-auto" />
            </div>
            <p className="text-editorial mt-8 max-w-2xl text-xl text-arch-white/85 md:text-2xl">
              Premium Machinery. Seamless Logistics.<br />
              <span className="text-arch-white">Delivered to your doorstep.</span>
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/category/$slug" params={{ slug: "excavators" }} className="bg-dragon px-6 py-3 text-[11px] font-bold uppercase tracking-[0.3em] text-arch-white hover:bg-dragon-deep transition">
                Browse Machinery
              </Link>
              <Link to="/contact" className="border border-arch-white/40 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.3em] text-arch-white hover:border-dragon hover:text-dragon transition">
                Request a Quote
              </Link>
            </div>
          </div>

          <div className="flex items-end justify-between border-t border-arch-white/10 pt-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-arch-white/50">Africa's Premier Heavy Equipment Partner</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-arch-white/50">Est. MMXXV</div>
          </div>
        </div>
      </section>

      {/* ============ Intro ============ */}
      <section className="relative overflow-hidden bg-arch-white py-24 text-charcoal">
        <FabricPattern
          className="absolute -bottom-16 -right-16 h-[420px] w-[420px]"
          tone="bronze" corner="br" rings={30} spacing={18} opacity={0.16} motion="drift" duration={28}
        />
        <div className="relative mx-auto max-w-[1100px] px-6 text-center md:px-10">
          <div className="section-eyebrow">Who We Are</div>
          <p className="text-editorial mt-6 text-2xl leading-snug text-graphite md:text-4xl">
            A vertically integrated house for <span className="text-dragon">global machinery sourcing</span>, ocean logistics and inland delivery across Africa.
          </p>
          <div className="mt-10 flex justify-center gap-4 text-[11px] uppercase tracking-[0.3em]">
            <Link to="/about" className="text-dragon hover:underline">Our story →</Link>
            <span className="text-steel">·</span>
            <Link to="/services" className="text-dragon hover:underline">Our services →</Link>
          </div>
        </div>
      </section>

      {/* ============ Categories ============ */}
      <section id="machinery" className="bg-concrete py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex items-end justify-between">
            <div>
              <div className="section-eyebrow">The Collection</div>
              <h2 className="text-display mt-3 text-4xl font-black leading-[0.95] md:text-6xl">Machinery categories.</h2>
            </div>
            <div className="hidden max-w-xs text-[13px] leading-relaxed text-steel md:block">
              Tap any category to view specifications, applications and reference fleet.
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="group relative block overflow-hidden bg-arch-white"
              >
                <div className="aspect-[4/3] overflow-hidden bg-charcoal">
                  <img src={c.hero} alt={c.name} className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
                </div>
                <div className="flex items-end justify-between p-5">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-steel">Series {c.ref}</div>
                    <div className="text-display mt-1 text-xl font-bold">{c.name}</div>
                  </div>
                  <div className="text-editorial text-3xl text-dragon transition group-hover:translate-x-1">→</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Services teaser ============ */}
      <section className="relative overflow-hidden bg-charcoal py-24 text-arch-white">
        <FabricPattern
          className="absolute -bottom-32 -right-32 h-[600px] w-[600px]"
          tone="dragon" corner="br" rings={44} spacing={14} opacity={0.14} motion="breathe" duration={9}
        />
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <div className="section-eyebrow !text-dragon">The Ecosystem</div>
            <h2 className="text-display mt-4 text-4xl font-black leading-[0.95] md:text-6xl">
              Six disciplines.<br /><span className="text-dragon">One partner.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-arch-white/75">
              Global sourcing, inspection, ocean shipping, port clearance, inland transport and doorstep delivery — one accountable house from factory to site.
            </p>
            <Link to="/services" className="mt-8 inline-block border border-dragon px-6 py-3 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-dragon transition">
              Explore services →
            </Link>
          </div>
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-[1px] bg-arch-white/10 md:grid-cols-3">
              {[
                "Global Sourcing",
                "Inspection",
                "Ocean Shipping",
                "Port Clearance",
                "Inland Transport",
                "Doorstep Delivery",
              ].map((s, i) => (
                <div key={s} className="bg-charcoal p-6">
                  <div className="text-editorial text-2xl text-dragon">{String(i + 1).padStart(2, "0")}</div>
                  <div className="text-display mt-4 text-sm font-bold uppercase tracking-[0.1em]">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-arch-white py-24 text-center text-charcoal">
        <div className="mx-auto max-w-2xl px-6">
          <div className="section-eyebrow">Get in Touch</div>
          <h3 className="text-display mt-4 text-3xl font-black md:text-5xl">
            Let's specify your next consignment.
          </h3>
          <Link to="/contact" className="mt-8 inline-block bg-dragon px-8 py-4 text-[12px] font-bold uppercase tracking-[0.3em] text-arch-white hover:bg-dragon-deep transition">
            Contact QianTron
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
