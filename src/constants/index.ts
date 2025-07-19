import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { RiTwitterXLine } from 'react-icons/ri';

export enum keys {
  Cart = 'local_cart',
  Wishlist = 'local_wishlist',
  Theme = 'theme',
}

export const IMAGE_BASEURL = '';
export const DEFAULT_VARIENT: number = 0;

export const socialMedias = [
  { id: 1, icon: FaWhatsapp, link: 'https://wa.me/917639874667' },
  { id: 2, icon: FaInstagram, link: 'https://www.instagram.com/prasanth_nursery_garden' },
  { id: 3, icon: FaFacebookF, link: 'https://www.facebook.com/share/1Er7yzKGfL/' },
  { id: 4, icon: RiTwitterXLine, link: '#' },
];

export const LOGO: string = '/logo.png';
export const LOGO_IMAGE: string = '/logo_transparent.png';
export const DEFAULT_IMAGE: string = '/images/1.png';
export const SHOPING_CART: string = '/images/cart_not_found.jpg';
export const HERO_IMAGE: string = '/hero_1.png';
export const categories: string[] = ['All', 'Indoor', 'Outdoor', 'Flowering', 'Wooden'];

export const SHIPPING_COST: number = 40;

export const CONTACT: string = '+91 7639874667';
export const EMAIL: string = 'prasanthnursury@gmail.com';

export const USER = null;
