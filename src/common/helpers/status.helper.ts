import { IHttpResponse } from "../interfaces/http-response.interface";

export class StatusHelper {

    static responseIsSucess(response: IHttpResponse) {
        return [200, 201].includes(response.status)
    }

}