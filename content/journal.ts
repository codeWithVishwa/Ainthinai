/**
 * Journal articles — sample data.
 *
 * `body` is a small block list rather than a raw HTML string, so the article
 * template controls typography instead of inheriting whatever a CMS emits.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; id: string; caption: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorRole: string;
  category: string;
  readingMinutes: number;
  hero: string;
  body: Block[];
};

export const postCategories = ["All", "Building", "Kitchen", "Land", "Craft"] as const;

export const posts: Post[] = [
  {
    slug: "why-we-built-walls-out-of-the-field",
    title: "Why we built the walls out of the field",
    excerpt:
      "Rammed earth is slower, heavier and more argumentative than concrete. It is also the only reason the ground floor sits at 23°C without being asked to.",
    date: "2026-07-28",
    author: "Anand Krishnamurthy",
    authorRole: "Studio Marai",
    category: "Building",
    readingMinutes: 7,
    hero: "photo-1470252649378-9c29740c9fa8",
    body: [
      { type: "p", text: "The first question every engineer asked was why we were not using concrete, and the honest answer took four years to demonstrate: because concrete would have needed a machine to fix the temperature afterwards." },
      { type: "p", text: "Rammed earth has enormous thermal mass. A wall six hundred millimetres thick takes most of a day to change its mind about how warm it is, which means the room behind it never experiences the afternoon at all. It gets the average of the last twenty-four hours instead." },
      { type: "h2", text: "The soil decides, not the drawing" },
      { type: "p", text: "You cannot specify rammed earth the way you specify a block. The mix depends on what comes out of the ground on the day, and the ground changes across the site. We dug eleven test pits before the first course went in, and the north wall is a slightly different colour from the south because the clay ran redder at that end." },
      { type: "image", id: "photo-1621460248083-6271cc4437a8", caption: "Test pits, month three. The mix changed four times across the plot." },
      { type: "p", text: "Every wall carries a visible record of how it was made — a horizontal seam every hundred and fifty millimetres where a course was rammed and the next one started. Guests run their hands along them constantly. Nobody does that to plaster." },
      { type: "quote", text: "We stopped thinking of the wall as the thing that holds the roof up. It is the thing that holds the temperature still.", cite: "Anand Krishnamurthy" },
      { type: "h2", text: "What it cost" },
      { type: "p", text: "About forty per cent more than blockwork, and eight months longer. In exchange the ground floor has no air conditioning load worth measuring, and the masons who built it trained six apprentices on site who have since gone on to three other projects in the district. We would do it again." },
    ],
  },
  {
    slug: "the-menu-is-written-after-the-boats-land",
    title: "The menu is written after the boats land",
    excerpt:
      "No à la carte, nine tables, and a kitchen that does not know what it is cooking until about half past six in the morning.",
    date: "2026-07-09",
    author: "Sundari Vel",
    authorRole: "Head chef, Kalanjiyam",
    category: "Kitchen",
    readingMinutes: 5,
    hero: "photo-1559339352-11d035aa65de",
    body: [
      { type: "p", text: "People assume a single menu is about control. It is the opposite. A fixed card means committing in advance to having twenty-two things available every night, which means buying for the worst case and throwing away the difference." },
      { type: "p", text: "We buy what landed and cook that. Some nights it is extraordinary. Some nights the sea was rough and dinner is entirely from the garden, and those turn out to be the nights people write to us about." },
      { type: "h2", text: "What happens at six in the morning" },
      { type: "p", text: "Two of us go down to the landing. Whatever is good and whatever is cheap get written on a board in the kitchen, and by nine the night's menu exists. The garden is walked at seven. By ten the order for anything we cannot grow or catch has gone in." },
      { type: "image", id: "photo-1414235077428-338989a2e8c0", caption: "Seer fish, charcoal, curry leaf. On the board by 09:00, on the table by 20:00." },
      { type: "p", text: "The one thing we will always adjust for is you. Tell us at booking that you do not eat something and it simply will not appear — there is no separate vegetarian menu because the whole menu moves." },
    ],
  },
  {
    slug: "a-floor-with-no-doors",
    title: "A floor with no doors",
    excerpt:
      "The fourth floor is open on two sides and has linen where the windows should be. Here is why that works in a country this warm.",
    date: "2026-06-21",
    author: "Anand Krishnamurthy",
    authorRole: "Studio Marai",
    category: "Building",
    readingMinutes: 6,
    hero: "photo-1444927714506-8492d94b4e3d",
    body: [
      { type: "p", text: "Every guest who books the fourth floor asks the same thing at check-in: is it going to be hot? It is the coolest floor in the building by four degrees, and the reason is that we stopped trying to keep the outside out." },
      { type: "h2", text: "The hill breathes twice a day" },
      { type: "p", text: "Air moves up the slope during the day as the land warms, and back down at night as it cools. A sealed building fights that. An open frame just lets it pass through, and the moving air does the work that a compressor would otherwise be paid to do." },
      { type: "quote", text: "The building is not insulated from the weather. It is arranged around it." },
      { type: "p", text: "Linen screens instead of glass because linen moves — it tells you the air is doing something, and it diffuses light rather than concentrating it. The whole floor is lime-washed for the same reason: lime scatters light instead of bouncing it." },
      { type: "image", id: "photo-1418065460487-3e41a6c84dc5", caption: "Monsoon, from the fourth floor. The screens stay open unless it comes in sideways." },
      { type: "p", text: "The honest caveat: three or four days a year the wind turns and it is genuinely humid up there. On those days we move people down a floor and nobody minds, because by then they understand what the floor is for." },
    ],
  },
  {
    slug: "twelve-years-under-the-cloud-line",
    title: "Twelve years under the cloud line",
    excerpt:
      "The fifth floor is above the cloud more mornings than it is below it. What that does to a building, and to the people in it.",
    date: "2026-05-30",
    author: "Revathi Nair",
    authorRole: "General manager",
    category: "Land",
    readingMinutes: 4,
    hero: "photo-1519681393784-d120267933ba",
    body: [
      { type: "p", text: "About one hundred and eighty mornings a year, cloud sits below the top floor. On perhaps sixty of those it comes into the rooms — through the window seat, across the floor, and out the other side within twenty minutes." },
      { type: "p", text: "We do not stop it. The first year we tried, with seals and a closer on the shutters, and the rooms felt like every other hotel room. So we took the seals off." },
      { type: "h2", text: "Turning the lights off" },
      { type: "p", text: "The lights on the fifth floor go out at ten and stay out. This began as a complaint — a guest in 2024 wrote that she could not see the stars because our own terrace lighting was in the way. She was completely right." },
      { type: "quote", text: "You have built a building for looking at the sky and then lit it so nobody can.", cite: "Guest letter, November 2024" },
      { type: "p", text: "It is now the single most requested floor, and the reason people book it a year out. The best complaint we ever received." },
    ],
  },
  {
    slug: "the-linen-in-your-room",
    title: "The linen in your room came off a loom eleven kilometres away",
    excerpt:
      "Every curtain, sheet and screen in the building was woven within an hour's drive. The reason is not sentiment.",
    date: "2026-05-12",
    author: "Revathi Nair",
    authorRole: "General manager",
    category: "Craft",
    readingMinutes: 5,
    hero: "photo-1518173946687-a4c8892bbd9f",
    body: [
      { type: "p", text: "The handloom cluster near us has been weaving cotton and linen for longer than anyone has been counting, and was losing weavers steadily to mill work an hour away." },
      { type: "p", text: "We placed a standing order — everything soft in the building, replaced on a rolling three-year cycle. It is not charity. Handwoven cloth at this weight lasts appreciably longer than mill cloth and can be repaired rather than replaced, which over ten years is simply cheaper." },
      { type: "image", id: "photo-1560448204-e02f11c3d0e2", caption: "Uyar. Every screen, cover and curtain came off the same cluster." },
      { type: "h2", text: "You can go and see it" },
      { type: "p", text: "There is a loom on the fourth floor and a weaver on it four days a week. Guests sit and watch, and about one a month asks to try, which is encouraged and always goes badly the first time." },
    ],
  },
  {
    slug: "what-we-got-wrong",
    title: "Four things we got wrong",
    excerpt:
      "A courtyard that flooded, a stair nobody used, a bath that took nine minutes to fill, and a restaurant facing the wrong way.",
    date: "2026-04-16",
    author: "Anand Krishnamurthy",
    authorRole: "Studio Marai",
    category: "Building",
    readingMinutes: 8,
    hero: "photo-1473580044384-7ba9967e16a0",
    body: [
      { type: "p", text: "Buildings that get written about tend to be described as though every decision was correct the first time. Here are four that were not." },
      { type: "h2", text: "The third-floor courtyard flooded" },
      { type: "p", text: "We designed the drainage for the average monsoon rather than the worst one, and in the second year it took eleven centimetres of standing water in about forty minutes. The fix was an additional channel and a bigger outlet, cut into finished brick, which was expensive and looks it if you know where to check." },
      { type: "h2", text: "Nobody used the west stair" },
      { type: "p", text: "A beautiful stair, correctly proportioned, forty metres from where anyone actually wanted to go. It is now a reading nook, which was not the plan and is better than the plan." },
      { type: "h2", text: "The outdoor bath took nine minutes to fill" },
      { type: "p", text: "Long enough that guests started it, went to do something else, and forgot. We re-plumbed it to four. Nobody has forgotten since." },
      { type: "h2", text: "The restaurant faced the wrong way" },
      { type: "p", text: "We oriented Kalanjiyam to the view. The view is east. Dinner is at eight. For the first season we served every meal facing a dark wall of glass while the sunset happened behind the diners' heads. The terrace was added the following year and is now where everybody eats." },
      { type: "quote", text: "Four years of drawings, and the fix was a terrace nobody had drawn." },
    ],
  },
];

export const findPost = (slug: string) => posts.find((p) => p.slug === slug);

export const relatedPosts = (slug: string, n = 3) =>
  posts.filter((p) => p.slug !== slug).slice(0, n);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
