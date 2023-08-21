import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { ISpecie } from "./interfaces/specie";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export const mapSpecieToDynamoDBItem = (specie: ISpecie): Record<string, AttributeValue> => {

    return {
        id: { S: specie.id },
        nombre: { S: specie.nombre },
        clasificacion: { S: specie.clasificacion },
        designacion: { S: String(specie.designacion) },
        altura_media: { S: specie.altura_media },
        colores_de_piel: { S: specie.colores_de_piel },
        color_de_pelo: { S: specie.color_de_pelo },
        colores_ojos: { S: specie.colores_ojos },
        esperanza_de_vida_media: { S: specie.esperanza_de_vida_media },
        mundo_natal: { S: specie.mundo_natal },
        lengua: { S: specie.lengua },
        gente: { SS: specie.gente },
        peliculas: { SS: specie.peliculas },
        creado: { N: specie.creado.getTime().toString() },
        editado: { N: specie.editado.getTime().toString() },
        url: { S: specie.url },
    };
}

export const mapSpecieFromDynamoDBItem = (item: Record<string, AttributeValue>): ISpecie => {

    const data = unmarshall(item);

    return {
        id: data["id"],
        nombre: data["nombre"],
        clasificacion: data["clasificacion"],
        designacion: data["designacion"],
        altura_media: data["altura_media"],
        colores_de_piel: data["colores_de_piel"],
        color_de_pelo: data["color_de_pelo"],
        colores_ojos: data["colores_ojos"],
        esperanza_de_vida_media: data["esperanza_de_vida_media"],
        mundo_natal: data["mundo_natal"],
        lengua: data["lengua"],
        gente: Array.from(data["gente"]),
        peliculas: Array.from(data["peliculas"]),
        creado: new Date(data["creado"]),
        editado: new Date(data["editado"]),
        url: data["url"],

    };
}