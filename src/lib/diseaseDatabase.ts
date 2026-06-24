// Comprehensive crop disease database with real agricultural data

export interface DiseaseInfo {
  id: string;
  crop: string;
  disease: string;
  scientificName: string;
  symptoms: string[];
  colorProfile: { brown: number; yellow: number; white: number; green: number; red: number; dark: number };
  organicTreatment: { steps: string[]; frequency: string };
  chemicalTreatment: { steps: string[]; frequency: string; waitPeriod: string };
  prevention: string[];
  recommendations: string[];
  severity: "Mild" | "Moderate" | "Severe";
  icon: string;
}

export const DISEASE_DATABASE: DiseaseInfo[] = [
  // ── RICE ──
  {
    id: "rice_blast",
    crop: "Rice",
    disease: "Rice Blast",
    scientificName: "Magnaporthe oryzae",
    symptoms: ["Brown spots with gray center", "Diamond-shaped lesions", "Wilting of infected leaves", "White to gray centers in spots"],
    colorProfile: { brown: 35, yellow: 10, white: 15, green: 30, red: 5, dark: 5 },
    organicTreatment: { steps: ["Apply Trichoderma viride @ 4g/kg seed treatment", "Spray neem oil (5ml/L) every 7 days", "Use Pseudomonas fluorescens @ 10g/L", "Apply compost tea as foliar spray"], frequency: "Every 7 days for 3 weeks" },
    chemicalTreatment: { steps: ["Spray Tricyclazole 75% WP @ 0.6g/L", "Alternatively use Isoprothiolane 40% EC @ 1.5ml/L", "Apply Carbendazim 50% WP @ 1g/L as preventive"], frequency: "2-3 sprays at 10-day intervals", waitPeriod: "21 days before harvest" },
    prevention: ["Use resistant varieties (Tetep, IR64)", "Avoid excess nitrogen fertilization", "Maintain proper water management", "Remove and destroy crop residues"],
    recommendations: ["Monitor field every 3-4 days", "If >25% leaves affected, apply chemical treatment", "Consider resistant variety for next season"],
    severity: "Severe",
    icon: "🌾",
  },
  {
    id: "rice_blight",
    crop: "Rice",
    disease: "Bacterial Leaf Blight",
    scientificName: "Xanthomonas oryzae pv. oryzae",
    symptoms: ["Yellow/orange stripes along leaf veins", "Wilting and drying of leaves", "Milky ooze drops on leaves", "V-shaped lesions from leaf tips"],
    colorProfile: { brown: 15, yellow: 45, white: 5, green: 25, red: 5, dark: 5 },
    organicTreatment: { steps: ["Spray Streptomycin sulphate @ 0.5g/L", "Apply copper oxychloride @ 3g/L", "Use neem cake @ 150kg/ha", "Drain excess water from field"], frequency: "Every 10 days" },
    chemicalTreatment: { steps: ["Apply Streptocycline 6g + Copper oxychloride 50g per 15L", "Spray Plantomycin @ 1g/L"], frequency: "2-3 sprays at 7-day intervals", waitPeriod: "14 days" },
    prevention: ["Use certified disease-free seeds", "Balanced NPK fertilization", "Proper spacing (20×15 cm)", "Avoid clipping leaf tips during transplanting"],
    recommendations: ["Reduce nitrogen application by 25%", "Ensure proper drainage", "Report to agricultural officer if widespread"],
    severity: "Severe",
    icon: "🌾",
  },
  {
    id: "rice_rust",
    crop: "Rice",
    disease: "Rice Rust",
    scientificName: "Puccinia recondita",
    symptoms: ["Orange powdery pustules on leaves", "Reddish-brown spots scattered", "Premature leaf drying", "Reduced grain filling"],
    colorProfile: { brown: 25, yellow: 15, white: 5, green: 30, red: 20, dark: 5 },
    organicTreatment: { steps: ["Spray neem oil @ 5ml/L water", "Apply Trichoderma harzianum @ 5g/L", "Use cow urine spray (1:10 dilution)", "Remove heavily infected leaves"], frequency: "Every 5-7 days" },
    chemicalTreatment: { steps: ["Apply Propiconazole 25% EC @ 1ml/L", "Alternatively spray Mancozeb 75% WP @ 2.5g/L", "Use Tebuconazole 25.9% EC @ 1ml/L"], frequency: "2 sprays at 15-day interval", waitPeriod: "28 days" },
    prevention: ["Grow resistant varieties", "Avoid late planting", "Maintain optimal plant density", "Destroy volunteer plants"],
    recommendations: ["Harvest early if severe infection", "Apply potassium to strengthen plants", "Monitor humidity levels"],
    severity: "Moderate",
    icon: "🌾",
  },
  {
    id: "rice_tungro",
    crop: "Rice",
    disease: "Rice Tungro",
    scientificName: "Rice tungro bacilliform virus (RTBV)",
    symptoms: ["Yellow-orange discoloration of leaves", "Stunted plant growth", "Reduced tillering", "Delayed flowering"],
    colorProfile: { brown: 10, yellow: 50, white: 5, green: 25, red: 5, dark: 5 },
    organicTreatment: { steps: ["Control green leafhopper vectors with neem sprays", "Use light traps to monitor vectors", "Apply neem seed kernel extract @ 5%", "Uproot and destroy infected plants"], frequency: "Weekly monitoring" },
    chemicalTreatment: { steps: ["Spray Imidacloprid 17.8% SL @ 0.5ml/L to control vectors", "Apply Thiamethoxam 25% WG @ 0.3g/L", "Seed treatment with Imidacloprid @ 7g/kg"], frequency: "As needed based on vector population", waitPeriod: "21 days" },
    prevention: ["Use Tungro-resistant varieties", "Synchronous planting in area", "Remove weed hosts", "Early planting recommended"],
    recommendations: ["No cure once infected - focus on prevention", "Remove infected plants immediately", "Report outbreak to extension officer"],
    severity: "Severe",
    icon: "🌾",
  },

  // ── TOMATO ──
  {
    id: "tomato_early_blight",
    crop: "Tomato",
    disease: "Early Blight",
    scientificName: "Alternaria solani",
    symptoms: ["Dark brown spots with concentric rings (target spots)", "Lower leaves affected first", "Yellowing around spots", "Premature defoliation"],
    colorProfile: { brown: 40, yellow: 20, white: 5, green: 25, red: 5, dark: 5 },
    organicTreatment: { steps: ["Spray Bordeaux mixture (1%) every 7 days", "Apply neem oil @ 5ml/L", "Use Trichoderma viride @ 4g/L", "Remove and burn infected leaves"], frequency: "Every 7 days for 3-4 weeks" },
    chemicalTreatment: { steps: ["Spray Mancozeb 75% WP @ 2.5g/L", "Apply Chlorothalonil 75% WP @ 2g/L", "Use Azoxystrobin 23% SC @ 1ml/L"], frequency: "3 sprays at 10-day intervals", waitPeriod: "14 days" },
    prevention: ["Practice 3-year crop rotation", "Mulch around plants to prevent splash", "Stake plants for air circulation", "Water at base, not on leaves"],
    recommendations: ["Remove lower branches touching soil", "Apply calcium to prevent blossom end rot", "Harvest fruit as soon as ripe"],
    severity: "Moderate",
    icon: "🍅",
  },
  {
    id: "tomato_late_blight",
    crop: "Tomato",
    disease: "Late Blight",
    scientificName: "Phytophthora infestans",
    symptoms: ["Water-soaked dark spots on leaves", "White fuzzy growth underneath leaves", "Brown lesions on stems", "Rapid plant collapse in wet weather"],
    colorProfile: { brown: 30, yellow: 10, white: 20, green: 25, red: 5, dark: 10 },
    organicTreatment: { steps: ["Apply copper hydroxide @ 2g/L", "Spray Bordeaux mixture (1%)", "Use biofungicide Bacillus subtilis", "Improve air circulation by pruning"], frequency: "Every 5-7 days during wet weather" },
    chemicalTreatment: { steps: ["Spray Metalaxyl + Mancozeb @ 2.5g/L", "Apply Cymoxanil + Mancozeb @ 3g/L", "Use Dimethomorph 50% WP @ 1g/L"], frequency: "Every 7 days in active disease period", waitPeriod: "14 days" },
    prevention: ["Avoid overhead irrigation", "Use resistant varieties", "Remove all volunteer plants", "Ensure good drainage"],
    recommendations: ["Act immediately - disease spreads rapidly", "Destroy all infected plant material", "Do NOT compost infected debris"],
    severity: "Severe",
    icon: "🍅",
  },
  {
    id: "tomato_powdery_mildew",
    crop: "Tomato",
    disease: "Powdery Mildew",
    scientificName: "Leveillula taurica",
    symptoms: ["White powdery coating on leaf surface", "Yellow patches on upper leaf surface", "Leaf curling and drying", "Reduced fruit size"],
    colorProfile: { brown: 10, yellow: 20, white: 40, green: 25, red: 0, dark: 5 },
    organicTreatment: { steps: ["Spray milk solution (1:9 milk:water)", "Apply sulfur dust @ 25kg/ha", "Use potassium bicarbonate @ 5g/L", "Neem oil spray @ 5ml/L"], frequency: "Every 7 days" },
    chemicalTreatment: { steps: ["Apply Hexaconazole 5% EC @ 2ml/L", "Spray Dinocap 48% EC @ 1ml/L", "Use Wettable sulfur @ 3g/L"], frequency: "2-3 sprays at 10-day intervals", waitPeriod: "7 days" },
    prevention: ["Ensure proper spacing (60×45 cm)", "Avoid excess nitrogen", "Grow resistant varieties", "Remove affected leaves early"],
    recommendations: ["Best treated early before full coverage", "Avoid spraying in very hot weather", "Combine organic and chemical for best results"],
    severity: "Mild",
    icon: "🍅",
  },
  {
    id: "tomato_mosaic",
    crop: "Tomato",
    disease: "Tomato Mosaic Virus",
    scientificName: "Tomato mosaic virus (ToMV)",
    symptoms: ["Yellow-green mosaic pattern on leaves", "Leaf distortion and curling", "Stunted plant growth", "Mottled fruit with uneven ripening"],
    colorProfile: { brown: 5, yellow: 35, white: 5, green: 45, red: 5, dark: 5 },
    organicTreatment: { steps: ["No direct cure - manage symptoms", "Remove and destroy infected plants", "Spray neem oil to control aphid vectors", "Apply compost tea for plant vigor"], frequency: "Ongoing management" },
    chemicalTreatment: { steps: ["Control aphid vectors with Imidacloprid 17.8 SL @ 0.3ml/L", "No chemical cure for virus itself", "Apply micronutrient spray for plant health"], frequency: "As needed for vector control", waitPeriod: "14 days" },
    prevention: ["Use certified virus-free seeds", "Disinfect tools with 10% bleach", "Control weeds that host virus", "Wash hands before handling plants"],
    recommendations: ["Remove infected plants immediately to prevent spread", "Use resistant varieties (TMV-resistant)", "Avoid tobacco products near plants"],
    severity: "Moderate",
    icon: "🍅",
  },

  // ── WHEAT ──
  {
    id: "wheat_leaf_rust",
    crop: "Wheat",
    disease: "Wheat Leaf Rust",
    scientificName: "Puccinia triticina",
    symptoms: ["Small reddish-brown pustules on upper leaf surface", "Pustules scattered randomly", "Orange spore masses", "Premature leaf death"],
    colorProfile: { brown: 30, yellow: 10, white: 5, green: 30, red: 25, dark: 0 },
    organicTreatment: { steps: ["Apply Trichoderma harzianum @ 5g/L", "Spray neem oil @ 5ml/L", "Use cow urine-based spray (1:10)", "Enhance plant immunity with seaweed extract"], frequency: "Every 7 days" },
    chemicalTreatment: { steps: ["Spray Propiconazole 25% EC @ 1ml/L", "Apply Tebuconazole 25.9% EC @ 1ml/L", "Use Triadimefon 25% WP @ 1g/L"], frequency: "2 sprays at 15-day interval", waitPeriod: "35 days" },
    prevention: ["Sow rust-resistant varieties", "Timely sowing (avoid late sowing)", "Destroy volunteer wheat plants", "Balanced fertilization"],
    recommendations: ["Scout fields weekly during susceptible stages", "Apply fungicide at first sign", "Late-sown wheat is more susceptible"],
    severity: "Moderate",
    icon: "🌾",
  },
  {
    id: "wheat_stripe_rust",
    crop: "Wheat",
    disease: "Stripe Rust",
    scientificName: "Puccinia striiformis",
    symptoms: ["Yellow stripes between leaf veins", "Linear arrangement of pustules", "Bright yellow spore masses", "Leaf tips dying first"],
    colorProfile: { brown: 10, yellow: 50, white: 5, green: 25, red: 5, dark: 5 },
    organicTreatment: { steps: ["Spray potassium bicarbonate @ 5g/L", "Apply sulfur dust @ 25kg/ha", "Use botanical extracts (garlic + chili)", "Enhance plant resistance with silicon spray"], frequency: "Every 7-10 days" },
    chemicalTreatment: { steps: ["Apply Propiconazole 25% EC @ 1ml/L", "Spray Tebuconazole + Trifloxystrobin", "Use Epoxiconazole 12.5% SC @ 1ml/L"], frequency: "1-2 sprays", waitPeriod: "35 days" },
    prevention: ["Grow resistant varieties (HD 2967, WH 1105)", "Timely sowing in November", "Avoid excess irrigation", "Destroy self-sown wheat"],
    recommendations: ["Most damaging in cool, humid conditions", "Apply fungicide before flag leaf stage", "Monitor weather forecasts for humid periods"],
    severity: "Severe",
    icon: "🌾",
  },
  {
    id: "wheat_powdery_mildew",
    crop: "Wheat",
    disease: "Powdery Mildew",
    scientificName: "Blumeria graminis f. sp. tritici",
    symptoms: ["White powdery patches on leaves and stems", "Yellowing beneath powdery growth", "Reduced grain size", "Poor grain filling"],
    colorProfile: { brown: 10, yellow: 15, white: 45, green: 25, red: 0, dark: 5 },
    organicTreatment: { steps: ["Spray milk solution (1:9)", "Apply wettable sulfur @ 3g/L", "Use potassium bicarbonate @ 5g/L", "Neem oil @ 3ml/L"], frequency: "Every 7 days" },
    chemicalTreatment: { steps: ["Apply Triadimefon 25% WP @ 1g/L", "Spray Hexaconazole 5% EC @ 2ml/L", "Use Carbendazim 50% WP @ 1g/L"], frequency: "2 sprays at 15-day interval", waitPeriod: "21 days" },
    prevention: ["Avoid dense planting", "Reduce nitrogen in cool weather", "Use resistant varieties", "Proper field sanitation"],
    recommendations: ["Common in cool, humid weather", "Treat early for best results", "Combine with potassium fertilization"],
    severity: "Mild",
    icon: "🌾",
  },

  // ── COTTON ──
  {
    id: "cotton_bacterial_blight",
    crop: "Cotton",
    disease: "Bacterial Blight",
    scientificName: "Xanthomonas citri pv. malvacearum",
    symptoms: ["Angular water-soaked spots on leaves", "Brown to black lesions", "Spots limited by leaf veins", "Premature boll opening"],
    colorProfile: { brown: 35, yellow: 15, white: 5, green: 30, red: 5, dark: 10 },
    organicTreatment: { steps: ["Spray Bordeaux mixture (1%)", "Apply copper oxychloride @ 3g/L", "Seed treatment with Trichoderma viride", "Remove and burn infected plants"], frequency: "Every 10 days" },
    chemicalTreatment: { steps: ["Spray Streptocycline @ 0.5g/L + Copper oxychloride @ 3g/L", "Apply Kasugamycin 3% SL @ 2ml/L", "Seed treatment with Carboxin @ 2g/kg"], frequency: "3 sprays at 10-day intervals", waitPeriod: "14 days" },
    prevention: ["Use acid-delinted certified seeds", "Hot water seed treatment (56°C, 30 min)", "Crop rotation with non-host crops", "Avoid working in wet fields"],
    recommendations: ["Most common in rainy season", "Avoid intercultivation when wet", "Use resistant varieties (Surabhi, LRA 5166)"],
    severity: "Moderate",
    icon: "🌿",
  },
  {
    id: "cotton_leaf_curl",
    crop: "Cotton",
    disease: "Cotton Leaf Curl Virus",
    scientificName: "Cotton leaf curl virus (CLCuV)",
    symptoms: ["Upward curling of leaves", "Thickened leaf veins (enations)", "Stunted plant growth", "Reduced boll formation"],
    colorProfile: { brown: 10, yellow: 25, white: 5, green: 50, red: 5, dark: 5 },
    organicTreatment: { steps: ["Control whitefly vectors with neem oil @ 5ml/L", "Use yellow sticky traps (25/ha)", "Apply Verticillium lecanii @ 5g/L", "Intercrop with maize as barrier"], frequency: "Weekly during whitefly season" },
    chemicalTreatment: { steps: ["Spray Imidacloprid 17.8% SL @ 0.3ml/L for whitefly", "Apply Thiamethoxam 25% WG @ 0.3g/L", "Alternate with Diafenthiuron 50% WP @ 1g/L"], frequency: "As needed based on whitefly count", waitPeriod: "14 days" },
    prevention: ["Use CLCuV-resistant Bt cotton varieties", "Early sowing (April-May)", "Remove ratoon cotton", "Destroy alternate hosts"],
    recommendations: ["No cure once infected - focus on vector control", "Early detection is critical", "Uproot severely infected plants"],
    severity: "Severe",
    icon: "🌿",
  },
  {
    id: "cotton_fusarium_wilt",
    crop: "Cotton",
    disease: "Fusarium Wilt",
    scientificName: "Fusarium oxysporum f. sp. vasinfectum",
    symptoms: ["Yellowing of leaves starting from edges", "Wilting despite adequate moisture", "Brown discoloration of vascular tissue", "Stunted growth and plant death"],
    colorProfile: { brown: 30, yellow: 30, white: 5, green: 20, red: 5, dark: 10 },
    organicTreatment: { steps: ["Soil application of Trichoderma viride @ 2.5kg/ha", "Seed treatment with Pseudomonas fluorescens", "Apply neem cake @ 150kg/ha", "Drenching with bio-fungicides"], frequency: "At sowing and 30 days after" },
    chemicalTreatment: { steps: ["Seed treatment with Carbendazim @ 2g/kg", "Soil drenching with Carbendazim @ 1g/L", "Apply Thiophanate-methyl @ 1g/L"], frequency: "2-3 applications", waitPeriod: "21 days" },
    prevention: ["Crop rotation with cereals for 3 years", "Use resistant varieties", "Improve soil drainage", "Balanced fertilization with potassium"],
    recommendations: ["Soil-borne disease - crop rotation essential", "Avoid fields with history of wilt", "Get soil tested before planting cotton"],
    severity: "Severe",
    icon: "🌿",
  },

  // ── GROUNDNUT ──
  {
    id: "groundnut_tikka",
    crop: "Groundnut",
    disease: "Tikka Disease (Cercospora Leaf Spot)",
    scientificName: "Cercospora arachidicola & Cercosporidium personatum",
    symptoms: ["Dark brown to black circular spots on leaves", "Spots with yellow halo", "Premature defoliation", "Spots on both leaf surfaces"],
    colorProfile: { brown: 35, yellow: 15, white: 5, green: 30, red: 5, dark: 10 },
    organicTreatment: { steps: ["Spray Bordeaux mixture (1%)", "Apply neem oil @ 5ml/L", "Use Trichoderma viride @ 4g/L", "Remove heavily infected leaves"], frequency: "Every 10 days" },
    chemicalTreatment: { steps: ["Spray Chlorothalonil 75% WP @ 2g/L", "Apply Mancozeb 75% WP @ 2.5g/L", "Use Carbendazim 50% WP @ 1g/L"], frequency: "3-4 sprays at 15-day intervals", waitPeriod: "14 days" },
    prevention: ["Use treated and certified seeds", "Practice crop rotation", "Optimal plant spacing", "Remove crop debris after harvest"],
    recommendations: ["Most common groundnut disease in India", "Start spraying at 30 days after sowing", "Combine with foliar nutrition"],
    severity: "Moderate",
    icon: "🥜",
  },
  {
    id: "groundnut_rust",
    crop: "Groundnut",
    disease: "Groundnut Rust",
    scientificName: "Puccinia arachidis",
    symptoms: ["Orange-brown pustules on leaf undersurface", "Reddish-brown powdery spores", "Premature leaf fall", "Reduced pod yield"],
    colorProfile: { brown: 25, yellow: 10, white: 5, green: 30, red: 25, dark: 5 },
    organicTreatment: { steps: ["Spray neem oil @ 5ml/L", "Apply sulfur dust @ 25kg/ha", "Use cow urine (1:10 dilution)", "Trichoderma application at sowing"], frequency: "Every 7-10 days" },
    chemicalTreatment: { steps: ["Spray Mancozeb 75% WP @ 2.5g/L", "Apply Chlorothalonil 75% WP @ 2g/L", "Use Triadimefon 25% WP @ 1g/L"], frequency: "3 sprays at 10-day intervals", waitPeriod: "21 days" },
    prevention: ["Use rust-resistant varieties (GPBD 4, ICGV 00350)", "Early sowing", "Remove weed hosts", "Avoid continuous groundnut cropping"],
    recommendations: ["Often occurs with Tikka disease", "Combined spray for both diseases recommended", "Late-sown crop more susceptible"],
    severity: "Moderate",
    icon: "🥜",
  },
  {
    id: "groundnut_stem_rot",
    crop: "Groundnut",
    disease: "Stem Rot",
    scientificName: "Sclerotium rolfsii",
    symptoms: ["Sudden wilting of plants", "White fungal growth at stem base", "Brown sclerotia (mustard-seed size) on stem", "Yellowing and collapse"],
    colorProfile: { brown: 30, yellow: 25, white: 20, green: 15, red: 0, dark: 10 },
    organicTreatment: { steps: ["Apply Trichoderma viride @ 2.5kg/ha with FYM", "Seed treatment with Trichoderma @ 4g/kg", "Deep ploughing in summer", "Apply neem cake @ 150kg/ha"], frequency: "At sowing and 30 days" },
    chemicalTreatment: { steps: ["Seed treatment with Thiram + Carbendazim (2:1) @ 3g/kg", "Soil drenching with Carbendazim @ 1g/L", "Apply PCNB @ 30kg/ha in furrows"], frequency: "At sowing and disease onset", waitPeriod: "21 days" },
    prevention: ["Deep summer ploughing", "Crop rotation with cereals", "Avoid excess irrigation", "Use raised bed planting"],
    recommendations: ["Soil-borne disease favored by high moisture", "Remove and destroy infected plants", "Improve field drainage"],
    severity: "Severe",
    icon: "🥜",
  },
];

