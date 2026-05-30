/**
 * Helpers para servir imágenes de Sanity CDN ya redimensionadas
 * y en el mejor formato soportado por el navegador (AVIF/WebP).
 *
 * Si la URL no es de cdn.sanity.io (p.ej. un fallback local en /assets/...)
 * se devuelve tal cual, para que el mismo componente pueda usar ambos
 * orígenes sin romperse.
 */

const SANITY_CDN = "cdn.sanity.io";

function isSanityUrl(url: string): boolean {
    return typeof url === "string" && url.includes(SANITY_CDN);
}

export function sanityImg(url: string, w: number, q = 75): string {
    if (!url || !isSanityUrl(url)) return url;
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}w=${w}&auto=format&q=${q}&fit=max`;
}

export function sanitySrcSet(
    url: string,
    widths: number[],
    q = 75,
): string | undefined {
    if (!url || !isSanityUrl(url)) return undefined;
    return widths.map((w) => `${sanityImg(url, w, q)} ${w}w`).join(", ");
}
