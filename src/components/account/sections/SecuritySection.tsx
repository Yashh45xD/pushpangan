import { useState } from "react";
import { Eye, EyeOff, Save, CheckCircle, Shield, AlertTriangle, Trash2 } from "lucide-react";
import { userService } from "@/services/userService";

interface Props { onLogout: () => void; }

function StrengthBar({ password }: { password: string }) {
  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;
  const labels = ["", "Weak", "Fair", "Strong", "Very Strong"];
  const colors = ["", "#ef4444", "#f59e0b", "#10b981", "#4F5535"];
  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-1 flex-1 rounded-full transition-all" style={{ backgroundColor: i <= score ? colors[score] : "#E2DCBE" }} />
        ))}
      </div>
      {password && <p className="mt-1 text-[11px] font-semibold" style={{ color: colors[score] }}>{labels[score]}</p>}
    </div>
  );
}

export function SecuritySection({ onLogout }: Props) {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [twofa, setTwofa] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    if (!currentPwd || !newPwd || !confirmPwd) { setMsg({ type: "error", text: "All fields are required." }); return; }
    if (newPwd.length < 8) { setMsg({ type: "error", text: "Password must be at least 8 characters." }); return; }
    if (newPwd !== confirmPwd) { setMsg({ type: "error", text: "Passwords do not match." }); return; }
    setLoading(true);
    try {
      const res = await userService.changePassword(currentPwd, newPwd);
      if (res.success) {
        setMsg({ type: "success", text: "Password changed successfully!" });
        setCurrentPwd(""); setNewPwd(""); setConfirmPwd("");
      }
    } catch (err: any) {
      setMsg({ type: "error", text: err.message || "Failed to change password." });
    } finally { setLoading(false); }
  };

  const handleDeleteAccount = async () => {
    await userService.deleteAccount();
    onLogout();
  };

  const pwdField = (label: string, val: string, setVal: (v: string) => void, show: boolean, setShow: (v: boolean) => void, id: string) => (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold" style={{ color: "#666851" }}>{label}</label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={val}
          onChange={e => setVal(e.target.value)}
          className="w-full rounded-xl border px-3.5 py-2.5 pr-10 text-sm outline-none focus:border-[#B68F38] focus:ring-2 focus:ring-[#B68F38]/20"
          style={{ borderColor: "#E2DCBE" }}
          placeholder="••••••••"
        />
        <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Change Password */}
      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: "#E2DCBE" }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: "#F0EFE6" }}>
          <h2 className="text-base font-bold" style={{ color: "#4F5535" }}>Password & Security</h2>
          <p className="text-xs mt-0.5" style={{ color: "#9F905E" }}>Keep your account safe</p>
        </div>
        <form onSubmit={handleChangePassword} className="p-6 space-y-4">
          {pwdField("Current Password", currentPwd, setCurrentPwd, showCurrent, setShowCurrent, "current-pwd")}
          {pwdField("New Password", newPwd, setNewPwd, showNew, setShowNew, "new-pwd")}
          {newPwd && <StrengthBar password={newPwd} />}
          {pwdField("Confirm New Password", confirmPwd, setConfirmPwd, showConfirm, setShowConfirm, "confirm-pwd")}

          {msg && (
            <div className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold border ${msg.type === "success" ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-rose-700 bg-rose-50 border-rose-200"}`}>
              {msg.type === "success" ? <CheckCircle size={15} /> : <AlertTriangle size={15} />}
              {msg.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: "#4F5535" }}
          >
            <Save size={15} /> {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>

      {/* 2FA */}
      <div className="rounded-2xl border bg-white shadow-sm p-6" style={{ borderColor: "#E2DCBE" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#F0EFE6" }}>
              <Shield size={20} style={{ color: "#4F5535" }} />
            </div>
            <div>
              <h3 className="text-sm font-bold" style={{ color: "#4F5535" }}>Two-Factor Authentication</h3>
              <p className="text-xs" style={{ color: "#9F905E" }}>Add an extra layer of security</p>
            </div>
          </div>
          <button
            onClick={() => setTwofa(!twofa)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${twofa ? "bg-[#4F5535]" : "bg-gray-200"}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${twofa ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>
        <p className="mt-3 text-xs" style={{ color: "#9F905E" }}>
          {twofa ? "✅ Two-factor authentication is enabled. Your account is protected." : "Enable 2FA to protect your account with an OTP sent to your phone."}
        </p>
      </div>

      {/* Login History */}
      <div className="rounded-2xl border bg-white shadow-sm p-6" style={{ borderColor: "#E2DCBE" }}>
        <h3 className="text-sm font-bold mb-4" style={{ color: "#4F5535" }}>Recent Login Activity</h3>
        <div className="space-y-3">
          {[
            { device: "Chrome · Windows", location: "Noida, UP", time: "Today, 8:42 PM", current: true },
            { device: "Safari · iPhone 14", location: "New Delhi", time: "Yesterday, 3:15 PM", current: false },
            { device: "Firefox · MacBook", location: "Gurugram, HR", time: "2 days ago", current: false },
          ].map((l, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor: "#F7F5EF" }}>
              <div>
                <p className="text-xs font-semibold" style={{ color: "#333" }}>{l.device}</p>
                <p className="text-[11px]" style={{ color: "#9F905E" }}>{l.location} · {l.time}</p>
              </div>
              {l.current ? (
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Active</span>
              ) : (
                <button className="text-[11px] text-rose-500 underline">Sign out</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Delete Account */}
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-rose-600 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-rose-700">Delete Account</h3>
            <p className="text-xs mt-1 text-rose-600">This action is permanent. All your data, orders and saved preferences will be deleted.</p>
            {!showDeleteConfirm ? (
              <button onClick={() => setShowDeleteConfirm(true)} className="mt-3 flex items-center gap-2 rounded-xl border border-rose-300 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100 transition">
                <Trash2 size={13} /> Delete My Account
              </button>
            ) : (
              <div className="mt-3 flex gap-2">
                <button onClick={handleDeleteAccount} className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700">Yes, delete permanently</button>
                <button onClick={() => setShowDeleteConfirm(false)} className="rounded-xl border border-rose-300 px-4 py-2 text-xs font-medium text-rose-600">Cancel</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
