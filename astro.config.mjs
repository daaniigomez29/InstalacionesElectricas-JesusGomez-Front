// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import vercelAdapter from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';

import sanity from '@sanity/astro';

import sitemap from '@astrojs/sitemap';

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

//Carga el .env para que la configuración obtenga el projectID. De otra manera el .env cargaría más tarde que la configuración, dejando el projectID como "undefined"
const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');


const SITE = 'https://instalacioneselectricasjesusgomez.es';

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
console.log('Sanity projectId =', env.SANITY_STUDIO_PROJECT_ID);

// https://astro.build/config
export default defineConfig({
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()]
  },

  output: 'static',
  adapter: vercelAdapter(),
  site:'https://instalacioneselectricasjesusgomez.es',
  integrations: [sanity({
    projectId: env.SANITY_STUDIO_PROJECT_ID,
    dataset: "production",
    useCdn: false, // for static builds
  }), sitemap({
      serialize(item) {
        const file = sourceFileForUrl(item.url);
        const date = lastCommitDate(file) ?? fallback;
        item.lastmod = date.toISOString();
        return item;
      }
  })]
});