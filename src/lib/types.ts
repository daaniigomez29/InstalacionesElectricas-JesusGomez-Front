export type ServicioItem = {
    title: string,
    content: string,
    img: string;
}

export type ServiciosSection = {
    title: string,
    items: ServicioItem[]
}


export type TrabajoItem = {
    text: string,
    img: string
}

export type TrabajoSection = {
    title: string,
    items: TrabajoItem[]
}