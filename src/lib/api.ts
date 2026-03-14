import { sanityClient } from "sanity:client";
import { empresasQuery, heroQuery, serviciosQuery, trabajosQuery } from "./queries";
import type { ServiciosSection, TrabajoSection } from "./types";

export async function getHero() {
    return await sanityClient.fetch(heroQuery);
}

export async function getEmpresas() {
    return await sanityClient.fetch(empresasQuery)
}

export async function getServicios(): Promise<ServiciosSection> {
    return await sanityClient.fetch(serviciosQuery);
}

export async function getTrabajos(): Promise<TrabajoSection> {
    return await sanityClient.fetch(trabajosQuery);
}
