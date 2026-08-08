/**
 * Gallery, FAQs and contact — sample data.
 *
 * All invented. Shaped the way a CMS would deliver it so the pages can be
 * judged before anything is wired up.
 */

/* --------------------------------------------------------------------------
   Gallery
-------------------------------------------------------------------------- */

export const galleryCategories = [
  "All",
  "The building",
  "Rooms",
  "Dining",
  "Landscape",
] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

export type Shot = {
  id: string;
  caption: string;
  category: Exclude<GalleryCategory, "All">;
  /** Tall images take two rows in the mosaic. */
  tall?: boolean;
};

export const gallery: Shot[] = [
  { id: "photo-1470252649378-9c29740c9fa8", caption: "The field at first light", category: "Landscape", tall: true },
  { id: "photo-1578683010236-d716f9a3f461", caption: "Kalam, ground floor", category: "Rooms" },
  { id: "photo-1559339352-11d035aa65de", caption: "Terrace service, before dinner", category: "Dining" },
  { id: "photo-1444927714506-8492d94b4e3d", caption: "The fourth floor, open on two sides", category: "The building" },
  { id: "photo-1631049307264-da0ec9d70304", caption: "Kayal, corner suite", category: "Rooms", tall: true },
  { id: "photo-1414235077428-338989a2e8c0", caption: "One menu, written that morning", category: "Dining" },
  { id: "photo-1507525428034-b723cf961d3e", caption: "West shore at sunset", category: "Landscape" },
  { id: "photo-1611892440504-42a792e24d32", caption: "Kanal, charred timber", category: "Rooms" },
  { id: "photo-1517248135467-4c7edcad34c4", caption: "The salt store, fourteen degrees", category: "Dining", tall: true },
  { id: "photo-1473580044384-7ba9967e16a0", caption: "Third floor courtyard at noon", category: "The building" },
  { id: "photo-1519681393784-d120267933ba", caption: "Lights out, fifth floor", category: "Landscape", tall: true },
  { id: "photo-1600607687939-ce8a6c25118c", caption: "Sudar, sitting room", category: "Rooms" },
  { id: "photo-1552566626-52f8b828add9", caption: "The bar, opens at six", category: "Dining" },
  { id: "photo-1501854140801-50d01698950b", caption: "Terraces below the property", category: "Landscape" },
  { id: "photo-1418065460487-3e41a6c84dc5", caption: "Hill forest, monsoon", category: "Landscape" },
  { id: "photo-1560448204-e02f11c3d0e2", caption: "Uyar, open frame", category: "Rooms" },
  { id: "photo-1621460248083-6271cc4437a8", caption: "Planting, kitchen garden", category: "The building" },
  { id: "photo-1600334089648-b0d9d3028eb2", caption: "Bath house, second floor", category: "The building" },
];

/* --------------------------------------------------------------------------
   FAQ
-------------------------------------------------------------------------- */

export type FaqGroup = {
  title: string;
  items: { q: string; a: string }[];
};

export const faqGroups: FaqGroup[] = [
  {
    title: "Booking and rates",
    items: [
      {
        q: "What is included in the rate?",
        a: "Breakfast, all yoga and hill walks, the bath house, and taxes. Dinner and the bar are charged separately. There is no resort fee and there never will be.",
      },
      {
        q: "What is the cancellation policy?",
        a: "Free cancellation up to seven days before arrival. Inside seven days, the first night is charged. For the two houses, the window is fourteen days.",
      },
      {
        q: "Is there a minimum stay?",
        a: "Two nights for most rooms, three for Kayal and Vaan. Over public holidays and between 20 December and 5 January the minimum is three nights throughout.",
      },
      {
        q: "Do you take children?",
        a: "Yes, on every floor except the fifth. Uyar sleeps four and is the room families usually take. Cots are free, and childcare can be arranged with a day's notice.",
      },
    ],
  },
  {
    title: "The building",
    items: [
      {
        q: "Why does the fourth floor have no air conditioning?",
        a: "Because it does not need it. The floor is open on two sides with linen screens, and the cross-draught off the hills holds it at about 21°C. It is the coolest floor in the building. If that worries you, book on floors one to three.",
      },
      {
        q: "Is the fifth floor really dark at night?",
        a: "Yes. All lighting on the fifth floor goes off at 22:00 and does not come back on until dawn. There are shielded floor-level lamps for getting about. This is the reason most people book that floor.",
      },
      {
        q: "Is the building accessible?",
        a: "There is a lift to all five floors and two step-free rooms, Suvar and Alai. The swimming platform is reached by stairs only. Tell us what you need when you book and we will be straight with you about what works.",
      },
    ],
  },
  {
    title: "Getting here",
    items: [
      {
        q: "Which airport?",
        a: "Madurai is closest at about two hours by road. Trichy is two and a half. We will send a car to either for ₹6,500 each way — tell us your flight number and it will be waiting.",
      },
      {
        q: "Can I drive myself?",
        a: "Yes. The last four kilometres are unsealed but graded, and fine in any car outside heavy monsoon. Parking is free and shaded.",
      },
      {
        q: "When is the best time to come?",
        a: "November to February for clear skies and cool nights. June to August for the monsoon, which is spectacular on the fourth floor and the reason some guests only come then. April and May are hot and quiet, and we drop rates accordingly.",
      },
    ],
  },
  {
    title: "During your stay",
    items: [
      {
        q: "Is there Wi-Fi?",
        a: "Yes, throughout, and it is fast. There are no televisions in the rooms and we are not planning to add them.",
      },
      {
        q: "Can I eat here if I am not staying?",
        a: "Alati takes walk-ins at lunch. Kalanjiyam takes outside bookings from 18:00 when there is room. The Roof is residents-only until 18:30.",
      },
      {
        q: "Do you cater for dietary requirements?",
        a: "Yes. The kitchen cooks one menu each night, but it is adjusted for whatever you tell us in advance — vegetarian, vegan, allergies, anything. Give us notice and it will simply be handled.",
      },
    ],
  },
];

/* --------------------------------------------------------------------------
   Contact
-------------------------------------------------------------------------- */

export const contact = {
  address: ["drsiddarthresidency", "Kollimalai Road", "Namakkal district", "Tamil Nadu 637411", "India"],
  phone: "+91 9876543210",
  reservations: "+91 9876543210",
  email: "stay@drsiddarthresidency.com",
  press: "press@drsiddarthresidency.com",
  coords: "11°21′N 78°20′E",
  hours: [
    { k: "Reception", v: "24 hours" },
    { k: "Reservations", v: "08:00 — 20:00 IST, daily" },
    { k: "Check-in", v: "From 14:00" },
    { k: "Check-out", v: "By 11:00" },
  ],
  directions: [
    { k: "Madurai airport", v: "128 km · about 2 hours" },
    { k: "Trichy airport", v: "152 km · about 2 hours 30" },
    { k: "Salem railway", v: "64 km · about 1 hour 15" },
    { k: "Last stretch", v: "4 km unsealed, graded, fine in any car" },
  ],
};

/* --------------------------------------------------------------------------
   A sample confirmed booking — drives the confirmation screen
-------------------------------------------------------------------------- */

export const sampleBooking = {
  reference: "AIN-4K72-QP",
  roomSlug: "kayal",
  guestName: "Meera Raghavan",
  guests: 2,
  nights: 3,
  arrive: "2026-09-18",
  depart: "2026-09-21",
  rate: 44000,
  extras: [
    { name: "Airport transfer, Madurai — return", price: 13000 },
    { name: "Dinner at Kalanjiyam, three nights", price: 10500 },
  ],
  taxRate: 0.18,
};
