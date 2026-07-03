import jcb from "@/assets/jcb.jpg.asset.json";
import factory from "@/assets/factory.jpg.asset.json";
import hyundai from "@/assets/hyundai.jpg.asset.json";
import volvo from "@/assets/volvo.jpg.asset.json";
import komatsu from "@/assets/komatsu.jpg.asset.json";
import crane from "@/assets/crane.jpg.asset.json";
import truckBlue from "@/assets/truck-blue.jpg.asset.json";
import truckRed from "@/assets/truck-red.jpg.asset.json";
import catBlack from "@/assets/cat-black.jpg.asset.json";

export const CONTACT = {
  phone: "+2547-2775-0097",
  phoneHref: "tel:+254772750097",
  email: "info@qiantron.lucene.co",
  emailHref: "mailto:info@qiantron.lucene.co",
  headOffice: "Nairobi · Kenya",
  sourcing: "Global Sourcing · Shanghai · Guangzhou · Rotterdam",
};

export type Machine = {
  code: string;
  name: string;
  image: string;
  tag: string;
  specs: { k: string; v: string }[];
};

export type Category = {
  slug: string;
  name: string;
  ref: string;
  tagline: string;
  hero: string;
  gallery: string[];
  intro: string;
  highlights: { k: string; v: string }[];
  applications: string[];
  machines: Machine[];
};

export const CATEGORIES: Category[] = [
  {
    slug: "excavators",
    name: "Excavators",
    ref: "EX",
    tagline: "Tracked precision for earthworks, mining and civil construction.",
    hero: jcb.url,
    gallery: [jcb.url, hyundai.url, catBlack.url],
    intro:
      "Tier-one tracked excavators sourced globally and commissioned to QianTron standard — from 6-tonne compact utility units to 90-tonne mining-grade machines.",
    highlights: [
      { k: "6–90T", v: "Operating weight range" },
      { k: "OEM", v: "JCB · Hyundai · Cat · Komatsu" },
      { k: "24 mo", v: "Powertrain warranty" },
    ],
    applications: ["Civil earthworks", "Open-pit mining", "Trenching & utilities", "Demolition"],
  },
  {
    slug: "bulldozers",
    name: "Bulldozers",
    ref: "BD",
    tagline: "Push, grade and clear at continental scale.",
    hero: factory.url,
    gallery: [factory.url, komatsu.url, catBlack.url],
    intro:
      "Crawler and wheeled dozers configured for road formation, site prep and mine haul-road maintenance across African terrain.",
    highlights: [
      { k: "D6–D11", v: "Class equivalents" },
      { k: "410 HP", v: "Peak output" },
      { k: "Ripper", v: "Optional 3-shank" },
    ],
    applications: ["Road formation", "Mine haul roads", "Land clearance", "Stockpile management"],
  },
  {
    slug: "wheel-loaders",
    name: "Wheel Loaders",
    ref: "WL",
    tagline: "High-cycle loading built for quarries and logistics yards.",
    hero: hyundai.url,
    gallery: [hyundai.url, volvo.url, jcb.url],
    intro:
      "Articulated wheel loaders selected for bucket-cycle efficiency, tyre longevity and operator comfort on long shifts.",
    highlights: [
      { k: "3–7 m³", v: "Bucket capacity" },
      { k: "Z-bar", v: "Linkage geometry" },
      { k: "20T+", v: "Payload class" },
    ],
    applications: ["Quarry loading", "Bulk material handling", "Ports & logistics", "Recycling"],
  },
  {
    slug: "motor-graders",
    name: "Motor Graders",
    ref: "GR",
    tagline: "Road geometry, held to the millimetre.",
    hero: volvo.url,
    gallery: [volvo.url, catBlack.url, factory.url],
    intro:
      "6WD motor graders for highway construction, precision finishing and continental road maintenance programmes.",
    highlights: [
      { k: "14–16 ft", v: "Moldboard length" },
      { k: "6WD", v: "All-wheel drive" },
      { k: "GPS", v: "Grade control ready" },
    ],
    applications: ["Highway construction", "Road maintenance", "Airfield grading", "Mine road finishing"],
  },
  {
    slug: "compaction-rollers",
    name: "Compaction Rollers",
    ref: "CR",
    tagline: "Density guaranteed. Vibration engineered.",
    hero: komatsu.url,
    gallery: [komatsu.url, volvo.url, factory.url],
    intro:
      "Single-drum and tandem compactors calibrated for asphalt, soil and sub-base applications across infrastructure programmes.",
    highlights: [
      { k: "8–26T", v: "Static weight" },
      { k: "Amp/Freq", v: "Adjustable vibration" },
      { k: "Water", v: "1200L sprinkler" },
    ],
    applications: ["Asphalt paving", "Sub-base compaction", "Landfill", "Airport works"],
  },
  {
    slug: "industrial-forklifts",
    name: "Industrial Forklifts",
    ref: "FL",
    tagline: "Warehousing muscle. Port-yard reach.",
    hero: crane.url,
    gallery: [crane.url, hyundai.url, truckBlue.url],
    intro:
      "Diesel, LPG and container-handling forklifts for warehouses, freight yards and industrial operations.",
    highlights: [
      { k: "3–45T", v: "Lift capacity" },
      { k: "Reach", v: "Container spec" },
      { k: "Cab", v: "Climate controlled" },
    ],
    applications: ["Warehousing", "Container yards", "Manufacturing", "Cold chain"],
  },
  {
    slug: "prime-movers",
    name: "Prime Movers & Heavy Trucks",
    ref: "PM",
    tagline: "Continental haulage, engineered for uptime.",
    hero: truckBlue.url,
    gallery: [truckBlue.url, truckRed.url, catBlack.url],
    intro:
      "Prime movers, tippers and low-loaders sourced for African corridor operators — engineered cabins, rebuilt drivetrains, warranty-backed powertrains.",
    highlights: [
      { k: "600+ HP", v: "Prime mover class" },
      { k: "70T", v: "GCW capacity" },
      { k: "Euro V", v: "Emissions ready" },
    ],
    applications: ["Long-haul freight", "Bulk mining logistics", "Container drayage", "Abnormal loads"],
  },
];

export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
