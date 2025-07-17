'use client';

import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { FaArrowRight, FaHeart, FaLeaf } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useWishlist } from "@/features/wishlist/useWishList";
import { IoStarHalfSharp, IoStarOutline, IoStarSharp } from "react-icons/io5";
import { Plant } from "@/types";
import { encryptId } from "@/lib/crypto";
import { DEFAULT_IMAGE } from "@/constants";
import { useRoute } from "@/routes";
import { Loader } from "@/components/common/Loader";

export default function WishList() {
    const [imageLoadingMap, setImageLoadingMap] = useState<Record<number, boolean>>({});
    const router = useRouter();
    const { goToPlantDetails, goToHome } = useRoute();
    const { wishlist, toggleWishlist, isInWishlist } = useWishlist(null);
    const [totalAmount, setTotalAmount] = useState<string>('0.00');
    const [isPending, startTransition] = useTransition();
    const [isPageReady, setIsPageReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsPageReady(true), 300);
        return () => clearTimeout(timer);
    }, []);


    const handleClick = (id: string) => {
        startTransition(() => {
            goToPlantDetails(id);
        });
    };

    useEffect(() => {
        const amount = wishlist.reduce((prev, item) => prev + item.price, 0);
        const formattedAmount = amount.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
        });
        setTotalAmount(formattedAmount)
    }, [wishlist])

    if (!isPageReady) return <Loader />;

    return (
        <section className="max-w-[95vw] mx-auto py-4 sm:py-6">
            <div className="mb-4 px-2 flex justify-between">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-[var(--color-primary-dark)] border border-[var(--color-primary-light)] px-4 py-2 rounded-tl-md rounded-br-md hover:bg-[var(--color-accent-ultralight)] transition text-sm font-medium"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="green"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                {
                    wishlist.length > 0 && (
                        <button
                            className="flex flex-col items-center text-[var(--color-primary-dark)] border border-[var(--color-primary-light)] px-4 py-1 rounded-tl-md rounded-br-md hover:bg-[var(--color-accent-ultralight)] transition text-xs font-medium"
                        >
                            Buy Now <span className="text-green-500" > {totalAmount}</span>
                        </button>
                    )
                }

            </div>
            <div className="h-px bg-gray-300 w-full my-2"></div>
            {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-600">
                    <FaLeaf className="text-green-500 text-5xl mb-4" />
                    <h2 className="text-xl font-semibold">No Favorites Yet!</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Looks like you haven't added any plants yet. Let's explore the greenery and bring your space to life!
                    </p>
                    <div
                        onClick={() => goToHome()}
                        style={{ textShadow: '2px 2px 4px rgba(17, 116, 46, 0.2)' }}
                        className="px-6 py-3 mt-3 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-lime-500 to-green-400 font-semibold"
                    > Browse Plants
                    </div>
                </div>

            ) : (
                <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 px-2 mt-4">
                    {wishlist.map((plant: Plant) => {
                        const isLoading = imageLoadingMap[plant.id] ?? true;
                        const originalPrice = Math.round(plant.price / (1 - plant.discount / 100));

                        return (
                            <div
                                key={plant.id}
                                className="group rounded-md shadow-sm border border-[var(--color-primary-light)] hover:shadow-lg transition-all duration-300"
                            >
                                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-md">
                                    {isLoading && (
                                        <div className="absolute inset-0 bg-gray-200 animate-pulse z-10 rounded-md" />
                                    )}

                                    <Image
                                        src={plant.imageUrl || DEFAULT_IMAGE}
                                        alt={plant.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 300px"
                                        className={`object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 ${isLoading ? "opacity-0" : "opacity-100"
                                            }`}
                                        onLoadingComplete={() =>
                                            setImageLoadingMap((prev) => ({ ...prev, [plant.id]: false }))
                                        }
                                    />

                                    <div
                                        className="absolute right-2 top-2 z-30 bg-white px-2 py-2 rounded-full shadow cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleWishlist(plant);
                                        }}
                                    >
                                        <FaHeart className={`transition ${isInWishlist(plant.id) ? 'text-green-500' : 'text-gray-300'}`} />
                                    </div>
                                </div>

                                <div className="p-3 flex flex-col gap-1">
                                    <h2 className="text-base font-semibold text-[var(--color-accent-dark)] truncate">
                                        {plant.name}
                                    </h2>
                                    {plant.subName && (
                                        <p className="text-sm text-gray-500 italic truncate">{plant.subName}</p>
                                    )}

                                    <div className="mt-2 flex justify-between items-center w-full">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1 sm:gap-2 text-sm mt-1">
                                                {Array.from({ length: 5 }, (_, i) => {
                                                    const filled = i + 1 <= Math.floor(plant.ratings);
                                                    const half = i + 0.5 === plant.ratings;
                                                    return (
                                                        <span key={i} className="text-green-500">
                                                            {filled ? <IoStarSharp /> : half ? <IoStarHalfSharp /> : <IoStarOutline />}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                            <div className="text-green-700 font-semibold text-base">
                                                {plant.discount > 0 && (
                                                    <span className="mr-2 text-red-500 line-through font-normal text-sm">₹{originalPrice}</span>
                                                )}
                                                ₹{plant.price}
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleClick(encryptId(plant.id));
                                            }}
                                            disabled={isPending}
                                            className={`rounded-tl-md rounded-br-md p-3 flex items-center justify-center text-sm font-semibold tracking-wide transition-all duration-200 ${isPending
                                                ? "bg-green-100 cursor-not-allowed"
                                                : "bg-[var(--color-primary-light)] hover:bg-[var(--color-primary-dark)] text-white"
                                                }`}
                                        >
                                            {isPending ? (
                                                <span className="animate-spin h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full" />
                                            ) : (
                                                <FaArrowRight className="text-white text-base" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
