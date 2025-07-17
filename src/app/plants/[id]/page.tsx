'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { plantsData } from '@/seeds/plantData';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';
import Image from 'next/image';
import { useWishlist } from '@/features/wishlist/useWishList';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/features/checkout/useCart';
import { decryptId } from '@/lib/crypto';
import NotFound from '@/components/common/NotFound';
import { QuantityDropdown } from '@/components/common/DropDownMenu';
import { IoStarHalfSharp, IoStarOutline, IoStarSharp } from 'react-icons/io5';
import { Loader } from '@/components/common/Loader';


export default function Details() {
    const params = useParams();
    const encryptedId = params.id;

    const _id = decryptId(encryptedId as string);


    const searchParams = useSearchParams();

    const id = Number(searchParams.get('id'));
    const router = useRouter();

    const { toggleWishlist, isInWishlist } = useWishlist(null);
    const { toggleCart, isInCart } = useCart(null);
    const [quantityInput, setQuantityInput] = useState<number>(1);
    const [animate, setAnimate] = useState(false);
    const [isPageReady, setIsPageReady] = useState(false);


    const handleWishlistClick = (plant: any) => {
        toggleWishlist(plant)
        setAnimate(true);
        setTimeout(() => setAnimate(false), 500);
    };

    const plant = plantsData.find((p) => p.id === Number(_id));

    const imageList = plant ? [...(plant.coverImages || []), plant.imageUrl] : [];
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [loadingMain, setLoadingMain] = useState(true);
    const [thumbLoading, setThumbLoading] = useState<{ [key: number]: boolean }>(
        () => Object.fromEntries(imageList.map((_, i: number) => [i, true]))
    );

    useEffect(() => {
        const timer = setTimeout(() => setIsPageReady(true), 300);
        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        if (imageList.length > 0) {
            setSelectedImage(imageList[0]);
        }
    }, [id]);



    if (!isPageReady) {
        return <Loader />
    }

    if (!plant) {
        return <NotFound message="Plant not found" />;
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
                        {isInCart(plant.id) ? <FaShoppingCart className='text-green-500' /> : <FaShoppingCart color='gray' />}
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

                        <div className="relative aspect-square lg:aspect-[3/3] rounded-tl-2xl rounded-br-2xl overflow-hidden">
                            {loadingMain && (
                                <div className="absolute inset-0 bg-gray-300 animate-shimmer z-10" />
                            )}
                            <Image
                                src={selectedImage || plant.imageUrl}
                                alt={plant.name}
                                loading='lazy'
                                fill
                                onLoad={() => setLoadingMain(false)}
                                onError={() => setLoadingMain(false)}
                                className={`object-scale-down rounded-lg transition duration-200 hover:scale-105 ${loadingMain ? 'opacity-0' : 'opacity-100'
                                    }`}
                            />
                        </div>


                        <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
                            {imageList.map((url: string, idx: number) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedImage(url)}
                                    className={`relative min-w-[96px] h-24 rounded-md overflow-hidden border-2 cursor-pointer transition ${selectedImage === url
                                        ? 'border-green-600'
                                        : 'border-green-200'
                                        }`}
                                >
                                    {thumbLoading[idx] && (
                                        <div className="absolute inset-0 bg-gray-400 animate-shimmer z-10" />
                                    )}
                                    <Image
                                        src={url}
                                        alt={`${plant.name} preview ${idx + 1}`}
                                        loading='lazy'

                                        fill
                                        onLoad={() =>
                                            setThumbLoading((prev) => ({ ...prev, [idx]: false }))
                                        }
                                        onError={() =>
                                            setThumbLoading((prev) => ({ ...prev, [idx]: false }))
                                        }
                                        className={`object-cover transition-opacity duration-300 ${thumbLoading[idx] ? 'opacity-0' : 'opacity-100'
                                            }`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="flex flex-col gap-5">

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                            <div className="flex flex-col">
                                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary-dark)]">{plant.name}</h1>
                                {plant.tamilName && (
                                    <span className="text-sm text-gray-500 italic">{plant.tamilName}</span>
                                )}
                            </div>
                            <div className="text-sm sm:text-right">

                                <p className="capitalize">Category - <span className="font-medium text-green-600">{plant.category}</span></p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 sm:gap-2 text-md mt-1">
                            {Array.from({ length: 5 }, (_, i) => {
                                const filled = i + 1 <= Math.floor(plant.ratings);
                                const half = i + 0.5 === plant.ratings;
                                return (
                                    <span key={i} className="text-green-500">
                                        {filled ? <IoStarSharp size={20} /> : half ? <IoStarHalfSharp size={20} /> : <IoStarOutline size={20} />}
                                    </span>
                                );
                            })}
                            <span className="ml-1 text-sm text-gray-600">({plant.reviewsCount} reviews)</span>
                        </div>


                        <p className="text-sm leading-relaxed">{plant.description} {plant.usageInfo}</p>


                        <div className="flex items-center justify-between gap-4 py-2 px-3 border border-green-500 rounded-lg shadow-sm">

                            <div className="text-sm sm:text-base font-medium text-green-700 capitalize tracking-wide">
                                Growth rate:- <span className="font-semibold ">{plant.growthRate}</span>
                            </div>


                            <QuantityDropdown
                                quantityInput={quantityInput}
                                setQuantityInput={setQuantityInput}
                            />
                        </div>

                        {plant.tags && plant.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {plant.tags.map((tag: string, idx: number) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 text-sm font-medium text-[var(--color-primary-dark)] capitalize bg-[var(--color-primary-light)/10] border border-[var(--color-primary-light)] rounded-tl-md rounded-br-md transition-all hover:bg-[var(--color-primary-light)] hover:text-white"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

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

                        <section className="bg-[var(--color-accent-ultralight)] border border-[var(--color-accent-dark)] rounded-lg p-4 mt-4">
                            <h3 className="font-semibold text-green-500 mb-2">Care Instructions</h3>
                            <p className="text-sm text-green-700 mb-3">{plant.careInfo}</p>
                            <h3 className="font-semibold text-green-500 mb-2">Fertilizing Instructions</h3>
                            <p className="text-sm text-green-700">{plant.fertilizingInfo}</p>
                        </section>


                        <div className="flex items-center justify-between border border-[var(--color-accent-mid)] rounded-sm rounded-tl-2xl rounded-br-2xl shadow-sm px-6 py-4">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl font-bold text-[var(--color-primary-dark)]">₹{plant.price * quantityInput}</span>
                                    {plant.discount > 0 && (
                                        <span className="text-md text-red-500 line-through">
                                            ₹{Math.round( (plant.price * quantityInput) / (1 - plant.discount / 100))}
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
                                    const whatsappMessage = `
🌿 *Nursery Order Request*

Hi there! I'd love to order the following plant from your nursery:

\`\`\`
Product ID   : ${plant.id}
Plant Name   : ${plant.name}
Price        : ₹${plant.price}
Quantity     : ${quantityInput || 1}
\`\`\`

Can you please confirm availability and delivery options?

Thank you! 😊
`;


                                    const url = `https://wa.me/917639874667?text=${encodeURIComponent(whatsappMessage)}`;
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
