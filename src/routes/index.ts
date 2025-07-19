import { useRouter } from 'next/navigation';

export const ROUTES = {
  home: '/',
  plants: '/plants',
  plantDetails: (id: string | number, variantId?: string) =>
    variantId ? `/plants/${id}?variantId=${variantId}` : `/plants/${id}`,
  wishlist: '/wishlist',
  cart: '/checkout',
  about: '/about',
  auth: '/auth',
  profile: '/profile',
  notfound: '/404',
};

export const useRoute = () => {
  const router = useRouter();
  return {
    goTo: (path: string) => router.push(path),
    goToBack: () => router.back(),
    redirectToHome: () => router.replace(ROUTES.home),
    goToHome: () => router.push(ROUTES.home),
    goToPlants: () => router.push(ROUTES.plants),
    goToWishlist: () => router.push(ROUTES.wishlist),
    goToAbout: () => router.push(ROUTES.about),
    goToCart: () => router.push(ROUTES.cart),
    redirectToCart: () => router.push(ROUTES.cart),
    redirectToWishList: () => router.push(ROUTES.wishlist),
    goToProfile: () => router.push(ROUTES.profile),
    goToAuth: () => router.push(ROUTES.auth),
    goToNotFound: () => router.push(ROUTES.notfound),
    goToPlantDetails: (id: string | number, variantId?: string) =>
      router.push(ROUTES.plantDetails(id, variantId)),
  };
};
