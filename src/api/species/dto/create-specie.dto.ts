import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateSpecieDto {

    @IsString()
    @MinLength(1)
    @MaxLength(100)
    nombre!: string;

    @IsString()
    @MinLength(1)
    @MaxLength(100)
    clasificacion!: string;

    @IsString()
    @MinLength(1)
    @MaxLength(100)
    designacion!: string;

    @IsString()
    @MinLength(1)
    @MaxLength(100)
    altura_media!: string;

    @IsString()
    @MinLength(1)
    @MaxLength(100)
    colores_de_piel!: string;

    @IsString()
    @MinLength(1)
    @MaxLength(100)
    color_de_pelo!: string;

    @IsString()
    @MinLength(1)
    @MaxLength(100)
    colores_ojos!: string;

    @IsString()
    @MinLength(1)
    @MaxLength(100)
    esperanza_de_vida_media!: string;

    @IsString()
    @MinLength(1)
    @MaxLength(100)
    mundo_natal!: string;

    @IsString()
    @MinLength(1)
    @MaxLength(100)
    lengua!: string;

    @IsString({ each: true })
    gente!: string[];

    @IsString({ each: true })
    peliculas!: string[];

    @IsString()
    @MinLength(1)
    @MaxLength(200)
    url!: string;
}