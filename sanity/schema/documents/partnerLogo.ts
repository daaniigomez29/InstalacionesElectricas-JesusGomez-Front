import {defineType, defineField} from 'sanity'

/**
 * Logo de empresa colaboradora / cliente.
 *
 * Cada documento es un logo del slider "Empresas que confían".
 * Como colección independiente, el cliente puede:
 *   - Añadir/quitar logos fácilmente
 *   - Reordenarlos con el campo `order`
 *   - Reutilizarlos en otras páginas en el futuro
 */
export const partnerLogo = defineType({
  name: 'partnerLogo',
  title: 'Logo de empresa colaboradora',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la empresa',
      type: 'string',
      description: 'Uso interno para identificar el logo.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'imageWithAlt',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Web de la empresa (opcional)',
      type: 'url',
      description: 'Si se rellena, el logo será un enlace a esta web.',
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Número menor = aparece antes en el slider.',
      initialValue: 100,
    }),
    defineField({
      name: 'active',
      title: 'Visible',
      type: 'boolean',
      description: 'Desactivar para ocultar temporalmente sin borrar.',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Orden manual',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo.image',
      active: 'active',
    },
    prepare: ({title, media, active}) => ({
      title: active ? title : `${title} (oculto)`,
      media,
    }),
  },
})
