"use client";
import { useState } from "react";
import { HandDrawnCard, HandDrawnButton } from "@/components/ui";
import { tokens } from "@/lib/design";

const palette = {
  bg: tokens.colors.background,
  card: tokens.colors.paper,
  cardBorder: tokens.colors.border,
  accent: tokens.colors.accent,
  accentSoft: "#ff4d4d22",
  green: tokens.colors.secondary,
  greenSoft: "#2d5da122",
  blue: "#58a6ff",
  blueSoft: "#58a6ff22",
  red: "#f85149",
  redSoft: "#f8514922",
  purple: "#bc8cff",
  purpleSoft: "#bc8cff22",
  text: tokens.colors.foreground,
  textMuted: "#666666",
  textDim: "#7a7a7a",
};

const companies = [
  {
    id: "afimilk",
    name: "Afimilk",
    tagline: "Automating Dairy Farms",
    color: "#f0a500",
    founded: "1977",
    hq: "Israel",
    target: "Large-scale dairy operations, mega farms",
    tier: "Enterprise",
    products: [
      { name: "AfiCollar", category: "Sensor", desc: "Neck collar tracking rumination, heat detection, feed efficiency, and activity 24/7" },
      { name: "AfiAct III", category: "Sensor", desc: "Leg pedometer monitoring heat, calving prediction, rest time and welfare scoring" },
      { name: "AfiSort/AfiWeigh", category: "Hardware", desc: "Automated cow sorting and weighing without disrupting cow flow in the parlor" },
      { name: "AfiLab", category: "Analyzer", desc: "Inline milk component analysis (fat, protein, lactose, SCC, blood) at every milking" },
      { name: "AfiFarm", category: "Software", desc: "Central herd management platform aggregating all sensor data with decision support" },
      { name: "AfiFeed", category: "Automation", desc: "Individualized feeding system adjusting TMR for each cow's nutritional needs" },
      { name: "Afi2Go Prime", category: "Mobile", desc: "Mobile app for on-the-go herd alerts, tasks, and cow history" },
      { name: "AfiFarm Spark", category: "Analytics", desc: "Simplified analytics dashboard turning data into profitable decisions in fewer clicks" },
      { name: "Synergy", category: "Robotics", desc: "Robotic milking system that integrates into existing parlor infrastructure" },
      { name: "Feed Efficiency Service", category: "Service", desc: "Individual cow DMI (dry matter intake) measurement to identify feed conversion outliers" },
    ],
    uniqueFeatures: [
      "AfiLab inline milk chemistry analysis per individual cow per milking session",
      "Individual cow dry matter intake (DMI) feed efficiency scoring",
      "Robotic milking (Synergy) retrofitted into existing parlors — no full rebuild needed",
      "AfiSort automated drafting gates connected to real-time sensor alerts",
      "50 years of data and algo refinement — largest proprietary dairy dataset",
    ],
    tradeoffs: [
      { feature: "No real-time body temperature sensor", why: "Hardware cost & reliability tradeoff. AfiCollar uses behavioral proxies (rumination drop, activity change) instead of direct temp — reduces sensor failure points and cost-per-unit for large herds." },
      { feature: "Limited predictive AI / ML explanations surfaced to farmer", why: "Enterprise B2B sales model — insights are delivered through dealer/consultant layer, not self-serve. Keeps farmers dependent on Afimilk service network (lock-in strategy)." },
      { feature: "No virtual fencing or pasture management", why: "Deliberate focus on parlor-centric dairy. Expanding to pasture would require cellular infrastructure investment and a new hardware line — cannibalizes existing partners." },
      { feature: "Mobile app is secondary, not primary UX", why: "Core persona is farm manager/vet at desktop. Mobile is companion, not driver — reduces engineering complexity but limits appeal to younger, mobile-first operators." },
    ],
    benefits: ["Reduce labour by automating milking and drafting", "Maximize milk yield per cow with component-level analysis", "Early disease detection reducing vet bills", "Scalable from 500 to 50,000 cow operations"],
    mvp: "AfiAct III leg sensor + AfiFarm software — provides heat detection and health monitoring at low entry cost, then upsell to AfiCollar, AfiLab, and AfiFeed progressively.",
  },
  {
    id: "cowmanager",
    name: "CowManager",
    tagline: "Ahead of the Herd Together",
    color: "#3fb950",
    founded: "2008",
    hq: "Netherlands",
    target: "Mid-to-large dairy farms, progressive family operations",
    tier: "Mid-Market",
    products: [
      { name: "Ear Sensor (SenseHub)", category: "Sensor", desc: "Lifetime ear sensor measuring ear temperature, eating, rumination, and activity — a single device from calf to cow" },
      { name: "Health Module", category: "Software", desc: "Early illness alerts up to 3 days before clinical signs appear, with recovery monitoring" },
      { name: "Fertility Module", category: "Software", desc: "Precise heat detection and insemination timing with pregnancy confirmation indicators" },
      { name: "Transition Module", category: "Software", desc: "Monitors fresh cows in the critical 3-week window post-calving for metabolic issues" },
      { name: "Nutrition Module", category: "Software", desc: "Feed management insights detecting heat stress and suboptimal eating patterns" },
      { name: "Youngstock Module", category: "Software", desc: "Calf health monitoring from birth — ear temp + activity to catch scours and pneumonia early" },
      { name: "Find My Cow", category: "Tool", desc: "Locate specific animal quickly within the herd using sensor signal" },
      { name: "Auto Drafting", category: "Hardware", desc: "Automated gate sorting triggered by sensor-based alerts" },
      { name: "MultiView", category: "Software", desc: "Monitor multiple farms from a single dashboard — for consultants and large operators" },
    ],
    uniqueFeatures: [
      "Lifetime single ear sensor — same device used from calf to end of productive life",
      "Ear temperature as a direct health proxy — more sensitive than leg or neck sensors alone",
      "Youngstock module monitoring calves from birth (competitors focus only on adult cows)",
      "3-day advance health alert before any visible clinical symptoms",
      "MultiView multi-farm dashboard — targets veterinary consultants and farm advisors as a channel",
    ],
    tradeoffs: [
      { feature: "No milk production data integration natively", why: "Strategic separation — CowManager is a monitoring platform, not a milk parlor system. Integrating milking data would require competing with Afimilk/DeLaval, their distribution partners." },
      { feature: "No robotic milking or physical automation", why: "Pure software/sensor play. Hardware manufacturing is capital-intensive. They chose a deep integration partner model instead." },
      { feature: "Pricing is opaque / quote-based for most tiers", why: "Dealer-led sales model. Prevents price comparison shopping and maintains dealer margin. Disadvantage for digital-first buyers who want self-serve." },
      { feature: "GPS location not included", why: "Ear sensors use short-range RF to hub, not GPS. Adding GPS would increase power draw, requiring battery changes more frequently — reducing farmer convenience." },
    ],
    benefits: ["Never miss a heat cycle — directly increases conception rates", "Catch disease before it spreads in the herd", "Reduce antibiotic use with earlier, targeted interventions", "Single sensor works from calf to retirement — no re-investment"],
    mvp: "Health + Fertility modules on the ear sensor. Immediate ROI visible within first breeding cycle. Transition and Youngstock added in year 2 once adoption is established.",
  },
  {
    id: "moocall",
    name: "Moocall",
    tagline: "Smart Livestock Solutions",
    color: "#58a6ff",
    founded: "2014",
    hq: "Ireland",
    target: "Small-to-medium beef and dairy farms, part-time farmers, remote operations",
    tier: "SMB / Entry-level",
    products: [
      { name: "Calving Sensor", category: "Sensor", desc: "Tail-mounted device collecting ~600 data points/sec detecting contraction patterns, sends SMS 1-2 hrs before calving" },
      { name: "HEAT (Bull Activity Monitor)", category: "Sensor", desc: "Bull-mounted sensor counting mounts to detect which cows are in heat for AI breeding timing" },
      { name: "Breed Manager App", category: "Software", desc: "Free herd management app for tracking calving records, health notes, and device management" },
      { name: "MyMoocall Dashboard", category: "Software", desc: "Web dashboard for battery status, alert history, and phone number management" },
    ],
    uniqueFeatures: [
      "No WiFi or farm network needed — built-in GSM SIM (Vodafone network)",
      "95% accuracy calving prediction — 1 hour advance warning via SMS to 2 phones",
      "Tail-movement algorithm detecting contraction-specific motion patterns (600 data points/sec)",
      "Off-tail notification if device falls off — prevents silent monitoring gaps",
      "One sensor covers 30-50 cows per calving season — ultra-low cost per head",
      "Bull-mounted HEAT sensor for natural service herds — detects estrus without ear tags",
    ],
    tradeoffs: [
      { feature: "Single-purpose device — calving only (core product)", why: "Deliberate focus. Moocall's brand equity is 'calving sensor.' Expanding too early dilutes the value prop and increases support complexity for a small team." },
      { feature: "No continuous health monitoring", why: "Tail sensor is event-triggered, not continuous. Continuous monitoring would require a different hardware design and cloud infrastructure investment well beyond their current scale." },
      { feature: "Annual software subscription required after year 1", why: "Revenue sustainability model for a bootstrapped/small company. The hardware-only model doesn't generate recurring revenue. Creates churn risk but necessary." },
      { feature: "Limited integrations with farm management software", why: "Small engineering team. Open API development is resource-heavy. Chose to keep the product tight rather than build an integration ecosystem." },
    ],
    benefits: ["Reduce calf mortality by up to 50% from difficult calvings", "Eliminate overnight barn checks — sleep without missing a birth", "Zero infrastructure setup — works in remote fields immediately", "Under $8/day per cow — lowest TCO in the category"],
    mvp: "Single calving sensor + SMS alerts. Literally the whole product in its simplest form. No farm network, no hub, no software setup. Plug and play — highest adoption rate because friction is near zero.",
  },
  {
    id: "herddogg",
    name: "HerdDogg",
    tagline: "The Brighter Way to Check Your Cattle",
    color: "#bc8cff",
    founded: "2017",
    hq: "Nebraska, USA",
    target: "Beef and dairy cattle operations in North America, sustainability-focused ranchers",
    tier: "SMB / Growth",
    products: [
      { name: "Smart Ear Tag", category: "Sensor", desc: "Bluetooth-enabled ear tag measuring movement and temperature, 480 readings/day with flashing LED for visual identification" },
      { name: "DoggHouse", category: "Hardware", desc: "Solar-powered LoRa transmitter units placed around the farm that collect data from ear tags" },
      { name: "AI Health Alerts", category: "Software", desc: "AI algorithm establishes individual herd baseline then flags anomalies for early disease intervention" },
      { name: "Estrus/Heat Detection", category: "Software", desc: "480 readings/day estrus cycle tracking with pregnancy indicator signals" },
      { name: "Daily Pull Lists", category: "Software", desc: "Automated daily list of animals requiring attention — fed to farm workers each morning" },
      { name: "LED Flash Sorting", category: "Hardware", desc: "App-triggered LED flash on specific ear tags to visually identify animals for round-up without reading tag numbers" },
    ],
    uniqueFeatures: [
      "LED flashing on individual ear tags — revolutionary visual identification in a herd without reading numbers",
      "Solar-powered DoggHouse transmitters — zero grid electricity needed, truly off-grid capable",
      "AI builds individual baseline per animal from day 3 — not comparing to breed averages but to individual normal",
      "Under $0.08/cow/day pricing — aggressive commoditization play",
      "Mission-driven: target 50% reduction in antibiotic use as explicit product KPI",
      "3-day setup-to-first-alert timeframe — fastest time-to-value in this list",
    ],
    tradeoffs: [
      { feature: "Bluetooth range limitation via DoggHouse hubs", why: "Bluetooth is cheaper and lower power than cellular per tag. But hub placement becomes critical — gaps in coverage create monitoring blind spots. Deliberate cost vs. coverage tradeoff." },
      { feature: "No milk production monitoring or parlor integration", why: "Beef-first product with dairy crossover. Parlor integration requires partnerships with milking machine manufacturers — complex and expensive at HerdDogg's scale." },
      { feature: "Limited reporting/analytics depth vs. Afimilk/CowManager", why: "SMB market prioritizes simplicity over depth. Pull lists and alerts are the 80% use case. Deep analytics require a data science team and farm data maturity that SMB customers don't have." },
      { feature: "Breed Manager app is basic — no LIMS integration", why: "Keeping scope narrow to maintain fast development cycles. Integration complexity would slow product velocity at a startup stage." },
    ],
    benefits: ["Catch illness before symptoms — reduce vet bills and antibiotic costs", "Never miss a heat — maximize breeding ROI", "LED flash eliminates hours of manual animal searching", "Halve antibiotic costs through targeted early treatment vs. prophylactic dosing"],
    mvp: "Smart ear tags + DoggHouse solar units + AI health alerts app. Health monitoring is the entry use case. Estrus tracking is an upsell once health ROI is demonstrated in the first 60 days.",
  },
  {
    id: "smartpaddock",
    name: "Smart Paddock",
    tagline: "Protecting Against Theft, Strays & Distress",
    color: "#f85149",
    founded: "2019",
    hq: "Australia",
    target: "Extensive grazing operations, beef cattle, sheep, goat farmers — remote/large acreage",
    tier: "SMB / Niche",
    products: [
      { name: "Bluebell GPS SmartTag", category: "Sensor", desc: "GPS ear tag providing real-time location of individual animals on a map" },
      { name: "SmartFence", category: "Sensor", desc: "Electric fence monitoring sensor — alerts when fence is down or cut" },
      { name: "SmartTrack", category: "Hardware", desc: "Asset tracker for vehicles, equipment, and non-tagged animals" },
      { name: "SmartWater", category: "Sensor", desc: "Water trough level monitor — alerts when water runs low or troughs malfunction" },
      { name: "Pulse Dashboard", category: "Software", desc: "Central analytics platform translating all sensor data into actionable farm insights with team alert routing" },
      { name: "Network Gateway (LoRaWAN)", category: "Infrastructure", desc: "LoRaWAN gateway providing long-range, low-power connectivity across large paddocks" },
      { name: "Solar Gateway Kit", category: "Infrastructure", desc: "Solar-powered gateway for off-grid remote paddock connectivity" },
    ],
    uniqueFeatures: [
      "SmartFence — electric fence breach detection, unique in this category",
      "SmartWater — water trough monitoring, critical for extensive grazing operations in drought-prone regions",
      "Full farm IoT ecosystem: animals + fences + water + assets on one dashboard",
      "LoRaWAN infrastructure layer — proprietary network coverage kit for remote areas with no cellular",
      "Theft/stray alert system — GPS geofencing with escape/intrusion notifications",
      "Designed for extensive grazing at scale (thousands of acres), not parlor/barn-centric",
    ],
    tradeoffs: [
      { feature: "No health monitoring (temperature, rumination)", why: "Hardware complexity and battery life tradeoff. Adding biometric sensors to a GPS tag significantly increases power draw, reducing GPS ping frequency. Chose location precision over health data." },
      { feature: "No estrus/fertility detection", why: "Target market is beef cattle/extensive grazing where natural service bulls are dominant. Fertility tech ROI is higher in dairy — not the primary buyer segment." },
      { feature: "LoRaWAN requires gateway infrastructure investment upfront", why: "No cellular per-tag subscription keeps ongoing costs low. But upfront gateway cost is a barrier. Deliberate hardware revenue model vs. SaaS-only." },
      { feature: "GPS ping intervals limited by battery", why: "Real-time GPS would drain batteries in hours. Interval pinging (every 10-30 min) is the practical compromise. Not suitable for high-frequency movement analysis." },
    ],
    benefits: ["Prevent cattle theft — GPS geofencing and instant escape alerts", "Eliminate manual water runs — automated trough monitoring", "Find lost or strayed animals without mustering the whole herd", "Monitor fence integrity without physical inspection of thousands of meters"],
    mvp: "Bluebell GPS SmartTag + Pulse Dashboard + SmartFence sensor. These three together address the top 3 pain points for extensive graziers: theft, strays, and fence failures.",
  },
  {
    id: "nofence",
    name: "Nofence",
    tagline: "Virtual Fencing for Cattle, Sheep & Goats",
    color: "#f0a500",
    founded: "2011",
    hq: "Norway",
    target: "Beef cattle, sheep, goat producers — rotational/regenerative graziers, conservation graziers",
    tier: "Mid-Market / Innovation",
    products: [
      { name: "Cattle Collar (Virtual Fence)", category: "Hardware", desc: "GPS+cellular collar that delivers audio warning then mild electric pulse when animal approaches virtual boundary" },
      { name: "Sheep/Goat Collar", category: "Hardware", desc: "Smaller version of virtual fence collar adapted for small ruminants" },
      { name: "Nofence App", category: "Software", desc: "Mobile app to draw, move, and manage virtual fence boundaries in real-time from any location" },
      { name: "Account Pages", category: "Software", desc: "Web dashboard for herd analytics, grazing pattern history, animal health flags, and multi-farm management" },
      { name: "Grazing Pattern Analytics", category: "Software", desc: "Heatmaps and historical tracking of where animals graze — enables rotational grazing optimization" },
      { name: "Animal Health Monitoring", category: "Software", desc: "Activity-based health alerts derived from GPS movement anomalies" },
    ],
    uniqueFeatures: [
      "Virtual fencing — draw boundaries on a phone, no physical wire needed",
      "Move grazing boundaries from anywhere in the world via smartphone",
      "Strip grazing, rotational grazing, and contract grazing enabled without physical labor",
      "Cellular (not LoRa) — works anywhere with mobile coverage, no farm infrastructure setup",
      "Grazing heatmaps showing historical pasture utilization patterns",
      "Audio warning before electric pulse — animals learn boundary through sound conditioning",
      "Works across cattle, sheep, AND goats — broadest species coverage in this list",
    ],
    tradeoffs: [
      { feature: "Cellular subscription per collar = highest ongoing cost", why: "Every collar needs its own cellular data. This is the fundamental tradeoff of infrastructure-free convenience. Cost scales linearly with herd size — expensive at scale but zero setup cost." },
      { feature: "Requires cellular coverage — doesn't work in dead zones", why: "The infrastructure-free value proposition breaks down without connectivity. Competitors using LoRa gateways can cover remote areas Nofence cannot." },
      { feature: "No milk production or reproductive monitoring", why: "Nofence is a land management tool, not a cow health tool. Expanding into health monitoring would require partnering with ear/neck sensor makers — a different go-to-market motion." },
      { feature: "Electric pulse animal welfare debate limits enterprise sales", why: "Some large corporate farms and ESG-focused buyers have welfare policies against pulse devices. Nofence is navigating this by emphasizing the audio-first warning system." },
      { feature: "Battery needs regular charging (not solar)", why: "Solar collar would be too large and heavy for cattle comfort. Charging intervals require periodic handling — creates friction for extensive operations with semi-wild cattle." },
    ],
    benefits: ["Eliminate cost and labor of physical fencing — saves thousands per km", "Enable rotational grazing without moving physical infrastructure", "Protect sensitive areas (waterways, crops) with instant boundary changes", "Manage grazing from anywhere — no need to physically be on the farm"],
    mvp: "Cattle collar + Nofence app + basic virtual boundary. First paddock rotation demonstrated in week 1. ROI shown by eliminating one fence repair or contractor day.",
  },
];

