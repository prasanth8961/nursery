'use client';

import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import { Plant } from "@/types";
import { encryptId } from "@/lib/crypto";
import { DEFAULT_IMAGE } from "@/constants";

export const PlantCard = ({
  plant,
  animated_bounce,
}: {
  plant: Plant;
  animated_bounce: boolean;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [isPending, startTransition] = useTransition();

  const encryptedId = encryptId(plant.id);
  const originalPrice = Math.round(plant.price / (1 - plant.discount / 100));


  useEffect(() => {
    router.prefetch(`/plants/${encryptedId}`);
  }, [encryptedId]);

  const handleClick = () => {
    startTransition(() => {
      router.push(`/plants/${encryptedId}`);
    });
  };

  return (
    <div
      role="button"
      className="group rounded-md shadow-sm border border-[var(--color-primary-light)] hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-md">
        {loading && (
          <div className="absolute inset-0 bg-gray-200 animate-shimmer z-10" />
        )}

        <Image
          src={imgError ? DEFAULT_IMAGE : plant.imageUrl}
          alt={plant.name || "Plant"}
          loading="lazy"
          fill
          onLoad={() => setLoading(false)}
          onError={() => {
            setImgError(true);
            setLoading(false);
          }}
          className={`object-cover transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"
            }`}
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {plant.discount > 0 && (
          <div
            className={`absolute right-2 top-2 z-30 bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 rounded-tl-md rounded-br-md shadow-md text-xs font-bold tracking-wide ${animated_bounce ? "animate-bounce" : ""
              }`}
          >
            {plant.discount}% OFF
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col gap-1">
        <h2 className="text-base font-semibold text-[var(--color-accent-dark)] truncate">
          {plant.name}
        </h2>
        {plant.tamilName && (
          <p className="text-sm text-gray-500 italic truncate">{plant.tamilName}</p>
        )}

        <div className="mt-2 flex justify-between items-center">
          <div className="text-green-700 font-semibold text-xl">
            {plant.discount > 0 && (
              <span className="ml-2 text-red-500 line-through font-normal text-md mr-2">
                ₹{originalPrice}
              </span>
            )}
            ₹{plant.price}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            disabled={isPending}
            className={`rounded-tl-md rounded-br-md p-3 flex items-center justify-center text-sm font-semibold tracking-wide transition-all duration-200 ${isPending
                ? "bg-green-100 cursor-not-allowed"
                : "bg-[var(--color-primary-light)] hover:bg-[var(--color-primary-dark)] text-white"
              }`}
          >
            {isPending ? (
              <span className="animate-spin h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full" />
            ) : (
              <FaArrowRight className="text-white text-base" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
