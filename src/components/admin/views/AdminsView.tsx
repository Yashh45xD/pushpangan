import React, { useState, useEffect } from "react";
import { adminService } from "../../../services/adminService";
import { ShieldCheck, Plus, Trash2, KeyRound, UserCheck } from "lucide-react";

export const AdminsView: React.FC = () => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "manager",
    permissions: ["view_only", "edit", "manage_orders"],
  });

  const rolesList = [
    { id: "super_admin", label: "Super Admin" },
    { id: "manager", label: "Store Manager" },
    { id: "inventory_manager", label: "Inventory Manager" },
    { id: "customer_support", label: "Customer Support" },
  ];

  const permissionsList = [
    "view_only",
    "edit",
    "delete",
    "create",
    "manage_orders",
    "manage_products",
    "manage_users",
    "manage_settings",
    "manage_admins",
  ];

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await adminService.getAdmins();
      if (res.success && res.admins) {
        setAdmins(res.admins);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await adminService.saveAdmin(formData);
    setShowModal(false);
    fetchAdmins();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Revoke access and delete this admin account?")) return;
    await adminService.deleteAdmin(id);
    fetchAdmins();
  };

  const handlePermissionToggle = (perm: string) => {
    setFormData((prev) => {
      const exists = prev.permissions.includes(perm);
      return {
        ...prev,
        permissions: exists ? prev.permissions.filter((p) => p !== perm) : [...prev.permissions, perm],
      };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-rose-400" /> Multi-Admin Accounts & Permissions Matrix
          </h1>
          <p className="text-xs text-slate-400">
            Create Super Admin, Store Manager, Inventory Manager, and Customer Support accounts with fine-grained access
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 hover:scale-105 transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create Admin Account
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {admins.map((ad) => (
          <div key={ad._id} className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl relative">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={ad.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                alt=""
                className="w-10 h-10 rounded-full object-cover border border-rose-500/30"
              />
              <div>
                <div className="font-bold text-white text-sm">{ad.name}</div>
                <div className="text-xs text-slate-400">{ad.email}</div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {ad.role?.replace("_", " ")}
              </span>
              {ad.role !== "super_admin" && (
                <button onClick={() => handleDelete(ad._id)} className="text-slate-500 hover:text-rose-400 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Granted Permissions:</div>
              <div className="flex flex-wrap gap-1">
                {ad.permissions?.map((perm: string) => (
                  <span key={perm} className="text-[9px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Create Admin Account</h3>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Assigned Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                  >
                    {rolesList.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-2">Granular Access Permissions</label>
                <div className="grid grid-cols-3 gap-2">
                  {permissionsList.map((p) => (
                    <label key={p} className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(p)}
                        onChange={() => handlePermissionToggle(p)}
                        className="rounded text-rose-500"
                      />
                      <span className="capitalize text-[11px]">{p.replace("_", " ")}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-400">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold rounded-xl">
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
