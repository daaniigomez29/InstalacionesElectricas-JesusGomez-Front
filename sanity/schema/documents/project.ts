import {defineType, defineField, defineArrayMember} from 'sanity'

/**
 * Proyecto / Trabajo realizado.
 *
 * Cada documento `project` genera:
 *   - Una tarjeta en el carrusel "Trabajos destacados" del Home
 *   - Una tarjeta en /nuestros-trabajos
 *   - Una página completa en /nuestros-trabajos/{slug}
 *
 * Equivale a la interfaz `Project` de src/data/projects.ts.
 */
export const project = defineType({
  name: 'project',
  title: 'Trabajo realizado',
  type: 'document',
  groups: [
    {name: 'main', title: 'Información principal', default: true},
    {name: 'content', title: 'Historia del trabajo'},
    {name: 'gallery', title: 'Galería'},
    {name: 'testimonial', title: 'Testimonio'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título del trabajo',
      type: 'string',
      group: 'main',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'main',
      description: 'URL final: /nuestros-trabajos/{slug}',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Resumen',
      type: 'text',
      rows: 3,
      group: 'main',
      description: 'Aparece en la tarjeta y como meta description por defecto.',
      validation: (Rule) => Rule.required().max(250),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'imageWithAlt',
      group: 'main',
      description: 'Portada de la tarjeta y fondo del hero del proyecto.',
      validation: (Rule) => Rule.required(),
    }),

    // --- Metadatos del trabajo ---
    defineField({
      name: 'location',
      title: 'Ubicación',
      type: 'string',
      group: 'main',
      description: 'Ej: Sevilla Centro, Dos Hermanas...',
    }),
    defineField({
      name: 'type',
      title: 'Tipo de trabajo',
      type: 'string',
      group: 'main',
      description: 'Ej: Cuadro eléctrico, Iluminación LED...',
    }),
    defineField({
      name: 'duration',
      title: 'Duración',
      type: 'string',
      group: 'main',
      description: 'Ej: 1 día, 2 semanas...',
    }),
    defineField({
      name: 'client',
      title: 'Tipo de cliente',
      type: 'string',
      group: 'main',
      description: 'Ej: Negocio local, Comunidad de vecinos, Particular...',
    }),
    defineField({
      name: 'relatedService',
      title: 'Servicio relacionado',
      type: 'reference',
      to: [{type: 'service'}],
      group: 'main',
      description: 'Opcional: enlaza este trabajo con el servicio al que pertenece.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'date',
      group: 'main',
      description: 'Se usa para ordenar los trabajos del más reciente al más antiguo.',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'featured',
      title: 'Destacado en Home',
      type: 'boolean',
      group: 'main',
      description: 'Si está activo, aparece en el carrusel del Home.',
      initialValue: false,
    }),

    // --- HISTORIA DEL TRABAJO ---
    defineField({
      name: 'problem',
      title: 'Problema',
      type: 'text',
      rows: 4,
      group: 'content',
      description: '¿Qué situación tenía el cliente antes?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'solution',
      title: 'Solución',
      type: 'text',
      rows: 4,
      group: 'content',
      description: '¿Qué hicimos para resolverlo?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'result',
      title: 'Resultado',
      type: 'text',
      rows: 4,
      group: 'content',
      description: '¿Cómo quedó al terminar?',
      validation: (Rule) => Rule.required(),
    }),

    // --- GALERÍA ---
    defineField({
      name: 'gallery',
      title: 'Galería de imágenes',
      type: 'array',
      group: 'gallery',
      of: [defineArrayMember({type: 'imageWithAlt'})],
    }),

    // --- TESTIMONIO ---
    defineField({
      name: 'testimonial',
      title: 'Testimonio del cliente',
      type: 'object',
      group: 'testimonial',
      fields: [
        {name: 'quote', title: 'Cita', type: 'text', rows: 3},
        {name: 'author', title: 'Autor', type: 'string'},
      ],
    }),

    // --- SEO ---
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Más recientes primero',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Título A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'coverImage.image',
    },
  },
})
