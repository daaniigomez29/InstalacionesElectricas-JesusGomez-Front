export const hero = {
    name: "hero",
    title: "Hero",
    type: "document",
    __experimental_singleton: true, // marca como singleton,
    initialValue: {
        titleLine1: "Expertos en energía, comprometidos contigo",
        titleLine2: "y con tu seguridad.",
        description: "Instalaciones, reparaciones y mantenimiento eléctrico rápido, limpio y con garantía. Tú solo disfruta de la tranquilidad."
      },
    fields: [
        { name: "titleLine1", type: "string", title: "Título línea 1" },
        { name: "titleLine2", type: "string", title: "Título línea 2" },
        { name: "description", type: "text", title: "Descripción" }
    ]
}