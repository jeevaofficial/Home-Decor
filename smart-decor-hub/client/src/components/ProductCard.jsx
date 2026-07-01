import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { formatPrice } from "../utils/formatPrice";

const ProductCard = ({ product }) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary-200 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full hover:-translate-y-1">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-primary-50 text-primary-400 text-sm font-semibold uppercase">
            No Image
          </div>
        )}

        <div className="absolute top-3 left-3">
          <span
            className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${
              product.stock > 0
                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                : "bg-red-50 text-red-700 border border-red-100"
            }`}
          >
            {product.stock > 0 ? "Available" : "Out of Stock"}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            to={`/products/${product._id}`}
            className="bg-white p-2 rounded-full shadow-md hover:bg-primary-700 hover:text-white transition-colors"
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-bold text-primary-700 uppercase tracking-widest block mb-1">
            {product.category}
          </span>
          <h3 className="font-bold text-lg text-accent-charcoal mb-2 leading-snug group-hover:text-primary-700 transition-colors">
            <Link to={`/products/${product._id}`}>{product.name}</Link>
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{product.description}</p>
        </div>

        <div>
          <hr className="border-gray-100 my-4" />
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400">Starting from</span>
              <span className="text-lg font-bold text-accent-charcoal block">
                {formatPrice(product.price)}
              </span>
            </div>
            <Link
              to={`/products/${product._id}`}
              className="text-xs font-bold uppercase tracking-wider text-primary-700 hover:text-white hover:bg-primary-700 border border-primary-200 px-4 py-2 rounded-full transition-all"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
