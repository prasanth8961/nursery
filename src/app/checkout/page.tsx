'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaLeaf, FaTimes } from "react-icons/fa";
import { useCart } from "@/features/checkout/useCart";
import { Plant } from "@/types";
import { encryptId } from "@/lib/crypto";
import { DEFAULT_IMAGE, SHIPPING_COST } from "@/constants";
import { useRoute } from "@/routes";
import { useRouter } from 'next/navigation';
import { Loader } from "@/components/common/Loader";
import { IoStarHalfSharp, IoStarOutline, IoStarSharp } from "react-icons/io5";

export default function Checkout() {
    const [imageLoadingMap, setImageLoadingMap] = useState<Record<number, boolean>>({});
    const { goToPlantDetails, goToHome } = useRoute();
    const [confirmation, setconfirmation] = useState<boolean>(false);
    const { cart, toggleCart, isInCart, clearCart, totalAmount } = useCart(null);
    const router = useRouter()

    const [isPageReady, setIsPageReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsPageReady(true), 300);
        return () => clearTimeout(timer);
    }, []);

    if (!isPageReady) return <Loader />;

    return (
        <section className="max-w-[95vw] mx-auto py-4 sm:py-6">
            <div className="mb-4 px-2 flex justify-between">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-[var(--color-primary-dark)] border border-[var(--color-primary-light)] px-4 py-2 rounded-tl-md rounded-br-md hover:bg-[var(--color-accent-ultralight)] transition text-sm font-semibold"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="green">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                {
                    cart.length > 0 && (
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    const lines = cart.map(item => `🌿 ${item.name} - ₹${item.price}`).join('\n');
                                    const total = cart.reduce((sum, item) => sum + item.price, 0);

                                    const fullMsg = `Hi, I want to order the following plants:\n\n${lines}\n\nTotal: ₹${total}`;
                                    const whatsappURL = `https://wa.me/917639874667?text=${encodeURIComponent(fullMsg)}`;
                                    window.open(whatsappURL, '_blank');
                                }}
                                className="flex flex-col items-center text-[var(--color-primary-dark)] border border-[var(--color-primary-light)] px-4 py-1 rounded-tl-md rounded-br-md hover:bg-[var(--color-accent-ultralight)] transition text-xs font-medium"
                            >
                                Place Order <span className="text-green-500" > {totalAmount + SHIPPING_COST}</span>
                            </button>
                            <button
                                onClick={() => setconfirmation(true)}
                                className="flex items-center text-red-500 border border-[var(--color-primary-light)] px-4 py-1 rounded-tl-md rounded-br-md hover:bg-[var(--color-accent-ultralight)] transition text-xs font-medium"
                            >
                                Clear
                            </button>
                            {confirmation && (
                                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
                                    <div className="bg-white p-5 rounded-lg shadow-xl w-[90%] max-w-sm">
                                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                            Are you sure you want to clear the cart?
                                        </h2>

                                        <div className="flex justify-end gap-3 mt-4">
                                            <button
                                                onClick={() => setconfirmation(false)}
                                                className="px-4 py-2 rounded-md border border-gray-300 text-red-700 hover:bg-gray-100 transition"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => {
                                                    clearCart();
                                                    setconfirmation(false);
                                                }}
                                                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-red-700 transition"
                                            >
                                                Yes, Clear
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                }
            </div>

            <div className="h-px bg-gray-300 w-full my-2"></div>
            {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-600">
                    <FaLeaf className="text-green-500 text-5xl mb-4" />
                    <h2 className="text-xl font-semibold">Your Cart is Empty</h2>
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
                <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 sm:gap-3 px-2 mt-4">
                    {cart.map((plant: Plant) => {
                        const isLoading = imageLoadingMap[plant.id] ?? true;
                        const originalPrice = Math.round(plant.price / (1 - plant.discount / 100));

                        return (
                            <div key={plant.id} className="flex rounded-md shadow-sm border border-[var(--color-primary-light)] hover:shadow-lg transition-all duration-300 relative">
                                <div className="relative w-[50%] aspect-[5/3] overflow-hidden rounded-t-md">
                                    {isLoading && (
                                        <div className="absolute inset-0 bg-gray-200 animate-pulse z-10 rounded-md" />
                                    )}
                                    <Image
                                        src={plant.imageUrl || DEFAULT_IMAGE}
                                        alt={plant.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 300px"
                                        className={`object-cover p-1  transition-transform duration-300 ease-in-out group-hover:scale-105 ${isLoading ? "opacity-0" : "opacity-100"}`}
                                        onLoadingComplete={() =>
                                            setImageLoadingMap((prev) => ({ ...prev, [plant.id]: false }))
                                        }
                                    />
                                </div>
                                <div className="p-3 w-[50%] flex flex-col gap-1">
                                    <h2 className="text-base font-semibold text-[var(--color-accent-dark)] truncate">{plant.name}</h2>
                                    {plant.subName && <p className="text-sm text-gray-500 italic truncate">{plant.subName}</p>}
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
                                                ₹{plant.price}
                                                {plant.discount > 0 && (
                                                    <span className="ml-2 text-red-500 line-through font-normal text-sm">₹{originalPrice}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                goToPlantDetails(encryptId(plant.id));
                                            }}
                                            className="rounded-tl-md rounded-br-md p-2 bg-[var(--color-primary-light)] hover:bg-[var(--color-primary-dark)] text-white flex items-center justify-center text-sm font-semibold tracking-wide transition-colors duration-200"
                                        >
                                            Details
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="absolute right-1 top-1 z-30 px-2 py-2 border rounded-tl-md rounded-br-md border-green-500 shadow cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleCart(plant);
                                    }}
                                >
                                    <FaTimes className={`transition ${isInCart(plant.id) ? 'text-green-500' : 'text-gray-300'}`} />
                                </div>
                            </div>
                        );
                    })}

                </div>
            )}

            {cart.length > 0 && (
                <div className="border border-green-200 rounded-md mt-5  px-4 py-3 mx-2 sm:mx-0">
                    <h3 className="text-lg font-semibold text-green-700 mb-2">🧾 Order Summary</h3>
                    <ul className="text-sm text-green-900 space-y-1 mb-3">
                        {cart.map((item) => (
                            <li key={item.id} className="flex justify-between">
                                <span>{item.name}</span>
                                <span>₹{item.price}</span>
                            </li>
                        ))}
                    </ul>
                    <hr className="my-2 text-green-400" />
                    <div className="text-sm text-green-800 space-y-1">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{totalAmount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>₹{SHIPPING_COST}</span>
                        </div>
                        <hr className="my-2 text-green-400" />
                        <div className="flex justify-between font-semibold text-green-700">
                            <span>Total</span>
                            <span>₹{Math.round(totalAmount + SHIPPING_COST)}</span>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}