import React, { useState, useEffect } from "react";
import { adminService } from "../../../services/adminService";
import { FolderTree, Plus, Edit2, Trash2, Layers, CheckCircle2 } from "lucide-react";

export const CategoriesView: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCat, setEditingCat] = useState<any | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "", image: "" });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await adminService.getCategories();
      if (res.success && res.categories) {
        setCategories(res.categories);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (cat?: any) => {
    if (cat) {
      setEditingCat(cat);
      setFormData({ name: cat.name, description: cat.description || "", image: cat.image || "" });
    } else {
      setEditingCat(null);
      setFormData({ name: "", description: "", image: "" });
    }
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData };
    if (editingCat) (payload as any)._id = editingCat._id;
    await adminService.saveCategory(payload);
    setShowModal(false);
    fetchCategories();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    await adminService.deleteCategory(id);
    fetchCategories();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-rose-400" /> Category Management
          </h1>
          <p className="text-xs text-slate-400">
            Organize flowers by varieties, occasion garlands, petals, and festival collections
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 hover:scale-105 transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {/* Grid of 11 Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat._id || cat.slug}
            className="group bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:border-rose-500/30 transition-all hover:-translate-y-1"
          >
            <div className="h-32 relative overflow-hidden">
              <img
                src={cat.image || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400"}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-rose-300 border border-rose-500/30">
                {cat.productCount || 6} Products
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-base text-white">{cat.name}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{cat.description || "Fresh floral category"}</p>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Active
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenModal(cat)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-600 hover:text-white transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingCat ? "Edit Category" : "Add New Category"}
            </h3>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Marigold"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-rose-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold rounded-xl"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
