import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://prasanthnurserygarden.com',
      lastModified: new Date(),
    },
  ];
}
