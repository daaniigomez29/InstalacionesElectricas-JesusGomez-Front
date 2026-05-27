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
