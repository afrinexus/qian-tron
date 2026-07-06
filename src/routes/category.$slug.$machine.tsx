import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CONTACT, machineByCode } from "@/lib/site";
import type { Category, Machine } from "@/lib/site";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { SquareCanvas } from "@/components/SquareCanvas";
import { FabricPattern } from "@/components/FabricPattern";

const BASE_URL = "https://qian-tron.lovable.app";

export const Route = createFileRoute("/category/$slug/$machine")({
  loader: ({ params }) => {
    const found = machineByCode(params.slug, params.machine);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Machine not found — QianTron" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { category: c, machine: m } = loaderData;
    const path = `/category/${c.slug}/${m.code.toLowerCase()}`;
    const url = `${BASE_URL}${path}`;
    const title = `${m.name} (${m.code}) — QianTron ${c.name}`;
    const desc = `${m.name} — ${m.tag}. ${c.tagline} Sourced, shipped and commissioned by QianTron across Africa.`;

    const productLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: m.name,
      sku: m.code,
      mpn: m.code,
      productID: m.code,
      model: m.name,
      image: [m.image, c.hero].filter(Boolean),
      description: desc,
      category: c.name,
      material: "Steel",
      itemCondition: "https://schema.org/NewCondition",
      brand: { "@type": "Brand", name: "QianTron" },
      manufacturer: { "@type": "Organization", name: "QianTron" },
      url,
      audience: { "@type": "BusinessAudience", audienceType: "Construction, mining and logistics operators" },
      areaServed: { "@type": "Place", name: "Africa" },
      additionalProperty: [
        ...m.specs.map((s) => ({ "@type": "PropertyValue", name: s.v, value: s.k })),
        { "@type": "PropertyValue", name: "Model code", value: m.code },
        { "@type": "PropertyValue", name: "Configuration", value: m.tag },
        { "@type": "PropertyValue", name: "Series", value: `${c.ref} · ${c.name}` },
        { "@type": "PropertyValue", name: "Origin", value: "EU · Japan · China Tier-1" },
        { "@type": "PropertyValue", name: "Warranty", value: "24-month powertrain" },
        { "@type": "PropertyValue", name: "Shipping", value: "RoRo · Container · Break-bulk" },
      ],
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "USD",
        price: "0",
        priceValidUntil: "2099-12-31",
        url,
        businessFunction: "https://schema.org/Sell",
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@type": "Organization", name: "QianTron", areaServed: "Africa" },
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingDestination: { "@type": "DefinedRegion", addressCountry: ["KE", "TZ", "UG", "RW", "ZM", "ZA", "NG", "GH"] },
          shippingRate: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: { "@type": "QuantitativeValue", minValue: 7, maxValue: 21, unitCode: "DAY" },
            transitTime: { "@type": "QuantitativeValue", minValue: 21, maxValue: 55, unitCode: "DAY" },
          },
        },
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "KE",
          returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
        },
      },
    };

    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Machinery", item: `${BASE_URL}/services` },
        { "@type": "ListItem", position: 3, name: c.name, item: `${BASE_URL}/category/${c.slug}` },
        { "@type": "ListItem", position: 4, name: m.name, item: url },
      ],
    };

    const orgLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "QianTron",
      url: `${BASE_URL}/`,
      email: CONTACT.email,
      telephone: CONTACT.phone,
    };

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { property: "og:image", content: m.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: m.image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(productLd) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbLd) },
        { type: "application/ld+json", children: JSON.stringify(orgLd) },
      ],
    };
  },
  component: MachinePage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-arch-white">
      <div className="text-center">
        <div className="text-display text-6xl font-black text-dragon">404</div>
        <div className="mt-2 text-steel">Machine not found.</div>
        <Link to="/" className="mt-6 inline-block border border-dragon px-4 py-2 text-[11px] uppercase tracking-[0.25em]">
          Back home
        </Link>
      </div>
    </div>
  ),
});

