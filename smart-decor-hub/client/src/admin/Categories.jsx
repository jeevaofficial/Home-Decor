import React, { useState, useEffect } from "react";
import productService from "../services/productService";
import Loader from "../components/Loader";
import { Plus, Pencil, Trash2, X, Upload, Check, AlertCircle } from "lucide-react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  // Upload States
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Error/Alert states
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await productService.getCategories();
      setCategories(data);
    } catch (err) {
      setError("Failed to load departments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadSuccess(false);
    setError("");

    try {
      const data = await productService.uploadImage(file);
      setFormData((prev) => ({ ...prev, image: data.imageUrl }));
      setUploadSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Banner upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setFormData({
      name: category.name,
      description: category.description || "",
      image: category.image || "",
    });
    setUploadSuccess(category.image ? true : false);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this department? Make sure no products are attached to it.")) return;

    setError("");
    setSuccessMsg("");
    try {
      await productService.deleteCategory(id);
      setSuccessMsg("Department deleted successfully.");
      loadCategories();
    } catch (err) {
      setError("Failed to delete department.");
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
      image: "",
    });
    setUploadSuccess(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const payload = {
      name: formData.name,
      description: formData.description,
      image: formData.image,
    };

    try {
      if (editingId) {
        await productService.updateCategory(editingId, payload);
        setSuccessMsg("Department updated successfully.");
      } else {
        await productService.createCategory(payload);
        setSuccessMsg("Department added successfully.");
      }
      handleCloseForm();
      loadCategories();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to save department.";
      setError(msg);
    }
  };

  if (loading) {
    return <Loader fullPage />;
  }

  return (
    <div className="p-4 sm:p-8 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm gap-4">
        <div className="space-y-1">
          <h1 className="font-bold text-2xl text-accent-charcoal">Manage Categories</h1>
          <p className="text-gray-500 text-sm">Organize products into Mosquito Nets, Curtains and Blinds.</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs uppercase tracking-wider py-3 px-6 rounded-full shadow-md flex items-center gap-1.5"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-4 rounded-2xl flex items-center gap-2">
          <AlertCircle size={18} />
          {error}
        </div>
      )}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs p-4 rounded-2xl flex items-center gap-2">
          <Check size={18} />
          {successMsg}
        </div>
      )}

      {/* Add/Edit Department Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-accent-charcoal bg-opacity-60 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative border border-gray-100 shadow-2xl">
            <button
              onClick={handleCloseForm}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <X size={22} />
            </button>

            <div className="space-y-1">
              <h3 className="font-sans font-bold text-lg text-accent-charcoal">
                {editingId ? "Edit Department" : "Add New Department"}
              </h3>
              <p className="text-gray-400 text-xs font-light">Classify showroom groupings with descriptions & banners.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Department Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Wall Accent Lights"
                  className="w-full bg-accent-cream border border-gray-100 rounded-xl px-4 py-2.5 text-xs focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Description</label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Summarize the core collection item styles contained in this department..."
                  className="w-full bg-accent-cream border border-gray-100 rounded-xl px-4 py-2.5 text-xs focus:border-primary-500 focus:outline-none resize-none"
                ></textarea>
              </div>

              {/* Upload UI banner */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Department Banner Image</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center justify-center gap-1.5 bg-accent-cream hover:bg-gray-100 border border-gray-200 text-gray-600 hover:text-accent-charcoal text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer transition-all">
                    <Upload size={16} />
                    {uploading ? "Uploading..." : "Select File"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {uploadSuccess && (
                    <span className="text-xs text-emerald-600 flex items-center gap-1">
                      <Check size={16} /> Banner Linked
                    </span>
                  )}
                </div>
                {formData.image && (
                  <div className="mt-2 relative w-32 h-20 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center disabled:opacity-70 mt-2"
              >
                {editingId ? "Update Department" : "Publish Department"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Departments Table */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        {categories.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider bg-gray-50 bg-opacity-40">
                  <th className="p-5 font-semibold">Banner</th>
                  <th className="p-5 font-semibold">Name</th>
                  <th className="p-5 font-semibold">Description</th>
                  <th className="p-5 font-semibold">URL Slug</th>
                  <th className="p-5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {categories.map((c) => (
                  <tr key={c._id} className="hover:bg-gray-50">
                    <td className="p-5">
                      <div className="w-16 h-10 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                        {c.image ? (
                          <img
                            src={c.image}
                            alt={c.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary-50 text-[9px] font-bold text-primary-300 flex items-center justify-center uppercase">
                            No Banner
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-5 font-medium text-accent-charcoal text-sm">{c.name}</td>
                    <td className="p-5 text-gray-500 max-w-xs truncate">{c.description || "—"}</td>
                    <td className="p-5 text-primary-600 font-semibold">{c.slug}</td>
                    <td className="p-5 text-right flex items-center justify-end gap-2.5 h-16">
                      <button
                        onClick={() => handleEdit(c)}
                        className="p-2 text-gray-400 hover:text-primary-600 bg-gray-50 hover:bg-primary-50 border border-gray-100 hover:border-primary-100 rounded-xl transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 border border-gray-100 hover:border-red-100 rounded-xl transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">No departments registered yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
