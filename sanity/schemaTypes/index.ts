// ===== Objetos reutilizables =====
import {seo} from '../schema/objects/seo'
import {cta} from '../schema/objects/cta'
import {imageWithAlt} from '../schema/objects/imageWithAlt'
import {link} from '../schema/objects/link'
import {richText} from '../schema/objects/richText'
import {faq} from '../schema/objects/faq'

// ===== Singletons globales =====
import {siteSettings} from '../schema/singletons/siteSettings'
import {header} from '../schema/singletons/header'
import {footer} from '../schema/singletons/footer'

// ===== Singletons de página =====
import {homePage} from '../schema/singletons/homePage'
import {aboutPage} from '../schema/singletons/aboutPage'
import {servicesPage} from '../schema/singletons/servicesPage'
import {worksPage} from '../schema/singletons/worksPage'
//import {contactPage} from '../schema/singletons/contactPage'
import {
  privacyPage,
  legalNoticePage,
  accessibilityPage,
} from '../schema/singletons/legalPage'

// ===== Colecciones =====
import {service} from '../schema/documents/service'
import {project} from '../schema/documents/project'
import {testimonial} from '../schema/documents/testimonial'

/**
 * Lista de todos los tipos del Studio.
 *
 * IMPORTANTE: los objetos reutilizables (seo, cta, etc.) deben ir aquí
 * aunque no sean documentos, para que estén disponibles cuando otros
 * esquemas los usen con `type: 'seo'`, `type: 'cta'`, etc.
 */
export const schemaTypes = [
  // Objetos reutilizables
  seo,
  cta,
  imageWithAlt,
  link,
  richText,
  faq,

  // Singletons globales
  siteSettings,
  header,
  footer,

  // Singletons de página
  homePage,
  aboutPage,
  servicesPage,
  worksPage,
  //contactPage,
  privacyPage,
  legalNoticePage,
  accessibilityPage,

  // Colecciones
  service,
  project,
  testimonial,
]

/**
 * Tipos que deben tratarse como singletons.
 * Lo usa la Desk Structure para mostrarlos como documento único
 * (no como lista) y lo usa la configuración para bloquear duplicados/borrado.
 */
export const SINGLETON_TYPES = new Set<string>([
  'siteSettings',
  'header',
  'footer',
  'homePage',
  'aboutPage',
  'servicesPage',
  'worksPage',
  //'contactPage',
  'privacyPage',
  'legalNoticePage',
  'accessibilityPage',
])

/**
 * Acciones permitidas para singletons (sin duplicate, sin delete).
 */
export const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore'])
