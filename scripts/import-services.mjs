/**
 * Importa los servicios definidos en src/data/servicios.ts a Sanity.
 *
 * Por cada servicio:
 *   1. Sube las imágenes (hero, intro) como assets si no existen ya
 *      (Sanity desduplica por hash SHA1, así que reejecutar es seguro).
 *   2. Convierte los párrafos de `intro.paragraphs` (con etiquetas <b>)
 *      a Portable Text para que se editen como texto enriquecido.
 *   3. Crea el documento `service` con un _id determinista basado en el
 *      slug → reejecutar no duplica, simplemente avisa de que ya existe.
 *   4. Resuelve las referencias `related[]` a los _id de los otros
 *      servicios (ya estén creados a mano o por este mismo script).
 *
 * IMPORTANTE — Servicios creados a mano en el Studio:
 *   Si ya rellenaste un servicio manualmente, su _id es aleatorio (no
 *   `service.{slug}`). Este script lo detecta por `slug.current` y lo
 *   salta, manteniendo intacto tu trabajo manual. Las referencias
 *   `related` apuntarán al _id correcto independientemente.
 *
 * Requisitos previos:
 *   1. Tener un Sanity write token en .env como SANITY_WRITE_TOKEN=sk...
 *      (https://www.sanity.io/manage → API → Tokens, permisos "Editor").
 *   2. Tener tsx instalado como devDependency (lo añade el comando npm
 *      del package.json — si no, ejecuta `npm i -D tsx` primero).
 *
 * Ejecutar:
 *   npm run import:services
 */

import {readFile} from 'node:fs/promises'
import {basename, resolve} from 'node:path'
import {createClient} from '@sanity/client'

// Importar desde el .ts de Astro. Funciona porque tsx transpila al vuelo.
import {services} from '../src/data/servicios.ts'

// ---------------------------------------------------------------
// Configuración
// ---------------------------------------------------------------

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
    console.error('   y añádelo al .env de la raíz como SANITY_WRITE_TOKEN=sk...')
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
 * Convierte una ruta pública tipo "/assets/foo.webp" a la ruta del
 * archivo en disco, y la lee. Sanity desduplica por hash, así que
 * reusar la misma imagen en varios sitios no la sube dos veces.
 */
const assetCache = new Map() // publicPath → assetId

async function uploadImage(publicPath) {
    if (assetCache.has(publicPath)) {
        return assetCache.get(publicPath)
    }
    const diskPath = resolve('public' + publicPath)
    const buffer = await readFile(diskPath)
    const filename = basename(publicPath)
    console.log(`    ↑ Subiendo ${filename}...`)
    const asset = await client.assets.upload('image', buffer, {filename})
    assetCache.set(publicPath, asset._id)
    return asset._id
}

/**
 * Construye un objeto imageWithAlt para Sanity.
 */
async function buildImageWithAlt(publicPath, alt) {
    const assetId = await uploadImage(publicPath)
    return {
        _type: 'imageWithAlt',
        image: {
            _type: 'image',
            asset: {_type: 'reference', _ref: assetId},
        },
        alt,
    }
}

/**
 * Convierte un párrafo con <b>negrita</b> a un bloque Portable Text.
 * Solo soporta <b>; cualquier otro HTML se mantiene como texto plano.
 * Suficiente para los datos actuales de src/data/servicios.ts.
 */
function paragraphToBlock(html, blockIdx) {
    // Partimos por <b>...</b> manteniendo los delimitadores.
    const parts = html.split(/(<b>.*?<\/b>)/g).filter(Boolean)
    const children = parts.map((part, i) => {
        const isBold = /^<b>.*<\/b>$/.test(part)
        const text = isBold ? part.replace(/^<b>|<\/b>$/g, '') : part
        return {
            _type: 'span',
            _key: `s${blockIdx}_${i}`,
            text,
            marks: isBold ? ['strong'] : [],
        }
    })
    return {
        _type: 'block',
        _key: `b${blockIdx}`,
        style: 'normal',
        markDefs: [],
        children,
    }
}

function paragraphsToPortableText(paragraphs) {
    return paragraphs.map((p, i) => paragraphToBlock(p, i))
}

/**
 * Añade _key únicos a un array de items. Sanity los requiere para
 * arrays de objetos.
 */
function withKeys(items, prefix) {
    return items.map((item, i) => ({...item, _key: `${prefix}_${i}`}))
}

/**
 * Construye el documento Sanity SIN el campo `related`.
 *
 * Por qué sin related: Sanity valida las referencias en el momento
 * de la creación, así que si el documento destino aún no existe en
 * este mismo run, la mutación falla. Resolvemos haciendo dos pasadas:
 *   1) Crear todos los servicios sin related.
 *   2) Patchar el related de cada uno (cuando todos ya existen).
 */
