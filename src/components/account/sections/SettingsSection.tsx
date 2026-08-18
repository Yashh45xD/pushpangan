import { Moon, Sun, Download, Globe, Shield } from "lucide-react";
import { useState } from "react";

export function SettingsSection() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");

  return (
    <div className="space-y-5">
      {/* Appearance */}
      <div className="rounded-2xl border bg-white shadow-sm p-6" style={{ borderColor: "#E2DCBE" }}>
        <h3 className="text-sm font-bold mb-4" style={{ color: "#4F5535" }}>Appearance</h3>
        <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor: "#F7F5EF" }}>
          <div className="flex items-center gap-3">
            {darkMode ? <Moon size={18} style={{ color: "#4F5535" }} /> : <Sun size={18} style={{ color: "#B68F38" }} />}
            <div>
              <p className="text-xs font-semibold" style={{ color: "#333" }}>{darkMode ? "Dark Mode" : "Light Mode"}</p>
              <p className="text-[11px]" style={{ color: "#9F905E" }}>Switch between light and dark theme</p>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? "bg-[#4F5535]" : "bg-gray-200"}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${darkMode ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>
      </div>

      {/* Language */}
      <div className="rounded-2xl border bg-white shadow-sm p-6" style={{ borderColor: "#E2DCBE" }}>
        <h3 className="text-sm font-bold mb-4" style={{ color: "#4F5535" }}>Language & Region</h3>
        <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor: "#F7F5EF" }}>
          <div className="flex items-center gap-3">
            <Globe size={18} style={{ color: "#4F5535" }} />
            <div>
              <p className="text-xs font-semibold" style={{ color: "#333" }}>Language</p>
              <p className="text-[11px]" style={{ color: "#9F905E" }}>Choose your preferred language</p>
            </div>
          </div>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="rounded-xl border px-3 py-1.5 text-xs outline-none"
            style={{ borderColor: "#E2DCBE" }}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">मराठी</option>
            <option value="ta">தமிழ்</option>
          </select>
        </div>
      </div>

      {/* Privacy */}
      <div className="rounded-2xl border bg-white shadow-sm p-6" style={{ borderColor: "#E2DCBE" }}>
        <h3 className="text-sm font-bold mb-4" style={{ color: "#4F5535" }}>Privacy & Data</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor: "#F7F5EF" }}>
            <div className="flex items-center gap-3">
              <Shield size={18} style={{ color: "#4F5535" }} />
              <div>
                <p className="text-xs font-semibold" style={{ color: "#333" }}>Profile Visibility</p>
                <p className="text-[11px]" style={{ color: "#9F905E" }}>Who can see your profile</p>
              </div>
            </div>
            <span className="text-xs font-medium" style={{ color: "#B68F38" }}>Private</span>
          </div>
          <button className="flex items-center gap-3 rounded-xl px-4 py-3 w-full text-left transition hover:bg-[#F7F5EF]" style={{ color: "#4F5535" }}>
            <Download size={18} />
            <div>
              <p className="text-xs font-semibold">Download My Data</p>
              <p className="text-[11px]" style={{ color: "#9F905E" }}>Export all your account data as a ZIP file</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
