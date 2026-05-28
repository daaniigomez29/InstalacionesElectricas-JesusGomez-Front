// ============================================================
// QUERIES DE SANITY (GROQ)
// ============================================================

// ============================================================
// SEO POR PÁGINA SINGLETON
// ============================================================
/**
 * Query parametrizada que devuelve el bloque `seo` de cualquier
 * singleton de página (homePage, servicesPage, aboutPage, worksPage,
 * contactPage). Se le pasa el tipo de documento como parámetro:
 *
 *   sanityClient.fetch(pageSeoQuery, { docType: 'homePage' })
 *
 * El campo `ogImage` en el schema es de tipo `image` simple (sin alt),
 * así que aquí solo resolvemos la URL.
 */
export const pageSeoQuery = `*[_type == $docType][0].seo{
  title,
  description,
  canonical,
  "ogImageUrl": ogImage.asset->url,
  noIndex
}`;

// ============================================================
// EMPRESAS QUE CONFÍAN (logos del Home)
// ============================================================
/**
 * Devuelve los logos del slider "Empresas que confían".
 * Los logos viven directamente en el documento `homePage` como un
 * array de imageWithAlt. Se resuelve la URL del asset en la query
 * para que el frontend reciba ya `{ url, alt }` listo para usar.
 */
export const partnerLogosQuery = `*[_type == "homePage"][0].partnerLogos[]{
  "url": image.asset->url,
  "alt": alt
}`;

// ============================================================
// CATÁLOGO POR CATEGORÍA (/servicios)
// ============================================================
/**
 * Devuelve el bloque "catalogByCategory" del singleton servicesPage,
 * resolviendo cada referencia de servicio al shape que ya consume el
 * componente CatalogByCategory.astro:
 *
 *   { img, title, content, href }
 *
 * Mantener este mismo shape permite que la migración del componente
 * sea un simple intercambio del array hardcodeado por el resultado de
 * esta query, sin tocar la plantilla.
 */
export const catalogByCategoryQuery = `*[_type == "servicesPage"][0].catalogByCategory{
  title,
  intro,
  categories[]{
    emoji,
    title,
    intro,
    "services": services[]->{
      "img": cardImage.image.asset->url,
      "imgAlt": cardImage.alt,
      "title": name,
      "content": cardDescription,
      "href": "/servicios/" + slug.current
    }
  }
}`;

// ============================================================
// ¿QUÉ SERVICIO NECESITO? (Service Finder, /servicios)
// ============================================================
/**
 * Devuelve el bloque "serviceFinder" del singleton servicesPage,
 * resolviendo cada referencia de servicio para que cada fila ya
 * tenga el shape que consume ServiceFinder.astro:
 *
 *   { situation, service, href }
 *
 * Donde `service` es el nombre del servicio (`service.name`) y `href`
 * se construye a partir del slug. Mantener este shape permite migrar
 * el componente cambiando solo el origen del array, sin tocar la
 * plantilla.
 */
export const serviceFinderQuery = `*[_type == "servicesPage"][0].serviceFinder{
  title,
  intro,
  "rows": rows[]{
    situation,
    service->{
      "service": name,
      "href": "/servicios/" + slug.current
    }
  }
}`;

// ============================================================
// CÓMO TRABAJAMOS / SERVICE PROCESS (/servicios)
// ============================================================
/**
 * Devuelve el bloque "processSection" del singleton servicesPage,
 * con el shape que consume <ServiceProcess>:
 *
 *   { title, steps: [{ title, description }] }
 *
 * El mismo objeto sirve además para alimentar el `buildHowTo()` que
 * genera el schema SEO en la página /servicios.
 */
export const serviceProcessQuery = `*[_type == "servicesPage"][0].processSection{
  title,
  steps[]{
    title,
    description
  }
}`;

// ============================================================
// /servicios — HERO
// ============================================================
export const servicesHeroQuery = `*[_type == "servicesPage"][0].hero{
  title,
  subtitle,
  "bgImageUrl": bgImage.image.asset->url,
  "bgImageAlt": bgImage.alt
}`;

// ============================================================
// /servicios — PARA QUIÉN TRABAJAMOS
// ============================================================
export const servicesForWhoQuery = `*[_type == "servicesPage"][0].forWhoSection{
  title,
  subtitle,
  audiences[]{
    title,
    description,
    href
  }
}`;

