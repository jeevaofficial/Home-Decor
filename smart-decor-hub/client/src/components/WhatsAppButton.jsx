import React from "react";
import { MessageCircle } from "lucide-react";
import { BUSINESS } from "../constants/business";

const WhatsAppButton = () => {
  return (
    <a
      href={BUSINESS.social.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-4 sm:right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
    >
      <MessageCircle size={26} fill="currentColor" />
    </a>
  );
};

export default WhatsAppButton;
