'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { plantsData } from '@/seeds/plantData';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';
import Image from 'next/image';
import { FaShoppingCart } from 'react-icons/fa';
import { decryptId } from '@/lib/crypto';
import NotFound from '@/components/common/NotFound';
import { QuantityDropdown } from '@/components/common/DropDownMenu';
import { IoStarHalfSharp, IoStarOutline, IoStarSharp } from 'react-icons/io5';
import Loader from '@/components/common/Loader';
import { useRoute } from '@/routes';
import PlantCard from '@/components/common/PlantCard';
import { Plant, PlantVariant } from '@/types';
import Head from 'next/head';
import { DEFAULT_IMAGE } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/lib/store/helper';
import { toggleFav } from '@/lib/store/slices/favSlice';
import { toggleCart } from '@/lib/store/slices/cartSlice';

export default function Details() {
  const params = useParams();
  const encryptedId = params.id;

  const _id = decryptId(encryptedId as string);

  const searchParams = useSearchParams();

  const id = decryptId(String(searchParams.get('variantId')));

  const router = useRouter();
  const { goToNotFound } = useRoute();

  if (!_id) {
    goToNotFound();
  }

  const [quantityInput, setQuantityInput] = useState<number>(1);
  const [animate, setAnimate] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);
  const { redirectToCart, redirectToWishList } = useRoute();
  const plant = plantsData.find(p => p.id === Number(_id));
  const [selectedPlantIdx, setSelectedPlantIdx] = useState<number>(() => {
    const index = plant?.variants.findIndex(v => v.id === id);
    return index !== undefined && index >= 0 ? index : 0;
  });
  const imageList = plant
    ? [...(plant.variants[selectedPlantIdx].coverImages || []), plant.baseImageUrl]
    : [];
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [loadingMain, setLoadingMain] = useState(true);
  const [thumbLoading, setThumbLoading] = useState<{ [key: number]: boolean }>(() =>
    Object.fromEntries(imageList.map((_, i: number) => [i, true]))
  );

  const dispatch = useAppDispatch();
  const isInWishlist = useAppSelector(state =>
    state.fav.items.some(item => item.variantId === plant?.variants[selectedPlantIdx].id)
  );
  const isInCart = useAppSelector(state =>
    state.cart.items.some(item => item.variantId === plant?.variants[selectedPlantIdx].id)
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsPageReady(true), 300);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (imageList.length > 0) {
      setSelectedImage(imageList[0]);
    }
  }, [_id]);

  const handleWishlistClick = (plant: Plant, variant: PlantVariant) => {
    dispatch(toggleFav({ plant, variant }));
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
  };

  const handleOrder = (id: number, name: string, price: number | string) => {
    const whatsappMessage = `
🌿 *Nursery Order Request*

Hi there! I'd love to order the following plant from your nursery:

\`\`\`
Product ID   : ${id}
Plant Name   : ${name}
Price        : ₹${price}
Quantity     : ${quantityInput || 1}
\`\`\`

Can you please confirm availability and delivery options?

Thank you! 😊
`;
    const url = `https://wa.me/917639874667?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  if (!isPageReady) {
    return <Loader />;
  }

  if (!plant) {
    return <NotFound message="Plant not found" />;
  }

  return (
    <>
      <Head>
        <title>
          {plant.name} | Buy {plant.tamilName} Online
        </title>
        <meta
          name="description"
          content={`Buy healthy ${plant.name} (${plant.tamilName}) from our nursery. Available in various sizes & variants.`}
        />
        <meta property="og:title" content={`${plant.name} | Nursery Garden`} />
        <meta
          property="og:description"
          content={`Buy ${plant.name} plants online with variants.`}
        />
        <meta property="og:image" content={plant.baseImageUrl} />
      </Head>
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
              onClick={() => redirectToCart()}
              className="h-10 w-10  rounded-tl-md rounded-br-md border-2 border-[var(--color-accent-light)] flex items-center justify-center hover:bg-[var(--color-accent-mid)] text-[var(--color-primary-dark)] transition cursor-pointer"
            >
              <FaShoppingCart className="text-green-500" />
            </button>

            <button
              onClick={() => redirectToWishList()}
              className="h-10 w-10 rounded-tl-md rounded-br-md border-2 border-[var(--color-accent-light)] flex items-center justify-center hover:bg-[var(--color-accent-mid)] text-[var(--color-primary-dark)] transition cursor-pointer"
            >
              <span
                className={`transition-transform duration-300 ease-in-out ${animate ? 'scale-150 animate-ping-once' : 'scale-100'
                  }`}
              >
                <FaHeart className="text-green-500" />
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
                  src={selectedImage || plant.baseImageUrl}
                  alt=""
                  loading="lazy"
                  fill
                  onLoad={() => setLoadingMain(false)}
                  onError={(e) => {
                    setLoadingMain(false);
                    const img = e.currentTarget as HTMLImageElement;
                    if (img.src !== DEFAULT_IMAGE) {
                      img.src = DEFAULT_IMAGE;
                    }
                  }}
                  className={`object-scale-down rounded-lg transition duration-200 hover:scale-105 ${loadingMain ? 'opacity-0' : 'opacity-100'
                    }`}
                />
              </div>

              <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
                {imageList.map((url: string, idx: number) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(url)}
                    className={`relative min-w-[96px] h-24 rounded-md overflow-hidden cursor-pointer transition ${selectedImage === url
                      ? 'border-3 border-green-500'
                      : 'border-2 border-green-100'
                      }`}
                  >
                    {thumbLoading[idx] && (
                      <div className="absolute inset-0 bg-gray-400 animate-shimmer z-10" />
                    )}
                    <Image
                      src={url}
                      alt={`${plant.name} preview ${idx + 1}`}
                      loading="lazy"
                      fill
                      onLoad={() => setThumbLoading(prev => ({ ...prev, [idx]: false }))}
                      onError={(e) => {
                        setLoadingMain(false);
                        const img = e.currentTarget as HTMLImageElement;
                        if (img.src !== DEFAULT_IMAGE) {
                          img.src = DEFAULT_IMAGE;
                        }
                      }}
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
                  <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary-dark)]">
                    {plant.name}
                  </h1>
                  {plant.tamilName && (
                    <span className="text-sm text-gray-500 italic">{plant.tamilName}</span>
                  )}
                </div>
                <div className="text-sm sm:text-right">
                  <p className="capitalize">
                    Category - <span className="font-medium text-green-600">{plant.category}</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {plant.variants
                  .map(varient => varient.size)
                  .map((size: string, idx: number) => (
                    <div
                      key={idx}
                      onClick={() => {
                        if (plant.variants[idx].isAvailable) {
                          setSelectedPlantIdx(idx);
                        }
                      }}
                      className={`
    relative flex items-center justify-center font-semibold text-sm
    min-w-[56px] h-13 px-3 py-2 rounded-xl overflow-hidden border transition
    ${selectedPlantIdx === idx ? 'border-green-600 border-2' : 'border-green-300'}
    ${plant.variants[idx].isAvailable
                          ? 'text-green-800 bg-white cursor-pointer'
                          : 'text-gray-500 bg-green-50 border-red-300 border-2 pointer-events-none select-none'
                        }
  `}
                    >
                      {size}

                      {!plant.variants[idx].isAvailable && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] rounded-xl pointer-events-none" />
                      )}
                    </div>
                  ))}
              </div>

              <div className="flex items-center gap-1 sm:gap-2 text-md mt-1">
                {Array.from({ length: 5 }, (_, i) => {
                  const filled = i + 1 <= Math.floor(plant.variants[selectedPlantIdx].ratings);
                  const half = i + 0.5 === plant.variants[selectedPlantIdx].ratings;
                  return (
                    <span key={i} className="text-green-500">
                      {filled ? (
                        <IoStarSharp size={20} />
                      ) : half ? (
                        <IoStarHalfSharp size={20} />
                      ) : (
                        <IoStarOutline size={20} />
                      )}
                    </span>
                  );
                })}
                <span className="ml-1 text-sm text-gray-600">
                  ({plant.variants[selectedPlantIdx].reviewsCount} reviews)
                </span>
              </div>

              <p className="text-sm leading-relaxed">
                {plant.description} {plant.usageInfo}
              </p>

              <div className="flex items-center justify-between gap-4 py-2 px-3 border border-green-500 rounded-lg shadow-sm">
                <div className="text-sm sm:text-base font-medium text-green-700 capitalize tracking-wide">
                  Growth rate:-{' '}
                  <span className="font-semibold ">
                    {plant.variants[selectedPlantIdx].growthRate}
                  </span>
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
                  { label: 'Bag Size', value: plant.variants[selectedPlantIdx].size },
                  { label: 'Height', value: plant.variants[selectedPlantIdx].height },
                  { label: 'Weight', value: plant.variants[selectedPlantIdx].weight },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-[var(--color-accent-light)] rounded-xl p-4 shadow-sm flex flex-col items-center text-center"
                  >
                    <span className="text-xs text-[var(--color-primary)]">{item.label}</span>
                    <span className="text-base font-semibold text-[var(--color-primary-light)]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <section className="bg-[var(--color-accent-ultralight)] border border-[var(--color-accent-dark)] rounded-lg p-4 mt-4">
                <h3 className="font-semibold text-green-500 mb-2">Care Instructions</h3>
                <p className="text-sm text-green-700 mb-3">{plant.careInfo}</p>
                <h3 className="font-semibold text-green-500 mb-2">Fertilizing Instructions</h3>
                <p className="text-sm text-green-700">{plant.fertilizingInfo}</p>
              </section>

              <div className="flex flex-col gap-4 border border-[var(--color-accent-mid)] rounded-sm rounded-tl-2xl rounded-br-2xl shadow-sm px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-[var(--color-primary-dark)]">
                        ₹{plant.variants[selectedPlantIdx].price * quantityInput}
                      </span>
                      {plant.variants[selectedPlantIdx].discount > 0 && (
                        <span className="text-md text-red-500 line-through">
                          ₹
                          {Math.round(
                            (plant.variants[selectedPlantIdx].price * quantityInput) /
                            (1 - plant.variants[selectedPlantIdx].discount / 100)
                          )}
                        </span>
                      )}
                    </div>
                    {plant.variants[selectedPlantIdx].discount > 0 && (
                      <span className="text-sm text-green-700 font-medium mt-1">
                        {plant.variants[selectedPlantIdx].discount}% off
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        dispatch(toggleCart({ plant, variant: plant.variants[selectedPlantIdx] }))
                      }
                      className={`flex items-center gap-2 px-4 h-10 rounded-tl-md rounded-br-md border-2 transition font-medium
                                            ${isInCart
                          ? 'border-green-400 text-green-700'
                          : 'border-[var(--color-accent-light)] text-green-600 hover:bg-[var(--color-accent-mid)]'
                        }`}
                    >
                      <FaShoppingCart className={isInCart ? 'text-green-600' : 'text-green-500'} />
                      <span>{isInCart ? 'Remove ' : 'Add '}</span>
                    </button>
                    <button
                      onClick={() => handleWishlistClick(plant, plant.variants[selectedPlantIdx])}
                      className="h-10 w-10 rounded-tl-md rounded-br-md border-2 border-[var(--color-accent-light)] flex items-center justify-center hover:bg-[var(--color-accent-mid)] text-[var(--color-primary-dark)] transition"
                    >
                      <span
                        className={`transition-transform duration-300 ease-in-out ${animate ? 'scale-150 animate-ping-once' : 'scale-100'}`}
                      >
                        {isInWishlist ? (
                          <FaHeart className="text-green-500" />
                        ) : (
                          <FaRegHeart className="text-green-500" />
                        )}
                      </span>
                    </button>
                  </div>
                </div>

                <button
                  className="px-6 py-3 rounded-sm rounded-tl-xl rounded-br-xl bg-[var(--color-primary-dark)] text-white font-semibold shadow hover:bg-[var(--color-primary)] transition"
                  onClick={() =>
                    handleOrder(plant.id, plant.name, plant.variants[selectedPlantIdx].price)
                  }
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
          {
            <div className="mt-10 grid grid-cols-2 gap-[5px] sm:gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:mx-auto">
              {plantsData
                .filter(x => plant.relatedPlantsIds.includes(x.id))
                .map((item, idx: number) => (
                  <PlantCard key={idx} plant={item} animated_bounce={false} />
                ))}
            </div>
          }
        </div>
      </div>
    </>
  );
}
