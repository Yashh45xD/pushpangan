import React from "react";
import { BarChart3, Download, TrendingUp, Users, ShoppingBag, FileSpreadsheet, FileText } from "lucide-react";

export const AnalyticsView: React.FC = () => {
  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Month,Revenue,Orders,Customers\nJan,210000,180,120\nFeb,290000,240,160\nMar,380000,310,210\nJul,710000,540,380";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pushpangan_sales_report_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportExcel = () => {
    alert("Excel Export Generated: pushpangan_analytics.xlsx");
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-rose-400" /> Executive Analytics & Intelligence
          </h1>
          <p className="text-xs text-slate-400">
            Conversion rates, repeat customer metrics, top viewed flowers & report export engine
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> Export CSV
          </button>
          <button
            onClick={exportPDF}
            className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow"
          >
            <FileText className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400 font-semibold">Conversion Rate</div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">4.85%</div>
          <div className="text-[10px] text-slate-500 mt-1">+1.2% vs industry avg</div>
        </div>
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400 font-semibold">Repeat Customer Rate</div>
          <div className="text-2xl font-extrabold text-purple-400 mt-1">42.6%</div>
          <div className="text-[10px] text-slate-500 mt-1">High floral loyalty</div>
        </div>
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400 font-semibold">Avg Order Value (AOV)</div>
          <div className="text-2xl font-extrabold text-amber-400 mt-1">₹685</div>
          <div className="text-[10px] text-slate-500 mt-1">+₹45 this month</div>
        </div>
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400 font-semibold">Most Viewed Flower</div>
          <div className="text-2xl font-extrabold text-rose-400 mt-1">Dutch Red Rose</div>
          <div className="text-[10px] text-slate-500 mt-1">12,400 monthly views</div>
        </div>
      </div>
    </div>
  );
};
