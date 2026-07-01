import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import productService from "../services/productService";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import Loader from "../components/Loader";
import {
  ArrowRight,
  Phone,
  CheckCircle,
  Award,
  Wrench,
  IndianRupee,
  Truck,
  ThumbsUp,
  MapPin,
  Mail,
  Send,
} from "lucide-react";
import {
  BUSINESS,
  HERO_FEATURES,
  HERO_IMAGE,
  WHY_CHOOSE_US,
  GALLERY_IMAGES,
  DEFAULT_CATEGORIES,
} from "../constants/business";

const iconMap = {
  quality: Award,
  design: CheckCircle,
  installation: Wrench,
  price: IndianRupee,
  delivery: Truck,
  support: ThumbsUp,
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${BUSINESS.name} | ${BUSINESS.tagline}`;

    const fetchData = async () => {
      try {
        const [prodData, catData] = await Promise.all([
          productService.getProducts(),
          productService.getCategories(),
        ]);
        setProducts(prodData.slice(0, 6));
        setCategories(catData.length > 0 ? catData.slice(0, 3) : DEFAULT_CATEGORIES);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCategories(DEFAULT_CATEGORIES);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategorySelect = (categoryName) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  if (loading) return <Loader fullPage />;

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Premium home decor"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-6 animate-slide-up">
            <span className="inline-block text-xs uppercase font-bold tracking-widest text-primary-300 bg-primary-900/40 px-3 py-1.5 rounded-full border border-primary-700/30">
              {BUSINESS.location}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              {BUSINESS.name}
            </h1>

            <p className="text-xl sm:text-2xl text-primary-200 font-medium">
              {BUSINESS.tagline}
            </p>

            <ul className="space-y-2 pt-2">
              {HERO_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-gray-200 text-sm sm:text-base">
                  <CheckCircle size={18} className="text-primary-400 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={`tel:${BUSINESS.phones[0].replace(/\s/g, "")}`}
                className="btn-primary flex items-center gap-2"
              >
                <Phone size={18} />
                Call Now
              </a>
              <Link to="/request-quote" className="btn-outline border-white text-white hover:bg-white hover:text-primary-700 hover:border-white">
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="section-heading">About Us</span>
            <h2 className="font-bold text-3xl sm:text-4xl text-accent-charcoal leading-tight">
              Leading Home Decor Solutions in Hosur
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Best Home Decors is a leading home decor solutions provider in Hosur. We specialize in
              premium mosquito nets, custom curtains, roller blinds, zebra blinds, bamboo blinds and
              office vertical blinds.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our goal is to provide stylish, durable and affordable solutions for homes, offices and
              commercial spaces.
            </p>
            <Link to="/about" className="inline-flex items-center gap-1 text-primary-700 font-semibold hover:gap-2 transition-all">
              Learn More <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {GALLERY_IMAGES.slice(0, 4).map((img) => (
              <div key={img.id} className="rounded-2xl overflow-hidden aspect-square shadow-md">
                <img src={img.src} alt={img.title} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="bg-accent-gray py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <span className="section-heading">Our Products</span>
            <h2 className="font-bold text-3xl text-accent-charcoal">Product Categories</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <CategoryCard
                key={cat._id || cat.name}
                category={cat}
                onSelect={handleCategorySelect}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="space-y-2">
            <span className="section-heading">Featured</span>
            <h2 className="font-bold text-3xl text-accent-charcoal">Popular Products</h2>
          </div>
          <Link to="/products" className="flex items-center gap-1 text-sm font-semibold text-primary-700 hover:gap-2 transition-all">
            View All Products <ArrowRight size={16} />
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => (
              <ProductCard key={prod._id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-accent-gray rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500">Products coming soon. Contact us for a free quote!</p>
            <Link to="/request-quote" className="btn-primary inline-block mt-4 text-sm">
              Get Free Quote
            </Link>
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="section-heading">Why Choose Us</span>
          <h2 className="font-bold text-3xl text-accent-charcoal">The BEST HOME DECORS Advantage</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.title}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-100 transition-all text-center space-y-3"
              >
                <div className="inline-flex p-3 bg-primary-50 rounded-xl text-primary-700">
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-accent-charcoal">{item.title}</h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="bg-accent-charcoal py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-primary-400">
                Our Work
              </span>
              <h2 className="font-bold text-3xl text-white">Project Gallery</h2>
            </div>
            <Link to="/gallery" className="flex items-center gap-1 text-sm font-semibold text-primary-300 hover:text-white transition-colors">
              View Full Gallery <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {GALLERY_IMAGES.slice(0, 6).map((img) => (
              <div key={img.id} className="relative rounded-xl overflow-hidden aspect-[4/3] group">
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-sm font-semibold">{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-primary-700 overflow-hidden px-8 py-14 sm:px-16 sm:py-20 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="relative max-w-xl mx-auto space-y-5 z-10">
            <h2 className="font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Need a Custom Solution?
            </h2>
            <p className="text-primary-100 text-sm sm:text-base">
              Get a free quote for mosquito nets, curtains or blinds. Our team will visit your location
              in Hosur and surrounding areas.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link to="/request-quote" className="bg-white text-primary-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full shadow-md transition-colors inline-flex items-center gap-2">
                <Send size={16} />
                Get Free Quote
              </Link>
              <Link to="/contact" className="border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-full transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-primary-50 rounded-xl text-primary-700">
              <MapPin size={22} />
            </div>
            <div>
              <h3 className="font-bold text-accent-charcoal mb-1">Visit Our Shop</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{BUSINESS.address.full}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-primary-50 rounded-xl text-primary-700">
              <Phone size={22} />
            </div>
            <div>
              <h3 className="font-bold text-accent-charcoal mb-1">Call Us</h3>
              {BUSINESS.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="block text-gray-500 text-sm hover:text-primary-700"
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-primary-50 rounded-xl text-primary-700">
              <Mail size={22} />
            </div>
            <div>
              <h3 className="font-bold text-accent-charcoal mb-1">Email Us</h3>
              <a href={`mailto:${BUSINESS.email}`} className="text-gray-500 text-sm hover:text-primary-700">
                {BUSINESS.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
