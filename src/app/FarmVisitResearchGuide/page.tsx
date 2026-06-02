"use client";
import { useState } from "react";
import { HandDrawnCard, HandDrawnButton } from "@/components/ui";
import { tokens } from "@/lib/design";

// ─── DATA ────────────────────────────────────────────────────────────────────

const INTRO_KANNADA = `Namaskara, nanna hesaru Srujan. Nanu Bangalore nalli iruveenu. Nanu hasuvinalli technology bagge study maaduttiddene — yaavagle seva illada farmers ge hege sahaya maadabahuda antha. Nanu yavudadro business sell maadalu bandilla — nanna guri nimage yaavaaga onde kashtavaagirutte antha artha maadkolodu. Nimma anubhava, nimma samaya, nimma hesaru — idu ellaa nannige bahala important.`;

const INTRO_ENGLISH = `Hello, my name is Srujan. I'm from Bangalore, doing a personal study on how farming works near the city — specifically trying to understand the real day-to-day challenges farmers face with their animals. I'm not selling anything. I'm not from a company or government. I'm just trying to learn from people who actually do this work every day. Whatever you share — even if it's a problem you think is small — is very valuable to me. Would you mind if I spent 30 minutes walking around with you and asking a few questions?`;

const INTRO_NOTES = [
  "Arrive in the morning — farmers are most relaxed after the first milking (7–9 AM)",
  "Wear simple clothes, not formal. Don't carry a laptop. Use a notebook or phone.",
  "Bring a small gift — a packet of biscuits, tea, or nothing at all is fine. Never bring business cards.",
  "Start by complimenting something you genuinely see — a healthy-looking cow, a clean shed, anything real.",
  "If they ask 'why are you doing this?' — say 'I grew up near farms and want to give back somehow. Not sure yet how.'",
  "Never mention product, app, sensor, or technology in the first 15 minutes.",
  "If they get suspicious, stop. Say 'I can come back another day' and leave gracefully.",
];

