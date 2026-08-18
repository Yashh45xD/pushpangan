import React, { useState, useEffect } from "react";
import { adminService } from "../../../services/adminService";
import { Ticket, Plus, Trash2, CheckCircle2, XCircle, Tag } from "lucide-react";

export const CouponsView: React.FC = () => {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: 20,
    minPurchase: 499,
    maxDiscount: 150,
    expiryDate: "2026-12-31",
    usageLimit: 500,
    status: "active",
  });

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await adminService.getCoupons();
      if (res.success && res.coupons) {
        setCoupons(res.coupons);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await adminService.saveCoupon(formData);
    setShowModal(false);
    fetchCoupons();
  };

  const handleToggle = async (id: string) => {
    await adminService.toggleCoupon(id);
    fetchCoupons();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this coupon code?")) return;
    await adminService.deleteCoupon(id);
    fetchCoupons();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Ticket className="w-5 h-5 text-rose-400" /> Coupon Code Manager
          </h1>
          <p className="text-xs text-slate-400">
            Create percentage & flat discount promo codes, set minimum cart requirements & usage caps
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 hover:scale-105 transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((cp) => (
          <div
            key={cp._id}
            className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-rose-500/30 transition"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-black text-rose-400 tracking-wider font-mono bg-rose-500/10 px-3 py-1 rounded-xl border border-rose-500/20">
                {cp.code}
              </span>
              <button
                onClick={() => handleToggle(cp._id)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  cp.status === "active"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-slate-700 text-slate-400"
                }`}
              >
                {cp.status === "active" ? "Enabled" : "Disabled"}
              </button>
            </div>

            <div className="text-sm font-bold text-white">
              {cp.discountType === "percentage" ? `${cp.discountValue}% OFF` : `₹${cp.discountValue} FLAT DISCOUNT`}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Min Purchase: ₹{cp.minPurchase} • Max Discount: ₹{cp.maxDiscount || "Unlimited"}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Used: {cp.usedCount || 0} / {cp.usageLimit}</span>
              <button
                onClick={() => handleDelete(cp._id)}
                className="text-rose-400 hover:text-white p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Create New Promo Coupon</h3>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Coupon Code (Uppercase)</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="PUSHP20"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white uppercase outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Discount Type</label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Discount Value</label>
                  <input
                    type="number"
                    required
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Min Purchase (₹)</label>
                  <input
                    type="number"
                    value={formData.minPurchase}
                    onChange={(e) => setFormData({ ...formData, minPurchase: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Max Discount (₹)</label>
                  <input
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-400">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold rounded-xl">
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
