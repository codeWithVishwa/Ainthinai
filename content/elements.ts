/**
 * The five landscapes — content layer.
 *
 * The building has five levels and the room names describe them: the ground
 * floor rooms all mean *earth*, the first floor are rivers, the second and
 * third are hills and high peaks, and the single rooftop room is the ocean.
 * The floors are named for what the rooms already say they are.
 *
 * Palettes are derived from the landscape rather than picked. Hill is
 * deliberately the one pale world — mist on a slope — so the five do not blur
 * into a run of dark screens.
 *
 * Rates and prose are placeholder. Replace them here, never in the components.
 */

export const img = (id: string, w = 1600, q = 72) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const money = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const resort = {
  name: "Dr Siddarth Residency",
  tamil: "",
  tagline: "Five landscapes. One destination.",
  premise:
    "Five levels, five landscapes. The ground is earth, the first floor is rivers, the hills and the peaks are above them, and the roof belongs to the sea.",
  location: "Tamil Nadu, India",
  phone: "+91 9876543210",
  email: "stay@drsiddarthresidency.com",
};

export type Element = {
  id: string;
  tamil: string;
  roman: string;
  english: string;
  /** 0 = ground, 4 = rooftop. Ordering, not a street-level storey count. */
  floor: number;
  /** What the lift button says. */
  floorLabel: string;
  badge: string;

  material: string;
  light: string;
  temperature: string;
  quality: string;

  headline: string;
  standfirst: string;
  cta: string;

  palette: { ground: string; ink: string; muted: string; accent: string };

  hero: string;
  gallery: string[];
  rooms: { name: string; tamil: string; area: number; rate: number; note: string }[];
  experiences: { name: string; time: string; note: string }[];
};

