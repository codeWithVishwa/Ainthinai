/**
 * Rooms, reviews and availability — sample data.
 *
 * Everything here is invented and shaped like what a PMS would return, so the
 * UI can be judged before a backend exists. `blocked` holds ISO dates that are
 * already taken; the availability calendar reads it directly.
 */

import { findElement } from "./elements";

export type RoomCategory = "Room" | "Suite" | "House";

export type Room = {
  slug: string;
  name: string;
  tamil: string;
  /** Which element floor it belongs to. */
  elementId: string;
  floor: number;
  category: RoomCategory;
  area: number;
  capacity: number;
  beds: string;
  view: string;
  rate: number;
  /** Undiscounted rate, when the room is currently on offer. */
  rackRate?: number;
  summary: string;
  description: string[];
  features: string[];
  amenities: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  /** ISO dates already booked. */
  blocked: string[];
  minNights: number;
};

/** Dates are generated relative to today so the calendar never looks stale. */
const day = (offset: number) => {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
};
const block = (...offsets: number[]) => offsets.map(day);

const BASE_AMENITIES = [
  "Air conditioning",
  "Complimentary breakfast",
  "Filtered still water",
  "Daily housekeeping",
  "Room service until 23:00",
];

export const rooms: Room[] = [
  /* --- Earth, floor 1 ------------------------------------------------- */
  {
    slug: "kalam",
    name: "Kalam",
    tamil: "களம்",
    elementId: "earth",
    floor: 1,
    category: "Room",
    area: 58,
    capacity: 2,
    beds: "One king",
    view: "Field, east",
    rate: 24000,
    summary: "Clay floor, one deep window, no glass.",
    description: [
      "The smallest room on the ground floor and the one people ask for twice. The walls are rammed earth two feet thick, which means the room is doing the temperature work rather than the air conditioning — it sits at 23°C most of the year without help.",
      "There is one window, set deep into the wall, facing the field. It has a shutter and no glass. On the two nights a year it rains hard, you close it.",
    ],
    features: [
      "Rammed earth walls, 600mm",
      "Deep-set shuttered window",
      "Polished clay floor",
      "Writing desk in the reveal",
    ],
    amenities: [...BASE_AMENITIES, "Rain shower", "Reading library", "No television"],
    images: [
      "photo-1578683010236-d716f9a3f461",
      "photo-1582719478250-c89cae4dc85b",
      "photo-1512918728675-ed5a9ecdebfd",
    ],
    rating: 4.8,
    reviewCount: 63,
    blocked: block(3, 4, 5, 18, 19, 27),
    minNights: 2,
  },
  {
    slug: "suvar",
    name: "Suvar",
    tamil: "சுவர்",
    elementId: "earth",
    floor: 1,
    category: "Room",
    area: 74,
    capacity: 2,
    beds: "One king, one daybed",
    view: "Courtyard",
    rate: 31000,
    rackRate: 35000,
    summary: "Two-foot walls. The quietest room on the property.",
    description: [
      "Suvar sits at the back of the ground floor with earth on three sides, which makes it the quietest room we have — you cannot hear the road, the kitchen, or the floor above.",
      "It opens onto the planted courtyard rather than the field, so the light arrives late and stays soft all day.",
    ],
    features: [
      "Earth on three sides",
      "Private courtyard access",
      "Separate dressing area",
      "Deep soaking tub",
    ],
    amenities: [...BASE_AMENITIES, "Soaking tub", "Rain shower", "Courtyard seating"],
    images: [
      "photo-1618773928121-c32242e63f39",
      "photo-1587985064135-0366536eab42",
      "photo-1615874959474-d609969a20ed",
    ],
    rating: 4.9,
    reviewCount: 41,
    blocked: block(7, 8, 21, 22, 23),
    minNights: 2,
  },

  /* --- Water, floor 2 ------------------------------------------------- */
  {
    slug: "alai",
    name: "Alai",
    tamil: "அலை",
    elementId: "water",
    floor: 2,
    category: "Room",
    area: 62,
    capacity: 2,
    beds: "One king",
    view: "Sea, west",
    rate: 29000,
    summary: "The floor becomes water for the last two metres.",
    description: [
      "The room ends in a shallow pool set into the floor — ankle deep, fed from the same channel that runs the length of the second floor. It reflects the ceiling and moves the light around all day.",
      "You can walk through it. Most people do, once, and then keep doing it.",
    ],
    features: [
      "Ankle-deep reflecting pool",
      "Full-width west glazing",
      "Polished stone throughout",
      "Bed on a raised stone plinth",
    ],
    amenities: [...BASE_AMENITIES, "Reflecting pool", "Rain shower", "Sea-facing terrace"],
    images: [
      "photo-1596394516093-501ba68a0ba6",
      "photo-1505142468610-359e7d316be0",
      "photo-1471922694854-ff1b63b20054",
    ],
    rating: 4.7,
    reviewCount: 88,
    blocked: block(2, 9, 10, 11, 25, 26),
    minNights: 2,
  },
  {
    slug: "kayal",
    name: "Kayal",
    tamil: "கயல்",
    elementId: "water",
    floor: 2,
    category: "Suite",
    area: 96,
    capacity: 3,
    beds: "One king, one single",
    view: "Sea and backwater",
    rate: 44000,
    summary: "Corner suite. Two horizons and an outdoor bath.",
    description: [
      "The only room on the second floor with two aspects — open sea on one side, the still backwater on the other. The difference between the two at sunset is the reason this suite costs what it does.",
      "The bath sits outside on the terrace, cut from a single piece of stone, and fills in about four minutes.",
    ],
    features: [
      "Two aspects, sea and backwater",
      "Outdoor stone bath",
      "Separate sitting room",
      "Eight-metre terrace",
    ],
    amenities: [
      ...BASE_AMENITIES,
      "Outdoor bath",
      "Private terrace",
      "Espresso machine",
      "Turndown service",
    ],
    images: [
      "photo-1631049307264-da0ec9d70304",
      "photo-1439066615861-d1af74d74000",
      "photo-1445019980597-93fa8acb246c",
    ],
    rating: 4.9,
    reviewCount: 117,
    blocked: block(1, 2, 3, 14, 15, 16, 17, 29, 30),
    minNights: 3,
  },

  /* --- Fire, floor 3 -------------------------------------------------- */
  {
    slug: "kanal",
    name: "Kanal",
    tamil: "கனல்",
    elementId: "fire",
    floor: 3,
    category: "Room",
    area: 52,
    capacity: 2,
    beds: "One queen",
    view: "Courtyard, high slot",
    rate: 22000,
    summary: "Charred walls and one high slot of light.",
    description: [
      "The darkest room in the building, deliberately. The timber is charred black — yakisugi, done on site — and the only daylight comes through a slot near the ceiling that moves a bar of sun across the far wall over the course of the morning.",
      "People either love this room immediately or ask to move. We do not mind either way.",
    ],
    features: [
      "Charred timber walls",
      "High clerestory slot",
      "Fired brick floor",
      "Blackout by design",
    ],
    amenities: [...BASE_AMENITIES, "Rain shower", "Record player", "No television"],
    images: [
      "photo-1611892440504-42a792e24d32",
      "photo-1509316785289-025f5b846b35",
      "photo-1516026672322-bc52d61a55d5",
    ],
    rating: 4.6,
    reviewCount: 52,
    blocked: block(6, 12, 13, 28),
    minNights: 2,
  },
  {
    slug: "sudar",
    name: "Sudar",
    tamil: "சுடர்",
    elementId: "fire",
    floor: 3,
    category: "Suite",
    area: 88,
    capacity: 3,
    beds: "One king, one daybed",
    view: "Private courtyard",
    rate: 36000,
    rackRate: 41000,
    summary: "A courtyard you cross to reach the bed.",
    description: [
      "Sudar is two volumes with an open courtyard between them, so getting from the sitting room to the bedroom means going outside. In April that is a pleasure. In the monsoon it is an event.",
      "The courtyard takes direct sun from eleven to three, then the shutters come across and it holds the heat until well after dark.",
    ],
    features: [
      "Open private courtyard",
      "Two separate volumes",
      "Fired brick, laid on site",
      "Outdoor fireplace",
    ],
    amenities: [
      ...BASE_AMENITIES,
      "Private courtyard",
      "Outdoor fireplace",
      "Soaking tub",
      "Espresso machine",
    ],
    images: [
      "photo-1600607687939-ce8a6c25118c",
      "photo-1547471080-7cc2caa01a7e",
      "photo-1473580044384-7ba9967e16a0",
    ],
    rating: 4.8,
    reviewCount: 74,
    blocked: block(4, 5, 19, 20, 21),
    minNights: 2,
  },

  /* --- Air, floor 4 --------------------------------------------------- */
  {
    slug: "veesu",
    name: "Veesu",
    tamil: "வீசு",
    elementId: "air",
    floor: 4,
    category: "Room",
    area: 64,
    capacity: 2,
    beds: "One king",
    view: "Hills, north",
    rate: 27000,
    summary: "Linen on two sides. Shutters, never glass.",
    description: [
      "The fourth floor has no doors and this room has no windows either — it has linen, on a frame, on two sides. The hill air comes through the room rather than around it, which is the entire point.",
      "It is the coolest room on the property and the only one where you will want a blanket in August.",
    ],
    features: [
      "Linen screens on two sides",
      "Cross-ventilated, no AC needed",
      "Lime-washed walls",
      "Hand-woven textiles throughout",
    ],
    amenities: [
      "Complimentary breakfast",
      "Filtered still water",
      "Daily housekeeping",
      "Rain shower",
      "Wool blankets",
      "No air conditioning — by design",
    ],
    images: [
      "photo-1512918728675-ed5a9ecdebfd",
      "photo-1444927714506-8492d94b4e3d",
      "photo-1418065460487-3e41a6c84dc5",
    ],
    rating: 4.7,
    reviewCount: 59,
    blocked: block(8, 9, 24),
    minNights: 2,
  },
  {
    slug: "uyar",
    name: "Uyar",
    tamil: "உயர்",
    elementId: "air",
    floor: 4,
    category: "Suite",
    area: 80,
    capacity: 4,
    beds: "One king, two singles",
    view: "Open frame, two aspects",
    rate: 34000,
    summary: "Open frame. You will hear every bird on the hill.",
    description: [
      "The largest room on the open floor, and the one families take. The frame is open on two sides with linen that can be drawn right back, so on a clear morning the room has no walls in any direction you care about.",
      "Bring earplugs if you are a light sleeper. The birds start at five and they are not negotiating.",
    ],
    features: [
      "Open frame, two aspects",
      "Sleeps four",
      "Retractable linen screens",
      "Long terrace with daybeds",
    ],
    amenities: [
      "Complimentary breakfast",
      "Filtered still water",
      "Daily housekeeping",
      "Rain shower",
      "Terrace daybeds",
      "Wool blankets",
    ],
    images: [
      "photo-1560448204-e02f11c3d0e2",
      "photo-1500534314209-a25ddb2bd429",
      "photo-1518173946687-a4c8892bbd9f",
    ],
    rating: 4.8,
    reviewCount: 46,
    blocked: block(11, 12, 13, 26, 27),
    minNights: 2,
  },

  /* --- Sky, floor 5 --------------------------------------------------- */
  {
    slug: "saaral",
    name: "Saaral",
    tamil: "சாரல்",
    elementId: "sky",
    floor: 5,
    category: "Room",
    area: 60,
    capacity: 2,
    beds: "One king",
    view: "Cloud line",
    rate: 30000,
    summary: "Cloud comes in through the window most mornings. Leave it.",
    description: [
      "At this height the cloud sits below you more often than above, and on about half the mornings of the year it comes into the room. It burns off by nine.",
      "Dark stone, a low bed, and nothing on the walls, because there is quite enough happening outside them.",
    ],
    features: [
      "Above the cloud line",
      "Dark stone throughout",
      "Low platform bed",
      "Deep window seat",
    ],
    amenities: [...BASE_AMENITIES, "Rain shower", "Wool blankets", "Telescope on request"],
    images: [
      "photo-1615874959474-d609969a20ed",
      "photo-1506905925346-21bda4d32df4",
      "photo-1470071459604-3b5ec3a7fe05",
    ],
    rating: 4.9,
    reviewCount: 71,
    blocked: block(5, 6, 7, 20, 21, 22),
    minNights: 2,
  },
  {
    slug: "vaan",
    name: "Vaan",
    tamil: "வான்",
    elementId: "sky",
    floor: 5,
    category: "House",
    area: 104,
    capacity: 4,
    beds: "Two kings",
    view: "Whole sky",
    rate: 52000,
    summary: "Glass ceiling. The bed sits under the whole sky.",
    description: [
      "The highest room on the property, with its own stair and a ceiling that is entirely glass over the bed. The house lights go out at ten and stay out, which is the point — on a clear night you do not need them.",
      "Two bedrooms, a sitting room with a working fireplace, and a roof terrace nobody else can reach.",
    ],
    features: [
      "Glass ceiling over the bed",
      "Two bedrooms, two baths",
      "Working fireplace",
      "Private roof terrace",
    ],
    amenities: [
      ...BASE_AMENITIES,
      "Private roof terrace",
      "Working fireplace",
      "Soaking tub",
      "Espresso machine",
      "Turndown service",
      "Telescope",
    ],
    images: [
      "photo-1519681393784-d120267933ba",
      "photo-1600607687939-ce8a6c25118c",
      "photo-1587985064135-0366536eab42",
    ],
    rating: 5.0,
    reviewCount: 38,
    blocked: block(1, 2, 15, 16, 17, 18, 30, 31),
    minNights: 3,
  },
];