function MachinePage() {
  const { category: c, machine: m } = Route.useLoaderData() as {
    category: Category;
    machine: Machine;
  };

  const siblings = c.machines.filter((x) => x.code !== m.code);

  const enquireHref = `${CONTACT.emailHref}?subject=${encodeURIComponent(
    `Enquiry: ${m.name} (${m.code})`,
  )}&body=${encodeURIComponent(
    `Hello QianTron,\n\nI would like a full specification and quote for:\n\n  ${m.name} (${m.code})\n  Category: ${c.name}\n  Configuration: ${m.tag}\n\nPlease include lead time, RoRo/container options and doorstep commissioning terms.\n\nThank you.`,
  )}`;

  const specGroups: { title: string; eyebrow: string; items: { k: string; v: string }[] }[] = [
    {
      eyebrow: "Group A",
      title: "Performance",
      items: m.specs.map((s) => ({ k: s.v, v: s.k })),
    },
    {
      eyebrow: "Group B",
      title: "Identity",
      items: [
        { k: "Model Code", v: m.code },
        { k: "Configuration", v: m.tag },
        { k: "Series", v: `${c.ref} · ${c.name}` },
      ],
    },
    {
      eyebrow: "Group C",
      title: "Sourcing & Delivery",
      items: [
        { k: "Origin", v: "EU · Japan · China Tier-1" },
        { k: "Shipping", v: "RoRo · Container · Break-bulk" },
        { k: "Warranty", v: "24-month powertrain" },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-arch-white">
      <SiteNav />

      {/* Hero */}
      <section className="relative min-h-[80vh] overflow-hidden bg-charcoal text-arch-white">
        <img src={m.image} alt={m.name} className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/20" />
        <SquareCanvas className="pointer-events-none absolute inset-0 h-full w-full opacity-60" />
        <div className="relative mx-auto flex min-h-[80vh] max-w-[1400px] flex-col justify-end px-6 pb-20 pt-32 md:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 text-[10px] uppercase tracking-[0.3em] text-arch-white/60">
            <Link to="/" className="hover:text-dragon">Home</Link>
            <span className="mx-2 text-arch-white/30">/</span>
            <Link to="/services" className="hover:text-dragon">Machinery</Link>
            <span className="mx-2 text-arch-white/30">/</span>
            <Link to="/category/$slug" params={{ slug: c.slug }} className="hover:text-dragon">
              {c.name}
            </Link>
            <span className="mx-2 text-arch-white/30">/</span>
            <span className="text-dragon">{m.code}</span>
          </nav>
          <div className="section-eyebrow !text-dragon">
            {c.name} · {m.code}
          </div>
          <h1 className="text-display mt-4 text-5xl font-black leading-[0.9] md:text-7xl">{m.name}</h1>
          <p className="text-editorial mt-6 max-w-2xl text-xl text-arch-white/85 md:text-2xl">
            {m.tag} — engineered, sourced and commissioned to QianTron standard.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-arch-white/15 pt-6">
            {m.specs.map((s) => (
              <div key={s.k} className="flex items-baseline gap-3">
                <div className="text-display text-2xl font-black text-dragon">{s.k}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-arch-white/60">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview + hero image */}
      <section className="relative overflow-hidden bg-arch-white py-24 text-charcoal">
        <FabricPattern
          className="absolute -bottom-16 -right-20 h-[440px] w-[440px]"
          tone="gold" corner="br" rings={32} spacing={16} opacity={0.14} motion="drift" duration={28}
        />
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden border border-border bg-concrete">
              <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
              <div className="absolute left-0 top-0 bg-dragon px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-arch-white">
                {m.code}
              </div>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="section-eyebrow">Chapter I · Overview</div>
            <h2 className="text-display mt-3 text-4xl font-black leading-[0.95] md:text-5xl">
              {m.name}.
            </h2>
            <div className="mt-6 h-[1px] w-16 bg-dragon" />
            <p className="text-editorial mt-6 text-lg leading-relaxed text-graphite">
              {c.intro}
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-steel">
              The {m.name} sits in the {m.tag.toLowerCase()} bracket of the QianTron {c.name} register.
              Every unit is inspected pre-shipment, matched to your operating profile, and delivered with
              powertrain warranty and commissioning support.
            </p>
            <a
              href={enquireHref}
              className="mt-8 inline-flex items-center gap-3 bg-dragon px-6 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-arch-white transition hover:bg-dragon-deep"
            >
              Request Full Specification <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Full specification table — grouped to mirror JSON-LD additionalProperty groupings */}
      <section className="bg-concrete py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="section-eyebrow">Chapter II · Specification</div>
          <h2 className="text-display mt-3 text-4xl font-black md:text-5xl">Technical register.</h2>
          <p className="mt-4 max-w-2xl text-sm text-steel">
            Grouped attributes below map one-to-one with the machine-readable
            structured data on this page — the same schema search engines,
            procurement systems and quote tools ingest.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-3 md:gap-8">
            {specGroups.map((group) => (
              <div
                key={group.title}
                className="flex flex-col border-t-2 border-dragon bg-arch-white p-6 md:p-7"
              >
                <div className="section-eyebrow">{group.eyebrow}</div>
                <div className="text-display mt-2 text-xl font-black md:text-2xl">
                  {group.title}
                </div>
                <dl className="mt-5 flex flex-col">
                  {group.items.map((s, i) => (
                    <div
                      key={s.k}
                      className={`flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 ${
                        i === 0 ? "border-t border-border" : ""
                      } border-b border-border`}
                    >
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.28em] text-steel">
                        {s.k}
                      </dt>
                      <dd className="text-display text-base font-bold text-charcoal sm:text-right sm:text-lg">
                        {s.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Delivery programme */}
      <section className="bg-arch-white py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="section-eyebrow">Chapter III · Delivery Programme</div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              { n: "01", t: "Sourcing", d: "Tier-1 OEM identified across EU, Japan and China corridors." },
              { n: "02", t: "Inspection", d: "Pre-shipment quality, hours and powertrain verification." },
              { n: "03", t: "Shipping", d: "RoRo, container or break-bulk via Mombasa, Dar or Durban." },
              { n: "04", t: "Commissioning", d: "Doorstep handover, operator brief and 24-mo warranty." },
            ].map((step) => (
              <div key={step.n} className="border-l-2 border-dragon bg-concrete p-6">
                <div className="text-display text-3xl font-black text-dragon">{step.n}</div>
                <div className="mt-3 text-[11px] uppercase tracking-[0.3em] text-steel">{step.t}</div>
                <div className="text-editorial mt-2 text-sm text-graphite">{step.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal py-16 text-arch-white">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-10">
          <div>
            <div className="section-eyebrow !text-dragon">Request Quote</div>
            <div className="text-display mt-3 text-2xl font-black md:text-3xl">
              Quote the {m.name} ({m.code}).
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href={CONTACT.phoneHref}
              className="border border-arch-white/30 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.3em] hover:border-dragon hover:text-dragon"
            >
              {CONTACT.phone}
            </a>
            <a
              href={enquireHref}
              className="bg-dragon px-6 py-4 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-dragon-deep"
            >
              Enquire →
            </a>
          </div>
        </div>
      </section>

      {/* Siblings */}
      {siblings.length > 0 && (
        <section className="bg-concrete py-20">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="section-eyebrow">More in {c.name}</div>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {siblings.map((s) => (
                <Link
                  key={s.code}
                  to="/category/$slug/$machine"
                  params={{ slug: c.slug, machine: s.code.toLowerCase() }}
                  className="group block overflow-hidden bg-arch-white"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-steel">{s.code}</div>
                    <div className="text-display mt-1 text-base font-bold">{s.name}</div>
                    <div className="mt-1 text-[11px] text-steel">{s.tag}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}