// Healthy plant result
export const HEALTHY_RESULT: DiseaseInfo = {
  id: "healthy",
  crop: "General",
  disease: "Healthy Plant",
  scientificName: "No pathogen detected",
  symptoms: ["No visible disease symptoms", "Leaves appear green and vigorous", "Normal growth pattern observed"],
  colorProfile: { brown: 5, yellow: 5, white: 5, green: 75, red: 0, dark: 10 },
  organicTreatment: { steps: ["Continue regular watering schedule", "Apply organic compost every 30 days", "Use mulch to retain moisture", "Companion planting for pest deterrence"], frequency: "Regular maintenance" },
  chemicalTreatment: { steps: ["No chemical treatment needed", "Apply balanced NPK (10:26:26) @ 50kg/ha", "Micronutrient spray if deficiency signs appear"], frequency: "As per crop schedule", waitPeriod: "N/A" },
  prevention: ["Regular field monitoring every 3-4 days", "Maintain proper irrigation", "Balanced fertilization", "Keep weeds under control"],
  recommendations: ["Your crop looks healthy! Continue good practices", "Schedule next check in 7 days", "Maintain field hygiene"],
  severity: "Mild",
  icon: "✅",
};

// Sample images for testing (using colored canvas data URLs generated at runtime)
export interface SampleImage {
  id: string;
  label: string;
  description: string;
  expectedDisease: string;
  colors: { bg: string; spots: string; pattern: "dots" | "stripes" | "patches" | "clean" };
}

