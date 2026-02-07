import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://prasanthnuserygarden.com',
            lastModified: new Date(),
        },
    ]
}
