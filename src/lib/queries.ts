// ============================================================
// QUERIES DE SANITY (GROQ)
// ============================================================

// ----- HERO (esquema antiguo, pendiente de migrar a homePage.hero) -----
export const heroQuery = `*[_type == "hero"][0] {
    titleLine1,
    titleLine2,
    description
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
