import heroBanner from "../assets/images/hero/hero-banner.png";
import heroCurtains from "../assets/images/hero/hero-curtains.png";
import heroBlinds from "../assets/images/hero/hero-blinds.png";
import premiumCurtain from "../assets/images/curtains/premium-curtain.png";
import luxuryCurtain from "../assets/images/curtains/luxury-curtain.png";
import designerCurtain from "../assets/images/curtains/designer-curtain.png";
import customCurtain from "../assets/images/curtains/custom-curtain.png";
import zebraBlind from "../assets/images/blinds/zebra-blind.png";
import rollerBlind from "../assets/images/blinds/roller-blind.png";
import bambooBlind from "../assets/images/blinds/bamboo-blind.png";
import verticalBlind from "../assets/images/blinds/vertical-blind.png";
import fibreMosquitoNet from "../assets/images/mosquito-nets/fibre-mosquito-net.png";
import ssMosquitoNet from "../assets/images/mosquito-nets/ss-mosquito-net.png";
import slidingMosquitoNet from "../assets/images/mosquito-nets/sliding-mosquito-net.png";

export const BUSINESS = {
  name: "BEST HOME DECORS",
  tagline: "Premium Mosquito Nets, Curtains & Blinds",
  location: "Hosur, Tamil Nadu, India",
  email: "besthomedecorshosur@gmail.com",
  phones: ["7810077097"],
  whatsapp: "917810077097",
  address: {
    lines: [
      "Shop No: 86, Alasanatham Road",
      "Masuthi Opposite, Jai Nagar",
      "Hosur - 635109, Tamil Nadu, India",
    ],
    full: "Shop No: 86, Alasanatham Road, Masuthi Opposite, Jai Nagar, Hosur - 635109, Tamil Nadu, India",
  },
  hours: {
    weekdays: "Mon - Sat: 9:00 AM - 7:00 PM",
    sunday: "Sunday: By Appointment",
  },
  social: {
    instagram: "https://instagram.com/besthomedecors",
    facebook: "https://facebook.com/besthomedecors",
    whatsapp: "https://wa.me/917810077097",
  },
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.5!2d77.825!3d12.740!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac5e2e2e2e2e2e%3A0x0!2sJai%20Nagar%2C%20Hosur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
};

export const HERO_FEATURES = [
  "Custom Installation Available",
  "High Quality Materials",
  "Affordable Pricing",
];

export const WHY_CHOOSE_US = [
  { title: "Premium Quality Materials", icon: "quality" },
  { title: "Custom Design Solutions", icon: "design" },
  { title: "Professional Installation", icon: "installation" },
  { title: "Affordable Pricing", icon: "price" },
  { title: "Fast Service", icon: "delivery" },
  { title: "Customer Satisfaction", icon: "support" },
];

export const SERVICES = {
  mosquitoNets: [
    "Fibre Mosquito Net",
    "304 Grade SS Mosquito Net",
    "Sliding Mosquito Net",
  ],
  curtains: ["Custom Curtains", "Window Curtains", "Door Curtains"],
  blinds: [
    "Zebra Blinds",
    "Roller Blinds",
    "PVC Bamboo Blinds",
    "Office Vertical Blinds",
  ],
};

export const GALLERY_IMAGES = [
  {
    id: 1,
    title: "Premium Curtains",
    category: "Curtains",
    src: premiumCurtain,
  },
  {
    id: 2,
    title: "Zebra Blinds",
    category: "Blinds",
    src: zebraBlind,
  },
  {
    id: 3,
    title: "Mosquito Net Installation",
    category: "Mosquito Nets",
    src: fibreMosquitoNet,
  },
  {
    id: 4,
    title: "Window Treatments",
    category: "Curtains",
    src: luxuryCurtain,
  },
  {
    id: 5,
    title: "Office Vertical Blinds",
    category: "Blinds",
    src: verticalBlind,
  },
  {
    id: 6,
    title: "Sliding Mosquito Net",
    category: "Mosquito Nets",
    src: slidingMosquitoNet,
  },
  {
    id: 7,
    title: "Custom Door Curtains",
    category: "Curtains",
    src: customCurtain,
  },
  {
    id: 8,
    title: "Roller Blinds",
    category: "Blinds",
    src: rollerBlind,
  },
  {
    id: 9,
    title: "SS Mosquito Net",
    category: "Mosquito Nets",
    src: ssMosquitoNet,
  },
  {
    id: 10,
    title: "Designer Curtains",
    category: "Curtains",
    src: designerCurtain,
  },
  {
    id: 11,
    title: "PVC Bamboo Blinds",
    category: "Blinds",
    src: bambooBlind,
  },
  {
    id: 12,
    title: "Blinds Showcase",
    category: "Blinds",
    src: heroBlinds,
  },
];

export const HERO_IMAGE = heroBanner;

export const DEFAULT_CATEGORIES = [
  {
    name: "Mosquito Nets",
    description: "Fibre, SS & sliding mosquito net solutions for windows and doors.",
    image: fibreMosquitoNet,
  },
  {
    name: "Curtains",
    description: "Custom, window and door curtains tailored to your space.",
    image: heroCurtains,
  },
  {
    name: "Blinds",
    description: "Zebra, roller, bamboo and office vertical blinds.",
    image: heroBlinds,
  },
];
