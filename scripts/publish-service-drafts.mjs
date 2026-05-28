/**
 * Publica todos los documentos `service` que estén como draft.
 *
 * El script de importación creó los documentos correctamente con _id
 * "service.{slug}", pero quedaron en estado borrador (drafts.*). El
 * cliente público de Astro no puede ver drafts, así que las referencias
 * del catálogo se resolvían a null.
 *
 * Este script:
 *   1. Busca todos los docs con _id que empieza por "drafts.service."
 *   2. Por cada uno: crea/reemplaza la versión publicada y borra el draft
 *      en una transacción atómica.
 *
 * Es idempotente: si todos están publicados, no hace nada.
 *
 * Ejecutar:
 *   npm run publish:services
 */

import {createClient} from '@sanity/client'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!projectId || !token) {
    console.error('❌ Faltan SANITY_STUDIO_PROJECT_ID y/o SANITY_WRITE_TOKEN en .env')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: '2024-01-01',
    useCdn: false,
})

async function main() {
    console.log('\n🔍 Buscando drafts de servicios...')

    const drafts = await client.fetch(
        `*[_type == "service" && _id in path("drafts.**")]`,
    )

    if (drafts.length === 0) {
        console.log('✅ No hay drafts pendientes. Todo está publicado.\n')
        return
    }

    console.log(`   Encontrados ${drafts.length} drafts:\n`)
    for (const d of drafts) {
        console.log(`     - ${d._id}`)
    }

    console.log('\n📤 Publicando...\n')

    let ok = 0
    let fail = 0
    for (const draft of drafts) {
        const publishedId = draft._id.replace(/^drafts\./, '')
        try {
            await client
                .transaction()
                .createOrReplace({...draft, _id: publishedId})
                .delete(draft._id)
                .commit()
            console.log(`  ✅ ${publishedId}`)
            ok++
        } catch (err) {
            console.error(`  ❌ ${draft._id}: ${err.message}`)
            fail++
        }
    }

    console.log(`\n✅ ${ok} publicados, ${fail} fallidos.\n`)
}

main().catch((err) => {
    console.error('\n❌ Error:', err)
    process.exit(1)
})
