const BASE_THUMBNAIL_PATH = "/plants/thumbnail";
const BASE_COVER_PATH = "/plants/cover_images";

export const plantThumbnails = {
    semparuthi: `${BASE_THUMBNAIL_PATH}/semparuthi.jpg`,
    ixora_white: `${BASE_THUMBNAIL_PATH}/ixora_white.jpg`,
    yellow_allamanda: `${BASE_THUMBNAIL_PATH}/yellow_allamanda.jpg`,
    guava: `${BASE_THUMBNAIL_PATH}/guava.jpg`,
    golden_shower: `${BASE_THUMBNAIL_PATH}/golden_shower.jpg`,
    wild_fig: `${BASE_THUMBNAIL_PATH}/wild_fig.jpg`,
    aralia_white: `${BASE_THUMBNAIL_PATH}/aralia_white.jpg`,
    hawaiian_ti: `${BASE_THUMBNAIL_PATH}/hawaiian_ti.jpg`,
    ixora_pink: `${BASE_THUMBNAIL_PATH}/ixora_pink.jpg`,
    ixora_red: `${BASE_THUMBNAIL_PATH}/ixora_red.jpg`,
    pannir_rose: `${BASE_THUMBNAIL_PATH}/pannir_rose.jpg`,
    croton_petra: `${BASE_THUMBNAIL_PATH}/croton_petra.jpg`,
    mexican_mint: `${BASE_THUMBNAIL_PATH}/mexican_mint.jpg`,
    duranta: `${BASE_THUMBNAIL_PATH}/duranta.jpg`,

} as const;

