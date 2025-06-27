'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { plantsData } from '@/seeds/plantData';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Image from 'next/image';

export default function Details() {
    const searchParams = useSearchParams();
    const id = Number(searchParams.get('id'));
    const router = useRouter();

    const plant = plantsData.find((p) => p.id === id);
    const imageList = plant ? [...(plant.coverImages || []), plant.imageUrl] : [];
    const [selectedImage, setSelectedImage] = useState<string>(imageList[0]);

    if (!plant) return <div className="p-4 text-red-500 font-semibold">Plant not found</div>;

    return (
        <div className="p-2 sm:p-4 lg:p-6 max-w-7xl mx-auto">
            <div className="flex gap-2 justify-between items-center">
                <button
                    onClick={() => router.back()}
                    className="h-10 w-10 bg-[var(--color-accent-ultralight)] rounded-tl-md rounded-br-md border-2 border-[var(--color-accent-light)] flex items-center justify-center hover:bg-[var(--color-accent-mid)] text-[var(--color-primary-dark)] transition cursor-pointer"
                >
                    <FaArrowLeft size={14} />
                </button>

                <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 rounded-tl-md rounded-br-md bg-[var(--color-primary-dark)] text-white font-medium hover:bg-[var(--color-primary)] cursor-pointer transition">
                        Add to Cart
                    </button>
                    <button className="px-4 py-2 bg-[var(--color-primary-dark)] text-white font-medium hover:bg-[var(--color-primary)] rounded-tl-md rounded-br-md cursor-pointer border border-[var(--color-primary)] text-[var(--color-primary-dark)] hover:bg-[var(--color-primary-light)] transition">
                        {
                            false ? <FaHeart /> : <FaRegHeart color='white' />
                        }
                    </button>
                </div>
            </div>

            <div className="p-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <div className="relative  border border-[var(--color-accent-light)] aspect-square lg:aspect-[3/3] rounded-tl-2xl rounded-br-2xl overflow-hidden">
                            <Image
                                src={plant.imageUrl}
                                alt={plant.name}
                                fill
                                className="object-contain rounded-lg transition duration-200 hover:scale-105"
                            />
                        </div>
                        <div className="flex gap-2 mt-4 overflow-x-auto">
                            {imageList.map((url, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedImage(url)}
                                    className={`relative min-w-[96px] h-24 rounded-md overflow-hidden border-2 cursor-pointer transition 
                                    ${selectedImage === url
                                            ? 'border-[var(--color-primary-dark)]'
                                            : 'border-gray-200'}`}
                                >
                                    <Image
                                        src={url}
                                        alt={`${plant.name} preview ${idx + 1}`}
                                        fill
                                        className="object-fit"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className='flex items-center gap-2'>
                            <h1 className="text-3xl font-bold text-[var(--color-primary-dark)]">{plant.name}</h1>
                            {plant.subName && (
                                <p className="italic text-[var(--color-accent-mid)] text-xl">({plant.subName})</p>
                            )}
                        </div>

                        <div className="flex items-center gap-2 text-md">
                            {Array.from({ length: 5 }, (_, i) => {
                                const filled = i + 1 <= Math.floor(plant.reviews);
                                const half = i + 0.5 === plant.reviews;
                                return (
                                    <span key={i} className="text-yellow-500">
                                        {filled ? <FaStar /> : half ? <FaStarHalfAlt /> : <FaRegStar />}
                                    </span>
                                );
                            })}
                            <span className="ml-1">{plant.reviews.toFixed(1)} reviews</span>
                        </div>
                        <p className="text-sm leading-relaxed">{plant.description}</p>
                        <div className="grid grid-cols-3 gap-4 text-sm mt-4">
                            {[
                                { label: 'Size', value: plant.size },
                                { label: 'Height', value: plant.height },
                                { label: 'Weight', value: plant.weight },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="border border-[var(--color-accent-light)] rounded-xl p-4 shadow-sm flex flex-col items-center text-center"
                                >
                                    <span className="text-xs text-[var(--color-primary)]">{item.label}</span>
                                    <span className="text-base font-semibold text-[var(--color-primary-light)]">{item.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[var(--color-accent-ultralight)] border border-[var(--color-accent-dark)] rounded-md p-4 mt-2">
                            <h3 className="font-semibold text-[var(--color-primary-dark)] mb-1">Care Instructions</h3>
                            <p className="text-sm text-[var(--foreground)]">{plant.careInfo}</p>
                        </div>
                        <div className="flex items-center justify-between  border border-[var(--color-accent-mid)] rounded-sm rounded-tl-2xl rounded-br-2xl shadow-sm px-6 py-4">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl font-bold text-[var(--color-primary-dark)]">₹{plant.price}</span>
                                    {plant.discount > 0 && (
                                        <span className="text-md text-red-500 line-through">
                                            ₹{Math.round(plant.price / (1 - plant.discount / 100))}
                                        </span>
                                    )}
                                </div>
                                {plant.discount > 0 && (
                                    <span className="text-sm text-green-700 font-medium mt-1">
                                        {plant.discount}% off
                                    </span>
                                )}
                            </div>
                            <button className="px-6 py-2 rounded-sm rounded-tl-xl rounded-br-xl  bg-[var(--color-primary-dark)] text-white font-semibold shadow hover:bg-[var(--color-primary)] transition">
                                Order Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
