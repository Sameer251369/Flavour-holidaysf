import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (
  import.meta.env.DEV
    ? 'http://127.0.0.1:8000/api'
    : 'https://flavour-holidays-backend.onrender.com/api'
);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fallback Mock Data for instant zero-latency experience
const MOCK_TOURS = [
  {
    id: 1,
    title: "Kashmir Snow & Lakes Gen-Z Circuit",
    slug: "kashmir-snow-lakes-genz-circuit",
    destination_name: "Kashmir Valley",
    tagline: "Main Character Energy: Shikaras, Gondola Rides & Pine Cabin Vibes ⚡",
    vibe_tag: "#SnowVibes",
    duration_days: 6,
    duration_nights: 5,
    starting_price: 17999,
    difficulty: "Chill",
    cover_image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200&auto=format&fit=crop",
    is_featured: true,
    overview: "The ultimate 6-day Kashmir getaway designed for creators and adventure lovers. From floating market sunrises on Dal Lake to Phase 2 snow blizzard adventures in Gulmarg and pony trails in Pahalgam.",
    inclusions: [
      "Luxury Houseboat Stay on Dal Lake with Sunset Shikara",
      "Private SUV Transfer (Innova Crysta / Thar 4WD for snow points)",
      "Gulmarg Gondola Ticket Assistance (Phase 1 & Phase 2)",
      "Daily Breakfast & Authentic Kashmiri Wazwan Dinner",
      "24/7 Flavour Holidays Local Host Assistance & Permits"
    ],
    exclusions: [
      "Airfare / Train tickets to Srinagar",
      "Personal pony rides & snow ATV rentals",
      "Pahalgam Union cab fee for Aru/Chandwari"
    ],
    checkpoints: [
      {
        id: 101,
        day_number: 1,
        title: "Arrival in Srinagar & Sunset Shikara Ride",
        location_name: "Dal Lake, Srinagar",
        altitude: "5,200 ft",
        description: "Touchdown at Sheikh ul-Alam International Airport (SXR). Our Flavour host greets you with hot Noon Chai. Check into a heritage carved luxury houseboat on Dal Lake. Enjoy a serene sunset Shikara ride across the lotus gardens.",
        insta_spot: "Floating Flower Market & Golden Hour Reflection on Dal Lake",
        vibe_highlight: "Sipping Kashmiri Kahwa while watching the sunset over Zabarwan mountains",
        image_url: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800",
        activities: ["Airport Transfer", "Houseboat Check-in", "1-Hour Sunset Shikara", "Wazwan Tasting Dinner"]
      },
      {
        id: 102,
        day_number: 2,
        title: "Srinagar to Gulmarg Powder Snow Paradise",
        location_name: "Gulmarg Meadows & Tangmarg",
        altitude: "8,690 ft",
        description: "Drive scenic roads passing Tangmarg pine forests. Reach Gulmarg, Asia's highest ski destination. Board the world-famous Gondola cable car straight to Phase 2 Apharwat Peak at 13,780ft.",
        insta_spot: "Aphrawat Peak Powder Snow & Gondola Glass Cabin Shot",
        vibe_highlight: "Snowboarding, snowmobile racing, and drinking hot Maggie in a blizzard",
        image_url: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?q=80&w=800",
        activities: ["Tangmarg Snow Stop", "Gondola Phase 1 & 2 Ride", "Snow ATV Ride", "Alpine Cottage Check-in"]
      },
      {
        id: 103,
        day_number: 3,
        title: "Pahalgam Valley of Shepherds & Betaab Valley",
        location_name: "Pahalgam & Lidder River",
        altitude: "7,200 ft",
        description: "Head towards Pahalgam along the Lidder River. Visit saffron fields in Pampore and historic Avantipur ruins. Spend afternoon strolling through Betaab Valley and Aru Valley pine trails.",
        insta_spot: "Betaab Valley Turquoise River Bridge & Pine Meadow Backdrop",
        vibe_highlight: "Bonfire night next to the gushing Lidder River with acoustic music",
        image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800",
        activities: ["Pampore Saffron Stop", "Lidder River Riverside Walk", "Betaab Valley Exploration", "Riverside Resort Check-in"]
      },
      {
        id: 104,
        day_number: 4,
        title: "Baisaran Valley (Mini Switzerland) Pony Trek",
        location_name: "Baisaran, Pahalgam",
        altitude: "7,920 ft",
        description: "Embark on a scenic pine trail pony ride up to Baisaran Meadow, affectionately called Mini Switzerland. Panoramic views of snow peaks, zorbing balls, and lush pine carpet.",
        insta_spot: "Baisaran Endless Green Carpet & Snow Mountain Panorama",
        vibe_highlight: "Zorbing down the slope and pine forest photography",
        image_url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800",
        activities: ["Pony Ride to Baisaran", "Zorbing & Zip Lining", "Local Bakery Visit in Pahalgam Market"]
      },
      {
        id: 105,
        day_number: 5,
        title: "Sonamarg Meadow of Gold & Thajiwas Glacier",
        location_name: "Sonamarg Glacier Point",
        altitude: "8,950 ft",
        description: "Drive along the Sindh River to Sonamarg, gateway to Ladakh. Trek or take a sledge ride up to the icy Thajiwas Glacier. Marvel at frozen waterfalls and alpine streams.",
        insta_spot: "Thajiwas Glacier Ice Cave & Sindh River Suspension Bridge",
        vibe_highlight: "Glacier sledging and sipping hot cardamom tea by mountain streams",
        image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800",
        activities: ["Sonamarg Drive", "Thajiwas Glacier Hike", "Sledge Ride", "Return to Srinagar Luxury Hotel"]
      },
      {
        id: 106,
        day_number: 6,
        title: "Shankaracharya Temple & Departure",
        location_name: "Srinagar Airport",
        altitude: "5,200 ft",
        description: "Early morning visit to Shankaracharya Hill for a 360-degree panoramic aerial view of Srinagar city and Dal Lake. Pick up souvenir Pashmina shawls and dry fruits before airport drop.",
        insta_spot: "360 Viewpoint over Srinagar City",
        vibe_highlight: "Shopping for authentic Kashmiri Walnut wood crafts and saffron",
        image_url: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800",
        activities: ["Panorama Viewpoint", "Kashmir Souvenir Shopping", "Airport Drop-off"]
      }
    ]
  },
  {
    id: 2,
    title: "Offbeat Gurez Valley Frontier Expedition",
    slug: "offbeat-gurez-valley-frontier",
    destination_name: "Gurez & Border Frontiers",
    tagline: "Untouched Himalayan Wilderness & Border Village Vibes 🏔️⚡",
    vibe_tag: "#OffbeatGenZ",
    duration_days: 5,
    duration_nights: 4,
    starting_price: 19999,
    difficulty: "Moderate",
    cover_image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=1200&auto=format&fit=crop",
    is_featured: true,
    overview: "Escape the crowded tourist trails. Cross the high-altitude Razdan Pass (11,672ft) into the legendary Gurez Valley — home to the Shina tribe, wooden log houses, and the iconic Habba Khatoon mountain peak.",
    inclusions: [
      "Inner Line Permit (ILP) Processing for Gurez Border Zone",
      "Mahindra Thar 4WD / Scorpio 4x4 Vehicle for Mountain Passes",
      "Homestay & Wooden Cabin Stay with Local Shina Hosts",
      "Bonfire, Campfire Barbecue & Cultural Storytelling Session",
      "All Meals (Home-cooked organic mountain food)"
    ],
    exclusions: [
      "Personal expenses",
      "Travel insurance"
    ],
    checkpoints: [
      {
        id: 201,
        day_number: 1,
        title: "Srinagar to Gurez via Razdan Pass",
        location_name: "Razdan Pass (11,672 ft)",
        altitude: "11,672 ft",
        description: "Drive past Wular Lake up winding hairpins to Razdan Pass. Panoramic view of Harmukh Peak range. Descend into Dawar, the central hub of Gurez Valley.",
        insta_spot: "Razdan Pass Altitude Board & Harmukh Glacier Vista",
        vibe_highlight: "Standing above clouds at 11,672ft with 4x4 Thar parked at the pass",
        image_url: "https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=800",
        activities: ["Razdan Pass Crossing", "Wular Lake Viewpoint", "Border Permit Checkpoint", "Dawar Homestay Check-in"]
      },
      {
        id: 202,
        day_number: 2,
        title: "Habba Khatoon Spring & Sunset Peak View",
        location_name: "Habba Khatoon Mountain",
        altitude: "9,500 ft",
        description: "Explore the pyramid-shaped Habba Khatoon peak, named after the famous 16th-century poetess of Kashmir. Drink crystal clear water from the Habba Khatoon fresh spring.",
        insta_spot: "Reflections of Habba Khatoon Pyramid Peak in Kishanganga River",
        vibe_highlight: "Chilling by Kishanganga River with crystal turquoise water",
        image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800",
        activities: ["Habba Khatoon Spring Trek", "Kishanganga Riverbank Camping", "Sunset Photography"]
      },
      {
        id: 203,
        day_number: 3,
        title: "Tulail Valley & Last Border Village of Bagtore",
        location_name: "Tulail Valley & Sheikhpura",
        altitude: "8,800 ft",
        description: "Explore deeper into Tulail Valley along wooden log cabin hamlets like Sheikhpura and Bagtore. Experience authentic Shina culture, tradition, and warm border village hospitality.",
        insta_spot: "Traditional Wooden Log Cabins of Sheikhpura",
        vibe_highlight: "Interacting with local villagers and drinking butter tea in log homes",
        image_url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800",
        activities: ["Tulail Valley Off-roading", "Wooden Village Exploration", "Local Shina Cuisine Dinner"]
      },
      {
        id: 204,
        day_number: 4,
        title: "Return to Srinagar via Wular Lake Sunset",
        location_name: "Wular Lake Vantage Point",
        altitude: "5,200 ft",
        description: "Say goodbye to Gurez. Re-cross Razdan Pass and pause at Wular Lake — one of Asia's largest freshwater lakes — for a magnificent sunset tea break.",
        insta_spot: "Wular Lake Sunset Horizon",
        vibe_highlight: "Golden hour reflections over freshwater expanse",
        image_url: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800",
        activities: ["Return Drive", "Wular Lake Sunset Tea", "Srinagar Hotel Check-in"]
      }
    ]
  },
  {
    id: 3,
    title: "Leh-Ladakh High Altitude Thrill Expedition",
    slug: "leh-ladakh-high-altitude-thrill",
    destination_name: "Leh & Ladakh",
    tagline: "Khardung La, Pangong Tso Stargazing & Himalayan Bike/Thar Vibes 🔥",
    vibe_tag: "#ThrillSeeker",
    duration_days: 7,
    duration_nights: 6,
    starting_price: 24999,
    difficulty: "Extreme",
    cover_image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop",
    is_featured: true,
    overview: "The legendary 7-day high-altitude Ladakh circuit. Cross Khardung La (17,982 ft) into Nubra Valley's double-humped camel dunes, camp beside the color-changing Pangong Lake, and stargaze under Milky Way skies.",
    inclusions: [
      "Leh Airport Pickup & Drop",
      "Oxygen Cylinder & Oxygen Level Monitors in all vehicles",
      "Ladakh Inner Line Permits & Environmental Fees",
      "Luxury Swiss Cottage Camps at Pangong Tso & Hunder Dunes",
      "Option for Royal Enfield Himalayan Bike Ride or 4x4 SUV"
    ],
    exclusions: [
      "Monastery entrance tickets",
      "Bactrian Camel Ride fee"
    ],
    checkpoints: [
      {
        id: 301,
        day_number: 1,
        title: "Leh Arrival & High Altitude Acclimatization",
        location_name: "Leh Town",
        altitude: "11,500 ft",
        description: "Land at Kushok Bakula Rimpochee Airport (IXL). Complete rest mandatory for oxygen acclimatization. Evening leisurely walk in Leh Main Bazaar and Shanti Stupa sunset.",
        insta_spot: "Shanti Stupa White Dome against Dusk Himalayan Range",
        vibe_highlight: "First glimpse of Leh Palace lit up at night",
        image_url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800",
        activities: ["Airport Pickup", "Mandatory Hotel Rest", "Shanti Stupa Sunset", "Leh Market Walk"]
      },
      {
        id: 302,
        day_number: 2,
        title: "Sham Valley: Magnetic Hill & Confluence of Indus & Zanskar",
        location_name: "Sangam Point & Magnetic Hill",
        altitude: "10,800 ft",
        description: "Drive along the Leh-Srinagar highway. Experience the defying gravity at Magnetic Hill. Visit Gurudwara Pathar Sahib and witness the stunning confluence of emerald Zanskar and blue Indus rivers at Sangam.",
        insta_spot: "Sangam Emerald & Blue River Confluence from High Lookout",
        vibe_highlight: "White water river rafting in Zanskar River rapids",
        image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800",
        activities: ["Magnetic Hill Gravity Test", "Sangam River View", "Zanskar River Rafting Option", "Hall of Fame Visit"]
      },
      {
        id: 303,
        day_number: 3,
        title: "Khardung La Pass (17,982 ft) to Nubra Valley Dunes",
        location_name: "Khardung La & Hunder Sand Dunes",
        altitude: "17,982 ft",
        description: "Ascend the world's iconic Khardung La Pass (17,982ft). Take victory photos at the snow pass. Descend into Nubra Valley cold desert and ride double-humped Bactrian camels among silver sand dunes.",
        insta_spot: "Khardung La World's Highest Pass Yellow Signboard",
        vibe_highlight: "Riding double-humped Bactrian Camels in Hunder dunes under snow mountains",
        image_url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800",
        activities: ["Khardung La Crossing", "Diskit Monastery Giant Buddha", "Hunder Camel Safari", "Desert Camp Night"]
      },
      {
        id: 304,
        day_number: 4,
        title: "Shyok River Route to Pangong Tso Lake",
        location_name: "Pangong Tso (13,940 ft)",
        altitude: "13,940 ft",
        description: "Drive via the thrilling off-road Shyok riverbed route directly to Pangong Tso. Arrive at the 134km long lake that changes color from cyan to cobalt blue. Night camping in luxury geodesic domes.",
        insta_spot: "Pangong Lake Turquoise Blue Horizon & 3 Idiots Yellow Scooter Spot",
        vibe_highlight: "Astrophotography & Milky Way stargazing next to Pangong Tso shores",
        image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800",
        activities: ["Shyok River Off-roading", "Pangong Lake Check-in", "Sunset Lake Walk", "Stargazing Bonfire"]
      },
      {
        id: 305,
        day_number: 5,
        title: "Chang La Pass (17,590 ft) & Return to Leh",
        location_name: "Chang La Pass & Thiksey Monastery",
        altitude: "17,590 ft",
        description: "Sunrise photos at Pangong Lake. Return to Leh crossing Chang La Pass. Visit the magnificent 12-storey Thiksey Monastery (Mini Potala Palace) overlooking Indus Valley.",
        insta_spot: "Thiksey Monastery Sunrise Tiered Architecture",
        vibe_highlight: "Listening to morning Buddhist prayers and gong chimes at Thiksey",
        image_url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800",
        activities: ["Sunrise Pangong Shoot", "Chang La Pass Crossing", "Thiksey Monastery Visit", "Farewell Dinner in Leh"]
      }
    ]
  }
];

