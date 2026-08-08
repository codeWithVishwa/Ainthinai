/**
 * Rooms, reviews and availability — sample data.
 *
 * Twelve rooms across five levels, named by the client. The names are not
 * decorative: the ground floor rooms all mean *earth*, the first floor are
 * rivers, the second and third are hills and sacred peaks, and the single
 * rooftop room is an old name for the ocean. Copy leans on those meanings.
 *
 * `blocked` holds ISO dates already taken; the availability calendar reads it
 * directly, and it is shaped like what a PMS would return.
 */

import { findElement } from "./elements";

export type RoomCategory = "Room" | "Suite" | "House";

export type Room = {
  slug: string;
  name: string;
  tamil: string;
  /** Which landscape floor it belongs to. */
  elementId: string;
  /** 0 = ground, 4 = rooftop. */
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
  {
    slug: "mahi",
    name: "Mahi",
    tamil: "மஹி",
    elementId: "earth",
    floor: 0,
    category: "Room",
    area: 52,
    capacity: 2,
    beds: "One king",
    view: "Field, east",
    rate: 22000,
    summary: "The smallest room, and the quietest. Cut back into the earth wall.",
    description: [
      "Mahi is one of the old words for earth, and this room is made of it — rammed clay dug from this plot, packed by hand into walls two feet thick. The room does its own temperature work; the air conditioning is there for August and rarely runs.",
      "One window, set deep into the wall, facing the field. Shutter, no glass. On the two nights a year it rains hard, you close it.",
    ],
    features: [
      "Rammed earth walls, 600mm",
      "Deep-set shuttered window",
      "Polished clay floor",
      "Writing desk in the reveal",
    ],
    amenities: [
      ...BASE_AMENITIES,
      "Rain shower",
      "Reading library",
      "No television",
    ],
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
    slug: "medini",
    name: "Medini",
    tamil: "மேதினி",
    elementId: "earth",
    floor: 0,
    category: "Room",
    area: 58,
    capacity: 2,
    beds: "One king, one daybed",
    view: "Courtyard",
    rate: 24000,
    rackRate: 27000,
    summary: "Earth on three sides. The quietest room on the property.",
    description: [
      "Medini is another name for the earth, and this room has it on three sides — you cannot hear the road, the kitchen, or the floor above. Guests who work remotely ask for it by name.",
      "It opens onto the planted courtyard rather than the field, so the light arrives late and stays soft the whole day.",
    ],
    features: [
      "Earth on three sides",
      "Private courtyard access",
      "Separate dressing area",
      "Deep soaking tub",
    ],
    amenities: [
      ...BASE_AMENITIES,
      "Soaking tub",
      "Rain shower",
      "Courtyard seating",
    ],
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
  {
    slug: "avani",
    name: "Avani",
    tamil: "அவனி",
    elementId: "earth",
    floor: 0,
    category: "Room",
    area: 64,
    capacity: 3,
    beds: "One king, one single",
    view: "Garden, south",
    rate: 26000,
    summary: "The largest room on the ground floor, and the only one that takes three.",
    description: [
      "Avani means the earth that bears things. It is the ground floor room families take — a proper third bed rather than a fold-out, and a door straight onto the garden so children can be sent outside.",
      "The clay here was mixed slightly redder than the other two rooms; you can see the seam where the north wall changes colour.",
    ],
    features: [
      "Sleeps three properly",
      "Direct garden access",
      "Visible earth seams",
      "Low bench along the window",
    ],
    amenities: [
      ...BASE_AMENITIES,
      "Rain shower",
      "Garden terrace",
      "Cot available",
    ],
    images: [
      "photo-1615874959474-d609969a20ed",
      "photo-1621460248083-6271cc4437a8",
      "photo-1512918728675-ed5a9ecdebfd",
    ],
    rating: 4.7,
    reviewCount: 37,
    blocked: block(10, 11, 25),
    minNights: 2,
  },
  {
    slug: "apaga",
    name: "Apaga",
    tamil: "அபகா",
    elementId: "river",
    floor: 1,
    category: "Room",
    area: 60,
    capacity: 2,
    beds: "One king",
    view: "Water court, west",
    rate: 28000,
    summary: "The floor becomes water for the last two metres.",
    description: [
      "Apaga is a river — literally the thing that flows away. The room ends in a shallow pool set into the floor, ankle deep, fed from the channel that runs the length of this floor. It reflects the ceiling and moves the light around all day.",
      "You can walk through it. Most people do once, and then keep doing it.",
    ],
    features: [
      "Ankle-deep reflecting pool",
      "Full-width west glazing",
      "Polished stone throughout",
      "Bed on a raised plinth",
    ],
    amenities: [
      ...BASE_AMENITIES,
      "Reflecting pool",
      "Rain shower",
      "Water terrace",
    ],
    images: [
      "photo-1596394516093-501ba68a0ba6",
      "photo-1505142468610-359e7d316be0",
      "photo-1439066615861-d1af74d74000",
    ],
    rating: 4.7,
    reviewCount: 88,
    blocked: block(2, 9, 10, 11, 25, 26),
    minNights: 2,
  },
  {
    slug: "bahuda",
    name: "Bahuda",
    tamil: "பஹுதா",
    elementId: "river",
    floor: 1,
    category: "Room",
    area: 66,
    capacity: 2,
    beds: "One king",
    view: "Channel, north",
    rate: 29000,
    summary: "Named for a river that gives much. The most water of any room here.",
    description: [
      "Bahuda sits where two channels meet, so it has running water on two sides rather than one. It is the loudest room on the property and that is the reason people book it — the sound never stops and you stop hearing it by the second night.",
      "Cork underfoot rather than stone, because stone plus water plus bare feet is a mistake we made once.",
    ],
    features: [
      "Water on two sides",
      "Cork flooring",
      "Deep window seat",
      "Shutters to close the sound out",
    ],
    amenities: [
      ...BASE_AMENITIES,
      "Rain shower",
      "Water terrace",
      "Reading nook",
    ],
    images: [
      "photo-1631049307264-da0ec9d70304",
      "photo-1439066615861-d1af74d74000",
      "photo-1471922694854-ff1b63b20054",
    ],
    rating: 4.6,
    reviewCount: 44,
    blocked: block(6, 12, 13, 28),
    minNights: 2,
  },
  {
    slug: "lohita",
    name: "Lohita",
    tamil: "லோஹிதா",
    elementId: "river",
    floor: 1,
    category: "Suite",
    area: 88,
    capacity: 3,
    beds: "One king, one single",
    view: "Two aspects",
    rate: 31000,
    rackRate: 35000,
    summary: "A red river, and a bath fed straight off the channel.",
    description: [
      "Lohita is the red river, and the stone in this suite was chosen to match — an iron-heavy local granite that goes properly red when it is wet. The bath is cut from a single piece of it and fills from the channel in about four minutes.",
      "The only suite on this floor with two aspects, which at sunset is the difference between a nice room and this one.",
    ],
    features: [
      "Two aspects",
      "Channel-fed stone bath",
      "Separate sitting room",
      "Eight-metre terrace",
    ],
    amenities: [
      ...BASE_AMENITIES,
      "Stone bath",
      "Private terrace",
      "Espresso machine",
      "Turndown service",
    ],
    images: [
      "photo-1600607687939-ce8a6c25118c",
      "photo-1445019980597-93fa8acb246c",
      "photo-1505142468610-359e7d316be0",
    ],
    rating: 4.9,
    reviewCount: 117,
    blocked: block(1, 2, 3, 14, 15, 16, 17, 29, 30),
    minNights: 3,
  },
  {
    slug: "sahya",
    name: "Sahya",
    tamil: "ஸஹ்யா",
    elementId: "hill",
    floor: 2,
    category: "Room",
    area: 62,
    capacity: 2,
    beds: "One king",
    view: "Hills, north",
    rate: 33000,
    summary: "Linen on two sides. Shutters, never glass.",
    description: [
      "Sahya is the old name for the Western Ghats — the enduring one. This room has no windows, it has linen on a frame on two sides, and the hill air comes through the room rather than around it.",
      "It is the coolest room on the property and the only one where you will want a blanket in August. There is no air conditioning and it has never needed any.",
    ],
    features: [
      "Linen screens on two sides",
      "Cross-ventilated, no AC",
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
    slug: "nila",
    name: "Nila",
    tamil: "நீலா",
    elementId: "hill",
    floor: 2,
    category: "Suite",
    area: 78,
    capacity: 3,
    beds: "One king, one daybed",
    view: "Valley, west",
    rate: 34000,
    summary: "Named for the blue mountain. The light in here is genuinely blue at dusk.",
    description: [
      "Nila means blue, and for about forty minutes after sunset that is exactly what this suite is — the lime wash takes the last of the sky and holds it. We did not design that. We noticed it in the first monsoon and stopped trying to light the room in the evening.",
      "A separate sitting room with its own screen, so one of you can stay up without keeping the other awake.",
    ],
    features: [
      "Separate sitting room",
      "West-facing linen screens",
      "Lime wash that catches dusk",
      "Long terrace",
    ],
    amenities: [
      ...BASE_AMENITIES,
      "Rain shower",
      "Terrace daybed",
      "Wool blankets",
    ],
    images: [
      "photo-1560448204-e02f11c3d0e2",
      "photo-1500534314209-a25ddb2bd429",
      "photo-1518173946687-a4c8892bbd9f",
    ],
    rating: 4.8,
    reviewCount: 52,
    blocked: block(11, 12, 13, 26, 27),
    minNights: 2,
  },
  {
    slug: "mainaka",
    name: "Mainaka",
    tamil: "மைநாகா",
    elementId: "hill",
    floor: 2,
    category: "Suite",
    area: 84,
    capacity: 4,
    beds: "One king, two singles",
    view: "Open frame, two aspects",
    rate: 36000,
    summary: "Open frame, sleeps four. You will hear every bird on the hill.",
    description: [
      "Mainaka was the mountain that hid in the ocean to escape Indra, and this is the room that hides from nothing — the frame is open on two sides with linen that draws right back, so on a clear morning it has no walls in any direction you care about.",
      "Bring earplugs if you sleep lightly. The birds start at five and they are not negotiating.",
    ],
    features: [
      "Open frame, two aspects",
      "Sleeps four",
      "Retractable linen screens",
      "Terrace with daybeds",
    ],
    amenities: [
      ...BASE_AMENITIES,
      "Rain shower",
      "Terrace daybeds",
      "Wool blankets",
      "Cot available",
    ],
    images: [
      "photo-1600607687939-ce8a6c25118c",
      "photo-1418065460487-3e41a6c84dc5",
      "photo-1444927714506-8492d94b4e3d",
    ],
    rating: 4.8,
    reviewCount: 46,
    blocked: block(4, 5, 19, 20, 21),
    minNights: 2,
  },
  {
    slug: "malaya",
    name: "Malaya",
    tamil: "மலயா",
    elementId: "peak",
    floor: 3,
    category: "Suite",
    area: 84,
    capacity: 2,
    beds: "One king",
    view: "Cloud line, east",
    rate: 42000,
    summary: "Sandalwood in the joinery. You smell the room before you see it.",
    description: [
      "Malaya is the mountain range the sandalwood comes from, and the joinery in this suite is the real thing — offcuts from a licensed grove, four years seasoning. The smell is strongest in the first hour after the shutters open.",
      "Third floor, so the cloud sits below you rather than above. It burns off by nine most mornings.",
    ],
    features: [
      "Sandalwood joinery",
      "Above the cloud line",
      "Dark stone floor",
      "Deep window seat",
    ],
    amenities: [
      ...BASE_AMENITIES,
      "Rain shower",
      "Wool blankets",
      "Telescope on request",
    ],
    images: [
      "photo-1615874959474-d609969a20ed",
      "photo-1506905925346-21bda4d32df4",
      "photo-1470071459604-3b5ec3a7fe05",
    ],
    rating: 4.9,
    reviewCount: 54,
    blocked: block(5, 6, 7, 20, 21, 22),
    minNights: 2,
  },
  {
    slug: "mandara",
    name: "Mandara",
    tamil: "மந்தரா",
    elementId: "peak",
    floor: 3,
    category: "Suite",
    area: 96,
    capacity: 3,
    beds: "One king, one single",
    view: "Corner, two aspects",
    rate: 44000,
    rackRate: 49000,
    summary: "The mountain that churned the ocean. Corner room, cloud on two sides.",
    description: [
      "Mandara is the mountain the gods used to churn the sea, which is a large claim for a hotel room. What it has is two aspects at the highest occupied level below the roof, and on about half the mornings of the year cloud comes in through both of them.",
      "We tried sealing the shutters in the first year. The room felt like every other hotel room, so we took the seals off.",
    ],
    features: [
      "Two aspects at the cloud line",
      "Corner glazing",
      "Outdoor bath on the terrace",
      "Separate sitting room",
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
      "photo-1506905925346-21bda4d32df4",
      "photo-1523712999610-f77fbcfc3843",
    ],
    rating: 4.9,
    reviewCount: 71,
    blocked: block(1, 2, 15, 16, 17, 18, 30, 31),
    minNights: 3,
  },
  {
    slug: "ratnakara",
    name: "Ratnakara",
    tamil: "ரத்னாகரா",
    elementId: "ocean",
    floor: 4,
    category: "House",
    area: 110,
    capacity: 4,
    beds: "Two kings",
    view: "The whole sky",
    rate: 58000,
    summary: "The whole roof. Glass ceiling, private stair, no neighbours.",
    description: [
      "Ratnakara means the mine of jewels — the old name for the ocean, for what it holds rather than what it looks like. It is the only room on the roof, it has its own stair, and the ceiling over the main bed is entirely glass.",
      "The roof lights go out at ten and stay out until dawn. That is not a saving measure; it is the reason people book this room a year ahead.",
    ],
    features: [
      "Glass ceiling over the bed",
      "Two bedrooms, two baths",
      "Private stair and roof terrace",
      "Working fireplace",
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
    blocked: block(1, 2, 15, 16, 17, 18, 29, 30, 31),
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
    roomSlug: "lohita",
    title: "The stone really does turn red",
    body: "I assumed the red-river thing was a story until it rained on the second afternoon and the whole terrace changed colour. Sat in that bath watching it happen. The two-aspect corner at sunset is the reason this suite costs what it does.",
    stayed: "July 2026 · 4 nights",
  },
  {
    id: "r2",
    author: "Daniel Okonjo",
    from: "London",
    date: "2026-06-29",
    rating: 5,
    roomSlug: "ratnakara",
    title: "Lights out at ten is the best thing here",
    body: "I was ready to be annoyed by a hotel that turns the lights off on you. Then I lay under that glass ceiling on a clear night and understood. Bring warm clothes — sixteen degrees on a roof is colder than it sounds.",
    stayed: "June 2026 · 3 nights",
  },
  {
    id: "r3",
    author: "Anita Desai",
    from: "Mumbai",
    date: "2026-06-11",
    rating: 4,
    roomSlug: "medini",
    title: "Genuinely the quietest room I have slept in",
    body: "Earth on three sides really does mean silence — nothing from the kitchen, nothing from above. Half a star off only because the courtyard light is lovely and I wanted a window on the field side too. You cannot have both.",
    stayed: "June 2026 · 2 nights",
  },
  {
    id: "r4",
    author: "Yuki Tanaka",
    from: "Osaka",
    date: "2026-05-30",
    rating: 5,
    roomSlug: "sahya",
    title: "No air conditioning and I never once wanted it",
    body: "Sceptical on arrival, converted by the second night. The linen screens move constantly and the room stays cool without anything running. The building is doing something clever that I do not fully understand.",
    stayed: "May 2026 · 5 nights",
  },
  {
    id: "r5",
    author: "Priya Selvam",
    from: "Chennai",
    date: "2026-05-22",
    rating: 5,
    roomSlug: "avani",
    title: "The ground floor room to take with a child",
    body: "A real third bed, a door onto the garden, and nobody below us to disturb. My daughter spent four days digging in the kitchen garden and nobody once suggested she stop.",
    stayed: "May 2026 · 4 nights",
  },
  {
    id: "r6",
    author: "Marcus Hale",
    from: "Melbourne",
    date: "2026-05-08",
    rating: 4,
    roomSlug: "apaga",
    title: "Walking through your own bedroom floor",
    body: "The pool set into the room is a genuinely novel thing and the reflected light on the ceiling all afternoon is lovely. Half a star off only because the stone gets properly cold before sunrise and I did not expect that.",
    stayed: "May 2026 · 2 nights",
  },
  {
    id: "r7",
    author: "Fatima Sheikh",
    from: "Dubai",
    date: "2026-04-19",
    rating: 5,
    roomSlug: "mandara",
    title: "Woke up inside a cloud, twice",
    body: "They tell you it happens and you assume it is a brochure line. It is not. Both mornings the room filled with cloud through both windows and cleared by nine. The window seat is where I spent most of the stay.",
    stayed: "April 2026 · 4 nights",
  },
  {
    id: "r8",
    author: "Thomas Bergström",
    from: "Stockholm",
    date: "2026-04-02",
    rating: 5,
    roomSlug: "nila",
    title: "The forty blue minutes are real",
    body: "Every evening after sunset the walls go blue for about forty minutes and then it stops. We stopped making dinner plans that clashed with it. Worth booking this room specifically rather than whatever is free on the floor.",
    stayed: "April 2026 · 3 nights",
  },
  {
    id: "r9",
    author: "Lakshmi Iyer",
    from: "Coimbatore",
    date: "2026-03-21",
    rating: 5,
    roomSlug: "mahi",
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
    roomSlug: "mainaka",
    title: "Bring earplugs, as instructed",
    body: "They warn you about the birds and they are not exaggerating. Five in the morning, every morning. Once I gave up and started getting up for it, the trip improved considerably. Wonderful room for a family of four.",
    stayed: "March 2026 · 6 nights",
  },
  {
    id: "r11",
    author: "Arjun Menon",
    from: "Kochi",
    date: "2026-02-24",
    rating: 5,
    roomSlug: "malaya",
    title: "You smell the room before you walk into it",
    body: "The sandalwood is not a scent they spray — it is the actual joinery, and it is strongest first thing when the shutters open. Rearranged a work trip to stay two extra nights, which I have never done.",
    stayed: "February 2026 · 5 nights",
  },
  {
    id: "r12",
    author: "Grace Mwangi",
    from: "Nairobi",
    date: "2026-02-06",
    rating: 5,
    roomSlug: "bahuda",
    title: "Loudest room here, and I would take it again",
    body: "Water on two sides and it never stops. I noticed it for one night and then stopped hearing it entirely. The cork floor is a small thing that turns out to matter a lot at six in the morning.",
    stayed: "February 2026 · 3 nights",
  },
];

export const reviewsForRoom = (slug: string) =>
  reviews.filter((r) => r.roomSlug === slug);
