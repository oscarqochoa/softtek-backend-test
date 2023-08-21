import config from "config";
import {
    CreateTableCommand,
    DescribeTableCommand,
    DynamoDBClient,
    ResourceNotFoundException,
} from "@aws-sdk/client-dynamodb";

export const speciesSchema = async (client: DynamoDBClient) => {
    try {
        await client.send(
            new DescribeTableCommand({
                TableName: config.get("dbTables.species.name"),
            }),
        );
    } catch (e) {
        if (!(e instanceof ResourceNotFoundException)) {
            throw e;
        }

        await client.send(
            new CreateTableCommand({
                TableName: config.get("dbTables.species.name"),
                AttributeDefinitions: [
                    {
                        AttributeName: "id",
                        AttributeType: "S"
                    },
                ],
                KeySchema: [
                    {
                        AttributeName: "id",
                        KeyType: "HASH",
                    },
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5,
                },
            }),
        );
    }
};
