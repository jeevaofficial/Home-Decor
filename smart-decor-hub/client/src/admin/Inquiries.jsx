import React, { useState, useEffect } from "react";
import productService from "../services/productService";
import Loader from "../components/Loader";
import { Mail, Phone, Calendar, Info, Inbox, Check, X, Trash2, AlertCircle } from "lucide-react";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const data = await productService.getInquiries();
      setInquiries(data);
    } catch (err) {
      setError("Failed to retrieve showroom inquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setError("");
    setSuccess("");
    try {
      await productService.updateInquiryStatus(id, newStatus);
      setSuccess(`Inquiry status updated to ${newStatus}.`);
      // Reload in place without triggering full screen loader if possible, or reload data
      const prodData = await productService.getInquiries();
      setInquiries(prodData);
    } catch (err) {
      setError("Failed to update inquiry status.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry record?")) return;
    setError("");
    setSuccess("");
    try {
      await productService.deleteInquiry(id);
      setSuccess("Inquiry deleted successfully.");
      const prodData = await productService.getInquiries();
      setInquiries(prodData);
    } catch (err) {
      setError("Failed to delete inquiry.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Contacted":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Closed":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
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
          <h1 className="font-bold text-2xl text-accent-charcoal">Customer Inquiries</h1>
          <p className="text-gray-500 text-sm">Messages received from the contact form and product pages.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-4 rounded-2xl flex items-center gap-2 animate-fade-in">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs p-4 rounded-2xl flex items-center gap-2 animate-fade-in">
          <Check size={18} />
          {success}
        </div>
      )}

      {/* Inquiry list grid */}
      {inquiries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inquiries.map((inq) => (
            <div
              key={inq._id}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Badge Overlay */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary-50 to-transparent pointer-events-none rounded-bl-full" />
              
              <div className="space-y-3.5 relative z-10">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(inq.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wide border ${getStatusBadge(inq.status || "Pending")}`}>
                    {inq.status || "Pending"}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-lg text-accent-charcoal leading-snug">
                  {inq.name}
                </h3>

                <span className="inline-block bg-primary-50 border border-primary-100 text-primary-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Ref: {inq.product}
                </span>

                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed italic border-l-2 border-primary-100 pl-3.5 py-1">
                  "{inq.message}"
                </p>
              </div>

              {/* Actions & Contacts */}
              <div className="pt-4 border-t border-gray-50 space-y-3 relative z-10">
                <div className="space-y-1.5 text-[11px] font-medium text-gray-400">
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-primary-500 flex-shrink-0" />
                    <span>Phone: <span className="text-accent-charcoal font-semibold">{inq.phone}</span></span>
                  </div>
                  {inq.email && (
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-primary-500 flex-shrink-0" />
                      <span>Email: <span className="text-accent-charcoal font-semibold">{inq.email}</span></span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex gap-1.5">
                    {(inq.status === "Pending" || !inq.status) && (
                      <button
                        onClick={() => handleStatusChange(inq._id, "Contacted")}
                        title="Mark as Contacted"
                        className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 border border-blue-100 rounded-lg transition-all"
                      >
                        <Check size={12} /> Contacted
                      </button>
                    )}
                    {inq.status === "Contacted" && (
                      <button
                        onClick={() => handleStatusChange(inq._id, "Closed")}
                        title="Close Inquiry"
                        className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold text-emerald-600 hover:text-white bg-emerald-50 hover:bg-emerald-600 border border-emerald-100 rounded-lg transition-all"
                      >
                        <Check size={12} /> Close
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(inq._id)}
                    title="Delete Inquiry"
                    className="p-1.5 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 border border-gray-100 hover:border-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <Inbox size={40} className="text-gray-300 mx-auto mb-4 animate-bounce" />
          <h3 className="font-sans font-bold text-lg text-accent-charcoal mb-1">Inbox Clean</h3>
          <p className="text-gray-400 text-xs">No customer inquiries logged yet.</p>
        </div>
      )}
    </div>
  );
};

export default Inquiries;
