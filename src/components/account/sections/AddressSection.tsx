import { useState } from "react";
import { MapPin, Plus, Edit2, Trash2, Star, X, Save } from "lucide-react";
import { userService } from "@/services/userService";

interface Address {
  _id: string;
  label: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault: boolean;
}

const emptyAddr: Omit<Address, "_id"> = {
  label: "Home", fullName: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "", landmark: "", isDefault: false,
};

interface Props { addresses: Address[]; onRefresh: () => void; }

export function AddressSection({ addresses: initAddresses, onRefresh }: Props) {
  const [addresses, setAddresses] = useState<Address[]>(initAddresses);
  const [showForm, setShowForm] = useState(false);
  const [editAddr, setEditAddr] = useState<Address | null>(null);
  const [form, setForm] = useState<Omit<Address, "_id">>(emptyAddr);
  const [loading, setLoading] = useState(false);
  const [confirmDel, setConfirmDel] = useState<string | null>(null);

  const openAdd = () => { setForm(emptyAddr); setEditAddr(null); setShowForm(true); };
  const openEdit = (a: Address) => { setForm({ ...a }); setEditAddr(a); setShowForm(true); };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (editAddr) {
        const res = await userService.updateAddress(editAddr._id, form);
        setAddresses(prev => prev.map(a => a._id === editAddr._id ? { ...res.address, _id: editAddr._id } : a));
      } else {
        const res = await userService.addAddress(form);
        setAddresses(prev => {
          const updated = form.isDefault ? prev.map(a => ({ ...a, isDefault: false })) : [...prev];
          return [...updated, { ...form, _id: res.address?._id || `mock-${Date.now()}` }];
        });
      }
      setShowForm(false);
    } finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    await userService.deleteAddress(id);
    setAddresses(prev => prev.filter(a => a._id !== id));
    setConfirmDel(null);
  };

  const handleSetDefault = async (id: string) => {
    await userService.updateAddress(id, { isDefault: true });
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a._id === id })));
  };

  const labelColors: Record<string, string> = { Home: "#4F5535", Office: "#B68F38", Other: "#9F905E" };
  const labelEmoji: Record<string, string> = { Home: "🏠", Office: "🏢", Other: "📍" };

  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: "#E2DCBE" }}>
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#F0EFE6" }}>
        <div>
          <h2 className="text-base font-bold" style={{ color: "#4F5535" }}>Address Book</h2>
          <p className="text-xs mt-0.5" style={{ color: "#9F905E" }}>{addresses.length} saved addresses</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition hover:opacity-90"
          style={{ backgroundColor: "#4F5535", color: "#fff" }}
        >
          <Plus size={13} /> Add New
        </button>
      </div>

      <div className="p-6 space-y-4">
        {addresses.length === 0 && !showForm && (
          <div className="flex flex-col items-center py-12 text-center">
            <MapPin size={40} style={{ color: "#B68F38", opacity: 0.4 }} />
            <p className="mt-3 text-sm font-medium" style={{ color: "#666851" }}>No saved addresses yet</p>
            <button onClick={openAdd} className="mt-3 rounded-full px-4 py-2 text-xs font-bold text-white" style={{ backgroundColor: "#4F5535" }}>+ Add Address</button>
          </div>
        )}

        {addresses.map(addr => (
          <div
            key={addr._id}
            className="group relative rounded-xl border p-4 transition hover:shadow-md"
            style={{ borderColor: addr.isDefault ? "#B68F38" : "#E2DCBE", backgroundColor: addr.isDefault ? "#FDFBF4" : "#fff" }}
          >
            {addr.isDefault && (
              <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ backgroundColor: "#B68F38", color: "#fff" }}>
                <Star size={9} fill="currentColor" /> Default
              </span>
            )}
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-xl">{labelEmoji[addr.label] || "📍"}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase" style={{ backgroundColor: labelColors[addr.label] + "18", color: labelColors[addr.label] }}>{addr.label}</span>
                  <span className="text-sm font-bold" style={{ color: "#333" }}>{addr.fullName}</span>
                </div>
                <p className="text-sm" style={{ color: "#555" }}>{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                {addr.landmark && <p className="text-xs mt-0.5" style={{ color: "#9F905E" }}>Near: {addr.landmark}</p>}
                <p className="text-sm" style={{ color: "#555" }}>{addr.city}, {addr.state} — {addr.pincode}</p>
                <p className="text-xs mt-0.5" style={{ color: "#9F905E" }}>📞 {addr.phone}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2 flex-wrap">
              <button onClick={() => openEdit(addr)} className="flex items-center gap-1 rounded-lg border px-3 py-1 text-xs font-medium transition hover:bg-gray-50" style={{ borderColor: "#E2DCBE", color: "#4F5535" }}>
                <Edit2 size={11} /> Edit
              </button>
              {!addr.isDefault && (
                <button onClick={() => handleSetDefault(addr._id)} className="flex items-center gap-1 rounded-lg border px-3 py-1 text-xs font-medium transition hover:bg-amber-50" style={{ borderColor: "#B68F38", color: "#B68F38" }}>
                  <Star size={11} /> Set Default
                </button>
              )}
              <button onClick={() => setConfirmDel(addr._id)} className="flex items-center gap-1 rounded-lg border border-rose-200 px-3 py-1 text-xs font-medium text-rose-600 transition hover:bg-rose-50">
                <Trash2 size={11} /> Delete
              </button>
            </div>

            {/* Delete Confirm */}
            {confirmDel === addr._id && (
              <div className="mt-3 rounded-xl bg-rose-50 border border-rose-200 p-3 flex items-center justify-between">
                <p className="text-xs font-medium text-rose-700">Delete this address?</p>
                <div className="flex gap-2">
                  <button onClick={() => handleDelete(addr._id)} className="rounded-lg bg-rose-600 px-3 py-1 text-xs font-bold text-white">Yes, delete</button>
                  <button onClick={() => setConfirmDel(null)} className="rounded-lg border border-rose-300 px-3 py-1 text-xs font-medium text-rose-600">Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add / Edit Form */}
        {showForm && (
          <div className="rounded-2xl border p-5 mt-2" style={{ borderColor: "#B68F38", backgroundColor: "#FDFBF4" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold" style={{ color: "#4F5535" }}>{editAddr ? "Edit Address" : "Add New Address"}</h3>
              <button onClick={() => setShowForm(false)}><X size={16} style={{ color: "#666851" }} /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: "label", label: "Type", type: "select", options: ["Home", "Office", "Other"] },
                { key: "fullName", label: "Full Name", type: "text", placeholder: "Your full name" },
                { key: "phone", label: "Phone", type: "tel", placeholder: "10-digit mobile" },
                { key: "line1", label: "Address Line 1", type: "text", placeholder: "House no., Street" },
                { key: "line2", label: "Address Line 2 (optional)", type: "text", placeholder: "Area, Locality" },
                { key: "landmark", label: "Landmark (optional)", type: "text", placeholder: "Near..." },
                { key: "city", label: "City", type: "text", placeholder: "City" },
                { key: "state", label: "State", type: "text", placeholder: "State" },
                { key: "pincode", label: "Pincode", type: "text", placeholder: "6-digit PIN" },
              ].map(({ key, label, type, placeholder, options }) => (
                <div key={key} className={key === "line1" || key === "line2" ? "sm:col-span-2" : ""}>
                  <label className="mb-1 block text-xs font-semibold" style={{ color: "#666851" }}>{label}</label>
                  {type === "select" ? (
                    <select
                      value={(form as any)[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-[#B68F38]"
                      style={{ borderColor: "#E2DCBE" }}
                    >
                      {options!.map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      type={type}
                      value={(form as any)[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-[#B68F38] focus:ring-2 focus:ring-[#B68F38]/20"
                      style={{ borderColor: "#E2DCBE" }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input type="checkbox" id="isDefault" checked={form.isDefault} onChange={e => setForm(f => ({ ...f, isDefault: e.target.checked }))} className="accent-[#B68F38]" />
              <label htmlFor="isDefault" className="text-xs font-medium" style={{ color: "#4F5535" }}>Set as default address</label>
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:opacity-90 disabled:opacity-60" style={{ backgroundColor: "#4F5535" }}>
                <Save size={14} /> {loading ? "Saving..." : "Save Address"}
              </button>
              <button onClick={() => setShowForm(false)} className="rounded-xl border px-5 py-2.5 text-sm font-medium hover:bg-gray-50" style={{ borderColor: "#E2DCBE", color: "#666" }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
