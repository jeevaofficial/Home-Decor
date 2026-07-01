import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { BUSINESS } from "../constants/business";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-6">
      <div className="p-6 bg-primary-50 border border-primary-100 rounded-full text-primary-700">
        <Home size={48} />
      </div>

      <div className="space-y-2 max-w-sm">
        <h1 className="font-extrabold text-6xl text-accent-charcoal">404</h1>
        <h3 className="font-bold text-lg text-accent-charcoal">Page Not Found</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          The page you're looking for doesn't exist. Return to {BUSINESS.name} homepage.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary text-sm">
          Go Home
        </Link>
        <Link
          to="/products"
          className="border-2 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white font-semibold text-sm py-2.5 px-6 rounded-full transition-colors"
        >
          View Products
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
