import { IconType } from 'react-icons';

export interface PlantVariant {
  id: string;
  size: string;
  price: number;
  discount: number;
  ratings: number;
  reviewsCount: number;
  growthRate: string;
  height: string;
  weight: string;
  quantityInStock: number;
  coverImages: string[];
  isAvailable: boolean;
}

export interface Plant {
  id: number;
  name: string;
  tamilName?: string;
  subName?: string;
  description: string;
  baseImageUrl: string;
  category: 'indoor' | 'outdoor' | 'flowering' | 'wooden' | 'succulent' | 'bonsai';
  careInfo: string;
  fertilizingInfo: string;
  usageInfo: string;
  isFeatured: boolean;
  isAvailable: boolean;
  tags: string[];
  relatedPlantsIds: number[];
  variants: PlantVariant[];
}

export interface Media {
  id: number;
  icon: IconType;
  link: string;
}

export interface AboutItem {
  icon: string;
  title: string;
  text: string;
}

export interface CartItem {
  variantId: string;
  plantId: number;
  name: string;
  tamilName?: string;
  subName?: string;
  category: Plant['category'];
  baseImageUrl: string;
  variant: PlantVariant;
}

export interface WishListItem {
  variantId: string;
  plantId: number;
  name: string;
  tamilName?: string;
  subName?: string;
  category: Plant['category'];
  baseImageUrl: string;
  variant: PlantVariant;
}

export interface UseCartReturn {
  cart: WishListItem[];
  toggleCart: (plant: Plant, variant: PlantVariant) => void;
  isInCart: (variantId: string) => boolean;
  clearCart: () => void;
  totalAmount: number;
}

export interface UseWishlistReturn {
  wishlist: WishListItem[];
  toggleWishlist: (plant: Plant, variant: PlantVariant) => void;
  isInWishlist: (plantId: string) => boolean;
  clearWishlist: () => void;
}
