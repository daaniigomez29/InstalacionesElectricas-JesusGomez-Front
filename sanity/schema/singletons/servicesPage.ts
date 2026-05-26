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
    {name: 'intro', title: 'Intro'},
    {name: 'forWho', title: 'Para quién'},
    {name: 'whyUs', title: 'Por qué nosotros'},
    {name: 'featured', title: 'Casos destacados'},
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
      name: 'intro',
      title: 'Introducción',
      type: 'object',
      group: 'intro',
      fields: [
        {name: 'title', title: 'Título', type: 'string'},
        {name: 'content', title: 'Contenido', type: 'richText'},
      ],
    }),

    defineField({
      name: 'forWhoSection',
      title: 'Para quién trabajamos',
      type: 'object',
      group: 'forWho',
      fields: [
        {name: 'title', title: 'Título', type: 'string'},
        {
          name: 'audiences',
          title: 'Públicos objetivo',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                {name: 'icon', title: 'Icono (emoji)', type: 'string'},
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
                {name: 'icon', title: 'Icono (emoji)', type: 'string'},
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

    defineField({name: 'cta', title: 'CTA final', type: 'cta', group: 'cta'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  preview: {
    prepare: () => ({title: 'Página: Servicios'}),
  },
})
