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

