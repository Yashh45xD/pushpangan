import React, { useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, Flower2, KeyRound, AlertCircle, CheckCircle2 } from "lucide-react";

/*
 * Pushpangan Clean Off-White Beige Light Theme:
 * Main Background: Warm Beige / Ivory (#F5F3E9 / #E9E7DF)
 * Card: Off-White (#FFFFFF)
 * Accent Borders: Soft Khaki / Beige (#E2DCBE / #9F905E)
 * Primary Accent: Golden Mustard (#B68F38)
 * Primary Text: Deep Olive Green (#4F5535)
 */

export const AdminLogin: React.FC = () => {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("admin@pushpangan.com");
  const [password, setPassword] = useState("admin123");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login({ email, password, rememberMe });
      if (!res.success) {
        setError(res.message || "Invalid credentials or unauthorized role.");
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
      setShowForgotModal(false);
      setResetEmail("");
    }, 2500);
  };

  const setDemoCredentials = (roleEmail: string, rolePass: string) => {
    setEmail(roleEmail);
    setPassword(rolePass);
  };

  return (
    <div
      style={{ backgroundColor: "#F5F3E9" }}
      className="min-h-screen relative flex items-center justify-center p-4 font-sans text-[#4F5535] overflow-hidden"
    >
      {/* Soft Decorative Beige Glows */}
      <div
        style={{ backgroundColor: "rgba(182, 143, 56, 0.15)" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
      ></div>
      <div
        style={{ backgroundColor: "rgba(79, 85, 53, 0.1)" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
      ></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div
            style={{ backgroundColor: "#B68F38" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg border border-[#E2DCBE] mb-4 transform hover:rotate-6 transition-transform text-white"
          >
            <Flower2 className="w-9 h-9" />
          </div>
          <h1 style={{ color: "#4F5535" }} className="text-3xl font-extrabold tracking-tight">
            Pushpangan Admin
          </h1>
          <p style={{ color: "#B68F38" }} className="text-xs mt-1 font-extrabold tracking-wide">
            Wholesale & Retail Fresh Flower Portal
          </p>
        </div>

        {/* Off-White Clean Login Card */}
        <div
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE" }}
          className="rounded-3xl p-8 shadow-xl border"
        >
          <div style={{ borderColor: "#E2DCBE" }} className="flex items-center justify-between pb-6 mb-6 border-b">
            <div>
              <h2 style={{ color: "#4F5535" }} className="text-lg font-bold flex items-center gap-2">
                <ShieldCheck style={{ color: "#B68F38" }} className="w-5 h-5" /> Authorized Sign In
              </h2>
              <p style={{ color: "#666851" }} className="text-xs">Protected Admin Portal Access</p>
            </div>
            <span
              style={{ backgroundColor: "rgba(182, 143, 56, 0.15)", color: "#B68F38", borderColor: "#E2DCBE" }}
              className="text-xs font-extrabold px-3 py-1 rounded-full border"
            >
              Enterprise Admin
            </span>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 text-xs flex items-start gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label style={{ color: "#4F5535" }} className="block text-xs font-bold mb-1.5 uppercase tracking-wider">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail style={{ color: "#9F905E" }} className="absolute left-3.5 top-3.5 w-4 h-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@pushpangan.com"
                  required
                  style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                  className="w-full border focus:border-[#B68F38] rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none transition font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label style={{ color: "#4F5535" }} className="block text-xs font-bold uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  style={{ color: "#B68F38" }}
                  className="text-xs hover:underline transition font-bold"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock style={{ color: "#9F905E" }} className="absolute left-3.5 top-3.5 w-4 h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                  className="w-full border focus:border-[#B68F38] rounded-xl py-2.5 pl-10 pr-10 text-sm outline-none transition font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ color: "#666851" }}
                  className="absolute right-3.5 top-3.5 hover:opacity-80 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label style={{ color: "#666851" }} className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#B68F38] focus:ring-[#B68F38]"
                />
                <span>Remember this browser (30 Days)</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: "#4F5535", color: "#FFFFFF" }}
              className="w-full mt-4 font-bold py-3 px-4 rounded-xl shadow hover:bg-[#383d26] transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" /> Access Admin Dashboard
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div style={{ borderColor: "#E2DCBE" }} className="mt-8 pt-6 border-t">
            <p style={{ color: "#666851" }} className="text-xs font-bold mb-2.5 text-center">
              Quick Demo Credentials (Click to autofill):
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDemoCredentials("admin@pushpangan.com", "admin123")}
                style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE" }}
                className="text-xs border p-2 rounded-xl text-left transition hover:opacity-80"
              >
                <div style={{ color: "#B68F38" }} className="font-extrabold">Super Admin</div>
                <div style={{ color: "#666851" }} className="text-[10px]">admin@pushpangan.com</div>
              </button>
              <button
                type="button"
                onClick={() => setDemoCredentials("manager@pushpangan.com", "manager123")}
                style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE" }}
                className="text-xs border p-2 rounded-xl text-left transition hover:opacity-80"
              >
                <div style={{ color: "#4F5535" }} className="font-extrabold">Store Manager</div>
                <div style={{ color: "#666851" }} className="text-[10px]">manager@pushpangan.com</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div style={{ backgroundColor: "#FFFFFF", color: "#4F5535" }} className="border border-[#E2DCBE] rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h3 style={{ color: "#4F5535" }} className="text-lg font-bold mb-2 flex items-center gap-2">
              <KeyRound style={{ color: "#B68F38" }} className="w-5 h-5" /> Reset Admin Password
            </h3>
            <p style={{ color: "#666851" }} className="text-xs mb-4">
              Enter your registered admin email address to receive password reset instructions.
            </p>

            {resetSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Reset link sent to {resetEmail}! Please check your email inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label style={{ color: "#4F5535" }} className="block text-xs font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="admin@pushpangan.com"
                    required
                    style={{ backgroundColor: "#F5F3E9", borderColor: "#E2DCBE", color: "#4F5535" }}
                    className="w-full border rounded-xl px-3.5 py-2 text-sm outline-none focus:border-[#B68F38]"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ backgroundColor: "#B68F38", color: "#FFFFFF" }}
                    className="px-4 py-2 text-xs font-bold rounded-xl shadow"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
