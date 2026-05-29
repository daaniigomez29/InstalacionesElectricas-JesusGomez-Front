import { sanityClient } from "sanity:client";
import {
    aboutCtaQuery,
    aboutFaqQuery,
    aboutHeroQuery,
    aboutStoryQuery,
    aboutValuesQuery,
    pageSeoQuery,
    allProjectsForBuildQuery,
    allServicesForBuildQuery,
    catalogByCategoryQuery,
    footerServicesQuery,
    homeAboutQuery,
    homeFaqQuery,
    homeFeaturedWorksQuery,
    homeFinalCtaQuery,
    homeHeroQuery,
    homeServicesQuery,
    partnerLogosQuery,
    serviceFinderQuery,
    serviceProcessQuery,
    servicesCtaQuery,
    servicesFaqQuery,
    servicesFeaturedCasesQuery,
    servicesForWhoQuery,
    servicesHeroQuery,
    servicesWhyUsQuery,
    worksCtaQuery,
    worksHeroQuery,
    worksIntroQuery,
} from "./queries";
import { services as localServices, type Service } from "../data/servicios";
import type { Project } from "../data/projects";

export interface FooterService {
    slug: string;
    name: string;
}
import type {
    AboutCta,
    AboutFaqSection,
    AboutHero,
    AboutStory,
    AboutValues,
    CatalogByCategory,
    HomeAbout,
    HomeFaqSection,
    HomeFeaturedWorksSection,
    HomeFinalCta,
    HomeHero,
    HomeServicesSection,
    PageSeo,
    PartnerLogo,
    ServiceFinder,
    ServiceProcess,
    ServicesCta,
    ServicesFaqSection,
    ServicesFeaturedCases,
    ServicesForWho,
    ServicesHero,
    ServicesWhyUs,
    WorksCta,
    WorksHero,
    WorksIntro,
} from "./types";

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

// ============================================================
// /servicios/[slug] — DETALLE DE SERVICIO
// ============================================================

/**
 * Convierte un span de Portable Text a HTML aplicando los marks
 * disponibles en el schema richText (strong, em, underline, links).
 * Cualquier otro mark se ignora silenciosamente y queda como texto plano.
 */
function spanToHtml(span: any, markDefs: any[]): string {
    let text: string = span?.text ?? "";
    if (!text) return "";
    const marks: string[] = span?.marks ?? [];
    for (const mark of marks) {
        if (mark === "strong") {
            text = `<b>${text}</b>`;
        } else if (mark === "em") {
            text = `<em>${text}</em>`;
        } else if (mark === "underline") {
            text = `<u>${text}</u>`;
        } else {
            // Es un markDef referenciado por key (p.ej. un link)
            const def = markDefs.find((m) => m._key === mark);
            if (def?._type === "link" && def?.href) {
                const target = def?.isExternal
                    ? ' target="_blank" rel="noopener noreferrer"'
                    : "";
                text = `<a href="${def.href}"${target}>${text}</a>`;
            }
        }
    }
    return text;
}

/**
 * Convierte el array de bloques Portable Text de Sanity en un array
 * de strings HTML — uno por bloque (cada bloque = un párrafo en el
 * shape del Service local).
 */
function portableTextToHtmlArray(blocks: any): string[] {
    if (!Array.isArray(blocks)) return [];
    return blocks
        .filter((b: any) => b?._type === "block")
        .map((b: any) => {
            const markDefs = b?.markDefs ?? [];
            const children = b?.children ?? [];
            return children
                .map((c: any) => spanToHtml(c, markDefs))
                .join("");
        });
}

/**
 * Normaliza un servicio crudo de Sanity al shape `Service` de los
 * datos locales. Esto permite que los componentes (ServiceHero,
 * ServiceIntro, ServiceIncludes, etc.) sigan recibiendo exactamente
 * el mismo tipo de datos que reciben desde src/data/servicios.ts.
 */