const prdRequirements = [
  {
    category: "Core Animal Monitoring",
    priority: "P0 — Must Have",
    color: "#f85149",
    items: [
      "Individual animal identification (EID / RFID integration)",
      "Real-time activity and movement tracking (accelerometer-based)",
      "Temperature monitoring (ear, vaginal, or behavioral proxy)",
      "Rumination time tracking per animal per day",
      "Abnormality alert engine with configurable thresholds",
    ],
  },
  {
    category: "Reproductive Management",
    priority: "P0 — Must Have",
    color: "#f85149",
    items: [
      "Heat/estrus detection with timing confidence score",
      "Insemination record logging and conception tracking",
      "Pregnancy detection indicator (behavior change post-conception)",
      "Calving prediction with 1-2 hour advance SMS/push alert",
      "Calving history and breeding record database per cow",
    ],
  },
  {
    category: "Health Management",
    priority: "P1 — Should Have",
    color: "#f0a500",
    items: [
      "Pre-clinical illness detection 24-72 hours before symptoms",
      "Individual health baseline per animal (not breed average)",
      "Automated daily pull/attention list for farm workers",
      "Treatment record logging with withdrawal period tracking",
      "Recovery monitoring post-treatment",
    ],
  },
  {
    category: "Farm Infrastructure",
    priority: "P1 — Should Have",
    color: "#f0a500",
    items: [
      "Water trough level monitoring with low-water alerts",
      "Electric fence integrity monitoring with breach alerts",
      "Asset tracking for vehicles and equipment",
      "GPS-based geofencing with escape/intrusion alerts",
      "Solar-powered off-grid connectivity option",
    ],
  },
  {
    category: "Data & Analytics",
    priority: "P2 — Nice to Have",
    color: "#58a6ff",
    items: [
      "Herd-level trend dashboards (health, fertility, production)",
      "Individual cow lifetime performance records",
      "Feed efficiency (DMI) per cow correlated to production",
      "Grazing pattern heatmaps and pasture utilization analytics",
      "Benchmarking against anonymized industry averages",
    ],
  },
  {
    category: "Integration & Platform",
    priority: "P2 — Nice to Have",
    color: "#58a6ff",
    items: [
      "Open API for third-party farm management software (ERP, milk recording)",
      "Multi-farm / multi-user management with role-based access",
      "Integration with parlor management systems (DeLaval, GEA, Lely)",
      "Veterinary advisor portal with remote herd view",
      "Export to government/subsidy reporting formats",
    ],
  },
];

