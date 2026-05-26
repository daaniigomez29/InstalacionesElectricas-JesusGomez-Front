import {defineType, defineField} from 'sanity'

/**
 * Cabecera del sitio.
 *
 * Singleton. Controla los items del menú principal y el CTA de cabecera.
 * El logo y los datos de contacto se leen de `siteSettings`.
 */
export const header = defineType({
  name: 'header',
  title: 'Cabecera',
  type: 'document',
  fields: [
    defineField({
      name: 'navItems',
      title: 'Items del menú',
      type: 'array',
      of: [{type: 'link'}],
      description: 'Enlaces que aparecen en el menú de navegación, en orden.',
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'ctaButton',
      title: 'Botón principal',
      type: 'link',
      description: 'Botón destacado a la derecha del menú (ej: Pedir presupuesto).',
    }),
    defineField({
      name: 'showPhone',
      title: 'Mostrar teléfono en la cabecera',
      type: 'boolean',
      initialValue: true,
      description: 'Si está activo, se muestra el teléfono de siteSettings.',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Cabecera del sitio'}),
  },
})
