// ============================================================
// TIPOS DE DATOS DE SANITY
// ============================================================

// ----- SEO por página -----

export type PageSeo = {
    title?: string;
    description?: string;
    canonical?: string;
    ogImageUrl?: string;
    noIndex?: boolean;
};

// ----- Empresas que confían (logos del Home) -----

/** Un logo listo para renderizar en el slider. */
export type PartnerLogo = {
    /** URL del archivo de imagen ya resuelta. */
    url: string;
    /** Texto alternativo obligatorio. */
    alt: string;
};

// ----- Catálogo por categoría (/servicios) -----

/**
 * Tarjeta de servicio dentro de una categoría del catálogo.
 * Misma forma que el array hardcodeado de CatalogByCategory.astro,
 * para permitir migrar sin tocar la plantilla.
 */
export type CatalogServiceCard = {
    img: string;
    imgAlt?: string;
    title: string;
    content: string;
    href: string;
};

export type CatalogCategory = {
    emoji?: string;
    title: string;
    intro?: string;
    services: CatalogServiceCard[];
};

export type CatalogByCategory = {
    title?: string;
    intro?: string;
    categories: CatalogCategory[];
};

// ----- Service Finder (/servicios) -----

/**
 * Una fila de la tabla "¿Qué servicio necesito?".
 * Mismo shape que el array hardcodeado de ServiceFinder.astro.
 */
export type ServiceFinderRow = {
    situation: string;
    service: string;
    href: string;
};

export type ServiceFinder = {
    title?: string;
    intro?: string;
    rows: ServiceFinderRow[];
};

// ----- Cómo trabajamos / Service Process (/servicios) -----

/**
 * Un paso del proceso "Cómo trabajamos".
 * Mismo shape que el array `processSteps` hardcodeado en servicios.astro
 * y que la prop `steps` de <ServiceProcess>.
 */
export type ServiceProcessStep = {
    title: string;
    description: string;
};

export type ServiceProcess = {
    title?: string;
    steps: ServiceProcessStep[];
};

// ----- /servicios secciones simples -----

export type ServicesHero = {
    title?: string;
    subtitle?: string;
    bgImageUrl?: string;
    bgImageAlt?: string;
};

export type ForWhoAudience = {
    title: string;
    description: string;
    href?: string;
};

export type ServicesForWho = {
    title?: string;
    subtitle?: string;
    audiences: ForWhoAudience[];
};

export type WhyUsReason = {
    /** Sanity guarda el icono como string (emoji o id corto). En el front lo
     *  mapeamos a un componente icon o lo mostramos directamente. */
    icon?: string;
    title: string;
    description: string;
};

export type ServicesWhyUs = {
    title?: string;
    reasons: WhyUsReason[];
};

export type FeaturedCase = {
    img: string;
    imgAlt?: string;
    title: string;
    description: string;
};

export type ServicesFeaturedCases = {
    title?: string;
    cases: FeaturedCase[];
};

export type ServicesFaqItem = {
    question: string;
    answer: string;
};

/**
 * El schema `faq` envuelve los items en un sub-objeto `faq`. Reflejamos esa
 * estructura literalmente para no inventar shapes intermedios.
 */
export type ServicesFaqSection = {
    title?: string;
    faq?: {
        title?: string;
        items: ServicesFaqItem[];
    };
};

export type ServicesCta = {
    title: string;
    text?: string;
};

// ----- Home (/) -----

export type SanityLink = {
    label?: string;
    href?: string;
    isExternal?: boolean;
};

export type HomeHero = {
    pretitle?: string;
    titleLine1?: string;
    titleLine2?: string;
    description?: string;
    imageUrl?: string;
    imageAlt?: string;
    ctaPrimary?: SanityLink;
    ctaSecondary?: SanityLink;
};

export type HomeAbout = {
    title?: string;
    imageUrl?: string;
    imageAlt?: string;
    button?: SanityLink;
};

export type HomeServiceCard = {
    img: string;
    imgAlt?: string;
    title: string;
    content: string;
    href: string;
};

export type HomeServicesSection = {
    title?: string;
    subtitle?: string;
    mode?: "all" | "manual";
    services: HomeServiceCard[];
};

export type HomeProjectCard = {
    slug: string;
    title: string;
    summary: string;
    location?: string;
    type?: string;
    duration?: string;
    coverImage: { src: string; alt: string };
};

export type HomeFeaturedWorksSection = {
    title?: string;
    subtitle?: string;
    mode?: "featured" | "latest" | "manual";
    limit?: number;
    projects: HomeProjectCard[];
};

export type HomeFaqItem = {
    question: string;
    answer: string;
};

export type HomeFaqSection = {
    title?: string;
    faq?: {
        title?: string;
        items: HomeFaqItem[];
    };
};

export type HomeFinalCta = {
    title: string;
    text?: string;
};

// ----- /sobre-nosotros -----

export type AboutHero = {
    title?: string;
    subtitle?: string;
    bgImageUrl?: string;
    bgImageAlt?: string;
};

export type AboutStory = {
    title?: string;
    /** Ya viene convertido a array de strings HTML (un párrafo por elemento). */
    paragraphs: string[];
    imageUrl?: string;
    imageAlt?: string;
};

export type AboutValueItem = {
    title: string;
    description: string;
};

export type AboutValues = {
    title?: string;
    items: AboutValueItem[];
    imageUrl?: string;
    imageAlt?: string;
};

export type AboutFaqItem = {
    question: string;
    answer: string;
};

export type AboutFaqSection = {
    title?: string;
    faq?: {
        title?: string;
        items: AboutFaqItem[];
    };
};

export type AboutCta = {
    title: string;
    text?: string;
};

// ----- /nuestros-trabajos -----

export type WorksHero = {
    title?: string;
    subtitle?: string;
    bgImageUrl?: string;
    bgImageAlt?: string;
};

export type WorksIntro = {
    title?: string;
    subtitle?: string;
};

export type WorksCta = {
    title: string;
    text?: string;
};
