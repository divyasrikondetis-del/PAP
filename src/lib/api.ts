const BASE_URL = "http://localhost:8000/api";
const TIMEOUT_MS = 10000;
const MAX_RETRIES = 3;

function getToken(): string | null {
  return localStorage.getItem("pap_token");
}

function setToken(token: string) {
  localStorage.setItem("pap_token", token);
}

function setFarmerType(type: string) {
  localStorage.setItem("pap_farmer_type", type);
}

export function getFarmerType(): string | null {
  return localStorage.getItem("pap_farmer_type");
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

export function logout() {
  localStorage.removeItem("pap_token");
  localStorage.removeItem("pap_farmer_type");
}

// Response cache
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 60000; // 1 minute

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) return entry.data as T;
  cache.delete(key);
  return null;
}

function setCache(key: string, data: unknown) {
  cache.set(key, { data, timestamp: Date.now() });
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  retries = MAX_RETRIES,
  useCache = false
): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const cacheKey = `${options.method || "GET"}:${url}`;

  if (useCache && (!options.method || options.method === "GET")) {
    const cached = getCached<T>(cacheKey);
    if (cached) return cached;
  }

  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data = (await res.json()) as T;
    if (useCache) setCache(cacheKey, data);
    return data;
  } catch (err) {
    clearTimeout(timeout);
    if (retries > 0 && !(err instanceof DOMException && err.name === "AbortError")) {
      await new Promise((r) => setTimeout(r, 1000 * (MAX_RETRIES - retries + 1)));
      return request<T>(path, options, retries - 1, useCache);
    }
    throw err;
  }
}

// ── Auth ──
export async function login(phone: string): Promise<{ token: string; farmerType: string }> {
  const data = await request<{ token: string; farmerType: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ phone }),
  });
  setToken(data.token);
  if (data.farmerType) setFarmerType(data.farmerType);
  return data;
}

// ── Weather ──
export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  alerts: { title: string; severity: string; description: string }[];
}

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  return request<WeatherData>(`/weather/${lat}/${lon}`, {}, MAX_RETRIES, true);
}

// ── Prices ──
export interface CropPrice {
  crop: string;
  price: number;
  change: number;
  market: string;
}

export async function getPrices(): Promise<CropPrice[]> {
  return request<CropPrice[]>("/prices/current", {}, MAX_RETRIES, true);
}

// ── Disease Detection ──
export interface DetectionResult {
  disease: string;
  confidence: number;
  remedy: string;
}

export async function analyzeDisease(imageFile: File): Promise<DetectionResult> {
  const formData = new FormData();
  formData.append("image", imageFile);
  return request<DetectionResult>("/detection/analyze", {
    method: "POST",
    body: formData,
  });
}

// ── Equipment ──
export interface Equipment {
  name: string;
  price: number;
  distance: number;
  type?: string;
  rating?: number;
  owner?: string;
  available?: boolean;
}

export async function getNearbyEquipment(lat: number, lon: number): Promise<Equipment[]> {
  return request<Equipment[]>(`/equipment/nearby?lat=${lat}&lon=${lon}`, {}, MAX_RETRIES, true);
}

// ── Contacts ──
export interface EmergencyContact {
  type: string;
  phone: string;
  name: string;
}

export async function getEmergencyContacts(): Promise<EmergencyContact[]> {
  return request<EmergencyContact[]>("/contacts/emergency", {}, MAX_RETRIES, true);
}

// ── Scan History (localStorage) ──
export interface ScanRecord {
  id: string;
  date: string;
  image?: string;
  result: DetectionResult;
}

export function getScanHistory(): ScanRecord[] {
  try {
    return JSON.parse(localStorage.getItem("pap_scans") || "[]");
  } catch {
    return [];
  }
}

export function saveScanToHistory(result: DetectionResult, imageUrl?: string) {
  const history = getScanHistory();
  history.unshift({
    id: Date.now().toString(),
    date: new Date().toISOString(),
    image: imageUrl,
    result,
  });
  localStorage.setItem("pap_scans", JSON.stringify(history.slice(0, 50)));
}

// ── Mock data (fallback when API is unavailable) ──
export const MOCK_WEATHER: WeatherData = {
  temp: 32,
  condition: "Partly Cloudy",
  humidity: 65,
  alerts: [
    { title: "Heat Advisory", severity: "warning", description: "High temperatures expected. Ensure adequate irrigation." },
  ],
};

export const MOCK_PRICES: CropPrice[] = [
  { crop: "Rice", price: 2150, change: 2.5, market: "Azadpur Mandi" },
  { crop: "Wheat", price: 2275, change: -1.2, market: "Azadpur Mandi" },
  { crop: "Cotton", price: 6500, change: 3.8, market: "Rajkot Mandi" },
  { crop: "Sugarcane", price: 350, change: 0.5, market: "Kolhapur Mandi" },
  { crop: "Soybean", price: 4800, change: -2.1, market: "Indore Mandi" },
  { crop: "Maize", price: 1950, change: 1.7, market: "Davangere Mandi" },
  { crop: "Tomato", price: 45, change: 12.5, market: "Azadpur Mandi" },
  { crop: "Onion", price: 28, change: -5.3, market: "Lasalgaon Mandi" },
  { crop: "Potato", price: 18, change: 0.8, market: "Agra Mandi" },
  { crop: "Mustard", price: 5200, change: 4.2, market: "Jaipur Mandi" },
  { crop: "Groundnut", price: 5800, change: -0.9, market: "Junagadh Mandi" },
  { crop: "Turmeric", price: 12500, change: 6.1, market: "Erode Mandi" },
];

export const MOCK_EQUIPMENT: Equipment[] = [
  { name: "John Deere 5050D Tractor", price: 1500, distance: 2.3, type: "Tractor", rating: 4.5, owner: "Rajesh Kumar", available: true },
  { name: "Mahindra Rotavator", price: 800, distance: 4.1, type: "Tiller", rating: 4.2, owner: "Suresh Patel", available: true },
  { name: "Honda Water Pump WB30X", price: 500, distance: 1.8, type: "Pump", rating: 4.7, owner: "Anil Sharma", available: true },
  { name: "Stihl Backpack Sprayer", price: 300, distance: 3.5, type: "Sprayer", rating: 4.0, owner: "Vikram Singh", available: false },
  { name: "Kubota Combine Harvester", price: 3500, distance: 8.2, type: "Harvester", rating: 4.8, owner: "Mohan Reddy", available: true },
  { name: "Kirloskar Diesel Generator", price: 600, distance: 5.0, type: "Others", rating: 3.9, owner: "Deepak Joshi", available: true },
];

export const MOCK_CONTACTS: EmergencyContact[] = [
  { type: "Medical Emergency", phone: "108", name: "Ambulance Service" },
  { type: "Police", phone: "100", name: "Police Control Room" },
  { type: "Fire", phone: "101", name: "Fire Brigade" },
  { type: "Kisan Call Center", phone: "1800-180-1551", name: "Kisan Helpline" },
  { type: "Veterinary", phone: "1962", name: "Veterinary Helpline" },
  { type: "Disaster", phone: "1070", name: "Disaster Management" },
];

export const MOCK_DETECTION: DetectionResult = {
  disease: "Late Blight (Phytophthora infestans)",
  confidence: 94.7,
  remedy: "Apply Mancozeb 75% WP @ 2.5g/L or Metalaxyl + Mancozeb @ 2.5g/L. Remove and destroy infected leaves. Ensure proper spacing for air circulation. Apply preventive fungicide sprays during humid weather.",
};
