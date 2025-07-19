'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoStarHalfSharp, IoStarOutline, IoStarSharp } from 'react-icons/io5';
import { GiShoppingCart } from 'react-icons/gi';
import { Plant } from '@/types';
import { encryptId } from '@/lib/crypto';
import { DEFAULT_IMAGE, DEFAULT_VARIENT } from '@/constants';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '@/lib/store/slices/cartSlice';
import { toggleFav } from '@/lib/store/slices/favSlice';
import { RootState } from '@/lib/store';

type PlantCardProps = {
  plant: Plant;
  animated_bounce?: boolean;
};

const PlantCard = React.memo(({ plant, animated_bounce }: PlantCardProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const encryptedId = encryptId(plant.id);

  const variant = plant.variants[DEFAULT_VARIENT];

  const isInCart = useSelector((state: RootState) =>
    state.cart.items.some(item => item.variantId === variant.id)
  );
  const isInFav = useSelector((state: RootState) =>
    state.fav.items.some(item => item.variantId === variant.id)
  );

  const originalPrice = Math.round(variant.price / (1 - variant.discount / 100));

  useEffect(() => {
    router.prefetch(`/plants/${encryptedId}`);
  }, [encryptedId, router]);

  const handleClick = () => router.push(`/plants/${encryptedId}`);

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleCart({ plant, variant }));
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFav({ plant, variant }));
  };

  return (
    <div
      role="button"
      onClick={handleClick}
      className="border border-gray-200 rounded-md shadow hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="relative w-full h-36 sm:h-56 bg-gradient-to-br from-green-100 to-green-200">
        {loading && <div className="absolute inset-0 bg-gray-100 animate-pulse z-10" />}
        <Image
          src={imgError ? DEFAULT_IMAGE : plant.baseImageUrl}
          alt={plant.name ?? 'Plant Image'}
          loading="lazy"
          fill
          onLoad={() => setLoading(false)}
          onError={() => {
            setImgError(true);
            setLoading(false);
          }}
          className={`object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
        />

        <div
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-20 bg-white p-2 rounded-full shadow hover:scale-105 transition"
        >
          {isInFav ? (
            <FaHeart className="text-green-500" />
          ) : (
            <FaRegHeart className="text-green-500" />
          )}
        </div>

        {variant.discount > 0 && (
          <div
            className={`absolute top-3 left-3 bg-green-500 text-white px-3 py-1 text-xs font-bold rounded-tl-md rounded-br-md shadow-md ${animated_bounce ? 'animate-bounce' : ''}`}
          >
            {variant.discount}% OFF
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col gap-2">
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold text-green-800 truncate">{plant.name}</h2>
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }, (_, i) => {
              const rating = variant.ratings ?? 0;
              const filled = i + 1 <= Math.floor(rating);
              const half = i + 0.5 === rating;
              const key = `${plant.id}-star-${i}`;
              return (
                <span key={key} className="text-green-500">
                  {filled ? <IoStarSharp /> : half ? <IoStarHalfSharp /> : <IoStarOutline />}
                </span>
              );
            })}
            <span className="text-xs ml-2 font-semibold text-green-800">
              ({variant.reviewsCount})
            </span>
          </div>
        </div>

        <p className="hidden sm:block text-xs text-gray-600 line-clamp-2">{plant.description}</p>

        <div className="flex items-center justify-between gap-3 mt-3">
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-green-600">₹{variant.price}</span>
            {variant.discount > 0 && (
              <span className="text-sm text-gray-400 line-through">₹{originalPrice}</span>
            )}
          </div>

          <button
            onClick={handleCartClick}
            className={`group z-20 flex items-center gap-[4px] px-2 py-[6px] text-xs font-medium rounded-tl-sm rounded-br-sm transition-all
              ${
                isInCart
                  ? 'bg-gray-100 text-green-800 '
                  : 'bg-gray-100 text-green-800 hover:bg-green-600'
              }
            `}
          >
            <GiShoppingCart
              size={18}
              className={`transition-transform duration-200 ${isInCart ? 'text-gray-400' : 'text-gray-400 group-hover:scale-110'}`}
            />
            <span>{isInCart ? 'Already in cart' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
});

PlantCard.displayName = 'PlantCard';
export default PlantCard;
