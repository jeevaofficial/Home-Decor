import React from "react";
import { Link } from "react-router-dom";
import { Home, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { BUSINESS, SERVICES } from "../constants/business";

const Footer = () => {
  return (
    <footer className="bg-accent-charcoal text-white pt-14 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-primary-700 rounded-lg text-white">
                <Home size={18} />
              </div>
              <span className="font-bold text-lg tracking-tight">BEST HOME DECORS</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Leading home decor solutions provider in Hosur. Premium mosquito nets, custom curtains
              and blinds with professional installation.
            </p>
            <div className="flex space-x-3">
              <a
                href={BUSINESS.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 bg-white/5 hover:bg-primary-700 rounded-full transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href={BUSINESS.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 bg-white/5 hover:bg-primary-700 rounded-full transition-colors"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-primary-300 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-primary-300 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-300 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/request-quote" className="text-gray-400 hover:text-primary-300 transition-colors">
                  Get Free Quote
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="font-medium text-white text-xs uppercase tracking-wide mb-1">
                Mosquito Nets
              </li>
              {SERVICES.mosquitoNets.slice(0, 2).map((s) => (
                <li key={s}>{s}</li>
              ))}
              <li className="font-medium text-white text-xs uppercase tracking-wide mt-3 mb-1">
                Curtains & Blinds
              </li>
              {["Custom Curtains", "Zebra Blinds", "Roller Blinds"].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={18} className="text-primary-400 flex-shrink-0 mt-0.5" />
                <span>{BUSINESS.address.full}</span>
              </li>
              {BUSINESS.phones.map((phone) => (
                <li key={phone} className="flex items-center gap-2.5">
                  <Phone size={18} className="text-primary-400" />
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-white">
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2.5">
                <Mail size={18} className="text-primary-400" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-white">
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-white/10 my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} BEST HOME DECORS. All rights reserved.</p>
          <p>Hosur, Tamil Nadu, India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
