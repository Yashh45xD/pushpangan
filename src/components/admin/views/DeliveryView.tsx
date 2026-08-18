import React, { useState, useEffect } from "react";
import { Truck, MapPin, CheckCircle2, Clock, Navigation, ShieldCheck, Plus, Edit, Trash2, X, Save } from "lucide-react";

export const DeliveryView: React.FC = () => {
  const [shippingFee, setShippingFee] = useState(50);
  const [radiusKm, setRadiusKm] = useState(25);
  
  const [partners, setPartners] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPartnerIndex, setSelectedPartnerIndex] = useState<number | null>(null);

  const [partnerForm, setPartnerForm] = useState({
    name: "",
    type: "In-House Fleet",
    ActiveOrders: 0,
    status: "Online",
  });

  useEffect(() => {
    const savedPartners = localStorage.getItem("delivery_partners");
    if (savedPartners) {
      setPartners(JSON.parse(savedPartners));
    } else {
      const defaultPartners = [
        { name: "Pushpangan Express", type: "In-House Fleet", ActiveOrders: 8, status: "Online" },
        { name: "Dunzo Local Express", type: "On-Demand Partner", ActiveOrders: 5, status: "Online" },
        { name: "Porter Hyperlocal", type: "Bulk Delivery Partner", ActiveOrders: 2, status: "Online" },
      ];
      setPartners(defaultPartners);
      localStorage.setItem("delivery_partners", JSON.stringify(defaultPartners));
    }
  }, []);

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setPartnerForm({ name: "", type: "In-House Fleet", ActiveOrders: 0, status: "Online" });
    setShowModal(true);
  };

  const handleOpenEditModal = (index: number) => {
    setIsEditing(true);
    setSelectedPartnerIndex(index);
    setPartnerForm(partners[index]);
    setShowModal(true);
  };

  const handleSavePartner = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedPartners = [...partners];
    if (isEditing && selectedPartnerIndex !== null) {
      updatedPartners[selectedPartnerIndex] = partnerForm;
    } else {
      updatedPartners.push(partnerForm);
    }
    setPartners(updatedPartners);
    localStorage.setItem("delivery_partners", JSON.stringify(updatedPartners));
    setShowModal(false);
  };

  const handleDeletePartner = (index: number) => {
    if (!confirm("Are you sure you want to remove this delivery partner?")) return;
    const updatedPartners = partners.filter((_, idx) => idx !== index);
    setPartners(updatedPartners);
    localStorage.setItem("delivery_partners", JSON.stringify(updatedPartners));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Truck className="w-5 h-5 text-rose-400" /> Logistics & Delivery Management
          </h1>
          <p className="text-xs text-slate-400">
            Dispatch fresh flower orders via Dunzo, Porter or Pushpangan Express fleet & configure delivery radius
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 hover:scale-105 transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Delivery Partner
        </button>
      </div>

      {/* Grid of Partners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {partners.map((p, idx) => (
          <div key={idx} className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl relative group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                {p.type}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.status === "Online" ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-400"}`}>
                ● {p.status}
              </span>
            </div>
            <h3 className="text-base font-extrabold text-white">{p.name}</h3>
            <p className="text-xs text-slate-400 mt-1">Active Deliveries: {p.ActiveOrders} orders in transit</p>
            
            <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleOpenEditModal(idx)}
                className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
              >
                <Edit className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDeletePartner(idx)}
                className="p-1 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery Radius & Shipping Charge Controls */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-rose-400" /> Delivery Zone & Shipping Fee Controls
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Default Shipping Charge per Order (₹)</label>
            <input
              type="number"
              value={shippingFee}
              onChange={(e) => setShippingFee(Number(e.target.value))}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Same-Day Delivery Radius (Kilometers)</label>
            <input
              type="number"
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none focus:border-rose-500"
            />
          </div>
        </div>

        <button
          onClick={() => alert("Delivery parameters saved!")}
          className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition shadow-lg shadow-rose-600/20"
        >
          Save Logistics Parameters
        </button>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form onSubmit={handleSavePartner} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl relative space-y-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white">
              {isEditing ? "Edit Delivery Partner" : "Add Delivery Partner"}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Partner / Agency Name</label>
                <input
                  type="text"
                  required
                  value={partnerForm.name}
                  onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                  placeholder="e.g. Shadowfax Logistics"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Partner Type</label>
                <select
                  value={partnerForm.type}
                  onChange={(e) => setPartnerForm({ ...partnerForm, type: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none focus:border-rose-500"
                >
                  <option value="In-House Fleet">In-House Fleet</option>
                  <option value="On-Demand Partner">On-Demand Partner</option>
                  <option value="Bulk Delivery Partner">Bulk Delivery Partner</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Active Deliveries</label>
                  <input
                    type="number"
                    required
                    value={partnerForm.ActiveOrders}
                    onChange={(e) => setPartnerForm({ ...partnerForm, ActiveOrders: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={partnerForm.status}
                    onChange={(e) => setPartnerForm({ ...partnerForm, status: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none"
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 text-xs">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl shadow flex items-center gap-1"
              >
                <Save className="w-4 h-4" /> Save Partner
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
