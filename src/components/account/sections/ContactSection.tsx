import { useState } from "react";
import { CheckCircle, Mail, Phone, Save, X } from "lucide-react";

interface Props {
  user: Record<string, string> | null;
  onUpdate: (u: Record<string, string>) => void;
}

export function ContactSection({ user, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [altPhone, setAltPhone] = useState(user?.alternatePhone || "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onUpdate({ ...user, email, phone, alternatePhone: altPhone } as Record<string, string>);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
    setAltPhone(user?.alternatePhone || "");
    setEditing(false);
  };

  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: "#E2DCBE" }}>
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#F0EFE6" }}>
        <div>
          <h2 className="text-base font-bold" style={{ color: "#4F5535" }}>Contact Information</h2>
          <p className="text-xs mt-0.5" style={{ color: "#9F905E" }}>Manage your email and phone</p>
        </div>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="rounded-full px-4 py-1.5 text-xs font-bold transition hover:opacity-90"
            style={{ backgroundColor: "#4F5535", color: "#fff" }}
          >
            ✏️ Edit
          </button>
        )}
      </div>

      <div className="p-6 space-y-5">
        {/* Email */}
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#666851" }}>
            <Mail size={13} /> Email Address
          </label>
          {editing ? (
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-[#B68F38] focus:ring-2 focus:ring-[#B68F38]/20"
              style={{ borderColor: "#E2DCBE" }}
              placeholder="your@email.com"
            />
          ) : (
            <div className="flex items-center gap-3 rounded-xl px-3.5 py-2.5" style={{ backgroundColor: "#F7F5EF" }}>
              <span className="text-sm font-medium" style={{ color: "#333" }}>{email || "—"}</span>
              <span className="ml-auto flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle size={10} /> Verified
              </span>
            </div>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#666851" }}>
            <Phone size={13} /> Mobile Number
          </label>
          {editing ? (
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-[#B68F38] focus:ring-2 focus:ring-[#B68F38]/20"
              style={{ borderColor: "#E2DCBE" }}
              placeholder="+91 98765 43210"
            />
          ) : (
            <div className="flex items-center gap-3 rounded-xl px-3.5 py-2.5" style={{ backgroundColor: "#F7F5EF" }}>
              <span className="text-sm font-medium" style={{ color: "#333" }}>{phone || "—"}</span>
              <span className="ml-auto flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle size={10} /> Verified
              </span>
            </div>
          )}
        </div>

        {/* Alternate Phone */}
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#666851" }}>
            <Phone size={13} /> Alternate Number <span className="font-normal opacity-60">(optional)</span>
          </label>
          {editing ? (
            <input
              type="tel"
              value={altPhone}
              onChange={e => setAltPhone(e.target.value)}
              className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-[#B68F38] focus:ring-2 focus:ring-[#B68F38]/20"
              style={{ borderColor: "#E2DCBE" }}
              placeholder="+91 98765 00000"
            />
          ) : (
            <div className="rounded-xl px-3.5 py-2.5" style={{ backgroundColor: "#F7F5EF" }}>
              <span className="text-sm font-medium" style={{ color: "#333" }}>{altPhone || "Not added"}</span>
            </div>
          )}
        </div>

        {editing && (
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
              style={{ backgroundColor: "#4F5535" }}
            >
              <Save size={15} /> Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition hover:bg-gray-50"
              style={{ borderColor: "#E2DCBE", color: "#666" }}
            >
              <X size={15} /> Cancel
            </button>
          </div>
        )}

        {saved && (
          <div className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200">
            <CheckCircle size={16} /> Contact details updated!
          </div>
        )}
      </div>
    </div>
  );
}
