import {defineType, defineField, defineArrayMember} from 'sanity'

/**
 * Página /servicios.
 *
 * Singleton. Las tarjetas de servicios se generan automáticamente
 * a partir de la colección `service` — aquí solo se configura el
 * marco de la página (hero, intro, secciones complementarias).
 */
export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Página: Servicios',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'catalog', title: 'Catálogo por categoría'},
    {name: 'forWho', title: 'Para quién'},
    {name: 'finder', title: '¿Qué servicio necesito?'},
    {name: 'process', title: 'Cómo trabajamos'},
    {name: 'whyUs', title: 'Por qué nosotros'},
    {name: 'featured', title: 'Casos destacados'},
    {name: 'faq', title: 'FAQ'},
    {name: 'cta', title: 'CTA'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        {name: 'title', title: 'Título', type: 'string'},
        {name: 'subtitle', title: 'Subtítulo', type: 'text', rows: 3},
        {name: 'bgImage', title: 'Imagen de fondo', type: 'imageWithAlt'},
      ],
    }),

    defineField({
      name: 'forWhoSection',
      title: 'Para quién trabajamos',
      type: 'object',
      group: 'forWho',
      fields: [
        {name: 'title', title: 'Título', type: 'string'},
        {name: 'subtitle', title: 'Texto introductorio', type: 'string'},
        {
          name: 'audiences',
          title: 'Públicos objetivo',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                //{name: 'icon', title: 'Icono (emoji)', type: 'string'},
                {name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required()},
                {name: 'description', title: 'Descripción', type: 'text', rows: 3},
                {name: 'href', title: 'Link', type: 'string'},
              ],
              preview: {select: {title: 'title', subtitle: 'description'}},
            }),
          ],
        },
      ],
    }),

    // ---------- CATÁLOGO POR CATEGORÍA ----------
    defineField({
      name: 'catalogByCategory',
      title: 'Catálogo por categoría',
      type: 'object',
      group: 'catalog',
      description:
        'Bloque que agrupa los servicios por tipo de intervención (urgencias, instalación, mantenimiento...).',
      fields: [
        {
          name: 'title',
          title: 'Título de la sección',
          type: 'string',
          initialValue: 'Nuestro catálogo de servicios',
        },
        {
          name: 'intro',
          title: 'Texto introductorio',
          type: 'text',
          rows: 2,
        },
        {
          name: 'categories',
          title: 'Categorías',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                {
                  name: 'emoji',
                  title: 'Emoji',
                  type: 'string',
                  description: 'Pega un emoji. Ej: 🛠️ 🏗️ 🔄',
                },
                {
                  name: 'title',
                  title: 'Título de la categoría',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'intro',
                  title: 'Texto introductorio de la categoría',
                  type: 'text',
                  rows: 2,
                },
                {
                  name: 'services',
                  title: 'Servicios de esta categoría',
                  type: 'array',
                  description:
                    'Selecciona los servicios que pertenecen a esta categoría. Se cogen sus datos (imagen, nombre, descripción, slug) automáticamente.',
                  of: [
                    defineArrayMember({
                      type: 'reference',
                      to: [{type: 'service'}],
                    }),
                  ],
                },
              ],
              preview: {
                select: {title: 'title', subtitle: 'intro', emoji: 'emoji'},
                prepare: ({title, subtitle, emoji}) => ({
                  title: `${emoji ?? ''} ${title ?? ''}`.trim(),
                  subtitle,
                }),
              },
            }),
          ],
        },
      ],
    }),

    // ---------- ¿QUÉ SERVICIO NECESITO? (Service Finder) ----------
    defineField({
      name: 'serviceFinder',
      title: '¿Qué servicio necesito?',
      type: 'object',
      group: 'finder',
      description:
        'Tabla que asocia situaciones del cliente con el servicio recomendado.',
      fields: [
        {
          name: 'title',
          title: 'Título de la sección',
          type: 'string',
          initialValue: '¿Qué servicio necesito?',
        },
        {
          name: 'intro',
          title: 'Texto introductorio',
          type: 'text',
          rows: 2,
        },
        {
          name: 'rows',
          title: 'Filas (situación → servicio)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                {
                  name: 'situation',
                  title: 'Situación del cliente',
                  type: 'string',
                  description:
                    'Ej: "Se ha ido la luz en una habitación".',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'service',
                  title: 'Servicio recomendado',
                  type: 'reference',
                  to: [{type: 'service'}],
                  description:
                    'El nombre del servicio y el enlace se cogen automáticamente del documento referenciado.',
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {
                select: {title: 'situation', subtitle: 'service.name'},
                prepare: ({title, subtitle}) => ({
                  title,
                  subtitle: subtitle ? `→ ${subtitle}` : '— sin servicio asignado —',
                }),
              },
            }),
          ],
        },
      ],
    }),

    // ---------- CÓMO TRABAJAMOS (Service Process) ----------
    defineField({
      name: 'processSection',
      title: 'Cómo trabajamos',
      type: 'object',
      group: 'process',
      description:
        'Pasos del proceso de trabajo que se muestran en /servicios y que también se usan para el schema HowTo de SEO.',
      fields: [
        {
          name: 'title',
          title: 'Título de la sección',
          type: 'string',
          initialValue: 'Cómo trabajamos',
        },
        {
          name: 'steps',
          title: 'Pasos (en orden)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Título del paso',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Descripción',
                  type: 'text',
                  rows: 3,
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {select: {title: 'title', subtitle: 'description'}},
            }),
          ],
        },
      ],
    }),

    defineField({
      name: 'whyUsSection',
      title: 'Por qué elegirnos',
      type: 'object',
      group: 'whyUs',
      fields: [
        {name: 'title', title: 'Título', type: 'string'},
        {
          name: 'reasons',
          title: 'Razones',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                //{name: 'icon', title: 'Icono (emoji)', type: 'string'},
                {name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required()},
                {name: 'description', title: 'Descripción', type: 'text', rows: 3},
              ],
              preview: {select: {title: 'title', subtitle: 'description'}},
            }),
          ],
        },
      ],
    }),

    defineField({
      name: 'featuredCases',
      title: 'Casos destacados',
      type: 'object',
      group: 'featured',
      fields: [
        {name: 'title', title: 'Título', type: 'string'},
        {
          name: 'projects',
          title: 'Trabajos a destacar',
          type: 'array',
          of: [defineArrayMember({type: 'reference', to: [{type: 'project'}]})],
        },
      ],
    }),

     // --- FAQ ---
    defineField({
      name: 'faqSection',
      title: 'Preguntas frecuentes',
      type: 'faq',
      group: 'faq',
    }),


    defineField({name: 'cta', title: 'CTA final', type: 'cta', group: 'cta'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  preview: {
    prepare: () => ({title: 'Página: Servicios'}),
  },
})
