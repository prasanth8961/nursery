import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://prasanthnuserygarde.com',
      lastModified: new Date(),
    },
  ];
}