export const SAMPLE_IMAGES: SampleImage[] = [
  { id: "s1", label: "Rice Leaf (Brown Spots)", description: "Brown spots with gray centers", expectedDisease: "rice_blast", colors: { bg: "#4a7c3f", spots: "#8B4513", pattern: "dots" } },
  { id: "s2", label: "Tomato Leaf (Dark Rings)", description: "Dark concentric ring spots", expectedDisease: "tomato_early_blight", colors: { bg: "#3d6b35", spots: "#3e2723", pattern: "dots" } },
  { id: "s3", label: "Wheat Leaf (Yellow Stripes)", description: "Yellow stripes between veins", expectedDisease: "wheat_stripe_rust", colors: { bg: "#5a8a4e", spots: "#f9a825", pattern: "stripes" } },
  { id: "s4", label: "Cotton Leaf (White Powder)", description: "White powdery coating", expectedDisease: "tomato_powdery_mildew", colors: { bg: "#4e8043", spots: "#ffffff", pattern: "patches" } },
  { id: "s5", label: "Groundnut Leaf (Black Spots)", description: "Dark circular spots", expectedDisease: "groundnut_tikka", colors: { bg: "#3f7235", spots: "#1a1a1a", pattern: "dots" } },
  { id: "s6", label: "Healthy Green Leaf", description: "No visible disease", expectedDisease: "healthy", colors: { bg: "#2e7d32", spots: "#388e3c", pattern: "clean" } },
];