export const findRoom = (slug: string) => rooms.find((r) => r.slug === slug);

export const roomElement = (r: Room) => findElement(r.elementId);

export const categories: RoomCategory[] = ["Room", "Suite", "House"];

export const rateRange = () => {
  const rates = rooms.map((r) => r.rate);
  return { min: Math.min(...rates), max: Math.max(...rates) };
};

/* --------------------------------------------------------------------------
   Reviews
-------------------------------------------------------------------------- */

export type Review = {
  id: string;
  author: string;
  from: string;
  date: string;
  rating: number;
  roomSlug: string;
  title: string;
  body: string;
  stayed: string;
};

export const reviews: Review[] = [
  {
    id: "r1",
    author: "Meera Raghavan",
    from: "Bengaluru",
    date: "2026-07-14",
    rating: 5,
    roomSlug: "kayal",
    title: "The two-horizon thing is not marketing",
    body: "We booked Kayal because of the corner aspect and it genuinely is the difference. Sat on that terrace for four evenings and watched the sea go orange on one side while the backwater went completely flat and silver on the other. The outdoor bath fills faster than the staff claim.",
    stayed: "July 2026 · 4 nights",
  },
  {
    id: "r2",
    author: "Daniel Okonjo",
    from: "London",
    date: "2026-06-29",
    rating: 5,
    roomSlug: "vaan",
    title: "Lights out at ten is the best thing here",
    body: "I was ready to be annoyed by a hotel that turns the lights off on you. Then I lay under that glass ceiling on a clear night and understood. Bring warm clothes — sixteen degrees is not a suggestion at that height.",
    stayed: "June 2026 · 3 nights",
  },
  {
    id: "r3",
    author: "Anita Desai",
    from: "Mumbai",
    date: "2026-06-11",
    rating: 4,
    roomSlug: "kanal",
    title: "Dark. Very dark. I loved it, my husband did not",
    body: "Exactly as described, which I respect. The bar of light that crosses the wall in the morning is beautiful. But if you need a view from your bed, take a different floor — this is a room about walls, not windows.",
    stayed: "June 2026 · 2 nights",
  },
  {
    id: "r4",
    author: "Yuki Tanaka",
    from: "Osaka",
    date: "2026-05-30",
    rating: 5,
    roomSlug: "veesu",
    title: "No air conditioning and I never once wanted it",
    body: "Sceptical on arrival, converted by the second night. The linen screens move constantly and the room is genuinely cool. The building is doing something clever that I do not fully understand.",
    stayed: "May 2026 · 5 nights",
  },
  {
    id: "r5",
    author: "Priya Selvam",
    from: "Chennai",
    date: "2026-05-22",
    rating: 5,
    roomSlug: "suvar",
    title: "The quietest room I have slept in anywhere",
    body: "Earth on three sides really does mean silence. I did not hear a single thing from the kitchen or the floor above in three nights. The courtyard light in the late afternoon is worth the rate on its own.",
    stayed: "May 2026 · 3 nights",
  },
  {
    id: "r6",
    author: "Marcus Hale",
    from: "Melbourne",
    date: "2026-05-08",
    rating: 4,
    roomSlug: "alai",
    title: "Walking through your own bedroom floor",
    body: "The pool in the room is a genuinely novel thing and the reflected light on the ceiling all afternoon is lovely. Half a star off only because the stone gets properly cold before sunrise and I did not expect that.",
    stayed: "May 2026 · 2 nights",
  },
  {
    id: "r7",
    author: "Fatima Sheikh",
    from: "Dubai",
    date: "2026-04-19",
    rating: 5,
    roomSlug: "saaral",
    title: "Woke up inside a cloud, twice",
    body: "They tell you it happens and you assume it is a brochure line. It is not. Both mornings the room filled with cloud and cleared by nine. Extraordinary. The window seat is where I spent most of the stay.",
    stayed: "April 2026 · 4 nights",
  },
  {
    id: "r8",
    author: "Thomas Bergström",
    from: "Stockholm",
    date: "2026-04-02",
    rating: 5,
    roomSlug: "sudar",
    title: "Crossing a courtyard to go to bed",
    body: "A completely different rhythm to a normal hotel room. You go outside, you look up, then you go to sleep. We were there during a thunderstorm and it was the single best night of the trip.",
    stayed: "April 2026 · 3 nights",
  },
  {
    id: "r9",
    author: "Lakshmi Iyer",
    from: "Coimbatore",
    date: "2026-03-21",
    rating: 5,
    roomSlug: "kalam",
    title: "The wall-building morning is not a gimmick",
    body: "Spent an hour ramming earth with the masons who actually built the place. My course is somewhere in the north wall. That is the kind of thing this hotel does well — it is not a performance, they just let you help.",
    stayed: "March 2026 · 2 nights",
  },
  {
    id: "r10",
    author: "Sofia Marchetti",
    from: "Milan",
    date: "2026-03-09",
    rating: 4,
    roomSlug: "uyar",
    title: "Bring earplugs, as instructed",
    body: "They warn you about the birds and they are not exaggerating. Five in the morning, every morning. Once I gave up and started getting up for it, the trip improved considerably. Wonderful room for a family.",
    stayed: "March 2026 · 6 nights",
  },
  {
    id: "r11",
    author: "Arjun Menon",
    from: "Kochi",
    date: "2026-02-24",
    rating: 5,
    roomSlug: "kayal",
    title: "Went for two nights, extended to five",
    body: "Rearranged a work trip to stay longer, which I have never done. The staff are unusually good at leaving you alone and then appearing at the exact moment you want something.",
    stayed: "February 2026 · 5 nights",
  },
  {
    id: "r12",
    author: "Grace Mwangi",
    from: "Nairobi",
    date: "2026-02-06",
    rating: 5,
    roomSlug: "vaan",
    title: "The building itself is the reason to come",
    body: "I have stayed in a lot of design hotels that are really just one good lobby. This is not that. Every floor is a different material doing a different job, and you feel it in your body when you move between them.",
    stayed: "February 2026 · 3 nights",
  },
];

export const reviewsForRoom = (slug: string) =>
  reviews.filter((r) => r.roomSlug === slug);