// ============================================================
// /servicios — POR QUÉ ELEGIRNOS
// ============================================================
export const servicesWhyUsQuery = `*[_type == "servicesPage"][0].whyUsSection{
  title,
  reasons[]{
    icon,
    title,
    description
  }
}`;

// ============================================================
// /servicios — CASOS DESTACADOS
// ============================================================
/**
 * Resuelve los proyectos referenciados al shape que consume FeaturedCases.astro:
 *   { img, title, description }
 */
export const servicesFeaturedCasesQuery = `*[_type == "servicesPage"][0].featuredCases{
  title,
  "cases": projects[]->{
    "img": coverImage.image.asset->url,
    "imgAlt": coverImage.alt,
    title,
    "description": summary
  }
}`;

// ============================================================
// /servicios — FAQ FINAL DE LA PÁGINA
// ============================================================
export const servicesFaqQuery = `*[_type == "servicesPage"][0].faqSection{
  title,
  faq{
    title,
    items[]{
      question,
      answer
    }
  }
}`;

// ============================================================
// /servicios — CTA FINAL
// ============================================================
export const servicesCtaQuery = `*[_type == "servicesPage"][0].cta{
  title,
  text
}`;

// ============================================================
// /servicios/[slug] — DETALLE DE CADA SERVICIO
// ============================================================
/**
 * Devuelve TODOS los documentos `service` con toda la estructura que
 * necesita la página de detalle. `paragraphs` viene como Portable Text;
 * se convierte a HTML string en api.ts. Imágenes ya vienen como URL
 * absoluta.
 *
 * `related[].slug` se resuelve siguiendo la referencia. La descripción
 * contextual se mantiene tal cual.
 */
export const allServicesForBuildQuery = `*[_type == "service" && defined(slug.current)]{
  "slug": slug.current,
  name,
  hero{
    h1,
    subtitle,
    "bgImage": bgImage.image.asset->url
  },
  intro{
    title,
    paragraphs,
    "image": image.image.asset->url,
    "imageAlt": image.alt
  },
  includes{title, intro, items[]{title, description}},
  problems{title, intro, items[]{title, description}},
  benefits{title, items[]{icon, title, description}},
  process{title, steps[]{title, description}},
  faq{title, items[]{question, answer}},
  related[]{
    description,
    "slug": service->slug.current
  },
  cta{title, text},
  seo{title, description}
}`;

// ============================================================
// HOME (/) — HERO
// ============================================================
export const homeHeroQuery = `*[_type == "homePage"][0].hero{
  pretitle,
  titleLine1,
  titleLine2,
  description,
  "imageUrl": image.image.asset->url,
  "imageAlt": image.alt,
  ctaPrimary,
  ctaSecondary
}`;

// ============================================================
// HOME — QUIÉNES SOMOS (parcial: solo title/image/button activos)
// ============================================================
export const homeAboutQuery = `*[_type == "homePage"][0].aboutSection{
  title,
  "imageUrl": image.image.asset->url,
  "imageAlt": image.alt,
  button
}`;

// ============================================================
// HOME — SERVICIOS DESTACADOS
// ============================================================
/**
 * Si mode = 'manual' usa la selección manual de servicios.
 * Si mode = 'all' (o cualquier otro) usa todos los servicios disponibles.
 */
export const homeServicesQuery = `*[_type == "homePage"][0].servicesSection{
  title,
  subtitle,
  mode,
  "services": select(
    mode == "manual" => services[]->{
      "img": cardImage.image.asset->url,
      "imgAlt": cardImage.alt,
      "title": name,
      "content": cardDescription,
      "href": "/servicios/" + slug.current
    },
    *[_type == "service" && defined(slug.current)]{
      "img": cardImage.image.asset->url,
      "imgAlt": cardImage.alt,
      "title": name,
      "content": cardDescription,
      "href": "/servicios/" + slug.current
    }
  )
}`;

// ============================================================
// HOME — TRABAJOS DESTACADOS
// ============================================================
/**
 * Tres modos:
 *   - featured: proyectos marcados como destacados
 *   - latest:   los N más recientes (limit)
 *   - manual:   selección manual
 */
