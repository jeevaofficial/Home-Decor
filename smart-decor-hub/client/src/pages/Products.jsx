import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import productService from "../services/productService";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { BUSINESS } from "../constants/business";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [priceLimit, setPriceLimit] = useState(100000);

  useEffect(() => {
    document.title = `Products | ${BUSINESS.name}`;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodData, catData] = await Promise.all([
          productService.getProducts(),
          productService.getCategories(),
        ]);
        setProducts(prodData);
        setCategories(catData);
        if (prodData.length > 0) {
          const maxP = Math.max(...prodData.map((p) => p.price));
          const nextLimit = Math.ceil(maxP / 1000) * 1000 || 100000;
          setPriceLimit(nextLimit);
          setMaxPrice(nextLimit);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) setSelectedCategory(catParam);
  }, [searchParams]);

  useEffect(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    result = result.filter((p) => p.price <= maxPrice);

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name));
    else result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategory, sortBy, maxPrice]);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    if (categoryName === "All") searchParams.delete("category");
    else searchParams.set("category", categoryName);
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("newest");
    setMaxPrice(priceLimit);
    setSearchParams({});
  };

  if (loading) return <Loader fullPage />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      <div className="space-y-3">
        <span className="section-heading">Our Collection</span>
        <h1 className="font-bold text-3xl sm:text-4xl text-accent-charcoal">
          Mosquito Nets, Curtains & Blinds
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
          Browse our complete range of home decor products. Filter by category to find the perfect
          solution for your home or office.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <aside className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-accent-charcoal flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-primary-700" />
              Filters
            </h3>
            <button
              onClick={clearFilters}
              className="text-xs font-semibold text-primary-700 hover:underline"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-accent-gray border border-gray-100 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
              Category
            </label>
            <div className="space-y-1">
              <button
                onClick={() => handleCategoryChange("All")}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
                  selectedCategory === "All"
                    ? "bg-primary-50 text-primary-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? "bg-primary-50 text-primary-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
              <span>Max Price</span>
              <span className="text-primary-700">Rs. {maxPrice.toLocaleString("en-IN")}</span>
            </div>
            <input
              type="range"
              min="0"
              max={priceLimit}
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary-700 cursor-pointer"
            />
          </div>
        </aside>

        <main className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center bg-white border border-gray-100 p-4 rounded-2xl shadow-sm gap-3">
            <span className="text-sm text-gray-500">
              Showing <strong className="text-accent-charcoal">{filteredProducts.length}</strong> products
            </span>
            <div className="flex items-center gap-2">
              <ArrowUpDown size={16} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm font-medium text-accent-charcoal border-none focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod._id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
              <SlidersHorizontal size={36} className="text-gray-300 mx-auto mb-3" />
              <h3 className="font-bold text-lg text-accent-charcoal mb-1">No Products Found</h3>
              <p className="text-gray-500 text-sm mb-4">Try adjusting your filters or search query.</p>
              <button onClick={clearFilters} className="btn-primary text-sm py-2 px-6">
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