const questions = [
  // SECTION A — DAILY ROUTINE (Build rapport, get them talking)
  { id: 1, section: "A", label: "Daily Routine", ask: true, q: "Enu time ge eluthira? Yelu hasubeku antha alarm itta maadidira?", en: "What time do you wake up? Do you set an alarm just for the cows?", why: "Reveals how much their life revolves around the animals. Time = pain point.", tag: "routine" },
  { id: 2, section: "A", label: "Daily Routine", ask: true, q: "Haalu yaavaga tegedukothira — beligge, sanje, illa eradu samaya?", en: "When do you milk — morning, evening, or twice a day?", why: "Milking schedule = opportunity window for any device.", tag: "routine" },
  { id: 3, section: "A", label: "Daily Routine", ask: true, q: "Ek dina hege irththe — beliginda sanje varege haadu heli.", en: "Walk me through your entire day from the moment you wake up to when you sleep.", why: "The best question in any user research. Let them talk 5+ minutes. Interruptions only to probe.", tag: "routine" },
  { id: 4, section: "A", label: "Daily Routine", ask: false, q: "Observe: Havu yaavaga shuru maaduthare — milking, cleaning, feeding? What order?", en: "[OBSERVE] What is the sequence of morning activities? Who does which task?", why: "Workflow mapping. Tells you where a device can fit without disrupting routine.", tag: "observe" },
  { id: 5, section: "A", label: "Daily Routine", ask: true, q: "Ee kelbheku maadtira yaava kelbhali sahaya irutte?", en: "Is there any task in your daily work that you wish someone else could do — or happened automatically?", why: "The golden 'pain door' question. Often unlocks frustrations they wouldn't otherwise mention.", tag: "pain" },

  // SECTION B — HERD HEALTH
  { id: 6, section: "B", label: "Animal Health", ask: true, q: "Nenapirta kashtavaada rog yav hathittu nimma hasuvige?", en: "What's the worst illness you've seen hit your cows?", why: "Gets an emotional story, not a clinical answer. The emotion = the priority.", tag: "health" },
  { id: 7, section: "B", label: "Animal Health", ask: true, q: "Hasu rogavagide antha heggetu gothaagthhe? Enthenthalli badulaavanu kantheera?", en: "How do you know when a cow is sick? What signs do you look for first?", why: "Maps their current detection method — the gap between their method and early detection = your product.", tag: "health" },
  { id: 8, section: "B", label: "Animal Health", ask: true, q: "Doctor bandmele yeshtu kharchu aagthhe? Barodu kashtavaa?", en: "How much does a vet visit cost? Is it hard to get a vet to come here?", why: "Quantifies the pain in rupees. The bigger this number, the easier the ROI conversation.", tag: "health" },
  { id: 9, section: "B", label: "Animal Health", ask: true, q: "Yaavaaga hasu rogaitu antha gothaaguvudu tade aagide? Tade aadmele yeshtu haalu kommi aagothhe?", en: "Has a cow ever gotten sick and you found out too late? How much milk did you lose?", why: "Late detection story = the exact problem your product solves.", tag: "health" },
  { id: 10, section: "B", label: "Animal Health", ask: true, q: "Rog baredaga yesthotu samaya thokatthe, nimma samaya, hana?", en: "How many days do you lose — your time, your money — when one cow falls ill?", why: "Total cost of illness calculation. This becomes your ROI benchmark.", tag: "health" },
  { id: 11, section: "B", label: "Animal Health", ask: false, q: "Observe: Yaavaadaru cow alasava agi kanuthide? Yaru notice maadidare?", en: "[OBSERVE] Is any cow showing signs of lethargy, separation from herd, dull eyes, dry muzzle?", why: "On-the-ground symptom check. Gives you live validation data.", tag: "observe" },
  { id: 12, section: "B", label: "Animal Health", ask: true, q: "Nimma hasuvige FMD, Mastitis, illa yavudu bere rog baruttade?", en: "Which specific diseases hit your herd — FMD, mastitis, lumpy skin, or something else?", why: "India-specific disease prevalence mapping. Each disease = a different sensor priority.", tag: "health" },
  { id: 13, section: "B", label: "Animal Health", ask: true, q: "Ek cow saavagotto aagide yavagaadru?", en: "Have you ever lost a cow to illness or an accident? What happened?", why: "High emotion, high trust moment. If they share this, they've opened up fully.", tag: "health" },

  // SECTION C — FEEDING & NUTRITION
  { id: 14, section: "C", label: "Feeding", ask: true, q: "Dina yeshtu kharchagthhe haasu tinisodakke?", en: "How much do you spend per day on feed for all your cows combined?", why: "Feed = highest operating cost. If your product optimizes feed, ROI is very clear.", tag: "feed" },
  { id: 15, section: "C", label: "Feeding", ask: true, q: "Haasu tinodi confirm maadkolodu hege madthira? Elli tinuthade gottaaguthade?", en: "How do you know each cow has eaten enough? Can you tell if one is eating less?", why: "Rumination/eating monitoring value prop. Most farmers say 'I watch them' — which fails at night.", tag: "feed" },
  { id: 16, section: "C", label: "Feeding", ask: false, q: "Observe: Feeding area elli ide? Feed residue ide? Yelle tinthave? Yava cow anyo saaku tindallla?", en: "[OBSERVE] Where do cows feed? Is feed wasted? Are any cows being pushed away from the feeder?", why: "Feed hierarchy in the herd. Sick or low-rank cows often starve silently.", tag: "observe" },
  { id: 17, section: "C", label: "Feeding", ask: true, q: "Haige plastic illa bere garbage tintu ide anta kandu idira?", en: "Have you ever seen your cows eating plastic or garbage? How often does that happen?", why: "CRITICAL for Bangalore peri-urban farms. Plastic ingestion = huge health crisis around city boundaries.", tag: "feed" },
  { id: 18, section: "C", label: "Feeding", ask: false, q: "Observe: Hauge area nalli yeshtu plastic kaanam ide? Road bagge hasuvannu bandbiruthade?", en: "[OBSERVE] How much plastic/garbage is visible in the grazing area or near the shed? Do cows go near roads?", why: "Environmental hazard scoring. Drives the need for a grazing zone sensor or virtual fence.", tag: "observe" },
  { id: 19, section: "C", label: "Feeding", ask: true, q: "Nimma hasuvige neer yeelli kuditheeve? Trough ide? Kere ide? Neeru kottu kothira?", en: "Where do your cows drink water? Trough, pond, or manually given? How many times a day?", why: "Water access = welfare and productivity issue. SmartWater sensor opportunity.", tag: "feed" },
  { id: 20, section: "C", label: "Feeding", ask: false, q: "Observe: Neeru trough thiutha ide? Clean ide? Yavu time neer bardilla anta kanisthade?", en: "[OBSERVE] Is the water trough clean and full? Signs of algae, dirt, or empty trough?", why: "Water quality alert opportunity. Visual scoring of current water access quality.", tag: "observe" },

  // SECTION D — BREEDING & REPRODUCTION
  { id: 21, section: "D", label: "Breeding", ask: true, q: "Yaavaaga hasu garbhavaagide antha gottaagthhe?", en: "How do you know when a cow is in heat? What signs do you look for?", why: "Current heat detection method. 80% say 'I watch' — nights and weekends are missed.", tag: "breed" },
  { id: 22, section: "D", label: "Breeding", ask: true, q: "Yaavaaga AI madtheera? Nimma area nalli AI doctor sigi barutha?", en: "Do you use artificial insemination? Is the AI doctor easy to get on time?", why: "Breeding efficiency + AI service availability gap in peri-Bangalore areas.", tag: "breed" },
  { id: 23, section: "D", label: "Breeding", ask: true, q: "Ek heat cycle miss aadmele yeshtu haanu haalu kommi aagthhe? Yeshtu kharchu aagthhe?", en: "If you miss a heat cycle, how many months does it delay the next calf? What does that cost you?", why: "Quantifies missed heat detection in rupees. Most farmers don't know — helping them calculate this is powerful.", tag: "breed" },
  { id: 24, section: "D", label: "Breeding", ask: true, q: "Yelsige ek hasu calve maadidhe? Kadinalli sahaya bekeitu aadru?", en: "When was your last difficult calving? Did the calf or cow need help?", why: "Calving alert need assessment. Moocall-type product need in India.", tag: "breed" },
  { id: 25, section: "D", label: "Breeding", ask: true, q: "Ratri yaavaadru haasu heeruthe? Aavaga yaru iguthare? Kaanu hakkuthira?", en: "Have you had a cow calve at night without you there? What happened?", why: "Calving at night = highest anxiety moment for a farmer. If they have a story, product sells itself.", tag: "breed" },

  // SECTION E — LABOUR & TIME
  { id: 26, section: "E", label: "Labour", ask: true, q: "Nimma jote yaaru kaelbhillidare — family, illa kaarmikara?", en: "Who helps you with the cows — family, hired workers, or just you?", why: "Labour dependency mapping. If it's just one person, they need automation most.", tag: "labour" },
  { id: 27, section: "E", label: "Labour", ask: true, q: "Nimma kaarmikar elli irutha? Nimm illada samath yenu aagthhe?", en: "If you or your worker are away for a day, what goes wrong first?", why: "The 'single point of failure' question. Reveals what they're most afraid of being absent for.", tag: "labour" },
  { id: 28, section: "E", label: "Labour", ask: true, q: "Kaarmikaru siguvudu kashta ide? Nambali aagthho?", en: "Is it hard to find reliable workers for the farm? Has a worker ever let you down badly?", why: "Labour reliability = trust problem. Tech solution = consistent monitoring regardless of human.", tag: "labour" },
  { id: 29, section: "E", label: "Labour", ask: true, q: "Hasubeke raatri elli irutheera? Maane hattira ide?", en: "Do you sleep here on the farm or do you travel from somewhere? How far?", why: "Distance from farm = remote monitoring value. Farther away = more willing to pay for alerts.", tag: "labour" },
  { id: 30, section: "E", label: "Labour", ask: true, q: "Nimma jamiinnalli 24 ghante kaanu iduva samaya yeshtu ide?", en: "On average, how many hours per day are you personally watching the cows?", why: "Time investment baseline. 'I watch 6 hours a day' = tech can give those 6 hours back.", tag: "labour" },

  // SECTION F — TECHNOLOGY & PHONES
  { id: 31, section: "F", label: "Technology", ask: true, q: "Yaava phone upayogisthira? WhatsApp ide nimge?", en: "What phone do you use? Do you use WhatsApp?", why: "Device capability check. If WhatsApp = can receive alerts. If smartphone = app is viable.", tag: "tech" },
  { id: 32, section: "F", label: "Technology", ask: true, q: "Internet sigthade illi? Yavaga sigthillla?", en: "How is the internet connection here? When does it fail?", why: "Connectivity reliability mapping. Offline-first vs cloud-based product decision.", tag: "tech" },
  { id: 33, section: "F", label: "Technology", ask: true, q: "Nimm phone nalli hasubeke yaavaadru app use maadirara? Haalu maarataadre ID trackinge?", en: "Have you ever used any app related to your farm or cows?", why: "Tech adoption baseline. If yes, follow up on what they liked/hated about it.", tag: "tech" },
  { id: 34, section: "F", label: "Technology", ask: true, q: "Nimma cow gala kaige yaavaadru tag illa device idare, nimge haadukothira? Ella idu beda antha annisthade?", en: "If a small device on the cow's ear or neck could send you a WhatsApp when she's sick — would that feel useful or unnecessary?", why: "Soft product concept test. Don't explain how. Just plant the idea and watch their face.", tag: "tech" },
  { id: 35, section: "F", label: "Technology", ask: false, q: "Observe: Charger, power outlets, solar panel kaanam ide? Power cut yashttu aagthhe?", en: "[OBSERVE] Is there electricity available in the shed? Power cuts visible? Generator/solar present?", why: "Power infrastructure assessment for device charging and gateway placement.", tag: "observe" },

  // SECTION G — ECONOMICS & MONEY
  { id: 36, section: "G", label: "Economics", ask: true, q: "Ek hasu thinganalli yeshtu haalu kudthathe? Yeshtu hana sigthhe?", en: "How much milk does your best cow give per day? What price do you get per litre?", why: "Per-cow revenue baseline. Enables exact ROI calculation for your pitch later.", tag: "money" },
  { id: 37, section: "G", label: "Economics", ask: true, q: "Yeellake haalu kodthira — cooperative, private dairy, illa direct?", en: "Who do you sell your milk to — cooperative, private dairy, or directly to consumers?", why: "Sales channel = distribution partner opportunity. Cooperative is your Tier 4 entry point.", tag: "money" },
  { id: 38, section: "G", label: "Economics", ask: true, q: "Thinganalli yeshtu kharchagthhe total — feed, doctor, labour, yella sere?", en: "What are your total monthly expenses — feed, vet, labour, everything combined?", why: "Margin calculation. Helps you price your product as a % of existing costs.", tag: "money" },
  { id: 39, section: "G", label: "Economics", ask: true, q: "Nimma hasubege ek changi rog baradantha ek gadget ide antha heeddre, thinganalli yeshtu hana kodthira?", en: "If a device could prevent one illness per year, what's the maximum you'd pay for it per month?", why: "Willingness-to-pay (WTP) discovery. The single most important commercial question.", tag: "money" },
  { id: 40, section: "G", label: "Economics", ask: true, q: "Nimma hasu ella sell maadidira? Yaavaaga? Yaake?", en: "Have you ever had to sell a cow because you couldn't afford treatment? What happened?", why: "Distress sale story = the emotional bottom. Very few will share but those who do reveal true pain depth.", tag: "money" },

  // SECTION H — ENVIRONMENT & LOCATION
  { id: 41, section: "H", label: "Environment", ask: false, q: "Observe: Neeli taana yaav disheya ide? Gaali baruthade? Summer nalli yeshtu bisi?", en: "[OBSERVE] Which direction does the shed face? Cross-ventilation? Estimate summer heat.", why: "Heat stress is massive for milk production in Bangalore summers. THI monitoring opportunity.", tag: "observe" },
  { id: 42, section: "H", label: "Environment", ask: false, q: "Observe: Hasuvannu elli biditheeve — closed shed, open area, pasture? Yashttu acres?", en: "[OBSERVE] Where do cows spend their time — closed shed, open yard, or open pasture? Estimate acreage.", why: "Grazing vs confined system detection. Drives Tier 2 vs Tier 3 product selection.", tag: "observe" },
  { id: 43, section: "H", label: "Environment", ask: true, q: "Yavudaadru cow kadavele hogi badiruthade? Raste mele illa yaavaadru jagadalli?", en: "Do your cows ever wander off? Has one ever gone to the road or a neighbour's land?", why: "GPS/geofencing need assessment. Peri-Bangalore farms near roads = high theft and accident risk.", tag: "environment" },
  { id: 44, section: "H", label: "Environment", ask: true, q: "Cheetah, naayi, illa bere praani nimma hasubege yavagaadru bahali maadide?", en: "Have stray dogs, leopards, or other animals ever attacked your cows?", why: "Predator alert need. Leopard conflict near Bangalore (Bannerghatta area) is documented.", tag: "environment" },
  { id: 45, section: "H", label: "Environment", ask: false, q: "Observe: Choru, mud, slippery flooring ide? Cow leg injury kanisthade?", en: "[OBSERVE] Is the shed floor slippery or have standing water/mud? Any cow with visible limping?", why: "Lameness is one of the top 3 productivity losses in Indian dairies. Often invisible to farmer.", tag: "observe" },

  // SECTION I — SOCIAL & ASPIRATIONS
  { id: 46, section: "I", label: "Aspirations", ask: true, q: "Nimma makkalu ee kaelbhelu maadthare anta neevu baavishthira?", en: "Do you think your children will continue this farming? Do you want them to?", why: "Succession anxiety = real pain. Tech that reduces labour makes farming viable for the next generation.", tag: "aspiration" },
  { id: 47, section: "I", label: "Aspirations", ask: true, q: "Ek yojana badalaayisi nimma farm improve maadabeka anta idda, yenu maadthira?", en: "If you had some extra money this year, what's the first thing you'd invest in for the farm?", why: "Revealed priorities. 'More cows' vs 'better shed' vs 'reduce my work' tells you their mental model.", tag: "aspiration" },
  { id: 48, section: "I", label: "Aspirations", ask: true, q: "Nimma haagu nimma naadina bere ryotara haasuvina jote compare maadidre, nimma yenu changiede, yenu kashtavide?", en: "Compared to other farmers nearby, what do you think you do better? What are they doing that you're not?", why: "Peer comparison = biggest motivator in rural India. Surfaces what they secretly want to change.", tag: "aspiration" },
  { id: 49, section: "I", label: "Aspirations", ask: true, q: "Nimge yaavaadru company yenaadru nimit maado gadget kottare — uplama ittu gedda ide? illa ee 'technology' ella nambalu aagalla antha annisutha?", en: "Have you ever been sold a product that promised to help your cows but didn't work? What happened?", why: "Trust calibration. Past betrayal by AgTech = why your pilot has to be free/nearly free.", tag: "aspiration" },
  { id: 50, section: "I", label: "Aspirations", ask: true, q: "Nanu nimge madisida gadgetannu bedda bele, ek thinganalli ek rogi kadegemaadidruttith anta nambike idre, yeshtu khaidi maadthira?", en: "If I could show you that this device prevented one illness in the first month — how much would you pay per month after that?", why: "FINAL CLOSING QUESTION. Only ask after trust is fully built. This is your WTP validation.", tag: "money" },
];

