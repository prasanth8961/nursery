'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useWishlist } from "@/features/wishlist/useWishList";
import { Plant } from "@/types";
import { encryptId } from "@/lib/crypto";

const DEFAULT_IMAGE = '/images/1.png';

export default function WishList() {
    const [imageLoadingMap, setImageLoadingMap] = useState<Record<number, boolean>>({});
    const router = useRouter();
    const { wishlist, toggleWishlist, isInWishlist } = useWishlist(null);
    const [totalAmount, setTotalAmount] = useState<string>('0.00');

    const handlePlantDetails = (id: number) => {
        const encrypted = encryptId(id)
        router.push(`/plants/${encrypted}`);
    };

    useEffect(() => {
        const amount = wishlist.reduce((prev, item) => prev + item.price, 0);
        const formattedAmount = amount.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
        });
        setTotalAmount(formattedAmount)

    }, [wishlist])

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
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    className="flex flex-col items-center text-[var(--color-primary-dark)] border border-[var(--color-primary-light)] px-4 py-1 rounded-tl-md rounded-br-md hover:bg-[var(--color-accent-ultralight)] transition text-xs font-medium"
                >
                    Buy Now <span className="text-green-500" > {totalAmount}</span>
                </button>

            </div>
            <div className="h-px bg-gray-300 w-full my-2"></div>
            {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-16 px-4 text-[var(--color-primary)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20 text-[var(--color-accent-light)] mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 8.25V6a3 3 0 013-3h12a3 3 0 013 3v2.25M21 8.25v9a3 3 0 01-3 3H6a3 3 0 01-3-3v-9M3 8.25L12 13.5l9-5.25"
                        />
                    </svg>
                    <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-2 bg-[var(--color-primary-light)]   text-white rounded-xs rounded-tl-xl rounded-br-xl hover:bg-[var(--color-primary)] transition font-medium cursor-pointer"
                    >
                        Browse Plants
                    </button>
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

                                    <div className="mt-2 flex justify-between items-center">
                                        <div className="text-green-700 font-semibold text-base">
                                            ₹{plant.price}
                                            {plant.discount > 0 && (
                                                <span className="ml-2 text-red-500 line-through font-normal text-sm">
                                                    ₹{originalPrice}
                                                </span>
                                            )}
                                        </div>

                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePlantDetails(plant.id);
                                            }}
                                            className="rounded-tl-md rounded-br-md p-2 bg-[var(--color-primary-light)] hover:bg-[var(--color-primary-dark)] text-white flex items-center justify-center text-sm font-semibold tracking-wide transition-colors duration-200"
                                        >
                                            <FaArrowRight className="text-white text-base" />
                                        </div>
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
