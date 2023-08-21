import config from "config";
import { app } from "./app";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Schemas
import { speciesSchema } from "./database/Schemas/species.schema";
import { starshipsSchema } from "./database/Schemas/starships.schema";

const port = config.get("server.port");

setImmediate(async () => {
    await speciesSchema(new DynamoDBClient(config.get("dynamodb")));
    await starshipsSchema(new DynamoDBClient(config.get("dynamodb")));
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