const sectionMeta = {
  A: { label: "Daily Routine", color: "#3fb950", icon: "🌅", count: 5 },
  B: { label: "Animal Health", color: "#f85149", icon: "🩺", count: 8 },
  C: { label: "Feeding & Water", color: "#58a6ff", icon: "🌾", count: 7 },
  D: { label: "Breeding", color: "#f0a500", icon: "🐄", count: 5 },
  E: { label: "Labour", color: "#bc8cff", icon: "👨‍🌾", count: 5 },
  F: { label: "Technology", color: "#39d353", icon: "📱", count: 5 },
  G: { label: "Economics", color: "#ffa657", icon: "💰", count: 5 },
  H: { label: "Environment", color: "#79c0ff", icon: "🏡", count: 5 },
  I: { label: "Aspirations", color: "#ff7b72", icon: "⭐", count: 5 },
} as const;

const productMap = [
  {
    trigger: "Plastic ingestion seen / roadside grazing",
    tags: ["plastic", "grazing", "road"],
    product: "PastureWatch GPS Tag",
    sensor: "GPS + Geofence alert",
    color: "#f0a500",
    why: "Define safe virtual grazing zones away from plastic/road waste areas",
  },
  {
    trigger: "Late illness detection / high vet bills",
    tags: ["health", "vet", "sick"],
    product: "AlertBell Health Tag",
    sensor: "Ear temperature sensor",
    color: "#f85149",
    why: "Fever alert 24-48 hours before visible symptoms appear",
  },
  {
    trigger: "Missed heat cycles / low conception rate",
    tags: ["breed", "heat", "AI"],
    product: "HerdTrack Pro",
    sensor: "Accelerometer + temp (ear tag)",
    color: "#3fb950",
    why: "Activity spike detection flags the 18-hour estrus window reliably",
  },
  {
    trigger: "Night calving / calf mortality",
    tags: ["calving", "night", "calf"],
    product: "AlertBell + CalvingAlert mode",
    sensor: "Accelerometer (tail movement) or belly band",
    color: "#bc8cff",
    why: "SMS 1-2 hours before calving — no overnight barn checks needed",
  },
  {
    trigger: "Empty water trough / cows walking far for water",
    tags: ["water", "trough", "dehydration"],
    product: "SmartWater Sensor",
    sensor: "Ultrasonic water level",
    color: "#58a6ff",
    why: "Alert when trough drops below 20% — prevent dehydration-linked milk drop",
  },
  {
    trigger: "Stray dogs / leopard attack / cow wandering",
    tags: ["predator", "wander", "theft"],
    product: "PastureWatch GPS + Alert",
    sensor: "GPS + herd clustering anomaly",
    color: "#ffa657",
    why: "Unusual herd clustering + individual stray = predator or escape alert",
  },
  {
    trigger: "High heat stress / summer milk drop",
    tags: ["heat", "summer", "THI"],
    product: "CowBreath THI Monitor",
    sensor: "Ambient temp + humidity in shed",
    color: "#ff7b72",
    why: "Temperature-Humidity Index crosses 72 = cooling alert. Prevents summer milk loss.",
  },
  {
    trigger: "One worker / no backup / remote farm",
    tags: ["labour", "remote", "alone"],
    product: "HerdTrack Pro + Daily Pull List",
    sensor: "Any activity sensor + cloud alert",
    color: "#79c0ff",
    why: "Even one untrained worker can follow a daily app-generated pull list",
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const pal = {
  bg: tokens.colors.background,
  card: tokens.colors.paper,
  border: tokens.colors.border,
  text: tokens.colors.foreground,
  muted: tokens.colors.muted,
  dim: "#6f6f6f",
  accent: tokens.colors.accent,
  green: tokens.colors.secondary,
};

export default function FarmVisitResearchGuide() {
  const [tab, setTab] = useState("intro");
  const [filter, setFilter] = useState("ALL");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [farmId, setFarmId] = useState(1);
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});

  const tabs = [
    { id: "intro", label: "📋 Introduction" },
    { id: "questions", label: "❓ 50 Questions" },
    { id: "checklist", label: "👁️ Observation Checklist" },
    { id: "mapper", label: "🎯 Problem → Product" },
  ];

  const sections = Object.entries(sectionMeta);
  const filterOptions = ["ALL", "ASK", "OBSERVE", ...Object.keys(sectionMeta) as Array<keyof typeof sectionMeta>];

  const filtered = questions.filter(q => {
    if (filter === "ALL") return true;
    if (filter === "ASK") return q.ask;
    if (filter === "OBSERVE") return !q.ask;
    return q.section === filter;
  });

  const toggle = (id: string | number) => setChecked(p => ({ ...p, [String(id)]: !p[String(id)] }));
  const toggleFlag = (id: string | number) => setFlagged(p => ({ ...p, [String(id)]: !p[String(id)] }));
  const doneCount = Object.values(checked).filter(Boolean).length;

  return (
    <div style={{ background: pal.bg, minHeight: "100vh", fontFamily: "var(--font-patrick)", color: pal.text }}>
      {/* Header */}
      <div style={{ background: "#f7ede0", borderBottom: `1px solid ${pal.border}`, padding: "20px 20px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: pal.accent, boxShadow: `0 0 10px ${pal.accent}` }} />
            <span style={{ color: pal.muted, fontSize: 10, letterSpacing: 3, textTransform: "uppercase" }}>Field Research Kit · Bangalore Farms</span>
          </div>
          <h1 style={{ fontSize: "clamp(18px,3.5vw,28px)", fontWeight: 800, margin: "0 0 4px", letterSpacing: -0.5 }}>
            🐄 Farm Visit Research Guide
          </h1>
          <p style={{ color: pal.muted, fontSize: 12, margin: "0 0 18px" }}>
            Introduction · 50 Questions · Site Observation Checklist · Problem→Product Mapper
          </p>

          {/* Farm switcher */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ color: pal.muted, fontSize: 11 }}>Farm #</span>
            {[1,2,3,4,5,6,7,8,9,10].map(n => (
              <button key={n} onClick={() => { setFarmId(n); setChecked({}); setNotes({}); setFlagged({}); }}
                style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${farmId === n ? pal.accent : pal.border}`, background: farmId === n ? pal.accent + "22" : "none", color: farmId === n ? pal.accent : pal.muted, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                {n}
              </button>
            ))}
            <span style={{ color: pal.dim, fontSize: 11 }}>— tap to start a new farm session</span>
          </div>

          <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{ padding: "8px 16px", background: "none", border: "none", borderBottom: tab === t.id ? `2px solid ${pal.accent}` : "2px solid transparent", color: tab === t.id ? pal.text : pal.muted, fontSize: 12, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", fontWeight: tab === t.id ? 700 : 400 }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px" }}>

        {/* ── INTRO TAB ── */}
        {tab === "intro" && (
          <div>
            {/* Script Card */}
            <HandDrawnCard style={{ overflow: "hidden", marginBottom: 20, padding: 0 }}>
              <div style={{ padding: "12px 18px", borderBottom: `1px solid ${pal.border}`, background: pal.accent + "15", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 800, color: pal.accent }}>🗣️ Opening Script (Read in Kannada first, then English)</span>
              </div>
              <div style={{ padding: 18 }}>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: pal.muted, textTransform: "uppercase", marginBottom: 8 }}>Kannada (Say this first)</div>
                  <div style={{ background: "#0a1a0a", border: `1px solid #1a3a1a`, borderRadius: 8, padding: 14, fontSize: 13, color: "#7ec97e", lineHeight: 1.8, fontStyle: "italic" }}>
                    {INTRO_KANNADA}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: pal.muted, textTransform: "uppercase", marginBottom: 8 }}>English (Translation / Backup)</div>
                  <div style={{ background: "#0a0f1a", border: `1px solid ${pal.border}`, borderRadius: 8, padding: 14, fontSize: 13, color: pal.text, lineHeight: 1.9 }}>
                    {INTRO_ENGLISH}
                  </div>
                </div>
                </div>
            </HandDrawnCard>

            {/* Tips */}
            <HandDrawnCard style={{ overflow: "hidden", marginBottom: 20, padding: 0 }}>
              <div style={{ padding: "12px 18px", borderBottom: `1px solid ${pal.border}` }}>
                <span style={{ fontWeight: 800, color: pal.green }}>🧠 Researcher Rules — Memorize These Before You Go</span>
              </div>
              <div style={{ padding: "10px 0" }}>
                {INTRO_NOTES.map((note, i) => (
                  <div key={i} style={{ padding: "10px 18px", borderBottom: i < INTRO_NOTES.length - 1 ? `1px solid ${pal.border}` : "none", display: "flex", gap: 12, fontSize: 12, color: pal.text, lineHeight: 1.7 }}>
                    <span style={{ color: pal.accent, flexShrink: 0, fontWeight: 800 }}>{i + 1}.</span>
                    {note}
                  </div>
                ))}
              </div>
            </HandDrawnCard>

            {/* Section overview */}
            <HandDrawnCard style={{ overflow: "hidden", padding: 0 }}>
              <div style={{ padding: "12px 18px", borderBottom: `1px solid ${pal.border}` }}>
                <span style={{ fontWeight: 800, color: pal.text }}>📊 Question Sections Overview</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 0 }}>
                {sections.map(([key, sec]) => (
                  <div key={key} onClick={() => { setTab("questions"); setFilter(key); }}
                    style={{ padding: "14px 16px", borderRight: `1px solid ${pal.border}`, borderBottom: `1px solid ${pal.border}`, cursor: "pointer", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = sec.color + "11"}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}>
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{sec.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 12, color: sec.color }}>{sec.label}</div>
                    <div style={{ fontSize: 10, color: pal.muted }}>{sec.count} questions · Section {key}</div>
                  </div>
                ))}
              </div>
            </HandDrawnCard>
          </div>
        )}

        {/* ── QUESTIONS TAB ── */}
        {tab === "questions" && (
          <div>
            {/* Filter bar */}
            <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ color: pal.muted, fontSize: 11, marginRight: 4 }}>Filter:</span>
              {filterOptions.map(f => {
                const sec = sectionMeta[f as keyof typeof sectionMeta];
                const active = filter === f;
                return (
                  <button key={f} onClick={() => setFilter(f)}
                    style={{ padding: "4px 12px", borderRadius: 20, border: `1px solid ${active ? (sec?.color || pal.accent) : pal.border}`, background: active ? (sec?.color || pal.accent) + "22" : "none", color: active ? (sec?.color || pal.accent) : pal.muted, fontSize: 10, cursor: "pointer", fontFamily: "inherit", fontWeight: active ? 700 : 400 }}>
                    {sec ? `${sec.icon} ${sec.label}` : f}
                  </button>
                );
              })}
              <span style={{ color: pal.dim, fontSize: 11, marginLeft: "auto" }}>
                {doneCount} / {questions.length} done · Farm #{farmId}
              </span>
            </div>

            {filtered.map(q => {
              const sec = sectionMeta[q.section as keyof typeof sectionMeta];
              const done = checked[String(q.id)];
              const note = notes[String(q.id)] || "";
              const flag = flagged[String(q.id)];
              return (
                <div key={q.id} style={{ background: done ? "#0a1a0a" : pal.card, border: `1px solid ${done ? "#1a3a1a" : flag ? pal.accent + "60" : pal.border}`, borderRadius: 10, marginBottom: 10, overflow: "hidden", transition: "all 0.2s" }}>
                  <div style={{ padding: "12px 16px" }}>
                    {/* Header row */}
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                      <input type="checkbox" checked={!!done} onChange={() => toggle(q.id)}
                        style={{ marginTop: 3, accentColor: pal.green, flexShrink: 0, cursor: "pointer" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
                          <span style={{ fontSize: 10, color: pal.muted }}>Q{q.id}</span>
                          <span style={{ background: sec.color + "22", color: sec.color, fontSize: 9, padding: "2px 7px", borderRadius: 10, fontWeight: 700 }}>{sec.icon} {sec.label}</span>
                          <span style={{ background: q.ask ? "#3fb95022" : "#58a6ff22", color: q.ask ? "#3fb950" : "#58a6ff", fontSize: 9, padding: "2px 7px", borderRadius: 10, fontWeight: 700 }}>
                            {q.ask ? "ASK" : "OBSERVE"}
                          </span>
                          <button onClick={() => toggleFlag(q.id)}
                            style={{ background: flag ? pal.accent + "33" : "none", border: `1px solid ${flag ? pal.accent : pal.dim}`, color: flag ? pal.accent : pal.muted, fontSize: 9, padding: "2px 7px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit" }}>
                            {flag ? "⚑ KEY" : "flag"}
                          </button>
                        </div>

                        {/* Kannada */}
                        <div style={{ fontSize: 13, fontWeight: 600, color: done ? "#5a9a5a" : pal.text, lineHeight: 1.7, marginBottom: 4, fontStyle: "italic" }}>
                          {q.q}
                        </div>
                        {/* English */}
                        <div style={{ fontSize: 12, color: pal.muted, lineHeight: 1.6, marginBottom: 6 }}>
                          {q.en}
                        </div>
                        {/* Why */}
                        <div style={{ fontSize: 10, color: pal.dim, borderLeft: `2px solid ${sec.color}40`, paddingLeft: 8 }}>
                          Why this question: {q.why}
                        </div>
                      </div>
                    </div>

                    {/* Note input */}
                    <textarea
                      value={note}
                      onChange={e => setNotes(p => ({ ...p, [String(q.id)]: e.target.value }))}
                      placeholder="Your observation / farmer's answer..."
                      style={{ width: "100%", background: "#060c12", border: `1px solid ${pal.dim}`, borderRadius: 6, color: pal.muted, fontSize: 11, padding: "8px 10px", fontFamily: "inherit", resize: "vertical", minHeight: 36, boxSizing: "border-box", outline: "none" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── CHECKLIST TAB ── */}
        {tab === "checklist" && (
          <div>
            <div style={{ background: pal.card, border: `1px solid ${pal.border}`, borderRadius: 12, padding: "14px 18px", marginBottom: 20, borderLeft: `4px solid ${pal.accent}` }}>
              <div style={{ fontWeight: 800, color: pal.accent, marginBottom: 6 }}>👁️ Site Observation Checklist</div>
              <div style={{ fontSize: 12, color: pal.muted, lineHeight: 1.8 }}>
                Do these silently while walking around. Don't announce what you're looking for. Your eyes tell you things the farmer won't.
              </div>
            </div>

            {[
              {
                cat: "🏚️ Shed Infrastructure", color: "#58a6ff",
                items: [
                  "Shed faces which direction? (N/S = better ventilation than E/W in Bangalore heat)",
                  "Roof type — tin sheet (heat trap), asbestos, concrete, open?",
                  "Floor condition — dry, wet, muddy, concrete, earthen?",
                  "Are cows standing in mud/manure for extended time? (hoof health risk)",
                  "Electric light available in shed? Any power outlet?",
                  "Is there a fan or cooling system?",
                  "Space per cow — crowded vs adequate (2.5m² per adult cow is minimum)",
                  "Separate sick pen / isolation area available?",
                ]
              },
              {
                cat: "🌾 Feed & Water Area", color: "#3fb950",
                items: [
                  "Feed trough condition — wood, concrete, open ground?",
                  "Is feed wasted on the floor? How much spillage?",
                  "Any cow being pushed away from feeder by dominant cow?",
                  "Water trough — type, size, cleanliness, algae presence",
                  "Is the trough auto-refill or manually filled? By whom?",
                  "PLASTIC ALERT: Count pieces of plastic visible in grazing / feeding area",
                  "Are cows foraging near road or garbage dump?",
                  "Salt lick block available?",
                  "Feed stored in secure location or open to rain/pests?",
                ]
              },
              {
                cat: "🐄 Animal Body Condition", color: "#f85149",
                items: [
                  "BCS (Body Condition Score) — are ribs visible? (score 1-5 mentally)",
                  "Any cow showing dull/cloudy eyes?",
                  "Any cow with nasal discharge?",
                  "Any cow with swollen joints or limping?",
                  "Is any cow standing separate from the herd?",
                  "Skin condition — patches, lesions, ticks, flies clustering?",
                  "Any visible mastitis signs — swollen quarter, udder asymmetry?",
                  "Tail condition — clean, matted with dung? (hygiene indicator)",
                  "Any recently calved cow? How does she look?",
                ]
              },
              {
                cat: "📍 Location & Environment", color: "#f0a500",
                items: [
                  "How far from nearest main road? (< 500m = plastic ingestion risk)",
                  "Open garbage dump within 1 km? (map it)",
                  "Any water body nearby? (canal, pond, nullah — flooding risk in monsoon)",
                  "Electricity supply — BESCOM reliability (frequent cuts?)",
                  "Jio/Airtel signal strength on your phone (check)",
                  "4G data speed test result (run a quick test)",
                  "GPS coordinate accuracy — check your maps app",
                  "Stray dog population visible? (estimate number)",
                  "Any wild animal signs — pugmarks, droppings near shed?",
                ]
              },
              {
                cat: "📱 Technology Readiness", color: "#bc8cff",
                items: [
                  "What phone does farmer use? Android/iPhone/feature phone?",
                  "WhatsApp usage — check if farmer has it",
                  "Is there a WiFi router anywhere on the farm?",
                  "Any other tech in use — weighing scale, milking machine, automated feeder?",
                  "Who handles the phone — farmer only or family members too?",
                  "Literacy level (can they read alerts, or do they need audio/pictogram alerts?)",
                ]
              },
              {
                cat: "👨‍👩‍👧 People & Process", color: "#ffa657",
                items: [
                  "How many people work here daily? Who is senior?",
                  "Are there children helping? What age?",
                  "Worker accommodation on-site or commuting?",
                  "Who milks — farmer, worker, or family member?",
                  "Who calls the vet — farmer or another decision maker?",
                  "Is there a record book / logbook anywhere on the farm?",
                  "Any government tagging (yellow NABL ear tag) already on cows?",
                ]
              },
            ].map((section, si) => (
              <div key={si} style={{ background: pal.card, border: `1px solid ${pal.border}`, borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
                <div style={{ padding: "12px 18px", borderBottom: `1px solid ${pal.border}`, background: section.color + "11" }}>
                  <span style={{ fontWeight: 800, color: section.color }}>{section.cat}</span>
                </div>
                <div style={{ padding: "6px 0" }}>
                  {section.items.map((item, ii) => {
                    const key = `obs-${si}-${ii}`;
                    const done = checked[key];
                    const isPlastic = item.toLowerCase().includes("plastic");
                    return (
                      <div key={ii} style={{ padding: "9px 18px", borderBottom: ii < section.items.length - 1 ? `1px solid ${pal.dim}` : "none", display: "flex", gap: 12, alignItems: "flex-start", background: done ? section.color + "08" : "none" }}>
                        <input type="checkbox" checked={!!done} onChange={() => toggle(key)} style={{ marginTop: 2, accentColor: section.color, cursor: "pointer", flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: done ? pal.muted : pal.text, lineHeight: 1.6, flex: 1, textDecoration: done ? "line-through" : "none" }}>
                          {isPlastic && <span style={{ background: "#f0a50033", color: "#f0a500", fontSize: 9, padding: "1px 5px", borderRadius: 4, marginRight: 6, fontWeight: 800 }}>⚠️ HIGH</span>}
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── MAPPER TAB ── */}
        {tab === "mapper" && (
          <div>
            <div style={{ background: pal.card, border: `1px solid ${pal.border}`, borderRadius: 12, padding: "14px 18px", marginBottom: 20, borderLeft: `4px solid ${pal.green}` }}>
              <div style={{ fontWeight: 800, color: pal.green, marginBottom: 6 }}>🎯 Problem → Product Mapper</div>
              <div style={{ fontSize: 12, color: pal.muted, lineHeight: 1.8 }}>
                After each farm visit, match what you observed to the right product variant. The same hardware with different sensors = different solutions for different farmers.
              </div>
            </div>

            {productMap.map((p, i) => (
              <div key={i} style={{ background: pal.card, border: `1px solid ${pal.border}`, borderRadius: 12, marginBottom: 12, overflow: "hidden" }}>
                <div style={{ padding: "12px 18px", borderBottom: `1px solid ${pal.border}`, background: p.color + "15", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: p.color }}>
                    🔎 {p.trigger}
                  </div>
                  <span style={{ background: p.color + "22", color: p.color, fontSize: 10, padding: "3px 10px", borderRadius: 20, fontWeight: 700 }}>
                    → {p.product}
                  </span>
                </div>
                <div style={{ padding: "12px 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: pal.muted, textTransform: "uppercase", marginBottom: 4 }}>Sensor Required</div>
                    <div style={{ fontSize: 12, color: pal.text, fontWeight: 600, background: pal.bg, padding: "6px 10px", borderRadius: 6 }}>⚙️ {p.sensor}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: pal.muted, textTransform: "uppercase", marginBottom: 4 }}>Why This Solves It</div>
                    <div style={{ fontSize: 12, color: pal.muted, lineHeight: 1.6 }}>{p.why}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* How to use this mapper */}
            <div style={{ background: pal.card, border: `1px solid #1e3a5a`, borderRadius: 12, padding: 18, marginTop: 8 }}>
              <div style={{ fontWeight: 800, color: "#79c0ff", marginBottom: 12, fontSize: 13 }}>📐 After 20 Farm Visits — How to Analyze</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
                {[
                  ["Count flags", "Which Q flags appeared most? The top 3 = your core product MVP features."],
                  ["Map plastic frequency", "If >50% farms show plastic hazard near grazing area → GPS geofence is a must-have, not nice-to-have."],
                  ["WTP average", "Average the answers to Q50 across all farms → this is your pricing anchor."],
                  ["Tech readiness score", "If >70% use WhatsApp on Android → SMS-first alert system works. If <40% → audio buzzer needed."],
                  ["Vet cost average", "Average Q8 + Q10 answers. This is your maximum acquisition cost (customer can pay up to 1 month's vet savings upfront)."],
                  ["Connectivity map", "Mark each farm's 4G signal on a map. Farms with poor signal → LoRaWAN gateway needed. Farms with good signal → cloud-direct works."],
                ].map(([title, desc]) => (
                  <div key={title} style={{ background: pal.bg, borderRadius: 8, padding: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: 11, color: "#79c0ff", marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: 11, color: pal.muted, lineHeight: 1.6 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      <div style={{ textAlign: "center", padding: 20, color: pal.dim, fontSize: 10, borderTop: `1px solid ${pal.border}` }}>
        Farm Visit Research Kit · Srujan · Bangalore · {new Date().getFullYear()}
      </div>
    </div>
  );
}