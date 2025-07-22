'use client';

import { usePathname } from 'next/navigation';
import Head from 'next/head';

interface SeoHeadProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

const defaultMeta = {
  title: 'Nursery Garden | Find Plants Nearby',
  description:
    'Discover and buy a variety of plants from local nurseries near you. Healthy, fresh, and delivered.',
  image: '/og-image.png',
  url: 'https://prasanthnursery.com',
};

export const SeoHead = ({ title, description, image, noIndex = false }: SeoHeadProps) => {
  const path = usePathname();
  const fullUrl = `${defaultMeta.url}${path}`;

  const metaTitle = title || defaultMeta.title;
  const metaDesc = description || defaultMeta.description;
  const metaImage = image || defaultMeta.image;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="canonical" href={fullUrl} />

      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImage} />
    </Head>
  );
};
