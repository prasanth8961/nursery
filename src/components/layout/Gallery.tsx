'use client';

import Image from 'next/image';

const imageUrls = Array.from({ length: 12 }, (_, i) => `/images/${i + 2}.png`);
const DEFAULT_IMAGE = '/images/1.png'

const mobileImageLayout = [
    { src: imageUrls[0], className: 'row-span-3' },
    { src: imageUrls[1], className: 'row-span-4' },
    { src: imageUrls[2], className: 'row-span-2 col-start-1 row-start-4' },
    { src: imageUrls[3], className: 'row-span-3 col-start-3 row-start-1' },
    { src: imageUrls[4], className: 'row-span-4 col-start-3 row-start-4' },
    { src: imageUrls[5], className: 'row-span-3 col-start-2 row-start-5' },
    { src: imageUrls[6], className: 'row-span-2 row-start-6' },
    { src: imageUrls[7], className: 'col-span-2 row-span-3 row-start-8' },
    { src: imageUrls[8], className: 'row-span-2 col-start-3 row-start-8' },
    { src: imageUrls[9], className: 'col-start-3 row-start-10' },
    { src: imageUrls[10], className: 'col-span-2 row-span-2 col-start-2 row-start-11' },
    { src: imageUrls[11], className: 'row-span-2 col-start-1 row-start-11' },
];

export const Gallery = () => {
    return (
        <section className="py-2 px-4 sm:px-8 max-w-7xl mx-auto select-none pointer-events-none" onContextMenu={(e) => e.preventDefault()}>
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-8">
                Our Green Gallery
            </h2>

            <div className="block sm:hidden h-screen grid grid-cols-3 grid-rows-12 gap-[1px] sm:gap-2">
                {mobileImageLayout.map((img, idx) => (
                    <div key={idx} className={`relative ${img.className}`}>
                        <Image
                            src={img.src || DEFAULT_IMAGE}
                            alt={`Gallery Image ${idx + 1}`}
                            fill
                            className="object-cover rounded-sm"
                        />
                    </div>
                ))}
            </div>

            <div className="hidden sm:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {imageUrls.map((src, idx) => (
                    <div
                        key={idx}
                        className={`relative overflow-hidden rounded-lg ${idx % 6 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                            } aspect-[3/4] sm:aspect-square`}
                    >
                        <Image
                            src={src}
                            alt={`Desktop Gallery Image ${idx + 1}`}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};
