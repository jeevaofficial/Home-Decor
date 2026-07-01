import React from "react";
import { ArrowRight } from "lucide-react";

const CategoryCard = ({ category, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(category.name)}
      className="group cursor-pointer relative rounded-2xl overflow-hidden aspect-[4/3] w-full bg-accent-charcoal shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect(category.name)}
    >
      {category.image ? (
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-charcoal to-primary-900 opacity-90" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <h3 className="font-bold text-xl text-white mb-1 group-hover:text-primary-300 transition-colors">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-gray-300 text-xs line-clamp-2 mb-3 leading-relaxed">
            {category.description}
          </p>
        )}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-primary-300 group-hover:text-white transition-colors">
          <span>Explore Products</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
