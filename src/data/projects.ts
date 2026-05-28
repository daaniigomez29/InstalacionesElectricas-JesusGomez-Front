/**
 * Datos centralizados de los trabajos / proyectos realizados.
 *
 * Para añadir un nuevo trabajo solo hay que agregar un objeto `Project` al
 * array `projects`. Tanto el grid de "/nuestros-trabajos" como las páginas
 * dinámicas "/trabajos/[slug]" se generan automáticamente a partir de aquí.
 */

export interface ProjectImage {
    /** Ruta pública de la imagen (dentro de la carpeta /public). */
    src: string;
    /** Texto alternativo descriptivo, importante para accesibilidad y SEO. */
    alt: string;
}

export interface Testimonial {
    quote: string;
    author?: string;
}

export interface Project {
    /** Identificador en la URL: /trabajos/{slug}. Debe ser único. */
    slug: string;
    title: string;
    /** Resumen corto: se usa en la tarjeta del grid y como meta description por defecto. */
    summary: string;
    location: string;
    type: string;
    duration: string;
    client: string;
    /** Imagen principal: portada de la tarjeta y fondo del hero del proyecto. */
    coverImage: ProjectImage;
    problem: string;
    solution: string;
    result: string;
    gallery: ProjectImage[];
    testimonial?: Testimonial;
    /** Marca destacado para que aparezca en #inicio */
    featured?: boolean
    /** SEO opcional por proyecto. Si se omite se generan valores por defecto. */
    seo?: {
        title?: string;
        description?: string;
    };
}

export const projects: Project[] = [
    {
        slug: "cuadro-electrico-cafeteria-sevilla",
        title: "Renovación de cuadro eléctrico en cafetería de Sevilla",
        featured: true,
        summary:
            "Sustitución completa del cuadro eléctrico de una cafetería en Sevilla Centro para eliminar los cortes de suministro y adaptar la instalación a la normativa vigente.",
        location: "Sevilla Centro",
        type: "Cuadro eléctrico",
        duration: "1 día",
        client: "Negocio local",
        coverImage: {
            src: "/assets/ourJobs/prueba.jpeg",
            alt: "Cuadro eléctrico nuevo instalado en una cafetería de Sevilla",
        },
        problem:
            "El local tenía una instalación antigua que provocaba cortes frecuentes y no cumplía la normativa actual.",
        solution:
            "Se sustituyó el cuadro eléctrico completo, se reorganizaron líneas y se instalaron nuevas protecciones.",
        result:
            "La instalación quedó adaptada a normativa y preparada para soportar maquinaria y climatización sin sobrecargas.",
        gallery: [
            {
                src: "/assets/ourJobs/president-2.webp",
                alt: "Estado inicial del cuadro eléctrico antiguo de la cafetería",
            },
            {
                src: "/assets/ourJobs/president-3.webp",
                alt: "Montaje de los nuevos magnetotérmicos y diferenciales",
            },
            {
                src: "/assets/ourJobs/prueba.jpeg",
                alt: "Cuadro eléctrico terminado con los circuitos etiquetados",
            },
        ],
        testimonial: {
            quote:
                "Necesitábamos solucionar cortes constantes en el local y el trabajo fue rápido y profesional.",
            author: "Negocio local, Sevilla Centro",
        },
        seo: {
            description:
                "Caso real: sustitución de cuadro eléctrico en una cafetería de Sevilla Centro. Adaptación a normativa y fin de los cortes de suministro.",
        },
    },
];