function normalizeSanityService(raw: any): Service {
    return {
        slug: raw?.slug ?? "",
        name: raw?.name ?? "",
        seo: {
            title: raw?.seo?.title,
            description: raw?.seo?.description ?? "",
        },
        hero: {
            h1: raw?.hero?.h1 ?? "",
            subtitle: raw?.hero?.subtitle ?? "",
            bgImage: raw?.hero?.bgImage ?? "",
        },
        intro: {
            title: raw?.intro?.title ?? "",
            paragraphs: portableTextToHtmlArray(raw?.intro?.paragraphs),
            image: raw?.intro?.image ?? "",
            imageAlt: raw?.intro?.imageAlt ?? "",
        },
        includes: {
            title: raw?.includes?.title ?? "",
            intro: raw?.includes?.intro,
            items: raw?.includes?.items ?? [],
        },
        problems: {
            title: raw?.problems?.title ?? "",
            intro: raw?.problems?.intro,
            items: raw?.problems?.items ?? [],
        },
        benefits: {
            title: raw?.benefits?.title ?? "",
            items: raw?.benefits?.items ?? [],
        },
        process: {
            title: raw?.process?.title ?? "",
            steps: raw?.process?.steps ?? [],
        },
        faq: {
            title: raw?.faq?.title ?? "",
            items: raw?.faq?.items ?? [],
        },
        related: (raw?.related ?? [])
            .filter((r: any) => r?.slug)
            .map((r: any) => ({
                slug: r.slug,
                description: r?.description ?? "",
            })),
        cta: {
            title: raw?.cta?.title ?? "",
            text: raw?.cta?.text ?? "",
        },
    };
}

/**
 * Devuelve todos los servicios listos para alimentar `getStaticPaths`
 * de la página /servicios/[slug], normalizados al shape `Service`.
 *
 * Si Sanity no devuelve nada (CMS aún vacío o fallo de red), devuelve
 * array vacío para que la llamada haga fallback a los datos locales.
 */
export async function getAllServicesForBuild(): Promise<Service[]> {
    try {
        const raw: any[] = await sanityClient.fetch(allServicesForBuildQuery);
        if (!Array.isArray(raw)) return [];
        return raw
            .filter((r) => r?.slug)
            .map((r) => normalizeSanityService(r));
    } catch (err) {
        console.warn(
            "[getAllServicesForBuild] Fallo al leer servicios de Sanity, se usará fallback local:",
            err,
        );
        return [];
    }
}

/**
 * Devuelve la lista de servicios (solo slug + nombre) para el footer.
 * Si Sanity falla o devuelve vacío, hace fallback al array local
 * src/data/servicios.ts para que el footer nunca quede sin enlaces.
 */
export async function getFooterServices(): Promise<FooterService[]> {
    try {
        const raw: any[] = await sanityClient.fetch(footerServicesQuery);
        if (Array.isArray(raw) && raw.length > 0) {
            return raw
                .filter((r) => r?.slug && r?.name)
                .map((r) => ({ slug: r.slug, name: r.name }));
        }
    } catch (err) {
        console.warn(
            "[getFooterServices] Fallo al leer servicios de Sanity, se usará fallback local:",
            err,
        );
    }
    return localServices
        .map((s) => ({ slug: s.slug, name: s.name }))
        .sort((a, b) => a.name.localeCompare(b.name, "es"));
}

// ============================================================
// HOME (/) — secciones desde Sanity
// ============================================================

export async function getHomeHero(): Promise<HomeHero | null> {
    return await sanityClient.fetch(homeHeroQuery);
}

export async function getHomeAbout(): Promise<HomeAbout | null> {
    return await sanityClient.fetch(homeAboutQuery);
}

export async function getHomeServices(): Promise<HomeServicesSection | null> {
    return await sanityClient.fetch(homeServicesQuery);
}

export async function getHomeFeaturedWorks(): Promise<HomeFeaturedWorksSection | null> {
    const raw: HomeFeaturedWorksSection | null = await sanityClient.fetch(
        homeFeaturedWorksQuery,
    );
    if (!raw) return null;

    // GROQ no permite valores dinámicos en los rangos `[...]`, así que la
    // query trae hasta 50 proyectos en modo "latest" y aquí recortamos al
    // `limit` real configurado (default 6).
    if (raw.mode === "latest" && Array.isArray(raw.projects)) {
        const limit = typeof raw.limit === "number" && raw.limit > 0 ? raw.limit : 6;
        return { ...raw, projects: raw.projects.slice(0, limit) };
    }
    return raw;
}

export async function getHomeFaq(): Promise<HomeFaqSection | null> {
    return await sanityClient.fetch(homeFaqQuery);
}

export async function getHomeFinalCta(): Promise<HomeFinalCta | null> {
    return await sanityClient.fetch(homeFinalCtaQuery);
}

// ============================================================
// /sobre-nosotros — secciones desde Sanity
// ============================================================

export async function getAboutHero(): Promise<AboutHero | null> {
    return await sanityClient.fetch(aboutHeroQuery);
}

