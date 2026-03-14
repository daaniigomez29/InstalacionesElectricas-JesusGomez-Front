export const servicios = {
    name: "servicios",
    title: "Servicios",
    type: "document",
    initialValue: {
      title: "Nuestros servicios",
      items: []
    },
    fields: [
      {
        name: "title",
        type: "string",
        title: "Título de la sección",
        initialValue: "Nuestros servicios"
      },
      {
        name: "items",
        type: "array",
        title: "Lista de servicios",
        of: [
          {
            type: "object",
            fields: [
              {
                name: "img",
                type: "image",
                title: "Imagen del servicio",
                options: { hotspot: true } // permite recorte y enfoque
              },
              {
                name: "title",
                type: "string",
                title: "Título del servicio"
              },
              {
                name: "content",
                type: "text",
                title: "Descripción del servicio"
              }
            ]
          }
        ]
      }
    ]
  };