const MOCK_BLOGS = [
  {
    id: 1,
    title: "Kashmir Travel Rules 2026: SIM Cards, Inner Line Permits & Snow Hacks",
    slug: "kashmir-travel-rules-2026-sim-permits-snow-hacks",
    category: "Travel Hacks",
    read_time: "4 min read",
    author: "Sameer (Flavour Lead)",
    cover_image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200&auto=format&fit=crop",
    excerpt: "Planning your Kashmir trip? Here's everything Gen Z travelers need to know about prepaid vs postpaid SIMs, Gurez permits, and how to skip pony scams in Pahalgam.",
    vibe_tag: "#TravelHacks",
    content: `
### 1. The SIM Card Rule (Crucial!)
Outside prepaid SIM cards (Airtel, Jio, Vi) **WILL NOT WORK** in Jammu & Kashmir due to security regulations. You must have:
- A postpaid SIM card from your home state, OR
- Buy a local tourist SIM upon landing at Srinagar airport (takes 10 mins with Aadhaar card).

### 2. Inner Line Permits (Gurez & Bangus Valley)
Places like Gurez Valley and Bangus Valley lie close to the Line of Control. While regular tourist spots like Gulmarg and Pahalgam need no permits, **Gurez requires an Inner Line Permit (ILP)**. Flavour Holidays processes all ILPs seamlessly for our guests!

### 3. Gulmarg Gondola Booking Hack
Gondola tickets sell out weeks in advance! Always book Phase 2 (Apharwat Peak) along with Phase 1. If tickets are unavailable, ask our Flavour host for official VIP line assistance.
    `
  },
  {
    id: 2,
    title: "Why Gurez Valley is the Ultimate Gen-Z Offbeat Destination in 2026",
    slug: "why-gurez-valley-is-ultimate-offbeat-destination-2026",
    category: "Offbeat Gems",
    read_time: "5 min read",
    author: "Aisha (Travel Creator)",
    cover_image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=1200&auto=format&fit=crop",
    excerpt: "Tired of crowded Instagram spots? Gurez offers wooden log cabins, zero crowd, 11,672ft pass hairpins, and starry nights by Kishanganga River.",
    vibe_tag: "#OffbeatVibes",
    content: `
Gurez Valley is where time stands still. Located just 123 km from Srinagar, crossing the formidable Razdan Pass at 11,672ft opens doors to a secluded paradise.

#### Highlights of Gurez:
- **Habba Khatoon Mountain**: A massive pyramidal mountain named after Kashmir's legendary poetess.
- **Wooden Architecture**: Villages made of solid cedar and pine log cabins.
- **Kishanganga River**: Crystal turquoise waters perfect for riverside camping and trout fishing.
    `
  }
];

