import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { CATEGORIES, CONTACT } from "@/lib/site";
import { useState } from "react";

const TITLE = "Contact QianTron — Global Sourcing & Machinery Enquiries";
const DESC = `Reach QianTron for machinery sourcing, freight and delivery. Email ${
  "info@qiantron.lucene.co"
} · Phone +2547-2775-0097.`;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "QianTron",
        email: CONTACT.email,
        telephone: CONTACT.phone,
        areaServed: "Africa",
        description: "Africa's premier heavy equipment sourcing, logistics and machinery delivery partner.",
      }),
    }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [category, setCategory] = useState(CATEGORIES[0].slug);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const mailto = () => {
    const cat = CATEGORIES.find((c) => c.slug === category)?.name ?? "General";
    const subject = `Enquiry: ${cat}`;
    const body = `Name: ${name}\nCompany: ${company}\nInterested in: ${cat}\n\n${message}`;
    return `${CONTACT.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="min-h-screen bg-arch-white">
      <SiteNav />

      <section className="bg-charcoal py-32 pt-40 text-arch-white">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="section-eyebrow !text-dragon">Get in Touch</div>
          <h1 className="text-display mt-4 text-5xl font-black leading-[0.9] md:text-7xl">
            Specify your <span className="text-dragon">consignment.</span>
          </h1>
          <p className="text-editorial mt-6 max-w-2xl text-xl text-arch-white/80">
            Global sourcing enquiries, spec-to-quote and delivery scheduling. Our trade desk responds within one business day.
          </p>
        </div>
      </section>

      <section className="bg-arch-white py-24 text-charcoal">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5 space-y-10">
            <div>
              <div className="section-eyebrow">Email</div>
              <a href={CONTACT.emailHref} className="text-display mt-3 block text-2xl font-bold hover:text-dragon transition">
                {CONTACT.email}
              </a>
            </div>
            <div>
              <div className="section-eyebrow">Phone</div>
              <a href={CONTACT.phoneHref} className="text-display mt-3 block text-2xl font-bold hover:text-dragon transition">
                {CONTACT.phone}
              </a>
            </div>
            <div>
              <div className="section-eyebrow">Head Office</div>
              <div className="text-display mt-3 text-lg font-bold">{CONTACT.headOffice}</div>
            </div>
            <div>
              <div className="section-eyebrow">Global Sourcing</div>
              <div className="text-display mt-3 text-lg font-bold">Shanghai · Guangzhou · Rotterdam · Dubai</div>
              <p className="mt-3 text-[13px] leading-relaxed text-steel">
                Direct OEM channels across Asia, Europe and the Middle East. Vetted secondary market for cost-optimised procurements.
              </p>
            </div>
          </div>

          <form
            className="md:col-span-7 border border-border bg-concrete p-8"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailto();
            }}
          >
            <div className="section-eyebrow">Request a Quote</div>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.25em] text-steel">Name</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 block w-full border border-border bg-arch-white px-4 py-3 text-[14px] focus:border-dragon focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.25em] text-steel">Company</span>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mt-2 block w-full border border-border bg-arch-white px-4 py-3 text-[14px] focus:border-dragon focus:outline-none"
                />
              </label>
            </div>
            <label className="mt-6 block">
              <span className="text-[11px] uppercase tracking-[0.25em] text-steel">Interested in</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 block w-full border border-border bg-arch-white px-4 py-3 text-[14px] focus:border-dragon focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
                <option value="other">Other / General enquiry</option>
              </select>
            </label>
            <label className="mt-6 block">
              <span className="text-[11px] uppercase tracking-[0.25em] text-steel">Message</span>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Volume, delivery site, preferred spec, timing…"
                className="mt-2 block w-full border border-border bg-arch-white px-4 py-3 text-[14px] focus:border-dragon focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="mt-8 w-full bg-dragon px-6 py-4 text-[12px] font-bold uppercase tracking-[0.3em] text-arch-white hover:bg-dragon-deep transition"
            >
              Send Enquiry
            </button>
            <p className="mt-3 text-center text-[11px] text-steel">
              Opens your email client · we respond within 1 business day.
            </p>
          </form>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
