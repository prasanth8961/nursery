'use client';

import { plantsData } from "@/seeds/plantData";
import Image from "next/image";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Plant } from "@/types";
import { encryptId } from "@/lib/crypto";

const DEFAULT_IMAGE = "/images/1.png";

const PlantCard = ({ plant }: { plant: Plant }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleClick = () => {
    const encryptedId = encryptId(plant.id);
    router.push(`/plants/${encryptedId}`);
  };
  const originalPrice = Math.round(plant.price / (1 - plant.discount / 100));

  return (
    <div
      key={plant.id}
      onClick={handleClick}
      role="button"
      className="rounded-sm shadow-sm border border-[var(--color-primary-light)] hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      <div className="relative w-full aspect-[3/3] overflow-hidden rounded-t-sm">
        {loading && (
          <div className="absolute inset-0 z-10 bg-gray-200 animate-pulse rounded-sm" />
        )}

        <Image
          src={plant.imageUrl || DEFAULT_IMAGE}
          alt={plant.name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className={`object-cover transition-transform duration-300 ease-in-out hover:scale-105 ${loading ? "opacity-0" : "opacity-100"
            }`}
          onLoadingComplete={() => setLoading(false)}
        />

        {plant.discount > 0 && (
          <div className="absolute right-2 top-2 z-30 bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 rounded-tl-md rounded-br-md shadow-md text-xs font-bold tracking-wide animate-bounce">
            {plant.discount}% OFF
          </div>
        )}
      </div>

      <div className="py-1 flex flex-col">
        <h2 className="px-3 text-lg font-semibold text-[var(--color-accent-dark)] truncate">
          {plant.name}
        </h2>

        {plant.subName && (
          <p className="px-3 text-sm text-gray-500 italic truncate">
            {plant.subName}
          </p>
        )}

        <div className="mt-1 flex justify-between items-center">
          <div className="px-3 text-green-700 font-semibold text-base">
            ₹{plant.price}
            {plant.discount > 0 && (
              <span className="ml-2 text-red-500 line-through font-normal text-sm">
                ₹{originalPrice}
              </span>
            )}
          </div>

          <div
            className="mr-1 rounded-tl-md rounded-br-md p-2 bg-[var(--color-primary-light)] hover:bg-[var(--color-primary-dark)] text-white flex items-center justify-center text-sm font-semibold tracking-wide transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            <FaArrowRight className="text-white text-base" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Products = () => {
  const router = useRouter();

  const handleSeeAll = () => {
    router.push("/plants");
  };

  return (
    <section className="max-w-[95vw] mx-auto py-2 sm:py-5">
      <div className="w-full overflow-x-auto mb-4">
        <div className="flex items-start gap-4 px-1 min-w-max lg:justify-between lg:px-4">
          <div className="text-md font-semibold text-green-600 cursor-pointer whitespace-nowrap">
            Most Popular
          </div>
          <div
            onClick={handleSeeAll}
            className="ml-auto text-sm text-white py-1 px-3 flex items-center justify-center rounded-md font-semibold bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary-dark)] hover:to-[var(--color-primary)] cursor-pointer transition-colors duration-300 whitespace-nowrap"
          >
            View More
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[5px] sm:gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {plantsData.slice(0, 8).map((plant: Plant, _) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
      <div
        onClick={handleSeeAll}
        className="mx-auto mt-6 max-w-90 text-sm text-white rounded-xs py-3 px-8 flex items-center justify-center rounded-tl-xl rounded-br-xl font-semibold bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary-dark)] hover:to-[var(--color-primary)] cursor-pointer transition-colors duration-300"
      >
        View All Products
      </div>
    </section>
  );
};
