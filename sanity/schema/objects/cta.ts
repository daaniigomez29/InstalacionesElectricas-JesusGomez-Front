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
      name: 'buttonContact',
      title: 'Botón contacto',
      type: 'link',
    }),
    defineField({
      name: 'buttonWhatsapp',
      title: 'Botón Whatsapp',
      type: 'link',
    }),
    defineField({
      name: 'buttonTlf',
      title: 'Botón teléfono',
      type: 'link',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'button.label'},
  },
})
