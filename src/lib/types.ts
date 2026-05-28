// ============================================================
// TIPOS DE DATOS DE SANITY
// ============================================================

// ----- Servicios (esquema antiguo, pendiente de migrar) -----
export type ServicioItem = {
    title: string;
    content: string;
    img: string;
};

export type ServiciosSection = {
    title: string;
    items: ServicioItem[];
};

// ----- Trabajos (esquema antiguo, pendiente de migrar) -----
export type TrabajoItem = {
    text: string;
    img: string;
};

export type TrabajoSection = {
    title: string;
    items: TrabajoItem[];
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
