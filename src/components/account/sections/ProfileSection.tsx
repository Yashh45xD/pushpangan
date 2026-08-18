import { useState, useRef } from "react";
import { Camera, Save, X, CheckCircle } from "lucide-react";
import { userService } from "@/services/userService";

interface Props {
  user: Record<string, string> | null;
  onUpdate: (u: Record<string, string>) => void;
}

export function ProfileSection({ user, onUpdate }: Props) {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [birthday, setBirthday] = useState(user?.birthday || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const initial = (firstName || user?.firstName || "G").charAt(0).toUpperCase();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await userService.updateProfile({ firstName, lastName, gender, birthday, avatar });
      if (res.success) {
        onUpdate(res.user || { firstName, lastName, gender, birthday, avatar });
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setGender(user?.gender || "");
    setBirthday(user?.birthday || "");
    setAvatar(user?.avatar || "");
    setEditing(false);
  };

  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: "#E2DCBE" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#F0EFE6" }}>
        <div>
          <h2 className="text-base font-bold" style={{ color: "#4F5535" }}>Personal Information</h2>
          <p className="text-xs mt-0.5" style={{ color: "#9F905E" }}>Update your personal details</p>
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

      <div className="p-6">
        {/* Avatar */}
        <div className="flex items-center gap-5 mb-8">
          <div className="relative">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover shadow-md border-4" style={{ borderColor: "#B68F38" }} />
            ) : (
              <div className="w-20 h-20 rounded-full flex items-center justify-center font-black text-3xl shadow-md border-4" style={{ backgroundColor: "#B68F38", borderColor: "#4F5535", color: "#fff" }}>
                {initial}
              </div>
            )}
            {editing && (
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center shadow-md transition hover:scale-110"
                style={{ backgroundColor: "#4F5535", color: "#fff" }}
              >
                <Camera size={13} />
              </button>
            )}
          </div>
          <div>
            <p className="font-bold text-base" style={{ color: "#4F5535" }}>{firstName || user?.firstName} {lastName || user?.lastName}</p>
            <p className="text-xs mt-0.5" style={{ color: "#9F905E" }}>Gold Member 🌟</p>
            {editing && (
              <div className="flex gap-2 mt-2">
                <button onClick={() => fileRef.current?.click()} className="text-xs underline" style={{ color: "#4F5535" }}>Upload photo</button>
                {avatar && <button onClick={() => setAvatar("")} className="text-xs text-rose-500 underline">Remove</button>}
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </div>

        {/* Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* First Name */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold" style={{ color: "#666851" }}>First Name</label>
            {editing ? (
              <input
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:border-[#B68F38] focus:ring-2 focus:ring-[#B68F38]/20"
                style={{ borderColor: "#E2DCBE" }}
                placeholder="First name"
              />
            ) : (
              <p className="rounded-xl px-3.5 py-2.5 text-sm font-medium" style={{ backgroundColor: "#F7F5EF", color: "#333" }}>{firstName || user?.firstName || "—"}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold" style={{ color: "#666851" }}>Last Name</label>
            {editing ? (
              <input
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:border-[#B68F38] focus:ring-2 focus:ring-[#B68F38]/20"
                style={{ borderColor: "#E2DCBE" }}
                placeholder="Last name"
              />
            ) : (
              <p className="rounded-xl px-3.5 py-2.5 text-sm font-medium" style={{ backgroundColor: "#F7F5EF", color: "#333" }}>{lastName || user?.lastName || "—"}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold" style={{ color: "#666851" }}>Gender</label>
            {editing ? (
              <select
                value={gender}
                onChange={e => setGender(e.target.value)}
                className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:border-[#B68F38]"
                style={{ borderColor: "#E2DCBE" }}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            ) : (
              <p className="rounded-xl px-3.5 py-2.5 text-sm font-medium" style={{ backgroundColor: "#F7F5EF", color: "#333" }}>{gender || user?.gender || "—"}</p>
            )}
          </div>

          {/* Birthday */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold" style={{ color: "#666851" }}>Birthday</label>
            {editing ? (
              <input
                type="date"
                value={birthday}
                onChange={e => setBirthday(e.target.value)}
                className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:border-[#B68F38]"
                style={{ borderColor: "#E2DCBE" }}
              />
            ) : (
              <p className="rounded-xl px-3.5 py-2.5 text-sm font-medium" style={{ backgroundColor: "#F7F5EF", color: "#333" }}>{birthday || user?.birthday || "—"}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {editing && (
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "#4F5535" }}
            >
              <Save size={15} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition hover:bg-gray-50"
              style={{ borderColor: "#E2DCBE", color: "#666" }}
            >
              <X size={15} />
              Cancel
            </button>
          </div>
        )}

        {saved && (
          <div className="mt-4 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200">
            <CheckCircle size={16} />
            Profile updated successfully!
          </div>
        )}
      </div>
    </div>
  );
}
