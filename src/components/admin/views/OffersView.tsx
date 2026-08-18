import React, { useState, useEffect } from "react";
import { adminService } from "../../../services/adminService";
import { Tag, Plus, Trash2, Calendar, Sparkles } from "lucide-react";

export const OffersView: React.FC = () => {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    offerType: "Festival Offer",
    discountPercentage: 20,
    endDate: "2026-11-15",
    status: "active",
  });

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const res = await adminService.getOffers();
      if (res.success && res.offers) {
        setOffers(res.offers);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await adminService.saveOffer(formData);
    setShowModal(false);
    fetchOffers();
  };

  const handleToggle = async (id: string) => {
    await adminService.toggleOffer(id);
    fetchOffers();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this promotional offer?")) return;
    await adminService.deleteOffer(id);
    fetchOffers();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Tag className="w-5 h-5 text-rose-400" /> Festive & Seasonal Promotional Offers
          </h1>
          <p className="text-xs text-slate-400">
            Launch Diwali offers, Today's Special sales, Combo packages & Flash Sales
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 hover:scale-105 transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create Offer
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((of) => (
          <div
            key={of._id}
            className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-rose-500/30 transition"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                {of.offerType}
              </span>
              <button
                onClick={() => handleToggle(of._id)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  of.status === "active" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-slate-700 text-slate-400"
                }`}
              >
                {of.status === "active" ? "Active" : "Disabled"}
              </button>
            </div>

            <h3 className="text-base font-extrabold text-white">{of.title}</h3>
            <div className="text-2xl font-black text-amber-400 mt-2">{of.discountPercentage}% OFF</div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Valid till {of.endDate?.slice(0, 10)}
              </span>
              <button onClick={() => handleDelete(of._id)} className="text-rose-400 hover:text-white p-1">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Create New Offer Campaign</h3>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Campaign Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Diwali Floral Dhamaka"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Offer Category Type</label>
                <select
                  value={formData.offerType}
                  onChange={(e) => setFormData({ ...formData, offerType: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                >
                  <option value="Festival Offer">Festival Offer</option>
                  <option value="Today's Special">Today's Special</option>
                  <option value="Weekend Offer">Weekend Offer</option>
                  <option value="Combo Offer">Combo Offer</option>
                  <option value="Bulk Discount">Bulk Discount</option>
                  <option value="Flash Sale">Flash Sale</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Discount (%)</label>
                  <input
                    type="number"
                    required
                    value={formData.discountPercentage}
                    onChange={(e) => setFormData({ ...formData, discountPercentage: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-400">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold rounded-xl">
                  Launch Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
