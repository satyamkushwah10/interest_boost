import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, AuthInput, AuthButton } from "@/components/auth-shell";
import { loginUser } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — InterestBoost" }, { name: "description", content: "Sign in to your InterestBoost account." }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email.trim()) {
        throw new Error("Email is required");
      }
      if (!password.trim()) {
        throw new Error("Password is required");
      }

      // Login user
      loginUser(email, password);
      
      // Redirect to dashboard
      await navigate({ to: "/dashboard" });
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to access your marketplace dashboard."
      footer={<>Don't have an account? <Link to="/signup" className="text-foreground hover:underline">Sign up</Link></>}
    >
      <form className="space-y-4" onSubmit={handleLogin}>
        {error && (
          <div className="bg-destructive/20 border border-destructive/30 text-destructive text-sm px-3 py-2 rounded">
            {error}
          </div>
        )}
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
        <div>
          <label className="text-xs text-muted-foreground">Password</label>
          <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password@123"
        className="mt-1.5 w-full h-10 rounded-lg bg-background/40 border border-border px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      >
        {showPassword ? (
          <Eye className="h-4 w-4" />
        ) : (
          <EyeOff className="h-4 w-4" />
        )}
      </button>
    </div>
          {/* <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-1.5 w-full h-10 rounded-lg bg-background/40 border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition"
          /> */}
        </div>
        {/* <div className="flex items-center justify-between text-xs text-muted-foreground">
          <label className="flex items-center gap-2"><input type="checkbox" className="accent-primary" /> Remember me</label>
          <a href="#" className="hover:text-foreground">Forgot password?</a>
        </div> */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 rounded-lg bg-linear-to-r from-primary to-secondary text-sm font-medium text-primary-foreground hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
        {/* <div className="flex items-center gap-3 text-xs text-muted-foreground"><div className="flex-1 h-px bg-border" />or<div className="flex-1 h-px bg-border" /></div> */}
       
      </form>
    </AuthShell>
  );
}
