import React, { useState, useEffect } from "react";
import { adminService } from "../../../services/adminService";
import { History, Shield, Laptop, Calendar } from "lucide-react";

export const ActivityLogsView: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await adminService.getActivityLogs();
        if (res.success && res.logs) {
          setLogs(res.logs);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-rose-400" /> Admin Audit Logs & Security Timeline
          </h1>
          <p className="text-xs text-slate-400">
            Immutable security log stream recording logins, order changes, product edits, and restock actions
          </p>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold uppercase text-slate-400 bg-slate-900">
                <th className="py-3 px-4">Admin User</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {logs.map((log) => (
                <tr key={log._id} className="hover:bg-slate-800/30 transition">
                  <td className="py-3 px-4 font-bold text-white">{log.adminName || "Admin"}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 font-mono font-bold text-[10px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-semibold">{log.module}</td>
                  <td className="py-3 px-4 text-slate-300">{log.details}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{log.ipAddress || "127.0.0.1"}</td>
                  <td className="py-3 px-4 text-right text-slate-400">{log.createdAt?.slice(0, 19).replace("T", " ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