export async function getAboutStory(): Promise<AboutStory | null> {
    const raw: any = await sanityClient.fetch(aboutStoryQuery);
    if (!raw) return null;
    // Convertimos el Portable Text de `content` en array de strings HTML
    // (un párrafo por bloque), reutilizando el conversor del detalle de servicio.
    return {
        title: raw.title,
        paragraphs: portableTextToHtmlArray(raw.content),
        imageUrl: raw.imageUrl,
        imageAlt: raw.imageAlt,
    };
}

export async function getAboutValues(): Promise<AboutValues | null> {
    return await sanityClient.fetch(aboutValuesQuery);
}

export async function getAboutFaq(): Promise<AboutFaqSection | null> {
    return await sanityClient.fetch(aboutFaqQuery);
}

export async function getAboutCta(): Promise<AboutCta | null> {
    return await sanityClient.fetch(aboutCtaQuery);
}

// ============================================================
// /nuestros-trabajos — secciones desde Sanity
// ============================================================

export async function getWorksHero(): Promise<WorksHero | null> {
    return await sanityClient.fetch(worksHeroQuery);
}

export async function getWorksIntro(): Promise<WorksIntro | null> {
    return await sanityClient.fetch(worksIntroQuery);
}

export async function getWorksCta(): Promise<WorksCta | null> {
    return await sanityClient.fetch(worksCtaQuery);
}

// ============================================================
// /nuestros-trabajos/[slug] — DETALLE DE PROYECTO
// ============================================================

/**
 * Normaliza un proyecto crudo de Sanity al shape `Project` de los
 * datos locales (src/data/projects.ts), para que los componentes
 * WorkCard / WorkHero / ProjectStory / ProjectInfo / etc. sigan
 * recibiendo el mismo tipo de datos.
 */
function normalizeSanityProject(raw: any): Project {
    return {
        slug: raw?.slug ?? "",
        title: raw?.title ?? "",
        summary: raw?.summary ?? "",
        location: raw?.location ?? "",
        type: raw?.type ?? "",
        duration: raw?.duration ?? "",
        client: raw?.client ?? "",
        coverImage: {
            src: raw?.coverImage?.src ?? "",
            alt: raw?.coverImage?.alt ?? "",
        },
        problem: raw?.problem ?? "",
        solution: raw?.solution ?? "",
        result: raw?.result ?? "",
        gallery: Array.isArray(raw?.gallery)
            ? raw.gallery
                  .filter((g: any) => g?.src)
                  .map((g: any) => ({ src: g.src, alt: g?.alt ?? "" }))
            : [],
        testimonial: raw?.testimonial?.quote
            ? {
                  quote: raw.testimonial.quote,
                  author: raw.testimonial.author,
              }
            : undefined,
        featured: raw?.featured ?? false,
        seo: raw?.seo
            ? {
                  title: raw.seo.title,
                  description: raw.seo.description,
              }
            : undefined,
    };
}

/**
 * Devuelve todos los proyectos de Sanity normalizados al shape
 * `Project` de los datos locales, ordenados por publishedAt desc.
 *
 * Devuelve array vacío si Sanity está vacío o falla — para que la
 * llamada haga fallback a los datos locales.
 */
// ============================================================
// SEO por página (singleton)
// ============================================================

/**
 * Singleton types soportados para SEO. Cualquiera puede tener un bloque
 * `seo` rellenado desde el Studio que sobreescribe los hardcoded.
 */
export type SeoDocType =
    | "homePage"
    | "servicesPage"
    | "aboutPage"
    | "worksPage"
    | "contactPage";

/**
 * Devuelve el bloque SEO del singleton solicitado. Cada campo es
 * opcional: el consumidor hace fallback al valor hardcoded de la página
 * si Sanity lo devuelve null/undefined.
 */
export async function getPageSeo(
    docType: SeoDocType,
): Promise<PageSeo | null> {
    return await sanityClient.fetch(pageSeoQuery, { docType });
}

export async function getAllProjectsForBuild(): Promise<Project[]> {
    try {
        const raw: any[] = await sanityClient.fetch(allProjectsForBuildQuery);
        if (!Array.isArray(raw)) return [];
        return raw
            .filter((r) => r?.slug)
            .map((r) => normalizeSanityProject(r));
    } catch (err) {
        console.warn(
            "[getAllProjectsForBuild] Fallo al leer proyectos de Sanity, se usará fallback local:",
            err,
        );
        return [];
    }
}