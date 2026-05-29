import {defineType, defineField} from 'sanity'

/**
 * Imagen con texto alternativo obligatorio.
 *
 * Se usa SIEMPRE en lugar del tipo `image` directamente, para forzar
 * al editor a rellenar el `alt` (accesibilidad y SEO).
 */
export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Imagen',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Archivo de imagen',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Texto alternativo (alt)',
      type: 'string',
      description:
        'Describe la imagen para personas con lectores de pantalla y para Google. Ej: "Electricista reparando un cuadro en Sevilla".',
      validation: (Rule) =>
        Rule.required().min(3).error('El texto alternativo es obligatorio.'),
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'image',
    },
  },
})
