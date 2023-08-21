import { Get, Route, Tags } from "tsoa";
import { inject } from "inversify";

import { provideSingleton } from "../../util/provideSingleton";
import { SwapiService } from "./swapi.service";

@Tags("Swapi")
@Route('swapi')
@provideSingleton(SwapiController)
export class SwapiController {

    constructor(
        @inject(SwapiService)
        private readonly _swapiService: SwapiService
    ) { }

    @Get('species/get')
    async getSpecies(): Promise<any> {
        return await this._swapiService.getTranslatedSpecies();
    }

}