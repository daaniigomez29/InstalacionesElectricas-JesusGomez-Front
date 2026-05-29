import {defineType, defineField, defineArrayMember} from 'sanity'

/**
 * FAQ reutilizable.
 *
 * Se incrusta en cualquier documento que necesite control de faqs:
 */
export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la sección',
      type: 'string',
      initialValue: 'Preguntas frecuentes',
    }),
    defineField({
      name: 'items',
      title: 'Preguntas',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {name: 'question', title: 'Pregunta', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'answer', title: 'Respuesta', type: 'text', rows: 4, validation: (Rule) => Rule.required()},
          ],
          preview: {select: {title: 'question', subtitle: 'answer'}},
        }),
      ],
    }),
  ],
})
