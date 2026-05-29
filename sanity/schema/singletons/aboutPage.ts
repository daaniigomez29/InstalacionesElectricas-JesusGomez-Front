import {defineType, defineField, defineArrayMember} from 'sanity'

/**
 * Página /sobre-nosotros.
 *
 * Singleton.
 */
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Página: Sobre nosotros',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'story', title: 'Nuestra historia'},
    {name: 'values', title: 'Valores'},
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
      name: 'story',
      title: 'Nuestra historia',
      type: 'object',
      group: 'story',
      fields: [
        {name: 'title', title: 'Título', type: 'string'},
        {name: 'content', title: 'Contenido', type: 'richText'},
        {name: 'image', title: 'Imagen lateral', type: 'imageWithAlt'},
      ],
    }),

    defineField({
      name: 'values',
      title: 'Valores',
      type: 'object',
      group: 'values',
      fields: [
        {name: 'title', title: 'Título de la sección', type: 'string'},
        {
          name: 'items',
          title: 'Valores',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                /*
                {
                  name: 'icon',
                  title: 'Icono (emoji)',
                  type: 'string',
                  description: 'Pega un emoji. Ej: 🛡️ ⚡ 🤝',
                },
                */
                {name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required()},
                {name: 'description', title: 'Descripción', type: 'text', rows: 3, validation: (Rule) => Rule.required()},
              ],
              preview: {select: {title: 'title', subtitle: 'description'}},
            }),
          ],
        },
        {name: 'image', title: 'Imagen lateral', type: 'imageWithAlt'},
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
    prepare: () => ({title: 'Página: Sobre nosotros'}),
  },
})
