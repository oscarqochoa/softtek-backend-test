import { provide } from "inversify-binding-decorators";

import { HttpAdapter } from "../../common/adapters/http.adapter";
import { StatusHelper } from "../../common/helpers/status.helper";
import { IHttpAdapter } from "../../common/interfaces/http-adapter.interface";
import { IHttpResponse } from "../../common/interfaces/http-response.interface";
import { ISwapiSpeciesResponse, Result as SpecieResult } from "./interfaces/swapi-species-response.interface";
import { inject } from "inversify";
import { TranslatorService } from "../../common/services/translator.service";

@provide(SwapiService)
export class SwapiService {

    private _http: IHttpAdapter
    private _baseUrl: string = 'https://swapi.py4e.com/api/';

    constructor(
        @inject(TranslatorService)
        private readonly _translatorService: TranslatorService
    ) {
        this._http = new HttpAdapter();
    }

    // async getTranslatedStarships(params: IGetSwapiStarships): Promise<ISwapiStarshipsResponse | null> {
    //     try {
    //         const starships = await this.getStarships();

    //         const translator = new TranslatorService();

    //         const insertPromises = [];

    //         starships.results.forEach((result: StarshipResult) => {
    //             insertPromises.push(translator.translateMultilevelObjectKeys(result));
    //         })

    //         starships.results = await Promise.all(insertPromises);

    //         // if (params.store == 'true' || params.store == '1') {
    //         //     await this._starshipsService.createMassively(starships.results);
    //         // }

    //         return starships;
    //     } catch (error) {

    //     }
    // }

    async getSpecies(param: any = ''): Promise<ISwapiSpeciesResponse> {
        try {
            const response: IHttpResponse = await this._http.get<ISwapiSpeciesResponse>({ url: this._baseUrl + 'species', param: param });

            if (StatusHelper.responseIsSucess(response)) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async getTranslatedSpecies(): Promise<ISwapiSpeciesResponse | null> {
        try {
            const species = await this.getSpecies();

            const translator = new TranslatorService();

            const insertPromises = [];

            species.results.forEach((result: SpecieResult) => {
                insertPromises.push(translator.translateMultilevelObjectKeys(result));
            })

            species.results = await Promise.all(insertPromises);

            return species;
        } catch (error) {
            console.log(error);
        }
    }

}