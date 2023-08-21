import { v4 } from "uuid";

export const createSpecieIncomplete = (version: string) => ({
    clasificacion: `v-${version}`,
    altura_media: `v-${version}`,
    designacion: `v-${version}`,
    colores_de_piel: `v-${version}`,
    color_de_pelo: `v-${version}`,
    colores_ojos: `v-${version}`,
    esperanza_de_vida_media: `v-${version}`,
    mundo_natal: `v-${version}`,
    lengua: `v-${version}`,
    gente: [
        `v-${version}`
    ],
    peliculas: [
        `v-${version}`
    ],
    url: `v-${version}`
});

export const createSpecieWithIncorrectParameterType = (version: string) => ({
    nombre: 1,
    clasificacion: `v-${version}`,
    altura_media: `v-${version}`,
    designacion: `v-${version}`,
    colores_de_piel: `v-${version}`,
    color_de_pelo: `v-${version}`,
    colores_ojos: `v-${version}`,
    esperanza_de_vida_media: `v-${version}`,
    mundo_natal: `v-${version}`,
    lengua: `v-${version}`,
    gente: [
        `v-${version}`
    ],
    peliculas: [
        `v-${version}`
    ],
    url: `v-${version}`
});

export const createSpecieWithCorrectParameterType = (version: string) => ({
    nombre: `v-${version}`,
    clasificacion: `v-${version}`,
    altura_media: `v-${version}`,
    designacion: `v-${version}`,
    colores_de_piel: `v-${version}`,
    color_de_pelo: `v-${version}`,
    colores_ojos: `v-${version}`,
    esperanza_de_vida_media: `v-${version}`,
    mundo_natal: `v-${version}`,
    lengua: `v-${version}`,
    gente: [
        `v-${version}`
    ],
    peliculas: [
        `v-${version}`
    ],
    url: `v-${version}`
});

export const createSpecieWithRepeatedPerson = (version: string) => ({
    nombre: `v-${version}`,
    clasificacion: `v-${version}`,
    altura_media: `v-${version}`,
    designacion: `v-${version}`,
    colores_de_piel: `v-${version}`,
    color_de_pelo: `v-${version}`,
    colores_ojos: `v-${version}`,
    esperanza_de_vida_media: `v-${version}`,
    mundo_natal: `v-${version}`,
    lengua: `v-${version}`,
    gente: [
        `v-${version}`,
        `v-${version}`,
    ],
    peliculas: [
        `v-${version}`
    ],
    url: `v-${version}`
});