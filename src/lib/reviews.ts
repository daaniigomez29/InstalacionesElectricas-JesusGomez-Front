/**
 * Fetch de reseñas y rating agregado desde Google Places API (New).
 *
 * Se invoca en build time desde `seo.ts` para enriquecer el schema
 * `LocalBusiness` con `aggregateRating` y `review[]`. El módulo se cachea por
 * Vite, así que la llamada HTTP solo ocurre una vez por build (no por página).
 *
 * Si la API falla, se devuelve `null` y los schemas se generan sin reseñas en
 * lugar de romper el build.
 */

const PLACE_ID = "ChIJr6dsg6dpEg0RGY-cPsVkxp4";

export interface PlacesReviewText {
    text: string;
    languageCode: string;
}

export interface PlacesReview {
    rating: number;
    text?: PlacesReviewText;
    originalText?: PlacesReviewText;
    authorAttribution: {
        displayName: string;
        uri?: string;
        photoUri?: string;
    };
    publishTime: string;
    relativePublishTimeDescription?: string;
}

export interface PlacesResponse {
    id: string;
    displayName?: { text: string; languageCode: string };
    rating?: number;
    userRatingCount?: number;
    reviews?: PlacesReview[];
}

export async function obtainReviews(): Promise<PlacesResponse | null> {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
        console.warn(
            "[reviews] GOOGLE_PLACES_API_KEY no definida, omitiendo schema de reseñas",
        );
        return null;
    }

    try {
        const res = await fetch(
            `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=es`,
            {
                headers: {
                    "X-Goog-Api-Key": apiKey,
                    "X-Goog-FieldMask":
                        "id,displayName,rating,userRatingCount,reviews",
                }
            },
        );

        if (!res.ok) {
            console.warn(
                `[reviews] Places API ${res.status}, omitiendo schema de reseñas`,
            );
            return null;
        }

        return (await res.json()) as PlacesResponse;
    } catch (e) {
        console.warn(`[reviews] fetch falló: ${e}`);
        return null;
    }
}
