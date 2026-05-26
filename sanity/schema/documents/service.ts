import {defineType, defineField, defineArrayMember} from 'sanity'

/**
 * Servicio individual.
 *
 * Cada documento `service` genera automáticamente:
 *   - Una tarjeta en la sección "Servicios" del Home
 *   - Una tarjeta en /servicios
 *   - Una página completa en /servicios/{slug}
 *
 * Equivale a la interfaz `Service` de src/data/servicios.ts.
 */
export const service = defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  groups: [
    {name: 'card', title: 'Tarjeta resumen', default: true},
    {name: 'hero', title: 'Hero'},
    {name: 'intro', title: 'Introducción'},
    {name: 'includes', title: 'Qué incluye'},
    {name: 'problems', title: 'Problemas que resuelve'},
    {name: 'benefits', title: 'Beneficios'},
    {name: 'process', title: 'Proceso'},
    {name: 'faq', title: 'FAQ'},
    {name: 'related', title: 'Relacionados'},
    {name: 'cta', title: 'CTA final'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // ---------- TARJETA RESUMEN (usada en Home y /servicios) ----------
    defineField({
      name: 'name',
      title: 'Nombre corto',
      type: 'string',
      group: 'card',
      description: 'Usado en tarjetas, índices y "servicios relacionados".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'card',
      description: 'Identificador único en la URL: /servicios/{slug}.',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cardImage',
      title: 'Imagen de tarjeta',
      type: 'imageWithAlt',
      group: 'card',
      description: 'Imagen cuadrada o apaisada para el grid de servicios.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cardDescription',
      title: 'Descripción corta',
      type: 'text',
      rows: 3,
      group: 'card',
      description: '1-2 frases. Aparece bajo el título de la tarjeta.',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      group: 'card',
      description: 'Número menor = aparece antes en los listados.',
      initialValue: 100,
    }),
    defineField({
      name: 'featured',
      title: 'Destacado en Home',
      type: 'boolean',
      group: 'card',
      description: 'Si está activo, puede mostrarse en la sección destacada del Home.',
      initialValue: false,
    }),

    // ---------- HERO ----------
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        {
          name: 'h1',
          title: 'Título H1',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {name: 'subtitle', title: 'Subtítulo', type: 'text', rows: 3},
        {
          name: 'bgImage',
          title: 'Imagen de fondo',
          type: 'imageWithAlt',
        },
      ],
    }),

    // ---------- INTRO ----------
    defineField({
      name: 'intro',
      title: 'Introducción',
      type: 'object',
      group: 'intro',
      fields: [
        {name: 'title', title: 'Título', type: 'string'},
        {
          name: 'paragraphs',
          title: 'Párrafos',
          type: 'richText',
          description: 'Texto enriquecido con negrita, enlaces, etc.',
        },
        {name: 'image', title: 'Imagen lateral', type: 'imageWithAlt'},
      ],
    }),

    // ---------- INCLUYE ----------
    defineField({
      name: 'includes',
      title: 'Qué incluye / Qué hacemos',
      type: 'object',
      group: 'includes',
      fields: [
        {name: 'title', title: 'Título de la sección', type: 'string'},
        {name: 'intro', title: 'Texto introductorio (opcional)', type: 'text', rows: 2},
        {
          name: 'items',
          title: 'Lista de elementos',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Título',
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

    // ---------- PROBLEMAS ----------
    defineField({
      name: 'problems',
      title: 'Problemas / Cuándo nos llaman',
      type: 'object',
      group: 'problems',
      fields: [
        {name: 'title', title: 'Título', type: 'string'},
        {name: 'intro', title: 'Texto introductorio (opcional)', type: 'text', rows: 2},
        {
          name: 'items',
          title: 'Lista de problemas',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                {name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required()},
                {name: 'description', title: 'Descripción', type: 'text', rows: 3, validation: (Rule) => Rule.required()},
              ],
              preview: {select: {title: 'title', subtitle: 'description'}},
            }),
          ],
        },
      ],
    }),

    // ---------- BENEFICIOS ----------
    defineField({
      name: 'benefits',
      title: 'Beneficios',
      type: 'object',
      group: 'benefits',
      fields: [
        {name: 'title', title: 'Título', type: 'string'},
        {
          name: 'items',
          title: 'Lista de beneficios',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  title: 'Icono (emoji)',
                  type: 'string',
                  description: 'Pega un emoji. Ej: ⚡ 🔍 🛡️',
                  validation: (Rule) => Rule.required(),
                },
                {name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required()},
                {name: 'description', title: 'Descripción', type: 'text', rows: 3, validation: (Rule) => Rule.required()},
              ],
              preview: {
                select: {title: 'title', subtitle: 'description', icon: 'icon'},
                prepare: ({title, subtitle, icon}) => ({
                  title: `${icon ?? ''} ${title ?? ''}`.trim(),
                  subtitle,
                }),
              },
            }),
          ],
        },
      ],
    }),

    // ---------- PROCESO ----------
    defineField({
      name: 'process',
      title: 'Proceso de trabajo',
      type: 'object',
      group: 'process',
      fields: [
        {name: 'title', title: 'Título', type: 'string'},
        {
          name: 'steps',
          title: 'Pasos (en orden)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                {name: 'title', title: 'Título del paso', type: 'string', validation: (Rule) => Rule.required()},
                {name: 'description', title: 'Descripción', type: 'text', rows: 3, validation: (Rule) => Rule.required()},
              ],
              preview: {select: {title: 'title', subtitle: 'description'}},
            }),
          ],
        },
      ],
    }),

    // ---------- FAQ ----------
    defineField({
      name: 'faq',
      title: 'Preguntas frecuentes',
      type: 'object',
      group: 'faq',
      fields: [
        {name: 'title', title: 'Título de la sección', type: 'string', initialValue: 'Preguntas frecuentes'},
        {
          name: 'items',
          title: 'Preguntas',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                {name: 'question', title: 'Pregunta', type: 'string', validation: (Rule) => Rule.required()},
                {name: 'answer', title: 'Respuesta', type: 'text', rows: 4, validation: (Rule) => Rule.required()},
              ],
              preview: {select: {title: 'question', subtitle: 'answer'}},
            }),
          ],
        },
      ],
    }),

    // ---------- RELACIONADOS ----------
    defineField({
      name: 'related',
      title: 'Servicios relacionados',
      type: 'array',
      group: 'related',
      description: 'Aparecen al final como tarjetas sugeridas.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {
              name: 'service',
              title: 'Servicio',
              type: 'reference',
              to: [{type: 'service'}],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Descripción contextual',
              type: 'text',
              rows: 2,
              description: 'Por qué este servicio se relaciona con el actual.',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {title: 'service.name', subtitle: 'description'},
          },
        }),
      ],
      validation: (Rule) => Rule.max(6).warning('Más de 6 relacionados puede saturar la sección.'),
    }),

    // ---------- CTA FINAL ----------
    defineField({
      name: 'cta',
      title: 'CTA final',
      type: 'cta',
      group: 'cta',
    }),

    // ---------- SEO ----------
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Orden manual',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Nombre A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      media: 'cardImage.image',
    },
  },
})
