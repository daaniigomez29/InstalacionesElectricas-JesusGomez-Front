import type {StructureResolver} from 'sanity/structure'

/**
 * Estructura personalizada del Studio.
 *
 * Organiza el menú lateral en grupos claros para que el cliente encuentre
 * fácilmente lo que quiere editar:
 *
 *   ⚙️ Configuración global  → siteSettings, header, footer
 *   📄 Páginas               → home, sobre nosotros, servicios, trabajos, contacto, legales
 *   🛠️ Servicios             → colección
 *   💼 Trabajos              → colección
 *   🏢 Empresas              → colección de logos
 *   💬 Testimonios           → colección
 *
 * Los singletons se muestran como documento único editable, no como
 * lista con botón "+".
 */
export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      // ===== CONFIGURACIÓN GLOBAL =====
      S.listItem()
        .title('⚙️ Configuración global')
        .child(
          S.list()
            .title('Configuración global')
            .items([
              S.listItem()
                .title('Datos del sitio')
                .id('siteSettings')
                .child(
                  S.document().schemaType('siteSettings').documentId('siteSettings'),
                ),
              S.listItem()
                .title('Cabecera')
                .id('header')
                .child(S.document().schemaType('header').documentId('header')),
              S.listItem()
                .title('Pie de página')
                .id('footer')
                .child(S.document().schemaType('footer').documentId('footer')),
            ]),
        ),

      S.divider(),

      // ===== PÁGINAS =====
      S.listItem()
        .title('📄 Páginas')
        .child(
          S.list()
            .title('Páginas del sitio')
            .items([
              S.listItem()
                .title('Inicio')
                .id('homePage')
                .child(S.document().schemaType('homePage').documentId('homePage')),
              S.listItem()
                .title('Sobre nosotros')
                .id('aboutPage')
                .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
              S.listItem()
                .title('Servicios')
                .id('servicesPage')
                .child(
                  S.document().schemaType('servicesPage').documentId('servicesPage'),
                ),
              S.listItem()
                .title('Nuestros trabajos')
                .id('worksPage')
                .child(S.document().schemaType('worksPage').documentId('worksPage')),
              S.listItem()
                .title('Contacto')
                .id('contactPage')
                .child(
                  S.document().schemaType('contactPage').documentId('contactPage'),
                ),

              S.divider(),

              S.listItem()
                .title('Política de privacidad')
                .id('privacyPage')
                .child(
                  S.document().schemaType('privacyPage').documentId('privacyPage'),
                ),
              S.listItem()
                .title('Aviso legal')
                .id('legalNoticePage')
                .child(
                  S.document()
                    .schemaType('legalNoticePage')
                    .documentId('legalNoticePage'),
                ),
              S.listItem()
                .title('Accesibilidad')
                .id('accessibilityPage')
                .child(
                  S.document()
                    .schemaType('accessibilityPage')
                    .documentId('accessibilityPage'),
                ),
            ]),
        ),

      S.divider(),

      // ===== COLECCIONES =====
      S.listItem()
        .title('🛠️ Servicios')
        .schemaType('service')
        .child(S.documentTypeList('service').title('Servicios')),

      S.listItem()
        .title('💼 Trabajos realizados')
        .schemaType('project')
        .child(S.documentTypeList('project').title('Trabajos')),

      S.listItem()
        .title('🏢 Empresas colaboradoras')
        .schemaType('partnerLogo')
        .child(S.documentTypeList('partnerLogo').title('Logos')),

      S.listItem()
        .title('💬 Testimonios')
        .schemaType('testimonial')
        .child(S.documentTypeList('testimonial').title('Testimonios')),
    ])
