import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { checkIsAdmin } from "@/lib/cms.functions";
import { QianTronWordmark } from "@/components/QianTronWordmark";
import { BarChart3, Inbox, Wrench, LogOut, Home } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminShell,
});

function AdminShell() {
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const check = useServerFn(checkIsAdmin);
  const { data, isLoading } = useQuery({ queryKey: ["is-admin"], queryFn: () => check() });

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-charcoal text-arch-white/60">Loading…</div>;
  }
  if (!data?.isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-charcoal text-arch-white">
        <div className="text-display text-4xl font-black text-dragon">Not authorised</div>
        <p className="text-arch-white/70">This account does not have admin access.</p>
        <button onClick={signOut} className="border border-dragon px-4 py-2 text-[11px] uppercase tracking-[0.3em]">Sign out</button>
      </div>
    );
  }

  const items = [
    { to: "/admin", label: "Overview", icon: BarChart3 },
    { to: "/admin/enquiries", label: "Enquiries", icon: Inbox },
    { to: "/admin/machinery", label: "Machinery CMS", icon: Wrench },
  ];

  return (
    <div className="flex min-h-screen bg-arch-white text-charcoal">
      <aside className="hidden w-64 flex-col border-r border-border bg-charcoal p-6 text-arch-white md:flex">
        <Link to="/" className="block">
          <QianTronWordmark className="h-6 w-auto" />
        </Link>
        <div className="mt-1 text-[9px] uppercase tracking-[0.3em] text-arch-white/50">Admin Console</div>

        <nav className="mt-10 flex-1 space-y-1">
          {items.map((it) => {
            const active = it.to === "/admin" ? path === "/admin" : path.startsWith(it.to);
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`flex items-center gap-3 border-l-2 px-3 py-2.5 text-[11px] uppercase tracking-[0.2em] transition ${
                  active ? "border-dragon bg-white/5 text-arch-white" : "border-transparent text-arch-white/60 hover:text-arch-white"
                }`}
              >
                <it.icon className="h-4 w-4" />
                {it.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 space-y-2 border-t border-white/10 pt-6">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-arch-white/60 hover:text-dragon">
            <Home className="h-4 w-4" /> View site
          </Link>
          <button onClick={signOut} className="flex w-full items-center gap-3 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-arch-white/60 hover:text-dragon">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-concrete">
        <Outlet />
      </main>
    </div>
  );
}
