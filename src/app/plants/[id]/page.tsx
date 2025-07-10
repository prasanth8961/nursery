'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { plantsData } from '@/seeds/plantData';
import { FaArrowLeft, FaHeart, FaRegHeart, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Image from 'next/image';
import { useWishlist } from '@/features/wishlist/useWishList';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/features/checkout/useCart';
import { decryptId } from '@/lib/crypto';


export default function Details() {
    const params = useParams();
    const encryptedId = params.id;

    const _id = decryptId(encryptedId as string);


    const searchParams = useSearchParams();

    const id = Number(searchParams.get('id'));
    const router = useRouter();

    const { toggleWishlist, isInWishlist } = useWishlist(null);
    const { cart, toggleCart, isInCart, clearCart, totalAmount } = useCart(null);

    const [animate, setAnimate] = useState(false);

    const handleWishlistClick = (plant: any) => {
        toggleWishlist(plant)
        setAnimate(true);
        setTimeout(() => setAnimate(false), 500);
    };

    const plant = plantsData.find((p) => p.id === Number(_id));

    const imageList = plant ? [...(plant.coverImages || []), plant.imageUrl] : [];
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (imageList.length > 0) {
            setSelectedImage(imageList[0]);
        }
    }, [id]);

    if (!plant) {
        return <div className="p-4 text-red-500 font-semibold">Plant not found</div>;
    }

    return (
        <div className="p-2 sm:p-4 lg:p-6 max-w-7xl mx-auto">
            <div className="flex gap-2 justify-between items-center">
                <button
                    onClick={() => router.back()}
                    className="h-10 w-10  rounded-tl-md rounded-br-md border-2 border-[var(--color-accent-light)] flex items-center justify-center hover:bg-[var(--color-accent-mid)] text-green-500 transition cursor-pointer"
                >
                    <FaArrowLeft size={14} />
                </button>

                <div className="flex gap-3">

                    <button
                        onClick={() => toggleCart(plant)}
                        className="h-10 w-10  rounded-tl-md rounded-br-md border-2 border-[var(--color-accent-light)] flex items-center justify-center hover:bg-[var(--color-accent-mid)] text-[var(--color-primary-dark)] transition cursor-pointer" >
                        {isInCart(plant.id) ? <FaShoppingCart color='green' /> : <FaShoppingCart color='gray' />}
                    </button>

                    <button
                        className="h-10 w-10 rounded-tl-md rounded-br-md border-2 border-[var(--color-accent-light)] flex items-center justify-center hover:bg-[var(--color-accent-mid)] text-[var(--color-primary-dark)] transition cursor-pointer"
                        onClick={() => handleWishlistClick(plant)}
                    >
                        <span
                            className={`transition-transform duration-300 ease-in-out ${animate ? 'scale-150 animate-ping-once' : 'scale-100'
                                }`}
                        >
                            {isInWishlist(plant.id) ? (
                                <FaHeart className="text-green-500" />
                            ) : (
                                <FaRegHeart className="text-gray-500" />
                            )}
                        </span>
                    </button>
                </div>
            </div>

            <div className="p-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <div className="relative border border-[var(--color-accent-light)] aspect-square lg:aspect-[3/3] rounded-tl-2xl rounded-br-2xl overflow-hidden">
                            <Image
                                src={selectedImage || plant.imageUrl}
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
                                    className={`relative min-w-[96px] h-24 rounded-md overflow-hidden border-2 cursor-pointer transition ${selectedImage === url
                                        ? 'border-[var(--color-primary-dark)]'
                                        : 'border-gray-200'
                                        }`}
                                >
                                    <Image
                                        src={url}
                                        alt={`${plant.name} preview ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-2">
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
                            <span className="ml-1">({plant.reviews} reviews)</span>
                        </div>

                        <p className="text-sm leading-relaxed">{plant.description}</p>

                        <div className="grid grid-cols-3 gap-4 text-sm mt-4">
                            {[
                                { label: 'Bag Size', value: plant.size },
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

                        <div className="flex items-center justify-between border border-[var(--color-accent-mid)] rounded-sm rounded-tl-2xl rounded-br-2xl shadow-sm px-6 py-4">
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
                            <button className="px-6 py-2 rounded-sm rounded-tl-xl rounded-br-xl bg-[var(--color-primary-dark)] text-white font-semibold shadow hover:bg-[var(--color-primary)] transition"
                                onClick={() => {
                                    const message = `🌿 *Nursery Order Request*\n\nHello! I would like to place an order for the following plant:\n\n🪴 *Plant Name*: ${plant.name}\n🆔 *Product ID*: ${plant.id}\n💸 *Price*: ₹${plant.price}\n\nPlease let me know the availability and next steps. Thank you!`;
                                    const url = `https://wa.me/917639874667?text=${encodeURIComponent(message)}`;
                                    window.open(url, '_blank');
                                }}
                            >
                                Order Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
