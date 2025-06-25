export interface Plant {
  id: number;
  name: string;
  subName?: string;
  description: string;
  price: number;
  discount: number;
  reviews: number;
  imageUrl: string;
  coverImages: string[];
  category: "indoor" | "outdoor" | "flowering" | "succulent" | "bonsai";
  careInfo: string;
}
export const plantsData: Plant[] = [
  // 🌱 1–6 Indoor
  {
    id: 1,
    name: "Snake Plant (Costa Farms)",
    subName: "Sansevieria trifasciata",
    description: "Hardy indoor plant that filters toxins; originates from West Africa.",
    price: 2899,
    discount: 15,
    reviews: 15658,
    imageUrl: "/images/rose.png",
    coverImages: [
      "https://m.media-amazon.com/images/I/81xL+3uSSVL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71rMZVJlkxL._AC_SL1500_.jpg"
    ],
    category: "indoor",
    careInfo: "Low light; water every 2–3 weeks; pet-safe."
  },
  {
    id: 2,
    name: "Monstera (Timbactu)",
    subName: "Monstera deliciosa",
    description: "Compact live Monstera plant in a decorative pot.",
    price: 199,
    discount: 20,
    reviews: 22,
    imageUrl: "/images/superba.png",
    coverImages: [
      "https://rukminim1.flixcart.com/image/416/416/ku4ezrk0/plant/0/1/h/timbactu-live-monstera-plant-indoor-outdoor-pot-foliage-original-imag7c3rijvw2hyy.jpeg"
    ],
    category: "indoor",
    careInfo: "Indoor/outdoor use; water moderately; indirect light."
  },
  {
    id: 3,
    name: "ZZ Plant",
    subName: "Zamioculcas zamiifolia",
    description: "Glossy leaves, drought-tolerant indoor plant.",
    price: 899,
    discount: 10,
    reviews: 4211,
    imageUrl: "/images/zz.png",
    coverImages: [
      "https://m.media-amazon.com/images/I/71X3Zm5Ai-L._SL1500_.jpg"
    ],
    category: "indoor",
    careInfo: "Low light; water sparingly."
  },
  {
    id: 4,
    name: "Peace Lily",
    subName: "Spathiphyllum",
    description: "Flowering indoor plant known for air purification.",
    price: 599,
    discount: 12,
    reviews: 3215,
    imageUrl: "/images/peace_lily.png",
    coverImages: [
      "https://m.media-amazon.com/images/I/71GeNfap7VL._SL1500_.jpg"
    ],
    category: "indoor",
    careInfo: "Medium light; keep soil moist."
  },
  {
    id: 5,
    name: "Aloe Vera",
    subName: "Aloe barbadensis",
    description: "Healing succulent, perfect for indoor pots.",
    price: 349,
    discount: 5,
    reviews: 1834,
    imageUrl: "/images/aloe.png",
    coverImages: [
      "https://m.media-amazon.com/images/I/71uGHDCJ+XL._SL1500_.jpg"
    ],
    category: "indoor",
    careInfo: "Bright light; water deeply but infrequently."
  },
  {
    id: 6,
    name: "Areca Palm",
    subName: "Dypsis lutescens",
    description: "Tropical houseplant that adds elegance.",
    price: 1299,
    discount: 18,
    reviews: 2897,
    imageUrl: "/images/areca.png",
    coverImages: [
      "https://m.media-amazon.com/images/I/61V-jQZ4VmL._SL1500_.jpg"
    ],
    category: "indoor",
    careInfo: "Bright indirect light; water when topsoil dries."
  },

  // 🌸 7–12 Flowering
  {
    id: 7,
    name: "Snake Plant Silver Star",
    subName: "Sansevieria Silver Star",
    description: "Easy-care houseplant with silvery-green leaves.",
    price: 799,
    discount: 0,
    reviews: 4620,
    imageUrl: "/images/siver_star.png",
    coverImages: [
      "https://m.media-amazon.com/images/I/71Tr2OjQw9L._AC_SL1500_.jpg"
    ],
    category: "flowering",
    careInfo: "Bright indirect light; water when soil is nearly dry."
  },
  {
    id: 8,
    name: "Monstera Live Plant (Flipkart)",
    subName: "Monstera deliciosa",
    description: "Iconic Swiss cheese plant; air-purifying foliage.",
    price: 170,
    discount: 65,
    reviews: 123,
    imageUrl: "/images/snake_plant.png",
    coverImages: [
      "https://rukminim1.flixcart.com/image/416/416/xif0q/plant/g/d/3/greenearth-monstera-deliciosa-plant-original-imafbguc6ghjxfch.jpeg"
    ],
    category: "flowering",
    careInfo: "Bright indirect light; water when topsoil dries."
  },
  {
    id: 9,
    name: "Jasmine Plant",
    subName: "Jasminum sambac",
    description: "Fragrant flowering plant for indoor/outdoor.",
    price: 250,
    discount: 15,
    reviews: 1388,
    imageUrl: "/images/jasmine.png",
    coverImages: [
      "https://m.media-amazon.com/images/I/61Ey+YXl9VL._SL1000_.jpg"
    ],
    category: "flowering",
    careInfo: "Full sun; water regularly."
  },
  {
    id: 10,
    name: "Rose Miniature",
    subName: "Rosa spp.",
    description: "Beautiful mini rose for windowsills and gifts.",
    price: 499,
    discount: 10,
    reviews: 1110,
    imageUrl: "/images/rose_mini.png",
    coverImages: [
      "https://m.media-amazon.com/images/I/71OaSHGMpXL._SL1200_.jpg"
    ],
    category: "flowering",
    careInfo: "Full sun; moist soil."
  },
  {
    id: 11,
    name: "Hibiscus Plant",
    subName: "Hibiscus rosa-sinensis",
    description: "Bright, large blooms ideal for balconies.",
    price: 399,
    discount: 8,
    reviews: 899,
    imageUrl: "/images/hibiscus.png",
    coverImages: [
      "https://m.media-amazon.com/images/I/81PrzRPFb1L._SL1500_.jpg"
    ],
    category: "flowering",
    careInfo: "Full sunlight; water daily."
  },
  {
    id: 12,
    name: "Bougainvillea",
    subName: "Bougainvillea glabra",
    description: "Colorful flowering vine, great for fences.",
    price: 320,
    discount: 5,
    reviews: 543,
    imageUrl: "/images/bougainvillea.png",
    coverImages: [
      "https://m.media-amazon.com/images/I/71HJDnbZyUL._SL1200_.jpg"
    ],
    category: "flowering",
    careInfo: "Bright sun; drought-tolerant."
  },

  // 🌿 13–18 Outdoor
  {
    id: 13,
    name: "Snake Plant Superba",
    subName: "Sansevieria trifasciata Superba",
    description: "Drought-tolerant succulent with striking leaves.",
    price: 1299,
    discount: 5,
    reviews: 8750,
    imageUrl: "/images/monstera.png",
    coverImages: [
      "https://m.media-amazon.com/images/I/71pThxsRnHL._AC_SL1500_.jpg"
    ],
    category: "succulent", // keep original
    careInfo: "Partial shade; water when soil dries."
  },
  {
    id: 14,
    name: "Monstera (Outdoor Large)",
    subName: "Monstera deliciosa",
    description: "Tall monstera for shaded garden corners.",
    price: 549,
    discount: 30,
    reviews: 375,
    imageUrl: "/images/monstera_big.png",
    coverImages: [
      "https://m.media-amazon.com/images/I/81cEvZ0VvFL._SL1500_.jpg"
    ],
    category: "outdoor",
    careInfo: "Partial shade; moist soil."
  },
  {
    id: 15,
    name: "Areca Palm Large",
    subName: "Dypsis lutescens",
    description: "Tall ornamental palm for balconies or patios.",
    price: 899,
    discount: 20,
    reviews: 842,
    imageUrl: "/images/areca_large.png",
    coverImages: [
      "https://m.media-amazon.com/images/I/91T9nO8RYmL._SL1500_.jpg"
    ],
    category: "outdoor",
    careInfo: "Bright indirect light; frequent watering."
  },
  {
    id: 16,
    name: "Croton Plant",
    subName: "Codiaeum variegatum",
    description: "Colorful foliage for garden paths.",
    price: 349,
    discount: 7,
    reviews: 610,
    imageUrl: "/images/croton.png",
    coverImages: [
      "https://m.media-amazon.com/images/I/71PqqyxPH1L._SL1500_.jpg"
    ],
    category: "outdoor",
    careInfo: "Full sun; water regularly."
  },
  {
    id: 17,
    name: "Money Plant Outdoor",
    subName: "Epipremnum aureum",
    description: "Climbing plant with coin-shaped leaves.",
    price: 279,
    discount: 10,
    reviews: 1500,
    imageUrl: "/images/money_outdoor.png",
    coverImages: [
      "https://m.media-amazon.com/images/I/81eWBbJViJL._SL1500_.jpg"
    ],
    category: "outdoor",
    careInfo: "Partial shade; moist soil."
  },
  {
    id: 18,
    name: "Outdoor Ficus Bonsai",
    subName: "Ficus retusa",
    description: "Stunning bonsai for terraces and gardens.",
    price: 1299,
    discount: 25,
    reviews: 640,
    imageUrl: "/images/bonsai.png",
    coverImages: [
      "https://m.media-amazon.com/images/I/71FGGF0KU8L._SL1200_.jpg"
    ],
    category: "outdoor",
    careInfo: "Bright light; water moderately."
  }
];
