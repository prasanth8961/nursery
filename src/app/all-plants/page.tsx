"use client";

import { useRouter } from 'next/navigation';
import { AiFillPhone } from 'react-icons/ai';
import { FaArrowLeft, FaArrowRight, FaFilter, FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { RiTwitterXLine } from 'react-icons/ri';
import { MdMail } from 'react-icons/md';
import { Plant, plantsData } from '@/seeds/plantData';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const categories = ['All', 'Indoor', 'Outdoor', 'Flowering', 'Wooden'];

export default function AllPlantsPage() {
  const [active, setActive] = useState<string>(categories[0]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>(plantsData);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    let filtered =
      active === 'All'
        ? plantsData
        : plantsData.filter(
          (plant) => plant.category.toLowerCase() === active.toLowerCase()
        );
    if (searchInput) {
      filtered = filtered.filter((item) => (item.name.toLowerCase().includes(searchInput.toLowerCase())) || item.category.toLowerCase().includes(searchInput.toLowerCase()))
    }
    setFilteredPlants(filtered);
  }, [active, searchInput]);

  const handlePlantDetails = (_id: number) => {
    router.push(`/plant-detail?id=${_id}`);
  }

  const socialMedias = [
    { id: 1, icon: FaWhatsapp, link: 'https://wa.me/917639874667' },
    { id: 2, icon: FaInstagram, link: 'https://www.instagram.com/prasanth_nursery_garden?igsh=Nzd5c2ptMnBkY2M1' },
    { id: 3, icon: FaFacebookF, link: 'https://www.facebook.com/share/1Er7yzKGfL/?mibextid=qi2Omg' },
    { id: 4, icon: RiTwitterXLine, link: '#' },
  ];

  return (
    <div className="">
      <div className="p-2 sticky top-0 z-50 flex flex-col justify-between gap-2 text-sm bg-[var(--background)] shadow-sm">
        <div className='flex justify-between w-full sm:justify-around items-center '>
          <a
            href="tel:+917639874667"
            className="flex items-center gap-1 hover:text-[var(--color-primary)] transition text-[var(--color-dark)]"
          >
            <AiFillPhone size={18} color="var(--color-primary-light)" />
            +91 7639874667
          </a>
          <div className="flex gap-2 items-center text-[var(--color-primary-dark)]">
            {socialMedias.map((media) => (
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
            className="h-10 w-12 bg-[var(--color-accent-ultralight)] rounded-tl-md rounded-br-md border-2 border-[var(--color-accent-light)] flex items-center justify-center hover:bg-[var(--color-accent-mid)] text-[var(--color-primary-dark)] transition cursor-pointer"
          >
            <FaArrowLeft size={14} />
          </button>

          <div className="w-full max-w-xl mx-auto flex items-center gap-2  border border-[var(--color-primary-light)] rounded-md px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[var(--color-primary)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[var(--color-primary-dark)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
            </svg>
            <input
              type="text"
              placeholder="Search plants, categories..."
              onChange={(e) => setSearchInput(e.target.value.trim())}
              className="flex-1 bg-transparent focus:outline-none text-[var(--color-primary-dark)] placeholder:text-gray-400"
            />
          </div>


          <button
            className={`h-10 w-12 rounded-tl-md border-2 rounded-br-md border-[var(--color-accent-light)] flex items-center justify-center transition cursor-pointer ${showFilters
              ? 'bg-[var(--color-accent-dark)] text-[var(--color-accent-mid)]'
              : 'bg-[var(--color-accent-ultralight)] text-[var(--color-primary-dark)] hover:bg-[var(--color-accent-mid)]'
              }`}
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <FaFilter size={14} />
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-4 items-start px-1">
            {categories.map((category, idx) => (
              <div
                key={idx}
                onClick={() => setActive(category)}
                className="flex flex-col items-center pb-2 cursor-pointer"
              >
                <span
                  className={`text-sm font-medium transition-colors duration-200 ${active === category
                    ? 'text-[var(--color-primary-dark)]'
                    : 'text-[var(--color-primary)] hover:text-[var(--color-primary-light)]'
                    }`}
                >
                  {category}
                </span>
                <div
                  className={`h-[2px] mt-1 w-full rounded-full transition-all duration-300 ${active === category ? 'bg-[var(--color-primary)]' : 'bg-transparent'
                    }`}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 sm:gap-3 p-2 mt-4">
        {filteredPlants.map((plant) => (
          <div
            key={plant.id}
            onClick={() => handlePlantDetails(plant.id)}
            className="rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 mb-2"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-sm">
              <Image
                src={'/images/1.png'}
                alt={plant.name}
                fill
                className="object-fit hover:scale-105 transition-transform duration-300 ease-in-out"
                sizes="(max-width: 768px) 100vw, 300px"
              />
              <div className="absolute right-2 top-2 z-30 bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 rounded-tl-md rounded-br-md shadow-md text-xs font-bold tracking-wide ">
                {plant.discount}% OFF
              </div>
            </div>

            <div className="p-2 flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-[var(--color-accent-dark)] truncate">
                {plant.name}
              </h2>
              {plant.subName && (
                <p className="text-sm text-gray-500 italic truncate">{plant.subName}</p>
              )}

              <div className="mt-1 flex justify-between items-center">
                <div className="text-green-700 font-semibold text-base">
                  ₹{plant.price}
                  {plant.discount > 0 && (
                    <span className="ml-2 text-red-500 line-through font-normal text-sm">
                      ₹{Math.round(plant.price / (1 - plant.discount / 100))}
                    </span>
                  )}
                </div>
                <div className="rounded-tl-md rounded-br-md p-2 bg-[var(--color-primary-light)] hover:bg-[var(--color-primary-dark)] text-white flex items-center justify-center text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer"
                  onClick={() => handlePlantDetails(plant.id)}
                >
                  <FaArrowRight className="text-white text-base" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
