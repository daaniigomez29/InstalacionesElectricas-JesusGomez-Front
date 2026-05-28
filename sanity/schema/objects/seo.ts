import {defineType, defineField} from 'sanity'

/**
 * SEO metadata reutilizable.
 *
 * Se incrusta en cualquier documento que necesite control de metadatos:
 * páginas singleton, servicios, proyectos, etc.
 * Si algún campo se deja vacío, el frontend debe usar el `defaultSeo`
 * definido en `siteSettings`.
 */
export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título SEO (<title>)',
      type: 'string',
      description:
        'Título que aparece en la pestaña del navegador y en Google. Recomendado: 50-60 caracteres.',
      validation: (Rule) =>
        Rule.max(120).warning('Más de 120 caracteres puede cortarse en Google.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta descripción',
      type: 'text',
      rows: 3,
      description:
        'Texto que aparece debajo del título en Google. Recomendado: 140-160 caracteres.',
      validation: (Rule) =>
        Rule.max(180).warning('Más de 180 caracteres puede cortarse en Google.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagen para compartir en redes (Open Graph)',
      type: 'image',
      options: {hotspot: true},
      description:
        'Imagen que aparece cuando se comparte la página en WhatsApp, Facebook, Twitter, etc. Recomendado 1200x630.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Ocultar a Google (noindex)',
      type: 'boolean',
      description:
        'Activar solo si esta página NO debe aparecer en buscadores.',
      initialValue: false,
    }),
  ],
})
