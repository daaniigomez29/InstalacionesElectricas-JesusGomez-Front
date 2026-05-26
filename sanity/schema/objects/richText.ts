import {defineType, defineArrayMember} from 'sanity'

/**
 * Texto enriquecido (Portable Text).
 *
 * Reemplaza a los strings con HTML que se usan hoy (por ejemplo los
 * párrafos de intro de cada servicio con etiquetas <b>).
 * Permite al cliente editar con un editor visual: negrita, enlaces internos
 * a otros servicios/proyectos, listas, etc., sin tener que tocar HTML.
 */
export const richText = defineType({
  name: 'richText',
  title: 'Texto enriquecido',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Título H3', value: 'h3'},
        {title: 'Título H4', value: 'h4'},
        {title: 'Cita', value: 'blockquote'},
      ],
      lists: [
        {title: 'Lista con viñetas', value: 'bullet'},
        {title: 'Lista numerada', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Negrita', value: 'strong'},
          {title: 'Cursiva', value: 'em'},
          {title: 'Subrayado', value: 'underline'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Enlace externo',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule) =>
                  Rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']}),
              },
              {
                name: 'isExternal',
                type: 'boolean',
                title: 'Abrir en pestaña nueva',
                initialValue: false,
              },
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Enlace interno',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Referencia',
                to: [{type: 'service'}, {type: 'project'}],
              },
            ],
          },
        ],
      },
    }),
  ],
})
