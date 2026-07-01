import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import productService from "../services/productService";
import Loader from "../components/Loader";
import { ArrowLeft, Send, CheckCircle2, ShieldCheck, Phone } from "lucide-react";
import { formatPrice } from "../utils/formatPrice";
import { BUSINESS } from "../constants/business";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("inquiry");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    amount: "",
  });
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
        document.title = `${data.name} | ${BUSINESS.name}`;
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");
    setFormSuccess(false);

    try {
      if (activeTab === "inquiry") {
        await productService.createInquiry({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          product: product.name,
          message: formData.message,
        });
      } else {
        await productService.createQuote({
          customerName: formData.name,
          phone: formData.phone,
          product: product.name,
          amount: Number(formData.amount),
        });
      }
      setFormSuccess(true);
      setFormData({ name: "", phone: "", email: "", message: "", amount: "" });
    } catch (error) {
      setFormError(
        error.response?.data?.errors?.[0] ||
          error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader fullPage />;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="font-bold text-2xl text-accent-charcoal mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-8">This product may have been removed or is unavailable.</p>
        <Link to="/products" className="btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-primary-700"
      >
        <ArrowLeft size={16} />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-5">
          <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-md aspect-square">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-primary-50 text-primary-400 font-bold uppercase">
                No Preview
              </div>
            )}
          </div>

          <div className="bg-primary-50 p-5 rounded-2xl border border-primary-100 flex items-start gap-3">
            <ShieldCheck className="text-primary-700 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-bold text-sm text-primary-800">Quality Guarantee</h4>
              <p className="text-primary-700 text-xs leading-relaxed mt-1">
                Premium materials with professional installation. Contact us for warranty details.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-700">
              {product.category}
            </span>
            <h1 className="font-bold text-3xl sm:text-4xl text-accent-charcoal leading-tight">
              {product.name}
            </h1>
            <div className="text-2xl font-bold text-accent-charcoal">
              {formatPrice(product.price)}
            </div>
            <hr className="border-gray-200" />
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
            <p className="text-sm">
              Availability:{" "}
              <span className={product.stock > 0 ? "text-emerald-600 font-semibold" : "text-red-500 font-semibold"}>
                {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
              </span>
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`tel:${BUSINESS.phones[0].replace(/\s/g, "")}`}
                className="inline-flex items-center gap-1.5 bg-primary-50 hover:bg-primary-100 text-primary-700 border border-primary-200/50 py-2.5 px-4 rounded-xl text-xs font-bold transition-all"
              >
                <Phone size={14} />
                Call for Best Price
              </a>
              <a
                href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
                  `Hi BEST HOME DECORS, I am interested in the product "${product.name}" (Price: ${formatPrice(product.price)}) listed on your website. Please share more details.\nLink: ${window.location.href}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/50 py-2.5 px-4 rounded-xl text-xs font-bold transition-all"
              >
                <svg className="w-4 h-4 fill-current text-emerald-600" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.835-3.322c1.611.956 3.125 1.485 4.82 1.487 5.485 0 9.948-4.461 9.951-9.947.002-2.656-1.026-5.153-2.897-7.027C16.096 3.317 13.6 2.29 10.945 2.29c-5.492 0-9.954 4.463-9.957 9.95 0 1.74.475 3.442 1.385 4.96L1.373 21.6l4.57-1.196c1.53.834 3.052 1.274 4.949 1.274zm11.015-7.79c-.3-.15-1.771-.875-2.046-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.795-1.49-1.77-1.665-2.07-.175-.3-.019-.462.13-.61.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.491-.51-.675-.52-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8 1.05-.275.975-1.05 1.05-1.125 1.15-.075.1-.15.225-.05.375.1.15.525.862 1.1 1.385.738.66 1.36 1.05 2.115 1.36.755.31 1.442.27 1.99.19.613-.09 1.771-.725 2.021-1.425.25-.7.25-1.3.175-1.425-.075-.1-.275-.2-.575-.35z" />
                </svg>
                Inquire on WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
            <div className="flex border-b border-gray-100">
              {["inquiry", "quote"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setFormSuccess(false);
                    setFormError("");
                  }}
                  className={`flex-1 text-center font-semibold text-sm pb-3 border-b-2 transition-all ${
                    activeTab === tab
                      ? "border-primary-700 text-primary-700"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab === "inquiry" ? "Send Inquiry" : "Get Quote"}
                </button>
              ))}
            </div>

            {formSuccess ? (
              <div className="text-center py-8 space-y-3 animate-fade-in">
                <CheckCircle2 size={40} className="text-emerald-500 mx-auto" />
                <h4 className="font-bold text-lg">Request Received!</h4>
                <p className="text-gray-500 text-sm">We'll contact you within 24 hours.</p>
                <button
                  onClick={() => setFormSuccess(false)}
                  className="btn-primary text-sm py-2 px-5"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {formError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-xl">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-400">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-accent-gray border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-400">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-accent-gray border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                </div>

                {activeTab === "inquiry" ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-gray-400">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-accent-gray border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-gray-400">Message *</label>
                      <textarea
                        name="message"
                        required
                        rows="3"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={`Ask about ${product.name}...`}
                        className="w-full bg-accent-gray border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none resize-none"
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-400">Budget (Rs.) *</label>
                    <input
                      type="number"
                      name="amount"
                      required
                      min="1"
                      value={formData.amount}
                      onChange={handleChange}
                      className="w-full bg-accent-gray border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <Send size={14} />
                  {submitting ? "Submitting..." : activeTab === "inquiry" ? "Send Inquiry" : "Get Quote"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