export const plantCoverImages = {
    semparuthi: {
        default: [
            `${BASE_COVER_PATH}/semparuthi-1.jpg`,
            `${BASE_COVER_PATH}/semparuthi-2.jpg`,
        ],
        variants: {
            // "101-4x6": [`${BASE_COVER_PATH}/semparuthi-4x6-1.jpg`, `${BASE_COVER_PATH}/semparuthi-4x6-2.jpg`],
            // "101-7x8": [`${BASE_COVER_PATH}/semparuthi-7x8-1.jpg`, `${BASE_COVER_PATH}/semparuthi-7x8-2.jpg`],
            // "101-7x10": [`${BASE_COVER_PATH}/semparuthi-7x10-1.jpg`, `${BASE_COVER_PATH}/semparuthi-7x10-2.jpg`],
        },
    },
    ixora_white: {
        default: [
            `${BASE_COVER_PATH}/ixora_white-1.jpg`,
            `${BASE_COVER_PATH}/ixora_white-2.jpg`,
        ],
        variants: {
            // "102-4x6": [`${BASE_COVER_PATH}/ixora_white-4x6-1.jpg`, `${BASE_COVER_PATH}/ixora_white-4x6-2.jpg`],
            // "102-7x8": [`${BASE_COVER_PATH}/ixora_white-7x8-1.jpg`, `${BASE_COVER_PATH}/ixora_white-7x8-2.jpg`],
            // "102-7x10": [`${BASE_COVER_PATH}/ixora_white-7x10-1.jpg`, `${BASE_COVER_PATH}/ixora_white-7x10-2.jpg`],
        },
    },
    ixora_pink: {
        default: [
            `${BASE_COVER_PATH}/ixora_pink-1.jpg`,
            `${BASE_COVER_PATH}/ixora_pink-2.jpg`,
        ],
        variants: {
            // "103-4x6": [`${BASE_COVER_PATH}/ixora_pink-4x6-1.jpg`, `${BASE_COVER_PATH}/ixora_pink-4x6-2.jpg`],
            // "103-7x8": [`${BASE_COVER_PATH}/ixora_pink-7x8-1.jpg`, `${BASE_COVER_PATH}/ixora_pink-7x8-2.jpg`],
            // "103-7x10": [`${BASE_COVER_PATH}/ixora_pink-7x10-1.jpg`, `${BASE_COVER_PATH}/ixora_pink-7x10-2.jpg`],
        },
    },
    aralia_white: {
        default: [
            `${BASE_COVER_PATH}/aralia_white-1.jpg`,
            `${BASE_COVER_PATH}/aralia_white-2.jpg`,
        ],
        variants: {
            // "104-4x6": [`${BASE_COVER_PATH}/aralia_white-4x6-1.jpg`, `${BASE_COVER_PATH}/aralia_white-4x6-2.jpg`],
            // "104-7x8": [`${BASE_COVER_PATH}/aralia_white-7x8-1.jpg`, `${BASE_COVER_PATH}/aralia_white-7x8-2.jpg`],
            // "104-7x10": [`${BASE_COVER_PATH}/aralia_white-7x10-1.jpg`, `${BASE_COVER_PATH}/aralia_white-7x10-2.jpg`],
        },
    },
    hawaiian_ti: {
        default: [
            `${BASE_COVER_PATH}/hawaiian_ti-1.jpg`,
            `${BASE_COVER_PATH}/hawaiian_ti-2.jpg`,
        ],
        variants: {
            // "105-4x6": [`${BASE_COVER_PATH}/hawaiian_ti-4x6-1.jpg`, `${BASE_COVER_PATH}/hawaiian_ti-4x6-2.jpg`],
            // "105-7x8": [`${BASE_COVER_PATH}/hawaiian_ti-7x8-1.jpg`, `${BASE_COVER_PATH}/hawaiian_ti-7x8-2.jpg`],
            // "105-7x10": [`${BASE_COVER_PATH}/hawaiian_ti-7x10-1.jpg`, `${BASE_COVER_PATH}/hawaiian_ti-7x10-2.jpg`],
        },
    },

    pannir_rose: {
        default: [
            `${BASE_COVER_PATH}/pannir_rose-1.jpg`,
            `${BASE_COVER_PATH}/pannir_rose-2.jpg`,
        ],
        variants: {
            // "106-4x6": [`${BASE_COVER_PATH}/pannir_rose-4x6-1.jpg`, `${BASE_COVER_PATH}/pannir_rose-4x6-2.jpg`],
            // "106-7x8": [`${BASE_COVER_PATH}/pannir_rose-7x8-1.jpg`, `${BASE_COVER_PATH}/pannir_rose-7x8-2.jpg`],
            // "106-7x10": [`${BASE_COVER_PATH}/pannir_rose-7x10-1.jpg`, `${BASE_COVER_PATH}/pannir_rose-7x10-2.jpg`],
        },
    },

    ixora_red: {
        default: [
            `${BASE_COVER_PATH}/ixora_red-1.jpg`,
            `${BASE_COVER_PATH}/ixora_red-2.jpg`,
        ],
        variants: {
            // "107-4x6": [`${BASE_COVER_PATH}/ixora_red-4x6-1.jpg`, `${BASE_COVER_PATH}/ixora_red-4x6-2.jpg`],
            // "107-7x8": [`${BASE_COVER_PATH}/ixora_red-7x8-1.jpg`, `${BASE_COVER_PATH}/ixora_red-7x8-2.jpg`],
            // "107-7x10": [`${BASE_COVER_PATH}/ixora_red-7x10-1.jpg`, `${BASE_COVER_PATH}/ixora_red-7x10-2.jpg`],
        },
    },


    yellow_allamanda: {
        default: [
            `${BASE_COVER_PATH}/yellow_allamanda-1.jpg`,
            `${BASE_COVER_PATH}/yellow_allamanda-2.jpg`,
        ],
        variants: {
            // "108-4x6": [`${BASE_COVER_PATH}/yellow_allamanda-4x6-1.jpg`, `${BASE_COVER_PATH}/yellow_allamanda-4x6-2.jpg`],
            // "108-7x8": [`${BASE_COVER_PATH}/yellow_allamanda-7x8-1.jpg`, `${BASE_COVER_PATH}/yellow_allamanda-7x8-2.jpg`],
            // "108-7x10": [`${BASE_COVER_PATH}/yellow_allamanda-7x10-1.jpg`, `${BASE_COVER_PATH}/yellow_allamanda-7x10-2.jpg`],
        },
    },

    guava: {
        default: [
            `${BASE_COVER_PATH}/guava-1.jpg`,
            `${BASE_COVER_PATH}/guava-2.jpg`,
        ],
        variants: {
            // "109-4x6": [`${BASE_COVER_PATH}/guava-4x6-1.jpg`, `${BASE_COVER_PATH}/guava-4x6-2.jpg`],
            // "109-7x8": [`${BASE_COVER_PATH}/guava-7x8-1.jpg`, `${BASE_COVER_PATH}/guava-7x8-2.jpg`],
            // "109-7x10": [`${BASE_COVER_PATH}/guava-7x10-1.jpg`, `${BASE_COVER_PATH}/guava-7x10-2.jpg`],
        },
    },

    golden_shower: {
        default: [
            `${BASE_COVER_PATH}/golden_shower-1.jpg`,
            `${BASE_COVER_PATH}/golden_shower-2.jpg`,
        ],
        variants: {
            // "110-4x6": [`${BASE_COVER_PATH}/golden_shower-4x6-1.jpg`, `${BASE_COVER_PATH}/golden_shower-4x6-2.jpg`],
            // "110-7x8": [`${BASE_COVER_PATH}/golden_shower-7x8-1.jpg`, `${BASE_COVER_PATH}/golden_shower-7x8-2.jpg`],
            // "110-7x10": [`${BASE_COVER_PATH}/golden_shower-7x10-1.jpg`, `${BASE_COVER_PATH}/golden_shower-7x10-2.jpg`],
        },
    },
    wild_fig: {
        default: [
            `${BASE_COVER_PATH}/wild_fig-1.jpg`,
            `${BASE_COVER_PATH}/wild_fig-2.jpg`,
        ],
        variants: {
            // "111-4x6": [`${BASE_COVER_PATH}/wild_fig-4x6-1.jpg`, `${BASE_COVER_PATH}/wild_fig-4x6-2.jpg`],
            // "111-7x8": [`${BASE_COVER_PATH}/wild_fig-7x8-1.jpg`, `${BASE_COVER_PATH}/wild_fig-7x8-2.jpg`],
            // "111-7x10": [`${BASE_COVER_PATH}/wild_fig-7x10-1.jpg`, `${BASE_COVER_PATH}/wild_fig-7x10-2.jpg`],
        },
    },
    croton_petra: {
        default: [
            `${BASE_COVER_PATH}/croton_petra-1.jpg`,
            `${BASE_COVER_PATH}/croton_petra-2.jpg`,
        ],
        variants: {
            // "111-4x6": [`${BASE_COVER_PATH}/croton_petra-4x6-1.jpg`, `${BASE_COVER_PATH}/croton_petra-4x6-2.jpg`],
            // "111-7x8": [`${BASE_COVER_PATH}/croton_petra-7x8-1.jpg`, `${BASE_COVER_PATH}/croton_petra-7x8-2.jpg`],
            // "111-7x10": [`${BASE_COVER_PATH}/croton_petra-7x10-1.jpg`, `${BASE_COVER_PATH}/croton_petra-7x10-2.jpg`],
        },
    },
    mexican_mint: {
        default: [
            `${BASE_COVER_PATH}/mexican_mint-1.jpg`,
            `${BASE_COVER_PATH}/mexican_mint-2.jpg`,
        ],
        variants: {
            // "101-4x6": [`${BASE_COVER_PATH}/mexican_mint-4x6-1.jpg`, `${BASE_COVER_PATH}/mexican_mint-4x6-2.jpg`],
            // "101-7x8": [`${BASE_COVER_PATH}/mexican_mint-7x8-1.jpg`, `${BASE_COVER_PATH}/mexican_mint-7x8-2.jpg`],
            // "101-7x10": [`${BASE_COVER_PATH}/mexican_mint-7x10-1.jpg`, `${BASE_COVER_PATH}/mexican_mint-7x10-2.jpg`],
        },
    },
    duranta: {
        default: [
            `${BASE_COVER_PATH}/duranta-1.jpg`,
            `${BASE_COVER_PATH}/duranta-2.jpg`,
        ],
        variants: {
            // "101-4x6": [`${BASE_COVER_PATH}/duranta-4x6-1.jpg`, `${BASE_COVER_PATH}/duranta-4x6-2.jpg`],
            // "101-7x8": [`${BASE_COVER_PATH}/duranta-7x8-1.jpg`, `${BASE_COVER_PATH}/duranta-7x8-2.jpg`],
            // "101-7x10": [`${BASE_COVER_PATH}/duranta-7x10-1.jpg`, `${BASE_COVER_PATH}/duranta-7x10-2.jpg`],
        },
    },
} as const;

export type PlantKey = keyof typeof plantCoverImages;