export const elements: Element[] = [
  /* --- Ground: earth ------------------------------------------------- */
  {
    id: "earth",
    tamil: "மண்",
    roman: "Mann",
    english: "Earth",
    floor: 0,
    floorLabel: "G",
    badge: "G",
    material: "Rammed clay and river stone",
    light: "Low, warm, from the side",
    temperature: "23°C, held by the walls",
    quality: "Weight",
    headline: "Built from the ground it stands on",
    standfirst:
      "Three rooms on the ground floor, and all three are named for the earth — Mahi, Medini, Avani. The walls are clay dug from this plot, packed by hand two feet thick. They hold last night's cool until noon.",
    cta: "Stand on the ground floor",
    palette: { ground: "#17120E", ink: "#EFE6D8", muted: "#9C8D79", accent: "#C08A3E" },
    hero: "photo-1470252649378-9c29740c9fa8",
    gallery: [
      "photo-1501854140801-50d01698950b",
      "photo-1621460248083-6271cc4437a8",
      "photo-1489493887464-892be6d1daae",
    ],
    rooms: [
      { name: "Mahi", tamil: "மஹி", area: 52, rate: 22000, note: "Clay floor, one deep window, no glass." },
      { name: "Medini", tamil: "மேதினி", area: 58, rate: 24000, note: "Earth on three sides. The quietest room here." },
    ],
    experiences: [
      { name: "Wall building", time: "06:30", note: "Ram a course of earth with the masons who built this." },
      { name: "The soil line", time: "10:00", note: "Dig down a metre and read what the land has been doing." },
      { name: "Clay kitchen", time: "19:00", note: "Everything cooked in pots thrown from the same ground." },
    ],
  },

  /* --- First floor: rivers -------------------------------------------- */
  {
    id: "river",
    tamil: "ஆறு",
    roman: "Aaru",
    english: "River",
    floor: 1,
    floorLabel: "1",
    badge: "1",
    material: "Polished stone and running water",
    light: "Reflected, moving, from below",
    temperature: "26°C, humid",
    quality: "Movement",
    headline: "Every room here has a surface that moves",
    standfirst:
      "Apaga, Bahuda and Lohita are rivers, and the floor is laid out around water that is never more than ankle deep. It reflects the ceiling and moves the light on the walls all day without anyone touching a switch.",
    cta: "Step onto the first floor",
    palette: { ground: "#0C1E1C", ink: "#E6F0EC", muted: "#7E9A93", accent: "#6FBFA8" },
    hero: "photo-1439066615861-d1af74d74000",
    gallery: [
      "photo-1505142468610-359e7d316be0",
      "photo-1600334089648-b0d9d3028eb2",
      "photo-1471922694854-ff1b63b20054",
    ],
    rooms: [
      { name: "Apaga", tamil: "அபகா", area: 60, rate: 28000, note: "The floor is water for the last two metres." },
      { name: "Lohita", tamil: "லோஹிதா", area: 88, rate: 31000, note: "Named for a red river. The bath is fed from the channel." },
    ],
    experiences: [
      { name: "The channel", time: "06:00", note: "Follow the water from the tank to where it leaves the building." },
      { name: "Still water", time: "15:00", note: "The shallow court, lit from beneath. Nobody speaks." },
      { name: "Night flow", time: "21:00", note: "The pumps go off and the floor goes completely quiet." },
    ],
  },

  /* --- Second floor: hills -------------------------------------------- */
  {
    id: "hill",
    tamil: "குன்று",
    roman: "Kundru",
    english: "Hill",
    floor: 2,
    floorLabel: "2",
    badge: "2",
    material: "Lime wash, linen, open frame",
    light: "Diffused, white, everywhere",
    temperature: "21°C, always moving",
    quality: "Breath",
    headline: "The only floor with no doors",
    standfirst:
      "Sahya, Nila and Mainaka are all hill ranges, and this floor is built to be crossed by the wind that comes off them. Lime-washed walls, linen instead of glass, and a frame open on two sides.",
    cta: "Climb to the second floor",
    palette: { ground: "#E3E7E3", ink: "#1C2422", muted: "#77837F", accent: "#3E6E7A" },
    hero: "photo-1444927714506-8492d94b4e3d",
    gallery: [
      "photo-1418065460487-3e41a6c84dc5",
      "photo-1500534314209-a25ddb2bd429",
      "photo-1518173946687-a4c8892bbd9f",
    ],
    rooms: [
      { name: "Sahya", tamil: "ஸஹ்யா", area: 62, rate: 33000, note: "Linen on two sides. Shutters, never glass." },
      { name: "Mainaka", tamil: "மைநாகா", area: 80, rate: 36000, note: "Open frame. You will hear every bird on the hill." },
    ],
    experiences: [
      { name: "First wind", time: "05:45", note: "The hill air turns at dawn. Be on the terrace for it." },
      { name: "Weaving linen", time: "11:00", note: "The cloth in your room, on the loom it came from." },
      { name: "Kite hour", time: "16:30", note: "Paper, thread, and the afternoon updraught." },
    ],
  },

  /* --- Third floor: peaks --------------------------------------------- */
  {
    id: "peak",
    tamil: "சிகரம்",
    roman: "Sigaram",
    english: "Peak",
    floor: 3,
    floorLabel: "3",
    badge: "3",
    material: "Dark stone and thin air",
    light: "Hard, clear, from above",
    temperature: "18°C after dark",
    quality: "Distance",
    headline: "Two rooms, and cloud below both of them",
    standfirst:
      "Malaya and Mandara are the sacred mountains — one gave the world sandalwood, the other churned the ocean. Only two rooms up here, and on about half the mornings of the year the cloud sits underneath them.",
    cta: "Go up to the third floor",
    palette: { ground: "#101426", ink: "#E4E7F4", muted: "#7E85A3", accent: "#8B93CF" },
    hero: "photo-1506905925346-21bda4d32df4",
    gallery: [
      "photo-1470071459604-3b5ec3a7fe05",
      "photo-1523712999610-f77fbcfc3843",
      "photo-1519681393784-d120267933ba",
    ],
    rooms: [
      { name: "Malaya", tamil: "மலயா", area: 84, rate: 42000, note: "Sandalwood in the joinery. You smell it before you see it." },
      { name: "Mandara", tamil: "மந்தரா", area: 96, rate: 44000, note: "Corner room. Cloud comes in through the window most mornings." },
    ],
    experiences: [
      { name: "Above the cloud", time: "06:15", note: "Twenty minutes when the whole valley is under you." },
      { name: "Sandalwood", time: "12:00", note: "Where the joinery came from, and why it still smells." },
      { name: "Cold terrace", time: "20:00", note: "Eighteen degrees and no wind. Blankets provided." },
    ],
  },

  /* --- Rooftop: the ocean --------------------------------------------- */
  {
    id: "ocean",
    tamil: "கடல்",
    roman: "Kadal",
    english: "Ocean",
    floor: 4,
    floorLabel: "Rooftop",
    badge: "RF",
    material: "Salt-washed stone, open roof",
    light: "None after ten, by design",
    temperature: "16°C after dark",
    quality: "Depth",
    headline: "One room on the roof, named for the sea",
    standfirst:
      "Ratnakara means the mine of jewels — the old name for the ocean. There is a single room up here, it has its own stair, and the lights go out at ten and stay out.",
    cta: "Take the roof",
    palette: { ground: "#08202B", ink: "#E4F0F5", muted: "#7797A5", accent: "#4FA3C7" },
    hero: "photo-1507525428034-b723cf961d3e",
    gallery: [
      "photo-1471922694854-ff1b63b20054",
      "photo-1505142468610-359e7d316be0",
      "photo-1519681393784-d120267933ba",
    ],
    rooms: [
      { name: "Ratnakara", tamil: "ரத்னாகரா", area: 110, rate: 58000, note: "The whole roof. Glass ceiling, private stair, no neighbours." },
    ],
    experiences: [
      { name: "Lights out", time: "22:00", note: "The roof goes dark. That is the experience." },
      { name: "Dark sky", time: "00:00", note: "Nothing above you that glows. Telescope on request." },
      { name: "First light", time: "05:30", note: "Sun arriving sideways, cloud still below." },
    ],
  },
];

