import { v4 } from "uuid";

import { request } from "../../helpers/app";

import { createSpecieWithCorrectParameterType } from "../../helpers/create-specie";

describe("Show specie", () => {

    const endpoint: string = "/species/show";

    describe("GET /species/show", () => {

        it("will reply 404 status if the species does not exist", async () => {

            const id: string = v4();

            const expectedResponse = {
                message: "Specie not found",
                status: 404
            };

            const savedProduct = await request.get(endpoint + '/' + id);

            expect(savedProduct.statusCode).toEqual(404);
            expect(savedProduct.body).toEqual(expectedResponse);

        })

        it("will respond with status 200 if the record exists in the database", async () => {

            const version: string = v4();
            const requestBody = createSpecieWithCorrectParameterType(version);

            const response = await request
                .post('/species')
                .send(requestBody);

            const responseBody = response.body;

            expect(response.statusCode).toEqual(201);
            expect(typeof responseBody.id).toEqual("string");
            expect(new Date().getTime() - new Date(responseBody.creado).getTime()).toBeLessThan(5000);

            const savedProduct = await request.get(endpoint + "/" + responseBody.id);

            expect(savedProduct.statusCode).toEqual(200);

        })

    })

})