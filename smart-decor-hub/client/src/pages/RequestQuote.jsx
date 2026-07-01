import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productService from "../services/productService";
import { CheckCircle2, ChevronRight, PenTool, Phone, Wrench, Send } from "lucide-react";
import { BUSINESS, SERVICES } from "../constants/business";

const ALL_PRODUCTS = [
  ...SERVICES.mosquitoNets.map((p) => ({ value: p, group: "Mosquito Nets" })),
  ...SERVICES.curtains.map((p) => ({ value: p, group: "Curtains" })),
  ...SERVICES.blinds.map((p) => ({ value: p, group: "Blinds" })),
];

const RequestQuote = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    product: "",
    amount: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = `Get Free Quote | ${BUSINESS.name}`;

    productService
      .getProducts()
      .then(setProducts)
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      await productService.createQuote({
        customerName: formData.customerName,
        phone: formData.phone,
        product: formData.message
          ? `${formData.product} - ${formData.message}`
          : formData.product,
        amount: Number(formData.amount) || 0,
      });
      setSuccess(true);
      setFormData({ customerName: "", phone: "", product: "", amount: "", message: "" });
    } catch (err) {
      setError(
        err.response?.data?.errors?.[0] ||
          err.response?.data?.message ||
          "Failed to submit quote request."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
        <Link to="/" className="hover:text-primary-700">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-600">Get Free Quote</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch">
        <div className="md:col-span-2 bg-accent-charcoal text-white p-6 sm:p-8 rounded-2xl space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#991b1b,transparent_55%)] opacity-30 pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-primary-300">
              Free Quote
            </span>
            <h2 className="font-bold text-2xl tracking-tight leading-tight">
              Get a Custom Quote Today
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Tell us what you need and we'll provide an affordable quote with professional
              installation included.
            </p>
          </div>

          <div className="relative z-10 space-y-3 text-sm text-gray-400 pt-4 border-t border-white/10">
            <div className="flex items-start gap-2">
              <PenTool size={16} className="text-primary-400 flex-shrink-0 mt-0.5" />
              <span>Custom measurements & design</span>
            </div>
            <div className="flex items-start gap-2">
              <Wrench size={16} className="text-primary-400 flex-shrink-0 mt-0.5" />
              <span>Professional installation</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone size={16} className="text-primary-400 flex-shrink-0 mt-0.5" />
              <span>Quick callback within 24 hours</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
          {success ? (
            <div className="text-center py-12 space-y-4 animate-fade-in">
              <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />
              <h3 className="font-bold text-xl text-accent-charcoal">Quote Request Submitted!</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                Thank you! Our team will review your request and call you at{" "}
                {BUSINESS.phones[0]} shortly.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="btn-primary text-sm py-2 px-6"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="font-bold text-xl text-accent-charcoal">Request Free Quote</h3>
                <p className="text-gray-400 text-sm">Select a product and share your details.</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-xl">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="customerName"
                  required
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full bg-accent-gray border border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full bg-accent-gray border border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Product / Service *
                </label>
                <select
                  name="product"
                  required
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full bg-accent-gray border border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:outline-none"
                >
                  <option value="">Select a product or service</option>
                  {["Mosquito Nets", "Curtains", "Blinds"].map((group) => (
                    <optgroup key={group} label={group}>
                      {ALL_PRODUCTS.filter((p) => p.group === group).map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.value}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                  {products.length > 0 && (
                    <optgroup label="From Catalog">
                      {products.map((p) => (
                        <option key={p._id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  <option value="Other / Custom">Other / Custom Requirement</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Estimated Budget (Rs.) *
                </label>
                <input
                  type="number"
                  name="amount"
                  required
                  min="1"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="e.g. 5000"
                  className="w-full bg-accent-gray border border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Additional Details
                </label>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Room dimensions, quantity, preferred colors..."
                  className="w-full bg-accent-gray border border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <Send size={16} />
                {submitting ? "Submitting..." : "Submit Quote Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestQuote;
