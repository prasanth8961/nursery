'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import { useSearchParams, useRouter } from 'next/navigation';

import { AiFillPhone } from 'react-icons/ai';
import { FaArrowLeft} from 'react-icons/fa';

import { useDebounce } from '@/hooks/useDebounce';
import { useFetchPlants } from '@/hooks/useFetchPlants';
import { useRoute } from '@/routes';

import { CategoryTabs } from '@/components/common/CategoryTabs';
import { Pagination } from '@/components/common/Pagination';
import { EmptyState } from '@/components/common/EmptyState';
import PlantCard from '@/components/common/PlantCard';
import { ShimmerCard } from '@/components/common/ShimmerLoader';
import Loader from '@/components/common/Loader';
import { useAppDispatch, useAppSelector } from '@/lib/store/helper';

import { socialMedias } from '@/constants';

const PAGE_SIZE = 10;
const DELAY = 300;

export default function ProductListClient() {
  // const router = useRouter();
  // const searchParams = useSearchParams();

  // const initialCategory = searchParams.get('category') || 'All';
  // const initialSearch = searchParams.get('q') || '';
  // const initialPage = parseInt(searchParams.get('page') || '1');

  // const dispatch = useAppDispatch();

  const [active, setActive] = useState<string>('All');
  const [searchInput, setSearchInput] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isPageReady, setIsPageReady] = useState(false);
  
  const debouncedSearchInput = useDebounce<string>(searchInput, DELAY);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { goToHome } = useRoute();

  const { categories: dynamicCategories, loading: isFetching } = useFetchPlants({
    page: currentPage,
    limit: PAGE_SIZE,
    category: active,
    search: debouncedSearchInput,
  });

  const { plants: visiblePlants, total: totalPlants } = useAppSelector(state => state.product);

  // const updateURLParams = useCallback(
  //   (params: Record<string, string>) => {
  //     const newParams = new URLSearchParams(searchParams.toString());
  //     Object.entries(params).forEach(([key, value]) => {
  //       if (value) {
  //         newParams.set(key, value);
  //       } else {
  //         newParams.delete(key);
  //       }
  //     });
  //     router.push(`?${newParams.toString()}`);
  //   },
  //   [router, searchParams]
  // );

  // useEffect(() => {
  //   const timer = setTimeout(() => setIsPageReady(true), 300);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    const listTop = document.getElementById('plant-list')?.offsetTop;
    if (listTop !== undefined) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, active, debouncedSearchInput]);

  useEffect(() => {
    setCurrentPage(1);
    // updateURLParams({ page: '1' });
  }, [active, debouncedSearchInput]);

  const totalPages = Math.ceil(totalPlants / PAGE_SIZE);

  // if (!isPageReady) return <Loader />;

  const handleCategoryChange = (category: string) => {
    setActive(category);
    // updateURLParams({ category, page: '1' });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // updateURLParams({ page: String(page) });
  };

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
                // updateURLParams({ q: e.target.value, page: '1' });
              }}
              onKeyDown={e => e.key === 'Enter' && searchInputRef.current?.blur()}
              className="flex-1 bg-transparent focus:outline-none text-[var(--color-primary-dark)] placeholder:text-gray-400"
            />
          </div>
        </div>

        <CategoryTabs
          categories={dynamicCategories}
          activeCategory={active}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {isFetching ? (
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <EmptyState
          title="No Plants Found"
          message="Try searching with a different name or filter."
        />
      )}
    </div>
  );
}
