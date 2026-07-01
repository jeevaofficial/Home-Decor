import React, { useState, useEffect } from "react";
import productService from "../services/productService";
import Loader from "../components/Loader";
import { formatPrice } from "../utils/formatPrice";
import { Check, X, Trash2, AlertCircle, ClipboardCheck } from "lucide-react";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadQuotes = async () => {
    setLoading(true);
    try {
      const data = await productService.getQuotes();
      setQuotes(data);
    } catch (err) {
      setError("Failed to retrieve custom quotes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setError("");
    setSuccess("");

    try {
      await productService.updateQuoteStatus(id, newStatus);
      setSuccess(`Quote status updated to ${newStatus}.`);
      loadQuotes();
    } catch (err) {
      setError("Failed to update quote status.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this custom quote record?")) return;

    setError("");
    setSuccess("");

    try {
      await productService.deleteQuote(id);
      setSuccess("Quote request deleted successfully.");
      loadQuotes();
    } catch (err) {
      setError("Failed to delete quote request.");
    }
  };

  if (loading) {
    return <Loader fullPage />;
  }

  return (
    <div className="p-4 sm:p-8 space-y-6">
      {/* Title */}
      <div className="flex justify-between items-center bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="space-y-1">
          <h1 className="font-bold text-2xl text-accent-charcoal">Quote Requests</h1>
          <p className="text-gray-500 text-sm">Review and manage customer quote requests.</p>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-4 rounded-2xl flex items-center gap-2">
          <AlertCircle size={18} />
          {error}
        </div>
      )}
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs p-4 rounded-2xl flex items-center gap-2">
          <Check size={18} />
          {success}
        </div>
      )}

      {/* Table grid */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        {quotes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider bg-gray-50 bg-opacity-40">
                  <th className="p-5 font-semibold">Date</th>
                  <th className="p-5 font-semibold">Customer</th>
                  <th className="p-5 font-semibold">Phone Contact</th>
                  <th className="p-5 font-semibold">Desired Product</th>
                  <th className="p-5 font-semibold">Budget</th>
                  <th className="p-5 font-semibold">Status</th>
                  <th className="p-5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {quotes.map((q) => (
                  <tr key={q._id} className="hover:bg-gray-50">
                    <td className="p-5 text-gray-500 font-medium whitespace-nowrap">
                      {new Date(q.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-5 font-semibold text-accent-charcoal text-sm">{q.customerName}</td>
                    <td className="p-5 text-gray-500 whitespace-nowrap">{q.phone}</td>
                    <td className="p-5 text-gray-500">{q.product}</td>
                    <td className="p-5 font-bold text-accent-charcoal">{formatPrice(q.amount)}</td>
                    <td className="p-5">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[9px] uppercase tracking-wide border ${
                        q.status === "Pending"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : q.status === "Approved"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}>
                        {q.status}
                      </span>
                    </td>
                    <td className="p-5 text-right flex items-center justify-end gap-2 h-16">
                      {q.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(q._id, "Approved")}
                            title="Approve Quote"
                            className="p-2 text-emerald-500 hover:text-white bg-emerald-50 hover:bg-emerald-500 border border-emerald-100 rounded-xl transition-all"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={() => handleStatusChange(q._id, "Rejected")}
                            title="Reject Quote"
                            className="p-2 text-red-400 hover:text-white bg-red-50 hover:bg-red-500 border border-red-100 rounded-xl transition-all"
                          >
                            <X size={14} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(q._id)}
                        title="Delete Quote Record"
                        className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 border border-gray-100 rounded-xl transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20">
            <ClipboardCheck size={40} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 text-sm">No custom design quotes submitted yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quotes;