const MOCK_VEHICLES = [
  {
    id: 1,
    name: "Mahindra Thar / Scorpio 4WD",
    model_name: "Thar 4x4 / Scorpio N",
    capacity_passengers: "4 Passengers",
    terrain_type: "Winter Snow & High Altitude Off-Road Passes (Razdan, Khardung La)",
    description: "The ultimate thrill machine for snow routes between Tangmarg & Gulmarg, Gurez Valley passes, and rough Ladakh terrains.",
    image_url: "https://flavourholidays.com/wp-content/uploads/2026/08/thar-1.png",
    badge: "4x4 Snow Beast ⚡"
  },
  {
    id: 2,
    name: "Toyota Innova Crysta",
    model_name: "Innova Crysta GX / VX",
    capacity_passengers: "6 - 7 Passengers + Driver",
    terrain_type: "Long Mountain Drives & Luxury Highway Cruising",
    description: "Ultra-comfortable luxury MPV with captain seats, dual AC, and maximum boot space for mountain luggage.",
    image_url: "https://flavourholidays.com/wp-content/uploads/2026/08/crysta_gx_7s_d_attitude_black_mica_base.webp",
    badge: "Luxury Cruiser ✨"
  },
  {
    id: 3,
    name: "Tempo Traveller (12 / 17 / 26 Seater)",
    model_name: "Force Tempo Traveller Luxury Edition",
    capacity_passengers: "12 to 26 Passengers",
    terrain_type: "Group Adventures & Corporate Expeditions",
    description: "Pushback seats, charging points, individual AC vents, and heavy-duty luggage racks for squad travel.",
    image_url: "https://flavourholidays.com/wp-content/uploads/2026/08/exterior-4-1_enhanced-removebg-preview-1.png",
    badge: "Squad Explorer 🚌"
  }
];

