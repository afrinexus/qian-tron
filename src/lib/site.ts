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
    machines: [
      { code: "EX-220", name: "JCB 220X LC", image: jcb.url, tag: "Civil · 22T",
        specs: [{ k: "22T", v: "Weight" }, { k: "128 kW", v: "Power" }, { k: "1.2 m³", v: "Bucket" }] },
      { code: "EX-380", name: "Hyundai HX380L", image: hyundai.url, tag: "Quarry · 38T",
        specs: [{ k: "38T", v: "Weight" }, { k: "202 kW", v: "Power" }, { k: "1.9 m³", v: "Bucket" }] },
      { code: "EX-950", name: "Cat 395 Mining", image: catBlack.url, tag: "Mining · 95T",
        specs: [{ k: "95T", v: "Weight" }, { k: "404 kW", v: "Power" }, { k: "4.6 m³", v: "Bucket" }] },
    ],
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
    machines: [
      { code: "BD-D6", name: "Cat D6 XE", image: catBlack.url, tag: "Civil · D6",
        specs: [{ k: "23T", v: "Weight" }, { k: "159 kW", v: "Power" }, { k: "3.9 m³", v: "Blade" }] },
      { code: "BD-D8", name: "Komatsu D85EX-18", image: komatsu.url, tag: "Mine road · D8",
        specs: [{ k: "28T", v: "Weight" }, { k: "198 kW", v: "Power" }, { k: "5.9 m³", v: "Blade" }] },
      { code: "BD-D11", name: "Cat D11 Mining", image: factory.url, tag: "Mining · D11",
        specs: [{ k: "104T", v: "Weight" }, { k: "634 kW", v: "Power" }, { k: "34.4 m³", v: "Blade" }] },
    ],
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
    machines: [
      { code: "WL-HL960", name: "Hyundai HL960A", image: hyundai.url, tag: "Yard · 18T",
        specs: [{ k: "18T", v: "Weight" }, { k: "3.4 m³", v: "Bucket" }, { k: "186 kW", v: "Power" }] },
      { code: "WL-L120", name: "Volvo L120H", image: volvo.url, tag: "Quarry · 20T",
        specs: [{ k: "20T", v: "Weight" }, { k: "4.2 m³", v: "Bucket" }, { k: "228 kW", v: "Power" }] },
      { code: "WL-437", name: "JCB 437 HT", image: jcb.url, tag: "Ports · 17T",
        specs: [{ k: "17T", v: "Weight" }, { k: "3.2 m³", v: "Bucket" }, { k: "160 kW", v: "Power" }] },
    ],
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
    machines: [
      { code: "GR-G940", name: "Volvo G940B", image: volvo.url, tag: "Highway · 14ft",
        specs: [{ k: "18T", v: "Weight" }, { k: "14 ft", v: "Blade" }, { k: "186 kW", v: "Power" }] },
      { code: "GR-160M", name: "Cat 160M3 AWD", image: catBlack.url, tag: "Airfield · 16ft",
        specs: [{ k: "21T", v: "Weight" }, { k: "16 ft", v: "Blade" }, { k: "179 kW", v: "Power" }] },
      { code: "GR-GD675", name: "Komatsu GD675-6", image: factory.url, tag: "Mine road · 14ft",
        specs: [{ k: "17T", v: "Weight" }, { k: "14 ft", v: "Blade" }, { k: "165 kW", v: "Power" }] },
    ],
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
    machines: [
      { code: "CR-SD115", name: "Komatsu JV100WA", image: komatsu.url, tag: "Soil · 11T",
        specs: [{ k: "11T", v: "Weight" }, { k: "30 Hz", v: "Vibration" }, { k: "82 kW", v: "Power" }] },
      { code: "CR-DD120", name: "Volvo DD120C", image: volvo.url, tag: "Asphalt · 12T",
        specs: [{ k: "12T", v: "Weight" }, { k: "Tandem", v: "Drum" }, { k: "97 kW", v: "Power" }] },
      { code: "CR-SD26", name: "Cat CS78B", image: factory.url, tag: "Landfill · 26T",
        specs: [{ k: "26T", v: "Weight" }, { k: "Pad", v: "Drum" }, { k: "194 kW", v: "Power" }] },
    ],
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
    machines: [
      { code: "FL-30D", name: "Hyundai 30D-9", image: hyundai.url, tag: "Warehouse · 3T",
        specs: [{ k: "3T", v: "Lift" }, { k: "4.5 m", v: "Mast" }, { k: "Diesel", v: "Fuel" }] },
      { code: "FL-160D", name: "QT Heavy 160D", image: crane.url, tag: "Yard · 16T",
        specs: [{ k: "16T", v: "Lift" }, { k: "6 m", v: "Mast" }, { k: "Diesel", v: "Fuel" }] },
      { code: "FL-450R", name: "Reach Stacker 45T", image: truckBlue.url, tag: "Container · 45T",
        specs: [{ k: "45T", v: "Lift" }, { k: "3-high", v: "Stack" }, { k: "246 kW", v: "Power" }] },
    ],
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
    machines: [
      { code: "PM-FH16", name: "Volvo FH16 700", image: truckBlue.url, tag: "Prime · 6x4",
        specs: [{ k: "700 HP", v: "Power" }, { k: "70T", v: "GCW" }, { k: "Euro V", v: "Emissions" }] },
      { code: "PM-ACT", name: "Mercedes Actros 3363", image: truckRed.url, tag: "Corridor · 6x4",
        specs: [{ k: "630 HP", v: "Power" }, { k: "60T", v: "GCW" }, { k: "PowerShift", v: "Trans" }] },
      { code: "PM-777", name: "Cat 777G Haul", image: catBlack.url, tag: "Mining · 100T",
        specs: [{ k: "100T", v: "Payload" }, { k: "751 kW", v: "Power" }, { k: "Rigid", v: "Chassis" }] },
    ],
  },
];

export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