export function generateSampleCanvas(sample: SampleImage): string {
  const canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 300;
  const ctx = canvas.getContext("2d")!;

  // Background leaf color
  ctx.fillStyle = sample.colors.bg;
  ctx.fillRect(0, 0, 400, 300);

  // Add leaf vein texture
  ctx.strokeStyle = "rgba(0,0,0,0.1)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(200, 150);
    const angle = (i * Math.PI) / 4;
    ctx.lineTo(200 + Math.cos(angle) * 200, 150 + Math.sin(angle) * 150);
    ctx.stroke();
  }

  // Add disease pattern
  ctx.fillStyle = sample.colors.spots;
  if (sample.colors.pattern === "dots") {
    for (let i = 0; i < 15; i++) {
      const x = 50 + Math.random() * 300;
      const y = 40 + Math.random() * 220;
      const r = 5 + Math.random() * 15;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (sample.colors.pattern === "stripes") {
    for (let i = 0; i < 10; i++) {
      const y = 20 + i * 28;
      ctx.fillRect(30, y, 340, 6);
    }
  } else if (sample.colors.pattern === "patches") {
    for (let i = 0; i < 8; i++) {
      const x = 30 + Math.random() * 300;
      const y = 30 + Math.random() * 200;
      ctx.globalAlpha = 0.5;
      ctx.fillRect(x, y, 40 + Math.random() * 60, 30 + Math.random() * 40);
    }
    ctx.globalAlpha = 1;
  }
  // "clean" = no spots

  // Add some noise/texture
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 400;
    const y = Math.random() * 300;
    ctx.fillStyle = `rgba(${Math.random() > 0.5 ? 0 : 255},${Math.random() > 0.5 ? 0 : 255},0,0.03)`;
    ctx.fillRect(x, y, 3, 3);
  }

  return canvas.toDataURL("image/png");
}
