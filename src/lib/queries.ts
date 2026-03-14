export const heroQuery = `*[_type == "hero"][0] {
    titleLine1,
    titleLine2,
    description
}`;

export const empresasQuery = `*[_type == "empresas"][0] {
    title,
    logos[]{ 
    "url": logo.asset->url,
    alt 
    }
}`;

export const serviciosQuery = `*[_type == "servicios"][0]{
    title,
    items[]{
    title,
    content,
    "img": img.asset->url
    }
}`;

export const trabajosQuery = `*[_type == "trabajos"][0]{
    title,
    items[]{
    text,
    "img": img.asset->url
    }
}`;