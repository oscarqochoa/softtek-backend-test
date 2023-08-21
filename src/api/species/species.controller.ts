import { inject } from "inversify";
import { Body, Get, Path, Post, Query, Route, SuccessResponse, Tags } from "tsoa";

import { provideSingleton } from "../../util/provideSingleton";
import { CreateSpecieDto } from "./dto/create-specie.dto";
import { SpeciesService } from "./species.service";

@Tags("Species")
@Route('species')
@provideSingleton(EspeciesController)
export class EspeciesController {

    constructor(
        @inject(SpeciesService)
        private readonly _speciesService: SpeciesService
    ) {
    }

    @Get('show/{id}')
    async show(@Path() id: string): Promise<any> {
        return await this._speciesService.show(id);
    }

    @Get('get')
    async get(
        @Query() id?: string,
        @Query() nombre?: string,
    ): Promise<any> {
        return await this._speciesService.get({ id, nombre });
    }

    @SuccessResponse(201)
    @Post()
    async create(@Body() dto: CreateSpecieDto): Promise<any> {
        return await this._speciesService.create(dto);
    }

}