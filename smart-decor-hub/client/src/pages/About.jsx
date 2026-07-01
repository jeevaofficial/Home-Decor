import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Target, Eye, CheckCircle, ArrowRight } from "lucide-react";
import { BUSINESS, SERVICES, WHY_CHOOSE_US } from "../constants/business";

const About = () => {
  useEffect(() => {
    document.title = `About Us | ${BUSINESS.name}`;
  }, []);

  return (
    <div className="space-y-20 py-12 sm:py-16">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="section-heading">About Us</span>
          <h1 className="font-bold text-4xl sm:text-5xl text-accent-charcoal tracking-tight leading-tight">
            Your Trusted Home Decor Partner in Hosur
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Best Home Decors is a leading home decor solutions provider in Hosur. We specialize in
            premium mosquito nets, custom curtains, roller blinds, zebra blinds, bamboo blinds and
            office vertical blinds.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1618221197210-80ca1347b0d6?w=800&q=80"
              alt="Best Home Decors showroom"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-5">
            <h2 className="font-bold text-2xl sm:text-3xl text-accent-charcoal">Company Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              Located at Shop No: 86, Alasanatham Road, Masuthi Opposite, Jai Nagar, Hosur, we serve
              homes, offices and commercial spaces across Tamil Nadu with quality products and
              professional installation services.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our goal is to provide stylish, durable and affordable solutions that enhance comfort,
              privacy and aesthetics for every customer we serve.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-accent-gray py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="inline-flex p-3 bg-primary-50 rounded-xl text-primary-700">
              <Target size={24} />
            </div>
            <h3 className="font-bold text-xl text-accent-charcoal">Our Mission</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To deliver premium quality mosquito nets, curtains and blinds with expert installation,
              ensuring every customer enjoys a beautiful, comfortable and protected living or working
              space at an affordable price.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="inline-flex p-3 bg-primary-50 rounded-xl text-primary-700">
              <Eye size={24} />
            </div>
            <h3 className="font-bold text-xl text-accent-charcoal">Our Vision</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To become the most trusted and preferred home decor solutions brand in Hosur and
              surrounding regions, known for quality craftsmanship, customer satisfaction and
              innovative design solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="section-heading">What We Offer</span>
          <h2 className="font-bold text-3xl text-accent-charcoal">Our Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Mosquito Nets", items: SERVICES.mosquitoNets },
            { title: "Curtains", items: SERVICES.curtains },
            { title: "Blinds", items: SERVICES.blinds },
          ].map((service) => (
            <div
              key={service.title}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4"
            >
              <h3 className="font-bold text-lg text-primary-700 border-b border-gray-100 pb-3">
                {service.title}
              </h3>
              <ul className="space-y-2">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-600 text-sm">
                    <CheckCircle size={14} className="text-primary-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="section-heading">Why Choose Us</span>
          <h2 className="font-bold text-3xl text-accent-charcoal">What Sets Us Apart</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WHY_CHOOSE_US.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 bg-primary-50 p-4 rounded-xl border border-primary-100"
            >
              <CheckCircle size={20} className="text-primary-700 flex-shrink-0" />
              <span className="font-medium text-accent-charcoal text-sm">{item.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Link to="/request-quote" className="btn-primary inline-flex items-center gap-2">
          Get Free Quote <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
};

export default About;
