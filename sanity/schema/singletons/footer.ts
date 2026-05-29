import {defineType, defineField} from 'sanity'

/**
 * Pie de página.
 *
 * Singleton. Controla columnas de enlaces, enlaces legales y copyright.
 * Los datos de contacto y logo se leen de `siteSettings`.
 */
export const footer = defineType({
  name: 'footer',
  title: 'Pie de página',
  type: 'document',
  fields: [
    defineField({
      name: 'aboutText',
      title: 'Texto descriptivo',
      type: 'text',
      rows: 3,
      description: 'Breve descripción del negocio que aparece en el footer.',
    }),
    defineField({
      name: 'columns',
      title: 'Columnas de enlaces',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Título de la columna',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'links',
              title: 'Enlaces',
              type: 'array',
              of: [{type: 'link'}],
            },
          ],
          preview: {select: {title: 'title'}},
        },
      ],
      validation: (Rule) => Rule.max(4).warning('Más de 4 columnas puede romper el diseño.'),
    }),
    defineField({
      name: 'legalLinks',
      title: 'Enlaces legales (parte inferior)',
      type: 'array',
      of: [{type: 'link'}],
      description: 'Aviso legal, política de privacidad, accesibilidad, etc.',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Texto de copyright',
      type: 'string',
      description: 'Puedes usar {year} para que se sustituya por el año actual.',
      initialValue: '© {year} Instalaciones Eléctricas Jesús Gómez. Todos los derechos reservados.',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Pie de página'}),
  },
})
