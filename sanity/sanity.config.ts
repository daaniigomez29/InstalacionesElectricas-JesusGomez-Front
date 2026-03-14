import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'instalacioneselectricasjesusgomez-front',

  projectId: '67gi8gp6',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
  structure: (S:any) =>
    S.list()
      .title("Content")
      .items([
        S.document()
          .schemaType("hero")
          .documentId("hero") // siempre el mismo ID
          .title("Hero"),
      ]),
})
