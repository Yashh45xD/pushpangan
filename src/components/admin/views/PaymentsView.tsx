import React, { useState } from "react";
import { CreditCard, IndianRupee, ArrowUpRight, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

export const PaymentsView: React.FC = () => {
  const transactions = [
    { id: "TXN-8841", orderId: "ORD-2026-9812", customer: "Aarav Sharma", amount: 500, method: "UPI", status: "Success", date: "2026-07-29 10:14 AM" },
    { id: "TXN-8842", orderId: "ORD-2026-9813", customer: "Sneha Kulkarni", amount: 798, method: "Credit Card", status: "Success", date: "2026-07-29 11:30 AM" },
    { id: "TXN-8843", orderId: "ORD-2026-9814", customer: "Pooja Verma", amount: 1250, method: "Net Banking", status: "Success", date: "2026-07-29 01:15 PM" },
    { id: "TXN-8844", orderId: "ORD-2026-9815", customer: "Vikram Patil", amount: 350, method: "Cash On Delivery", status: "Pending COD", date: "2026-07-29 02:45 PM" },
    { id: "TXN-8845", orderId: "ORD-2026-9816", customer: "Rohit Shinde", amount: 499, method: "Debit Card", status: "Refunded", date: "2026-07-28 04:20 PM" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-rose-400" /> Payment & Refund Gateway Telemetry
          </h1>
          <p className="text-xs text-slate-400">
            Monitor real-time transactions across UPI, Credit Card, Debit Card, Net Banking, and Cash On Delivery
          </p>
        </div>
      </div>

      {/* Payment Gateway Method Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400">UPI Instant</div>
          <div className="text-xl font-extrabold text-emerald-400 mt-1">₹342,000</div>
          <div className="text-[10px] text-slate-500 mt-1">68% of total volume</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400">Credit Cards</div>
          <div className="text-xl font-extrabold text-blue-400 mt-1">₹112,000</div>
          <div className="text-[10px] text-slate-500 mt-1">22% of total volume</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400">Debit Cards</div>
          <div className="text-xl font-extrabold text-purple-400 mt-1">₹48,000</div>
          <div className="text-[10px] text-slate-500 mt-1">6% of total volume</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400">Net Banking</div>
          <div className="text-xl font-extrabold text-amber-400 mt-1">₹18,000</div>
          <div className="text-[10px] text-slate-500 mt-1">3% of total volume</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400">Cash On Delivery</div>
          <div className="text-xl font-extrabold text-slate-300 mt-1">₹20,000</div>
          <div className="text-[10px] text-slate-500 mt-1">1% of total volume</div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-sm text-white">Live Transaction Logs</h3>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            Razorpay + UPI Connected
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold uppercase text-slate-400 bg-slate-900">
                <th className="py-3 px-4">Txn ID</th>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/30 transition">
                  <td className="py-3 px-4 font-mono font-bold text-slate-300">{t.id}</td>
                  <td className="py-3 px-4 font-bold text-rose-400">{t.orderId}</td>
                  <td className="py-3 px-4 font-medium text-white">{t.customer}</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">₹{t.amount}</td>
                  <td className="py-3 px-4 text-slate-300 font-semibold">{t.method}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        t.status === "Success"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : t.status === "Refunded"
                          ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-slate-400">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
