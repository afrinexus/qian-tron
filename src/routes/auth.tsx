import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { QianTronWordmark } from "@/components/QianTronWordmark";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — QianTron Admin" },
      { name: "description", content: "QianTron admin sign-in." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/admin", replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        toast.success("Account created. If email confirmation is required, check your inbox.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Auth failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-charcoal px-4 text-arch-white">
      <div className="w-full max-w-md border border-white/10 bg-graphite/40 p-10 backdrop-blur">
        <Link to="/" className="block">
          <QianTronWordmark className="mx-auto h-8 w-auto" />
        </Link>
        <div className="section-eyebrow mt-8 !text-dragon text-center">Admin Portal</div>
        <h1 className="text-display mt-3 text-center text-3xl font-black">
          {mode === "signin" ? "Sign in" : "Create admin"}
        </h1>
        <p className="mt-2 text-center text-[12px] text-arch-white/60">
          {mode === "signup" ? "The first account created becomes an administrator." : "Restricted to QianTron trade desk."}
        </p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.3em] text-arch-white/60">Email</span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 block w-full border border-white/15 bg-charcoal px-4 py-3 text-sm focus:border-dragon focus:outline-none" />
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.3em] text-arch-white/60">Password</span>
            <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 block w-full border border-white/15 bg-charcoal px-4 py-3 text-sm focus:border-dragon focus:outline-none" />
          </label>
          <button type="submit" disabled={busy} className="w-full bg-dragon px-6 py-3 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-dragon-deep disabled:opacity-60">
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 block w-full text-center text-[11px] uppercase tracking-[0.3em] text-arch-white/60 hover:text-dragon"
        >
          {mode === "signin" ? "Need to create the first admin account? →" : "← Back to sign in"}
        </button>
        <Link to="/" className="mt-6 block text-center text-[10px] uppercase tracking-[0.3em] text-arch-white/40 hover:text-arch-white">
          ← Back to site
        </Link>
      </div>
    </main>
  );
}
