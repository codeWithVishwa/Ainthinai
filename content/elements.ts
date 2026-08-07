/**
 * The five elements — content layer.
 *
 * Each of the resort's five floors is built around one element. The element
 * decides the floor's material, its light, its temperature and its palette,
 * and the site's whole appearance follows from whichever one is selected.
 *
 * Palettes are derived from the element itself rather than picked: earth is
 * clay and ochre, water is depth, fire is ember on char, air is the only pale
 * world, sky is night. Air being light-on-dark-elsewhere is deliberate — it
 * gives the set one bright world so the five don't blur together.
 *
 * Rates, room names and prose are placeholder. Replace them here, never in the
 * components.
 */

export const img = (id: string, w = 1600, q = 72) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const money = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const resort = {
  // NOTE: "Ainthinai" means "five landscapes". If the concept is now five
  // elements, this name needs a client decision — "Aimbootham" (ஐம்பூதம்) is
  // the five-elements equivalent.
  name: "Ainthinai",
  tamil: "ஐந்திணை",
  tagline: "Five elements. One destination.",
  premise:
    "Five floors, five elements. Each one is built from a different material, kept at a different temperature, and lit by a different kind of light.",
  location: "Tamil Nadu, India",
  phone: "+91 44 0000 0000",
  email: "stay@ainthinai.example",
};

