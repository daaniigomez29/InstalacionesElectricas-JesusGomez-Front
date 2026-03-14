export const empresas = {
    name: "empresas",
    title: "Empresas que confían en nuestros servicios",
    type: "document",
    initialValue: {
      title: "Empresas que confían en nuestros servicios",
      logos: []
    },
    fields: [
      {
        name: "title",
        type: "string",
        title: "Título de la sección",
      },
      {
        name: "logos",
        type: "array",
        title: "Logos de empresas",
        of: [
          {
            type: "object",
            fields: [
              {
                name:"logo",
                type: "image",
                title:"Logo de la empresa",
                options: { hotspot: false } // permite recorte y enfoque
              },
              {
                name:"alt",
                type:"string",
                title:"Descripción de la imagen"
              }
            ]
          }
          
        ]
      }
    ]
  };