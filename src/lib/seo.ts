/**
 * Datos centralizados de SEO / Schema.org (JSON-LD).
 *
 * Aquí se definen:
 *  - Constantes del negocio (NAP, redes, etc.).
 *  - Identificadores `@id` reutilizables para enlazar entidades por referencia
 *    desde cualquier schema del sitio (evita duplicar el bloque del negocio).
 *  - Builders de schemas comunes (LocalBusiness, Organization, WebSite,
 *    BreadcrumbList, HowTo, CollectionPage, Service, Article, ContactPage,
 *    AboutPage).
 *
 * Convención: la entidad "negocio físico" vive en `BUSINESS_ID` y se
 * referencia desde otros schemas con `{ "@id": BUSINESS_ID }` en lugar de
 * volver a expandirla.
 * 
 * Google places ID: ChIJr6dsg6dpEg0RGY-cPsVkxp4
 */

import { obtainReviews, type PlacesReview } from "./reviews";

export const SITE_URL = "https://www.instalacioneselectricasjesusgomez.es";

export const BUSINESS_ID = `${SITE_URL}/#business`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const BUSINESS_NAME = "Instalaciones Eléctricas Jesús Gómez";
export const BUSINESS_PHONE = "+34691886370";
export const BUSINESS_EMAIL_LANG = "Spanish";

export const BUSINESS_LOGO = `${SITE_URL}/assets/logos/logo_jesus_web_512.png`;
export const BUSINESS_IMAGE = `${SITE_URL}/assets/logos/logo_jesus_completo.webp`;

export const reviewsData = await obtainReviews();

export const BUSINESS_ADDRESS = {
    streetAddress: "C. Tungsteno, Norte",
    addressLocality: "Sevilla",
    addressRegion: "Sevilla",
    postalCode: "41007",
    addressCountry: "ES",
};

export const BUSINESS_GEO = {
    latitude: 37.4087812,
    longitude: -5.9570524,
};

/**
 * Horario comercial: Lunes a Sábado, 7:00 - 22:00.
 */
export const BUSINESS_HOURS = [
    {
        dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
        opens: "07:00",
        closes: "22:00",
    },
];

export const SOCIAL_PROFILES = [
    "https://www.facebook.com/jesus.gomez.94214508/",
    "https://www.instagram.com/instalaciones_electricas_jesus/",
];

/**
 * Municipios servidos. Si cambian, actualizar también `ServiceAreas.astro`
 * (o mover esa sección a importar desde aquí).
 */
export const SERVICE_AREAS = [
    "Albaida del Aljarafe",
    "Alcalá del Río",
    "Alcalá de Guadaíra",
    "Bollullos de la Mitación",
    "Bormujos",
    "Brenes",
    "Burgullos",
    "Camas",
    "Carmona",
    "Castilleja de la Cuesta",
    "Coria del Río",
    "Dos Hermanas",
    "El Palmar de Troya",
    "El Viso del Alcor",
    "Espartinas",
    "Gines",
    "La Algaba",
    "La Puebla del Río",
    "La Rinconada",
    "Lora del Río",
    "Los Morales",
    "Los Palacios y Villafranca",
    "Mairena del Aljarafe",
    "San José de la Rinconada",
    "San Juan de Aznalfarache",
    "Sanlúcar la Mayor",
    "Sevilla capital",
    "Tomares",
    "Utrera",
    "Villanueva del Ariscal",
];

const AREA_SERVED_NODES = SERVICE_AREAS.map((name) => ({
    "@type": "City",
    name,
}));

// ----- Reseñas (Google Places API) ---------------------------------------

/**
 * Fetch de reseñas en build time. El módulo se cachea, así que la API se
 * llama una sola vez por build aunque seo.ts se importe desde N páginas.
 *
 * Se exporta `placesData` para que la sección de opiniones de la web pueda
 * renderizar EN HTML las mismas reseñas que aparecen en el schema (requisito
 * de Google: el contenido marcado debe ser visible al usuario).
 */
export const placesData = await obtainReviews();

/** Reseñas listas para iterar en componentes Astro (puede ser []). */
export const visibleReviews: PlacesReview[] = placesData?.reviews ?? [];

const reviewSchemas = visibleReviews.map((r) => ({
    "@type": "Review",
    author: {
        "@type": "Person",
        name: r.authorAttribution.displayName,
    },
    reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
    },
    reviewBody: r.originalText?.text ?? r.text?.text ?? "",
    inLanguage: r.originalText?.languageCode ?? r.text?.languageCode ?? "es",
    datePublished: r.publishTime,
}));

const aggregateRatingSchema =
    placesData?.rating && placesData?.userRatingCount
        ? {
              "@type": "AggregateRating",
              ratingValue: placesData.rating,
              reviewCount: placesData.userRatingCount,
              bestRating: 5,
              worstRating: 1,
          }
        : undefined;

/**
 * LocalBusiness / Electrician principal. Se inyecta una sola vez en el Layout
 * (global) y el resto de schemas lo referencian con `{ "@id": BUSINESS_ID }`.
 *
 * Si la API de Places devuelve datos, se añaden `aggregateRating` y `review[]`.
 * Si falla o no hay reseñas, esos campos se omiten para no marcar contenido
 * inexistente.
 */
