import {defineType, defineField} from 'sanity'

/**
 * Enlace genérico (label + href).
 *
 * Marca `isExternal` cuando apunta fuera del dominio para que el frontend
 * pueda añadir `target="_blank"` y `rel="noopener"`.
 */
export const link = defineType({
  name: 'link',
  title: 'Enlace',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Texto del enlace',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL o ruta',
      type: 'string',
      description:
        'Ruta interna (ej: /servicios) o URL completa externa (ej: https://...).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isExternal',
      title: '¿Abre en pestaña nueva?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'href'},
  },
})
