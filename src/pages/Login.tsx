import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Stethoscope, User, ShieldCheck } from "lucide-react";
import logo from "@/assets/logo.png";

type UserRole = "user" | "clinician" | "admin";

const roleConfig = {
  user: { label: "Patient / User", icon: User, color: "bg-healthcare-blue" },
  clinician: { label: "Clinician", icon: Stethoscope, color: "bg-healthcare-teal" },
  admin: { label: "Admin", icon: ShieldCheck, color: "bg-healthcare-red" },
};

const Login = () => {
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get("role") as UserRole) || "user";
  const [role, setRole] = useState<UserRole>(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password, role });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logo} alt="DuxtHealth" className="h-14 w-14 mx-auto mb-3 object-contain" />
          </Link>
          <h1 className="font-display text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in to your DuxtHealth account</p>
        </div>

        {/* Role Tabs */}
        <div className="flex gap-2 mb-6 p-1 bg-muted rounded-lg">
          {(Object.keys(roleConfig) as UserRole[]).map((r) => {
            const config = roleConfig[r];
            return (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-md text-xs font-medium transition-all ${
                  role === r
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <config.icon size={14} />
                {config.label}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-input" />
              <span className="text-muted-foreground">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
          </div>

          <button type="submit" className="auth-button">
            Sign In as {roleConfig[role].label}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link to={`/signup?role=${role}`} className="text-primary font-medium hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
