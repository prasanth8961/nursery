export interface Plant {
  id: number;
  name: string;
  tamilName?: string;
  subName?: string;
  description: string;
  price: number;
  discount: number;
  reviewsCount: number;
  ratings: number;
  imageUrl: string;
  coverImages: string[];
  category: "indoor" | "outdoor" | "flowering" |  "wooden" | "succulent" | "bonsai";
  careInfo: string;
  fertilizingInfo: string;
  usageInfo: string;  
  isAvailable: boolean;
  quantityInStock: number;
  growthRate: "slow" | "medium" | "fast";
  tags?: string[];
  relatedPlantsIds: number[];
  isFeatured: boolean;
  height: string;
  weight: string;
  size: string;
}

export interface Media {
  id: number;
  icon: any;
  link: string
}


export interface UseWishlistReturn {
  wishlist: Plant[];
  toggleWishlist: (plant: Plant) => void;
  isInWishlist: (plantId: number) => boolean;
}

export interface UseCartReturn {
  cart: Plant[];
  toggleCart: (plant: Plant) => void;
  isInCart: (plantId: number) => boolean;
  clearCart: () => void;
  totalAmount: number;
}