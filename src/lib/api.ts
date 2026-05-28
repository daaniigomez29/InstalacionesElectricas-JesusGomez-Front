import { sanityClient } from "sanity:client";
import {
    catalogByCategoryQuery,
    heroQuery,
    partnerLogosQuery,
    serviceFinderQuery,
    serviceProcessQuery,
    serviciosQuery,
    servicesCtaQuery,
    servicesFaqQuery,
    servicesFeaturedCasesQuery,
    servicesForWhoQuery,
    servicesHeroQuery,
    servicesWhyUsQuery,
    trabajosQuery,
} from "./queries";
import type {
    CatalogByCategory,
    PartnerLogo,
    ServiceFinder,
    ServiceProcess,
    ServicesCta,
    ServicesFaqSection,
    ServicesFeaturedCases,
    ServicesForWho,
    ServicesHero,
    ServicesWhyUs,
    ServiciosSection,
    TrabajoSection,
} from "./types";

// ============================================================
// HERO / SERVICIOS / TRABAJOS (esquema antiguo)
// ============================================================
export async function getHero() {
    return await sanityClient.fetch(heroQuery);
}

export async function getServicios(): Promise<ServiciosSection> {
    return await sanityClient.fetch(serviciosQuery);
}

export async function getTrabajos(): Promise<TrabajoSection> {
    return await sanityClient.fetch(trabajosQuery);
}

// ============================================================
// EMPRESAS QUE CONFÍAN
// ============================================================

/**
 * Devuelve los logos del slider "Empresas que confían" desde el
 * documento `homePage`. Si no hay logos o el documento no existe
 * todavía, devuelve un array vacío y la sección se ocultará en el front.
 */
export async function getPartnerLogos(): Promise<PartnerLogo[]> {
    const logos: PartnerLogo[] | null =
        await sanityClient.fetch(partnerLogosQuery);
    return (logos ?? []).filter((l) => l?.url);
}

// ============================================================
// CATÁLOGO POR CATEGORÍA (/servicios)
// ============================================================

/**
 * Devuelve el bloque "catalogByCategory" del singleton servicesPage,
 * ya con cada referencia de servicio resuelta al shape que consume
 * el componente CatalogByCategory.astro.
 *
 * Devuelve `null` si el bloque aún no se ha rellenado en Sanity, para
 * que el componente pueda hacer fallback al array hardcodeado mientras
 * se completa el contenido.
 */
export async function getCatalogByCategory(): Promise<CatalogByCategory | null> {
    return await sanityClient.fetch(catalogByCategoryQuery);
}

// ============================================================
// SERVICE FINDER (/servicios)
// ============================================================

/**
 * Devuelve el bloque "serviceFinder" del singleton servicesPage,
 * ya con cada referencia de servicio resuelta a {service, href}.
 *
 * Devuelve `null` si el bloque aún no se ha rellenado en Sanity,
 * para que el componente pueda hacer fallback al array hardcodeado.
 */
export async function getServiceFinder(): Promise<ServiceFinder | null> {
    // La query devuelve cada fila con `service` anidado como sub-objeto:
    //   { situation, service: { service: name, href: ... } }
    // Aplanamos aquí para que el consumidor reciba el mismo shape que el
    // array hardcodeado de ServiceFinder.astro: { situation, service, href }.
    const raw: any = await sanityClient.fetch(serviceFinderQuery);
    if (!raw) return null;
    return {
        ...raw,
        rows: Array.isArray(raw.rows)
            ? raw.rows.map((r: any) => ({
                  situation: r?.situation,
                  service: r?.service?.service,
                  href: r?.service?.href,
              }))
            : [],
    };
}

// ============================================================
// CÓMO TRABAJAMOS / SERVICE PROCESS (/servicios)
// ============================================================

/**
 * Devuelve el bloque "processSection" del singleton servicesPage,
 * listo para consumir como prop por <ServiceProcess> y como input
 * de buildHowTo() para el schema SEO.
 *
 * Devuelve `null` si el bloque aún no se ha rellenado en Sanity,
 * para que la página pueda hacer fallback al array hardcodeado.
 */
export async function getServiceProcess(): Promise<ServiceProcess | null> {
    return await sanityClient.fetch(serviceProcessQuery);
}

// ============================================================
// /servicios — RESTO DE SECCIONES (hero, forWho, whyUs, etc.)
// ============================================================

export async function getServicesHero(): Promise<ServicesHero | null> {
    return await sanityClient.fetch(servicesHeroQuery);
}

export async function getServicesForWho(): Promise<ServicesForWho | null> {
    return await sanityClient.fetch(servicesForWhoQuery);
}

export async function getServicesWhyUs(): Promise<ServicesWhyUs | null> {
    return await sanityClient.fetch(servicesWhyUsQuery);
}

export async function getServicesFeaturedCases(): Promise<ServicesFeaturedCases | null> {
    return await sanityClient.fetch(servicesFeaturedCasesQuery);
}

export async function getServicesFaq(): Promise<ServicesFaqSection | null> {
    return await sanityClient.fetch(servicesFaqQuery);
}

export async function getServicesCta(): Promise<ServicesCta | null> {
    return await sanityClient.fetch(servicesCtaQuery);
}