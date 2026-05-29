import {defineType, defineField} from 'sanity'

/**
 * Testimonio manual.
 *
 * Complementa a las opiniones de Google Reviews (que vienen por API).
 * Útil para destacar testimonios curados, vinculados a un servicio
 * o trabajo concreto.
 */
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Cita',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      description: 'Nombre del cliente.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Cargo / Contexto',
      type: 'string',
      description: 'Ej: "Negocio local, Sevilla Centro" o "Comunidad de vecinos".',
    }),
    defineField({
      name: 'avatar',
      title: 'Foto del autor (opcional)',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'rating',
      title: 'Valoración (1-5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5).integer(),
    }),
    defineField({
      name: 'relatedService',
      title: 'Servicio relacionado (opcional)',
      type: 'reference',
      to: [{type: 'service'}],
    }),
    defineField({
      name: 'relatedProject',
      title: 'Trabajo relacionado (opcional)',
      type: 'reference',
      to: [{type: 'project'}],
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      description: 'Marca los testimonios que pueden aparecer en el Home.',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
  ],
  orderings: [
    {
      title: 'Más recientes primero',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'quote',
      media: 'avatar.image',
    },
  },
})
