'use client'

import { Plant, plantsData } from "@/seeds/plantData";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from 'next/navigation';
const categories = ["Indoor", "Outdoor", "Flowering", "wooden"];



const DEFAULT_IMAGE = '/images/1.png'; 


export const Products = () => {
    const [active, setActive] = useState<string>(categories[0]);
    const [filteredPlants, setFilteredPlants] = useState<Plant[]>(plantsData);
    const [imageLoading, setImageLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const filtered = plantsData.filter((plant) => plant.category.toLocaleLowerCase() === active.toLowerCase());
        setFilteredPlants(filtered.slice(0, 6));
    }, [active]);

    const handlePlantDetails = (_id: number) => {
        router.push(`/plant-detail?id=${_id}`);
    }

    return (
        <section className="max-w-[90vw] mx-auto py-2 sm:py-5">
            <div className="w-full  overflow-x-auto">
                <div className="flex items-start gap-4 px-1 min-w-max lg:justify-between lg:px-4">
                    <div className="flex gap-2 sm:gap-4 flex-wrap lg:flex-nowrap">
                        {categories.map((category, idx) => (
                            <div
                                key={idx}
                                onClick={() => setActive(category)}
                                className="flex flex-col items-center cursor-pointer"
                            >
                                <span
                                    className={`text-sm font-medium transition-colors duration-200 ${active === category
                                        ? "text-[var(--color-primary-dark)]"
                                        : "text-[var(--color-primary)] hover:text-[var(--color-primary-light)]"
                                        }`}
                                >
                                    {category}
                                </span>

                                <div
                                    className={`h-[2px] mt-1 w-full rounded-full transition-all duration-300 ${active === category
                                        ? "bg-[var(--color-primary)]"
                                        : "bg-transparent"
                                        }`}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="ml-auto text-sm text-[var(--background)] font-medium text-white py-1 px-3 flex items-center justify-center rounded-md font-semibold bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary-dark)] hover:from-[var(--color-primary-light)] hover:to-[var(--color-primary)] cursor-pointer transition-colors duration-300 whitespace-nowrap"
                        onClick={() => router.push('/all-plants')}
                    >
                        See More
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-[3px] sm:gap-3 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-2 mt-4">
                {filteredPlants.map((plant) => (
                    <div
                        key={plant.id}
                        onClick={() => handlePlantDetails(plant.id)}
                        className="rounded-tl-xl rounded-br-xl shadow-sm hover:shadow-xl transition-all duration-300 mb-2"
                    >
                        <div className="relative w-full aspect-[3/3] sm:aspect-[2/3] overflow-hidden rounded-t-sm">
                            {imageLoading && (
                                <div className="absolute inset-0 z-10 bg-gray-200 animate-pulse rounded-tl-xl" />
                            )}

                            <Image
                                src={plant.imageUrl}
                                alt={plant.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 300px"
                                className={`object-contain transition-transform duration-300 ease-in-out hover:scale-105 ${imageLoading ? 'opacity-0' : 'opacity-100'
                                    }`}
                                onLoadingComplete={() => setImageLoading(false)}
                            />

                            <div className="absolute right-2 top-2 z-30 bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 rounded-tl-md rounded-br-md shadow-md text-xs font-bold tracking-wide animate-bounce">
                                {plant.discount}% OFF
                            </div>
                        </div>

                        <div className="p-1 flex flex-col">
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