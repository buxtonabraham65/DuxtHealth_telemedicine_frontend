import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Stethoscope, User, ShieldCheck } from "lucide-react";
import logo from "@/assets/logo.png";

type UserRole = "user" | "clinician" | "admin";

const roleConfig = {
  user: { label: "Patient / User", icon: User },
  clinician: { label: "Clinician", icon: Stethoscope },
  admin: { label: "Admin", icon: ShieldCheck },
};

const Signup = () => {
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get("role") as UserRole) || "user";
  const [role, setRole] = useState<UserRole>(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    license: "",
    specialty: "",
    adminCode: "",
  });

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup:", { ...formData, role });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logo} alt="DuxtHealth" className="h-14 w-14 mx-auto mb-3 object-contain" />
          </Link>
          <h1 className="font-display text-2xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground text-sm mt-1">Join DuxtHealth today</p>
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
            <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              className="auth-input"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => update("email", e.target.value)}
              className="auth-input"
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Clinician-specific fields */}
          {role === "clinician" && (
            <>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Medical License Number</label>
                <input
                  type="text"
                  value={formData.license}
                  onChange={(e) => update("license", e.target.value)}
                  className="auth-input"
                  placeholder="License #"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Specialty</label>
                <select
                  value={formData.specialty}
                  onChange={(e) => update("specialty", e.target.value)}
                  className="auth-input"
                  required
                >
                  <option value="">Select specialty</option>
                  <option value="general">General Practice</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="neurology">Neurology</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="psychiatry">Psychiatry</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </>
          )}

          {/* Admin-specific field */}
          {role === "admin" && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Admin Access Code</label>
              <input
                type="text"
                value={formData.adminCode}
                onChange={(e) => update("adminCode", e.target.value)}
                className="auth-input"
                placeholder="Enter admin code"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => update("password", e.target.value)}
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

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              className="auth-input"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" className="rounded border-input mt-1" required />
            <span className="text-sm text-muted-foreground">
              I agree to the <Link to="/" className="text-primary hover:underline">Terms of Service</Link> and{" "}
              <Link to="/" className="text-primary hover:underline">Privacy Policy</Link>
            </span>
          </div>

          <button type="submit" className="auth-button">
            Create {roleConfig[role].label} Account
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to={`/login?role=${role}`} className="text-primary font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
