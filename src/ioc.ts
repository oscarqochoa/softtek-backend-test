import { Container, decorate, injectable } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { Controller } from "tsoa";
import { SpeciesRepository } from "./api/species/species.repository";
import { SpeciesDynamoDBRepository } from "./api/species/species-dynamodb.repository";

const iocContainer = new Container();

decorate(injectable(), Controller);

iocContainer.load(buildProviderModule());

iocContainer.bind<SpeciesRepository>("SPECIES_REPOSITORY").toConstantValue(new SpeciesDynamoDBRepository());

export { iocContainer };
