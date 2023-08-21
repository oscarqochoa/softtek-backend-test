import { v4 } from "uuid";

import { request } from "../../helpers/app";

import {
    createSpecieIncomplete,
    createSpecieWithCorrectParameterType,
    createSpecieWithIncorrectParameterType,
    createSpecieWithRepeatedPerson
} from "../../helpers/create-specie";

describe("Create specie", () => {

    const endpoint: string = "/species";

    beforeAll(async () => {

    });

    describe("POST /specie", () => {

        it("will respond with a 422 status code if the information sent is incomplete", async () => {

            const version: string = v4();

            const expectedResponse = {
                message: "validation failed",
                details: {
                    "dto.nombre": {
                        message: "'nombre' is required"
                    }
                }
            };

            const response = await request
                .post(endpoint)
                .send(createSpecieIncomplete(version));

            expect(response.statusCode).toEqual(422);
            expect(response.body).toEqual(expectedResponse);

        });

        it("will respond with a 422 status code if I send a parameter with the wrong data type", async () => {

            const version: string = v4();

            const expectedResponse = {
                message: "validation failed",
                details: {
                    "dto.nombre": {
                        message: "invalid string value",
                        value: 1
                    }
                }
            };

            const response = await request
                .post(endpoint)
                .send(createSpecieWithIncorrectParameterType(version));

            expect(response.statusCode).toEqual(422);
            expect(response.body).toEqual(expectedResponse);

        });

        it("will respond 500 status if a person is repeated in the array", async () => {

            const version: string = v4();

            const expectedResponse = {
                message: "Error creating specie",
                status: 500
            };

            const response = await request
                .post(endpoint)
                .send(createSpecieWithRepeatedPerson(version));

            expect(response.statusCode).toEqual(500);
            expect(response.body).toEqual(expectedResponse);

        })

        it("will reply 201 status if the record is correct", async () => {

            const version: string = v4();
            const requestBody = createSpecieWithCorrectParameterType(version);

            const response = await request
                .post(endpoint)
                .send(requestBody);

            const responseBody = response.body;

            expect(response.statusCode).toEqual(201);
            expect(typeof responseBody.id).toEqual("string");
            expect(new Date().getTime() - new Date(responseBody.creado).getTime()).toBeLessThan(5000);

            const savedProduct = await request.get(endpoint + '/show/' + responseBody.id);

            expect(savedProduct.statusCode).toEqual(200);

        });

    })
});