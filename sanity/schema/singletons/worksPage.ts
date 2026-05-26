import {defineType, defineField} from 'sanity'

/**
 * Página /nuestros-trabajos.
 *
 * Singleton. Los trabajos se generan automáticamente desde la
 * colección `project`.
 */
export const worksPage = defineType({
  name: 'worksPage',
  title: 'Página: Nuestros trabajos',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'intro', title: 'Intro'},
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
      title: 'Sección de introducción del grid',
      type: 'object',
      group: 'intro',
      fields: [
        {name: 'title', title: 'Título', type: 'string'},
        {name: 'subtitle', title: 'Subtítulo', type: 'text', rows: 3},
      ],
    }),

    defineField({name: 'cta', title: 'CTA final', type: 'cta', group: 'cta'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  preview: {
    prepare: () => ({title: 'Página: Nuestros trabajos'}),
  },
})
