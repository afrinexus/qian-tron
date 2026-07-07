import jcbAsset from "@/assets/jcb.jpg.asset.json";
import komatsuAsset from "@/assets/komatsu.jpg.asset.json";
import craneAsset from "@/assets/crane.jpg.asset.json";
import volvoAsset from "@/assets/volvo.jpg.asset.json";
import catBlackAsset from "@/assets/cat-black.jpg.asset.json";
import truckBlueAsset from "@/assets/truck-blue.jpg.asset.json";
import { toAbsoluteUrl } from "@/lib/site";

export type Industry = {
  slug: string;
  index: string;      // "01" .. "06"
  name: string;
  tagline: string;
  hero: string;
  intro: string;
  headline: string;
  applications: string[];
  metrics: { k: string; v: string }[];
  machineryCategories: string[]; // slugs into CATEGORIES
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "construction",
    index: "01",
    name: "Construction",
    tagline: "Civil earthworks, urban builds, continental infrastructure.",
    hero: toAbsoluteUrl(jcbAsset.url),
    headline: "Building sites, held to programme.",
    intro:
      "From central-business-district builds to intercity highway packages, QianTron supplies the excavation, grading and haulage fleets that keep continental construction on schedule.",
    applications: [
      "Foundations & basement excavation",
      "Highway & bypass earthworks",
      "Urban regeneration & demolition",
      "Bulk material handling on-site",
    ],
    metrics: [
      { k: "22–95T", v: "Excavator class" },
      { k: "D6–D11", v: "Dozer equivalents" },
      { k: "24 mo", v: "Powertrain warranty" },
    ],
    machineryCategories: ["excavators", "wheel-loaders", "bulldozers"],
  },
  {
    slug: "mining",
    index: "02",
    name: "Mining",
    tagline: "Open-pit, quarry and mineral logistics — engineered for uptime.",
    hero: toAbsoluteUrl(komatsuAsset.url),
    headline: "Mine-grade fleets, warranty-backed.",
    intro:
      "Mining programmes across East and Southern Africa run on QianTron-sourced haul trucks, mining excavators and haul-road maintenance dozers — commissioned to OEM standard and supported end-to-end.",
    applications: [
      "Open-pit extraction",
      "Overburden removal",
      "Haul road formation & maintenance",
      "Ore handling & stockpile management",
    ],
    metrics: [
      { k: "100T+", v: "Haul truck payload" },
      { k: "95T", v: "Mining excavator class" },
      { k: "24/7", v: "Uptime desk" },
    ],
    machineryCategories: ["excavators", "bulldozers", "prime-movers"],
  },
  {
    slug: "infrastructure",
    index: "03",
    name: "Infrastructure",
    tagline: "Ports, rail, energy corridors and airfield programmes.",
    hero: toAbsoluteUrl(craneAsset.url),
    headline: "Nation-scale programmes, delivered.",
    intro:
      "QianTron equips airfield expansions, rail formation packages and port infrastructure works with graders, compactors and container-handling equipment sized for continental capacity.",
    applications: [
      "Airfield grading & sub-base works",
      "Rail formation & ballast handling",
      "Port terminal expansion",
      "Energy corridor construction",
    ],
    metrics: [
      { k: "6WD", v: "Grader drivelines" },
      { k: "26T", v: "Compaction class" },
      { k: "GPS", v: "Grade-control ready" },
    ],
    machineryCategories: ["motor-graders", "compaction-rollers", "industrial-forklifts"],
  },
  {
    slug: "agriculture",
    index: "04",
    name: "Agriculture",
    tagline: "Estate development, irrigation earthworks, agro-logistics.",
    hero: toAbsoluteUrl(volvoAsset.url),
    headline: "From land clearance to farm-to-port.",
    intro:
      "Commercial estates and agro-industrial programmes rely on QianTron for clearing fleets, irrigation trenching equipment and yard-loader fleets that keep produce moving.",
    applications: [
      "Estate clearance & land preparation",
      "Irrigation dam & canal excavation",
      "Farm-road formation",
      "Bulk grain and produce loading",
    ],
    metrics: [
      { k: "3–7 m³", v: "Loader buckets" },
      { k: "22T", v: "Utility excavators" },
      { k: "6x4", v: "Prime mover class" },
    ],
    machineryCategories: ["wheel-loaders", "excavators", "prime-movers"],
  },
  {
    slug: "government",
    index: "05",
    name: "Government",
    tagline: "State agencies, defence logistics, public works.",
    hero: toAbsoluteUrl(catBlackAsset.url),
    headline: "Public programmes, procured with discipline.",
    intro:
      "Ministries of works, defence logistics arms and public infrastructure agencies partner with QianTron for transparent sourcing, tender-grade documentation and delivered-to-yard commissioning.",
    applications: [
      "Public roads authority fleets",
      "Defence logistics & mobility",
      "Emergency & disaster response",
      "Municipal works & waste handling",
    ],
    metrics: [
      { k: "Tender", v: "Grade documentation" },
      { k: "18", v: "Countries served" },
      { k: "Bond", v: "Transit-cleared" },
    ],
    machineryCategories: ["motor-graders", "bulldozers", "prime-movers"],
  },
  {
    slug: "logistics",
    index: "06",
    name: "Logistics",
    tagline: "Corridor haulage, container drayage, industrial yards.",
    hero: toAbsoluteUrl(truckBlueAsset.url),
    headline: "Continental corridors, kept moving.",
    intro:
      "Logistics operators along the Northern, Central and Southern corridors run QianTron prime movers, reach stackers and industrial forklifts — sourced for uptime, engineered for African duty cycles.",
    applications: [
      "Long-haul corridor freight",
      "Container drayage & port yards",
      "Bonded warehousing operations",
      "Abnormal-load & project cargo",
    ],
    metrics: [
      { k: "700 HP", v: "Prime mover class" },
      { k: "45T", v: "Reach stacker capacity" },
      { k: "Euro V", v: "Emissions ready" },
    ],
    machineryCategories: ["prime-movers", "industrial-forklifts", "wheel-loaders"],
  },
];

export const industryBySlug = (slug: string) => INDUSTRIES.find((i) => i.slug === slug);
