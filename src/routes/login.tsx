import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useId } from "react";
import { SITE } from "@/lib/site";
import { Logo } from "@/components/site/Logo";
import { authService } from "@/services/authService";
import { useCart } from "@/lib/CartContext";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: `Log In & Account Access — ${SITE.brand}` },
      { name: "description", content: `Log in to your ${SITE.brand} account for wholesale flower pricing, order history, and account management.` },
    ],
  }),
  component: LoginPage,
});

type AuthMode = "login" | "forgot" | "register";

function LoginPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [forgotStep, setForgotStep] = useState<1 | 2 | 3>(1);
  const { mergeGuestCart } = useCart();

  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register states
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regAccountType, setRegAccountType] = useState("retail");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Forgot password states
  const [resetContact, setResetContact] = useState("");
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Validation & Feedback
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Unique IDs for accessibility
  const loginEmailId = useId();
  const loginPasswordId = useId();
  const regNameId = useId();
  const regEmailId = useId();
  const regPhoneId = useId();
  const regTypeId = useId();
  const regPassId = useId();
  const regConfirmPassId = useId();
  const resetContactId = useId();
  const newPassId = useId();
  const confirmNewPassId = useId();

  const mainHeadingRef = useRef<HTMLHeadingElement>(null);

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setErrorMsg("");
    setSuccessMsg("");
    setForgotStep(1);
    setTimeout(() => mainHeadingRef.current?.focus(), 50);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper: sync a user login event to admin users list
  const syncLoginToAdminUsers = (email: string, displayName: string) => {
    try {
      const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      const today = new Date().toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });

      const existingData = localStorage.getItem("pushpangan_admin_users");
      const existingUsers: any[] = existingData ? JSON.parse(existingData) : [];

      // Check if user already exists by email
      const existingIdx = existingUsers.findIndex((u: any) => u.email === email);

      if (existingIdx !== -1) {
        // Update last login time
        existingUsers[existingIdx].lastLogin = `Today at ${now}`;
        existingUsers[existingIdx].status = "Active";
      } else {
        // New user seen for first time — add to list
        const newUserRecord = {
          _id: "usr_" + Date.now(),
          name: displayName,
          email: email,
          phone: "",
          role: "Customer",
          status: "Active",
          joinedDate: today,
          accountId: "usr" + Math.random().toString(36).substring(2, 8),
          accountType: "Customer Account",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
          totalOrders: 0,
          totalSpent: 0,
          lastLogin: `Today at ${now}`,
          addresses: [],
          recentOrders: [],
        };
        existingUsers.unshift(newUserRecord);
      }

      localStorage.setItem("pushpangan_admin_users", JSON.stringify(existingUsers));
    } catch (e) {
      console.warn("Failed to sync login to admin users:", e);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setErrorMsg("Please enter both your email/phone and password.");
      scrollToTop();
      return;
    }

    setIsLoading(true);
    try {
      const profile = await authService.signIn(loginEmail, loginPassword);
      // Save user session to localStorage
      const userSession = {
        name: profile.full_name,
        email: profile.email,
        phone: profile.phone,
        id: profile.id,
        role: profile.role,
        token: localStorage.getItem("pushpangan_token"),
        loggedIn: true
      };
      localStorage.setItem("siteUser", JSON.stringify(userSession));
      // Sync to admin users list (update last login or add new user)
      syncLoginToAdminUsers(profile.email, profile.full_name);
      // Merge guest cart with DB cart
      await mergeGuestCart(profile.id);
      setSuccessMsg("Logged in successfully! Redirecting...");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid email or password. Please try again.");
      scrollToTop();
    } finally {
      setIsLoading(false);
    }
  };


  const handleForgotStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!resetContact.trim()) {
      setErrorMsg("Please enter your registered email address.");
      scrollToTop();
      return;
    }
    setIsLoading(true);
    try {
      await authService.resetPassword(resetContact);
      setForgotStep(2);
      setSuccessMsg(`Password reset instructions sent to ${resetContact}.`);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to send password reset email.");
      scrollToTop();
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const enteredOtp = otpCode.join("");
    if (enteredOtp.length < 6) {
      setErrorMsg("Please enter the complete 6-digit OTP code.");
      scrollToTop();
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      scrollToTop();
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMsg("Passwords do not match. Please re-enter.");
      scrollToTop();
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setForgotStep(3);
      setSuccessMsg("Your password has been reset successfully.");
    }, 1000);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!regName.trim()) {
      setErrorMsg("Please enter your Full Name or Business Name.");
      scrollToTop();
      return;
    }
    if (!regEmail.trim()) {
      setErrorMsg("Please enter a valid Email Address.");
      scrollToTop();
      return;
    }
    if (!regPhone.trim() || regPhone.trim().length < 10) {
      setErrorMsg("Please enter a valid 10-digit Mobile Number.");
      scrollToTop();
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      scrollToTop();
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMsg("Passwords do not match. Please re-verify your password.");
      scrollToTop();
      return;
    }

    setIsLoading(true);
    try {
      await authService.signUp(regEmail, regPassword, regName, regPhone);

      // Save newly registered user into pushpangan_admin_users for real-time admin view
      try {
        const userRole = regAccountType === "seller" ? "Seller" : "Customer";
        const accountTypeLabel =
          regAccountType === "wholesale"
            ? "Wholesale Trader Account"
            : regAccountType === "event"
            ? "Event Decorator Account"
            : regAccountType === "temple"
            ? "Temple Trust Account"
            : regAccountType === "seller"
            ? "Seller Account"
            : "Customer Account";

        const newUserRecord = {
          _id: "usr_" + Date.now(),
          name: regName.trim(),
          email: regEmail.trim(),
          phone: regPhone.trim(),
          role: userRole,
          status: "Active",
          joinedDate: new Date().toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" }),
          accountId: (userRole === "Seller" ? "sel" : "usr") + Math.random().toString(36).substring(2, 8),
          accountType: accountTypeLabel,
          avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150`,
          totalOrders: 0,
          totalSpent: 0,
          lastLogin: "Just now",
          addresses: [],
          recentOrders: [],
        };

        const existingData = localStorage.getItem("pushpangan_admin_users");
        const existingUsers = existingData ? JSON.parse(existingData) : [];
        existingUsers.unshift(newUserRecord);
        localStorage.setItem("pushpangan_admin_users", JSON.stringify(existingUsers));
      } catch (e) {
        console.warn("Failed to persist user to admin storage:", e);
      }

      setSuccessMsg("Account created successfully. Please sign in.");
      setTimeout(() => {
        switchMode("login");
        setLoginEmail(regEmail);
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to create account. Please try again.");
      scrollToTop();
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newOtp = [...otpCode];
    newOtp[index] = val;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* Header Bar */}
      <header className="border-b border-border/60 bg-card/60 backdrop-blur-md px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Logo />
          <Link
            to="/"
            className="text-sm font-semibold text-primary hover:text-accent transition flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg px-2 py-1"
          >
            ← Back to Store
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 py-12 md:py-16">
        <div className="w-full max-w-md rounded-3xl border border-border/80 bg-card p-6 md:p-8 shadow-xl shadow-primary/5">
          {/* Top Brand & Mode Switch Tabs */}
          <div className="text-center mb-6">
            <h1
              ref={mainHeadingRef}
              tabIndex={-1}
              className="text-2xl md:text-3xl font-display font-semibold text-primary outline-none focus:ring-0"
            >
              {mode === "login" && "Welcome Back"}
              {mode === "forgot" && "Reset Password"}
              {mode === "register" && "Create Account"}
            </h1>
            <p className="mt-1.5 text-sm text-foreground/75">
              {mode === "login" && "Sign in to manage your flower orders & wholesale prices."}
              {mode === "forgot" && "Recover your account credentials securely."}
              {mode === "register" && "Join Pushpangan for fresh dawn harvests & bulk rates."}
            </p>

            {/* Mode Switch Tabs */}
            {mode !== "forgot" && (
              <div className="mt-6 flex rounded-full bg-muted p-1 border border-border/60" role="tablist" aria-label="Account Access">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "login"}
                  aria-controls="login-panel"
                  onClick={() => switchMode("login")}
                  className={`flex-1 rounded-full py-2 text-xs md:text-sm font-semibold transition ${
                    mode === "login"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground/70 hover:text-foreground"
                  } focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "register"}
                  aria-controls="register-panel"
                  onClick={() => switchMode("register")}
                  className={`flex-1 rounded-full py-2 text-xs md:text-sm font-semibold transition ${
                    mode === "register"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground/70 hover:text-foreground"
                  } focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1`}
                >
                  New Account
                </button>
              </div>
            )}
          </div>

          {/* Alert Messages for Screen Readers & Users */}
          {errorMsg && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-4 rounded-2xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div
              role="status"
              aria-live="polite"
              className="mb-4 rounded-2xl border border-primary/30 bg-primary/10 p-3 text-sm text-primary font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{successMsg}</span>
            </div>
          )}

          {/* ==================== 1. LOGIN FORM ==================== */}
          {mode === "login" && (
            <form id="login-panel" role="tabpanel" aria-labelledby="login-tab" onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label htmlFor={loginEmailId} className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-1">
                  Email or Mobile Number <span className="text-destructive">*</span>
                </label>
                <input
                  id={loginEmailId}
                  type="text"
                  required
                  autoComplete="username"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="e.g. name@domain.com or 9876543210"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor={loginPasswordId} className="block text-xs font-semibold uppercase tracking-wider text-foreground/80">
                    Password <span className="text-destructive">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => switchMode("forgot")}
                    className="text-xs font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id={loginPasswordId}
                    type={showLoginPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    aria-label={showLoginPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground p-1 focus-visible:ring-2 focus-visible:ring-primary rounded"
                  >
                    {showLoginPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.043 10.043 0 014.122-.963c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-sm text-foreground/80 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-border accent-primary focus:ring-2 focus:ring-primary"
                  />
                  Remember me on this device
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                aria-busy={isLoading}
                className="mt-4 w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:brightness-110 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {isLoading ? "Signing in…" : "Sign In"}
              </button>
            </form>
          )}

          {/* ==================== 2. FORGOT PASSWORD FLOW ==================== */}
          {mode === "forgot" && (
            <div>
              {/* STEP 1: Enter email or phone */}
              {forgotStep === 1 && (
                <form onSubmit={handleForgotStep1} className="space-y-4">
                  <div>
                    <label htmlFor={resetContactId} className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-1">
                      Registered Email or Mobile Number <span className="text-destructive">*</span>
                    </label>
                    <input
                      id={resetContactId}
                      type="text"
                      required
                      value={resetContact}
                      onChange={(e) => setResetContact(e.target.value)}
                      placeholder="Enter registered email or phone"
                      className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <p className="text-xs text-foreground/70 leading-relaxed">
                    We will send a 6-digit verification OTP code to your registered contact for identity verification.
                  </p>

                  <button
                    type="submit"
                    disabled={isLoading}
                    aria-busy={isLoading}
                    className="w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:brightness-110 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {isLoading ? "Sending OTP…" : "Send Reset Code"}
                  </button>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => switchMode("login")}
                      className="text-xs font-semibold text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary rounded p-1"
                    >
                      ← Back to Sign In
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: Enter OTP & New Password */}
              {forgotStep === 2 && (
                <form onSubmit={handleForgotStep2} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2">
                      Enter 6-Digit OTP Code <span className="text-destructive">*</span>
                    </label>
                    <div className="flex gap-2 justify-between" role="group" aria-label="6-digit verification code">
                      {otpCode.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-input-${idx}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          aria-label={`Digit ${idx + 1}`}
                          className="h-12 w-12 rounded-xl border border-border bg-background text-center text-lg font-bold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor={newPassId} className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-1">
                      New Password <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id={newPassId}
                        type={showNewPassword ? "text" : "password"}
                        required
                        autoComplete="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="At least 8 characters"
                        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground p-1 focus-visible:ring-2 focus-visible:ring-primary rounded"
                      >
                        {showNewPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={confirmNewPassId} className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-1">
                      Confirm New Password <span className="text-destructive">*</span>
                    </label>
                    <input
                      id={confirmNewPassId}
                      type="password"
                      required
                      autoComplete="new-password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    aria-busy={isLoading}
                    className="w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:brightness-110 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {isLoading ? "Resetting Password…" : "Reset & Save Password"}
                  </button>

                  <div className="pt-2 flex justify-between text-xs font-semibold text-foreground/70">
                    <button
                      type="button"
                      onClick={() => setForgotStep(1)}
                      className="text-primary hover:underline focus-visible:ring-1 focus-visible:ring-primary rounded p-1"
                    >
                      ← Edit Contact Info
                    </button>
                    <button
                      type="button"
                      onClick={() => setSuccessMsg("A new OTP has been sent.")}
                      className="text-accent hover:underline focus-visible:ring-1 focus-visible:ring-accent rounded p-1"
                    >
                      Resend Code
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: Reset Success */}
              {forgotStep === 3 && (
                <div className="text-center py-4 space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-display font-semibold text-primary">Password Reset Complete!</h2>
                  <p className="text-sm text-foreground/75">
                    Your password has been updated successfully. You can now log in using your new credentials.
                  </p>
                  <button
                    type="button"
                    onClick={() => switchMode("login")}
                    className="w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    Proceed to Sign In
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ==================== 3. REGISTER FORM ==================== */}
          {mode === "register" && (
            <form id="register-panel" role="tabpanel" aria-labelledby="register-tab" onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label htmlFor={regNameId} className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-1">
                  Full Name / Business Name <span className="text-destructive">*</span>
                </label>
                <input
                  id={regNameId}
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Yash Flowers or Rajesh Patil"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label htmlFor={regEmailId} className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-1">
                  Email Address <span className="text-destructive">*</span>
                </label>
                <input
                  id={regEmailId}
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label htmlFor={regPhoneId} className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-1">
                  Mobile Number <span className="text-destructive">*</span>
                </label>
                <input
                  id={regPhoneId}
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label htmlFor={regTypeId} className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-1">
                  Account Type
                </label>
                <select
                  id={regTypeId}
                  value={regAccountType}
                  onChange={(e) => setRegAccountType(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="retail">Retail Buyer / Household</option>
                  <option value="wholesale">Wholesale Trader / Bulk Buyer</option>
                  <option value="event">Wedding & Event Decorator</option>
                  <option value="temple">Temple Trust / Event Organizer</option>
                </select>
              </div>

              <div>
                <label htmlFor={regPassId} className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-1">
                  Password <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    id={regPassId}
                    type={showRegPassword ? "text" : "password"}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    aria-label={showRegPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground p-1 focus-visible:ring-2 focus-visible:ring-primary rounded"
                  >
                    {showRegPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor={regConfirmPassId} className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-1">
                  Confirm Password <span className="text-destructive">*</span>
                </label>
                <input
                  id={regConfirmPassId}
                  type="password"
                  required
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                aria-busy={isLoading}
                className="mt-2 w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:brightness-110 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {isLoading ? "Creating Account…" : "Create Free Account"}
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 py-4 text-center text-xs text-foreground/60">
        © {new Date().getFullYear()} {SITE.brand}. All rights reserved. • Trusted fresh flower supplier across Maharashtra.
      </footer>
    </div>
  );
}
