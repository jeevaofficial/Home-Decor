import React from "react";
import { Phone } from "lucide-react";
import { BUSINESS } from "../constants/business";

const CallNowButton = () => {
  const phoneHref = `tel:${BUSINESS.phones[0].replace(/\s/g, "")}`;

  return (
    <a
      href={phoneHref}
      aria-label="Call Now"
      className="fixed bottom-4 right-4 sm:right-6 z-50 flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold text-sm py-3 px-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <Phone size={18} />
      <span className="hidden sm:inline">Call Now</span>
    </a>
  );
};

export default CallNowButton;
