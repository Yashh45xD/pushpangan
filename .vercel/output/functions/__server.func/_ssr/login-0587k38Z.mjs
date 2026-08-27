import { i as __toESM } from "../_runtime.mjs";
import { t as API_URL } from "./api-CnTWETQ1.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { r as useCart } from "./CartContext-CGJFQYZO.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as SITE } from "./site-CY1ANRF-.mjs";
import { n as Logo } from "./Logo-CQa98m5F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-0587k38Z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var API_BASE = `${API_URL}/api`;
var SESSION_STORAGE_KEY = "pushpangan_user_session";
var authService = {
	async signUp(email, password_hash, fullName, phone) {
		const cleanEmail = email.trim().toLowerCase();
		const cleanName = fullName.trim();
		const cleanPhone = phone.trim();
		if (!cleanName) throw new Error("Full name is required.");
		if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) throw new Error("Please enter a valid email address (e.g. name@domain.com).");
		if (!cleanPhone || cleanPhone.length < 10) throw new Error("Please enter a valid 10-digit mobile number.");
		if (!password_hash || password_hash.length < 6) throw new Error("Password must be at least 6 characters long.");
		try {
			const response = await fetch(`${API_BASE}/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: cleanName,
					email: cleanEmail,
					phone: cleanPhone,
					password: password_hash
				})
			});
			const data = await response.json();
			if (!response.ok || !data.success) throw new Error(data.message || "Registration failed.");
			const payload = data.data;
			const userProfile = {
				id: payload.user.id || payload.user._id,
				full_name: payload.user.name,
				email: payload.user.email,
				phone: payload.user.phone,
				role: payload.user.role
			};
			if (payload.token) localStorage.setItem("pushpangan_token", payload.token);
			localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userProfile));
			return userProfile;
		} catch (err) {
			if (err.name === "TypeError" && err.message.includes("fetch")) throw new Error("Unable to connect to the server. Please make sure the backend is running.");
			throw err;
		}
	},
	async signIn(email, password_hash) {
		const cleanEmail = email.trim();
		const normalizedEmail = cleanEmail.includes("@") ? cleanEmail.toLowerCase() : cleanEmail;
		if (!normalizedEmail) throw new Error("Please enter your registered email address or mobile number.");
		if (!password_hash) throw new Error("Please enter your password.");
		try {
			const response = await fetch(`${API_BASE}/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: normalizedEmail,
					password: password_hash
				})
			});
			const data = await response.json();
			if (!response.ok || !data.success) throw new Error(data.message || "Invalid credentials.");
			const payload = data.data;
			const userProfile = {
				id: payload.user.id || payload.user._id,
				full_name: payload.user.name,
				email: payload.user.email,
				phone: payload.user.phone,
				role: payload.user.role
			};
			if (payload.token) localStorage.setItem("pushpangan_token", payload.token);
			localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userProfile));
			return userProfile;
		} catch (err) {
			if (err.name === "TypeError" && err.message.includes("fetch")) throw new Error("Unable to connect to the server. Please make sure the backend is running.");
			throw err;
		}
	},
	async signInWithGoogle() {
		const googleUser = {
			id: `google_${Date.now()}`,
			full_name: "Google Customer",
			email: "customer@gmail.com",
			role: "customer"
		};
		localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(googleUser));
		return googleUser;
	},
	async resetPassword(email) {
		const cleanEmail = email.trim().toLowerCase();
		if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) throw new Error("Please enter a valid email address.");
		return {
			success: true,
			message: `Password reset link sent to ${cleanEmail}`
		};
	},
	async signOut() {
		localStorage.removeItem(SESSION_STORAGE_KEY);
		localStorage.removeItem("pushpangan_token");
	},
	async getCurrentUserProfile() {
		try {
			const data = localStorage.getItem(SESSION_STORAGE_KEY);
			if (!data) return null;
			return JSON.parse(data);
		} catch {
			return null;
		}
	},
	async isAdmin() {
		return (await this.getCurrentUserProfile())?.role === "admin";
	}
};
function LoginPage() {
	const [mode, setMode] = (0, import_react.useState)("login");
	const [forgotStep, setForgotStep] = (0, import_react.useState)(1);
	const { mergeGuestCart } = useCart();
	const [loginEmail, setLoginEmail] = (0, import_react.useState)("");
	const [loginPassword, setLoginPassword] = (0, import_react.useState)("");
	const [showLoginPassword, setShowLoginPassword] = (0, import_react.useState)(false);
	const [rememberMe, setRememberMe] = (0, import_react.useState)(true);
	const [regName, setRegName] = (0, import_react.useState)("");
	const [regEmail, setRegEmail] = (0, import_react.useState)("");
	const [regPhone, setRegPhone] = (0, import_react.useState)("");
	const [regAccountType, setRegAccountType] = (0, import_react.useState)("retail");
	const [regPassword, setRegPassword] = (0, import_react.useState)("");
	const [regConfirmPassword, setRegConfirmPassword] = (0, import_react.useState)("");
	const [showRegPassword, setShowRegPassword] = (0, import_react.useState)(false);
	const [resetContact, setResetContact] = (0, import_react.useState)("");
	const [otpCode, setOtpCode] = (0, import_react.useState)([
		"",
		"",
		"",
		"",
		"",
		""
	]);
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirmNewPassword, setConfirmNewPassword] = (0, import_react.useState)("");
	const [showNewPassword, setShowNewPassword] = (0, import_react.useState)(false);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)("");
	const [successMsg, setSuccessMsg] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const loginEmailId = (0, import_react.useId)();
	const loginPasswordId = (0, import_react.useId)();
	const regNameId = (0, import_react.useId)();
	const regEmailId = (0, import_react.useId)();
	const regPhoneId = (0, import_react.useId)();
	const regTypeId = (0, import_react.useId)();
	const regPassId = (0, import_react.useId)();
	const regConfirmPassId = (0, import_react.useId)();
	const resetContactId = (0, import_react.useId)();
	const newPassId = (0, import_react.useId)();
	const confirmNewPassId = (0, import_react.useId)();
	const mainHeadingRef = (0, import_react.useRef)(null);
	const switchMode = (newMode) => {
		setMode(newMode);
		setErrorMsg("");
		setSuccessMsg("");
		setForgotStep(1);
		setTimeout(() => mainHeadingRef.current?.focus(), 50);
	};
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	const syncLoginToAdminUsers = (email, displayName) => {
		try {
			const now = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit"
			});
			const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
				month: "numeric",
				day: "numeric",
				year: "numeric"
			});
			const existingData = localStorage.getItem("pushpangan_admin_users");
			const existingUsers = existingData ? JSON.parse(existingData) : [];
			const existingIdx = existingUsers.findIndex((u) => u.email === email);
			if (existingIdx !== -1) {
				existingUsers[existingIdx].lastLogin = `Today at ${now}`;
				existingUsers[existingIdx].status = "Active";
			} else {
				const newUserRecord = {
					_id: "usr_" + Date.now(),
					name: displayName,
					email,
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
					recentOrders: []
				};
				existingUsers.unshift(newUserRecord);
			}
			localStorage.setItem("pushpangan_admin_users", JSON.stringify(existingUsers));
		} catch (e) {
			console.warn("Failed to sync login to admin users:", e);
		}
	};
	const handleLoginSubmit = async (e) => {
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
			syncLoginToAdminUsers(profile.email, profile.full_name);
			await mergeGuestCart(profile.id);
			setSuccessMsg("Logged in successfully! Redirecting...");
			setTimeout(() => {
				window.location.href = "/";
			}, 1e3);
		} catch (err) {
			setErrorMsg(err.message || "Invalid email or password. Please try again.");
			scrollToTop();
		} finally {
			setIsLoading(false);
		}
	};
	const handleForgotStep1 = async (e) => {
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
		} catch (err) {
			setErrorMsg(err.message || "Failed to send password reset email.");
			scrollToTop();
		} finally {
			setIsLoading(false);
		}
	};
	const handleForgotStep2 = (e) => {
		e.preventDefault();
		setErrorMsg("");
		if (otpCode.join("").length < 6) {
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
		}, 1e3);
	};
	const handleRegisterSubmit = async (e) => {
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
			try {
				const userRole = regAccountType === "seller" ? "Seller" : "Customer";
				const accountTypeLabel = regAccountType === "wholesale" ? "Wholesale Trader Account" : regAccountType === "event" ? "Event Decorator Account" : regAccountType === "temple" ? "Temple Trust Account" : regAccountType === "seller" ? "Seller Account" : "Customer Account";
				const newUserRecord = {
					_id: "usr_" + Date.now(),
					name: regName.trim(),
					email: regEmail.trim(),
					phone: regPhone.trim(),
					role: userRole,
					status: "Active",
					joinedDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
						month: "numeric",
						day: "numeric",
						year: "numeric"
					}),
					accountId: (userRole === "Seller" ? "sel" : "usr") + Math.random().toString(36).substring(2, 8),
					accountType: accountTypeLabel,
					avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150`,
					totalOrders: 0,
					totalSpent: 0,
					lastLogin: "Just now",
					addresses: [],
					recentOrders: []
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
		} catch (err) {
			setErrorMsg(err.message || "Failed to create account. Please try again.");
			scrollToTop();
		} finally {
			setIsLoading(false);
		}
	};
	const handleOtpChange = (index, val) => {
		if (val.length > 1) val = val.slice(-1);
		const newOtp = [...otpCode];
		newOtp[index] = val;
		setOtpCode(newOtp);
		if (val && index < 5) document.getElementById(`otp-input-${index + 1}`)?.focus();
	};
	const handleOtpKeyDown = (index, e) => {
		if (e.key === "Backspace" && !otpCode[index] && index > 0) document.getElementById(`otp-input-${index - 1}`)?.focus();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground flex flex-col justify-between",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border/60 bg-card/60 backdrop-blur-md px-4 py-4 md:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-sm font-semibold text-primary hover:text-accent transition flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg px-2 py-1",
						children: "← Back to Store"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 flex items-center justify-center p-4 py-12 md:py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-3xl border border-border/80 bg-card p-6 md:p-8 shadow-xl shadow-primary/5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									ref: mainHeadingRef,
									tabIndex: -1,
									className: "text-2xl md:text-3xl font-display font-semibold text-primary outline-none focus:ring-0",
									children: [
										mode === "login" && "Welcome Back",
										mode === "forgot" && "Reset Password",
										mode === "register" && "Create Account"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1.5 text-sm text-foreground/75",
									children: [
										mode === "login" && "Sign in to manage your flower orders & wholesale prices.",
										mode === "forgot" && "Recover your account credentials securely.",
										mode === "register" && "Join Pushpangan for fresh dawn harvests & bulk rates."
									]
								}),
								mode !== "forgot" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex rounded-full bg-muted p-1 border border-border/60",
									role: "tablist",
									"aria-label": "Account Access",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										role: "tab",
										"aria-selected": mode === "login",
										"aria-controls": "login-panel",
										onClick: () => switchMode("login"),
										className: `flex-1 rounded-full py-2 text-xs md:text-sm font-semibold transition ${mode === "login" ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/70 hover:text-foreground"} focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1`,
										children: "Sign In"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										role: "tab",
										"aria-selected": mode === "register",
										"aria-controls": "register-panel",
										onClick: () => switchMode("register"),
										className: `flex-1 rounded-full py-2 text-xs md:text-sm font-semibold transition ${mode === "register" ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/70 hover:text-foreground"} focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1`,
										children: "New Account"
									})]
								})
							]
						}),
						errorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							role: "alert",
							"aria-live": "assertive",
							className: "mb-4 rounded-2xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive font-medium flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								className: "w-5 h-5 shrink-0",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									strokeLinecap: "round",
									strokeLinejoin: "round",
									strokeWidth: 2,
									d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: errorMsg })]
						}),
						successMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							role: "status",
							"aria-live": "polite",
							className: "mb-4 rounded-2xl border border-primary/30 bg-primary/10 p-3 text-sm text-primary font-medium flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								className: "w-5 h-5 shrink-0",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									strokeLinecap: "round",
									strokeLinejoin: "round",
									strokeWidth: 2,
									d: "M5 13l4 4L19 7"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: successMsg })]
						}),
						mode === "login" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							id: "login-panel",
							role: "tabpanel",
							"aria-labelledby": "login-tab",
							onSubmit: handleLoginSubmit,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: loginEmailId,
									className: "block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-1",
									children: ["Email or Mobile Number ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-destructive",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: loginEmailId,
									type: "text",
									required: true,
									autoComplete: "username",
									value: loginEmail,
									onChange: (e) => setLoginEmail(e.target.value),
									placeholder: "e.g. name@domain.com or 9876543210",
									className: "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: loginPasswordId,
										className: "block text-xs font-semibold uppercase tracking-wider text-foreground/80",
										children: ["Password ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => switchMode("forgot"),
										className: "text-xs font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded",
										children: "Forgot Password?"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: loginPasswordId,
										type: showLoginPassword ? "text" : "password",
										required: true,
										autoComplete: "current-password",
										value: loginPassword,
										onChange: (e) => setLoginPassword(e.target.value),
										placeholder: "••••••••",
										className: "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 pr-10"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShowLoginPassword(!showLoginPassword),
										"aria-label": showLoginPassword ? "Hide password" : "Show password",
										className: "absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground p-1 focus-visible:ring-2 focus-visible:ring-primary rounded",
										children: showLoginPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											className: "w-5 h-5",
											fill: "none",
											viewBox: "0 0 24 24",
											stroke: "currentColor",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeWidth: 2,
												d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.043 10.043 0 014.122-.963c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18"
											})
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											className: "w-5 h-5",
											fill: "none",
											viewBox: "0 0 24 24",
											stroke: "currentColor",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeWidth: 2,
												d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeWidth: 2,
												d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											})]
										})
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center justify-between pt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-2 text-sm text-foreground/80 cursor-pointer select-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: rememberMe,
											onChange: (e) => setRememberMe(e.target.checked),
											className: "h-4 w-4 rounded border-border accent-primary focus:ring-2 focus:ring-primary"
										}), "Remember me on this device"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: isLoading,
									"aria-busy": isLoading,
									className: "mt-4 w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:brightness-110 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
									children: isLoading ? "Signing in…" : "Sign In"
								})
							]
						}),
						mode === "forgot" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							forgotStep === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleForgotStep1,
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: resetContactId,
										className: "block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-1",
										children: ["Registered Email or Mobile Number ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: resetContactId,
										type: "text",
										required: true,
										value: resetContact,
										onChange: (e) => setResetContact(e.target.value),
										placeholder: "Enter registered email or phone",
										className: "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-foreground/70 leading-relaxed",
										children: "We will send a 6-digit verification OTP code to your registered contact for identity verification."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: isLoading,
										"aria-busy": isLoading,
										className: "w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:brightness-110 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
										children: isLoading ? "Sending OTP…" : "Send Reset Code"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-2 text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => switchMode("login"),
											className: "text-xs font-semibold text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary rounded p-1",
											children: "← Back to Sign In"
										})
									})
								]
							}),
							forgotStep === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleForgotStep2,
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2",
										children: ["Enter 6-Digit OTP Code ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex gap-2 justify-between",
										role: "group",
										"aria-label": "6-digit verification code",
										children: otpCode.map((digit, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: `otp-input-${idx}`,
											type: "text",
											inputMode: "numeric",
											maxLength: 1,
											value: digit,
											onChange: (e) => handleOtpChange(idx, e.target.value),
											onKeyDown: (e) => handleOtpKeyDown(idx, e),
											"aria-label": `Digit ${idx + 1}`,
											className: "h-12 w-12 rounded-xl border border-border bg-background text-center text-lg font-bold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
										}, idx))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: newPassId,
										className: "block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-1",
										children: ["New Password ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: newPassId,
											type: showNewPassword ? "text" : "password",
											required: true,
											autoComplete: "new-password",
											value: newPassword,
											onChange: (e) => setNewPassword(e.target.value),
											placeholder: "At least 8 characters",
											className: "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 pr-10"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setShowNewPassword(!showNewPassword),
											"aria-label": showNewPassword ? "Hide password" : "Show password",
											className: "absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground p-1 focus-visible:ring-2 focus-visible:ring-primary rounded",
											children: showNewPassword ? "🙈" : "👁️"
										})]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: confirmNewPassId,
										className: "block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-1",
										children: ["Confirm New Password ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: confirmNewPassId,
										type: "password",
										required: true,
										autoComplete: "new-password",
										value: confirmNewPassword,
										onChange: (e) => setConfirmNewPassword(e.target.value),
										placeholder: "Re-enter new password",
										className: "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: isLoading,
										"aria-busy": isLoading,
										className: "w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:brightness-110 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
										children: isLoading ? "Resetting Password…" : "Reset & Save Password"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-2 flex justify-between text-xs font-semibold text-foreground/70",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setForgotStep(1),
											className: "text-primary hover:underline focus-visible:ring-1 focus-visible:ring-primary rounded p-1",
											children: "← Edit Contact Info"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setSuccessMsg("A new OTP has been sent."),
											className: "text-accent hover:underline focus-visible:ring-1 focus-visible:ring-accent rounded p-1",
											children: "Resend Code"
										})]
									})
								]
							}),
							forgotStep === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center py-4 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											className: "w-8 h-8",
											fill: "none",
											viewBox: "0 0 24 24",
											stroke: "currentColor",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeWidth: 2.5,
												d: "M5 13l4 4L19 7"
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-display font-semibold text-primary",
										children: "Password Reset Complete!"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-foreground/75",
										children: "Your password has been updated successfully. You can now log in using your new credentials."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => switchMode("login"),
										className: "w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
										children: "Proceed to Sign In"
									})
								]
							})
						] }),
						mode === "register" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							id: "register-panel",
							role: "tabpanel",
							"aria-labelledby": "register-tab",
							onSubmit: handleRegisterSubmit,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: regNameId,
									className: "block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-1",
									children: ["Full Name / Business Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-destructive",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: regNameId,
									type: "text",
									required: true,
									value: regName,
									onChange: (e) => setRegName(e.target.value),
									placeholder: "e.g. Yash Flowers or Rajesh Patil",
									className: "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: regEmailId,
									className: "block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-1",
									children: ["Email Address ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-destructive",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: regEmailId,
									type: "email",
									required: true,
									value: regEmail,
									onChange: (e) => setRegEmail(e.target.value),
									placeholder: "name@company.com",
									className: "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: regPhoneId,
									className: "block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-1",
									children: ["Mobile Number ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-destructive",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: regPhoneId,
									type: "tel",
									required: true,
									value: regPhone,
									onChange: (e) => setRegPhone(e.target.value),
									placeholder: "10-digit mobile number",
									className: "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: regTypeId,
									className: "block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-1",
									children: "Account Type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: regTypeId,
									value: regAccountType,
									onChange: (e) => setRegAccountType(e.target.value),
									className: "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "retail",
											children: "Retail Buyer / Household"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "wholesale",
											children: "Wholesale Trader / Bulk Buyer"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "event",
											children: "Wedding & Event Decorator"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "temple",
											children: "Temple Trust / Event Organizer"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: regPassId,
									className: "block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-1",
									children: ["Password ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-destructive",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: regPassId,
										type: showRegPassword ? "text" : "password",
										required: true,
										value: regPassword,
										onChange: (e) => setRegPassword(e.target.value),
										placeholder: "At least 8 characters",
										className: "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 pr-10"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShowRegPassword(!showRegPassword),
										"aria-label": showRegPassword ? "Hide password" : "Show password",
										className: "absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground p-1 focus-visible:ring-2 focus-visible:ring-primary rounded",
										children: showRegPassword ? "🙈" : "👁️"
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: regConfirmPassId,
									className: "block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-1",
									children: ["Confirm Password ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-destructive",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: regConfirmPassId,
									type: "password",
									required: true,
									value: regConfirmPassword,
									onChange: (e) => setRegConfirmPassword(e.target.value),
									placeholder: "Re-enter password",
									className: "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: isLoading,
									"aria-busy": isLoading,
									className: "mt-2 w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:brightness-110 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
									children: isLoading ? "Creating Account…" : "Create Free Account"
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-border/60 py-4 text-center text-xs text-foreground/60",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					SITE.brand,
					". All rights reserved. • Trusted fresh flower supplier across Maharashtra."
				]
			})
		]
	});
}
//#endregion
export { LoginPage as component };
