import React, { useState, useEffect } from "react";
import { adminService } from "../../../services/adminService";
import { Boxes, AlertTriangle, CheckCircle2, PlusCircle, RefreshCw, Layers } from "lucide-react";

export const InventoryView: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [restockQty, setRestockQty] = useState(50);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await adminService.getInventory();
      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleRestockSubmit = async () => {
    if (!selectedProduct) return;
    await adminService.restockInventory(selectedProduct._id, restockQty);
    setShowRestockModal(false);
    fetchInventory();
  };

  const products = data?.products || [];
  const metrics = data?.metrics || {};

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Boxes className="w-5 h-5 text-rose-400" /> Live Inventory Telemetry
          </h1>
          <p className="text-xs text-slate-400">
            Monitor real-time warehouse flower stock, low-stock threshold triggers, and batch restock products
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
            <Boxes className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold">Total Tracked Items</div>
            <div className="text-2xl font-extrabold text-white">{metrics.totalItems || products.length}</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-amber-300 font-semibold">Low Stock Alerts (&le;10)</div>
            <div className="text-2xl font-extrabold text-amber-400">{metrics.lowStockCount || 1}</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-rose-300 font-semibold">Out of Stock (0)</div>
            <div className="text-2xl font-extrabold text-rose-400">{metrics.outOfStockCount || 0}</div>
          </div>
        </div>
      </div>

      {/* Live Stock Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold uppercase text-slate-400 bg-slate-900">
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Flower Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Stock Level</th>
                <th className="py-3 px-4">Status Alert</th>
                <th className="py-3 px-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {products.map((item: any) => {
                const isLow = item.stockQuantity <= 10 && item.stockQuantity > 0;
                const isOut = item.stockQuantity === 0;
                return (
                  <tr key={item._id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3 px-4 font-mono font-bold text-slate-400">{item.sku}</td>
                    <td className="py-3 px-4 font-bold text-white">{item.name}</td>
                    <td className="py-3 px-4 text-slate-300">{item.category}</td>
                    <td className="py-3 px-4 font-extrabold text-lg text-white">
                      {item.stockQuantity} <span className="text-xs font-normal text-slate-400">units</span>
                    </td>
                    <td className="py-3 px-4">
                      {isOut ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          OUT OF STOCK
                        </span>
                      ) : isLow ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse">
                          LOW STOCK
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          OPTIMAL STOCK
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedProduct(item);
                          setShowRestockModal(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-rose-300 font-bold text-xs border border-slate-700 transition flex items-center gap-1.5 ml-auto"
                      >
                        <PlusCircle className="w-3.5 h-3.5" /> Restock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restock Modal */}
      {showRestockModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-rose-400" /> Batch Restock {selectedProduct.name}
            </h3>
            <p className="text-xs text-slate-400 mb-4">Current Stock: {selectedProduct.stockQuantity} units</p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Add Stock Quantity (+)</label>
                <input
                  type="number"
                  min={1}
                  value={restockQty}
                  onChange={(e) => setRestockQty(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRestockModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRestockSubmit}
                  className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold rounded-xl shadow"
                >
                  Confirm Restock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
