import { useRouter } from 'next/navigation';

export const ROUTES = {
    home: '/',
    plants: 'plants',
    plantDetails: (id: string | number) => `plants/${id}`,
    wishlist: 'wishlist',
    cart: 'checkout',
    about: 'about',
    auth: 'auth',
    profile: 'profile',
};

export const useRoute = () => {
    const router = useRouter();
    return {
        goTo: (path: string) => router.push(path),
        redirectToHome: () => router.replace(ROUTES.home),
        goToHome: () => router.push(ROUTES.home),
        goToPlants: () => router.push(ROUTES.plants),
        goToWishlist: () => router.push(ROUTES.wishlist),
        goToAbout: () => router.push(ROUTES.about),
        goToCart: () => router.push(ROUTES.cart),
        goToProfile: () => router.push(ROUTES.profile),
        goToAuth: () => router.push(ROUTES.auth),
        goToPlantDetails: (id: string | number) => router.push(ROUTES.plantDetails(id)),
    };
};