const mvpRoadmap = [
  {
    phase: "Phase 1 — Day 1 MVP",
    timeline: "Weeks 1–4",
    color: "#3fb950",
    goal: "Get sensor on cow, first alert delivered. Zero friction onboarding.",
    features: [
      "Ear tag or collar sensor shipped pre-activated",
      "SMS/push alert for heat detection or health anomaly",
      "Basic mobile app: alert inbox + cow profile",
      "Auto-baseline building from day 3 of tag-on",
      "Off-device notification (tag removal alert)",
    ],
    rationale: "The first 'wow' moment must happen within 72 hours of setup. If a farmer misses a heat cycle they would have caught manually, they churn. Early win = lifetime customer.",
  },
  {
    phase: "Phase 2 — Stickiness",
    timeline: "Months 1–3",
    color: "#f0a500",
    goal: "Daily habit formation. Product becomes part of morning routine.",
    features: [
      "Daily pull list pushed to farmer's phone at 6am",
      "Calving prediction module (if applicable)",
      "Treatment & breeding record logging",
      "Weekly herd health summary report",
      "Water and fence sensor add-ons available",
    ],
    rationale: "A daily pull list creates a ritual. Farmers who check the app every morning never leave. This is the anti-churn phase — every feature should reduce the number of things they forget.",
  },
  {
    phase: "Phase 3 — Expansion",
    timeline: "Months 3–12",
    color: "#58a6ff",
    goal: "Deepen ROI proof. Begin upselling and multi-module adoption.",
    features: [
      "Milk production correlation analytics",
      "Feed efficiency scoring per cow",
      "Multi-farm dashboard (for advisors/consultants)",
      "Automated drafting gate integration",
      "Third-party farm software API / integrations",
    ],
    rationale: "Once the farmer has 90 days of data, show them what it's worth. ROI dashboards that say 'you saved 3 vet visits = $X' are the most powerful upsell tools in this category.",
  },
];

