export interface ISpecie {

    id: string;
    nombre: string;
    clasificacion: string;
    designacion: string;
    altura_media: string;
    colores_de_piel: string;
    color_de_pelo: string;
    colores_ojos: string;
    esperanza_de_vida_media: string;
    mundo_natal: string;
    lengua: string;
    gente: string[];
    peliculas: string[];
    creado: Date;
    editado: Date;
    url: string;

}

export interface ICreateSpecie extends Omit<ISpecie, "id" | "creado" | "editado"> { }