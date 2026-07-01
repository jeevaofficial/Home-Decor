import React, { useState, useEffect } from "react";
import productService from "../services/productService";
import { Mail, Phone, MapPin, CheckCircle2, Send, Clock, MessageCircle } from "lucide-react";
import { BUSINESS } from "../constants/business";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    product: "General Inquiry",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = `Contact Us | ${BUSINESS.name}`;
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
      await productService.createInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        product: formData.product,
        message: formData.message,
      });
      setSuccess(true);
      setFormData({ name: "", phone: "", email: "", product: "General Inquiry", message: "" });
    } catch (err) {
      setError(
        err.response?.data?.errors?.[0] ||
          err.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="section-heading">Contact Us</span>
        <h1 className="font-bold text-3xl sm:text-4xl text-accent-charcoal">Get In Touch</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Visit our shop in Hosur or send us a message. We respond within 24 hours.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 space-y-5">
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-5">
            <h3 className="font-bold text-lg text-accent-charcoal">Contact Details</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary-700 flex-shrink-0 mt-0.5" />
                <span>{BUSINESS.address.full}</span>
              </li>
              {BUSINESS.phones.map((phone) => (
                <li key={phone} className="flex items-center gap-3">
                  <Phone size={20} className="text-primary-700" />
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-primary-700">
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary-700" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-primary-700">
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={20} className="text-[#25D366]" />
                <a
                  href={BUSINESS.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366]"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex items-start gap-4">
            <Clock className="text-primary-700 mt-1 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-bold text-sm text-accent-charcoal mb-1">Business Hours</h4>
              <p className="text-gray-500 text-sm">{BUSINESS.hours.weekdays}</p>
              <p className="text-gray-500 text-sm">{BUSINESS.hours.sunday}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm">
          {success ? (
            <div className="text-center py-12 space-y-4 animate-fade-in">
              <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />
              <h3 className="font-bold text-xl text-accent-charcoal">Message Sent!</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                Thank you! We will contact you shortly via phone or email.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="btn-primary text-sm py-2 px-6"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="font-bold text-lg text-accent-charcoal">Send a Message</h3>
                <p className="text-gray-400 text-sm">Fill in the form and we'll get back to you.</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-xl">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-accent-gray border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
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
                    className="w-full bg-accent-gray border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-accent-gray border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Subject *
                </label>
                <select
                  name="product"
                  required
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full bg-accent-gray border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
                >
                  <option>General Inquiry</option>
                  <option>Mosquito Nets</option>
                  <option>Curtains</option>
                  <option>Blinds</option>
                  <option>Installation Service</option>
                  <option>Custom Quote</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements..."
                  className="w-full bg-accent-gray border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <Send size={16} />
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Google Maps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm aspect-[16/7] sm:aspect-[16/6]">
          <iframe
            title="BEST HOME DECORS Location"
            src={BUSINESS.mapEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