const tradeoffSummary = [
  { dimension: "Health Depth vs. Hardware Cost", winner: "CowManager", reason: "Ear temp + rumination gives most medically useful signal without going to implantable/invasive sensors" },
  { dimension: "Setup Friction vs. Coverage", winner: "Moocall", reason: "GSM built-in = zero infrastructure. Lowest setup friction of any product in the list" },
  { dimension: "Land Management vs. Animal Biology", winner: "Nofence + Smart Paddock", reason: "Nofence owns virtual fencing; Smart Paddock owns farm asset IoT. Neither competes with health monitors" },
  { dimension: "Enterprise Scale vs. SMB Access", winner: "Afimilk (enterprise) / HerdDogg (SMB)", reason: "Afimilk goes deep on mega-farms; HerdDogg democratizes the same outcome at <$0.08/cow/day" },
  { dimension: "Recurring Revenue vs. Upfront Hardware", winner: "Nofence", reason: "Per-collar cellular subscription = most predictable MRR but highest churn risk at scale" },
  { dimension: "Breadth vs. Focus", winner: "Smart Paddock", reason: "Only company monitoring animals + fences + water + assets as an integrated farm IoT platform" },
];

export default function LivestockTechStack() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const tabs = [
    { id: "overview", label: "Company Matrix" },
    { id: "features", label: "Feature Deep Dive" },
    { id: "prd", label: "PRD Requirements" },
    { id: "tradeoffs", label: "Tradeoff Analysis" },
    { id: "mvp", label: "MVP Roadmap" },
  ];

  return (
    <div style={{ background: palette.bg, minHeight: "100vh", fontFamily: "var(--font-patrick)", color: palette.text, padding: "0" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)", borderBottom: `1px solid ${palette.cardBorder}`, padding: "32px 24px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: palette.accent, boxShadow: `0 0 12px ${palette.accent}` }} />
            <span style={{ color: palette.textMuted, fontSize: 11, letterSpacing: 3, textTransform: "uppercase" }}>Competitive Intelligence Report</span>
          </div>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 800, margin: "0 0 8px", letterSpacing: -1, lineHeight: 1.2 }}>
            🐄 Livestock Tech Stack
            <span style={{ color: palette.accent }}> — Market Analysis</span>
          </h1>
          <p style={{ color: palette.textMuted, fontSize: 13, margin: "0 0 28px", maxWidth: 600 }}>
            Product, feature, PRD, tradeoff & MVP analysis across 6 AgTech platforms: Afimilk · CowManager · Moocall · HerdDogg · Smart Paddock · Nofence
          </p>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 0, overflowX: "auto", paddingBottom: 0 }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "10px 18px",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === tab.id ? `2px solid ${palette.accent}` : "2px solid transparent",
                  color: activeTab === tab.id ? palette.text : palette.textMuted,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                  fontWeight: activeTab === tab.id ? 700 : 400,
                  transition: "all 0.15s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px" }}>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
              {companies.map(co => (
                <HandDrawnCard
                  key={co.id}
                  onClick={() => { setSelectedCompany(selectedCompany === co.id ? null : co.id); setActiveTab("features"); }}
                  style={{
                    padding: 20,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    borderTop: `3px solid ${co.color}`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: co.color }}>{co.name}</div>
                      <div style={{ fontSize: 11, color: palette.textMuted, marginTop: 2 }}>{co.tagline}</div>
                    </div>
                    <span style={{ background: co.color + "22", color: co.color, fontSize: 10, padding: "3px 8px", borderRadius: 20, fontWeight: 700, letterSpacing: 1 }}>
                      {co.tier}
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                    {[
                      ["Founded", co.founded],
                      ["HQ", co.hq],
                      ["Products", co.products.length],
                      ["Target", co.target.split(",")[0]],
                    ].map(([k, v]) => (
                      <div key={k} style={{ background: palette.bg, borderRadius: 6, padding: "6px 10px" }}>
                        <div style={{ fontSize: 9, color: palette.textDim, letterSpacing: 1, textTransform: "uppercase" }}>{k}</div>
                        <div style={{ fontSize: 12, color: palette.text, fontWeight: 600 }}>{v}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 10, color: palette.textDim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Key Differentiators</div>
                    {co.uniqueFeatures.slice(0, 2).map((f, i) => (
                      <div key={i} style={{ fontSize: 11, color: palette.textMuted, padding: "3px 0", borderBottom: `1px solid ${palette.cardBorder}`, display: "flex", gap: 6 }}>
                        <span style={{ color: co.color }}>›</span> {f}
                      </div>
                    ))}
                  </div>

                  <div style={{ fontSize: 11, color: co.color, fontWeight: 700 }}>
                    MVP → {co.mvp.split(".")[0]}.
                  </div>
                </HandDrawnCard>
              ))}
            </div>

            {/* Summary comparison table */}
            <div style={{ marginTop: 32, background: palette.card, border: `1px solid ${palette.cardBorder}`, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: `1px solid ${palette.cardBorder}`, fontSize: 13, fontWeight: 700, color: palette.textMuted, letterSpacing: 2, textTransform: "uppercase" }}>
                Feature Coverage Matrix
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead>
                    <tr style={{ background: palette.bg }}>
                      <th style={{ padding: "10px 16px", textAlign: "left", color: palette.textMuted, fontWeight: 600 }}>Feature</th>
                      {companies.map(co => (
                        <th key={co.id} style={{ padding: "10px 12px", textAlign: "center", color: co.color, fontWeight: 700, whiteSpace: "nowrap" }}>{co.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {([
                      ["Health Monitoring", [1,1,0,1,0,0]],
                      ["Heat/Estrus Detection", [1,1,1,1,0,0]],
                      ["Calving Prediction", [1,1,1,0,0,0]],
                      ["Milk Analysis", [1,0,0,0,0,0]],
                      ["GPS Tracking", [0,0,0,0,1,1]],
                      ["Virtual Fencing", [0,0,0,0,0,1]],
                      ["Fence Monitoring", [0,0,0,0,1,0]],
                      ["Water Monitoring", [0,0,0,0,1,0]],
                      ["Feed Efficiency", [1,1,0,0,0,0]],
                      ["Calf/Youngstock", [0,1,0,0,0,0]],
                      ["Robotic Milking", [1,0,0,0,0,0]],
                      ["Multi-Farm Mgmt", [1,1,0,0,1,1]],
                      ["No Infrastructure Needed", [0,0,1,0,0,1]],
                      ["Open API", [1,1,0,0,0,0]],
                    ] as [string, number[]][] ).map(([feature, vals]) => (
                      <tr key={feature} style={{ borderTop: `1px solid ${palette.cardBorder}` }}>
                        <td style={{ padding: "8px 16px", color: palette.text, fontWeight: 500 }}>{feature}</td>
                        {vals.map((v, i) => (
                          <td key={i} style={{ padding: "8px 12px", textAlign: "center" }}>
                            {v ? <span style={{ color: palette.green, fontSize: 14 }}>✓</span> : <span style={{ color: palette.textDim }}>—</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* FEATURES TAB */}
        {activeTab === "features" && (
          <div>
            {/* Company selector */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              <button onClick={() => setSelectedCompany(null)} style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${!selectedCompany ? palette.accent : palette.cardBorder}`, background: !selectedCompany ? palette.accentSoft : "none", color: !selectedCompany ? palette.accent : palette.textMuted, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>All</button>
              {companies.map(co => (
                <button key={co.id} onClick={() => setSelectedCompany(co.id)} style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${selectedCompany === co.id ? co.color : palette.cardBorder}`, background: selectedCompany === co.id ? co.color + "22" : "none", color: selectedCompany === co.id ? co.color : palette.textMuted, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{co.name}</button>
              ))}
            </div>

            {companies.filter(co => !selectedCompany || co.id === selectedCompany).map(co => (
              <div key={co.id} style={{ background: palette.card, border: `1px solid ${palette.cardBorder}`, borderRadius: 12, marginBottom: 24, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: `1px solid ${palette.cardBorder}`, background: `linear-gradient(90deg, ${co.color}11 0%, transparent 100%)`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: 18, fontWeight: 800, color: co.color }}>{co.name}</span>
                    <span style={{ color: palette.textMuted, fontSize: 12, marginLeft: 12 }}>{co.tagline} · {co.hq} · Est. {co.founded}</span>
                  </div>
                  <span style={{ color: palette.textMuted, fontSize: 11 }}>{co.tier}</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 0 }}>
                  {/* Products */}
                  <div style={{ padding: 20, borderRight: `1px solid ${palette.cardBorder}` }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: palette.textDim, marginBottom: 12 }}>Products ({co.products.length})</div>
                    {co.products.map((p, i) => (
                      <div key={i} style={{ marginBottom: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                          <span style={{ background: co.color + "22", color: co.color, fontSize: 9, padding: "2px 6px", borderRadius: 4, fontWeight: 700, whiteSpace: "nowrap" }}>{p.category}</span>
                          <span style={{ fontWeight: 700, fontSize: 12 }}>{p.name}</span>
                        </div>
                        <div style={{ fontSize: 11, color: palette.textMuted, paddingLeft: 4 }}>{p.desc}</div>
                      </div>
                    ))}
                  </div>

                  {/* Unique Features + Benefits */}
                  <div style={{ padding: 20, borderRight: `1px solid ${palette.cardBorder}` }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: palette.textDim, marginBottom: 12 }}>Unique Differentiators</div>
                    {co.uniqueFeatures.map((f, i) => (
                      <div key={i} style={{ fontSize: 11, color: palette.text, marginBottom: 8, display: "flex", gap: 8 }}>
                        <span style={{ color: co.color, flexShrink: 0 }}>◆</span> {f}
                      </div>
                    ))}
                    <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: palette.textDim, marginTop: 20, marginBottom: 12 }}>Core Benefits</div>
                    {co.benefits.map((b, i) => (
                      <div key={i} style={{ fontSize: 11, color: palette.textMuted, marginBottom: 6, display: "flex", gap: 8 }}>
                        <span style={{ color: palette.green, flexShrink: 0 }}>✓</span> {b}
                      </div>
                    ))}
                  </div>

                  {/* Target + MVP */}
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: palette.textDim, marginBottom: 8 }}>Target Audience</div>
                    <div style={{ fontSize: 12, color: palette.text, marginBottom: 20, lineHeight: 1.6, padding: "10px 12px", background: palette.bg, borderRadius: 8, borderLeft: `3px solid ${co.color}` }}>{co.target}</div>

                    <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: palette.textDim, marginBottom: 8 }}>MVP Strategy</div>
                    <div style={{ fontSize: 12, color: palette.text, lineHeight: 1.7, padding: "10px 12px", background: palette.accentSoft, borderRadius: 8, borderLeft: `3px solid ${palette.accent}` }}>{co.mvp}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PRD TAB */}
        {activeTab === "prd" && (
          <div>
            <div style={{ background: palette.card, border: `1px solid ${palette.cardBorder}`, borderRadius: 12, padding: "16px 20px", marginBottom: 24, borderLeft: `4px solid ${palette.accent}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: palette.accent, marginBottom: 6 }}>📋 PRD Philosophy</div>
              <div style={{ fontSize: 12, color: palette.textMuted, lineHeight: 1.8 }}>
                This PRD is built from a first-principles synthesis of all six platforms. P0 items are the non-negotiables that define whether a product is viable. P1 items drive retention. P2 items drive expansion revenue. No single competitor has implemented all of these — each has made deliberate tradeoffs based on their target segment and business model.
              </div>
            </div>

            {prdRequirements.map((section, si) => (
              <div key={si} style={{ background: palette.card, border: `1px solid ${palette.cardBorder}`, borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
                <div style={{ padding: "14px 20px", borderBottom: `1px solid ${palette.cardBorder}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: section.color + "11" }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: section.color }}>{section.category}</div>
                  <span style={{ background: section.color + "22", color: section.color, fontSize: 10, padding: "3px 10px", borderRadius: 20, fontWeight: 700, letterSpacing: 1 }}>{section.priority}</span>
                </div>
                <div style={{ padding: "12px 20px" }}>
                  {section.items.map((item, ii) => (
                    <div key={ii} style={{ padding: "8px 0", borderBottom: ii < section.items.length - 1 ? `1px solid ${palette.cardBorder}` : "none", display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ color: section.color, fontSize: 11, marginTop: 1, flexShrink: 0 }}>REQ-{String(si * 10 + ii + 1).padStart(3, "0")}</span>
                      <span style={{ fontSize: 12, color: palette.text }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TRADEOFFS TAB */}
        {activeTab === "tradeoffs" && (
          <div>
            <div style={{ background: palette.card, border: `1px solid ${palette.cardBorder}`, borderRadius: 12, padding: "16px 20px", marginBottom: 24, borderLeft: `4px solid ${palette.purple}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: palette.purple, marginBottom: 6 }}>⚖️ Why Smart Companies Leave Features on the Table</div>
              <div style={{ fontSize: 12, color: palette.textMuted, lineHeight: 1.8 }}>
                Every "missing" feature is a deliberate business decision. Hardware cost, recurring revenue model, dealer lock-in, engineering bandwidth, and target market all shape what gets built. Understanding these tradeoffs reveals white space in the market.
              </div>
            </div>

            {companies.map(co => (
              <div key={co.id} style={{ background: palette.card, border: `1px solid ${palette.cardBorder}`, borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
                <div style={{ padding: "14px 20px", borderBottom: `1px solid ${palette.cardBorder}`, background: co.color + "11" }}>
                  <span style={{ fontWeight: 800, fontSize: 15, color: co.color }}>{co.name}</span>
                  <span style={{ color: palette.textMuted, fontSize: 12, marginLeft: 10 }}>— Strategic Tradeoffs</span>
                </div>
                <div style={{ padding: "12px 0" }}>
                  {co.tradeoffs.map((t, i) => (
                    <div key={i} style={{ padding: "12px 20px", borderBottom: i < co.tradeoffs.length - 1 ? `1px solid ${palette.cardBorder}` : "none", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 20 }}>
                      <div>
                        <div style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: palette.red, marginBottom: 4 }}>Missing / Limited Feature</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: palette.text }}>{t.feature}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: palette.green, marginBottom: 4 }}>Business Rationale</div>
                        <div style={{ fontSize: 12, color: palette.textMuted, lineHeight: 1.6 }}>{t.why}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Cross-company tradeoff matrix */}
            <div style={{ background: palette.card, border: `1px solid ${palette.cardBorder}`, borderRadius: 12, overflow: "hidden", marginTop: 8 }}>
              <div style={{ padding: "14px 20px", borderBottom: `1px solid ${palette.cardBorder}`, fontWeight: 700, fontSize: 13, color: palette.textMuted, letterSpacing: 2, textTransform: "uppercase" }}>Market-Level Strategic Positions</div>
              {tradeoffSummary.map((t, i) => (
                <div key={i} style={{ padding: "14px 20px", borderBottom: i < tradeoffSummary.length - 1 ? `1px solid ${palette.cardBorder}` : "none", display: "grid", gridTemplateColumns: "1fr auto 2fr", gap: 16, alignItems: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: palette.text }}>{t.dimension}</div>
                  <div style={{ background: palette.accentSoft, color: palette.accent, fontSize: 11, padding: "4px 10px", borderRadius: 20, fontWeight: 700, whiteSpace: "nowrap" }}>{t.winner}</div>
                  <div style={{ fontSize: 11, color: palette.textMuted }}>{t.reason}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MVP TAB */}
        {activeTab === "mvp" && (
          <div>
            <div style={{ background: palette.card, border: `1px solid ${palette.cardBorder}`, borderRadius: 12, padding: "16px 20px", marginBottom: 24, borderLeft: `4px solid ${palette.green}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: palette.green, marginBottom: 6 }}>🚀 MVP First Principles for Livestock Tech</div>
              <div style={{ fontSize: 12, color: palette.textMuted, lineHeight: 1.8 }}>
                Farmers are the most skeptical buyers on earth. They've been burned by expensive equipment that didn't deliver. An MVP must: (1) work on day 1 with zero IT setup, (2) deliver a visible win within 72 hours, (3) integrate into existing daily routines rather than creating new ones, and (4) prove ROI before asking for renewal. The goal is <strong style={{ color: palette.text }}>not a minimum viable product — it's a minimum lovable product.</strong>
              </div>
            </div>

            {mvpRoadmap.map((phase, i) => (
              <div key={i} style={{ display: "flex", gap: 20, marginBottom: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: phase.color + "22", border: `2px solid ${phase.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: phase.color }}>{i + 1}</div>
                  {i < mvpRoadmap.length - 1 && <div style={{ width: 2, flex: 1, background: `linear-gradient(${phase.color}, ${mvpRoadmap[i+1].color})`, margin: "4px 0", minHeight: 40 }} />}
                </div>
                <div style={{ background: palette.card, border: `1px solid ${palette.cardBorder}`, borderRadius: 12, flex: 1, overflow: "hidden", marginBottom: 0 }}>
                  <div style={{ padding: "14px 20px", borderBottom: `1px solid ${palette.cardBorder}`, background: phase.color + "11", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontWeight: 800, fontSize: 14, color: phase.color }}>{phase.phase}</div>
                    <span style={{ background: phase.color + "22", color: phase.color, fontSize: 10, padding: "3px 10px", borderRadius: 20, fontWeight: 700 }}>{phase.timeline}</span>
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: 13, color: palette.text, fontWeight: 700, marginBottom: 12 }}>🎯 Goal: {phase.goal}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
                      {phase.features.map((f, fi) => (
                        <div key={fi} style={{ fontSize: 11, color: palette.textMuted, display: "flex", gap: 8, alignItems: "flex-start", padding: "6px 10px", background: palette.bg, borderRadius: 6 }}>
                          <span style={{ color: phase.color, flexShrink: 0, marginTop: 1 }}>▸</span> {f}
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: 11, color: palette.textMuted, padding: "10px 14px", background: phase.color + "11", borderRadius: 8, borderLeft: `3px solid ${phase.color}`, lineHeight: 1.7 }}>
                      <strong style={{ color: phase.color }}>Why this order:</strong> {phase.rationale}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* White space opportunity */}
            <div style={{ background: "linear-gradient(135deg, #161b22, #0d1117)", border: `1px solid ${palette.accent}`, borderRadius: 12, padding: 24, marginTop: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: palette.accent, marginBottom: 12 }}>💡 White Space — What No One Has Built Yet</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
                {[
                  ["Unified Platform", "No single product combines health monitoring + GPS tracking + virtual fencing + water/fence IoT. This is the platform gap."],
                  ["Predictive Mortality AI", "Alert 5-7 days before an animal dies based on multi-signal ML. None do this yet at sufficient confidence."],
                  ["Carbon / ESG Reporting", "None integrate methane estimation from rumination + grazing data for carbon credit or subsidy reporting."],
                  ["Vet Telemedicine Integration", "Alert → immediate video triage with a remote vet. The workflow exists in human healthcare, not in livestock."],
                  ["Consumer Traceability", "Farm-to-fork animal health passport accessible to premium beef/dairy buyers and QR-code traced products."],
                  ["Weather + Grazing AI", "Predictive grazing rotation based on incoming weather, pasture growth models, and herd demand curves."],
                ].map(([title, desc]) => (
                  <div key={title} style={{ background: palette.card, borderRadius: 8, padding: 14, border: `1px solid ${palette.cardBorder}` }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: palette.accent, marginBottom: 6 }}>{title}</div>
                    <div style={{ fontSize: 11, color: palette.textMuted, lineHeight: 1.6 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      <div style={{ textAlign: "center", padding: "24px", borderTop: `1px solid ${palette.cardBorder}`, color: palette.textDim, fontSize: 11 }}>
        Analysis compiled May 2026 · Afimilk · CowManager · Moocall · HerdDogg · Smart Paddock · Nofence
      </div>
    </div>
  );
}