export const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": BUSINESS_ID,
    name: BUSINESS_NAME,
    url: SITE_URL,
    logo: BUSINESS_LOGO,
    image: BUSINESS_IMAGE,
    description:
        "Electricista en Sevilla especializado en instalaciones, reparaciones y mantenimiento eléctrico. Servicio rápido, profesional y con garantía.",
    telephone: BUSINESS_PHONE,
    priceRange: "€€",
    address: {
        "@type": "PostalAddress",
        ...BUSINESS_ADDRESS,
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: BUSINESS_GEO.latitude,
        longitude: BUSINESS_GEO.longitude,
    },
    openingHoursSpecification: BUSINESS_HOURS.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.dayOfWeek,
        opens: h.opens,
        closes: h.closes,
    })),
    areaServed: AREA_SERVED_NODES,
    sameAs: SOCIAL_PROFILES,
    ...(aggregateRatingSchema ? { aggregateRating: aggregateRatingSchema } : {}),
    ...(reviewSchemas.length ? { review: reviewSchemas } : {}),
};

/**
 * Organization (marca) — separada del LocalBusiness para alimentar el
 * knowledge panel y permitir que `Article.author/publisher` la referencien.
 */
export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: BUSINESS_NAME,
    url: SITE_URL,
    logo: BUSINESS_LOGO,
    contactPoint: {
        "@type": "ContactPoint",
        telephone: BUSINESS_PHONE,
        contactType: "customer service",
        areaServed: "ES",
        availableLanguage: BUSINESS_EMAIL_LANG,
    },
    sameAs: SOCIAL_PROFILES,
};

/**
 * WebSite. Sin SearchAction porque no hay buscador interno.
 */
export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: BUSINESS_NAME,
    inLanguage: "es-ES",
    publisher: { "@id": ORGANIZATION_ID },
};

// ----- Builders -----------------------------------------------------------

export interface Crumb {
    name: string;
    /** URL absoluta o ruta relativa empezando por `/`. */
    item?: string;
}

export function buildBreadcrumb(crumbs: Crumb[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => {
            const node: Record<string, unknown> = {
                "@type": "ListItem",
                position: i + 1,
                name: c.name,
            };
            if (c.item) {
                node.item = c.item.startsWith("http")
                    ? c.item
                    : `${SITE_URL}${c.item}`;
            }
            return node;
        }),
    };
}

export interface HowToStepInput {
    title: string;
    description: string;
}

export function buildHowTo(name: string, steps: HowToStepInput[], description?: string) {
    return {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name,
        ...(description ? { description } : {}),
        step: steps.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.title,
            text: s.description,
        })),
    };
}

export interface ServiceSchemaInput {
    name: string;
    description: string;
    url: string;
    serviceType?: string;
    image?: string;
    includes?: { title: string; description: string }[];
}

export function buildService(input: ServiceSchemaInput) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: input.name,
        description: input.description,
        url: input.url,
        ...(input.serviceType ? { serviceType: input.serviceType } : {}),
        ...(input.image ? { image: input.image } : {}),
        provider: { "@id": BUSINESS_ID },
        areaServed: AREA_SERVED_NODES,
        ...(input.includes && input.includes.length
            ? {
                  hasOfferCatalog: {
                      "@type": "OfferCatalog",
                      name: "Servicios incluidos",
                      itemListElement: input.includes.map((it) => ({
                          "@type": "Offer",
                          itemOffered: {
                              "@type": "Service",
                              name: it.title,
                              description: it.description,
                          },
                      })),
                  },
              }
            : {}),
        offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            priceSpecification: {
                "@type": "PriceSpecification",
                description: "Presupuesto gratuito sin compromiso",
            },
        },
    };
}

export interface CollectionPageInput {
    name: string;
    url: string;
    description?: string;
    mainEntityId?: string;
}

export function buildCollectionPage(input: CollectionPageInput) {
    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: input.name,
        url: input.url,
        ...(input.description ? { description: input.description } : {}),
        isPartOf: { "@id": WEBSITE_ID },
        ...(input.mainEntityId
            ? { mainEntity: { "@id": input.mainEntityId } }
            : {}),
    };
}

export interface ArticleInput {
    headline: string;
    description: string;
    image: string | string[];
    url: string;
    articleBody?: string;
    aboutServiceName?: string;
}

export function buildArticle(input: ArticleInput) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: input.headline,
        description: input.description,
        image: Array.isArray(input.image)
            ? input.image
            : [input.image],
        author: { "@id": ORGANIZATION_ID },
        publisher: { "@id": ORGANIZATION_ID },
        mainEntityOfPage: input.url,
        ...(input.articleBody ? { articleBody: input.articleBody } : {}),
        ...(input.aboutServiceName
            ? {
                  about: {
                      "@type": "Service",
                      name: input.aboutServiceName,
                  },
              }
            : {}),
    };
}

export interface ImageObjectInput {
    src: string;
    alt: string;
}

export function buildImageObject(img: ImageObjectInput) {
    const absolute = img.src.startsWith("http") ? img.src : `${SITE_URL}${img.src}`;
    return {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        contentUrl: absolute,
        url: absolute,
        caption: img.alt,
        description: img.alt,
    };
}

export function buildContactPage(url: string, name: string) {
    return {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name,
        url,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": BUSINESS_ID },
    };
}

export function buildAboutPage(url: string, name: string) {
    return {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name,
        url,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": BUSINESS_ID },
    };
}

/** Convierte una ruta relativa en URL absoluta del sitio. */
export function absoluteUrl(path: string) {
    if (path.startsWith("http")) return path;
    return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
