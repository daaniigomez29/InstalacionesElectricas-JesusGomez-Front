// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import vercelAdapter from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';

import sanity from '@sanity/astro';
import { createClient } from '@sanity/client';

import sitemap from '@astrojs/sitemap';

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

//Carga el .env para que la configuración obtenga el projectID. De otra manera el .env cargaría más tarde que la configuración, dejando el projectID como "undefined"
const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');


const SITE = 'https://www.instalacioneselectricasjesusgomez.es';

// ---------------------------------------------------------------
// Pre-carga de fechas de última actualización desde Sanity
// ---------------------------------------------------------------
// Se ejecuta UNA sola vez al evaluar el config (build time). Carga:
//   - `_updatedAt` de cada singleton de página
//   - `_updatedAt` de cada `service` y `project` indexado por slug
// Luego `serialize` del sitemap consulta estos mapas para decidir el
// `lastmod` de cada URL. Si Sanity falla o la URL no tiene contenido
// asociado en Sanity, hace fallback al git log del archivo local.
const sanityReadClient = createClient({
  projectId: env.SANITY_STUDIO_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const SINGLETON_TYPES_FOR_SITEMAP = [
  'homePage',
  'servicesPage',
  'worksPage',
  'aboutPage',
];

/** @type {{ singletons: Array<{_type: string, _updatedAt: string}>, services: Array<{slug: string, _updatedAt: string}>, projects: Array<{slug: string, _updatedAt: string}> }} */
let sanitySitemapData = { singletons: [], services: [], projects: [] };

try {
  const [singletons, services, projects] = await Promise.all([
    sanityReadClient.fetch(
      `*[_type in $types]{ _type, _updatedAt }`,
      { types: SINGLETON_TYPES_FOR_SITEMAP },
    ),
    sanityReadClient.fetch(
      `*[_type == "service" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
    ),
    sanityReadClient.fetch(
      `*[_type == "project" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
    ),
  ]);
  sanitySitemapData = {
    singletons: singletons ?? [],
    services: services ?? [],
    projects: projects ?? [],
  };
} catch (err) {
  console.warn(
    '[sitemap] No se pudieron leer las fechas de Sanity, se usará git para todas las URLs:',
    err,
  );
}

const singletonUpdatedByType = new Map(
  sanitySitemapData.singletons.map((s) => [s._type, s._updatedAt]),
);
const serviceUpdatedBySlug = new Map(
  sanitySitemapData.services.map((s) => [s.slug, s._updatedAt]),
);
const projectUpdatedBySlug = new Map(
  sanitySitemapData.projects.map((p) => [p.slug, p._updatedAt]),
);

/**
 * Devuelve la fecha ISO de `_updatedAt` desde Sanity para una URL, o
 * `null` si esa URL no está respaldada por contenido de Sanity (y por
 * tanto debe usarse el git log del archivo local como fallback).
 *
 * @param {string} url
 * @returns {string | null}
 */
function sanityLastModForUrl(url) {
  const path = new URL(url).pathname.replace(/\/$/, '') || '/';

  if (path === '/') return singletonUpdatedByType.get('homePage') ?? null;
  if (path === '/servicios') return singletonUpdatedByType.get('servicesPage') ?? null;
  if (path === '/nuestros-trabajos') return singletonUpdatedByType.get('worksPage') ?? null;
  if (path === '/sobre-nosotros') return singletonUpdatedByType.get('aboutPage') ?? null;
  if (path === '/contacto') return singletonUpdatedByType.get('contactPage') ?? null;

  if (path.startsWith('/servicios/')) {
    const slug = path.slice('/servicios/'.length);
    return serviceUpdatedBySlug.get(slug) ?? null;
  }
  if (path.startsWith('/nuestros-trabajos/')) {
    const slug = path.slice('/nuestros-trabajos/'.length);
    return projectUpdatedBySlug.get(slug) ?? null;
  }
  return null;
}

// Mapea cada URL pública al archivo que define su contenido.
// Para rutas dinámicas, apunta al archivo de datos correspondiente.
/**
 * @param {string} url
 * @returns {String}
 */
function sourceFileForUrl(url) {
  const path = new URL(url).pathname.replace(/\/$/, '') || '/';

  if (path === '/') return 'src/pages/index.astro';
  if (path.startsWith('/servicios/')) return 'src/data/servicios.ts';
  if (path === '/servicios') return 'src/pages/servicios.astro';
  if (path.startsWith('/nuestros-trabajos/')) return 'src/data/projects.ts';
  if (path === '/nuestros-trabajos') return 'src/pages/nuestros-trabajos.astro';
  return `src/pages${path}.astro`;
}

const gitDateCache = new Map();

/**
 * @param {string} file
 * @returns {Date | null}
 */
function lastCommitDate(file) {
  if (!file || !existsSync(file)) return null;

  if (gitDateCache.has(file)) return gitDateCache.get(file);

  try {
    const iso = execSync(`git log -1 --format=%cI -- "${file}"`, {
      encoding: 'utf8',
    }).trim();

    const date = iso ? new Date(iso) : null;

    gitDateCache.set(file, date);
    return date;
  } catch {
    return null;
  }
}

const fallback = new Date(new Date().setHours(0, 0, 0, 0));

// https://astro.build/config
export default defineConfig({
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()]
  },

  output: 'static',
  adapter: vercelAdapter(),
  site: SITE,
  integrations: [sanity({
    projectId: env.SANITY_STUDIO_PROJECT_ID,
    dataset: "production",
    useCdn: false, // for static builds
  }), sitemap({
      serialize(item) {
        // 1) Si la URL está respaldada por contenido de Sanity, usa su _updatedAt.
        const sanityIso = sanityLastModForUrl(item.url);
        if (sanityIso) {
          item.lastmod = sanityIso;
          return item;
        }
        // 2) Si no, fallback al último commit del archivo local que la define.
        const file = sourceFileForUrl(item.url);
        const date = lastCommitDate(file) ?? fallback;
        item.lastmod = date.toISOString();
        return item;
      }
  })]
});