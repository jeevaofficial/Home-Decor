import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { BUSINESS, GALLERY_IMAGES } from "../constants/business";

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    document.title = `Gallery | ${BUSINESS.name}`;
  }, []);

  const categories = ["All", ...new Set(GALLERY_IMAGES.map((img) => img.category))];
  const filtered =
    filter === "All" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.category === filter);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
  };

  const goNext = () => {
    setLightboxIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="section-heading">Our Work</span>
        <h1 className="font-bold text-3xl sm:text-4xl text-accent-charcoal">Project Gallery</h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Explore our completed installations of mosquito nets, curtains and blinds across Hosur and
          surrounding areas.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === cat
                ? "bg-primary-700 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:border-primary-300"
            }`}
          >
            {cat !== "All" && <Filter size={14} />}
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((img, index) => (
          <div
            key={img.id}
            onClick={() => openLightbox(index)}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer group shadow-sm hover:shadow-lg transition-shadow"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openLightbox(index)}
          >
            <img
              src={img.src}
              alt={img.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
              <span className="text-[10px] uppercase font-bold text-primary-300 tracking-wider">
                {img.category}
              </span>
              <h3 className="text-white font-semibold text-sm">{img.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 sm:left-6 text-white/80 hover:text-white p-2 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={36} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 sm:right-6 text-white/80 hover:text-white p-2 z-10"
            aria-label="Next image"
          >
            <ChevronRight size={36} />
          </button>

          <div
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].title}
              className="max-h-[75vh] w-auto object-contain rounded-lg"
            />
            <div className="text-center mt-4 space-y-1">
              <span className="text-primary-400 text-xs uppercase font-bold tracking-wider">
                {filtered[lightboxIndex].category}
              </span>
              <h3 className="text-white font-semibold text-lg">{filtered[lightboxIndex].title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
