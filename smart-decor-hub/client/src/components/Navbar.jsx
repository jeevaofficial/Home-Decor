import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, Home, User, LogOut, LayoutDashboard, Phone } from "lucide-react";
import { BUSINESS } from "../constants/business";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-primary-700 rounded-lg text-white group-hover:bg-primary-800 transition-colors">
              <Home size={22} />
            </div>
            <div className="leading-tight">
              <span className="font-bold text-base sm:text-lg tracking-tight text-accent-charcoal block">
                BEST HOME DECORS
              </span>
              <span className="text-[10px] text-gray-500 hidden sm:block">Hosur, Tamil Nadu</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium text-sm transition-all hover:text-primary-700 ${
                    isActive
                      ? "text-primary-700 border-b-2 border-primary-700 pb-0.5"
                      : "text-gray-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link to="/request-quote" className="btn-primary text-sm py-2.5 px-5">
              Get Free Quote
            </Link>
            <a
              href={`tel:${BUSINESS.phones[0].replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800"
            >
              <Phone size={16} />
              Call Now
            </a>
          </div>

          <div className="hidden lg:flex items-center">
            {user ? (
              <div className="flex items-center space-x-3 ml-2">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary-700"
                >
                  <LayoutDashboard size={16} />
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 border border-red-200 py-1.5 px-3 rounded-full"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary-700 ml-2"
              >
                <User size={16} />
                Admin
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-accent-charcoal rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="px-4 pt-3 pb-5 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-lg text-base font-medium ${
                    isActive
                      ? "bg-primary-50 text-primary-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link
              to="/request-quote"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center btn-primary mt-3 py-2.5"
            >
              Get Free Quote
            </Link>
            <a
              href={`tel:${BUSINESS.phones[0].replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-2 w-full border-2 border-primary-700 text-primary-700 font-semibold py-2.5 px-4 rounded-full mt-2"
            >
              <Phone size={16} />
              Call Now
            </a>
            <hr className="my-3 border-gray-100" />
            {user ? (
              <>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-gray-700"
                >
                  <LayoutDashboard size={18} />
                  Admin Dashboard
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2.5 text-red-600"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-gray-700"
              >
                <User size={18} />
                Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
