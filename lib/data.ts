// All studio content in one place. Prices and copy come from the original prototype.

export const BRAND = {
  name: "Shah Art Studio",
  suffix: "& Academy",
  tagline: "Preserve Precious Moments Forever",
  phone: "+91 99983 40499",
  phoneHref: "tel:+919998340499",
  whatsapp: "919662184977",
  city: "Ahmedabad, Gujarat",
  advance: 500,
}

export const img = (name: string, small = false) => `/img/${name}${small ? "-sm" : ""}.webp`

export type Collection = {
  slug: string
  name: string
  short: string
  blurb: string
  price: string
  image: string
  images: string[]
  mode: "frames" | "resin" | "simple"
}

export const collections: Collection[] = [
  {
    slug: "hand-casting",
    name: "Hand Casting",
    short: "Tiny hands & feet, in 3D",
    blurb: "Lifelike 3D casts of tiny hands and feet, framed to last a lifetime.",
    price: "Starting from ₹1,500",
    image: "handcast-1",
    images: ["handcast-1", "handcast-2", "handcast-3", "handcast-4"],
    mode: "frames",
  },
  {
    slug: "baby-products",
    name: "Baby Products",
    short: "Newborn keepsakes",
    blurb: "Adorable keepsakes for your little one.",
    price: "₹499 – ₹2,999",
    image: "baby-keepsake",
    images: ["baby-keepsake", "handcast-3", "resin-frame"],
    mode: "simple",
  },
  {
    slug: "resin-art",
    name: "Resin Art",
    short: "Glossy, timeless keepsakes",
    blurb: "Glossy, timeless keepsakes — customized your way.",
    price: "₹999 – ₹4,999",
    image: "resin-clock",
    images: ["resin-frame", "resin-clock", "resin-tray", "mandala"],
    mode: "resin",
  },
  {
    slug: "glass-painting",
    name: "Glass Painting / Canvas",
    short: "Hand-painted glass & canvas",
    blurb: "Hand-painted glass & canvas pieces.",
    price: "₹799 – ₹3,499",
    image: "glass-painting",
    images: ["glass-painting", "mandala", "texture-art"],
    mode: "simple",
  },
  {
    slug: "lipan-art",
    name: "Lipan Art / Texture Art",
    short: "Traditional mud & mirror work",
    blurb: "Traditional mud & mirror texture work.",
    price: "₹1,299 – ₹5,999",
    image: "lipan",
    images: ["lipan", "texture-art", "mandala"],
    mode: "simple",
  },
  {
    slug: "home-decor",
    name: "Customized Home Decor",
    short: "Bespoke pieces for your home",
    blurb: "Bespoke decor designed around you.",
    price: "₹1,999 – ₹8,999",
    image: "mandala",
    images: ["mandala", "texture-art", "resin-tray", "lipan"],
    mode: "simple",
  },
]

export const frameTiers = {
  classic: {
    label: "Classic Frames",
    price: "Starting from ₹1,500",
    items: ["Single Hand Cast", "Couple Hands", "Baby Foot Cast", "Family Set"],
    images: ["handcast-1", "handcast-2", "handcast-3", "handcast-4"],
  },
  premium: {
    label: "Premium Frames",
    price: "₹2,499 – ₹4,999",
    items: ["Premium Wood Frame", "LED Shadow Box", "Metallic Finish", "Dual Tone Cast"],
    images: ["handcast-4", "handcast-1", "handcast-2", "handcast-3"],
  },
  custom: {
    label: "Customized Frames",
    price: "₹3,999 – ₹8,999+",
    items: ["Full Family Portrait Cast", "Custom Engraving", "Themed Display", "Heirloom Edition"],
    images: ["handcast-4", "handcast-3", "handcast-2", "handcast-1"],
  },
} as const
export type FrameTier = keyof typeof frameTiers

export const resinItems = [
  { name: "Photo Frame", image: "resin-frame" },
  { name: "Clock", image: "resin-clock" },
  { name: "Name Plaque", image: "resin-tray" },
  { name: "Wall Piece", image: "mandala" },
  { name: "Table Top", image: "resin-tray" },
  { name: "Varnish Preserving", image: "resin-frame" },
]

