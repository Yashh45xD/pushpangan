import React from "react";
import { FileCode, Shield, Server, CheckCircle2 } from "lucide-react";

export const ApiDocsView: React.FC = () => {
  const endpoints = [
    { method: "POST", path: "/api/admin/login", desc: "Admin sign-in with email, password & rate limiting protection" },
    { method: "POST", path: "/api/admin/refresh-token", desc: "Exchange refresh token for new access JWT" },
    { method: "GET", path: "/api/admin/dashboard-stats", desc: "Fetch 10 KPI cards and 5 Recharts data payloads" },
    { method: "GET", path: "/api/admin/flowers", desc: "List flowers with search, pagination, category & season filters" },
    { method: "POST", path: "/api/admin/flowers", desc: "Create new flower product with Cloudinary image upload" },
    { method: "POST", path: "/api/admin/flowers/:id/duplicate", desc: "Duplicate existing flower product" },
    { method: "GET", path: "/api/admin/orders", desc: "Search and filter orders by status and date" },
    { method: "PUT", path: "/api/admin/orders/:id/status", desc: "Update order status progression (Pending to Delivered)" },
    { method: "POST", path: "/api/admin/orders/:id/refund", desc: "Process instant order refund" },
    { method: "GET", path: "/api/admin/customers", desc: "List customer CRM records and total spend" },
    { method: "POST", path: "/api/admin/inventory/restock", desc: "Add stock quantity to product inventory" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FileCode className="w-5 h-5 text-rose-400" /> OpenAPI / Swagger REST Specifications
          </h1>
          <p className="text-xs text-slate-400">
            Pushpangan Admin REST API Documentation & Endpoint Sandbox
          </p>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-white text-sm">Base URL: http://localhost:5000/api/admin</span>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
            OpenAPI v3.0 Spec
          </span>
        </div>

        <div className="space-y-3">
          {endpoints.map((ep, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${
                    ep.method === "GET"
                      ? "bg-blue-500/20 text-blue-400"
                      : ep.method === "POST"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : ep.method === "PUT"
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-rose-500/20 text-rose-400"
                  }`}
                >
                  {ep.method}
                </span>
                <span className="font-mono text-xs font-bold text-white">{ep.path}</span>
              </div>
              <span className="text-xs text-slate-400">{ep.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
