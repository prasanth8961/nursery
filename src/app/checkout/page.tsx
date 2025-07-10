'use client';

import { plantsData } from "@/seeds/plantData";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useCart } from "@/features/checkout/useCart";
import { MdQrCodeScanner } from "react-icons/md";
import { Html5Qrcode } from 'html5-qrcode';
import { Plant } from "@/types";
import { encryptId } from "@/lib/crypto";

const DEFAULT_IMAGE = '/images/1.png';

export default function Checkout() {
    const [imageLoadingMap, setImageLoadingMap] = useState<Record<number, boolean>>({});
    const router = useRouter();
    const { cart, toggleCart, isInCart, clearCart, totalAmount } = useCart(null);
    const [scannerOpen, setScannerOpen] = useState<boolean>(false);

    const handlePlantDetails = (id: number) => {
        const encrypted = encryptId(id);
        router.push(`/plants/${encrypted}`);
    };

    useEffect(() => {
        if (!scannerOpen || typeof window === "undefined") return;

        const qrRegionId = "qr-reader";
        const html5QrCode = new Html5Qrcode(qrRegionId);
        let isMounted = true;
        const startScanner = async () => {
            try {
                const devices = await Html5Qrcode.getCameras();
                if (!devices || devices.length === 0) {
                    alert("No camera found on this device.");
                    setScannerOpen(false);
                    return;
                }

                await html5QrCode.start(
                    { facingMode: "environment" },
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                        aspectRatio: 1.777,
                    },
                    async (decodedText) => {
                        try {
                            const id = parseInt(decodedText.trim());
                            const matched = plantsData.find(p => p.id === id);
                            if (matched) {
                                toggleCart(matched);
                            } else {
                                alert("Plant not found.");
                            }
                        } catch (err) {
                            console.error("Invalid QR content:", err);
                        } finally {
                            await html5QrCode.stop();
                            html5QrCode.clear();
                            if (isMounted) setScannerOpen(false);
                        }
                    },
                    (error) => {
                        // silent decode errors
                    }
                );
            } catch (err) {
                console.log("QR Scanner failed:", err);
                alert("Camera streaming not supported or permission denied.");
                setScannerOpen(false);
            }
        };

        setTimeout(startScanner, 100);

        return () => {
            isMounted = false;
            if (html5QrCode.isScanning) {
                html5QrCode
                    .stop()
                    .then(() => html5QrCode.clear())
                    .catch((err) => console.warn("Stop scanner error:", err));
            }
        };
    }, [scannerOpen]);


    return (
        <section className="max-w-[95vw] mx-auto py-4 sm:py-6">
            <div className="mb-4 px-2 flex justify-between">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-[var(--color-primary-dark)] border border-[var(--color-primary-light)] px-4 py-2 rounded-tl-md rounded-br-md hover:bg-[var(--color-accent-ultralight)] transition text-sm font-medium"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
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
                        Place Order <span className="text-green-500" > {totalAmount}</span>
                    </button>
                    <button
                        onClick={() => clearCart()}
                        className="flex items-center text-red-500 border border-[var(--color-primary-light)] px-4 py-1 rounded-tl-md rounded-br-md hover:bg-[var(--color-accent-ultralight)] transition text-xs font-medium"
                    >
                        Clear
                    </button>
                </div>
            </div>

            <div className="h-px bg-gray-300 w-full my-2"></div>

            {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-16 px-4 text-[var(--color-primary)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20 text-[var(--color-accent-light)] mb-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M6 6h15l-1.5 9h-13z" />
                        <circle cx="9" cy="20" r="1" />
                        <circle cx="18" cy="20" r="1" />
                        <path d="M6 6l-2 0" />
                        <path d="M5 6l-1.5-4" />
                        <path d="M8 10l1 1" />
                        <path d="M10 10l-1 1" />
                        <path d="M14 10l1 1" />
                        <path d="M16 10l-1 1" />
                    </svg>

                    <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                    <p className="hidden sm:block text-sm text-[var(--color-accent-mid)] mb-4 max-w-xs">
                        You haven’t added any plants to your cart yet. Explore and find your perfect greens!
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        className="hidden sm:block px-6 py-2 bg-[var(--color-primary-light)] text-white rounded-xs rounded-tl-xl rounded-br-xl hover:bg-[var(--color-primary)] transition font-medium cursor-pointer"
                    >
                        Browse Plants
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-3 px-2 mt-4">
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
                                        className={`object-cover  transition-transform duration-300 ease-in-out group-hover:scale-105 ${isLoading ? "opacity-0" : "opacity-100"}`}
                                        onLoadingComplete={() =>
                                            setImageLoadingMap((prev) => ({ ...prev, [plant.id]: false }))
                                        }
                                    />
                                </div>
                                <div className="p-3 w-[50%] flex flex-col gap-1">
                                    <h2 className="text-base font-semibold text-[var(--color-accent-dark)] truncate">{plant.name}</h2>
                                    {plant.subName && <p className="text-sm text-gray-500 italic truncate">{plant.subName}</p>}
                                    <div className="mt-2 flex justify-between items-center w-full">
                                        <div className="text-green-700 font-semibold text-base">
                                            ₹{plant.price}
                                            {plant.discount > 0 && (
                                                <span className="ml-2 text-red-500 line-through font-normal text-sm">₹{originalPrice}</span>
                                            )}
                                        </div>
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePlantDetails(plant.id);
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

            <div className="block sm:hidden fixed bottom-0 z-50 w-full bg-white border-t border-green-300 shadow-md">
                <div className="relative flex justify-center items-center h-[64px]">
                    <button
                        className="absolute -top-8 w-16 h-16 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition active:scale-95"
                        onClick={() => setScannerOpen(true)}
                    >
                        <MdQrCodeScanner size={32} color="white" />
                    </button>
                </div>
            </div>

            {scannerOpen && (
                <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
                    <div
                        id="qr-reader"
                        className="w-full h-full bg-black"
                    ></div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <div className="w-60 h-60 border-4 border-green-400 rounded-xl opacity-80 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full">
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-green-400 animate-scan-line z-10">
                                </div>
                            </div>
                        </div>
                        <p className="text-white mt-6 text-sm opacity-80">Align QR code within frame</p>
                    </div>

                    <button
                        onClick={() => setScannerOpen(false)}
                        className="absolute top-4 right-4 z-50 bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full p-2"
                    >
                        <FaTimes className="text-white text-lg" />
                    </button>
                </div>
            )
            }

        </section>
    );
}