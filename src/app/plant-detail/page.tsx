'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { plantsData } from '@/seeds/plantData';
import { FaArrowLeft, FaStar, FaHeart } from 'react-icons/fa';
import Image from 'next/image';

export default function Details() {
    const searchParams = useSearchParams();
    const id = Number(searchParams.get('id'));
    const router = useRouter();

    const plant = plantsData.find((p) => p.id === id);
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
                    <button className="px-4 py-2 rounded-tl-md rounded-br-md border border-[var(--color-primary)] text-[var(--color-primary-dark)] hover:bg-[var(--color-primary-light)] transition">
                        <FaHeart />
                    </button>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                        <Image src="/images/1.png" alt={plant.name} fill className="object-fit" />
                    </div>

                    <div className="flex gap-3 overflow-x-auto">
                        {[plant.imageUrl, ...(plant.coverImages || [])].map((url, idx) => (
                            <div key={idx} className="relative min-w-[96px] h-24 rounded-md overflow-hidden border">
                                <Image src="/images/1.png" alt={`${plant.name} preview ${idx + 1}`} fill className="object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full">
                    <div className="sm:hidden fixed bottom-0 py-5 left-0 w-full bg-[var(--color-accent-light)] rounded-t-[2rem] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4 z-50">
                        <h1 className="text-xl font-bold text-[var(--color-accent)]">{plant.name}</h1>
                        {plant.subName && (
                            <p className="italic text-[var(--color-accent)] text-sm">{plant.subName}</p>
                        )}
                        <p className="text-[var(--color-accent)] text-sm mt-2 line-clamp-3">{plant.description}</p>

                        <div className="flex justify-between items-center mt-4">
                            <div>
                                <span className="text-xl text-[var(--color-accent)] font-semibold">₹{plant.price}</span>
                                {plant.discount > 0 && (
                                    <span className="ml-2 text-sm text-[var(--color-accent)] line-through">
                                        ₹{Math.round(plant.price / (1 - plant.discount / 100))}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-yellow-950">
                                <FaStar />
                                <span className="text-sm text-[var(--color-accent)]">{plant.reviews.toLocaleString()} reviews</span>
                            </div>
                        </div>

                        <div className="mt-4 px-4 py-3 bg-[var(--color-accent-ultralight)] rounded-xl border border-[var(--color-primary-light)]">
                            <h3 className="text-sm font-semibold text-[var(--color-primary-dark)] mb-1">Care Instructions</h3>
                            <p className="text-sm text-[var(--color-accent)]">{plant.careInfo}</p>
                        </div>
                    </div>

                    <div className="hidden sm:flex flex-col gap-5 rounded-xl p-6 max-w-full">
                        <h1 className="text-3xl font-bold text-[var(--color-primary-dark)]">{plant.name}</h1>
                        {plant.subName && (
                            <p className="text-base italic text-[var(--color-accent-dark)]">{plant.subName}</p>
                        )}

                        <p className="text-sm text-gray-700 leading-relaxed">{plant.description}</p>

                        <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl text-green-700 font-bold">₹{plant.price}</span>
                                {plant.discount > 0 && (
                                    <span className="text-base text-red-500 line-through">
                                        ₹{Math.round(plant.price / (1 - plant.discount / 100))}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2 text-yellow-500">
                                <FaStar />
                                <span className="text-sm text-gray-800">{plant.reviews.toLocaleString()} reviews</span>
                            </div>
                        </div>

                        <div className="bg-white border-l-4 border-[var(--color-primary-light)] p-4 rounded-md shadow-sm">
                            <h3 className="font-semibold text-[var(--color-primary-dark)] mb-1">Care Instructions</h3>
                            <p className="text-sm text-gray-700">{plant.careInfo}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
