'use client'

import { Plant, plantsData } from "@/seeds/plantData";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from 'next/navigation';
const categories = ["Indoor", "Outdoor", "Flowering", "wooden"];



const DEFAULT_IMAGE = '/images/1.png'; 


export const WishList = () => {
    const [wishList, setWishList] = useState<object[]>([]);
    const [imageLoading, setImageLoading] = useState(true);
    const router = useRouter();


    const handlePlantDetails = (_id: number) => {
        router.push(`/plant-detail?id=${_id}`);
    }

    return (
        <section className="max-w-[90vw] mx-auto py-2 sm:py-5">
            <div className="grid grid-cols-2 gap-1  sm:gap-3 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-2 px-1 mt-4">
                {wishList.map((plant : any) => (
                    <div
                        key={plant?.id}
                        onClick={() => handlePlantDetails(plant.id)}
                        className="rounded-tl-md rounded-br-md shadow-sm hover:shadow-xl transition-all duration-300 mb-2"
                    >
                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-sm">
                            {imageLoading && (
                                <div className="absolute inset-0 z-10 bg-gray-200 animate-pulse rounded-t-sm" />
                            )}

                            <Image
                                src={'/images/1.png'}
                                alt={plant.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 300px"
                                className={`object-cover transition-transform duration-300 ease-in-out hover:scale-105 ${imageLoading ? 'opacity-0' : 'opacity-100'
                                    }`}
                                onLoadingComplete={() => setImageLoading(false)}
                            />

                            <div className="absolute right-2 top-2 z-30 bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 rounded-tl-md rounded-br-md shadow-md text-xs font-bold tracking-wide animate-bounce">
                                Heart Icon
                            </div>
                        </div>

                        <div className="p-2 flex flex-col gap-2">
                            <h2 className="text-lg font-semibold text-[var(--color-accent-dark)] truncate">
                                {plant.name}
                            </h2>

                            {plant.subName && (
                                <p className="text-sm text-gray-500 italic truncate">{plant.subName}</p>
                            )}

                            <div className="mt-1 flex justify-between items-center">
                                <div className="text-green-700 font-semibold text-base">
                                    ₹{plant.price}
                                    {plant.discount > 0 && (
                                        <span className="ml-2 text-red-500 line-through font-normal text-sm">
                                            ₹{Math.round(plant.price / (1 - plant.discount / 100))}
                                        </span>
                                    )}
                                </div>

                                <div className="rounded-tl-md rounded-br-md p-2 bg-[var(--color-primary-light)] hover:bg-[var(--color-primary-dark)] text-white flex items-center justify-center text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer"
                                    onClick={() => handlePlantDetails(plant.id)}
                                >
                                    <FaArrowRight className="text-white text-base" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </section>

    )
};