export const findElement = (id: string) =>
  elements.find((e) => e.id === id) ?? elements[0];

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/rooms", label: "Rooms" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

/** Footer sitemap. Booking is reachable here and from CTAs, but is
    deliberately not a primary nav item. */
export const footerGroups = [
  {
    title: "Stay",
    links: [
      { href: "/rooms", label: "Rooms" },
      { href: "/booking", label: "Book a stay" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/gallery", label: "Gallery" },
      { href: "/blog", label: "Blog" },
      { href: "/about", label: "About" },
    ],
  },
  {
    title: "Practical",
    links: [
      { href: "/faq", label: "Questions" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

/* --------------------------------------------------------------------------
   About — screen 2
-------------------------------------------------------------------------- */

export const about = {
  eyebrow: "About",
  title: "One building, five climates",
  standfirst:
    "Most hotels decide on a temperature and hold it on every floor. This one does the opposite. Each of the five floors is built from a different material, holds a different amount of heat, and lets in a different kind of light — so moving between them feels less like changing rooms and more like changing country.",
  hero: "photo-1470071459604-3b5ec3a7fe05",

  chapters: [
    {
      n: "01",
      title: "The idea came from the site, not a mood board",
      body: [
        "The plot sloped forty metres from the road to the water, and every part of it behaved differently. The top was windy and ten degrees cooler. The middle held heat until midnight. The bottom flooded twice a year and grew everything.",
        "Rather than flatten it and build one uniform block, we built five, stacked — and let each take its character from the part of the land it sits on.",
      ],
    },
    {
      n: "02",
      title: "Nothing is a finish",
      body: [
        "There is no plaster hiding anything here. The clay walls are structural. The charred timber on the third floor is charred because that is how you make timber last a century without treating it. The fourth floor has linen instead of glass because linen moves and glass does not.",
        "Where a floor looks like its element, it is because it is made of it.",
      ],
    },
    {
      n: "03",
      title: "Built slowly, and locally",
      body: [
        "Four years, and almost entirely by people who live within sixty kilometres. The masons who rammed the earth walls trained their own apprentices on site. The linen is woven eleven kilometres away. The bricks were fired here, from here.",
        "It is a slower way to build and it costs more. It is also the only way the building could have ended up specific to this place.",
      ],
    },
  ],

  facts: [
    { k: "Opened", v: "2024" },
    { k: "Levels", v: "Five, one per landscape" },
    { k: "Rooms", v: "Twelve" },
    { k: "Built over", v: "Four years" },
    { k: "Local labour", v: "Within 60km" },
    { k: "Site fall", v: "40 metres" },
  ],

  people: [
    { name: "Architecture", by: "Studio Marai, Chennai" },
    { name: "Earth walls", by: "Ramanathan & sons, Kanchipuram" },
    { name: "Linen and weaving", by: "The Kanchi handloom cluster" },
    { name: "Landscape", by: "Ilai, Coimbatore" },
  ],
};
