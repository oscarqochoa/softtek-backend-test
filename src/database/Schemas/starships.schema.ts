import config from "config";
import {
    CreateTableCommand,
    DescribeTableCommand,
    DynamoDBClient,
    ResourceNotFoundException,
} from "@aws-sdk/client-dynamodb";

export const starshipsSchema = async (client: DynamoDBClient) => {
    try {
        await client.send(
            new DescribeTableCommand({
                TableName: config.get("dbTables.starships.name"),
            }),
        );
    } catch (e) {
        if (!(e instanceof ResourceNotFoundException)) {
            throw e;
        }

        await client.send(
            new CreateTableCommand({
                TableName: config.get("dbTables.starships.name"),
                AttributeDefinitions: [
                    {
                        AttributeName: "ProductID",
                        AttributeType: "S",
                    },
                ],
                KeySchema: [
                    {
                        AttributeName: "ProductID",
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
