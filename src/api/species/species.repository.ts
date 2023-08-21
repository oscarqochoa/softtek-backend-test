import { ICreateSpecie, ISpecie } from "./interfaces/specie";

export interface SpeciesRepository {

    /**
     * 
     * @param id 
     */
    findById(id: string): Promise<ISpecie | null>;
    find(params: any): Promise<ISpecie[] | []>;
    create(specie: ICreateSpecie): Promise<ISpecie | null>;

}