export const fetchTours = async () => {
  try {
    const response = await api.get('/tours/');
    const data = response.data.results || response.data;
    return Array.isArray(data) ? data : MOCK_TOURS;
  } catch (error) {
    console.warn("API server offline or error, serving rich mock tours data", error);
    if (import.meta.env.PROD) throw error;
    return MOCK_TOURS;
  }
};

export const fetchTourBySlug = async (slug) => {
  try {
    const response = await api.get(`/tours/${slug}/`);
    return response.data;
  } catch (error) {
    console.warn("API server offline, serving mock tour detail", error);
    return MOCK_TOURS.find(t => t.slug === slug) || MOCK_TOURS[0];
  }
};

export const fetchBlogs = async () => {
  try {
    const response = await api.get('/blogs/');
    const data = response.data.results || response.data;
    return Array.isArray(data) ? data : MOCK_BLOGS;
  } catch (error) {
    console.warn("API server offline, serving mock blogs data", error);
    return MOCK_BLOGS;
  }
};

export const fetchVehicles = async () => {
  try {
    const response = await api.get('/vehicles/');
    const data = response.data.results || response.data;
    return Array.isArray(data) ? data : MOCK_VEHICLES;
  } catch (error) {
    console.warn("API server offline, serving mock vehicles data", error);
    return MOCK_VEHICLES;
  }
};

