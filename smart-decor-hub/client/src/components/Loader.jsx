import React from "react";

const Loader = ({ fullPage = false }) => {
  return (
    <div
      className={`${
        fullPage ? "fixed inset-0 z-50 bg-white/80" : "w-full py-12"
      } flex flex-col items-center justify-center`}
    >
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-2 border-primary-100 animate-ping" />
        <div className="w-14 h-14 rounded-full border-4 border-primary-100 border-t-primary-700 animate-spin" />
      </div>
      <p className="mt-4 text-sm font-semibold tracking-wider text-primary-700 animate-pulse uppercase">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
