import { sanityClient } from "sanity:client";
import {
    heroQuery,
    partnerLogosQuery,
    serviciosQuery,
    trabajosQuery,
} from "./queries";
import type {
    PartnerLogo,
    ServiciosSection,
    TrabajoSection,
} from "./types";

// ============================================================
// HERO / SERVICIOS / TRABAJOS (esquema antiguo)
// ============================================================
export async function getHero() {
    return await sanityClient.fetch(heroQuery);
}

export async function getServicios(): Promise<ServiciosSection> {
    return await sanityClient.fetch(serviciosQuery);
}

export async function getTrabajos(): Promise<TrabajoSection> {
    return await sanityClient.fetch(trabajosQuery);
}

// ============================================================
// EMPRESAS QUE CONFÍAN
// ============================================================

/**
 * Devuelve los logos del slider "Empresas que confían" desde el
 * documento `homePage`. Si no hay logos o el documento no existe
 * todavía, devuelve un array vacío y la sección se ocultará en el front.
 */
export async function getPartnerLogos(): Promise<PartnerLogo[]> {
    const logos: PartnerLogo[] | null =
        await sanityClient.fetch(partnerLogosQuery);
    return (logos ?? []).filter((l) => l?.url);
}
