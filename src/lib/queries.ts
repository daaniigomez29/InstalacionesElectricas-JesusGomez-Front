// ============================================================
// QUERIES DE SANITY (GROQ)
// ============================================================

// ----- HERO (esquema antiguo, pendiente de migrar a homePage.hero) -----
export const heroQuery = `*[_type == "hero"][0] {
    titleLine1,
    titleLine2,
    description,
}`;

// ----- SERVICIOS (esquema antiguo, pendiente de migrar) -----
export const serviciosQuery = `*[_type == "servicios"][0]{
    title,
    items[]{
    title,
    content,
    "img": img.asset->url
    }
}`;

// ----- TRABAJOS (esquema antiguo, pendiente de migrar) -----
export const trabajosQuery = `*[_type == "trabajos"][0]{
    title,
    items[]{
    text,
    "img": img.asset->url
    }
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
