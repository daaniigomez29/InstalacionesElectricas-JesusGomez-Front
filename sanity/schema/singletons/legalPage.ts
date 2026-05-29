import {defineType, defineField} from 'sanity'

/**
 * Genera tres singletons para las páginas legales:
 *  - privacyPage         → /politica-privacidad
 *  - legalNoticePage     → /aviso-legal
 *  - accessibilityPage   → /accesibilidad
 *
 * Todas comparten la misma estructura simple: título, fecha de
 * actualización y contenido en Portable Text.
 */

const buildLegalPage = (name: string, title: string, route: string) =>
  defineType({
    name,
    title: `Página: ${title}`,
    type: 'document',
    fields: [
      defineField({
        name: 'pageTitle',
        title: 'Título visible',
        type: 'string',
        initialValue: title,
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'lastUpdated',
        title: 'Última actualización',
        type: 'date',
        description: 'Se muestra al inicio de la página para informar al usuario.',
      }),
      defineField({
        name: 'content',
        title: 'Contenido',
        type: 'richText',
        description: 'Texto completo del documento legal.',
      }),
      defineField({
        name: 'seo',
        title: 'SEO',
        type: 'seo',
      }),
    ],
    preview: {
      prepare: () => ({title: `Página: ${title}`, subtitle: route}),
    },
  })

export const privacyPage = buildLegalPage(
  'privacyPage',
  'Política de privacidad',
  '/politica-privacidad',
)

export const legalNoticePage = buildLegalPage(
  'legalNoticePage',
  'Aviso legal',
  '/aviso-legal',
)

export const accessibilityPage = buildLegalPage(
  'accessibilityPage',
  'Accesibilidad',
  '/accesibilidad',
)
