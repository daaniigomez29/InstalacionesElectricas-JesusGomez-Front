import {defineType, defineField} from 'sanity'

/**
 * Configuración global del sitio.
 *
 * Singleton (existe un único documento). Contiene los datos de contacto,
 * logos, redes sociales y SEO por defecto que se reutilizan en TODAS las
 * páginas (Header, Footer, sección Contacto, JSON-LD del Schema.org).
 *
 * Editar aquí cambia los datos en todo el sitio: ideal para evitar
 * duplicar el teléfono o el email en varios sitios.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  groups: [
    {name: 'business', title: 'Datos del negocio', default: true},
    {name: 'contact', title: 'Contacto'},
    {name: 'branding', title: 'Logos'},
    {name: 'social', title: 'Redes sociales'},
    {name: 'seo', title: 'SEO por defecto'},
  ],
  fields: [
    // --- DATOS DEL NEGOCIO ---
    defineField({
      name: 'businessName',
      title: 'Nombre del negocio',
      type: 'string',
      group: 'business',
      initialValue: 'Instalaciones Eléctricas Jesús Gómez',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Eslogan corto',
      type: 'string',
      group: 'business',
      description: 'Frase breve que define al negocio (uso opcional en SEO).',
    }),
    defineField({
      name: 'siteUrl',
      title: 'URL pública del sitio',
      type: 'url',
      group: 'business',
      description: 'Dominio sin barra final. Ej: https://www.instalacioneselectricasjesusgomez.es',
    }),

    // --- CONTACTO ---
    defineField({
      name: 'phone',
      title: 'Teléfono (formato internacional)',
      type: 'string',
      group: 'contact',
      description: 'Usado en enlaces tel:. Ej: +34691886370',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phoneDisplay',
      title: 'Teléfono (formato visible)',
      type: 'string',
      group: 'contact',
      description: 'Cómo se muestra en la web. Ej: 691 88 63 70',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp (formato internacional)',
      type: 'string',
      group: 'contact',
      description: 'Número para wa.me/... Ej: 34691886370',
    }),
    defineField({
      name: 'email',
      title: 'Email de contacto',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'address',
      title: 'Dirección',
      type: 'object',
      group: 'contact',
      fields: [
        {name: 'street', title: 'Calle y número', type: 'string'},
        {name: 'postalCode', title: 'Código postal', type: 'string'},
        {name: 'city', title: 'Ciudad', type: 'string'},
        {name: 'region', title: 'Provincia', type: 'string'},
        {name: 'country', title: 'País', type: 'string', initialValue: 'España'},
      ],
    }),
    defineField({
      name: 'businessHours',
      title: 'Horario de atención',
      type: 'array',
      group: 'contact',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'days', title: 'Días', type: 'string', description: 'Ej: Lunes a Viernes'},
            {name: 'hours', title: 'Horario', type: 'string', description: 'Ej: 09:00 - 18:00'},
          ],
          preview: {select: {title: 'days', subtitle: 'hours'}},
        },
      ],
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'URL del mapa embebido',
      type: 'url',
      group: 'contact',
      description: 'Iframe src de Google Maps para mostrar en la página de contacto.',
    }),

    // --- LOGOS ---
    defineField({
      name: 'logo',
      title: 'Logo principal',
      type: 'imageWithAlt',
      group: 'branding',
    }),
    defineField({
      name: 'logoCompact',
      title: 'Logo compacto (isotipo)',
      type: 'imageWithAlt',
      group: 'branding',
      description: 'Versión reducida del logo para espacios pequeños.',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'branding',
      description: 'Icono que se muestra en la pestaña del navegador (PNG cuadrado).',
    }),

    // --- REDES SOCIALES ---
    defineField({
      name: 'socials',
      title: 'Redes sociales',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Plataforma',
              type: 'string',
              options: {
                list: [
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'TikTok', value: 'tiktok'},
                  {title: 'X / Twitter', value: 'x'},
                ],
              },
            },
            {name: 'url', title: 'URL', type: 'url'},
          ],
          preview: {select: {title: 'platform', subtitle: 'url'}},
        },
      ],
    }),

    // --- SEO POR DEFECTO ---
    defineField({
      name: 'defaultSeo',
      title: 'SEO por defecto',
      type: 'seo',
      group: 'seo',
      description:
        'Valores que se usan cuando una página no define los suyos propios.',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Configuración del sitio'}),
  },
})
