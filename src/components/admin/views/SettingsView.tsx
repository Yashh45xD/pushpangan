import React, { useState, useEffect } from "react";
import { adminService } from "../../../services/adminService";
import { Settings, Save, Database, UploadCloud, ShieldCheck, Mail, Phone, Globe } from "lucide-react";

export const SettingsView: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    websiteName: "Pushpangan Fresh Flowers",
    businessName: "Pushpangan Flower eCommerce Pvt Ltd",
    gstNumber: "27AAAAA0000A1Z5",
    email: "contact@pushpangan.com",
    phone: "+91 98765 43210",
    address: "Market Yard, Gultekdi, Pune, Maharashtra 411037",
    shippingCharges: 50,
    freeShippingThreshold: 499,
    deliveryRadiusKm: 25,
    emailProvider: "SMTP",
    smsGateway: "Twilio",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await adminService.getSettings();
        if (res.success && res.settings) {
          setFormData(res.settings);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await adminService.saveSettings(formData);
    alert("Website & Business Settings Updated Successfully!");
  };

  const handleBackupDB = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(formData, null, 2))}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `pushpangan_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-rose-400" /> Platform & Security Settings
          </h1>
          <p className="text-xs text-slate-400">
            Branding, GST credentials, shipping fees, notification gateways & database backup tools
          </p>
        </div>
        <button
          onClick={handleBackupDB}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition flex items-center gap-1.5"
        >
          <Database className="w-4 h-4 text-emerald-400" /> Backup Database (JSON)
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Business & GST Info */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-rose-400" /> General Branding & Business Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Website Title</label>
              <input
                type="text"
                value={formData.websiteName}
                onChange={(e) => setFormData({ ...formData, websiteName: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Registered Legal Entity</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">GST Number</label>
              <input
                type="text"
                value={formData.gstNumber}
                onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Support Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none focus:border-rose-500"
              />
            </div>
          </div>
        </div>

        {/* Shipping & Radius Settings */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Gateway & Integration Credentials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Transactional Email Provider</label>
              <select
                value={formData.emailProvider}
                onChange={(e) => setFormData({ ...formData, emailProvider: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none"
              >
                <option value="SMTP">Custom SMTP Server</option>
                <option value="Sendgrid">SendGrid API</option>
                <option value="Mailgun">Mailgun</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">SMS Notification Gateway</label>
              <select
                value={formData.smsGateway}
                onChange={(e) => setFormData({ ...formData, smsGateway: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white outline-none"
              >
                <option value="Twilio">Twilio SMS</option>
                <option value="Msg91">MSG91 India</option>
                <option value="Fast2SMS">Fast2SMS</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 hover:scale-105 transition flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Store Settings
        </button>
      </form>
    </div>
  );
};
