import { plantCoverImages, PlantKey } from "@/seeds/plantImages";

function isValidPlantKey(key: string): key is PlantKey {
    return key in plantCoverImages;
}

export function getCoverImages(
    plantKey: string,
    variantId?: string
): string[] {
    if (!isValidPlantKey(plantKey)) return [];

    const entry = plantCoverImages[plantKey];

    if (variantId && entry.variants && variantId in entry.variants) {
        return entry.variants[variantId as keyof typeof entry.variants];
    }

    return entry.default;
}
