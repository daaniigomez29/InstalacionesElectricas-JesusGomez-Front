import {defineType, defineField, defineArrayMember} from 'sanity'

/**
 * Página de inicio (/).
 *
 * Singleton. El orden de secciones es fijo (en código), pero todo el
 * contenido editable de cada sección vive aquí.
 *
 * Importante: los servicios, trabajos y logos NO se duplican aquí, se
 * traen por referencia desde sus colecciones para garantizar consistencia
 * con el resto del sitio.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Página: Inicio',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'about', title: 'Quiénes somos'},
    {name: 'partners', title: 'Empresas que confían'},
    {name: 'solution', title: 'Soluciones'},
    {name: 'services', title: 'Servicios'},
    {name: 'works', title: 'Trabajos destacados'},
    {name: 'reviews', title: 'Opiniones'},
    {name: 'faq', title: 'FAQ'},
    {name: 'cta', title: 'CTA final'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // --- HERO ---
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        {name: 'pretitle', title: 'Pretítulo (etiqueta naranja)', type: 'string'},
        {name: 'titleLine1', title: 'Título línea 1', type: 'string'},
        {name: 'titleLine2', title: 'Título línea 2 (con resaltado)', type: 'string'},
        {name: 'description', title: 'Descripción', type: 'text', rows: 3},
        {name: 'image', title: 'Imagen principal', type: 'imageWithAlt'},
        {name: 'ctaPrimary', title: 'Botón principal', type: 'link'},
        {name: 'ctaSecondary', title: 'Enlace secundario (teléfono)', type: 'link'},
      ],
    }),

    // --- QUIÉNES SOMOS ---
    defineField({
      name: 'aboutSection',
      title: 'Quiénes somos',
      type: 'object',
      group: 'about',
      fields: [
        {name: 'title', title: 'Título', type: 'string'},
        {name: 'leadText', title: 'Frase destacada', type: 'string'},
        {name: 'paragraphs', title: 'Párrafos', type: 'richText'},
        {name: 'image', title: 'Imagen lateral', type: 'imageWithAlt'},
        /*
        {
          name: 'bullets',
          title: 'Puntos con icono',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  title: 'Icono',
                  type: 'string',
                  options: {
                    list: [
                      {title: '📍 Ubicación', value: 'location'},
                      {title: '✅ Calidad', value: 'quality'},
                      {title: '🛠️ Herramientas', value: 'tools'},
                      {title: '🔧 Herramientas 2', value: 'tools2'},
                      {title: '❤️ Corazón', value: 'heart'},
                      {title: '⚡ Rayo', value: 'bolt'},
                      {title: '📜 Certificado', value: 'certificate'},
                      {title: '🎧 Atención cliente', value: 'support'},
                    ],
                  },
                  description: 'El icono real se renderiza desde el código.',
                },
                {name: 'text', title: 'Texto', type: 'string', validation: (Rule) => Rule.required()},
              ],
              preview: {select: {title: 'text', subtitle: 'icon'}},
            }),
          ],
        }*/
        {name: 'button', title: 'Botón', type: 'link'},
      ],
    }),

    // --- EMPRESAS QUE CONFÍAN ---
    defineField({
      name: 'partnerLogos',
      title: 'Empresas que confían (logos)',
      type: 'array',
      group: 'partners',
      description:
        'Logos del slider. Cada logo es una imagen con su texto alternativo. Arrastra para reordenar.',
      of: [defineArrayMember({type: 'imageWithAlt'})],
    }),

    // --- SOLUCIONES ---
    defineField({
      name: 'solutionSection',
      title: 'Soluciones a medida',
      type: 'object',
      group: 'solution',
      fields: [
        {name: 'title', title: 'Título', type: 'string'},
        {name: 'paragraphs', title: 'Párrafos', type: 'richText'},
        {name: 'image', title: 'Imagen', type: 'imageWithAlt'},
        /*{name: 'benefitsTitle', title: 'Subtítulo (beneficios)', type: 'string'},
        {
          name: 'benefits',
          title: 'Beneficios (3 columnas)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  title: 'Icono',
                  type: 'string',
                  options: {
                    list: [
                      {title: '📜 Certificado', value: 'certificate'},
                      {title: '🤝 Apretón de manos', value: 'handshake'},
                      {title: '🛡️ Garantía', value: 'warranty'},
                    ],
                  },
                },
                {name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required()},
                {name: 'description', title: 'Descripción', type: 'text', rows: 3, validation: (Rule) => Rule.required()},
              ],
              preview: {select: {title: 'title', subtitle: 'description'}},
            }),
          ],
          validation: (Rule) => Rule.max(3),
        },*/
      ],
    }),

    // --- SERVICIOS ---
    defineField({
      name: 'servicesSection',
      title: 'Servicios destacados',
      type: 'object',
      group: 'services',
      fields: [
        {name: 'title', title: 'Título', type: 'string'},
        {name: 'subtitle', title: 'Subtítulo', type: 'string'},
        {
          name: 'mode',
          title: 'Qué servicios mostrar',
          type: 'string',
          options: {
            list: [
              {title: 'Todos los servicios', value: 'all'},
              {title: 'Selección manual', value: 'manual'},
            ],
            layout: 'radio',
          },
          initialValue: 'all',
        },
        {
          name: 'services',
          title: 'Servicios seleccionados (solo si modo = manual)',
          type: 'array',
          of: [defineArrayMember({type: 'reference', to: [{type: 'service'}]})],
          hidden: ({parent}) => parent?.mode !== 'manual',
        },
      ],
    }),

    // --- TRABAJOS DESTACADOS ---
    defineField({
      name: 'featuredWorksSection',
      title: 'Trabajos destacados',
      type: 'object',
      group: 'works',
      fields: [
        {name: 'title', title: 'Título', type: 'string'},
        {name: 'subtitle', title: 'Subtítulo', type: 'text', rows: 3},
        {
          name: 'mode',
          title: 'Qué trabajos mostrar',
          type: 'string',
          options: {
            list: [
              {title: 'Solo los marcados como "destacado"', value: 'featured'},
              {title: 'Los N más recientes', value: 'latest'},
              {title: 'Selección manual', value: 'manual'},
            ],
            layout: 'radio',
          },
          initialValue: 'featured',
        },
        {
          name: 'limit',
          title: 'Cuántos mostrar (solo si modo = más recientes)',
          type: 'number',
          initialValue: 6,
          hidden: ({parent}) => parent?.mode !== 'latest',
        },
        {
          name: 'projects',
          title: 'Trabajos seleccionados (solo si modo = manual)',
          type: 'array',
          of: [defineArrayMember({type: 'reference', to: [{type: 'project'}]})],
          hidden: ({parent}) => parent?.mode !== 'manual',
        },
      ],
    }),

    // --- OPINIONES ---
    /*
    defineField({
      name: 'reviewsSection',
      title: 'Opiniones de clientes',
      type: 'object',
      group: 'reviews',
      fields: [
        {name: 'title', title: 'Título', type: 'string'},
        {
          name: 'showGoogleReviews',
          title: 'Mostrar opiniones de Google',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'manualTestimonials',
          title: 'Testimonios manuales adicionales',
          type: 'array',
          of: [defineArrayMember({type: 'reference', to: [{type: 'testimonial'}]})],
        },
      ],
    }),
    */
    // --- FAQ ---
    defineField({
      name: 'faqSection',
      title: 'Preguntas frecuentes',
      type: 'faq',
      group: 'faq',
    }),

    // --- CTA FINAL ---
    defineField({
      name: 'finalCta',
      title: 'CTA final',
      type: 'cta',
      group: 'cta',
    }),

    // --- SEO ---
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Página: Inicio'}),
  },
})