export const homeFeaturedWorksQuery = `*[_type == "homePage"][0].featuredWorksSection{
  title,
  subtitle,
  mode,
  limit,
  "projects": select(
    mode == "manual" => projects[]->{
      "slug": slug.current,
      title,
      summary,
      location,
      type,
      duration,
      "coverImage": {
        "src": coverImage.image.asset->url,
        "alt": coverImage.alt
      }
    },
    mode == "latest" => *[_type == "project" && defined(slug.current)] | order(publishedAt desc){
      "slug": slug.current,
      title,
      summary,
      location,
      type,
      duration,
      "coverImage": {
        "src": coverImage.image.asset->url,
        "alt": coverImage.alt
      }
    },
    *[_type == "project" && featured == true && defined(slug.current)]{
      "slug": slug.current,
      title,
      summary,
      location,
      type,
      duration,
      "coverImage": {
        "src": coverImage.image.asset->url,
        "alt": coverImage.alt
      }
    }
  )
}`;

// ============================================================
// HOME — FAQ
// ============================================================
export const homeFaqQuery = `*[_type == "homePage"][0].faqSection{
  title,
  faq{
    title,
    items[]{question, answer}
  }
}`;

// ============================================================
// HOME — CTA FINAL
// ============================================================
export const homeFinalCtaQuery = `*[_type == "homePage"][0].finalCta{
  title,
  text
}`;

// ============================================================
// /sobre-nosotros — HERO
// ============================================================
export const aboutHeroQuery = `*[_type == "aboutPage"][0].hero{
  title,
  subtitle,
  "bgImageUrl": bgImage.image.asset->url,
  "bgImageAlt": bgImage.alt
}`;

// ============================================================
// /sobre-nosotros — NUESTRA HISTORIA
// ============================================================
/**
 * `content` viene como Portable Text. Se convierte a array de strings
 * HTML en api.ts (mismo patrón que en el detalle de servicio).
 */
export const aboutStoryQuery = `*[_type == "aboutPage"][0].story{
  title,
  content,
  "imageUrl": image.image.asset->url,
  "imageAlt": image.alt
}`;

// ============================================================
// /sobre-nosotros — VALORES
// ============================================================
export const aboutValuesQuery = `*[_type == "aboutPage"][0].values{
  title,
  items[]{
    title,
    description
  },
  "imageUrl": image.image.asset->url,
  "imageAlt": image.alt
}`;

// ============================================================
// /sobre-nosotros — FAQ
// ============================================================
export const aboutFaqQuery = `*[_type == "aboutPage"][0].faqSection{
  title,
  faq{
    title,
    items[]{question, answer}
  }
}`;

// ============================================================
// /sobre-nosotros — CTA FINAL
// ============================================================
export const aboutCtaQuery = `*[_type == "aboutPage"][0].cta{
  title,
  text
}`;

// ============================================================
// /nuestros-trabajos — HERO
// ============================================================
export const worksHeroQuery = `*[_type == "worksPage"][0].hero{
  title,
  subtitle,
  "bgImageUrl": bgImage.image.asset->url,
  "bgImageAlt": bgImage.alt
}`;

// ============================================================
// /nuestros-trabajos — INTRO DEL GRID
// ============================================================
export const worksIntroQuery = `*[_type == "worksPage"][0].intro{
  title,
  subtitle
}`;

// ============================================================
// /nuestros-trabajos — CTA FINAL
// ============================================================
export const worksCtaQuery = `*[_type == "worksPage"][0].cta{
  title,
  text
}`;

// ============================================================
// /nuestros-trabajos/[slug] — TODOS LOS PROYECTOS
// ============================================================
/**
 * Devuelve TODOS los proyectos publicados, ordenados por fecha
 * descendente. Cada proyecto trae el shape completo que necesita la
 * página de detalle: hero, story, galería, info técnica, testimonio.
 *
 * Las imágenes (cover y galería) vienen ya con URL absoluta del CDN.
 */
export const allProjectsForBuildQuery = `*[_type == "project" && defined(slug.current)] | order(publishedAt desc){
  "slug": slug.current,
  title,
  summary,
  location,
  type,
  duration,
  client,
  featured,
  publishedAt,
  "coverImage": {
    "src": coverImage.image.asset->url,
    "alt": coverImage.alt
  },
  problem,
  solution,
  result,
  "gallery": gallery[]{
    "src": image.asset->url,
    "alt": alt
  },
  testimonial{quote, author},
  seo{title, description}
}`;