export const newArrivals = [
  { name: "Golden Footprint Frame", cat: "Hand Casting", image: "handcast-3", slug: "hand-casting" },
  { name: "Ocean Resin Clock", cat: "Resin Art", image: "resin-clock", slug: "resin-art" },
  { name: "Peacock Lipan Panel", cat: "Lipan Art", image: "lipan", slug: "lipan-art" },
  { name: "Floral Glass Canvas", cat: "Glass Painting", image: "glass-painting", slug: "glass-painting" },
  { name: "Newborn Keepsake", cat: "Baby Products", image: "baby-keepsake", slug: "baby-products" },
  { name: "Mandala Wall Decor", cat: "Home Decor", image: "mandala", slug: "home-decor" },
  { name: "Marble Resin Tray", cat: "Resin Art", image: "resin-tray", slug: "resin-art" },
]

export const courses = [
  { name: "Lipan Art", duration: "2 Days", price: "₹1,500 – ₹2,500", image: "lipan" },
  { name: "Hand Casting", duration: "1 Day", price: "₹2,000 – ₹3,500", image: "handcast-1" },
  { name: "Texture Art", duration: "2 Days", price: "₹1,800 – ₹3,000", image: "texture-art" },
  { name: "Dot Mandala", duration: "1 Day", price: "₹1,200 – ₹2,000", image: "mandala" },
  { name: "Sketching", duration: "4 Weeks", price: "₹3,000 – ₹5,000", image: "sketching" },
  { name: "Baby Drawing Classes", duration: "8 Weeks", price: "₹4,000 – ₹6,000", image: "baby-keepsake" },
]

export const statesData: Record<string, string[]> = {
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
  Delhi: ["Delhi"],
  Karnataka: ["Bangalore", "Mysore"],
  "Madhya Pradesh": ["Indore", "Bhopal"],
  "Tamil Nadu": ["Chennai", "Coimbatore"],
  Telangana: ["Hyderabad"],
  "West Bengal": ["Kolkata"],
  "Uttar Pradesh": ["Lucknow", "Kanpur"],
  Punjab: ["Chandigarh", "Ludhiana"],
}
export const bookingCities = [
  "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Mumbai", "Pune", "Delhi", "Bangalore",
  "Jaipur", "Indore", "Chennai", "Hyderabad", "Kolkata", "Lucknow", "Chandigarh",
]

export const slots = [
  { id: "10", label: "10 AM – 12 PM", part: "Morning" },
  { id: "12", label: "12 PM – 2 PM", part: "Midday" },
  { id: "14", label: "2 PM – 4 PM", part: "Afternoon" },
  { id: "16", label: "4 PM – 6 PM", part: "Late afternoon" },
  { id: "18", label: "6 PM – 8 PM", part: "Evening" },
]

export const process = [
  { title: "Pick a day", body: "Choose a slot that suits your baby's mood — naps and all. A refundable ₹500 holds it." },
  { title: "We come to you", body: "Our artist arrives at home with everything needed. No travel, no stress, no rushing a newborn." },
  { title: "Five gentle minutes", body: "A calm casting session with 100% skin-safe organic material. Tiny fingers, captured in 3D." },
  { title: "Finished by hand", body: "We detail, gild and frame your cast by hand, so it looks exactly like the little hand you love." },
]

// Average-ish growth curve of a baby's hand length (cm), used for the "Growing Hands" feature.
// Illustrative, not medical data.
export const handCm = (months: number) => +(5.2 + Math.sqrt(months) * 1.15).toFixed(1)

export const ageStages = [
  { max: 1, line: "Newborn fingers curl for just a few weeks.", rec: "Newborn Hand & Foot Cast", slug: "hand-casting", image: "handcast-3" },
  { max: 4, line: "Chubby fists and dimpled hands — the sweet spot.", rec: "Classic Hand Casting Frame", slug: "hand-casting", image: "handcast-1" },
  { max: 8, line: "Reaching, grabbing, exploring. Light it up.", rec: "Premium LED Shadow Box", slug: "hand-casting", image: "handcast-4" },
  { max: 14, line: "First steps, first birthday, first of everything.", rec: "Baby Keepsake Collection", slug: "baby-products", image: "baby-keepsake" },
  { max: 24, line: "Big little personalities deserve a family piece.", rec: "Family Portrait Cast", slug: "hand-casting", image: "handcast-2" },
]

export const searchIndex = [
  { label: "Book an appointment", href: "/book", group: "Pages" },
  { label: "Hand Casting", href: "/hand-casting", group: "Collections" },
  ...collections.filter((c) => c.slug !== "hand-casting").map((c) => ({ label: c.name, href: `/products/${c.slug}`, group: "Collections" })),
  { label: "Courses & Workshops", href: "/courses", group: "Pages" },
  { label: "Service availability in cities", href: "/availability", group: "Pages" },
  ...courses.map((c) => ({ label: `${c.name} course`, href: "/courses", group: "Courses" })),
]
