import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, AuthInput, AuthButton } from "@/components/auth-shell";
import { registerUser } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";
export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — InterestBoost" }, { name: "description", content: "Create your InterestBoost account and start your free trial." }] }),
  component: Signup,
});

function strength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s; // 0-4
}

function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const[showPw, setShowPw] = useState(false);
  
  const s = strength(pw);
  const labels = ["Too weak", "Weak", "Okay", "Strong", "Excellent"];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validation
      if (!fullName.trim()) {
        throw new Error("Full name is required");
      }
      if (!email.trim()) {
        throw new Error("Email is required");
      }
      if (pw.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }
      if (pw !== confirmPw) {
        throw new Error("Passwords do not match");
      }

      // Register user
      registerUser(fullName, email, pw);
      
      // Redirect to login
      await navigate({ to: "/dashboard" });
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start your 14-day free trial. No credit card required."
      footer={<>Already have an account? <Link to="/login" className="text-foreground hover:underline">Log in</Link></>}
    >
      <form className="space-y-4" onSubmit={handleSignup}>
        {error && (
          <div className="bg-destructive/20 border border-destructive/30 text-destructive text-sm px-3 py-2 rounded">
            {error}
          </div>
        )}
        <div>
          <label className="text-xs text-muted-foreground">Full name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Alex Carter"
            className="mt-1.5 w-full h-10 rounded-lg bg-background/40 border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="mt-1.5 w-full h-10 rounded-lg bg-background/40 border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition"
          />
        </div>
        <label className="block">
          <span className="text-xs text-muted-foreground">Password</span>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="At least 8 characters"
              className="mt-1.5 w-full h-10 rounded-lg bg-background/40 border border-border px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition"
            />

            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPw ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>
          </div>
          <div className="mt-2 flex gap-1.5">
            {[0,1,2,3].map((i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition ${i < s ? "bg-linear-to-r from-primary to-secondary" : "bg-muted"}`} />
            ))}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{pw ? labels[s] : "Use 8+ chars with a number and symbol"}</div>
        </label>
        <div>
          <label className="text-xs text-muted-foreground">Confirm password</label>
         <div className="relative">
  <input
    type={showConfirmPw ? "text" : "password"}
    value={confirmPw}
    onChange={(e) => setConfirmPw(e.target.value)}
    placeholder="••••••••"
    className="mt-1.5 w-full h-10 rounded-lg bg-background/40 border border-border px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition"
  />

  <button
    type="button"
    onClick={() => setShowConfirmPw(!showConfirmPw)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
  >
    {showConfirmPw ? (
      <Eye className="h-4 w-4" />
    ) : (
      <EyeOff className="h-4 w-4" />
    )}
  </button>
</div>
        </div>
        {/* <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <input type="checkbox" className="accent-primary mt-0.5" />
          <span>I agree to the <a href="#" className="text-foreground hover:underline">Terms</a> and <a href="#" className="text-foreground hover:underline">Privacy Policy</a>.</span>
        </label> */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 rounded-lg bg-linear-to-r from-primary to-secondary text-sm font-medium text-primary-foreground hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
        {/* <div className="flex items-center gap-3 text-xs text-muted-foreground"><div className="flex-1 h-px bg-border" />or<div className="flex-1 h-px bg-border" /></div>
        <GoogleButton /> */}
      </form>
    </AuthShell>
  );
}
