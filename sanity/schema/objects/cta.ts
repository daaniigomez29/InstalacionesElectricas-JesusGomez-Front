import {defineType, defineField} from 'sanity'

/**
 * Call To Action: bloque "título + texto + botón".
 *
 * Se usa al final de páginas y secciones para invitar a la acción
 * (pedir presupuesto, llamar, etc.).
 */
export const cta = defineType({
  name: 'cta',
  title: 'Llamada a la acción',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Texto descriptivo',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'button',
      title: 'Botón',
      type: 'link',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'button.label'},
  },
})
