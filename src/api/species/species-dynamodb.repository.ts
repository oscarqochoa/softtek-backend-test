import * as AWS from "aws-sdk";
import { AttributeValue, DynamoDBClient, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { v4 } from "uuid";
import config from "config";

import { ISpecie } from "./interfaces/specie";
import { SpeciesRepository } from "./species.repository";
import { mapSpecieFromDynamoDBItem, mapSpecieToDynamoDBItem } from "./species.helper";
import { DynamoDBFilters } from "../../common/classes/dynamodb-filters.class";

export class SpeciesDynamoDBRepository implements SpeciesRepository {

    private client: DynamoDBClient;
    private tableName: string;

    constructor() {
        this.client = new DynamoDBClient(config.get("dynamodb"));
        this.tableName = config.get("dbTables.species.name");
    }

    async findById(id: string): Promise<ISpecie | null> {
        try {

            const filters = this._filters({ id });
            const output = await this.client.send(new ScanCommand(filters.scanCommandData));

            const items: ISpecie[] = (output.Items || []).map(
                (item: Record<string, AttributeValue>) =>
                    mapSpecieFromDynamoDBItem(item)
            );

            return items[0];
        } catch (error) {
            return null;
        }
    }

    async find(params: any): Promise<ISpecie[] | []> {
        try {
            const filters = this._filters(params);
            const output = await this.client.send(new ScanCommand(filters.scanCommandData));

            const items: ISpecie[] = (output.Items || []).map(
                (item: Record<string, AttributeValue>) =>
                    mapSpecieFromDynamoDBItem(item)
            );

            return items;
        } catch (error) {
            return [];
        }
    }

    async create(specie: ISpecie): Promise<ISpecie | null> {
        try {
            const newSpecie: ISpecie = { ...specie, id: v4(), creado: new Date(), editado: new Date() };

            await this.client.send(
                new PutItemCommand({
                    TableName: this.tableName,
                    Item: mapSpecieToDynamoDBItem(newSpecie),
                }),
            );

            return newSpecie;
        } catch (error) {
            return null;
        }

    }

    private _filters(params: any): DynamoDBFilters {
        const filters = new DynamoDBFilters();

        filters.table(this.tableName);

        filters.set(params, 'id', 'id = :id', { ':id': { S: params?.id } });
        filters.set(params, 'nombre', 'nombre = :nombre', { ':nombre': { S: params?.nombre } });

        filters.join();

        return filters;
    }

}