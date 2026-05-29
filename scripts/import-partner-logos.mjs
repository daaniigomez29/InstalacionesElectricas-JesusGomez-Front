/**
 * Importa los logos de "Empresas que confían" a Sanity.
 *
 * Lee los archivos de public/assets/logos-collaborators/, sube cada uno
 * como asset y los añade al array `partnerLogos` del documento
 * singleton `homePage`.
 *
 * Es IDEMPOTENTE: ejecutarlo varias veces no crea duplicados.
 * Sanity desduplica assets por hash SHA1 y este script comprueba que
 * el asset no esté ya referenciado en el array antes de añadirlo.
 *
 * Requisitos previos:
 *   1. Tener un Sanity write token (https://www.sanity.io/manage → API → Tokens)
 *      con permisos de "Editor".
 *   2. Añadirlo al .env como:
 *        SANITY_WRITE_TOKEN=sk...
 *   3. Node 20.6+ (para --env-file).
 *
 * Ejecutar:
 *   npm run import:logos
 *
 * O directamente:
 *   node --env-file=.env scripts/import-partner-logos.mjs
 */

import {readdir, readFile} from 'node:fs/promises'
import {basename, extname, join, resolve} from 'node:path'
import {createClient} from '@sanity/client'

// ---------------------------------------------------------------
// Configuración
// ---------------------------------------------------------------

const LOGOS_DIR = resolve('public/assets/logos-collaborators')
const HOMEPAGE_DOC_ID = 'homePage'
const ALLOWED_EXTENSIONS = new Set(['.webp', '.png', '.jpg', '.jpeg', '.svg'])

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!projectId) {
  console.error('❌ Falta SANITY_STUDIO_PROJECT_ID en .env')
  process.exit(1)
}
if (!token) {
  console.error('❌ Falta SANITY_WRITE_TOKEN en .env')
  console.error('   Crea uno en https://www.sanity.io/manage → API → Tokens')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------

/**
 * Deriva un alt razonable a partir del nombre del archivo.
 * Ej: "agencia-tributaria.webp" → "Logo de Agencia Tributaria"
 */
function deriveAltFromFilename(filename) {
  const name = basename(filename, extname(filename))
  const pretty = name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
  return `Logo de ${pretty}`
}

/**
 * Sube un archivo como asset de imagen y devuelve la referencia.
 * Sanity desduplica por hash, así que llamar dos veces con el mismo
 * fichero devuelve el mismo asset._id.
 */
async function uploadImageAsset(filePath) {
  const buffer = await readFile(filePath)
  const filename = basename(filePath)
  console.log(`  ↑ Subiendo ${filename}...`)
  const asset = await client.assets.upload('image', buffer, {filename})
  return asset
}

/**
 * Construye un objeto imageWithAlt listo para añadir al array.
 */
function buildImageWithAlt(assetId, alt) {
  return {
    _type: 'imageWithAlt',
    _key: assetId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 12),
    image: {
      _type: 'image',
      asset: {_type: 'reference', _ref: assetId},
    },
    alt,
  }
}

// ---------------------------------------------------------------
// Script principal
// ---------------------------------------------------------------

async function main() {
  console.log(`\n📁 Buscando logos en: ${LOGOS_DIR}`)

  const allFiles = await readdir(LOGOS_DIR)
  const logoFiles = allFiles.filter((f) =>
    ALLOWED_EXTENSIONS.has(extname(f).toLowerCase()),
  )

  if (logoFiles.length === 0) {
    console.log('  No se encontraron imágenes para importar.')
    return
  }
  console.log(`  Encontrados ${logoFiles.length} archivos.\n`)

  // 1. Cargamos el homePage actual (o lo creamos vacío si no existe).
  console.log(`📄 Comprobando documento '${HOMEPAGE_DOC_ID}'...`)
  let homePage = await client.getDocument(HOMEPAGE_DOC_ID)

  if (!homePage) {
    console.log('  No existe. Lo creamos.')
    homePage = await client.createIfNotExists({
      _id: HOMEPAGE_DOC_ID,
      _type: 'homePage',
    })
  } else {
    console.log('  OK, existe.')
  }

  const existingLogos = Array.isArray(homePage.partnerLogos)
    ? homePage.partnerLogos
    : []
  const existingAssetIds = new Set(
    existingLogos
      .map((l) => l?.image?.asset?._ref)
      .filter(Boolean),
  )

  // 2. Subimos cada imagen y construimos los nuevos items.
  console.log(`\n📤 Subiendo ${logoFiles.length} imágenes a Sanity...`)
  const newItems = []
  for (const file of logoFiles) {
    const filePath = join(LOGOS_DIR, file)
    const asset = await uploadImageAsset(filePath)

    if (existingAssetIds.has(asset._id)) {
      console.log(`    ↳ ya estaba en el array, se omite.`)
      continue
    }

    const alt = deriveAltFromFilename(file)
    newItems.push(buildImageWithAlt(asset._id, alt))
    console.log(`    ↳ alt: "${alt}"`)
  }

  if (newItems.length === 0) {
    console.log('\n✅ No hay nada nuevo que añadir. Todo está ya en Sanity.\n')
    return
  }

  // 3. Patch del homePage: appendar al array partnerLogos.
  console.log(`\n💾 Añadiendo ${newItems.length} logo(s) al homePage...`)
  await client
    .patch(HOMEPAGE_DOC_ID)
    .setIfMissing({partnerLogos: []})
    .append('partnerLogos', newItems)
    .commit({autoGenerateArrayKeys: true})

  console.log(`\n✅ Importación completa. ${newItems.length} logo(s) añadido(s).`)
  console.log(`   Abre el Studio para verlos: cd sanity && npm run dev\n`)
}

main().catch((err) => {
  console.error('\n❌ Error durante la importación:')
  console.error(err)
  process.exit(1)
})