export type Element = {
  id: string;
  tamil: string;
  roman: string;
  english: string;
  floor: number;

  /** Shown on the carousel card, where the reference put a star rating. */
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
  /* ------------------------------------------------------------------ */
  {
    id: "earth",
    tamil: "மண்",
    roman: "Mann",
    english: "Earth",
    floor: 1,
    badge: "01",
    material: "Rammed clay and river stone",
    light: "Low, warm, from the side",
    temperature: "23°C, held by the walls",
    quality: "Weight",
    headline: "Built from the ground it stands on",
    standfirst:
      "The lowest floor is made of the field it sits in — clay dug from the same soil, packed by hand into walls two feet thick. It holds last night's cool until noon and last noon's warmth until midnight.",
    cta: "Stand on the ground floor",
    palette: { ground: "#17120E", ink: "#EFE6D8", muted: "#9C8D79", accent: "#C08A3E" },
    hero: "photo-1470252649378-9c29740c9fa8",
    gallery: [
      "photo-1501854140801-50d01698950b",
      "photo-1621460248083-6271cc4437a8",
      "photo-1489493887464-892be6d1daae",
    ],
    rooms: [
      { name: "Kalam", tamil: "களம்", area: 58, rate: 24000, note: "Clay floor, one deep window, no glass." },
      { name: "Suvar", tamil: "சுவர்", area: 74, rate: 31000, note: "Two-foot walls. The quietest room here." },
    ],
    experiences: [
      { name: "Wall building", time: "06:30", note: "Ram a course of earth with the masons who built this." },
      { name: "The soil line", time: "10:00", note: "Dig down a metre and read what the land has been doing." },
      { name: "Clay kitchen", time: "19:00", note: "Everything cooked in pots thrown from the same ground." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "water",
    tamil: "நீர்",
    roman: "Neer",
    english: "Water",
    floor: 2,
    badge: "02",
    material: "Polished stone and standing water",
    light: "Reflected, moving, from below",
    temperature: "26°C, humid",
    quality: "Stillness",
    headline: "Every room here has a surface that moves",
    standfirst:
      "The second floor is laid out around water that is never more than ankle deep. It reflects the ceiling, carries the sound of the sea up from the shore, and makes the light on the walls move all day without anyone touching a switch.",
    cta: "Step onto the second floor",
    palette: { ground: "#0B1F26", ink: "#E4F0F2", muted: "#7E9AA3", accent: "#5FA8C7" },
    hero: "photo-1507525428034-b723cf961d3e",
    gallery: [
      "photo-1505142468610-359e7d316be0",
      "photo-1471922694854-ff1b63b20054",
      "photo-1439066615861-d1af74d74000",
    ],
    rooms: [
      { name: "Alai", tamil: "அலை", area: 62, rate: 29000, note: "The floor is water for the last two metres." },
      { name: "Kayal", tamil: "கயல்", area: 96, rate: 44000, note: "Corner room. Two horizons, outdoor bath." },
    ],
    experiences: [
      { name: "The landing", time: "05:00", note: "Meet the night boats before the auction starts." },
      { name: "Salt pans", time: "16:00", note: "Walk the squares while the light goes flat and pink." },
      { name: "Still water", time: "21:00", note: "The shallow court, lit from under. Nobody speaks." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "fire",
    tamil: "தீ",
    roman: "Thee",
    english: "Fire",
    floor: 3,
    badge: "03",
    material: "Charred timber and fired brick",
    light: "Direct, overhead, unforgiving",
    temperature: "34°C at noon, 19°C by four",
    quality: "Heat",
    headline: "Noon, and nowhere to put a shadow",
    standfirst:
      "The third floor is the hottest room in the building and it is not an accident. Timber burned black to preserve it, brick fired on site, and a courtyard that takes the sun straight down for four hours before the shutters come across.",
    cta: "Cross the third floor",
    palette: { ground: "#1A0E0A", ink: "#F3E3D5", muted: "#A8846C", accent: "#D9541E" },
    hero: "photo-1473580044384-7ba9967e16a0",
    gallery: [
      "photo-1516026672322-bc52d61a55d5",
      "photo-1509316785289-025f5b846b35",
      "photo-1547471080-7cc2caa01a7e",
    ],
    rooms: [
      { name: "Kanal", tamil: "கனல்", area: 52, rate: 22000, note: "Charred walls, one high slot of light." },
      { name: "Sudar", tamil: "சுடர்", area: 88, rate: 36000, note: "A courtyard you cross to reach the bed." },
    ],
    experiences: [
      { name: "The kiln", time: "07:00", note: "Fire a brick. Come back for it in three days." },
      { name: "Shadow hour", time: "12:00", note: "The one hour the courtyard has none. Deliberate." },
      { name: "Charring", time: "17:30", note: "Yakisugi, on the roof, as the light goes." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "air",
    tamil: "காற்று",
    roman: "Kaatru",
    english: "Air",
    floor: 4,
    badge: "04",
    material: "Lime wash, linen, open frame",
    light: "Diffused, white, everywhere",
    temperature: "21°C, always moving",
    quality: "Breath",
    headline: "The only floor with no doors",
    standfirst:
      "The fourth floor is built to be crossed by wind. Lime-washed walls, linen instead of glass, and a frame open on two sides so the air coming off the hills goes straight through the building rather than around it.",
    cta: "Climb to the fourth floor",
    palette: { ground: "#E4E7E5", ink: "#1C2422", muted: "#77837F", accent: "#3E6E7A" },
    hero: "photo-1444927714506-8492d94b4e3d",
    gallery: [
      "photo-1418065460487-3e41a6c84dc5",
      "photo-1500534314209-a25ddb2bd429",
      "photo-1518173946687-a4c8892bbd9f",
    ],
    rooms: [
      { name: "Veesu", tamil: "வீசு", area: 64, rate: 27000, note: "Linen on two sides. Shutters, never glass." },
      { name: "Uyar", tamil: "உயர்", area: 80, rate: 34000, note: "Open frame. You will hear every bird." },
    ],
    experiences: [
      { name: "First wind", time: "05:45", note: "The hill air turns at dawn. Be on the terrace for it." },
      { name: "Weaving linen", time: "11:00", note: "The cloth in your room, on the loom it came from." },
      { name: "Kite hour", time: "16:30", note: "Nothing but paper, thread and the afternoon updraught." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "sky",
    tamil: "ஆகாயம்",
    roman: "Aakayam",
    english: "Sky",
    floor: 5,
    badge: "05",
    material: "Dark stone and open roof",
    light: "None, by design",
    temperature: "16°C after dark",
    quality: "Distance",
    headline: "The top floor turns its lights off at ten",
    standfirst:
      "The fifth floor has no ceiling worth speaking of and no lighting after ten at night. It is the highest point on the property, the coldest, and the only one built around something that isn't there.",
    cta: "Go up to the fifth floor",
    palette: { ground: "#0A0C18", ink: "#E4E7F4", muted: "#7E85A3", accent: "#7C87C7" },
    hero: "photo-1519681393784-d120267933ba",
    gallery: [
      "photo-1506905925346-21bda4d32df4",
      "photo-1470071459604-3b5ec3a7fe05",
      "photo-1523712999610-f77fbcfc3843",
    ],
    rooms: [
      { name: "Saaral", tamil: "சாரல்", area: 60, rate: 30000, note: "Cloud comes in most mornings. Leave it." },
      { name: "Vaan", tamil: "வான்", area: 104, rate: 52000, note: "Glass ceiling. Bed under the whole sky." },
    ],
    experiences: [
      { name: "Lights out", time: "22:00", note: "The whole floor goes dark. That is the experience." },
      { name: "Dark sky", time: "00:00", note: "No light above 1,800m. Bring nothing that glows." },
      { name: "First light", time: "05:30", note: "Cloud below you, sun arriving from the side." },
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
    { k: "Floors", v: "Five, one per element" },
    { k: "Rooms", v: "Ten" },
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
