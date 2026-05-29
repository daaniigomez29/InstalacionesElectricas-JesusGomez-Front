import {defineType, defineField} from 'sanity'

/**
 * Página /contacto.
 *
 * Singleton. Los datos de contacto (teléfono, email, dirección, etc.)
 * NO se duplican aquí — se leen de `siteSettings` para mantener una
 * sola fuente de la verdad.
 */
export const contactPage = defineType({
  name: 'contactPage',
  title: 'Página: Contacto',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'form', title: 'Formulario'},
    {name: 'sidebar', title: 'Información lateral'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        {name: 'title', title: 'Título', type: 'string'},
        {name: 'subtitle', title: 'Subtítulo', type: 'text', rows: 3},
        {name: 'bgImage', title: 'Imagen de fondo', type: 'imageWithAlt'},
      ],
    }),

    defineField({
      name: 'intro',
      title: 'Textos sobre el formulario',
      type: 'object',
      group: 'form',
      fields: [
        {name: 'title', title: 'Título', type: 'string', initialValue: 'Contáctanos'},
        {name: 'description', title: 'Descripción', type: 'text', rows: 3},
        {name: 'highlight', title: 'Frase destacada', type: 'string'},
      ],
    }),

    defineField({
      name: 'formspreeUrl',
      title: 'Endpoint de Formspree',
      type: 'url',
      group: 'form',
      description:
        'URL del formulario en Formspree. Solo cambiar si se cambia de servicio o de cuenta.',
    }),

    defineField({
      name: 'submitButtonLabel',
      title: 'Texto del botón enviar',
      type: 'string',
      group: 'form',
      initialValue: 'ENVIAR',
    }),

    defineField({
      name: 'privacyText',
      title: 'Texto del checkbox de privacidad',
      type: 'string',
      group: 'form',
      initialValue: 'He leído y acepto la política de privacidad.',
    }),

    defineField({
      name: 'sidebarExtraText',
      title: 'Texto adicional en la columna lateral',
      type: 'text',
      rows: 3,
      group: 'sidebar',
      description: 'Aparece bajo los datos de contacto. Ej: tiempo de respuesta.',
    }),

    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  preview: {
    prepare: () => ({title: 'Página: Contacto'}),
  },
})
