import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo-new.png.asset.json";
import { CONTACT } from "@/lib/site";
import { QianTronWordmark } from "./QianTronWordmark";
import { supabase } from "@/integrations/supabase/client";

export function SiteNav() {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setSignedIn(!!session));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full bg-charcoal/85 backdrop-blur-xl border-b border-white/5">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo.url} alt="QianTron" className="h-9 w-9 object-contain" />
          <QianTronWordmark className="h-5 w-auto" />
        </Link>
        <div className="hidden gap-8 text-[11px] font-medium uppercase tracking-[0.25em] text-arch-white/70 md:flex">
          <Link to="/" className="hover:text-dragon transition" activeProps={{ className: "text-dragon" }}>Home</Link>
          <Link to="/about" className="hover:text-dragon transition" activeProps={{ className: "text-dragon" }}>About</Link>
          <Link to="/services" className="hover:text-dragon transition" activeProps={{ className: "text-dragon" }}>Services</Link>
          <Link to="/category/$slug" params={{ slug: "excavators" }} className="hover:text-dragon transition">Machinery</Link>
          <Link to="/contact" className="hover:text-dragon transition" activeProps={{ className: "text-dragon" }}>Contact</Link>
          {signedIn && <Link to="/admin" className="text-dragon hover:underline">Admin</Link>}
        </div>
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center gap-2 border border-dragon px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-arch-white hover:bg-dragon transition"
        >
          Request Quote
        </Link>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="relative bg-graphite text-arch-white">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <div className="flex flex-col items-center text-center">
          <img src={logo.url} alt="QianTron" className="h-24 w-24 object-contain drop-shadow-[0_0_40px_rgba(183,28,28,0.4)]" />
          <div className="mt-8 w-full max-w-2xl">
            <QianTronWordmark className="w-full h-auto" />
          </div>
          <div className="mt-6 h-[1px] w-24 bg-dragon" />
          <p className="text-editorial mt-6 max-w-2xl text-xl leading-snug text-arch-white/85">
            Global Sourcing. Seamless Logistics. Delivered across Africa.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-arch-white/10 pt-10 md:grid-cols-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-arch-white/50">Head Office</div>
            <div className="text-display mt-3 text-lg font-bold">{CONTACT.headOffice}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-arch-white/50">Sourcing</div>
            <div className="text-display mt-3 text-lg font-bold">Global · Shanghai · Guangzhou · Rotterdam</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-arch-white/50">Email</div>
            <a href={CONTACT.emailHref} className="text-display mt-3 block text-lg font-bold hover:text-dragon transition">
              {CONTACT.email}
            </a>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-arch-white/50">Voice</div>
            <a href={CONTACT.phoneHref} className="text-display mt-3 block text-lg font-bold hover:text-dragon transition">
              {CONTACT.phone}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-arch-white/10 pt-8 text-[10px] uppercase tracking-[0.3em] text-arch-white/40 md:flex-row">
          <div>© MMXXV QianTron · All Rights Reserved</div>
          <div>Corporate Profile · Volume I</div>
        </div>
      </div>
    </footer>
  );
}