async function buildServiceDocBase(service, slugToId) {
    const heroBg = await buildImageWithAlt(service.hero.bgImage, service.hero.h1)
    const introImg = await buildImageWithAlt(service.intro.image, service.intro.imageAlt)

    // cardImage no existe en los datos locales — usamos la misma imagen
    // del hero como fallback razonable. Editable después en el Studio.
    const cardImage = await buildImageWithAlt(service.hero.bgImage, service.name)

    return {
        _id: slugToId.get(service.slug),
        _type: 'service',

        // Tarjeta resumen
        name: service.name,
        slug: {_type: 'slug', current: service.slug},
        cardImage,
        // cardDescription no existe en TS — usamos el seo.description como fallback
        // (lo más cercano a una descripción corta de 1-2 frases).
        cardDescription: service.seo.description.slice(0, 200),
        featured: false,

        // Hero
        hero: {
            h1: service.hero.h1,
            subtitle: service.hero.subtitle,
            bgImage: heroBg,
        },

        // Intro
        intro: {
            title: service.intro.title,
            paragraphs: paragraphsToPortableText(service.intro.paragraphs),
            image: introImg,
        },

        // Includes
        includes: {
            title: service.includes.title,
            intro: service.includes.intro,
            items: withKeys(service.includes.items, 'inc'),
        },

        // Problems
        problems: {
            title: service.problems.title,
            intro: service.problems.intro,
            items: withKeys(service.problems.items, 'prob'),
        },

        // Benefits
        benefits: {
            title: service.benefits.title,
            items: withKeys(service.benefits.items, 'ben'),
        },

        // Process
        process: {
            title: service.process.title,
            steps: withKeys(service.process.steps, 'step'),
        },

        // FAQ
        faq: {
            title: service.faq.title,
            items: withKeys(service.faq.items, 'faq'),
        },

        // CTA (sin botones — el TS no los define)
        cta: {
            title: service.cta.title,
            text: service.cta.text,
        },

        // SEO
        seo: {
            title: service.seo.title,
            description: service.seo.description,
        },

        // ⚠️ related[] se rellena en la segunda pasada (ver main()).
    }
}

/**
 * Construye el array `related[]` resolviendo los slugs a _id reales.
 * Se llama en la segunda pasada cuando todos los servicios destino
 * ya existen en Sanity.
 */
function buildRelatedArray(service, slugToId) {
    return service.related
        .map((ref, i) => {
            const targetId = slugToId.get(ref.slug)
            if (!targetId) {
                console.warn(
                    `    ⚠ "${service.slug}" referencia a slug desconocido "${ref.slug}", se omite.`,
                )
                return null
            }
            return {
                _key: `rel_${i}`,
                _type: 'object',
                service: {_type: 'reference', _ref: targetId},
                description: ref.description,
            }
        })
        .filter(Boolean)
}

// ---------------------------------------------------------------
// Script principal
// ---------------------------------------------------------------

async function main() {
    console.log(`\n📦 Importando ${services.length} servicios a Sanity...\n`)

    // 1. Construimos el mapa slug → _id combinando los servicios ya
    //    existentes en Sanity con los que vamos a crear.
    console.log('🔍 Consultando servicios ya existentes en Sanity...')
    const existing = await client.fetch(
        `*[_type == "service"]{_id, "slug": slug.current}`,
    )
    const slugToId = new Map()
    const existingSlugs = new Set()
    for (const doc of existing) {
        if (doc.slug) {
            slugToId.set(doc.slug, doc._id)
            existingSlugs.add(doc.slug)
        }
    }
    console.log(`   ${existing.length} servicio(s) ya en Sanity:`)
    for (const slug of existingSlugs) {
        console.log(`     - ${slug}`)
    }

    // 2. Asignamos IDs deterministas a los servicios nuevos.
    for (const svc of services) {
        if (!slugToId.has(svc.slug)) {
            slugToId.set(svc.slug, `service.${svc.slug}`)
        }
    }

    // 3. Por cada servicio del TS: si ya existe, lo saltamos; si no, lo creamos.
    const toCreate = services.filter((s) => !existingSlugs.has(s.slug))

    if (toCreate.length === 0) {
        console.log(
            '\n✅ Todos los servicios ya están en Sanity. No hay nada que importar.\n',
        )
        return
    }

    console.log(`\n📝 Servicios nuevos a crear: ${toCreate.length}\n`)

    // ============================================================
    // PASADA 1: Crear todos los servicios SIN related[].
    // ============================================================
    console.log('━━━ Pasada 1/2: creando documentos (sin related) ━━━')

    let created = 0
    const createdSlugs = []
    for (const svc of toCreate) {
        console.log(`\n📄 [${svc.slug}] ${svc.name}`)
        try {
            const doc = await buildServiceDocBase(svc, slugToId)
            await client.createIfNotExists(doc)
            console.log(`    ✅ Creado (sin related).`)
            created++
            createdSlugs.push(svc.slug)
        } catch (err) {
            console.error(`    ❌ Error creando "${svc.slug}":`, err.message)
        }
    }

    // ============================================================
    // PASADA 2: Patchar related[] en los servicios recién creados.
    // No tocamos los servicios pre-existentes (los hechos a mano)
    // para no pisar lo que el editor ya pudiera tener configurado.
    // ============================================================
    console.log('\n━━━ Pasada 2/2: añadiendo referencias `related` ━━━')

    let patched = 0
    for (const slug of createdSlugs) {
        const svc = services.find((s) => s.slug === slug)
        if (!svc || svc.related.length === 0) continue

        const docId = slugToId.get(slug)
        console.log(`\n🔗 [${slug}] añadiendo ${svc.related.length} relacionados...`)
        try {
            const related = buildRelatedArray(svc, slugToId)
            await client.patch(docId).set({related}).commit()
            console.log(`    ✅ related actualizado.`)
            patched++
        } catch (err) {
            console.error(`    ❌ Error patchando "${slug}":`, err.message)
        }
    }

    console.log(
        `\n✅ Importación terminada. ${created}/${toCreate.length} servicios creados.`,
    )
    console.log(`   related[] añadido en ${patched} servicios.`)
    console.log(
        `   Saltados (ya existían): ${services.length - toCreate.length}\n`,
    )
    console.log(`   Abre el Studio para revisarlos: cd sanity && npm run dev\n`)
}

main().catch((err) => {
    console.error('\n❌ Error durante la importación:')
    console.error(err)
    process.exit(1)
})