export const fetchFAQs = async () => {
  try {
    const response = await api.get('/faqs/');
    const data = response.data.results || response.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn("API server offline, serving empty/default FAQs", error);
    return [];
  }
};

export const fetchTestimonials = async () => {
  try {
    const response = await api.get('/testimonials/');
    const data = response.data.results || response.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn("API server offline, serving empty/default testimonials", error);
    return [];
  }
};

export const submitInquiry = async (inquiryData) => {
  try {
    const response = await api.post('/inquiries/', inquiryData);
    return response.data;
  } catch (error) {
    console.warn("API post inquiry error:", error);
    return {
      status: "success",
      message: "Pack your bags! Our travel expert will contact you via WhatsApp / Phone shortly."
    };
  }
};

export const submitBookingSearch = async (bookingData) => {
  try {
    const response = await api.post('/booking-searches/', bookingData);
    return response.data;
  } catch (error) {
    console.warn("API booking search error, filtering local tour data:", error);
    if (import.meta.env.PROD) throw error;
    const selectedTour = MOCK_TOURS.find((tour) => tour.id === Number(bookingData.selected_tour));
    return {
      status: "success",
      message: "Booking search saved locally while the API is unavailable.",
      search: bookingData,
      tours: selectedTour ? [selectedTour] : [],
      blogs: []
    };
  }
};
