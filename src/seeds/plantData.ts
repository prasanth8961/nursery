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
  category: "indoor" | "outdoor" | "flowering" |  "wooden" | "succulent" | "bonsai";
  careInfo: string;
  height: string;
  weight: string;
  size: string;
}


export const plantsData: Plant[] = [
 {
  id: 1,
  name: "Red Sandal",
  subName: "Semmaram",
  description: "Valuable medicinal and aromatic tree known for its heartwood, often used in skincare, perfumery, and Ayurvedic medicine.",
  price: 100,
  discount: 14,
  reviews: 4.5,
  imageUrl: "/images/Red sandal/redsandle_main.png",
  coverImages: [
    ],
  category: "wooden",
  careInfo: "Requires warm climates with well-drained soil; water moderately; full to partial sunlight.",
  height: "4 ft",
  weight: "3.5 kg",
  size: "8x10"
}
,
 {
  id: 2,
  name: "Neem Plant",
  subName: "Azadirachta indica",
  description: "Highly valued medicinal plant known for its antibacterial, antifungal, and air-purifying properties.",
  price: 80,
  discount: 10,
  reviews: 4.3,
  imageUrl: "/images/neem_1.png",
  coverImages: [],
  category: "wooden",
  careInfo: "Full sunlight; water moderately; thrives in well-drained soil.",
  height: "3 ft",
  weight: "2.5 kg",
  size: "6x8"
}
,
  {
    id: 3,
    name: "Peace Lily",
    subName: "Spathiphyllum",
    description: "Elegant indoor plant that blooms white flowers and purifies air.",
    price: 520,
    discount: 8,
    reviews: 115,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61PmwzpekCL._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71PeaceLilySide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71PeaceLilyRoom._SL1500_.jpg"
    ],
    category: "indoor",
    careInfo: "Medium light, keep soil moist.",
    height: "1.5 ft",
    weight: "1.6 kg",
    size: "6x8"
  },
  {
    id: 4,
    name: "Pothos",
    subName: "Money Plant",
    description: "Trailing plant ideal for desks and shelves, improves air quality.",
    price: 350,
    discount: 5,
    reviews: 200,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61PothosMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71PothosSide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71PothosRoom._SL1500_.jpg"
    ],
    category: "indoor",
    careInfo: "Low light, water moderately.",
    height: "2.5 ft",
    weight: "1.2 kg",
    size: "6x8"
  },
  {
    id: 5,
    name: "Spider Plant",
    subName: "Chlorophytum",
    description: "Fast-growing indoor plant with arching leaves and baby plantlets.",
    price: 300,
    discount: 10,
    reviews: 130,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61SpiderMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71SpiderSide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71SpiderRoom._SL1500_.jpg"
    ],
    category: "indoor",
    careInfo: "Bright, indirect light, weekly watering.",
    height: "1 ft",
    weight: "1.4 kg",
    size: "6x8"
  },
  {
    id: 6,
    name: "Snake Plant",
    subName: "Sansevieria",
    description: "Popular for its air purification and architectural leaves.",
    price: 590,
    discount: 12,
    reviews: 185,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61SnakeMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71SnakeSide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71SnakeRoom._SL1500_.jpg"
    ],
    category: "indoor",
    careInfo: "Low light, minimal watering.",
    height: "3 ft",
    weight: "2.5 kg",
    size: "8x10"
  },
  {
    id: 7,
    name: "Bougainvillea",
    subName: "Paper Flower",
    description: "Vibrant flowering climber perfect for fencing and outdoor decor.",
    price: 450,
    discount: 7,
    reviews: 110,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61BougainMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71BougainSide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71BougainRoom._SL1500_.jpg"
    ],
    category: "outdoor",
    careInfo: "Full sun, dry soil, minimal water.",
    height: "5 ft",
    weight: "3 kg",
    size: "10x12"
  },
  {
    id: 8,
    name: "Neem Tree",
    subName: "Azadirachta Indica",
    description: "Medicinal tree used widely in traditional medicine and pest control.",
    price: 800,
    discount: 5,
    reviews: 95,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61NeemMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71NeemSide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71NeemRoom._SL1500_.jpg"
    ],
    category: "outdoor",
    careInfo: "Full sun, regular watering in early stages.",
    height: "6 ft",
    weight: "4.5 kg",
    size: "10x12"
  },
  {
    id: 9,
    name: "Hibiscus",
    subName: "China Rose",
    description: "Tropical plant with large showy flowers, attracts butterflies.",
    price: 400,
    discount: 10,
    reviews: 130,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61HibiscusMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71HibiscusSide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71HibiscusRoom._SL1500_.jpg"
    ],
    category: "outdoor",
    careInfo: "Direct sun, moist soil, regular feeding.",
    height: "4 ft",
    weight: "2.5 kg",
    size: "10x12"
  },
  {
    id: 10,
    name: "Lemongrass",
    subName: "Cymbopogon",
    description: "Fragrant herb used for teas and mosquito repellents.",
    price: 280,
    discount: 8,
    reviews: 105,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61LemongrassMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71LemonSide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71LemonRoom._SL1500_.jpg"
    ],
    category: "outdoor",
    careInfo: "Full sun, frequent watering.",
    height: "3 ft",
    weight: "2.2 kg",
    size: "8x10"
  },
  {
    id: 11,
    name: "Jade Plant",
    subName: "Crassula Ovata",
    description: "Symbol of prosperity, can be grown outdoors in pots.",
    price: 380,
    discount: 6,
    reviews: 170,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61JadeMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71JadeSide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71JadeRoom._SL1500_.jpg"
    ],
    category: "outdoor",
    careInfo: "Sunlight, dry soil, low maintenance.",
    height: "2.5 ft",
    weight: "2.0 kg",
    size: "6x8"
  },
  {
    id: 12,
    name: "Tulsi",
    subName: "Holy Basil",
    description: "Sacred plant in India with health and spiritual benefits.",
    price: 250,
    discount: 4,
    reviews: 225,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61TulsiMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71TulsiSide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71TulsiRoom._SL1500_.jpg"
    ],
    category: "outdoor",
    careInfo: "Morning sun, water daily.",
    height: "1.8 ft",
    weight: "1.5 kg",
    size: "6x8"
  },
  {
    id: 13,
    name: "Marigold",
    subName: "Tagetes",
    description: "Bright yellow/orange blooms widely used in decoration and rituals.",
    price: 150,
    discount: 5,
    reviews: 190,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61MarigoldMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71MarigoldSide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71MarigoldRoom._SL1500_.jpg"
    ],
    category: "flowering",
    careInfo: "Full sun, regular watering.",
    height: "1.5 ft",
    weight: "0.8 kg",
    size: "6x8"
  },
  {
    id: 14,
    name: "Petunia",
    subName: "Garden Petunia",
    description: "Colorful annual flower, perfect for borders and hanging pots.",
    price: 180,
    discount: 6,
    reviews: 105,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61PetuniaMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71PetuniaSide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71PetuniaRoom._SL1500_.jpg"
    ],
    category: "flowering",
    careInfo: "Full sun, fertilize weekly.",
    height: "1 ft",
    weight: "0.7 kg",
    size: "6x8"
  },
  {
    id: 15,
    name: "Daisy",
    subName: "Bellis Perennis",
    description: "Simple, cheerful flowers symbolizing innocence and joy.",
    price: 220,
    discount: 10,
    reviews: 120,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61DaisyMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71DaisySide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71DaisyRoom._SL1500_.jpg"
    ],
    category: "flowering",
    careInfo: "Partial sun, moderate watering.",
    height: "1.5 ft",
    weight: "1.0 kg",
    size: "6x8"
  },
  {
    id: 16,
    name: "Jasmine",
    subName: "Mogra",
    description: "Fragrant white blooms used in perfumes and religious offerings.",
    price: 370,
    discount: 8,
    reviews: 160,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61JasmineMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71JasmineSide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71JasmineRoom._SL1500_.jpg"
    ],
    category: "flowering",
    careInfo: "Full sun, water regularly.",
    height: "3 ft",
    weight: "2.2 kg",
    size: "8x10"
  },
  {
    id: 17,
    name: "Chrysanthemum",
    subName: "Garden Mum",
    description: "Popular flowering plant with colorful large blooms.",
    price: 280,
    discount: 7,
    reviews: 100,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61ChrysMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71ChrysSide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71ChrysRoom._SL1500_.jpg"
    ],
    category: "flowering",
    careInfo: "Bright light, moist soil.",
    height: "2 ft",
    weight: "1.8 kg",
    size: "6x8"
  },
  {
    id: 18,
    name: "Lily",
    subName: "Oriental Lily",
    description: "Elegant and fragrant flowers perfect for gifting.",
    price: 450,
    discount: 9,
    reviews: 135,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61LilyMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71LilySide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71LilyRoom._SL1500_.jpg"
    ],
    category: "flowering",
    careInfo: "Partial sunlight, keep soil moist.",
    height: "2.5 ft",
    weight: "2.0 kg",
    size: "8x10"
  },
  {
    id: 19,
    name: "Teak",
    subName: "Tectona Grandis",
    description: "High-quality hardwood used in furniture and construction.",
    price: 1800,
    discount: 10,
    reviews: 85,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61TeakMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71TeakSide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71TeakRoom._SL1500_.jpg"
    ],
    category: "wooden",
    careInfo: "Full sun, requires space to grow.",
    height: "6 ft",
    weight: "8 kg",
    size: "10x12"
  },
  {
    id: 20,
    name: "Rosewood",
    subName: "Sheesham",
    description: "Durable hardwood tree known for its reddish grain.",
    price: 1700,
    discount: 12,
    reviews: 75,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61RosewoodMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71RosewoodSide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71RosewoodRoom._SL1500_.jpg"
    ],
    category: "wooden",
    careInfo: "Well-drained soil, full sunlight.",
    height: "5.5 ft",
    weight: "7.5 kg",
    size: "10x12"
  },
  {
    id: 21,
    name: "Sandalwood",
    subName: "Chandan",
    description: "Aromatic wood used in perfumery and religious rituals.",
    price: 2500,
    discount: 15,
    reviews: 65,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61SandalMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71SandalSide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71SandalRoom._SL1500_.jpg"
    ],
    category: "wooden",
    careInfo: "Hot climate, well‑drained soil.",
    height: "4 ft",
    weight: "6.8 kg",
    size: "10x12"
  },
  {
    id: 22,
    name: "Bamboo",
    subName: "Lucky Bamboo",
    description: "Fast-growing woody grass, used in decor and eco products.",
    price: 300,
    discount: 6,
    reviews: 155,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61BambooMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71BambooSide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71BambooRoom._SL1500_.jpg"
    ],
    category: "wooden",
    careInfo: "Indirect light, moist soil.",
    height: "3.5 ft",
    weight: "3.2 kg",
    size: "6x8"
  },
  {
    id: 23,
    name: "Neem Wood",
    subName: "Margosa Tree",
    description: "Wood with antibacterial properties, used in utensils and brushes.",
    price: 950,
    discount: 10,
    reviews: 90,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61NeemWoodMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71NeemWoodSide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71NeemWoodRoom._SL1500_.jpg"
    ],
    category: "wooden",
    careInfo: "Full sun, low water after maturity.",
    height: "5 ft",
    weight: "5 kg",
    size: "10x12"
  },
  {
    id: 24,
    name: "Indian Mahogany",
    subName: "Swietenia",
    description: "Valuable hardwood used in premium carpentry.",
    price: 2200,
    discount: 14,
    reviews: 78,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61MahoganyMain._SL1500_.jpg",
    coverImages: [
      "https://images-na.ssl-images-amazon.com/images/I/71MahoganySide._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71MahoganyRoom._SL1500_.jpg"
    ],
    category: "wooden",
    careInfo: "Well-drained soil, moderate water.",
    height: "6 ft",
    weight: "7.8 kg",
    size: "10x12"
  }
];
