import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";

import { CreateError } from "../../common/errors/create.error";

import { SpeciesRepository } from "./species.repository";
import { NotFoundError } from "../../common/errors/not-found.error";
import { ICreateSpecie } from "./interfaces/specie";

@provide(SpeciesService)
export class SpeciesService {

    constructor(
        @inject("SPECIES_REPOSITORY")
        private readonly _speciesRepository: SpeciesRepository
    ) { }

    async show(id: string) {
        const response = await this._speciesRepository.findById(id);

        if (!response) throw new NotFoundError("Specie not found");

        return response;
    }

    async get(params: any) {
        const response = await this._speciesRepository.find(params);
        return response;
    }

    async create(dto: ICreateSpecie) {
        const response = await this._speciesRepository.create(dto);

        if (!response) throw new CreateError("Error creating specie");

        return response;
    }
}
