'use client';

import { useRoute } from '@/routes';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const PlantCard = dynamic(() => import('../common/PlantCard'));
import { ShimmerCard } from '../common/ShimmerLoader';

import { Plant } from '@/types';
import { useAppSelector } from '@/lib/store/helper';
import { useFetchFeaturedPlants } from '@/hooks/useFetchFeaturedPlants';

const Products = () => {
  const { goToPlants } = useRoute();
  useFetchFeaturedPlants();
  const { plants: plantsData, loading } = useAppSelector(state => state.product);

  // const featuredPlants = useMemo(
  //   () => plantsData.filter(p => p.isFeatured).slice(0, 8),
  //   [plantsData]
  // );

  if (loading && plantsData.length === 0) {
    return (
      <section className="max-w-[95vw] mx-auto py-2 sm:py-5">
        <div className="grid grid-cols-2 gap-x-[2px] gap-y-[5px] sm:gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      {plantsData.length > 0 && (
        <section className="max-w-[95vw] mx-auto py-2 sm:py-5">
          <div className="w-full overflow-x-auto mb-4">
            <div className="flex items-start gap-4 px-1 min-w-max lg:justify-between lg:px-4">
              <div className="text-md font-semibold  cursor-pointer whitespace-nowrap drop-shadow-md">
                Most Popular
              </div>

              <div
                onClick={() => goToPlants()}
                className="ml-auto text-sm text-white py-1 px-3 flex items-center justify-center rounded-md font-semibold bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary-dark)] hover:to-[var(--color-primary)] cursor-pointer transition-colors duration-300 whitespace-nowrap"
              >
                More
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-[2px] gap-y-[5px] sm:gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:mx-auto">
            {plantsData.map((plant: Plant) => (
              <PlantCard key={plant.id} plant={plant} animated_bounce={true} />
            ))}
          </div>
          <div
            onClick={() => goToPlants()}
            className="mx-auto mt-6 max-w-90 text-sm text-white rounded-xs py-3 px-8 flex items-center justify-center rounded-tl-xl rounded-br-xl font-semibold bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary-dark)] hover:to-[var(--color-primary)] cursor-pointer transition-colors duration-300"
          >
            Load More
          </div>
        </section>
      )}
    </>
  );
};

export default Products;
