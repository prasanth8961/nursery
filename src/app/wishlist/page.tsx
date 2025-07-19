'use client';

import Image from 'next/image';
import { useEffect, useState, useTransition } from 'react';
import { FaHeart, FaLeaf } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useWishlist } from '@/features/wishlist/useWishList';
import { IoStarHalfSharp, IoStarOutline, IoStarSharp } from 'react-icons/io5';
import { WishListItem } from '@/types';
import { encryptId } from '@/lib/crypto';
import { DEFAULT_IMAGE } from '@/constants';
import { useRoute } from '@/routes';
import { Loader } from '@/components/common/Loader';
import { plantsData } from '@/seeds/plantData';

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
    const amount = wishlist.reduce((prev, item) => prev + item.variant?.price, 0);
    const formattedAmount = amount.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
    });
    setTotalAmount(formattedAmount);
  }, [wishlist]);

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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={4}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        {wishlist.length > 0 && (
          <button className="flex flex-col items-center text-[var(--color-primary-dark)] border border-[var(--color-primary-light)] px-4 py-1 rounded-tl-md rounded-br-md hover:bg-[var(--color-accent-ultralight)] transition text-xs font-medium">
            Total <span className="text-green-500"> {totalAmount}</span>
          </button>
        )}
      </div>
      <div className="h-px  w-full my-2"></div>
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-600">
          <FaLeaf className="text-green-500 text-5xl mb-4" />
          <h2 className="text-xl font-semibold">No Favorites Yet!</h2>
          <p className="text-sm text-gray-500 mt-1">
            Looks like you haven't added any plants yet. Let's explore the greenery and bring your
            space to life!
          </p>
          <div
            onClick={() => goToHome()}
            style={{ textShadow: '2px 2px 4px rgba(17, 116, 46, 0.2)' }}
            className="px-6 py-3 mt-3 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-lime-500 to-green-400 font-semibold"
          >
            {' '}
            Browse Plants
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {wishlist.map((plant: WishListItem, idx: number) => {
            const isLoading = imageLoadingMap[plant.plantId] ?? true;
            const originalPrice = Math.round(
              plant.variant.price / (1 - plant.variant.discount / 100)
            );

            return (
              <div
                key={idx}
                onClick={e => {
                  e.stopPropagation();
                  handleClick(encryptId(plant.plantId));
                }}
                className="group relative border border-[1px] border-green-400 rounded-md shadow-xs hover:shadow-lg transition overflow-hidden"
              >
                <div className="relative w-full aspect-[4/3]">
                  {isLoading && <div className="absolute inset-0 animate-pulse bg-gray-300 z-10" />}

                  <Image
                    src={plant.baseImageUrl || DEFAULT_IMAGE}
                    alt={plant.name}
                    fill
                    className={`object-cover transition duration-300 group-hover:scale-105 ${
                      isLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    onLoadingComplete={() =>
                      setImageLoadingMap(prev => ({ ...prev, [plant.plantId]: false }))
                    }
                  />

                  <div
                    onClick={e => {
                      e.stopPropagation();
                      const matchedPlant = plantsData.find(p => p.id === plant.plantId);
                      if (matchedPlant) toggleWishlist(matchedPlant, plant.variant);
                    }}
                    className="absolute top-2 right-2 z-30 p-2 bg-white rounded-full shadow-md hover:scale-105 transition"
                  >
                    <FaHeart
                      className={`text-lg ${isInWishlist(plant.variantId) ? 'text-green-500' : 'text-gray-300'}`}
                    />
                  </div>
                </div>

                <div className="px-1 py-2 flex flex-col ">
                  <div>
                    <h3 className="text-md font-semibold text-green-800 truncate">{plant.name}</h3>
                    {plant.subName && (
                      <p className="text-xs text-gray-500 italic truncate">{plant.subName}</p>
                    )}
                    <p className="text-xs text-green-700 mt-1">
                      Size - <span>{plant.variant.size}</span>
                    </p>
                  </div>

                  <div className="mt-1 flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-1 text-sm text-yellow-500">
                        {Array.from({ length: 5 }, (_, i) => {
                          const filled = i + 1 <= Math.floor(plant.variant?.ratings);
                          const half = i + 0.5 === plant.variant?.ratings;
                          return (
                            <span key={i}>
                              {filled ? (
                                <IoStarSharp />
                              ) : half ? (
                                <IoStarHalfSharp />
                              ) : (
                                <IoStarOutline />
                              )}
                            </span>
                          );
                        })}
                      </div>
                      <div className="text-green-700 font-semibold text-xl mt-1">
                        {plant.variant.discount > 0 && (
                          <span className="line-through text-red-500 text-sm mr-2">
                            ₹{originalPrice}
                          </span>
                        )}
                        ₹{plant.variant.price}
                      </div>
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
