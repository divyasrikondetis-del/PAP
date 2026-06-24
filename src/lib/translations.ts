export type Lang = "en" | "te" | "hi" | "ta" | "kn";

const t: Record<string, Record<Lang, string>> = {
  // Navigation
  "nav.home": { en: "Home", te: "హోమ్", hi: "होम", ta: "முகப்பு", kn: "ಮುಖಪುಟ" },
  "nav.scan": { en: "Scan", te: "స్కాన్", hi: "स्कैन", ta: "ஸ்கேன்", kn: "ಸ್ಕ್ಯಾನ್" },
  "nav.market": { en: "Market", te: "మార్కెట్", hi: "बाज़ार", ta: "சந்தை", kn: "ಮಾರುಕಟ್ಟೆ" },
  "nav.equip": { en: "Equip", te: "పరికరాలు", hi: "उपकरण", ta: "உபகரணம்", kn: "ಉಪಕರಣ" },
  "nav.contacts": { en: "Help", te: "సహాయం", hi: "सहायता", ta: "உதவி", kn: "ಸಹಾಯ" },
  "nav.backToHome": { en: "← Back to Home", te: "← హోమ్‌కు తిరిగి", hi: "← होम पर वापस", ta: "← முகப்புக்கு", kn: "← ಮುಖಪುಟಕ್ಕೆ" },

  // Home page
  "home.title": { en: "CropDetection", te: "పంట గుర్తింపు", hi: "फसल पहचान", ta: "பயிர் கண்டறிதல்", kn: "ಬೆಳೆ ಗುರುತಿಸುವಿಕೆ" },
  "home.usingAI": { en: "Using AI", te: "AI ఉపయోగించి", hi: "AI का उपयोग", ta: "AI பயன்படுத்தி", kn: "AI ಬಳಸಿ" },
  "home.subtitle": { en: "Precision Agriculture Platform", te: "ప్రెసిషన్ అగ్రికల్చర్ ప్లాట్‌ఫామ్", hi: "सटीक कृषि मंच", ta: "துல்லிய வேளாண் தளம்", kn: "ನಿಖರ ಕೃಷಿ ವೇದಿಕೆ" },
  "home.desc": { en: "AI-powered farming assistant — detect crop diseases, check market prices, rent equipment & more", te: "AI ఆధారిత వ్యవసాయ సహాయకుడు — పంట వ్యాధులను గుర్తించండి, మార్కెట్ ధరలు చూడండి", hi: "AI संचालित कृषि सहायक — फसल रोगों का पता लगाएं, बाज़ार भाव देखें", ta: "AI வேளாண் உதவியாளர் — பயிர் நோய்களைக் கண்டறியுங்கள்", kn: "AI ಕೃಷಿ ಸಹಾಯಕ — ಬೆಳೆ ರೋಗಗಳನ್ನು ಪತ್ತೆ ಮಾಡಿ" },
  "home.chooseLang": { en: "Choose Language", te: "భాషను ఎంచుకోండి", hi: "भाषा चुनें", ta: "மொழியைத் தேர்ந்தெடு", kn: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ" },
  "home.explore": { en: "Explore Now", te: "ఇప్పుడు అన్వేషించండి", hi: "अभी जानें", ta: "இப்போது ஆராயுங்கள்", kn: "ಈಗ ಅನ್ವೇಷಿಸಿ" },
  "home.free": { en: "Free for everyone • No login needed", te: "అందరికీ ఉచితం • లాగిన్ అవసరం లేదు", hi: "सभी के लिए मुफ्त • लॉगिन की जरूरत नहीं", ta: "அனைவருக்கும் இலவசம் • உள்நுழைவு தேவையில்லை", kn: "ಎಲ್ಲರಿಗೂ ಉಚಿತ • ಲಾಗಿನ್ ಅಗತ್ಯವಿಲ್ಲ" },
  "home.whatWeOffer": { en: "What We Offer", te: "మేము ఏమి అందిస్తాము", hi: "हम क्या प्रदान करते हैं", ta: "நாங்கள் வழங்குவது", kn: "ನಾವು ಒದಗಿಸುವುದು" },
  "home.tapFeature": { en: "Tap any feature to explore", te: "అన్వేషించడానికి ఏదైనా ఫీచర్‌ను నొక్కండి", hi: "किसी भी फीचर पर टैप करें", ta: "அம்சத்தைத் தட்டுங்கள்", kn: "ವೈಶಿಷ್ಟ್ಯವನ್ನು ಟ್ಯಾಪ್ ಮಾಡಿ" },
  "home.open": { en: "Open", te: "తెరవండి", hi: "खोलें", ta: "திற", kn: "ತೆರೆ" },
  "home.howItWorks": { en: "How It Works", te: "ఇది ఎలా పనిచేస్తుంది", hi: "यह कैसे काम करता है", ta: "எப்படி வேலை செய்கிறது", kn: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ" },
  "home.weather": { en: "Current Weather", te: "ప్రస్తుత వాతావరణం", hi: "मौसम", ta: "தற்போதைய வானிலை", kn: "ಪ್ರಸ್ತುತ ಹವಾಮಾನ" },
  "home.yourLocation": { en: "📍 Your Location", te: "📍 మీ స్థానం", hi: "📍 आपका स्थान", ta: "📍 உங்கள் இடம்", kn: "📍 ನಿಮ್ಮ ಸ್ಥಳ" },

  // Features
  "feat.cropDetection": { en: "Crop Disease Detection", te: "పంట వ్యాధి గుర్తింపు", hi: "फसल रोग पहचान", ta: "பயிர் நோய் கண்டறிதல்", kn: "ಬೆಳೆ ರೋಗ ಗುರುತಿಸುವಿಕೆ" },
  "feat.cropDetectionDesc": { en: "AI-powered instant diagnosis", te: "AI ఆధారిత తక్షణ రోగ నిర్ధారణ", hi: "AI संचालित तत्काल निदान", ta: "AI உடனடி நோயறிதல்", kn: "AI ತ್ವರಿತ ರೋಗ ನಿರ್ಣಯ" },
  "feat.realtimePrices": { en: "Real-time Prices", te: "నిజ-సమయ ధరలు", hi: "रीयल-टाइम भाव", ta: "நிகழ்நேர விலைகள்", kn: "ನೈಜ-ಸಮಯ ಬೆಲೆಗಳು" },
  "feat.realtimePricesDesc": { en: "Live mandi rates updated daily", te: "ప్రతిరోజు నవీకరించబడే మండి ధరలు", hi: "प्रतिदिन अपडेट मंडी भाव", ta: "தினசரி புதுப்பிக்கப்படும் விலைகள்", kn: "ಪ್ರತಿದಿನ ನವೀಕರಿಸುವ ಮಂಡಿ ದರಗಳು" },
  "feat.equipRental": { en: "Equipment Rental", te: "పరికరాల అద్దె", hi: "उपकरण किराया", ta: "உபகரண வாடகை", kn: "ಉಪಕರಣ ಬಾಡಿಗೆ" },
  "feat.equipRentalDesc": { en: "Find nearby machinery", te: "సమీపంలోని యంత్రాలను కనుగొనండి", hi: "पास की मशीनरी खोजें", ta: "அருகிலுள்ள இயந்திரங்கள்", kn: "ಹತ್ತಿರದ ಯಂತ್ರೋಪಕರಣಗಳು" },
  "feat.helpSupport": { en: "Help & Support", te: "సహాయం & మద్దతు", hi: "सहायता", ta: "உதவி & ஆதரவு", kn: "ಸಹಾಯ & ಬೆಂಬಲ" },
  "feat.helpSupportDesc": { en: "Contacts & medical guidance", te: "సంప్రదింపులు & వైద్య మార్గదర్శకత్వం", hi: "संपर्क और चिकित्सा मार्गदर्शन", ta: "தொடர்புகள் & மருத்துவ வழிகாட்டல்", kn: "ಸಂಪರ್ಕ & ವೈದ್ಯಕೀಯ ಮಾರ್ಗದರ್ಶನ" },

  // How it works
  "how.step1": { en: "Upload or Scan", te: "అప్‌లోడ్ లేదా స్కాన్", hi: "अपलोड या स्कैन", ta: "பதிவேற்றம் அல்லது ஸ்கேன்", kn: "ಅಪ್‌ಲೋಡ್ ಅಥವಾ ಸ್ಕ್ಯಾನ್" },
  "how.step1Desc": { en: "Take a photo of your crop or upload from gallery", te: "మీ పంట ఫోటో తీయండి లేదా గ్యాలరీ నుండి అప్‌లోడ్ చేయండి", hi: "अपनी फसल की फोटो लें या गैलरी से अपलोड करें", ta: "உங்கள் பயிரின் புகைப்படம் எடுங்கள்", kn: "ನಿಮ್ಮ ಬೆಳೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ" },
  "how.step2": { en: "AI Analyzes", te: "AI విశ్లేషిస్తుంది", hi: "AI विश्लेषण", ta: "AI பகுப்பாய்வு", kn: "AI ವಿಶ್ಲೇಷಣೆ" },
  "how.step2Desc": { en: "Our AI model identifies diseases in seconds", te: "మా AI మోడల్ సెకన్లలో వ్యాధులను గుర్తిస్తుంది", hi: "हमारा AI सेकंडों में रोगों की पहचान करता है", ta: "எங்கள் AI நொடிகளில் நோய்களைக் கண்டறியும்", kn: "ನಮ್ಮ AI ಸೆಕೆಂಡುಗಳಲ್ಲಿ ರೋಗಗಳನ್ನು ಗುರುತಿಸುತ್ತದೆ" },
  "how.step3": { en: "Get Solution", te: "పరిష్కారం పొందండి", hi: "समाधान पाएं", ta: "தீர்வு பெறுங்கள்", kn: "ಪರಿಹಾರ ಪಡೆಯಿರಿ" },
  "how.step3Desc": { en: "Receive treatment recommendations instantly", te: "తక్షణ చికిత్స సిఫార్సులు పొందండి", hi: "तुरंत उपचार सिफारिशें प्राप्त करें", ta: "உடனடி சிகிச்சை பரிந்துரைகள்", kn: "ತ್ವರಿತ ಚಿಕಿತ್ಸಾ ಶಿಫಾರಸುಗಳು" },

  // Stats
  "stat.farmers": { en: "Farmers", te: "రైతులు", hi: "किसान", ta: "விவசாயிகள்", kn: "ರೈತರು" },
  "stat.crops": { en: "Crops", te: "పంటలు", hi: "फसलें", ta: "பயிர்கள்", kn: "ಬೆಳೆಗಳು" },
  "stat.accuracy": { en: "Accuracy", te: "ఖచ్చితత్వం", hi: "सटीकता", ta: "துல்லியம்", kn: "ನಿಖರತೆ" },
  "stat.diseases": { en: "Diseases", te: "వ్యాధులు", hi: "रोग", ta: "நோய்கள்", kn: "ರೋಗಗಳು" },

  // Dashboard
  "dash.welcome": { en: "Welcome 👋", te: "స్వాగతం 👋", hi: "स्वागत है 👋", ta: "வரவேற்பு 👋", kn: "ಸ್ವಾಗತ 👋" },
  "dash.dashboard": { en: "Dashboard", te: "డాష్‌బోర్డ్", hi: "डैशबोर्ड", ta: "டாஷ்போர்டு", kn: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್" },
  "dash.livePrices": { en: "Live Prices", te: "ప్రత్యక్ష ధరలు", hi: "लाइव भाव", ta: "நேரடி விலைகள்", kn: "ನೇರ ಬೆಲೆಗಳು" },
  "dash.viewAll": { en: "View All", te: "అన్నీ చూడండి", hi: "सभी देखें", ta: "அனைத்தும்", kn: "ಎಲ್ಲಾ ನೋಡಿ" },
  "dash.quickActions": { en: "Quick Actions", te: "శీఘ్ర చర్యలు", hi: "त्वरित कार्रवाई", ta: "விரைவு செயல்கள்", kn: "ತ್ವರಿತ ಕ್ರಿಯೆಗಳು" },
  "dash.scanCrop": { en: "Scan Crop", te: "పంట స్కాన్", hi: "फसल स्कैन", ta: "பயிர் ஸ்கேன்", kn: "ಬೆಳೆ ಸ್ಕ್ಯಾನ್" },
  "dash.emergency": { en: "Help", te: "సహాయం", hi: "सहायता", ta: "உதவி", kn: "ಸಹಾಯ" },
  "dash.alerts": { en: "Alerts", te: "హెచ్చరికలు", hi: "अलर्ट", ta: "எச்சரிக்கைகள்", kn: "ಎಚ್ಚರಿಕೆಗಳು" },
  "dash.recentScans": { en: "Recent Scans", te: "ఇటీవలి స్కాన్‌లు", hi: "हाल के स्कैन", ta: "சமீபத்திய ஸ்கேன்கள்", kn: "ಇತ್ತೀಚಿನ ಸ್ಕ್ಯಾನ್‌ಗಳು" },
  "dash.noScans": { en: "No scans yet. Try scanning a crop!", te: "ఇంకా స్కాన్‌లు లేవు. పంటను స్కాన్ చేయండి!", hi: "अभी तक कोई स्कैन नहीं। फसल स्कैन करें!", ta: "இன்னும் ஸ்கேன் இல்லை. பயிரை ஸ்கேன் செய்யுங்கள்!", kn: "ಇನ್ನೂ ಸ್ಕ್ಯಾನ್ ಇಲ್ಲ. ಬೆಳೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ!" },
  "dash.scanNow": { en: "Scan Now →", te: "ఇప్పుడు స్కాన్ చేయండి →", hi: "अभी स्कैन करें →", ta: "இப்போது ஸ்கேன் →", kn: "ಈಗ ಸ್ಕ್ಯಾನ್ →" },
  "dash.forecast": { en: "5-Day Forecast", te: "5-రోజుల సూచన", hi: "5 दिन का पूर्वानुमान", ta: "5 நாள் முன்னறிவிப்பு", kn: "5 ದಿನಗಳ ಮುನ್ಸೂಚನೆ" },
  "dash.enterLocation": { en: "Enter your location", te: "మీ స్థానాన్ని నమోదు చేయండి", hi: "अपना स्थान दर्ज करें", ta: "உங்கள் இடத்தை உள்ளிடுங்கள்", kn: "ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ" },
  "dash.locationDenied": { en: "Location access denied. Enter manually:", te: "స్థాన ప్రాప్యత నిరాకరించబడింది. మాన్యువల్‌గా నమోదు చేయండి:", hi: "स्थान पहुंच अस्वीकृत। मैन्युअल दर्ज करें:", ta: "இட அணுகல் மறுக்கப்பட்டது. கைமுறையாக உள்ளிடவும்:", kn: "ಸ್ಥಳ ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ. ಹಸ್ತಚಾಲಿತವಾಗಿ ನಮೂದಿಸಿ:" },

  // Scanner
  "scan.title": { en: "🔬 Crop Scanner", te: "🔬 పంట స్కానర్", hi: "🔬 फसल स्कैनर", ta: "🔬 பயிர் ஸ்கேனர்", kn: "🔬 ಬೆಳೆ ಸ್ಕ್ಯಾನರ್" },
  "scan.subtitle": { en: "Upload a photo to detect diseases instantly", te: "వ్యాధులను తక్షణంగా గుర్తించడానికి ఫోటో అప్‌లోడ్ చేయండి", hi: "रोगों का तुरंत पता लगाने के लिए फोटो अपलोड करें", ta: "நோய்களை உடனடியாக கண்டறிய புகைப்படம் பதிவேற்றுங்கள்", kn: "ರೋಗಗಳನ್ನು ತ್ವರಿತವಾಗಿ ಗುರುತಿಸಲು ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ" },
  "scan.takePhoto": { en: "Take a photo or upload an image", te: "ఫోటో తీయండి లేదా చిత్రాన్ని అప్‌లోడ్ చేయండి", hi: "फोटो लें या छवि अपलोड करें", ta: "புகைப்படம் எடுங்கள் அல்லது படத்தை பதிவேற்றுங்கள்", kn: "ಫೋಟೋ ತೆಗೆಯಿರಿ ಅಥವಾ ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ" },
  "scan.camera": { en: "Camera", te: "కెమెరా", hi: "कैमरा", ta: "கேமரா", kn: "ಕ್ಯಾಮೆರಾ" },
  "scan.upload": { en: "Upload", te: "అప్‌లోడ్", hi: "अपलोड", ta: "பதிவேற்றம்", kn: "ಅಪ್‌ಲೋಡ್" },
  "scan.sample": { en: "Sample", te: "నమూనా", hi: "नमूना", ta: "மாதிரி", kn: "ಮಾದರಿ" },
  "scan.analyze": { en: "Analyze Crop", te: "పంటను విశ్లేషించండి", hi: "फसल का विश्लेषण करें", ta: "பயிரை பகுப்பாய்வு செய்", kn: "ಬೆಳೆ ವಿಶ್ಲೇಷಣೆ" },
  "scan.processing": { en: "Processing image...", te: "చిత్రాన్ని ప్రాసెస్ చేస్తోంది...", hi: "छवि प्रसंस्करण...", ta: "படம் செயலாக்கம்...", kn: "ಚಿತ್ರ ಪ್ರಕ್ರಿಯೆ..." },
  "scan.runningAI": { en: "Running AI model...", te: "AI మోడల్ అమలు...", hi: "AI मॉडल चल रहा है...", ta: "AI மாதிரி இயங்குகிறது...", kn: "AI ಮಾದರಿ ಚಾಲನೆ..." },
  "scan.identifying": { en: "Identifying disease...", te: "వ్యాధిని గుర్తిస్తోంది...", hi: "रोग की पहचान...", ta: "நோயைக் கண்டறிகிறது...", kn: "ರೋಗ ಗುರುತಿಸಲಾಗುತ್ತಿದೆ..." },
  "scan.generating": { en: "Generating recommendations...", te: "సిఫార్సులను రూపొందిస్తోంది...", hi: "सिफारिशें तैयार...", ta: "பரிந்துரைகள் உருவாக்கம்...", kn: "ಶಿಫಾರಸುಗಳು ರಚಿಸಲಾಗುತ್ತಿದೆ..." },
  "scan.confidence": { en: "Confidence Score", te: "విశ్వాస స్కోర్", hi: "विश्वास स्कोर", ta: "நம்பிக்கை மதிப்பெண்", kn: "ವಿಶ್ವಾಸ ಅಂಕ" },
  "scan.scanAgain": { en: "Scan Again", te: "మళ్ళీ స్కాన్", hi: "फिर से स्कैन", ta: "மீண்டும் ஸ்கேன்", kn: "ಮತ್ತೆ ಸ್ಕ್ಯಾನ್" },
  "scan.saved": { en: "Saved ✓", te: "సేవ్ చేయబడింది ✓", hi: "सहेजा गया ✓", ta: "சேமிக்கப்பட்டது ✓", kn: "ಉಳಿಸಲಾಗಿದೆ ✓" },
  "scan.organic": { en: "🌿 Organic", te: "🌿 సేంద్రీయ", hi: "🌿 जैविक", ta: "🌿 இயற்கை", kn: "🌿 ಸಾವಯವ" },
  "scan.chemical": { en: "🧪 Chemical", te: "🧪 రసాయన", hi: "🧪 रासायनिक", ta: "🧪 இரசாயன", kn: "🧪 ರಾಸಾಯನಿಕ" },
  "scan.prevent": { en: "🛡️ Prevent", te: "🛡️ నివారణ", hi: "🛡️ रोकथाम", ta: "🛡️ தடுப்பு", kn: "🛡️ ತಡೆಗಟ್ಟುವಿಕೆ" },

  // Market
  "market.title": { en: "📊 Market Prices", te: "📊 మార్కెట్ ధరలు", hi: "📊 बाज़ार भाव", ta: "📊 சந்தை விலைகள்", kn: "📊 ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು" },
  "market.subtitle": { en: "Live mandi rates near you", te: "మీ సమీపంలో మండి ధరలు", hi: "आपके पास मंडी भाव", ta: "உங்கள் அருகிலுள்ள மண்டி விலைகள்", kn: "ನಿಮ್ಮ ಹತ್ತಿರದ ಮಂಡಿ ದರಗಳು" },
  "market.searchCrops": { en: "Search crops...", te: "పంటలను శోధించండి...", hi: "फसलें खोजें...", ta: "பயிர்களைத் தேடு...", kn: "ಬೆಳೆಗಳನ್ನು ಹುಡುಕಿ..." },
  "market.all": { en: "All", te: "అన్నీ", hi: "सभी", ta: "அனைத்தும்", kn: "ಎಲ್ಲಾ" },
  "market.grains": { en: "Grains", te: "ధాన్యాలు", hi: "अनाज", ta: "தானியங்கள்", kn: "ಧಾನ್ಯಗಳು" },
  "market.vegetables": { en: "Vegetables", te: "కూరగాయలు", hi: "सब्जियां", ta: "காய்கறிகள்", kn: "ತರಕಾರಿಗಳು" },
  "market.cashCrops": { en: "Cash Crops", te: "వాణిజ్య పంటలు", hi: "नकदी फसलें", ta: "பணப்பயிர்கள்", kn: "ವಾಣಿಜ್ಯ ಬೆಳೆಗಳು" },
  "market.spices": { en: "Spices", te: "సుగంధ ద్రవ్యాలు", hi: "मसाले", ta: "மசாலாப் பொருட்கள்", kn: "ಸಂಬಾರ ಪದಾರ್ಥಗಳು" },
  "market.perKg": { en: "₹/kg", te: "₹/కేజీ", hi: "₹/किग्रा", ta: "₹/கிலோ", kn: "₹/ಕೆಜಿ" },
  "market.perQuintal": { en: "₹/quintal", te: "₹/క్వింటాల్", hi: "₹/क्विंटल", ta: "₹/குவிண்டால்", kn: "₹/ಕ್ವಿಂಟಲ್" },
  "market.allMarkets": { en: "All Markets", te: "అన్ని మార్కెట్లు", hi: "सभी बाज़ार", ta: "அனைத்து சந்தைகள்", kn: "ಎಲ್ಲಾ ಮಾರುಕಟ್ಟೆಗಳು" },
  "market.within10": { en: "Within 10km", te: "10కిమీ లోపల", hi: "10 किमी के भीतर", ta: "10கிமீ உள்ளே", kn: "10 ಕಿಮೀ ಒಳಗೆ" },
  "market.within25": { en: "Within 25km", te: "25కిమీ లోపల", hi: "25 किमी के भीतर", ta: "25கிமீ உள்ளே", kn: "25 ಕಿಮೀ ಒಳಗೆ" },
  "market.within50": { en: "Within 50km", te: "50కిమీ లోపల", hi: "50 किमी के भीतर", ta: "50கிமீ உள்ளே", kn: "50 ಕಿಮೀ ಒಳಗೆ" },
  "market.nearbyMarkets": { en: "Nearby Markets", te: "సమీపంలోని మార్కెట్లు", hi: "निकटवर्ती बाज़ार", ta: "அருகிலுள்ள சந்தைகள்", kn: "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳು" },
  "market.km": { en: "km away", te: "కిమీ దూరం", hi: "किमी दूर", ta: "கிமீ தூரம்", kn: "ಕಿಮೀ ದೂರ" },
  "market.updatedAgo": { en: "Updated just now", te: "ఇప్పుడే నవీకరించబడింది", hi: "अभी अपडेट हुआ", ta: "இப்போதே புதுப்பிக்கப்பட்டது", kn: "ಈಗಷ್ಟೇ ನವೀಕರಿಸಲಾಗಿದೆ" },

  // Equipment
  "equip.title": { en: "🚜 Equipment Rental", te: "🚜 పరికరాల అద్దె", hi: "🚜 उपकरण किराया", ta: "🚜 உபகரண வாடகை", kn: "🚜 ಉಪಕರಣ ಬಾಡಿಗೆ" },
  "equip.subtitle": { en: "Find and rent machinery nearby", te: "సమీపంలో యంత్రాలను కనుగొని అద్దెకు తీసుకోండి", hi: "पास की मशीनरी खोजें और किराए पर लें", ta: "அருகிலுள்ள இயந்திரங்களை கண்டுபிடித்து வாடகைக்கு எடுங்கள்", kn: "ಹತ್ತಿರದ ಯಂತ್ರೋಪಕರಣಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಬಾಡಿಗೆಗೆ ಪಡೆಯಿರಿ" },
  "equip.search": { en: "Search equipment...", te: "పరికరాలను శోధించండి...", hi: "उपकरण खोजें...", ta: "உபகரணங்களைத் தேடு...", kn: "ಉಪಕರಣ ಹುಡುಕಿ..." },
  "equip.details": { en: "Details", te: "వివరాలు", hi: "विवरण", ta: "விவரங்கள்", kn: "ವಿವರಗಳು" },
  "equip.bookNow": { en: "Book Now", te: "ఇప్పుడు బుక్ చేయండి", hi: "अभी बुक करें", ta: "இப்போது புக் செய்", kn: "ಈಗ ಬುಕ್ ಮಾಡಿ" },
  "equip.unavailable": { en: "Unavailable", te: "అందుబాటులో లేదు", hi: "अनुपलब्ध", ta: "கிடைக்காது", kn: "ಲಭ್ಯವಿಲ್ಲ" },
  "equip.perDay": { en: "/day", te: "/రోజు", hi: "/दिन", ta: "/நாள்", kn: "/ದಿನ" },
  "equip.bookEquip": { en: "Book Equipment", te: "పరికరాన్ని బుక్ చేయండి", hi: "उपकरण बुक करें", ta: "உபகரணத்தை புக் செய்", kn: "ಉಪಕರಣ ಬುಕ್ ಮಾಡಿ" },
  "equip.days": { en: "Number of days", te: "రోజుల సంఖ్య", hi: "दिनों की संख्या", ta: "நாட்களின் எண்ணிக்கை", kn: "ದಿನಗಳ ಸಂಖ್ಯೆ" },
  "equip.confirm": { en: "Confirm Booking", te: "బుకింగ్ నిర్ధారించండి", hi: "बुकिंग पुष्टि करें", ta: "முன்பதிவை உறுதிப்படுத்து", kn: "ಬುಕಿಂಗ್ ದೃಢೀಕರಿಸಿ" },
  "equip.call": { en: "Call", te: "కాల్", hi: "कॉल", ta: "அழைப்பு", kn: "ಕರೆ" },
  "equip.chat": { en: "Chat", te: "చాట్", hi: "चैट", ta: "அரட்டை", kn: "ಚಾಟ್" },
  "equip.book": { en: "Book", te: "బుక్", hi: "बुक", ta: "புக்", kn: "ಬುಕ್" },

  // Contacts
  "contacts.title": { en: "🩺 Help & Contacts", te: "🩺 సహాయం & సంప్రదింపులు", hi: "🩺 सहायता & संपर्क", ta: "🩺 உதவி & தொடர்புகள்", kn: "🩺 ಸಹಾಯ & ಸಂಪರ್ಕ" },
  "contacts.subtitle": { en: "Medical guidance, advisory & helplines", te: "వైద్య మార్గదర్శకత్వం, సలహా & హెల్ప్‌లైన్లు", hi: "चिकित्सा मार्गदर्शन, सलाह और हेल्पलाइन", ta: "மருத்துவ வழிகாட்டல், ஆலோசனை & உதவி எண்கள்", kn: "ವೈದ್ಯಕೀಯ ಮಾರ್ಗದರ್ಶನ, ಸಲಹೆ & ಸಹಾಯವಾಣಿ" },
  "contacts.medicalFirst": { en: "🏥 First Aid Guide", te: "🏥 ప్రథమ చికిత్స గైడ్", hi: "🏥 प्राथमिक चिकित्सा गाइड", ta: "🏥 முதலுதவி வழிகாட்டி", kn: "🏥 ಪ್ರಥಮ ಚಿಕಿತ್ಸಾ ಮಾರ್ಗದರ್ಶಿ" },
  "contacts.cropAdvisory": { en: "🌾 Crop Advisory", te: "🌾 పంట సలహా", hi: "🌾 फसल सलाह", ta: "🌾 பயிர் ஆலோசனை", kn: "🌾 ಬೆಳೆ ಸಲಹೆ" },
  "contacts.nearbyExperts": { en: "👨‍🌾 Nearby Experts", te: "👨‍🌾 సమీపంలోని నిపుణులు", hi: "👨‍🌾 निकटवर्ती विशेषज्ञ", ta: "👨‍🌾 அருகிலுள்ள நிபுணர்கள்", kn: "👨‍🌾 ಹತ್ತಿರದ ತಜ್ಞರು" },
  "contacts.vetContacts": { en: "🐄 Veterinary", te: "🐄 పశు వైద్యం", hi: "🐄 पशु चिकित्सा", ta: "🐄 கால்நடை மருத்துவம்", kn: "🐄 ಪಶುವೈದ್ಯ" },
  "contacts.govHelplines": { en: "📞 Government Helplines", te: "📞 ప్రభుత్వ హెల్ప్‌లైన్లు", hi: "📞 सरकारी हेल्पलाइन", ta: "📞 அரசு உதவி எண்கள்", kn: "📞 ಸರ್ಕಾರಿ ಸಹಾಯವಾಣಿ" },
  "contacts.callDoctor": { en: "📞 Call Doctor", te: "📞 డాక్టర్‌కు కాల్", hi: "📞 डॉक्टर को कॉल", ta: "📞 மருத்துவரை அழை", kn: "📞 ವೈದ್ಯರಿಗೆ ಕರೆ" },
  "contacts.symptoms": { en: "Symptoms", te: "లక్షణాలు", hi: "लक्षण", ta: "அறிகுறிகள்", kn: "ಲಕ್ಷಣಗಳು" },
  "contacts.immediateSteps": { en: "Immediate Steps", te: "తక్షణ చర్యలు", hi: "तत्काल कदम", ta: "உடனடி நடவடிக்கைகள்", kn: "ತಕ್ಷಣದ ಕ್ರಮಗಳು" },
  "contacts.callNow": { en: "Call Now", te: "ఇప్పుడు కాల్ చేయండి", hi: "अभी कॉल करें", ta: "இப்போது அழை", kn: "ಈಗ ಕರೆ ಮಾಡಿ" },
  "contacts.whatsapp": { en: "WhatsApp", te: "వాట్సాప్", hi: "व्हाट्सएप", ta: "வாட்ஸ்அப்", kn: "ವಾಟ್ಸಾಪ್" },
  "contacts.filterByCrop": { en: "Filter by crop", te: "పంట వారీగా ఫిల్టర్", hi: "फसल के अनुसार फ़िल्टर", ta: "பயிர் வாரியாக வடிகட்டு", kn: "ಬೆಳೆ ಪ್ರಕಾರ ಫಿಲ್ಟರ್" },
  "contacts.available": { en: "Available", te: "అందుబాటులో", hi: "उपलब्ध", ta: "கிடைக்கும்", kn: "ಲಭ್ಯ" },
  "contacts.directions": { en: "Directions", te: "దిశలు", hi: "दिशा-निर्देश", ta: "வழிகாட்டுதல்கள்", kn: "ನಿರ್ದೇಶನಗಳು" },
};

export function tr(key: string, lang: string): string {
  const entry = t[key];
  if (!entry) return key;
  return entry[lang as Lang] || entry.en || key;
}
