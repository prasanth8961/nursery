'use client';

import Head from 'next/head';
import { AiFillPhone } from 'react-icons/ai';
import { FaArrowLeft, FaLeaf } from 'react-icons/fa';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Plant } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';
import { categories, socialMedias } from '@/constants';
import PlantCard from '@/components/common/PlantCard';
import { useRoute } from '@/routes';
import { ShimmerCard } from '@/components/common/ShimmerLoader';
import Loader from '@/components/common/Loader';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/store/helper';

const PAGE_SIZE = 12;
const DELAY = 300;

export default function ProductListClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get('category') || categories[0];
  const initialSearch = searchParams.get('q') || '';
  const initialPage = parseInt(searchParams.get('page') || '1');

  const [active, setActive] = useState<string>(initialCategory);
  const [allFilteredPlants, setAllFilteredPlants] = useState<Plant[]>([]);
  const [visiblePlants, setVisiblePlants] = useState<Plant[]>([]);
  const [searchInput, setSearchInput] = useState<string>(initialSearch);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPageReady, setIsPageReady] = useState(false);
  const debouncedSearchInput = useDebounce<string>(searchInput, DELAY);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { goToHome } = useRoute();

  const plantData = useAppSelector(state => state.product.plants);
  const updateURLParams = useCallback(
    (params: Record<string, string>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });
      router.push(`?${newParams.toString()}`);
    },
    [router, searchParams]
  );

  const filteredPlants = useMemo(() => {
    let filtered: Plant[] =
      active === 'All' || active === 'Others'
        ? plantData
        : plantData.filter(plant => plant.category.toLowerCase() === active.toLowerCase());

    if (debouncedSearchInput) {
      filtered = filtered.filter(
        item =>
          item.name.toLowerCase().includes(debouncedSearchInput.toLowerCase()) ||
          item.category.toLowerCase().includes(debouncedSearchInput.toLowerCase())
      );
    }

    return filtered;
  }, [active, plantData, debouncedSearchInput]);

  useEffect(() => {
    const timer = setTimeout(() => setIsPageReady(true), 300);
    return () => clearTimeout(timer);
  });

  const paginatedPlants = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredPlants.slice(start, start + PAGE_SIZE);
  }, [filteredPlants, currentPage]);

  useEffect(() => {
    setAllFilteredPlants(filteredPlants);
  }, [filteredPlants]);

  useEffect(() => {
    setCurrentPage(1);
    updateURLParams({ page: '1' });
  }, [filteredPlants.length]);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setVisiblePlants(paginatedPlants);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [paginatedPlants]);

  useEffect(() => {
    const listTop = document.getElementById('plant-list')?.offsetTop;
    if (listTop !== undefined) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const totalPages = Math.ceil(allFilteredPlants.length / PAGE_SIZE);

  if (!isPageReady) return <Loader />;

  return (
    <div>
      <Head>
        <title>All Plants | Prasanth Nursery Garden</title>
        <meta
          name="description"
          content="Explore our diverse plant collection: indoor, outdoor, flowering, and wooden plants available now!"
        />
      </Head>

      <div className="p-2 sticky top-0 z-50 flex flex-col gap-2 text-sm bg-[var(--background)] shadow-sm">
        <div className="flex justify-between sm:justify-around items-center">
          <a
            href="tel:+917639874667"
            className="flex items-center gap-1 hover:text-[var(--color-primary)] transition text-[var(--color-dark)]"
          >
            <AiFillPhone size={18} color="var(--color-primary-light)" />
            +91 7639874667
          </a>
          <div className="flex gap-2 items-center text-[var(--color-primary-dark)]">
            {socialMedias.map(media => (
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
            onClick={goToHome}
            className="h-10 w-12 bg-[var(--color-accent-ultralight)] rounded-tl-md rounded-br-md border-2 border-[var(--color-accent-light)] flex items-center justify-center hover:bg-[var(--color-accent-mid)] text-[var(--color-primary-dark)] transition"
          >
            <FaArrowLeft size={14} />
          </button>

          <div className="w-full max-w-xl mx-auto flex items-center gap-2 border border-[var(--color-primary-light)] rounded-md px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[var(--color-primary)]">
            <svg
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
              ref={searchInputRef}
              value={searchInput}
              onChange={e => {
                setSearchInput(e.target.value);
                updateURLParams({ q: e.target.value, page: '1' });
              }}
              onKeyDown={e => e.key === 'Enter' && searchInputRef.current?.blur()}
              className="flex-1 bg-transparent focus:outline-none text-[var(--color-primary-dark)] placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex overflow-x-auto scrollbar-hide gap-4 items-start px-1">
          {categories.map(category => (
            <div
              key={category}
              onClick={() => {
                setActive(category);
                updateURLParams({ category, page: '1' });
              }}
              className="flex flex-col items-center pb-2 cursor-pointer"
            >
              <span
                className={`text-sm font-medium transition-colors duration-200 ${active === category ? 'text-[var(--color-primary-dark)]' : 'text-[var(--color-primary)] hover:text-[var(--color-primary-light)]'}`}
              >
                {category}
              </span>
              <div
                className={`h-[2px] mt-1 w-full rounded-full transition-all duration-300 ${active === category ? 'bg-[var(--color-primary)]' : 'bg-transparent'}`}
              />
            </div>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 p-2 mt-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      ) : visiblePlants.length > 0 ? (
        <>
          <div
            id="plant-list"
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 p-2 mt-4"
          >
            {visiblePlants.map(plant => (
              <PlantCard key={plant.id} plant={plant} animated_bounce={false} />
            ))}
          </div>
          {(visiblePlants.length > 4 || currentPage > 1) && (
            <div className="flex justify-center items-center gap-1 md:gap-2 py-6 flex-wrap">
              <button
                onClick={() => {
                  setCurrentPage(prev => Math.max(1, prev - 1));
                  updateURLParams({ page: String(Math.max(1, currentPage - 1)) });
                }}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md border border-[var(--color-primary)] bg-[var(--color-accent-ultralight)] font-semibold text-sm hover:bg-[var(--color-primary-light)] disabled:opacity-50"
              >
                Prev
              </button>
              {(() => {
                const pagesToShow = 4;
                let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
                let endPage = startPage + pagesToShow - 1;
                if (endPage > totalPages) {
                  endPage = totalPages;
                  startPage = Math.max(1, endPage - pagesToShow + 1);
                }
                return Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                  const page = startPage + i;
                  return (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        updateURLParams({ page: String(page) });
                      }}
                      className={`px-4 py-2 text-sm font-semibold rounded-md transition border ${currentPage === page ? 'bg-[var(--color-primary-dark)] text-[var(--color-primary-light)] border-[var(--color-primary)]' : 'border-[var(--color-primary)] hover:bg-[var(--color-accent-ultralight)]'}`}
                    >
                      {page}
                    </button>
                  );
                });
              })()}
              <button
                onClick={() => {
                  setCurrentPage(prev => Math.min(totalPages, prev + 1));
                  updateURLParams({ page: String(Math.min(totalPages, currentPage + 1)) });
                }}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-md border border-[var(--color-primary)] bg-[var(--color-accent-ultralight)] font-semibold text-sm hover:bg-[var(--color-primary-light)] disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-600">
          <FaLeaf className="text-green-500 text-5xl mb-4" />
          <h2 className="text-xl font-semibold">No Plants Found</h2>
          <p className="text-sm text-gray-500 mt-1">
            Try searching with a different name or filter.
          </p>
        </div>
      )}
    </div>
  );
}
