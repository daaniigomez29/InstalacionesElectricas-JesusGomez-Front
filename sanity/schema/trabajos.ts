export const trabajos = {
    name: "trabajos",
    title: "Trabajos",
    type: "document",
    initialValue: {
      title: "Nuestros trabajos",
      items: []
    },
    fields: [
      {
        name: "title",
        type: "string",
        title: "Título de la sección",
        initialValue: "Nuestros trabajos"
      },
      {
        name: "items",
        type: "array",
        title: "Lista de trabajos",
        of: [
          {
            type: "object",
            fields: [
              {
                name: "img",
                type: "image",
                title: "Imagen del trabajo",
                options: { hotspot: true } // permite recorte y enfoque
              },
              {
                name: "text",
                type: "string",
                title: "Texto descriptivo del trabajo"
              }
            ]
          }
        ]
      }
    ]
  };