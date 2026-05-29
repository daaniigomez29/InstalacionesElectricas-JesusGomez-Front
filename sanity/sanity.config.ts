import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes, SINGLETON_TYPES, SINGLETON_ACTIONS} from './schemaTypes'
import {deskStructure} from './deskStructure'


export default defineConfig({
  name: 'default',
  title: 'instalacioneselectricasjesusgomez-front',

  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: 'production',

  plugins: [structureTool({structure: deskStructure}), visionTool()],

  schema: {
    types: schemaTypes,

    /**
     * Oculta los tipos singleton del menú "Create new" general,
     * porque ya están accesibles desde la Desk Structure y no
     * tiene sentido crear duplicados.
     */
    templates: (templates) =>
      templates.filter(({schemaType}) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
    /**
     * En documentos singleton, elimina las acciones que no tienen sentido
     * (duplicar, borrar) para evitar que el cliente rompa la página sin
     * querer.
     */
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(({action}) => action && SINGLETON_ACTIONS.has(action))
        : input,
  },
})
