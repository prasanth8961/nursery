'use client';

import { useRouter } from 'next/navigation';
import { AiFillPhone } from 'react-icons/ai';
import {
  FaArrowLeft,
  FaArrowRight,
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
} from 'react-icons/fa';
import { RiTwitterXLine } from 'react-icons/ri';
import { plantsData } from '@/seeds/plantData';
import { useEffect, useState } from 'react';
import { Plant } from '@/types';
import { encryptId } from '@/lib/crypto';

const categories = ['All', 'Indoor', 'Outdoor', 'Flowering', 'Wooden'];
const DEFAULT_IMAGE = '/images/1.png';
const BATCH_SIZE = 8;

export default function AllPlantsPage() {
  const [active, setActive] = useState<string>(categories[0]);
  const [allFilteredPlants, setAllFilteredPlants] = useState<Plant[]>([]);
  const [visiblePlants, setVisiblePlants] = useState<Plant[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    let filtered =
      active === 'All'
        ? plantsData
        : plantsData.filter(
            (plant) => plant.category.toLowerCase() === active.toLowerCase()
          );

    if (searchInput) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.category.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    setAllFilteredPlants(filtered);
    setVisiblePlants(filtered.slice(0, BATCH_SIZE));
    setHasMore(filtered.length > BATCH_SIZE);
  }, [active, searchInput]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50;

      if (bottom && hasMore && !isLoading) {
        loadMorePlants();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isLoading, visiblePlants]);

  const loadMorePlants = () => {
    setIsLoading(true);
    setTimeout(() => {
      const currentLength = visiblePlants.length;
      const nextBatch = allFilteredPlants.slice(
        currentLength,
        currentLength + BATCH_SIZE
      );

      setVisiblePlants((prev) => [...prev, ...nextBatch]);
      setHasMore(currentLength + BATCH_SIZE < allFilteredPlants.length);
      setIsLoading(false);
    }, 1000);
  };

  const socialMedias = [
    {
      id: 1,
      icon: FaWhatsapp,
      link: 'https://wa.me/917639874667',
    },
    {
      id: 2,
      icon: FaInstagram,
      link: 'https://www.instagram.com/prasanth_nursery_garden?igsh=Nzd5c2ptMnBkY2M1',
    },
    {
      id: 3,
      icon: FaFacebookF,
      link: 'https://www.facebook.com/share/1Er7yzKGfL/?mibextid=qi2Omg',
    },
    {
      id: 4,
      icon: RiTwitterXLine,
      link: '#',
    },
  ];

  return (
    <div>
      <div className="p-2 sticky top-0 z-50 flex flex-col gap-2 text-sm bg-[var(--background)] shadow-sm">
        <div className="flex justify-between w-full sm:justify-around items-center">
          <a
            href="tel:+917639874667"
            className="flex items-center gap-1 hover:text-[var(--color-primary)] transition text-[var(--color-dark)]"
          >
            <AiFillPhone size={18} color="var(--color-primary-light)" />
            +91 7639874667
          </a>
          <div className="flex gap-2 items-center text-[var(--color-primary-dark)]">
            {socialMedias.map((media: any) => (
              <a
                key={media.id}
                href={media.link}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-tl-md rounded-br-md border border-[var(--color-accent-light)] flex items-center justify-center hover:bg-[var(--color-accent-mid)] transition"
              >
                <media.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="w-full flex items-center justify-between gap-2 mt-1 mb-2 px-1">
          <button
            onClick={() => router.push('/')}
            className="h-10 w-12 bg-[var(--color-accent-ultralight)] rounded-tl-md rounded-br-md border-2 border-[var(--color-accent-light)] flex items-center justify-center hover:bg-[var(--color-accent-mid)] text-[var(--color-primary-dark)] transition"
          >
            <FaArrowLeft size={14} />
          </button>

          <div className="w-full max-w-xl mx-auto flex items-center gap-2 border border-[var(--color-primary-light)] rounded-md px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[var(--color-primary)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[var(--color-primary-dark)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search plants, categories..."
              onChange={(e) => setSearchInput(e.target.value.trim())}
              className="flex-1 bg-transparent focus:outline-none text-[var(--color-primary-dark)] placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-start px-1">
          {categories.map((category: string, idx: number) => (
            <div
              key={idx}
              onClick={() => setActive(category)}
              className="flex flex-col items-center pb-2 cursor-pointer"
            >
              <span
                className={`text-sm font-medium transition-colors duration-200 ${
                  active === category
                    ? 'text-[var(--color-primary-dark)]'
                    : 'text-[var(--color-primary)] hover:text-[var(--color-primary-light)]'
                }`}
              >
                {category}
              </span>
              <div
                className={`h-[2px] mt-1 w-full rounded-full transition-all duration-300 ${
                  active === category
                    ? 'bg-[var(--color-primary)]'
                    : 'bg-transparent'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 p-2 mt-4">
        {visiblePlants.map((plant: Plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center items-center my-6">
          <span className="h-8 w-8 rounded-full border-4 border-dashed border-[var(--color-primary)] animate-spin"></span>
        </div>
      )}
    </div>
  );
}

export const PlantCard = ({ plant }: PlantCardProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  const originalPrice = Math.round(plant.price / (1 - plant.discount / 100));

  const handleClick = () => {
    const encrypted = encryptId(plant.id);
    router.push(`/plants/${encrypted}`);
  };

  return (
    <div
      role="button"
      onClick={handleClick}
      className="group rounded-md shadow-sm border border-[var(--color-primary-light)] hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-md">
        <img
          src={plant.imageUrl || DEFAULT_IMAGE}
          alt={plant.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setLoading(false)}
        />
        {plant.discount > 0 && (
          <div className="absolute right-2 top-2 z-30 bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 rounded-tl-md rounded-br-md shadow-md text-xs font-bold tracking-wide">
            {plant.discount}% OFF
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col gap-1">
        <h2 className="text-base font-semibold text-[var(--color-accent-dark)] truncate">
          {plant.name}
        </h2>
        {plant.subName && (
          <p className="text-sm text-gray-500 italic truncate">
            {plant.subName}
          </p>
        )}

        <div className="mt-2 flex justify-between items-center">
          <div className="text-green-700 font-semibold text-base">
            ₹{plant.price}
            {plant.discount > 0 && (
              <span className="ml-2 text-red-500 line-through font-normal text-sm">
                ₹{originalPrice}
              </span>
            )}
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="rounded-tl-md rounded-br-md p-2 bg-[var(--color-primary-light)] hover:bg-[var(--color-primary-dark)] text-white flex items-center justify-center text-sm font-semibold tracking-wide transition-colors duration-200"
          >
            <FaArrowRight className="text-white text-base" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface PlantCardProps {
  plant: Plant;
}
